const Bank = require("./Bank")
const Transaction = require("./Transaction")
const User = require("./User")
const { ValidationError, NotFoundError } = require("./errors")

class Account{
    static AccountNo = 1
    static allaccounts =[]
    constructor(bankName,bankId,userId,bankBalance){
        this.AccountNo = Account.AccountNo++
        this.bankName = bankName
        this.bankId = bankId
        this.userId= userId
        this.bankBalance = bankBalance
        this.passbook =[]
    }

    static newAccount(bankId,userId,bankBalance){
        try {
            if(typeof bankId !='number'){
                throw new ValidationError("Invalid bank id")
            }
            if (bankBalance<1000) {
                throw new ValidationError("Minimum 1000 rs is required to create a account")
            }
            let bank = Bank.findBank(bankId)
            if (bank == null) {
                throw new NotFoundError("not found")
            }
            let newAccount = new Account(bank.bankName,bank.bankId,userId,bankBalance)
            Account.allaccounts.push(newAccount)
            return newAccount
        } catch (error) {
            throw error
        }
    }
    getDate(){
        let todayDate = new Date()
        return todayDate.toDateString();
    }

    creditMoney(amount,senderAccountNo,receiverAccountNo){
        try {
            this.bankBalance = this.bankBalance + amount
            let passbookRecord = new Transaction(this.getDate(),senderAccountNo,receiverAccountNo,amount,this.bankBalance,"credit")
            this.passbook.push(passbookRecord)
            return this.bankBalance
        } catch (error) {
            throw error
        }
    }

    debitMoney(amount,senderAccountNo,receiverAccountNo){
        try {
            if (typeof amount !='number') {
                throw new ValidationError("Invalid amount")
            }
            if(amount <=0){
                throw new ValidationError("amount must be greater than 0")
            }
            this.bankBalance = this.bankBalance - amount
            if (this.bankBalance < 1000) {
                throw new ValidationError("Minimum 1000 rs should be in acc")
            }
            let passbookRecord = new Transaction(this.getDate(),senderAccountNo,receiverAccountNo,amount,this.bankBalance,"debit")
            this.passbook.push(passbookRecord)
            return this.bankBalance
        } catch (error) {
            throw error
        }
    }

    static findAccount(AccountNo){
        for (let index = 0; index < Account.allaccounts.length; index++) {
            if (AccountNo == Account.allaccounts[index].AccountNo) {
                return Account.allaccounts[index]
            }            
        }
        return null
    }

    getPassbook(){
        return this.passbook
    }
   
   
            

    

}
module.exports = Account