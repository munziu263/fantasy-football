// server/src/server.js
import express, { Request, response, Response } from "express";
// import mongoose from "mongoose";
import axios, { AxiosResponse } from "axios";
import cors from "cors";

// const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/test";
/**
 * Setup services
 */

// Initialize an express server
const app = express();
app.use(cors());

// Options to pass to mongodb to avoid deprecation warnings
const options = {
  //   useNewUrlParser: true
};

// // Function to connect to the database
// const conn = () => {
//   mongoose.connect(mongoUri, options);
// };
// // Call it to connect
// conn();

// // Handle the database connection and retry as needed
// const db = mongoose.connection;
// db.on("error", (err) => {
//   console.log("There was a problem connecting to mongo: ", err);
//   console.log("Trying again");
//   setTimeout(() => conn(), 5000);
// });
// db.once("open", () => console.log("Successfully connected to mongo"));

// Setup routes to respond to client
app.get("/api", (req: Request, res: Response) => {
  console.log("Client request received: General Data");
  axios
    .get("https://fantasy.premierleague.com/api/bootstrap-static/")
    .then((response: AxiosResponse) => {
      res.status(200).json(response.data);
    })
    .catch((err: Error) => res.send(err));
});

app.get("/api/player-history/:id", (req: Request, res: Response) => {
  console.log("Client request received: Player History");
  axios
    .get(
      "https://fantasy.premierleague.com/api/element-summary/" +
        req.params.id +
        "/"
    )
    .then((response: AxiosResponse) => {
      res.status(200).json(response.data);
    })
    .catch((err: Error) => res.send(err));
});

export default app;
