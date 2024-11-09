#!/bin/bash

set -e

# Check if pnpm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Install Turborepo globally
echo "Installing Vercel CLI..."
npm install -g vercel

# Verify installation
if command -v vercel &> /dev/null; then
    echo "Vercel CLI installed successfully."
    vercel --version
else
    echo "Failed to install Vercel CLI."
    exit 1
fi

echo "Vercel CLI installation complete."
