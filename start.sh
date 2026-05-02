#!/bin/bash
set -a
source /var/www/beautymaster/.env
set +a
exec node /var/www/beautymaster/.output/server/index.mjs
