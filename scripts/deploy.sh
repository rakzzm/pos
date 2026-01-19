#!/bin/bash
set -e

echo "🚀 Starting deployment update..."

# Pull latest changes
echo "📥 Pulling latest code from GitHub..."
git pull origin main

# Rebuild and restart containers
echo "🔄 Rebuilding Docker containers..."
# Use --build to ensure image is updated with new package.json/lockfile
# Use --force-recreate to ensure clean state
docker compose up -d --build --force-recreate

echo "⏳ Waiting for server to become healthy..."
sleep 10

# Run Seed (optional, but good to ensure DB is in sync)
echo "🌱 Ensuring database is seeded..."
# execute seed inside the running container
docker compose exec -T app npx prisma db seed

echo "✅ Deployment update complete! Server should be up and running."
