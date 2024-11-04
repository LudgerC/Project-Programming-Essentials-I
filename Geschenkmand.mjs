import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
const userInput = readline.createInterface({ input, output });


let geschenkmand = [];//De array die de geschenk ga bewaren.
let aantalgeschenk;
let lotterijgeschenk = []//De array die de geschenk van de lotterij ga bewaren. 


do
{
    aantalgeschenk = parseFloat(await userInput.question("Hoe groot is de geschenkmand (3 - 20)? "));
    if(aantalgeschenk < 3 || aantalgeschenk > 20)
    {
        console.log("De grotte van de geschenkmand is fout. Probeer opnieuw");
    }

}while(aantalgeschenk < 3 || aantalgeschenk > 20 );//Bepaal het grotte van de geschenkmand.

let geschenk;

await vulGeschenkmand(geschenkmand, geschenk);

let totaal = berekenTotaal(geschenkmand);
console.log("De waarde van je mand is: " + totaal + " Euro.");

let totaalBTW = berekenTotaalBTW(geschenkmand);
let totaal_incl_btw = totaal + totaalBTW;
   
console.log("inclusive btw is dit: " + (totaal_incl_btw )+ " Euro.");




async function vulGeschenkmand(geschenkmand, geschenk)//Geschenk wordt in de mand gestoken.
{
    for(let i = 1; i <= aantalgeschenk; i++)//Geschenk wordt doorgestuurd naar de mand.
    {
        do 
        {
            geschenk = await userInput.question("Welk geschenk kies je? (keuze: W.B.F): ");

            if(geschenk != "W" && geschenk != "B" && geschenk != "F")
            {
                console.log("Foutieve invoer probeer opnieuw... ");
            }

        }while(geschenk != "W" && geschenk != "B" && geschenk != "F");

        switch(geschenk)
        {
            case "W":
                geschenkmand.push("W");
            break;
            case "B":
                geschenkmand.push("B");
            break;
            case "F":
                geschenkmand.push("F");
            break;

        }
        lotterij(geschenkmand, lotterijgeschenk);   
    }

}

function berekenTotaal(geschenkmand)
{
    let w = 10;
    let b = 2;
    let f = 3;
    let totaal = 0;

    for(let i = 0; geschenkmand.length > i; i++)
    {
        switch(geschenkmand[i])
        {
            case "W":
                totaal += w;
            break;
            case "B":
                totaal += b;
            break;
            case "F":
                totaal += f;
            break;

        }
        
    }
    return(totaal);
}

function berekenTotaalBTW(geschenkmand)
{
    let w = 10;
    let b = 2;
    let f = 3;
    let totaalBTW = 0;

    for(let i = 0; i < geschenkmand.length; i++)
    {
        switch(geschenkmand[i])
        {
            case "W":
                totaalBTW += w / 100 * 21; 
            break;
            case "B":
                totaalBTW += b  / 100 * 6; 
            break;
            case "F":
                totaalBTW += f / 100 * 12; 
            break;

        }

    }
    return(totaalBTW);
}

function lotterij(geschenkmand, lotterijgeschenk)
{
    let kansarray = [];

    for(let i = 0; i <= 9; i++)//10 getallen van 0 tot 9 worden in het array gestoken.
    {
        kansarray.push(i);
    }
    
    let kans = kansarray[Math.floor(Math.random() * kansarray.length)];//neem een wilkeurige getal uit het array.
    
    if(kans == 0 ) // het kans is 1 op 10.
    {
        console.log("Je hebt een geschenk gewonnen!");
    }
     
}