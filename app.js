import express from "express";
import routerMovies from "./routers/movies.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

app.use("/api/movies", routerMovies);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server Avviato sulla porta " + port);
});
