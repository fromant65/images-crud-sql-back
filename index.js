const express = require("express");
const app = express();
const mysql = require("mysql");
const myConnection = require("express-myconnection");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(cors());

//DB
app.use(
  myConnection(
    mysql,
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "images_crud",
    },
    "single"
  )
);

//Routes
app.use(require("./routes/root"));

app.listen(PORT, () => {
  console.log(`Server on Port ${PORT}`);
});
