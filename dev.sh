#!/bin/sh

# -f is option for changing docker-compose.yml directory
# -d is option for running in background
docker compose -f ./client/docker-compose.yml up -d
docker compose -f ./server/docker-compose.yml up