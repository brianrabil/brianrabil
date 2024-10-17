#!/bin/bash

set -e

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Install Turborepo globally
echo "Installing Turborepo..."
npm install turbo --global

# Verify installation
if command -v turbo &> /dev/null; then
    echo "Turborepo installed successfully."
    turbo --version
else
    echo "Failed to install Turborepo."
    exit 1
fi

# # Add Turborepo to PATH if not already present
# if ! grep -q "export PATH=\"\$PATH:\$(npm global bin)\"" ~/.bashrc; then
#     echo 'export PATH="$PATH:$(npm global bin)"' >> ~/.bashrc
#     echo "Added Turborepo to PATH."
# fi

echo "Turborepo installation complete."
