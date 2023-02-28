const Expense =require('../models/expense');

exports.getExpenses = async (req,res,next) => {
    try{
        const expenses = await Expense.find();
        console.log(expenses)
        return res.status(200).json({
            success:true,
            count:expenses.length,
            data:expenses
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            error:'Server Error'
        });
    }
}
exports.getExpensesid = async (req,res,next) => {
    try{
        const expenses = await Expense.findById(req.params.id);
        if(!expenses){
            return res.status(404).json({
                success:false,
                error:'No expense found'
            });
        }
        return res.status(200).json({
            success:true,
            data:expenses
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            error:'Server Error'
        });
    }
}

exports.addExpenses = async (req,res,next) => {
    try{
        const {name,amount,desc} = req.body;
        const expense = await Expense.create(req.body);
        return res.status(201).json({
            success:true,
            data:expense
        });
    }catch(err){
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success:false,
                error:messages
            });
        }else{
            return res.status(500).json({
                success:false,
                error:'Server Error'
            });
        }
    }
}

exports.deleteExpenses = async (req,res,next) => {
    try{
        const expense = await Expense.findById(req.params.id);
        if(!expense){
            return res.status(404).json({
                success:false,
                error:'No expense found'
            });
        }
        await expense.remove();
        return res.status(200).json({
            success:true,
            data:{}
        });
    }catch(err){
        return res.status(500).json({
            success:false,
            error:'Server Error'
        });
    }
}
exports.updateExpenses = async (req,res,next) => {
    try{
        const expense = await Expense.findById(req.params.id);
        if(!expense){
            return res.status(404).json({
                success:false,
                error:'No expense found'
            });
        }
        expense.name = req.body.name;
        expense.amount = req.body.amount;
        expense.desc = req.body.desc;
        await expense.save();
        return res.status(200).json({
            success:true,
            data:expense
        });
    }catch(err){
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({
                success:false,
                error:messages
            });
        }else{
            return res.status(500).json({
                success:false,
                error:'Server Error'
            });
        }
    }
}
exports.loggerFunc = (req,res,next)=>{
    console.log('Logging...');
    console.log(req.method,req.url);
    next();
}

exports.checkAdmin = (req,res,next) => {
    const isAdmin =true;
    if(!isAdmin){
          res.status(401).json({
            // success:false,
            // error:'Not Authorized'
            message:"Not Authorized"
        });
    }
    next();
}
