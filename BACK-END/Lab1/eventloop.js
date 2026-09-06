console.log("This is he starting point of my code")

setTimeout(()=>{
    console.log("This is the first timeout operation")
},5000);

process.nextTick(()=>{
    console.log("This is process.nextTick operation")
})

setTimeout(()=>{
    console.log("This is the second timeout operation")
},2000);

setImmediate(()=>{
    console.log("This is the set immediate operation")
},2000);

console.log("This is the end point of my code")

new Promise((resolve,reject)=>{
    let success = true ;
    if(success){
        resolve("Data loaded successfully")
    }else{
        reject("Data loading failed")
    }
}).then((message)=>{
    console.log(message);
}).catch((message)=>{
    console.log(message);
})