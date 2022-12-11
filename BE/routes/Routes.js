// import Model from '../model/Model';

const express = require('express');
// const Model = require('../models/Model');
const bcrypt = require('bcrypt');
const router = express.Router()
const ModelCourses = require('../models/modelCourses');
const ModelUser = require('../models/modelUser');

//Post Method
router.post('/post', async (req, res) => {
    const data = new ModelCourses({
        code: req.body.code,
        name: req.body.name,
        lecture: req.body.lecture,
        dateStart: req.body.dateStart,
        studentNumber: 0,
    })

    try {
        const dataToSave = await data.save();
        res.json({status: 200 , message: "Success!"});
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
//Get all Method
router.get('/get', async (req, res) => {
    try{
        const data = await ModelCourses.find();

        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await ModelCourses.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await ModelCourses.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await ModelUser.findByIdAndDelete(id)
        console.log(data);
        res.json({status: 200 ,message: data.name})
    }
    catch (error) {
        res.json({status: 400, message: error.message })
    }
})


router.post('/signup', async (req, res) => {
    console.log(req.body);
    const date = new Date()
    console.log(date)
    const passwordHash = await bcrypt.hash(req.body.password, 10)
    const data2 = new ModelUser({
        name: req.body.name,
        password: passwordHash,
        email: req.body.email,
        role: "Customer",
        dateCreate: `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
        numberCart: []

    })
    console.log(data2)
    // try {
    //     const dataToSave = await data2.save();
    //     res.send(JSON.stringify({"status": 200, "error": null, "response": "hello"}));
    // }
    // catch (error) {
    //     res.status(400).json({message: error.message})
    // }
    const checkName = await ModelUser.findOne({name: data2.name});
    const checkEmail =  await ModelUser.findOne({email: data2.email});
    if (checkName){
        try {
            res.send(JSON.stringify({"status": 401, "error": null, "response": "tai khoan hoac email ton tai"}));
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
     }
     else if (checkEmail){
        try {
            res.send(JSON.stringify({"status": 402, "error": null, "response": " email ton tai"}));
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
   }
   else {
         try {
            const dataToSave = await data2.save();
            res.send(JSON.stringify({"status": 200, "error": null, "response": "hello"}));
            }
            catch (error) {
                res.status(400).json({message: error.message})
            }
    }
})

router.post('/login', async (req, res) => {
    console.log(req.body);
    const data = await ModelUser.findOne({name: req.body.name});

    console.log(data)
    if (data && bcrypt.compare(req.body.password , data.password)){
        try {
            res.send(JSON.stringify({"status": 200, id: data._id ,  "error": null, "response": "SuccessLogin"}));
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }else {
        res.send(JSON.stringify({"status": 401, "error": null, "response": "tai hoac mat khau sai"}));
    }
})


router.post('/getOneUser', async (req, res) => {
    try{
        const data = await ModelUser.findById(req.body);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/getUser', async (req, res) => {
    try{
        const data = await ModelUser.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
module.exports = router;

