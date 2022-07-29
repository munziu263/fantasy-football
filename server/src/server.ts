// server/src/server.js
import express from "express";
import mongoose from "mongoose";
import axios from "axios";
import cors from "cors";

// Assign environment variables
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/test";

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

// Function to connect to the database
const conn = () => {
  mongoose.connect(mongoUri, options);
};
// Call it to connect
conn();

// Handle the database connection and retry as needed
const db = mongoose.connection;
db.on("error", (err) => {
  console.log("There was a problem connecting to mongo: ", err);
  console.log("Trying again");
  setTimeout(() => conn(), 5000);
});
db.once("open", () => console.log("Successfully connected to mongo"));

// Setup routes to respond to client
app.get("/api", (req: any, res: any) => {
  console.log("Client request received");
  const player: any = axios
    .get("https://fantasy.premierleague.com/api/bootstrap-static/")
    .then((response: any) => {
      res.status(200).json(response.data);
    })
    .catch((err: Error) => res.send(err));
});

// Setup a record in the database to retrieve
// const { Schema } = mongoose;
// const userSchema = new Schema(
//   {
//     name: String
//   },
//   {
//     timestamps: true
//   }
// );
// const User = mongoose.model("User", userSchema);
// const user = new User({ name: "Big Bill Brown" });
// user
//   .save()
//   .then(user => console.log(`${user.name} saved to the database`))
//   .catch(err => console.log(err));

app.listen(port, () => console.log(`Listening on port ${port}`));
