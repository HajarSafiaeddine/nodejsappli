const sql = require("../connection/connection.js");

const Plant = function (plant) {
  this.id = plant.id;
  this.name = plant.name;
  this.price = plant.price;
  this.categorie = plant.categorie;
  this.cover = plant.cover;
};
Plant.create = (newPlant, result) => {
  sql.query("INSERT INTO PLANTS SET ?", newPlant, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created plant : ", { id: res.insertId, ...newPlant });
    result(null, { id: res.insertId, ...newPlant });
  });
};

Plant.finById = (id, result) => {
  sql.query(`SELECT * FROM PLANTS WHERE id=${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.lenght) {
      console.log("plant found: ", res[0]);
      return;
    }
    result({ Kind: "not_found" }, null);
  });
};

Plant.findAll = (result) => {
  let query = "SELECT * FROM PLANTS";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
      return;
    }
    console.log("plants: ", res);
    result(null, res);
  });
};
Plant.updateById = (id, plant, result) => {
  sql.query(
    "UPDATE plants SET name = ?, cover = ?, categorie = ?,price = ? WHERE id = ?",
    [plant.name, plant.cover, plant.categorie, plant.price, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated plant: ", { id: id, ...plant });
      result(null, { id: id, ...plant });
    }
  );
};
Plant.deleteAll = (result) => {
  let query = "DELETE * FROM PLANTS";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} plants`);
    result(null, res);
  });
};
module.exports = Plant;
