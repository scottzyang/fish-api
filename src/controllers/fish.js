const Fish = require('../models/fish');

const fishController = {
  // INDEX
  getAll: async (req, res) => {
    try {
      const fish = await Fish.find();
      return res.json({ fish });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // SHOW
  getOne: async (req, res) => {
    try {
      const fish = await Fish.findById(req.params.id).populate('family');
      if (!fish) {
        res.status(404).json({ message: "Unable to find fish." });
      } else {
        res.json({fish});
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },

  // CREATE
  create: async (req, res) => {
    try {
      const fish = await Fish.create(req.body);
      res.status(201).json(fish);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // UPDATE
  update: async (req, res) => {
    try {
      await Fish.findByIdAndUpdate(req.params.id, req.body);
      const updatedFish = await Fish.findById(req.params.id)
      if (!updatedFish) {
        return res.status(404).json({ message: "Fish could not be found." })
      }
      return res.json(updatedFish)
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },

  // DELETE
  delete: async (req, res) => {
    try {
      const fish = await Fish.findById(req.params.id);
      if (!fish) {
        res.send(404).json({ message: "Unable to find fish." });
      } else {
        await fish.deleteOne();
        res.status(200).json({ message: "Deleted successfully." })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
}

module.exports = fishController;
