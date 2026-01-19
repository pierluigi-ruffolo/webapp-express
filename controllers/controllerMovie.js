import connection from "../database/dbConnection.js";

function index(req, res, next) {
  const sql = "SELECT * FROM `movies`";
  connection.query(sql, (error, result) => {
    if (error) {
      return next(error);
    }
    res.json(result);
  });
}

function show(req, res, next) {
  const id = req.params.id;
  const sqlMovies = "SELECT * FROM `movies` WHERE `movies`.`id` = ?";
  connection.query(sqlMovies, [id], (error, resultMovies) => {
    if (error) {
      return next(error);
    }
    if (resultMovies.length === 0) {
      return res.status(404).json({
        message: "Risorsa Non trovata",
        error: "NOT FOUND",
      });
    }
    const movies = resultMovies[0];
    const sqlReviews = "SELECT * FROM `reviews` WHERE `reviews`.`movie_id` = ?";
    connection.query(sqlReviews, [id], (error, resultReviews) => {
      if (error) {
        return next(error);
      }
      const response = {
        ...movies,
        reviews: resultReviews,
      };

      res.json(response);
    });
  });
}

const controller = {
  index,
  show,
};

export default controller;
