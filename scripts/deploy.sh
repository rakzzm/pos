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

# Run database migrations and seed
echo "Running database migrations..."
docker compose exec app npx prisma migrate deploy

echo "Seeding database..."
docker compose exec app npx -y tsx prisma/seed.ts

echo "✅ Deployment update complete! Server should be up and running."
