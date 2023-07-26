# OpenMusic API Version 1

OpenMusic API Version 1 is an application that provides endpoints to manage albums and songs. It uses PostgreSQL to store data, and it implements data validation and error handling to ensure the API operates smoothly. Additionally, it supports optional features such as displaying a list of songs within an album and using query parameters for song search.

## Table of Contents

- [Installation](#installation)
- [Endpoints](#endpoints)
  - [Albums](#albums)
  - [Songs](#songs)
- [Data Validation](#data-validation)
- [Error Handling](#error-handling)
- [Database](#database)
- [Environment Variables](#environment-variables)
- [Optional Features](#optional-features)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone this repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Create a PostgreSQL database and configure the environment variables according to your database settings (see [Environment Variables](#environment-variables) section).
4. Run the migration to set up the database tables by executing `npm run migrate up`.

## Endpoints

### Albums

- `GET /albums/{id}`: Get details of an album by its ID.
- `POST /albums`: Add a new album with the given data (name and year).
- `PUT /albums/{id}`: Update an existing album by its ID.

### Songs

- `GET /songs`: Get a list of all songs.
- `GET /songs/{id}`: Get details of a song by its ID.
- `POST /songs`: Add a new song with the given data (title, year, genre, performer, duration, and albumId).
- `PUT /songs/{id}`: Update an existing song by its ID.

## Data Validation

The API performs data validation on request payloads for the following endpoints:

- `POST /albums`: `name` (string, required), `year` (number, required).
- `PUT /albums`: `name` (string, required), `year` (number, required).
- `POST /songs`: `title` (string, required), `year` (number, required), `genre` (string, required), `performer` (string, required), `duration` (number), `albumId` (string).
- `PUT /songs`: `title` (string, required), `year` (number, required), `genre` (string, required), `performer` (string, required), `duration` (number), `albumId` (string).

## Error Handling

The API handles errors as follows:

- When data validation fails for a request payload, the server returns a 400 Bad Request response with a `fail` status and an error message.
- When a resource is not found, the server returns a 404 Not Found response with a `fail` status and an error message.
- When a server error occurs, the server returns a 500 Internal Server Error response with an `error` status and an error message.

## Database

The data for albums and songs is stored in a PostgreSQL database. The API uses migrations to manage the database structure, ensuring data persistence even after restarting the server.

## Environment Variables

The API accesses the database using the following environment variables:

- `PGUSER`: The user to access the database.
- `PGPASSWORD`: The password of the database user.
- `PGDATABASE`: The name of the database to use.
- `PGHOST`: The host address of the database.
- `PGPORT`: The port number of the database.

These environment variables should be stored in a `.env` file.

## Optional Features

### Displaying Songs in Album Details

The API supports displaying a list of songs within an album on the `GET /albums/{albumId}` endpoint. The response includes the album details along with an array of songs.

### Query Parameter for Song Search

The API implements query parameters for song search on the `GET /songs` endpoint. The query parameters `title` and `performer` can be used to search for songs based on their title or performer. These parameters can be used individually or in combination.

## Testing

To test the API, you can use the provided Postman Collection and Environment. Import both files into Postman and run the test cases to ensure the API meets the specified criteria.
