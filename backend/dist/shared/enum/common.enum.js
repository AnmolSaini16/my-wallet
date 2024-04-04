"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankBalanceUpdateType = exports.ErrorMessage = void 0;
var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["BankNotFoundMsg"] = "Bank not found with specified account";
    ErrorMessage["InvalidTransaction"] = "No transaction found with specified account";
})(ErrorMessage || (exports.ErrorMessage = ErrorMessage = {}));
var BankBalanceUpdateType;
(function (BankBalanceUpdateType) {
    BankBalanceUpdateType["Increment"] = "Increment";
    BankBalanceUpdateType["Decrement"] = "Decrement";
})(BankBalanceUpdateType || (exports.BankBalanceUpdateType = BankBalanceUpdateType = {}));
//# sourceMappingURL=common.enum.js.map