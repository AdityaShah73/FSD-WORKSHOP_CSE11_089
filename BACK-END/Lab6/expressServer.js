import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const port = 3000

const app = express()
app.use(express.json())
const array = [
    {
        id: 1,
        name: "Akarsh",
        age: 20
    },
    {
        id: 2,
        name: "Akshat",
        age: 21
    },
    {
        id: 3,
        name: "Ansh",
        age: 17
    }
]

app.get("/", (req, res) => {
    res.status(200).send(`listening on port ${port}`)
})

app.get("/msg", (req, res) => {
    res.status(200).json({
        message : "Welcome to express server"
    })
})


app.get("/user", (req, res) => {
    try {
        res.status(200).json({
            message: "data recieved",
            userData: array
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.get("/user/:id", (req, res) => {
    try {
        const id = req.params.id ;
        const user = array.find((u)=> u.id == id);
        if(!user){
            return res.status(400).json({message: "user not found"})
        }
        res.status(200).json({message : "user found" , 
            user
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.post("/create" , (req,res)=>{
    try{
        const {name , age} = req.body ;
        const newUser = {
            id: array.length+1,
            name,
            age,
        };
        array.push(newUser);
        console.log("User added successfully")
        console.log(array)
        res.status(201).json({
            message: "User created successfully",
            userData: newUser
        })
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.put("/user/:id", (req, res) => {
    try {
        const id = req.params.id
        const { name, age } = req.body

        const user = array.find((u) => u.id == id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        user.name = name
        user.age = age

        res.status(200).json({
            message: "User updated successfully",
            userData: user
        })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.delete("/user/:id", (req, res) => {
    try {
        const id = req.params.id

        const index = array.findIndex((u) => u.id == id)

        if (index === -1) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const deletedUser = array.splice(index, 1)

        res.status(200).json({
            message: "User deleted successfully",
            userData: deletedUser[0]
        })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})