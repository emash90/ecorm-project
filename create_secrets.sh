#!/bin/bash

# Read the .env file and create secrets for each key-value pair
while IFS= read -r line; do
    # Ignore empty lines and comments
    if [[ "$line" =~ ^[[:space:]]*# || "$line" =~ ^[[:space:]]*$ ]]; then
        continue
    fi

    # Extract key and value from the line
    key=$(echo "$line" | cut -d '=' -f1)
    value=$(echo "$line" | cut -d '=' -f2-)

    # Create Docker secret
    echo "$value" | docker secret create "$key" -
done < .env
