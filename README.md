# Knowii

TODO

## Installation

### Pre-requisites
- PHP
- Composer
- Docker
- docker-compose
- Sail

### Environment setup
Copy the `.env.example` file to `.env` and fill in the necessary values.

## Docker usage
During development, we use Laravel Sail with Docker and docker-compose.

- To start the application, run `./vendor/bin/sail up` or `./vendor/bin/sail up -d` to run it as a daemon
- To stop it, run `./vendor/bin/sail down`

WARNING: After making changes to the Dockerfile, make sure to rebuild the container images using `./vendor/bin/sail build --no-cache`

## Useful commands
- `composer sail:cache:clean`: Clean the caches
- `composer sail:clean`: Stop the application and rebuild the container images
- `composer serve`: Start the application
- `composer start`: Start the application

## Configuration

### Fortify
See `./config/fortify.php` for configuration options.
