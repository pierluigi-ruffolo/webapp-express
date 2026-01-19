import connection from "../database/dbConnection.js";

function index(req, res) {
  const sql = "SELECT * FROM `movies`";
  connection.query(sql, (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error Server",
      });
    }
    res.json(result);
  });
}

function show(req, res) {
  res.send("sono show");
}

const controller = {
  index,
  show,
};

export default controller;
