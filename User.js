const Account = require("./Account")
const Bank = require("./Bank")
const {ValidationError, UnauthorizedError, NotFoundError} = require("./errors")

class User{
    static id = 0
    static allUsers=[]
    constructor(fname,lname,age,gender,isAdmin){
        this.id = User.id++
        this.fname = fname
        this.lname = lname
        this.age= age
        this.gender = gender
        this.isAdmin = isAdmin
        this.accounts =[]
        this.netWorth = 0
    }

    static newAdmin(fname,lname,age,gender){
        try {
            if (typeof fname !='string') {
                throw new ValidationError("Invalid first name")
            }
            if (typeof lname !='string') {
                throw new ValidationError("Invalid last name")
            }
            if (typeof age !='number') {
                throw new ValidationError("Invalid age")
            }
            if (age<0) {
                throw new ValidationError("Invalid age")
            }
            if (typeof gender !='string') {
                throw new ValidationError("Invalid gender")
            }
            return new User(fname,lname,age,gender,true)
        } catch (error) {
            return error
        }

    }

    newUser(fname,lname,age,gender){
        try {
            if (typeof fname !='string') {
                throw new ValidationError("Invalid first name")
            }
            if (typeof lname !='string') {
                throw new ValidationError("Invalid last name")
            }
            if (typeof age !='number') {
                throw new ValidationError("Invalid age")
            }
            if (age<0) {
                throw new ValidationError("Invalid age")
            }
            if (typeof gender !='string') {
                throw new ValidationError("Invalid gender")
            }
            let newUser =  new User(fname,lname,age,gender,false)
            User.allUsers.push(newUser)
            return newUser
        } catch (error) {
            return error
        }
    }

    getAllUsers(){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("Only admin can get users")
            }
            if (User.allUsers==null) {
                throw new NotFoundError("Users not found")
            }
            return User.allUsers
        } catch (error) {
            error
        }
    }

    static findUser(id) {
        for (let index = 0; index < User.allUsers.length; index++) {
          if (id == User.allUsers[index].id) {
            return User.allUsers[index];
          }
        }
        return null;
    }

    updateFirstName(newValue){
        try {
            if (typeof newValue!='string') {
                throw new ValidationError("Invalid first name")
            }
            this.fname = newValue
        } catch (error) {
            return error
        }
    }

    updateLastName(newValue){
        if (typeof newValue!='string') {
            throw new ValidationError("Invalid last name")
        }
        this.lname = newValue
    }

    updateAge(newValue){
        if (typeof newValue!='number' || newValue<0) {
            throw new ValidationError("Invalid age")
        }
        this.age = newValue
    }

    updateGender(newValue){
        if (typeof newValue!='string') {
            throw new ValidationError("Invalid Gender")
        }
        this.gender = newValue
    }



    updateUsers(id,parameter,newValue){
        try {
            if(!this.isAdmin){
                throw new UnauthorizedError("Only admin can update users")
            }
            let userToBeUpdated = User.findUser(id)
            if (userToBeUpdated == null) {
                throw new NotFoundError("user not found")    
            }

            switch (parameter) {
                case "fname": userToBeUpdated.updateFirstName(newValue)
                    return userToBeUpdated
                case "lname":userToBeUpdated.updateLastName(newValue)
                    return userToBeUpdated
                case "age":userToBeUpdated.updateAge(newValue)
                    return userToBeUpdated
                case "gender":userToBeUpdated.updateGender(newValue)
                    return userToBeUpdated
                default:
                    throw new ValidationError("Invalid parameters");
            }
        } catch (error) {
            return error
        }
    }

    newBank(bankName) {
        try {
          if (!this.isAdmin) {
            throw new UnauthorizedError("Not a Admin");
          }
          return Bank.newBank(bankName);
        } catch (error) {
          return error
        }
      }

    getAllbanks(){
        try {
            if (!this.isAdmin) {
                throw new UnauthorizedError("Only admin can get banks")
            }
            if (Bank.allbanks==null) {
                throw new NotFoundError("Bank not found")
            }
            return Bank.allbanks
        } catch (error) {
            
        }
    }

    updateBank(bankId,parameter,newValue){
        try {
            if (!this.isAdmin) {
                throw new UnauthorizedError("only admin can update")
            }
            let bankToBeUpdated = Bank.findBank(bankId)
            if (bankToBeUpdated == null) {
                throw new NotFoundError("not found")
            }
            return bankToBeUpdated.updateBank(parameter,newValue)
        } catch (error) {
            return error
        }
    }
    
    newAccount(bankId,bankBalance){
        try {
            if (this.isAdmin) {
                throw new UnauthorizedError("Only user can create acc")
            }
            let bankacc = Bank.findBank(bankId)
            if (bankacc == null) {
                throw new NotFoundError("Not found")
            }
            let newAccount = Account.newAccount(bankacc.bankId,this.id,bankBalance)
            this.accounts.push(newAccount)
            bankacc.accounts.push(newAccount)
            bankacc.calculateBankTotal()
            this.userNetWorth()
            return this
        } catch (error) {
            return error
        }
    }

    getAccounts(){
        try {
            if (this.isAdmin) {
                throw new UnauthorizedError("Only users can get accounts")
            }
            return this.accounts
        } catch (error) {
            return error
        }
    }

    findUserAcc(AccountNo){
        for (let index = 0; index < this.accounts.length; index++) {
            if (AccountNo == this.accounts[index].AccountNo) {
                return this.accounts[index]
            }            
        }
        return null
    }

    depositMoney(AccountNo,amount,senderAccountNo,receiverAccountNo){
        try {
            if (this.isAdmin) {
                throw new UnauthorizedError("Only user can deposit money")
            }
            if (typeof AccountNo!='number') {
                throw new ValidationError("Invalid account no")
            }
            if (typeof amount!="number"  || amount < 0) {
                throw new ValidationError("Invalid amount")
            }
            
            let acc = this.findUserAcc(AccountNo);
            if(acc == null){
                throw new NotFoundError("account not found")
            }
            acc.creditMoney(amount,null,null)
            let bankAcc = Bank.findBank(acc.bankId)
            if (bankAcc == null) {
                throw new NotFoundError("Bank not found")
            }
            bankAcc.calculateBankTotal()
            this.userNetWorth()
            return acc

        } catch (error) {
            return error
        }
    }

    withdrawMoney(AccountNo,amount,senderAccountNo,receiverAccountNo){
        try {
            if (this.isAdmin) {
                throw new UnauthorizedError("only user can deposit money")
            }
            if (typeof AccountNo!='number') {
                throw new ValidationError("Invalid account no")
            }
            if (typeof amount!="number" || amount < 0) {
                throw new ValidationError("Invalid amount")
            }
            let userAcc = this.findUserAcc(AccountNo)
            if(userAcc == null){
                throw new NotFoundError("account not found")
            }
            userAcc.debitMoney(amount,null,null)
            let bankacc = Bank.findBank(userAcc.bankId)
            if(bankacc == null){
                throw new NotFoundError("Bank not found")
            }
            bankacc.calculateBankTotal()
            this.userNetWorth()
            return userAcc
        } catch (error){
            return error
        }
    }
    
    transferMoney(amount, senderAccountNo, receiverAccountNo){
        try {
            if (this.isAdmin) {
                throw new UnauthorizedError("Only user can transfer amount")
            }
            if (typeof senderAccountNo !='number') {
                throw new ValidationError("Invalid account no")
            }
            if(typeof receiverAccountNo !='number'){
                throw new ValidationError("Invalid account no")
            }
            if (senderAccountNo === receiverAccountNo) {
                throw new ValidationError("Cannot transfer amount")
            }
        
            let senderAccount = this.findUserAcc(senderAccountNo)
            let receiverAccount = Account.findAccount(receiverAccountNo)
            if (senderAccount.bankBalance - amount < 1000) {
                throw new ValidationError("Minimum 1000 rs should be in account")
            }
            senderAccount.debitMoney(amount,senderAccountNo,receiverAccountNo)
            receiverAccount.creditMoney(amount,senderAccountNo,receiverAccountNo)

            let senderBank = Bank.findBank(senderAccount.bankId)
            if (senderBank == null) {
                throw new NotFoundError("Bank not found")
            }
            senderBank.calculateBankTotal()
            this.userNetWorth()

            let receiverBank = Bank.findBank(receiverAccount.bankId)
            if(receiverBank == null){
                throw new NotFoundError("Bank not found")
            }
            receiverBank.calculateBankTotal()
            return senderAccount,receiverAccount
        } catch (error) {
            return error
        }
    }

    getPassbook(accountNo){
        if (this.isAdmin) {
            throw new UnauthorizedError("Admin cannot get Passbook")
        }
        let accPassbookTobefetched = this.findUserAcc(accountNo)
        return accPassbookTobefetched.getPassbook()
    }

    userNetWorth(){
        let total = 0
        for (let index = 0; index < this.accounts.length; index++) {
            total = total + this.accounts[index].bankBalance    
        }
        this.netWorth = total
        return this.netWorth
    }

    getnetWorth(){
        return this.netWorth
    }

    getTransactionsByDate(accountNo,startDate,endDate){
        try {
            if (this.isAdmin) {
                throw new UnauthorizedError("Only users can get Transaction")
            }
            if (typeof accountNo!='number') {
                throw new ValidationError("Invalid account No")
            }

            if (typeof startDate != 'string') {
                throw new ValidationError("Invalid start date")
            }

            if (typeof endDate != 'string') {
                throw new ValidationError("Invalid end date")
            }


            let transactionDetails = this.findUserAcc(accountNo)
            let passbook = transactionDetails.passbook
            
            passbook.filter((data)=>{data.date>=startDate && data.date<=endDate})
              return passbook
            

        } catch (error) {
            return error
        }
    }
}
module.exports = User