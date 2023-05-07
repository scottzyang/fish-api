const { Schema, model } = require('mongoose');
const Populate = require('../../util/autopopulate');

const fishSchema = new Schema({
  name: { type: String, required: true },
  scientificName: { type: String, required: true },
  image: {type: String, required: true },
  family: { type: Schema.Types.ObjectId, ref: "Family", required: true },
  environment: [{ type: Schema.Types.ObjectId, ref: "Environment", required: true }],
  diet: [{ type: String, required: true }],
}, { timestamps: true });

// populate associated fields prior to searches
fishSchema
  .pre('findOne', Populate('family'))
  .pre('findOne', Populate('environment'))
  .pre('findById', Populate('family'))
  .pre('findById', Populate('environment'));

const Fish = model("Fish", fishSchema)

module.exports = Fish;
