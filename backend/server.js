const express = require("express");
const routes = require("./routes");
const morgan = require("morgan");
const bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.json());
//Для отслеживания респонсов
app.use(morgan("dev"));
//Middleware end для обработки запросов
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requeted-With, Content-Type, Accept, Authorization, RBR"
  );
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});
//Аутсорс самих роутов
app.use("/", routes);
//Подклчение сервера к порту
app.listen(3000);
console.log("ServerStarted");
