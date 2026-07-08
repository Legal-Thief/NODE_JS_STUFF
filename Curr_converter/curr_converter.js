import https from 'https'
import chalk from 'chalk'
import  readline  from 'readline'

const rl=readline.createInterface({
    input: process.stdin,
    output:process.stdout
})

const url = 'https://latest.currency-api.pages.dev/v1/currencies/usd.json'

const curr_convert=(amt,curr)=>{
    return amt * curr;
}



https.get(url,(res)=>{
    let data=''
    res.on('data',(chunk)=>{
            data+=chunk;
    })

    res.on('end',()=>{
        const rate =JSON.parse(data).usd
        console.log(rate);
        rl.question(chalk.bgBlue.bold('Enter the amount to convert: '),(amt)=>{
            rl.question(chalk.bgBlue.bold('Enter the currency in which you have to convert(inr,eur,npr): '),(curr)=>{
                const cur=rate[curr]
                if(cur){
                    console.log(chalk.bgRed.bold(`${amt} USD is approximately ${curr_convert(amt,cur)} ${curr}`))
                }else{
                    console.log("Invalid input")
                }


                rl.close();
            })
        })
    })

})