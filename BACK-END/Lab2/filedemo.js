import fs from "node:fs/promises"
const filePath = "userData.txt"


async function createFile(content){
    try{
        await fs.writeFile(filePath , content , "utf8")
        console.log("File created successfully")
    }
    catch(err){
        console.log(err)
    }
}

async function readFile(){
    try{
        const content = await fs.readFile(filePath , "utf8")
        console.log(content)
        
    }
    catch(err){
        console.log(err)
    }
}

async function appendFile(content){
    try{
        await fs.appendFile(filePath , content , "utf8")
        
    }
    catch(err){
        console.log(err)
    }
}
async function deleteFile(){
    try{
        await fs.unlink(filePath)
        console.log("File deleted successfully")
        
    }
    catch(err){
        console.log(err)
    }
}

async function run(){
    await createFile("This is the userData.txt \n")
    await readFile();
    await appendFile("This is the append function \n")
    await readFile()
    await deleteFile();
}

run()