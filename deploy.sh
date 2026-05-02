#!/bin/bash
set -e

APP_DIR="/var/www/beautymaster"

echo "→ Pulling latest code..."
cd $APP_DIR
git pull

echo "→ Installing dependencies..."
npm install

echo "→ Building..."
npm run build

echo "→ Making start.sh executable..."
chmod +x $APP_DIR/start.sh

echo "→ Restarting app..."
pm2 restart beautymaster 2>/dev/null || pm2 start $APP_DIR/ecosystem.config.cjs
pm2 save

echo "✓ Deploy complete"
