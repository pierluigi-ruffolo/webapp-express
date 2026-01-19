import express from "express";
import routerMovies from "./routers/movies.js";
const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

app.use("/api/movies", routerMovies);

app.listen(port, () => {
  console.log("Server Avviato sulla porta " + port);
});
