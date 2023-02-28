const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const {getExpenses,getExpensesid, addExpenses, deleteExpenses,updateExpenses,loggerFunc,checkAdmin} = require('./controller/expense');
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vi5dn12.mongodb.net/expense-tracker`,
    {
    useNewUrlParser: true
    }
);
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",function(){
    console.log("Database connected");
});

const app = express();
app.use(cors({
    origin: '*'
}   
));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(loggerFunc);

app.get('/api/v1/health',loggerFunc,(req, res,next) => {
    res.status(200).json({
         message: 'It worked!',
        status: 'success' });
});
app.get('/api/v1/expenses',getExpenses)

app.get('/api/v1/expenses/:id',getExpensesid)

app.post('/api/v1/expenses',checkAdmin,addExpenses)

app.delete('/api/v1/expenses/:id', deleteExpenses)

app.put('/api/v1/expenses/:id', updateExpenses)


app.listen(3800, () => {
    console.log('Server is running on port 3800');
  });

// const expenses = [
//     {id:1, name: 'Movie', amount: 200, des: 'Thunivu'},
//     {id:2, name:'Food', amount: 500, des: 'KFC'},
//     {id:3, name:'Travel', amount: 1000, des: 'Bus'}
    
// ]

// const expenseDetails = [
//     {id:1, paymentMode:'UPI'},
//     {id:2, PaymentMethod:'Credit Card'},
//     {id:3, PaymentMethod:'Cash'}
// ]

// app.get('/api/v1/expenses', (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         data: {
//             expenses
//         }
//     });
// });

// app.get('/api/v1/expense/:id', (req, res) => {
//     const id = req.params.id * 1;
//     const expense = expenses.find(el => el.id === id);
//     const expenseDetail = expenseDetails.find(el => el.id === id);
//     if(!expense) {
//         return res.status(404).json({
//             status: '404',
//             message: ' Not found'
//         });
//     }
//     res.status(200).json({
//         status: 'success',
//         data: {
//             expense,expenseDetail
//         }
//     });
// });


// app.post('/api/v1/expenses', (req, res) => {
//     let newExpense = req.body;
//     newExpense.id = expenses[expenses.length - 1].id + 1;
//     expenses.push(newExpense);
//     res.status(201).json({
//         status: 'success',
//         data: newExpense,
//     });
// });

// app.delete('/api/v1/expenses/:id', (req, res) => {
//     for(let i = 0; i < expenses.length; i++) {
//         if(expenses[i].id == req.params.id) {
//             expenses.splice(i, 1);
//         }
//     }
//     res.send('Deleted');
// }
//     );
    
// app.put('/api/v1/expenses/:id', (req, res) => {
//     console.log(req.body);
//     for(let i =0;i<expenses.length;i++){
//         if(expenses[i].id==req.params.id){
//             if(req.body.amount){
//                 expenses[i].amount=req.body.amount;
//             }
//         }
//     }
//     res.send('Updated');
// });


// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });