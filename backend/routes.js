const CoreController = require("./core-controller");
const express = require("express");
const router = express.Router();
let data = require("./data.json");
//Стартовые данные
router.get("/", (req, res) => {
  data = {
    quests: CoreController.getQuests(),
    balance: Math.floor(Math.random() * (1500 - 700) + 700),
    spin: CoreController.spin(0)
  };
  res.send(data);
});
//Запрос на раскрутку слота
router.post("/spin", (req, res) => {
  //Параметр переданный с запросом
  bet = req.body.bet;
  //Работа напрямую с объектом json
  data.quests[0].userQuestValue++;
  data.quests[1].userQuestValue += bet;
  let win = false;
  let counter = 1;
  let lastWin = [];
  let results = CoreController.spin(bet);
  data.spin = results;
  data.spin.matrix.map((result, index) => {
    //Проверка на два подряд
    if (result === data.spin.matrix[index + 3]) {
      win = true;
      counter = counter * 2;
      lastWin[index] = result;
      lastWin[index + 3] = data.spin.matrix[index + 3];
      //Проверка на три подряд
      if (
        result === data.spin.matrix[index + 3] &&
        result === data.spin.matrix[index + 6]
      ) {
        data.quests[2].userQuestValue++;
      }
    }
    //Проверка на уникальные цифры
    if (result > 10) {
      data.quests[3].userQuestValue++;
    }
  });
  //Понимаем выиграли мы или нет
  data.win = win;
  if (win)
    data.balance = data.balance - data.spin.bet + data.spin.bet * counter;
  else data.balance = data.balance - data.spin.bet;
  //Отслеживание состояния достижения ачивки
  data.quests.map((quest, index) => {
    if (!quest.isCompleted) {
      if (quest.userQuestValue >= quest.questValue) {
        data.quests[index].isCompleted = true;
        data.quests[index].dateCompleted = new Date();
      }
    }
  });
  //Присваиваю выигрушную матрицу
  data.lastWin = lastWin;
  //Передаю коэффициент нашего выигрыша
  data.counter = counter;
  res.send(data);
});

module.exports = router;
