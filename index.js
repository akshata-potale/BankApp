const User = require("./User");

let admin1 = User.newAdmin("piyush","potale", 23, "male");
let user1 = admin1.newUser("akshu","potale",21,"female");
let user2 = admin1.newUser("mahesh","potale" ,25, "male");
let user3 = admin1.newUser("sonal","potale",21,"female")

admin1.getAllUsers();
admin1.updateUsers(1,"fname","akshata");
let bank1 = admin1.newBank('bank of maharashtra');
let bank2 =admin1.newBank('Janta Bank');

admin1.updateBank(0,"bankName","Central Bank Of India");
// admin1.getAllbanks();
user1.newAccount(0,5000);
user1.newAccount(1,10000);

user2.newAccount(1,8000);
user1.depositMoney(2,9000)
user1.depositMoney(1,4000);
user2.depositMoney(3,1000)

user1.withdrawMoney(2,1000);

console.log(user1.transferMoney(1000,2,1));

user1.getAccounts();
// console.log(bank1);
// console.log(bank2);

console.log(user1);
// console.log(user2);

// console.log(user1.getPassbook(1));
// console.log(user1.getnetWorth());
console.log(user1.getTransactionsByDate(2,"","Mon Sep 04 2023"));
console.log("networth of user is ==", user1.getnetWorth());
// console.log(user1.getPassbook());



