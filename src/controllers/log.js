const Log = require('../models/log');

const logController = {
  // INDEX
  getAll: async (req, res) => {
    try {
      const log = await Log.find();
      return res.json({ log });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // SHOW
  getOne: async (req, res) => {
    try {
      const log = await Log.findById(req.params.id)
      if (!log) {
        res.status(404).json({ message: "Unable to find log." });
      } else {
        res.json({log});
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },

  // CREATE
  create: async (req, res) => {
    try {
      const log = await Log.create(req.body);
      res.status(201).json(log);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // UPDATE
  update: async (req, res) => {
    try {
      const log = await Log.findById(req.params.id);
      if (!log) {
        res.status(404).json({ message: "Unable to find log." });
      } else {
        await log.updateOne(req.body)
        res.status(200).json(log);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },

  // DELETE
  delete: async (req, res) => {
    try {
      const log = await Log.findById(req.params.id);
      if (!log) {
        res.send(404).json({ message: "Unable to find log." });
      } else {
        await log.deleteOne();
        res.status(200).json({ message: "Deleted successfully." })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
}

module.exports = logController;
