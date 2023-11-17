const router = require('express').Router();
const Person = require("../models/Person");


//create
router.post('/', async (req, res) => {

    const { user_cpf, user_name, user_date, user_email} = req.body;

    if(!user_name) {
        res.status(422).json({error: 'O nome é obrigatório!'})
        return
    }

    const person = {
        user_cpf,
        user_name,
        user_date,
        user_email,
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
        const person = await Person.find()
        res.status(200).json({person})
    } catch (error) {
        res.status(500).json({error: error})
    }
})

//Read by id
router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {
        const person = await Person.findOne({user_cpf: id});

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
    const key = req.params.id;

    const { user_cpf, user_name, user_date, user_email} = req.body;

    const person = {
        user_cpf,
        user_name,
        user_date,
        user_email,
    }


    try {
        const updatedPerson = await Person.updateOne({user_cpf: key}, person);
        res.status(200).json(updatedPerson);
    } catch (error) {
        res.status(500).json({error: error})
    }
})


//delete by id

router.delete('/:id', async (req, res) => {
    const id = req.params.id
  
    const person = await Person.findOne({ user_cpf: id })
  
    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
  
    try {
      await Person.deleteOne({ user_cpf: id })
  
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })
  

module.exports = router;