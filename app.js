const express = require("express")
const mongoose = require("mongoose")
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const ejs =require("ejs")
const fs =require("fs")
const Photo =require("./models/Photo")

const app= express()


//connect DB
mongoose.connect('mongodb://localhost/pcat-db')


//TEMPLATE ENGINE
app.set("view engine","ejs")


//MIDDLEWARES
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method'))


//ROUTES
app.get("/", async (req,res)=>{
    const photos = await Photo.find({}).sort("-dateCreated")
    res.render("index",{
        photos
    })
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/add",(req,res)=>{
    res.render("add")
})
app.get("/photos/:id", async (req,res)=>{
    const photo = await Photo.findById(req.params.id)
    res.render("photo",{
        photo
    })
})
app.get("/photos/edit/:id", async (req,res)=>{
    const photo = await Photo.findOne({_id:req.params.id})
    res.render("edit",{
        photo
    })
})


//post with form action to db
app.post("/photos", async (req,res)=>{
    //control for folder
    const uploadDir = "public/uploads"
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir)
    }

    let uploadImage = req.files.image
    let uploadPath = __dirname + "/public/uploads/" + uploadImage.name

    uploadImage.mv(uploadPath,async ()=> {
        await Photo.create({
            ...req.body,
            image: "/uploads/"+ uploadImage.name
        })
        res.redirect("/")
    })
    
})

//update with put request
app.put("/photos/:id", async (req,res)=>{
    const photo = await Photo.findOne({_id:req.params.id})
    photo.title=req.body.title
    photo.description=req.body.description
    photo.save()
    res.redirect(`/photos/${req.params.id}`)
})

const port=5000
app.listen(port,() =>{
    console.log(`Server started with port ${port}`)
})
