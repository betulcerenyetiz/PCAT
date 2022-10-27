const express = require("express")
const mongoose = require("mongoose")
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const ejs =require("ejs")
const photoController =require("./controllers/photoController")
const pageController=require("./controllers/pageController")

const app= express()

/////connect DB
mongoose.connect('mongodb://localhost/pcat-db')

/////TEMPLATE ENGINE
app.set("view engine","ejs")

/////MIDDLEWARES
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method',{
    methods : ["POST","GET"]
}))

/////ROUTES
//list photos in index
app.get("/", photoController.getAllPhotos)
//go to about page
app.get("/about",pageController.getAboutPage)
//go to add photos page
app.get("/add",pageController.getAddPage)
//go and show single photo
app.get("/photos/:id", photoController.getPhoto)
//go and list photo for update
app.get("/photos/edit/:id", pageController.getEditPage)
//update with put request
app.put("/photos/:id", photoController.updatePhoto)
//post with form action to db add photo
app.post("/photos", photoController.createPhoto)
//remove with delete request
app.delete("/photos/:id",photoController.deletePhoto)


const port=5000
app.listen(port,() =>{
    console.log(`Server started with port ${port}`)
})
