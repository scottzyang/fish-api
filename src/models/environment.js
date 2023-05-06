const { Schema, model } = require('mongoose');

const environmentSchema = new Schema({
  name: { type: String, required: true },
}, { timestamps: true });

const Environment = model("Environment", environmentSchema)

module.exports = Environment;
