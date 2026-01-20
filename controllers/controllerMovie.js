import connection from "../database/dbConnection.js";

function index(req, res, next) {
  const title = req.query.title;
  if (title === undefined) {
    const sql =
      "select movies.*, avg(reviews.vote) as vote_movie from movies inner join reviews on movies.id = reviews.movie_id GROUP BY movies.id";
    connection.query(sql, (error, result) => {
      if (error) {
        return next(error);
      }
      res.json(result);
    });
  } else {
    const sqlLink = `${title}%`;
    const sqlTitle =
      "select movies.*, avg(reviews.vote) as vote_movie from movies left join reviews on movies.id = reviews.movie_id GROUP BY movies.id having movies.title Like ?";
    connection.query(sqlTitle, [sqlLink], (error, resultTitle) => {
      if (error) {
        return next(error);
      }
      if (resultTitle.length === 0) {
        return res.status(404).json({
          message: "Risorsa Non trovata",
          error: "NOT FOUND",
        });
      }
      res.json(resultTitle);
    });
  }
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
