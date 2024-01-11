const Account = require("./Account")
const { ValidationError } = require("./errors")

class Bank{
    static bankId = 0
    static allbanks =[]
    constructor(bankName,abbrevation){
        this.bankId = Bank.bankId++
        this.bankName = bankName
        this.abbrevation = abbrevation
        this.accounts=[]
        this.bankSum = 0
    }

    static abbreviationMethod(bankName){
        let array = bankName.split(' ')
            const firstLetterArray = []
            for (const word of array) {
                if (word.length > 0 ) {
                firstLetterArray.push(word[0]);
                }   
            }
            const firstLetterString = firstLetterArray.join('');
            return firstLetterString
    }

    static newBank(bankName){     
        try {
            if (typeof bankName!='string') {
                throw new ValidationError("Invalid bankname")
            }
            let newBank = new Bank(bankName,Bank.abbreviationMethod(bankName))
            Bank.allbanks.push(newBank)
            return newBank
        } catch (error) {
            throw error
        }
    }

    static findBank(bankId){
        for (let index = 0; index < Bank.allbanks.length; index++) {
            if (bankId == Bank.allbanks[index].bankId) {
                return Bank.allbanks[index]
            }
        }
        return null      
    }


    updatebankName(newValue){
        try {
            if (typeof newValue!='string') {
                throw new ValidationError("invalid new bank name")
            }
            this.bankName = newValue
        } catch (error) {
            return error
        }
    }

    updateBank(parameter,newValue){
        try {
            if (typeof parameter != 'string') {
                throw new ValidationError("Invalid parameter")
            }
            switch (parameter) {
                case "bankName": this.updatebankName(newValue)
                this.abbrevation = Bank.abbreviationMethod(newValue)
                return [this,this.abbrevation]
                
                default:
                    throw new ValidationError("Invalid parameters")
            }
        } catch (error) {
            return error
        }
    }

    calculateBankTotal(){
        let bankTotal = 0
        for (let index = 0; index < this.accounts.length; index++) {
            bankTotal = bankTotal + this.accounts[index].bankBalance
        }
        this.bankSum = bankTotal
        return this.bankSum
    }

    getBankTotal(){
        return this.bankSum
    }


}
module.exports = Bank