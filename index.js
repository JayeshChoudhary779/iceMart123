import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import auth from "./middleware/auth.js";
import mongoose from "mongoose";
import key from "./config/keys";
const { MONGOURL } = key;
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); // default middleware to parse req data into json.

app.use("/user", userRouter);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

// app.get("/test", auth, async (req, res) => {
//   res.status(200).json({ message: req.user });
// });
// "start": "nodemon --experimental-modules --es-module-specifier-resolution=node index.js"*/