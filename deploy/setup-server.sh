#!/usr/bin/env bash
# One-time setup of a fresh Ubuntu 24.04 server (Hetzner Cloud). Run as root:
#   ssh root@SERVER 'bash -s' -- "<deploy public key>" [domain] < deploy/setup-server.sh
# Safe to run again: it skips what is already done and never overwrites deploy/.env.
set -euo pipefail

DEPLOY_KEY="${1:?pass the GitHub Actions deploy public key}"
DOMAIN="${2:-pycon.tj}"
REPO=https://github.com/pycon-tj/pycon-tj-website.git
APP=/opt/pycon
export DEBIAN_FRONTEND=noninteractive

echo "== Packages"
apt-get update -q
apt-get upgrade -yq
apt-get install -yq ca-certificates curl git openssl ufw fail2ban unattended-upgrades
command -v docker >/dev/null || curl -fsSL https://get.docker.com | sh

echo "== Swap (helps image builds on small servers)"
if [ ! -f /swapfile ]; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile >/dev/null && swapon /swapfile
  echo '/swapfile none swap sw 0 0' >>/etc/fstab
fi

echo "== Firewall: SSH, HTTP, HTTPS only"
ufw allow OpenSSH >/dev/null
ufw allow 80/tcp >/dev/null
ufw allow 443 >/dev/null
ufw --force enable >/dev/null

echo "== SSH: keys only"
cat >/etc/ssh/sshd_config.d/10-pycon.conf <<'CONF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin prohibit-password
CONF
systemctl reload ssh

echo "== deploy user (its key may only run deploy/deploy.sh)"
id deploy >/dev/null 2>&1 || useradd -m -s /bin/bash -G docker deploy
install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
echo "command=\"$APP/deploy/deploy.sh\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty $DEPLOY_KEY" \
  >/home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys

echo "== Code in $APP"
install -d -o deploy -g deploy "$APP"
[ -d "$APP/.git" ] || sudo -u deploy git clone --quiet --depth 1 "$REPO" "$APP"

echo "== Secrets in $APP/deploy/.env"
if [ ! -f "$APP/deploy/.env" ]; then
  umask 077
  cat >"$APP/deploy/.env" <<ENV
SITE_DOMAIN=$DOMAIN
POSTGRES_PASSWORD=$(openssl rand -hex 24)
DJANGO_SECRET_KEY=$(openssl rand -hex 40)
DJANGO_ALLOWED_HOSTS=$DOMAIN,www.$DOMAIN
DJANGO_CSRF_TRUSTED_ORIGINS=https://$DOMAIN,https://www.$DOMAIN
WAGTAILADMIN_BASE_URL=https://$DOMAIN
# Add when ready (an empty value would override the defaults):
# PRETALX_EVENT_URL=
# PRETALX_API_TOKEN=
# PRETIX_SHOP_URL=
ENV
  chown deploy:deploy "$APP/deploy/.env"
  umask 022
fi

echo "== Nightly database backup at 03:30"
echo "30 3 * * * deploy $APP/deploy/backup.sh" >/etc/cron.d/pycon-backup

echo "== First deploy"
sudo -u deploy "$APP/deploy/deploy.sh"
echo "Server ready. HTTPS starts working once $DOMAIN points to this server's IP."
