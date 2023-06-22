import express from "express";
import { readFile } from "fs/promises";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cloudinary from "cloudinary";
import postsRoute from "./routes/postsRoute.js";
import commentsRoute from "./routes/commentsRoute.js";
import imagesRoute from "./routes/imagesRoute.js";

import usersRoute from "./routes/usersRoute.js";

import fileUpload from "express-fileupload";
import swaggerUi from "swagger-ui-express";


// we will import the routes here

// app config

dotenv.config();

// console.log(process.env)

const app = express();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(
    JSON.parse(await readFile(new URL("./docs/swagger.json", import.meta.url)))
  )
);

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// app.use(cors({ origin: "http://localhost:5173", exposedHeaders: ["token"] }));
app.use(express.static("views/dist"))
app.use(
    fileUpload({
        useTempFiles: true,
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
    })
);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

// Configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// routes
app.get("/", (req, res) => {
    res.sendFile("./views/dist/index.html", { root: "." })
})

app.use("/users", usersRoute);
app.use("/posts", postsRoute);
app.use("/comments", commentsRoute);
app.use("/images", imagesRoute);

// listen
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
