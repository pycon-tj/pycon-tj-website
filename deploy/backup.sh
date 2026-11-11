#!/usr/bin/env bash
# Nightly database dump, kept for 14 days. Installed as a cron job by setup-server.sh.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p backups
docker compose -f docker-compose.prod.yml exec -T db \
  pg_dump -U pycon -d pycon --format=custom >"backups/pycon-$(date +%F).dump"
find backups -name 'pycon-*.dump' -mtime +14 -delete
