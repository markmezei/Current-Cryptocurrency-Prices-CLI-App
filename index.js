import fetch from "node-fetch";
import figlet from "figlet";
import chalk from 'chalk';
import {table} from 'table';


async function fetchData(){
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
    const header = {headers: {'X-CMC_PRO_API_KEY': '540bb0e5-c206-45f9-b23f-c2634e202b63'}};
    try{
        figlet("Current Cryptocurrency Prices", (error,data) => {
            (error) ? console.error(error) : console.info(chalk.green(data));
        })
        const response = await fetch(url,header);
        const data = await response.json();
        displayData(data.data);
    }catch(e){
        console.error(e);
    }
}
fetchData();



function displayData(cryptocurrencies){
    const display = () => {
        let data = [];
        const header = new Array('Name', 'Symbol','Price', '1h %','24h %','7d %', 'Volume 24h', 'Volume change 24h');
        data.push(header);
        cryptocurrencies.forEach((element, index) => {
            if(index >= 20) {
                return;
            }
            data.push([
                chalk.green(element.name), 
                chalk.magenta(element.symbol),
                chalk.red(`$${element.quote.USD.price.toFixed(3)}`),
                chalk.blueBright(`$${element.quote.USD.percent_change_1h.toFixed(3)}`),
                chalk.blueBright(`$${element.quote.USD.percent_change_24h.toFixed(3)}`),
                chalk.blueBright(`$${element.quote.USD.percent_change_7d.toFixed(3)}`),
                chalk.yellow(`$${element.quote.USD.volume_24h.toFixed(3)}`),
                chalk.yellow(`$${element.quote.USD.volume_change_24h.toFixed(3)}`),
            ]);
        });
        const config = {
            columnDefault: {
              width: 18,
              alignment:"center"
            }
        };
        console.log(table(data, config));
    }
    display();
}