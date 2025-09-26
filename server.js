
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Readdirsync = require("fs-readdir-recursive");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERROR", err));


// application middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
// if(process.env.NODE_ENV == "development"){
//     app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
// }

// Middleware to parse JSON bodies
app.use(express.json());


const port = process.env.PORT || 8000;

const authRoutes = require("./routes/auth");


app.use("/api", authRoutes);


app.listen(port, () => {
    console.log(`API is running on port ${port}`);
    console.log(`http://localhost:${port}/api/signup`);
});