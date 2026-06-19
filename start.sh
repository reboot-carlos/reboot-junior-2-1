#!/bin/bash
set -euo pipefail

if ! command -v docker &>/dev/null; then
    echo "Error: Docker is not installed."
    echo "Install it from https://docs.docker.com/get-docker/"
    exit 1
fi

if [ ! -f .env ]; then
    echo "Error: .env file not found."
    echo "Create one with:  echo 'ANTHROPIC_API_KEY=your_key' > .env"
    exit 1
fi

if ! grep -q "ANTHROPIC_API_KEY" .env; then
    echo "Error: ANTHROPIC_API_KEY not found in .env"
    exit 1
fi

echo "Building and starting TOKYO..."
docker compose up --build "$@"
