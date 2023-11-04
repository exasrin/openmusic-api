const { albumsPayloadSchema } = require('./schema');
const InvariantError = require('../../exepction/InvariantError');

const AlbumsValidator = {
  validateAlbumsPayload: (payload) => {
    const validationResult = albumsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
