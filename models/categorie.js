const sql = require("../connection/connection.js");

const Categorie = function (categorie) {
  this.name = categorie.name;
};
categorie.create = (newcategorie, result) => {
  sql.query("INSERT INTO categorie SET ?", newcategorie, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created categorie : ", { id: res.insertId, ...newcategorie });
    result(null, { id: res.insertId, ...newcategorie });
  });
};

Categorie.finById = (id, result) => {
  sql.query(`SELECT * FROM categorie WHERE id=${id}`, (err, res) => {
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

Categorie.getAll = (result) => {
  let query = "SELECT * FROM categorie";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
      return;
    }
    console.log("categories: ", res);
    result(null, res);
  });
};
Categorie.deleteAll = (result) => {
  let query = "DELETE * FROM categorie";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} categories`);
    result(null, res);
  });
};
module.exports = Categorie;
