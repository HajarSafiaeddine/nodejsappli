const Plant = require("../models/plant");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const plant = new Plant({
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    categorie: req.body.categorie,
    cover: req.body.cover,
  });
  Plant.create(plant, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
};
exports.findAll = (res) => {
  Plant.findAll(err, (data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving plant.",
      });
    else res.send(data);
  });
};
exports.findOne = (req, res) => {
  Plant.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found plant with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving plant with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Plant.updateById(req.params.id, new Plant(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Plant with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Plant with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
exports.delete = (req, res) => {
  Plant.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Plant with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete plant with id " + req.params.id,
        });
      }
    } else res.send({ message: `Plant was deleted successfully!` });
  });
};
exports.deleteAll = (res) => {
  Plant.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all plants.",
      });
    else res.send({ message: `All Plants were deleted successfully!` });
  });
};
