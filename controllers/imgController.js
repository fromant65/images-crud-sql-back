const url = require("url");
const serverUrl = "http://localhost:3000/";
const fs = require("fs");
const path = require("path");

function getImages(req, res) {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM imagenes", (error, results, fields) => {
      if (error) throw error;
      //console.log(results);

      for (result of results) {
        result.toString("base64");
      }
      res.json(results);
    });
  });
}

function postImage(req, res) {
  const { body, file } = req;
  console.log(body, file);
  const imageUrl = url.resolve(serverUrl, file.path);
  console.log(imageUrl);
  //console.log(body.nombre, " received ");
  req.getConnection((err, conn) => {
    conn.query(
      "INSERT INTO imagenes (nombre, imagen) VALUES (?, ?)",
      [file.filename, imageUrl],
      (error, results, fields) => {
        if (error) throw error;
        res.json(results);
      }
    );
  });
}

function deleteImage(req, res) {
  const { body } = req;
  const { nombre } = body;

  //Eliminar la imagen del servidor
  const imagePath = path.join(__dirname, "..", "uploads", nombre);
  console.log(imagePath);
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ results: "Imagen no encontrada" });
  }
  fs.unlinkSync(imagePath);

  //Eliminar imagen de DB
  req.getConnection((err, conn) => {
    conn.query(
      "DELETE FROM imagenes WHERE nombre = (?)",
      [nombre],
      (error, results, fields) => {
        if (error) throw error;
        res.json(results);
      }
    );
  });
}

module.exports = {
  getImages,
  postImage,
  deleteImage,
};
