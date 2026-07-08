import https from 'https'
import chalk from 'chalk'


const getJoke= ()=>{
    const url= "https://official-joke-api.appspot.com/random_joke"
    let data=""
    https.get(url,(res)=>{
        let chunk ="";
        res.on('data',(chunk)=>{
            data+=chunk
        })
        res.on('end',()=>{
            let joke = JSON.parse(data)
            console.log("Here is the Random Joke");
            console.log(chalk.red(`Question: ${joke.setup}`));
            console.log(chalk.blue.bgRed.bold(`Answer: ${joke.punchline}`));            
        })
        res.on('error',(err)=>{
            throw err;
        })
    })
}

getJoke();