const routes = (handler) => [{
  method: 'POST',
  path: '/playlists',
  handler: handler.postPlaylistHandler,
  options: {
    auth: 'openmusicapp_jwt',
  },
},
{
  method: 'GET',
  path: '/playlists',
  handler: handler.getPlaylistsHandler,
  options: {
    auth: 'openmusicapp_jwt',
  },
},
{
  method: 'GET',
  path: '/playlists/{id}',
  handler: handler.getPlaylistByIdHandler,
  options: {
    auth: 'openmusicapp_jwt',
  },
},
{
  method: 'PUT',
  path: '/playlists/{id}',
  handler: handler.putPlaylistByIdHandler,
  options: {
    auth: 'openmusicapp_jwt',
  },
},
{
  method: 'DELETE',
  path: '/playlists/{id}',
  handler: handler.deletePlaylistByIdHandler,
  options: {
    auth: 'openmusicapp_jwt',
  },
},
// {
//   method: 'POST',
//   path: '/playlists/{playlistId}/songs',
//   handler: handler.postPlaylistSongHandler,
//   options: {
//     auth: 'openmusicapp_jwt',
//   },
// },
// {
//   method: 'GET',
//   path: '/playlists/{playlistId}/songs',
//   handler: handler.getPlaylistSongsHandler,
//   options: {
//     auth: 'openmusicapp_jwt',
//   },
// },
// {
//   method: 'DELETE',
//   path: '/playlists/{playlistId}/songs',
//   handler: handler.deletePlaylistSongByIdHandler,
//   options: {
//     auth: 'openmusicapp_jwt',
//   },
// },
// {
//   method: 'GET',
//   path: '/playlists/{id}/activities',
//   handler: handler.getPlaylistActivitiesHandler,
//   options: {
//     auth: 'openmusicapp_jwt',
//   },
// },
];

module.exports = routes;
