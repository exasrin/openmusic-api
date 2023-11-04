const PlaylistsSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistsongs',
  version: '1.0.0',
  register: async (server, {
    playlistsSongsHandler,
    songsService,
    validator,
  }) => {
    const playlistSongsHandler = new PlaylistsSongsHandler({
      playlistsSongsHandler,
      songsService,
      validator,
    });
    server.route(routes(playlistSongsHandler));
  },
};
