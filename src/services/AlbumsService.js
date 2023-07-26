/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Upload Album failed');
    }

    return result.rows[0].id;
  }

  async getAlbumById(id) {
    // const query = {
    //   text: 'SELECT * FROM albums WHERE id = $1',
    //   values: [id],
    // };

    // const result = await this._pool.query(query);

    // if (!result.rows.length) {
    //   throw new NotFoundError('Album not found');
    // }

    // return result.rows[0];

    const queryAlbum = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const querySongs = {
      text: 'SELECT * FROM songs WHERE album_id = $1',
      values: [id],
    };

    const albumResult = await this._pool.query(queryAlbum);
    const songsResult = await this._pool.query(querySongs);

    if (!albumResult.rows.length) {
      throw new NotFoundError('Album not found');
    }

    const result = {
      id: albumResult.rows[0].id,
      name: albumResult.rows[0].name,
      year: albumResult.rows[0].year,
      songs: songsResult.rows.map((row) => ({
        id: row.id,
        title: row.title,
        performer: row.performer,
      })),
    };

    return result;
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text:
        'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Update Album failed. Id not found');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Delete Album failed. Id not found');
    }
  }
}

module.exports = AlbumsService;
