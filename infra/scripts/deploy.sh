#!/usr/bin/env bash
# deploy.sh — pull latest, rebuild containers on solgap.
# Run on the solgap host from the solkbd-portfolio repo root.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

echo "▶ Pulling latest from origin/main..."
git fetch --prune origin
git checkout main
git reset --hard origin/main

echo "▶ Building frontend (Vite)..."
pushd frontend > /dev/null
npm ci --silent
npm run build
popd > /dev/null

echo "▶ Rebuilding containers..."
pushd infra > /dev/null
docker compose pull || true
docker compose up -d --build --remove-orphans
docker compose ps
popd > /dev/null

echo "▶ Health check (via cloudflared / internal)..."
for i in 1 2 3 4 5; do
  if docker exec solkbd-backend curl -fsS http://localhost:8000/api/health > /dev/null 2>&1; then
    echo "✓ Backend healthy"
    exit 0
  fi
  sleep 2
done

echo "✗ Backend did not become healthy" >&2
docker compose -f infra/docker-compose.yml logs --tail=50 backend >&2 || true
exit 1
