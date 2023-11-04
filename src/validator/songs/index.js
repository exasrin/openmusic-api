const { songsPayloadSchema } = require('./schema');
const InvariantError = require('../../exepction/InvariantError');

const SongsValidator = {
  validateSongsPayload: (payload) => {
    const validationResult = songsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongsValidator;
