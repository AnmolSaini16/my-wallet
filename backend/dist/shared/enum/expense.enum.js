"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionTagEnum = exports.TransactionTypeEnum = exports.BankGroupEnum = void 0;
var BankGroupEnum;
(function (BankGroupEnum) {
    BankGroupEnum["Cash"] = "Cash";
    BankGroupEnum["BankAccount"] = "Bank Account";
    BankGroupEnum["Credit"] = "Credit";
    BankGroupEnum["Deposit"] = "Deposit";
})(BankGroupEnum || (exports.BankGroupEnum = BankGroupEnum = {}));
var TransactionTypeEnum;
(function (TransactionTypeEnum) {
    TransactionTypeEnum["Income"] = "Income";
    TransactionTypeEnum["Expense"] = "Expense";
})(TransactionTypeEnum || (exports.TransactionTypeEnum = TransactionTypeEnum = {}));
var TransactionTagEnum;
(function (TransactionTagEnum) {
    TransactionTagEnum["FoodandDrinks"] = "Food & Drinks";
    TransactionTagEnum["Shopping"] = "Shopping";
    TransactionTagEnum["Housing"] = "Housing";
    TransactionTagEnum["Transportation"] = "Transportation";
    TransactionTagEnum["Vehicle"] = "Vehicle";
    TransactionTagEnum["LifeAndEntertainment"] = "Life & Entertainment";
    TransactionTagEnum["MobileandPC"] = "Mobile & PC";
    TransactionTagEnum["FinancialExpenses"] = "Financial Expenses";
    TransactionTagEnum["Investments"] = "Investments";
    TransactionTagEnum["Income"] = "Income";
    TransactionTagEnum["Supermarket"] = "Supermarket";
})(TransactionTagEnum || (exports.TransactionTagEnum = TransactionTagEnum = {}));
//# sourceMappingURL=expense.enum.js.map