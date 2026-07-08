import readline from "readline"
import fs from 'fs'

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const fileCreation= ()=>{
    rl.question("Enter the File: ",handleFile)
}
const handleFile=(name)=>{
    rl.question("Enter the content: ",(content)=>{
        fs.writeFile(`${name}.txt`,content,'utf8',(err)=>{
            if(err){
                console.log(err)
                rl.close()
                return
            }

            console.log(`${name}.txt Created`)
            rl.close()
        })
    })
}

fileCreation()