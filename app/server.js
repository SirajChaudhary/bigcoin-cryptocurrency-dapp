const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require("web3");
const truffle_connect = require("./service.js");
const bodyParser = require("body-parser");

var web3 = new Web3(new Web3.providers.HttpProvider("http://3.111.231.143:8545"));

/* PARSE APPLICATION/X-WWW-FORM-URLENCODED */
app.use(bodyParser.urlencoded({ extended: false }));

/* PARSE APPLICATION/JSON */
app.use(bodyParser.json());

app.use("/", express.static("app/public"));

/* GET ALL ACCOUNTS */
app.get("/api/accounts", (req, res) => {
  console.log("**** GET /api/accounts ****");
  truffle_connect.start(function (answer) {
    res.send(answer);
  });
});

/* GET ONE ACCOUNT */
app.get("/api/accounts/:id", (req, res) => {
  console.log("**** GET /api/accounts/:id ****");
  truffle_connect.start(function (answer) {
    console.log(answer[req.params.id]);
    res.status(200).send({
      account: answer[req.params.id],
    });
  });
});

/* CREATE A NEW ACCOUNT */
app.post("/api/new/account", (req, res) => {
  console.log("**** POST /api/new/account ****");
  truffle_connect.start(function (answer) {
    (async () => {
      await web3.eth.personal.newAccount().then(
        (result) => {
          console.log(result);
          res.status(200).send({
            success: "true",
            account: result,
          });
        },
        (err) => {
          console.log("Error: ", err);
          res.status(500).send({
            success: "false",
            account: "Some technical issue. Please try again!",
          });
        }
      );
    })();
  });
});

/* GET BALANCE OF AN ACCOUNT */
app.get("/api/balance", (req, res) => {
  console.log("**** GET /api/balance ****");
  console.log(req.body);
  let currentAccount = req.body.account;
  truffle_connect.refreshBalance(currentAccount, (answer) => {
    let account_balance = answer;
    truffle_connect.start(function (answer) {
      res.send(account_balance);
    });
  });
});

/* SEND COINS FROM AN ACCOUNT TO AN ACCOUNT */
app.post("/api/send/coin", (req, res) => {
  console.log("**** POST /api/send/coin ****");
  console.log(req.body);
  let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;
  truffle_connect.sendCoin(amount, sender, receiver, (balance) => {
    res.send(balance);
  });
});

/* SERVER */
app.listen(port, () => {
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(
    new Web3.providers.HttpProvider("http://3.111.231.143:8545")
  );
  console.log("Express Listening at http://localhost:" + port);
});
