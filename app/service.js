const contract = require("@truffle/contract");

const bigcoin_artifact = require("../build/contracts/BigCoin.json");
var BigCoin = contract(bigcoin_artifact);

module.exports = {
  start: function (callback) {
    var self = this;

    // Bootstrap the BigCoin abstraction for Use.
    BigCoin.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];

      callback(self.accounts);
    });
  },

  refreshBalance: function (account, callback) {
    var self = this;

    // Bootstrap the BigCoin abstraction for Use.
    BigCoin.setProvider(self.web3.currentProvider);

    var bigCoin;
    BigCoin.deployed()
      .then(function (instance) {
        bigCoin = instance;
        return bigCoin.balanceOf.call(account, { from: account });
      })
      .then(function (value) {
        callback(value.valueOf());
      })
      .catch(function (e) {
        console.log(e);
        callback("Error 404");
      });
  },

  sendCoin: function (amount, sender, receiver, callback) {
    var self = this;

    // Bootstrap the BigCoin abstraction for Use.
    BigCoin.setProvider(self.web3.currentProvider);

    var bigCoin;
    BigCoin.deployed()
      .then(function (instance) {
        bigCoin = instance;
        return bigCoin.transfer(receiver, amount, { from: sender });
      })
      .then(function () {
        self.refreshBalance(sender, function (answer) {
          callback(answer);
        });
      })
      .catch(function (e) {
        console.log(e);
        callback("ERROR 404");
      });
  },
};
