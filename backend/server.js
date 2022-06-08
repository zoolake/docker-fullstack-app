// 필요한 모듈들을 IMPORT
const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

// Express 서버 생성
const app = express();

// json 형태로 오는 요청 본문을 해석할 수 있게 등록
app.use(bodyParser.json());

// 테이블 생성
db.pool.query(
  `create table lists (
  id INTEGER AUTO_INCREMENT,
  value TEXT,
  PRIMARY KEY (id)
)`,
  (err, results, fields) => {
    console.log("results", results);
  }
);

// lists 테이블 조회 (GET)
app.get("/api/values", function (req, res) {
  db.pool.query("select * from lists;", (err, results, fields) => {
    if (err) return res.status(500).send(err);
    else return res.json(results);
  });
});

// lists 테이블에 저장 (POST)
app.post("/api/value", function (req, res, next) {
  db.pool.query(`insert into lists (value) values("${req.body.value}")`, (err, results, fields) => {
    if (err) return res.status(500).send(err);
    else return res.json({ success: true, value: req.body.value });
  });
});

app.listen(5000, () => {
  console.log("어플리케이션이 5000번 포트에서 시작");
});
