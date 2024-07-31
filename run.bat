@echo off
cd /d "path/to/projects"

start cmd /k pnpm run start:dev reservation
start cmd /k pnpm run start:dev auth
start cmd /k pnpm run start:dev notification
start cmd /k pnpm run start:dev payment
start cmd /k pnpm run start:dev gateway

exit