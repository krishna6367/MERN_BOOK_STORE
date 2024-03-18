import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware for handling CORS policy
//1. allow all origins (for simplicity)
app.use(cors());
// //2.allow custom origins
// app.use(
//   cors({
//     orgin: "http://localhost:5000",
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("welcome to MERN stack Tutorial");
});

app.use("/books", booksRoute); //apply the bookRoutes on the /books

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to DB");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
