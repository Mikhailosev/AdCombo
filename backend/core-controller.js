class CoreController {
  //Удалил из-за избыточности
  //   static spin(bet) {
  //     const spinResult = this.getSpinResult(bet);
  //   }

  //Ничего не менял
  static getQuests() {
    return [
      {
        id: 1,
        userId: 1,
        questType: "do_spin",
        questValue: 12,
        userQuestValue: 0,
        isCompleted: false,
        dateCompleted: null
      },
      {
        id: 1,
        userId: 1,
        questType: "spent_money",
        questValue: 2000,
        userQuestValue: 0,
        isCompleted: false,
        dateCompleted: null
      },
      {
        id: 1,
        userId: 1,
        questType: "combo_row",
        questValue: 2,
        userQuestValue: 0,
        isCompleted: false,
        dateCompleted: null
      },
      {
        id: 1,
        userId: 1,
        questType: "get_symbol",
        questValue: 1,
        userQuestValue: 0,
        isCompleted: false,
        dateCompleted: null
      }
    ];
  }

  static spin(bet) {
    let matrix = [];
    for (let i = 0; i < 15; i++) {
      if (Math.floor(Math.random() * (4000 - 1) + 1) <= 10) {
        matrix[i] = Math.floor(Math.random() * (10000 - 11) + 11);
      } else {
        matrix[i] = Math.floor(Math.random() * (10 - 1) + 1);
      }
    }
    return {
      matrix: matrix,
      bet: parseInt(bet)
    };
  }
}

module.exports = CoreController;
