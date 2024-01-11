class Transaction{
    constructor(date,senderAccountNo,receiverAccountNo,amount,currentBalance,type){
        this.date = date
        this.senderAccountNo = senderAccountNo
        this.receiverAccountNo = receiverAccountNo
        this.amount = amount
        this.currentBalance = currentBalance
        this.type = type
    }

    newTransaction(date,senderAccountNo,receiverAccountNo,amount,currentBalance,type){
        return date,senderAccountNo,receiverAccountNo,amount,currentBalance,type
    }
}
module.exports = Transaction