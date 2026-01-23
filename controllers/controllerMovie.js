import connection from "../database/dbConnection.js";
import slugify from "slugify";
/* index  */
function index(req, res, next) {
  const title = req.query.title;
  if (title === undefined) {
    const sql =
      "select movies.*, avg(reviews.vote) as vote_movie from movies left  join reviews on movies.id = reviews.movie_id GROUP BY movies.id";
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
      res.json(resultTitle);
    });
  }
}
/* show */
function show(req, res, next) {
  const slug = req.params.slug;
  const sqlMovies = "SELECT * FROM `movies` WHERE `movies`.`slug` = ?";
  connection.query(sqlMovies, [slug], (error, resultMovies) => {
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
    connection.query(sqlReviews, [movies.id], (error, resultReviews) => {
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

function store(req, res, next) {
  const { title, director, genre, release_year, abstract } = req.body;
  if (title === undefined || title === "") {
    return res.status(400).json({
      message: "Titolo necessario",
    });
  }

  const slug = slugify(title, {
    replacement: "-",
    lower: true,
    strict: true,
  });
  const nameImage = req.file === undefined ? null : req.file.filename;
  const sql =
    "INSERT INTO `movies`(slug, title, director, genre, release_year,  abstract, image) VALUES (?,?,?,?,?,?,?)";
  connection.query(
    sql,
    [slug, title, director, genre, release_year, abstract, nameImage],
    (error, resalt) => {
      if (error) return next(error);

      return res.json({
        message: "film creato",
        id: resalt.inserId,
      });
    },
  );
}

/* store reviews */
function storeReviews(req, res, next) {
  const id = req.params.id;
  const { name, vote, text } = req.body;
  const sqlSearchMovie = "SELECT * FROM `movies` WHERE movies.id = ?";
  connection.query(sqlSearchMovie, [id], (err, resultMovie) => {
    if (err) return rext(err);
    if (resultMovie.length === 0) {
      return res.status(404).json({
        message: "Impossibile aggiungere una recensione: film non trovato.",
        error: "NOT FOUND",
      });
    }
    if (
      name === undefined ||
      name === "" ||
      vote === undefined ||
      vote < 0 ||
      vote > 5
    ) {
      return res.status(400).json({
        message:
          "I dati inviati non sono validi. Assicurati che il nome sia presente e che il voto sia compreso tra 0 e 5.",
        error: "INVALID",
      });
    }
    const sqlInsertReviews =
      "INSERT INTO `reviews`(movie_id, name, vote, text) values (?, ?, ?, ?)";
    connection.query(
      sqlInsertReviews,
      [id, name, vote, text],
      (error, results) => {
        if (error) return next(error);
        return res.status(201).json({
          message: "reviews creata correttamente",
          id: results.insertId,
        });
      },
    );
  });
}

const controller = {
  index,
  show,
  store,
  storeReviews,
};

export default controller;
