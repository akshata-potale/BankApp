const {StatusCodes} = require('http-status-codes')
const BankingAppError = require('./BankingAppError')

class ValidationError extends BankingAppError{
    constructor(SpecificMessage){
        super("Invalid Parameters","Validation Error",StatusCodes.BAD_REQUEST,SpecificMessage)
    }
}
module.exports=ValidationError