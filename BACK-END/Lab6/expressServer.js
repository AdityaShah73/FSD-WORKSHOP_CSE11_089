import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Student from "./students.js";

dotenv.config();

const app = express();

app.use(express.json());

// Connect MongoDB
await connectDB();

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Student Management API!");
});

// POST - Insert student
app.post("/test-db", async (req, res) => {
    try {
        const student = await Student.create({
            name: "Rahul Sharma",
            email: "rahul@gmail.com",
            course: "MERN Stack",
        });

        res.status(201).json({
            message: "Data inserted successfully!",
            data: student,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// GET - Fetch all students
app.get("/test-db", async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json(students);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});