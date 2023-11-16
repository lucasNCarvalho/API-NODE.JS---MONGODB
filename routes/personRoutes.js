const router = require('express').Router();
const Person = require("../models/Person");


//create
router.post('/', async (req, res) => {

    const {id, name, date, email} = req.body;

    if(!name) {
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }

    const person = {
        id,
        name,
        date,
        email
    }


    try {  
        await Person.create(person);
        res.status(201).json({message: 'Pessoa inserida no banco com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error});
    }
})

//Read all
router.get('/', async (req, res) => {

    try {
        const people = await Person.find()
        res.status(200).json({people})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Read by id
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const person = await Person.findOne({_id: id});

        if(!person) {
            res.status(424).json({message: 'Usuário não encontrado!'});
            return
        }

        res.status(200).json({person})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

//update by id
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const {name, salary, approved} = req.body;

    const person={
        name,
        salary,
        approved
    }

    try {
        const updatedPerson = await Person.findOneAndUpdate({_id: id}, person);
        res.status(200).json(updatedPerson);
    } catch (error) {
        res.status(500).json({error: error})
    }
})


//delete by id

router.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const person = await Person.findOne({ _id: id })
  
    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
  
    try {
      await Person.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  

module.exports = router;