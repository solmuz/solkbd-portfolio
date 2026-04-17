#!/usr/bin/env bash
# renew-certs.sh — renew Let's Encrypt certs via certbot (webroot plugin).
# Schedule via systemd timer or cron (recommended: weekly).
set -euo pipefail

DOMAIN="${DOMAIN:-www.solkbd.com}"
EMAIL="${CERTBOT_EMAIL:-DanielMunoz@solkbd.com}"
WEBROOT="${WEBROOT:-/var/www/certbot}"
NGINX_CONTAINER="${NGINX_CONTAINER:-solkbd-frontend}"

mkdir -p "$WEBROOT"

if [[ ! -d "/etc/letsencrypt/live/$DOMAIN" ]]; then
  echo "▶ Issuing initial certificate for $DOMAIN..."
  docker run --rm \
    -v /etc/letsencrypt:/etc/letsencrypt \
    -v /var/lib/letsencrypt:/var/lib/letsencrypt \
    -v "$WEBROOT:$WEBROOT" \
    certbot/certbot:latest \
    certonly --webroot -w "$WEBROOT" \
      -d "$DOMAIN" -d "${DOMAIN#www.}" \
      --email "$EMAIL" \
      --agree-tos --no-eff-email --non-interactive
else
  echo "▶ Renewing certificate for $DOMAIN..."
  docker run --rm \
    -v /etc/letsencrypt:/etc/letsencrypt \
    -v /var/lib/letsencrypt:/var/lib/letsencrypt \
    -v "$WEBROOT:$WEBROOT" \
    certbot/certbot:latest renew --quiet
fi

echo "▶ Reloading Nginx container..."
docker exec "$NGINX_CONTAINER" nginx -s reload || {
  echo "! nginx reload failed — restarting container"
  docker restart "$NGINX_CONTAINER"
}

echo "✓ Done."
