const mongoose = require('mongoose')

const ExpenseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim:true,
        required:[true,'Please add some text']
    },
    amount:{
        type: Number,
        required:[true,'Please add a positive number']
    },
    date:{
        type: Date,

    }

});
module.exports = mongoose.model('Expense',ExpenseSchema);