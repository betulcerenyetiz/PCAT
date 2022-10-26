const mongoose = require("mongoose")
const Schema = mongoose.Schema

//connect DB
mongoose.connect('mongodb://localhost/pcat-db')

//create schema
const PhotoSchema = new Schema({
    title : String, 
    description : String
})

//create model
const Photo = mongoose.model("Photo", PhotoSchema)

//create a photo
// Photo.create({
//     title: "Photo Title 2",
//     description: "Photo description 2"
// })

//read a photo
// Photo.find({},(err,data)=>{
//     console.log(data)
// })

//update a photo
 const id="63592e9848bb638e1fc1ebb9"
// Photo.findByIdAndUpdate(id,
//     {
//         title: "Photo Title  1 Updated",
//         description:"Photo Description 1 Updated"
//     },{
//         new :true
//     },(err,data)=>{
//         console.log(data)
//     }
// )

//delete a Photo
Photo.findByIdAndDelete(id,(err)=>{
    console.log("Photo is removed")
})