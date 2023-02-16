const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser")

const app=express();

mongoose.set('strictQuery', true);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

async function getConnect(){
    await mongoose.connect("mongodb+srv://kumaramurugan002:kumaramurugan002@cluster.vtlw9fx.mongodb.net/?retryWrites=true&w=majority")
//     if(err){
//         console.log("not connected with mongoatlas")
//     }else console.log("Mongoatlas connected successfully");
}

getConnect()

const Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;

const userSchema=new Schema({
name:{type:String, required:true},
location:{type:String, required:true},
likes:{type:Number ,default:0},
postimage:{type:String , default:"relative path from local"},
description: {type:String,required:true},
date:{type:String}
})

const userModel=mongoose.model("colllections",userSchema);

app.post("/form",async(req,res)=>{
    try{
        console.log(req.body)
        const newdate=new Date().toDateString()
        const data=await userModel.create({name:req.body.name,location:req.body.location,description:req.body.description,date:newdate})
        console.log(data)
        res.status(201).json(
            data
            )
    }catch(e){
        res.status(500).json({
            status:"error",
            message:e.message
        })
    }

})
app.get("/",async(req,res)=>{
    try{
        console.log(req.body)
        const dbData=await userModel.find()
        console.log(dbData)
        console.log("hi chellam")

        res.status(200).json(dbData)

    }catch(e){
        res.status(500).json({
            status:"error",
            message:e.message
        })
    }
})

app.get("*",(req,res)=>{
    res.sendStatus(404)
})

app.listen(5000,()=>console.log("connected successfully"));