const {StatusCodes} = require('http-status-codes')
const BankingAppError = require('./BankingAppError')

class UnauthorizedError extends BankingAppError{
    constructor(SpecificMessage){
        super("Unauthorized Access","Unauthorized Error",StatusCodes.UNAUTHORIZED,SpecificMessage)
    }
}
module.exports= UnauthorizedError