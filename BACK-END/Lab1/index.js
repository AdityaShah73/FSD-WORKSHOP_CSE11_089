import EventEmitter from "node:events"  

const myEmitter = new EventEmitter();

myEmitter.on("greet" , (teacher)=>{
    console.log(`ckass started by ${teacher}`)
})

myEmitter.on("exit" ,(teacher)=>{
    console.log(`class finished by ${teacher}`)
})

myEmitter.on("game" , (gamer)=>{
    console.log(`${gamer}`)
})

myEmitter.emit("greet" , "Akarsh")
myEmitter.emit("exit","Akarsh")
myEmitter.emit("game" , "Game loaded and stating")