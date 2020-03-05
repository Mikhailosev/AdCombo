new Vue({
  el: "#root",
  data: {
    data: {
      quests: {},
      balance: 0,
      spin: {
        matrix: [],
        bet: 0
      },
      counter: 0,
      lastWin: [],
      win: false
    },
    loading: true,
    cantBet: false,
    inputValid: true,
    showModal: false
  },
  methods: {
    async spinSlots() {
      //Обрабатываю инпут
      //Если инпут не подходит, то всплывет подсказка
      if (this.data.spin.bet <= this.data.balance && this.data.spin.bet > 0) {
        this.inputValid = true;
        //Не позволяю ставить пока не известа предыдущая ставка
        this.cantBet = true;
        this.loading = true;
        this.data.balance = this.data.balance - this.data.spin.bet;
        let res = await axios.post("http://localhost:3000/spin", {
          bet: parseInt(this.data.spin.bet)
        });
        this.data = res.data;
        this.loading = false;
        this.cantBet = false;
      } else {
        this.inputValid = false;
        this.showModal = true;
      }
    }
  },
  async created() {
    //Принимаю данные
    let res = await axios.get("http://localhost:3000");
    this.data.quests = res.data.quests;
    this.data.balance = res.data.balance;
    //Искусственно делаю задержку
    setTimeout(() => {
      this.data = res.data;
      this.loading = false;
    }, 2000);
  }
});
