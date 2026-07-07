import readline from 'node:readline'
import { todo } from 'node:test'

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const TODOS=[]
const showMenu= ()=>{
    console.log("1: Add a Task")
    console.log("2: View Tasks")
    console.log("3: Exit")
    rl.question("Choose the option: ",handleInput)
}

const handleInput=(option)=>{
    if(option==1){
        rl.question("Enter your Task: ",(task)=>{
            TODOS.push(task);
            console.log("Task Added");
            showMenu()
        })
    }else if(option==2){
        TODOS.forEach((data,index)=>{
            console.log(`${index+1}: ${data}`)
        })
        console.log("---Printed---")
        showMenu()
    }else if(option==3){
        console.log("TATA")
        rl.close();
    }else{
        console.log("Invalid INPUT")
        showMenu()
    }
}

showMenu()