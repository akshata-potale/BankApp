class BankingAppError extends Error{
    constructor(message,name,httpStatusCode,SpecificMessage){
        super(message)
        this.name = name
        this.httpStatusCode = httpStatusCode
        this.SpecificMessage = SpecificMessage

    }
    
}
module.exports = BankingAppError