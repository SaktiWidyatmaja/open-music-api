// require('dotenv')

// eslint-disable-next-line import/no-extraneous-dependencies
const Hapi = require('@hapi/hapi');

// const songs = require('./api/songs');
// const albums = require('./api/albums');
// const songsService = require('./services/songsService');
// const albumsService = require('./services/albumsService');
// const songsValidator = require('./validator/songs');
// const albumsValidator = require('./validator/albums');

const init = async () => {
  // const songsService = new SongsService();
  // const albumsService = new AlbumsService();

  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // await server.register({
  //   plugin: songs,
  //   options: {
  //     service: songsService,
  //     validator: SongsValidator,
  //   },
  // });

  // await server.register({
  //   plugin: albums,
  //   options: {
  //     service: albumsService,
  //     validator: AlbumsValidator,
  //   },
  // });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
