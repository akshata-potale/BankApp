const BankingAppError = require("./BankingAppError");
const { StatusCodes } = require("http-status-codes");


class NotFoundError extends BankingAppError{
    constructor(SpecificMessage){
        super("Record not found","NotFoundError",StatusCodes.NOT_FOUND,SpecificMessage)
    }
}
module.exports = NotFoundError