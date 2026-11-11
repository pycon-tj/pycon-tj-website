#!/usr/bin/env bash
# Runs on the server. GitHub Actions calls it over SSH after every green push to main;
# the deploy key can run nothing else (see setup-server.sh).
set -euo pipefail
cd "$(dirname "$0")/.."

exec 9>/tmp/pycon-deploy.lock
flock 9

ref="${DEPLOY_REF:-main}"   # only setup can pass another branch; the deploy key always gets main
git fetch --quiet --depth 1 origin "$ref"
git reset --quiet --hard FETCH_HEAD

compose="docker compose -f deploy/docker-compose.prod.yml"
domain="$(grep -E '^SITE_DOMAIN=' deploy/.env | cut -d= -f2)"

$compose up -d --build --remove-orphans
$compose exec -T web uv run --no-dev python manage.py seed_tiers
docker image prune -f >/dev/null

check="import urllib.request as u; u.urlopen(u.Request('http://127.0.0.1:8000/en/', headers={'Host': '$domain', 'X-Forwarded-Proto': 'https'}), timeout=5)"
for _ in $(seq 1 30); do
  if $compose exec -T web python -c "$check" 2>/dev/null; then
    echo "Deployed $(git rev-parse --short HEAD)"
    exit 0
  fi
  sleep 2
done
echo "Site did not answer after deploy" >&2
$compose logs --tail 50 web >&2
exit 1
