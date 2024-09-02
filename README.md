# Knowii

Welcome to Knowii, the place for your Knowledge, Ideas and Innovation

## Installation

### Pre-requisites

- PHP
- Composer
- Docker
- docker-compose
- Sail

### Environment setup

- Copy the `.env.example` file to `.env` and fill in the necessary values
- Run `composer install` to install the dependencies
- Run `php artisan key:generate` to generate an encryption key
- Run `npm run build` at least once to build the assets under `public/build` (at least `.vite/manifest.json` which is required for the application to start)

## Docker usage

During development, we use Laravel Sail with Docker and docker-compose.

- To start the application, run `./vendor/bin/sail up` or `./vendor/bin/sail up -d` to run it as a daemon
- To stop it, run `./vendor/bin/sail down`

WARNING: After making changes to the Dockerfile, make sure to rebuild the container images using `./vendor/bin/sail build --no-cache`

## Running the application

Run `composer start` to start Sail, and Vite (the frontend development server).

If you want more control you can run the parts separately:

- Run `./vendor/bin/sail up` to start the back-end
- Run `./vendor/bin/sail npm run dev` to start the front-end (inside of the Docker container)

WARNING: You have to start the front-end server inside of the Docker container, because it already reserves the port exposed by Vite.

You can also use `./vendor/bin/sail bash` to get a shell within the container.

If you want to run the production version locally, you can:

- Start Sail using `sail up` (so you can look at the back-end logs)
- Run `npm run build` to build the front-end application
- Go to `http://localhost:4200/`

## Useful commands

- `composer sail:cache:clean`: Clean the caches
- `composer sail:clean`: Stop the application and rebuild the container images
- `composer serve`: Start the application
- `composer start`: Start the application

## Configuration

### Fortify

See `./config/fortify.php` for configuration options.

## Contributing

Knowii is open source. We are always looking for new contributors. Check out the [contributing document](CONTRIBUTING.md) to know how.

## License

Knowii is licensed under the terms of the AGPL [open source license](LICENSE).
