const Joi = require('joi');

const PlaylistSongsPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = { PlaylistSongsPayloadSchema };
