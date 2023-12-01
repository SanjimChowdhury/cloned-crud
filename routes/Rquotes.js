const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todos') 
const Character = require('../models/Character');

router.post('/quotes', (req, res) => {
    Character
        .create(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
})

router.get('/', todoController.getTodo) /* (req, res) => {
    // Use the Mongoose model to query the database
    Character.find()
        .then(document => {
            res.render('index.ejs', { quotes: document }); //here document is each individual object saved in the database and quotes is collection(means collection of all documents)
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
}); */

//@update love count
router.put('/love/:id', async (req, res) => {
    const quoteId = req.params.id;
    console.log(quoteId)
    try {
        const updatedQuote = await Character.findByIdAndUpdate(
            quoteId,
            { $inc: { loveCount: 1 } },
            { new: true }
        ).exec();

        if (!updatedQuote) {
            return res.status(404).json({ error: 'Quote not found' });
        }

        res.json({ loveCount: updatedQuote.loveCount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update love count' });
    }
});


module.exports = router