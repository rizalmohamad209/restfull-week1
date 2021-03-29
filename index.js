const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 3006;
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "week1",
});

conn.connect((err) => {
  if (err) {
    console.log("Can't connect to database");
  } else {
    console.log("Connect to database");
  }
});

//Get All Data Mahasiswa
app.get("/api/mhs", (req, res) => {
  let sql = "select * from mhs";
  conn.query(sql, (err, result) => {
    if (err) {
      res.send({
        msg: "Failed While get data mhs",
        status: 500,
        err,
      });
    } else {
      res.send({
        msg: "success get data all mahasiswa",
        status: 200,
        data: result,
      });
    }
  });
});

//Post Data Mahasiswa
app.post("/api/mhs", (req, res) => {
  let { body } = req;
  let sql = "INSERT INTO mhs SET ?";
  conn.query(sql, body, (err, result) => {
    if (err) {
      res.send({
        msg: "Failed add data",
        status: 500,
        err,
      });
    } else {
      let newBody = {
        id: result.insertId,
        ...body,
      };
      res.send({
        msg: "Success Add data",
        status: 200,
        data: newBody,
      });
    }
  });
});

//Get Data By id
app.get("/api/mhs/:id", (req, res) => {
  let { id } = req.params;
  let sql = `SELECT * FROM mhs WHERE id=${id}`;
  conn.query(sql, (err, result) => {
    if (err) {
      res.send({
        msg: " Failed Get Data By Id",
        status: 500,
        err,
      });
    } else {
      res.send({
        msg: "Succes Get Data By Id",
        status: 200,
        data: result,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server Running in port ${port}`);
});
