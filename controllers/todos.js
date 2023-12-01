const Todo = require('../models/Character')

module.exports = {
    getTodo: async (req, res)=>{
        try {
            // Use the Mongoose model to query the database
            const documents = await Todo.find();
            res.render('index.ejs', { quotes: documents });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
     },
    deleteTodo: async (req, res)=>{
        try{
            await Todo.deleteOne({_id: req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}