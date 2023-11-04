const { PlaylistSongsPayloadSchema } = require('./schema');
const InvariantError = require('../../exepction/InvariantError');

const PlaylistSongsValidator = {
  validatePlaylistSongsPayload: (payload) => {
    const validationResult = PlaylistSongsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistSongsValidator;
