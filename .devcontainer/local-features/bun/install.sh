#!/bin/bash

# Install Bun
set -e

# Define color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Bun is already installed
if command -v bun &> /dev/null; then
    echo -e "${GREEN}Bun is already installed.${NC}"
    exit 0
fi

# Install Bun
echo -e "${YELLOW}Installing Bun...${NC}"
npm install -g bun

# Verify installation
echo -e "${YELLOW}Verifying Bun installation:${NC}"
bun --version

echo -e "${GREEN}Bun has been successfully installed.${NC}"
