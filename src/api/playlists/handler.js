const autoBind = require('auto-bind');
// const NotFoundError = require('../../exepction/NotFoundError');
// const AuthorizationError = require('../../exepction/AuthorizationError');
const ClientError = require('../../exepction/ClientError');

class PlaylistsHandler {
  constructor(usersService, playlistsService, validator) {
    this._playlistsService = playlistsService;
    this._validator = validator;
    this._usersService = usersService;

    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    try {
      this._validator.validatePlaylistPayload(request.payload);

      const { name } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      const playlistId = await this._playlistsService.addPlaylist({ name, owner: credentialId });

      const response = h.response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
          playlistId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // server error
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async getPlaylistsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._playlistsService.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async getPlaylistByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(id, credentialId);

    const playlist = await this._playlistsService.getPlaylistById(id);
    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async putPlaylistByIdHandler(request, h) {
    try {
      this._validator.validatePlaylistPayload(request.payload);
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistAccess(id, credentialId);
      await this._playlistsService.editPlaylistById(id, request.payload);

      return {
        status: 'success',
        message: 'Playlist berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }

  async deletePlaylistByIdHandler(request) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(id, credentialId);
    await this._playlistsService.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Playlist berhasil dihapus',
    };
  }

  // // Playlist Song
  // async postPlaylistSongHandler(request, h) {
  //   console.log('==============test================');

  //   this._validator.validatePlaylistsPayload(request.payload);
  //   const { songId } = request.payload;
  //   const { playlistId } = request.params;
  //   const { id: credentialId } = request.auth.credentials;

  //   await this._service.verifyPlaylistAccess(playlistId, credentialId);
  //   await this._service.addSongToPlaylist(playlistId, songId);
  //   await this._service.addActivity(playlistId, songId, credentialId);
  //   const response = h.response({
  //     status: 'success',
  //     message: 'Lagu berhasil ditambahkan ke playlist',
  //   });
  //   response.code(201);
  //   return response;
  // }

  // async getPlaylistSongsHandler(request) {
  //   const { playlistId } = request.params;
  //   const { id: credentialId } = request.auth.credentials;

  //   await this._service.verifyPlaylistAccess(playlistId, credentialId);
  //   const playlist = await this._service.getSongsFromPlaylist(playlistId);

  //   return {
  //     status: 'success',
  //     data: {
  //       playlist,
  //     },
  //   };
  // }

  // async deletePlaylistSongByIdHandler(request) {
  //   const { playlistId } = request.params;
  //   const { songId } = request.payload;
  //   const { id: credentialId } = request.auth.credentials;

  //   await this._service.verifyPlaylistAccess(playlistId, credentialId);
  //   await this._service.deleteSongFromPlaylist(playlistId, songId);
  //   await this._service.deleteActivity(playlistId, songId, credentialId);

  //   return {
  //     status: 'success',
  //     message: 'Lagu berhasil dihapus dari playlist',
  //   };
  // }

  // async getPlaylistActivitiesHandler(request, h) {
  //   const { id } = request.params;
  //   const { id: credentialId } = request.auth.credentials;

  //   await this._service.verifyPlaylistAccess(id, credentialId);
  //   const activities = await this._service.getPlaylistActivities(id);

  //   const response = h.response({
  //     status: 'success',
  //     data: activities,
  //   });

  //   response.code(200);
  //   return response;
  // }

  // async verifyPlaylistOwner(playlistId, userId) {
  //   const query = {
  //     text: 'SELECT * FROM playlists WHERE id = $1',
  //     values: [playlistId],
  //   };
  //   const result = await this._pool.query(query);

  //   if (!result.rowCount) {
  //     throw new NotFoundError('Playlist not found');
  //   }
  //   const playlist = result.rows[0];
  //   if (playlist.owner !== userId) {
  //     throw new AuthorizationError('You don\'t have the right to access this resource');
  //   }
  // }

  // async verifyPlaylistAccess(playlistId, userId) {
  //   try {
  //     await this.verifyPlaylistOwner(playlistId, userId);
  //   } catch (error) {
  //     if (error instanceof NotFoundError) {
  //       throw error;
  //     }
  //     try {
  //       await this._collaborationService.verifyCollaborator(playlistId, userId);
  //     } catch {
  //       throw error;
  //     }
  //   }
  // }
}

module.exports = PlaylistsHandler;
