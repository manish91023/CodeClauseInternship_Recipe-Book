const mongoose =require("mongoose")

const createShema=mongoose.Schema({
     name:{
        type:String,
        required:true,
     },
     ingredients:[{
        type:String,
        required:true
     }],
     instructions:{
        type:String,
        required:true
     },
     imageUrl:{
        type:String,
        required:true
     },
     userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
       required:true
     }
    
});

module.exports= mongoose.model('Recipe',createShema)