const Family = require('../models/family');

const familyController = {
  // INDEX
  getAll: async (req, res) => {
    try {
      const families = await Family.find();
      return res.json({ families });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // SHOW
  getOne: async (req, res) => {
    try {
      const family = await Family.findById(req.params.id);
      if (!family) {
        res.send(404).json({ message: "Unable to find family." });
      } else {
        res.json({family});
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },

  // CREATE
  create: async (req, res) => {
    try {
      const family = await Family.create(req.body);
      res.status(201).json(family);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // UPDATE
  update: async (req, res) => {
    try {
      const family = await Family.findById(req.params.id);
      if (!family) {
        res.status(404).json({ message: "Unable to find family." });
      } else {
        await family.updateOne(req.body)
        res.status(200).json(family);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },

  // DELETE
  delete: async (req, res) => {
    try {
      const family = await Family.findById(req.params.id);
      if (!family) {
        res.send(404).json({ message: "Unable to find family." });
      } else {
        await family.deleteOne();
        res.status(200).json({ message: "Deleted successfully." })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
}

module.exports = familyController;
