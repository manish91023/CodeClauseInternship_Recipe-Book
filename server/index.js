
 require('dotenv').config();
const express= require('express')
const app=express();
const port = process.env.PORT||3000;
const cors = require("cors")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const UserModel = require("./models/User");
const Recipe= require('./models/CreateRecipe')
const { mongo, default: mongoose } = require('mongoose');
const User = require('./models/User');
const saltRounds =10;
const bcrypt = require("bcrypt")
const axios = require('axios')






app.use(cors({
    origin:["https://manishfood.netlify.app"],
    methods:['get','post','DELETE'],
    credentials:true
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

//database connections 
mongoose.connect("mongodb+srv://manishgga091:9102326770manish@cluster0.ufimslv.mongodb.net/recipe_book")
.then(()=>console.log("db connected"))
.catch((err)=>console.log("error to connect db",err))


//api implementation goes from here 
app.post('/register',async(req,res)=>{
    const {name,email,password}=req.body;
    console.log(email,password,name)
    
    try {
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        //console.log(hashedPassword);
        const user = new UserModel({name,email,password:hashedPassword})
        await user.save();
       // console.log(user)
        
        res.status(200).send("user registered successfully")                         
    } catch (error) {
         res.status(500).send("error registering user ")
    }
    
})

app.post('/login',async(req,res)=>{
    const {email,password}= req.body;
   // console.log(email,password)
    const user= await UserModel.findOne({email:email})
    if(user){
        bcrypt.compare(password,user.password,(err,response)=>{
            if(err){
                console.log("error comparing passwords ",err)
                res.status(500).send("error comparing password")
            }else if(response){
                const token = jwt.sign({id:user._id},
                    "secret");
                    
                    res.json({token,userId:user._id})

            }else{
                res.status(401).send("incorrect password")
            }
        })


    }else{
        res.status(404).send("user doesn't exist in you should register first")
    }
})

 
app.get("/recipe",async(req,res)=>{
    try {
        const data = await Recipe.find({});
        res.json(data)
        
    } catch (error) {
        res.json(error)
    }

})

app.post('/recipe',async(req,res)=>{
    const {imgUrl}=req.body;
    console.log(imgUrl)
    try {
        const recipeData = req.body; // Assuming you're sending JSON data
        const newRecipe = new Recipe(recipeData);
        await newRecipe.save();
        res.status(201).json({ message: 'Recipe created successfully', data: newRecipe });
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating recipe', error: error.message });
     }
})

app.delete('/recipe/:id',async(req,res)=>{
    
    try {
        const id = req.params;
       // console.log(id)
        const data = await Recipe.findByIdAndDelete(id.id);
        //console.log(data)
        res.status(200).send("thanks its made delete request")
    } catch (error) {
        console.log(error)
        res.status(404).send("items not delted")
    }
})

app.get('/recipe/:id',async(req,res)=>{
    const id = req.params;
    const recipeId = id.id
    //console.log(recipeId)
    try {
        const data = await Recipe.findById(recipeId)
        //console.log(data)
        res.status(200).json(data)
    } catch (error) {
       console.log(error)
        res.json(error)
    }
})






app.listen(port,(err)=>{
    if(!err){
        console.log(`app running at ${port}`)
    }
})


