const { Schema, model } = require('mongoose');
const Populate = require('../../util/autopopulate');

const logSchema = new Schema({
  fishType: { type: Schema.Types.ObjectId, ref: "Fish", required: true },
  length: { type: Number, required: true },
  weight: { type: Number, required: true },
  lure: { type: String, required: true },
  image: { type: String, required: true },
  weather: { type: String, required: true },
  released: { type: Boolean, required: true }
}, { timestamps: true });

logSchema
  .pre('findById', Populate('fishType'))
  .pre('findOne', Populate('fishType'))
  .pre('find', Populate('fishType'));

const Log = model("Log", logSchema)

module.exports = Log;
