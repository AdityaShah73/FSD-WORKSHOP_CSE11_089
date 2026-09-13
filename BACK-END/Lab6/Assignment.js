import express from "express";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const server = express();
server.use(express.json());

const databaseFile = "users.json";


if (!fs.existsSync(databaseFile)) {
    fs.writeFileSync(databaseFile, "[]");
}


server.post("/users", (req, res) => {
    const storedUsers = JSON.parse(
        fs.readFileSync(databaseFile, "utf8")
    );

    const newUser = {
        id: storedUsers.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    storedUsers.push(newUser);

    fs.writeFileSync(
        databaseFile,
        JSON.stringify(storedUsers, null, 2)
    );

    res.json(newUser);
});


server.get("/users", (req, res) => {
    const storedUsers = JSON.parse(
        fs.readFileSync(databaseFile, "utf8")
    );

    res.json(storedUsers);
});


server.put("/users/:id", (req, res) => {
    const storedUsers = JSON.parse(
        fs.readFileSync(databaseFile, "utf8")
    );

    const userId = Number(req.params.id);
    const selectedUser = storedUsers.find(
        item => item.id === userId
    );

    if (!selectedUser) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const { name, email } = req.body;

    if (name) {
        selectedUser.name = name;
    }

    if (email) {
        selectedUser.email = email;
    }

    fs.writeFileSync(
        databaseFile,
        JSON.stringify(storedUsers, null, 2)
    );

    res.json(selectedUser);
});

server.delete("/users/:id", (req, res) => {
    const storedUsers = JSON.parse(
        fs.readFileSync(databaseFile, "utf8")
    );

    const userId = Number(req.params.id);

    const remainingUsers = storedUsers.filter(
        item => item.id !== userId
    );

    if (remainingUsers.length === storedUsers.length) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    fs.writeFileSync(
        databaseFile,
        JSON.stringify(remainingUsers, null, 2)
    );

    res.json({
        message: "User deleted successfully"
    });
});

const serverPort = process.env.PORT || 3000;

server.listen(serverPort, () => {
    console.log(`Server started at http://localhost:${serverPort}`);
});