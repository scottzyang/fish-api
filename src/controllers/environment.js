const Environment = require('../models/environment');

const environmentController = {
  // INDEX
  getAll: async (req, res) => {
    try {
      const environments = await Environment.find();
      return res.json({ environments });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // SHOW
  getOne: async (req, res) => {
    try {
      const environment = await Environment.findById(req.params.id);
      if (!environment) {
        res.send(404).json({ message: "Unable to find environment." });
      } else {
        res.json({environment});
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },

  // CREATE
  create: async (req, res) => {
    try {
      const environment = await Environment.create(req.body);
      res.status(201).json(environment);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // UPDATE
  update: async (req, res) => {
    try {
      const environment = await Environment.findById(req.params.id);
      if (!environment) {
        res.status(404).json({ message: "Unable to find environment." });
      } else {
        await environment.updateOne(req.body)
        res.status(200).json(environment);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },

  // DELETE
  delete: async (req, res) => {
    try {
      const environment = await Environment.findById(req.params.id);
      if (!environment) {
        res.send(404).json({ message: "Unable to find environment." });
      } else {
        await environment.deleteOne();
        res.status(200).json({ message: "Deleted successfully." })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
}

module.exports = environmentController;
