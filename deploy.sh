#!/bin/bash
set -e

APP_DIR="/var/www/beautymaster"
NGINX_SITE="/etc/nginx/sites-available/beautymaster"

cd $APP_DIR

echo "→ Pulling latest code..."
git pull

echo "→ Ensuring runtime dirs exist..."
mkdir -p $APP_DIR/public/uploads

echo "→ Installing dependencies..."
npm install

echo "→ Generating Prisma client..."
npx prisma generate

echo "→ Syncing DB schema..."
npx prisma db push --accept-data-loss --skip-generate

echo "→ Seeding default settings..."
node -e "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.setting.upsert({ where: { key: 'emailNotificationsEnabled' }, create: { key: 'emailNotificationsEnabled', value: 'true' }, update: {} })
  .then(() => p.\$disconnect());
"

echo "→ Building..."
npm run build

echo "→ Making start.sh executable..."
chmod +x $APP_DIR/start.sh

if [ -f "$NGINX_SITE" ] && ! cmp -s "$APP_DIR/nginx.conf" "$NGINX_SITE"; then
  echo "→ Updating nginx config..."
  cp "$APP_DIR/nginx.conf" "$NGINX_SITE"
  nginx -t && systemctl reload nginx
fi

echo "→ Restarting app..."
pm2 restart beautymaster 2>/dev/null || pm2 start $APP_DIR/ecosystem.config.cjs
pm2 save

echo "✓ Deploy complete"
