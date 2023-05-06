const { Schema, model } = require('mongoose');

const familySchema = new Schema({
  name: { type: String, required: true },
  scientific_name: { type: String, required: true }
}, { timestamps: true });

const Family = model("Family", familySchema)

module.exports = Family;
