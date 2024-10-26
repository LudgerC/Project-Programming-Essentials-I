import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
const userInput = readline.createInterface({ input, output });


let geschenkmand = [];//De array die de geschenk ga bewaren.
let aantalgeschenk;
let lotterijkans = [];
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

    vulGeschenkmand(geschenkmand, geschenk);
    
}

let totaallotterij = lotterij(geschenkmand, lotterijkans, lotterijgeschenk);

if(lotterijkans[0] == true) 
{  
    let totaal = berekenTotaal(geschenkmand);
    console.log("De waarde van je mand is: " + totaal + " Euro.");

    let totaalBTW = berekenTotaalBTW(geschenkmand);
    let totaal_incl_btw = totaal + totaalBTW;
   
    console.log("Je hebt een geschenk("+ lotterijgeschenk[0] +") gewonnen!");
    console.log("inclusive btw is dit: " + (totaal_incl_btw - totaallotterij)+ " Euro.");
}
else if(lotterijkans[0] == false)
{  
    let totaal = berekenTotaal(geschenkmand);
    console.log("De waarde van je mand is: " + totaal + " Euro.");

    let totaalBTW = berekenTotaalBTW(geschenkmand);
    let totaal_incl_btw = totaal + totaalBTW;
    console.log("inclusive btw is dit: " + totaal_incl_btw + " Euro.");
}



function vulGeschenkmand(geschenkmand, geschenk)//Geschenk wordt in de mand gestoken.
{
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

function lotterij(geschenkmand, lotterijkans, lotterijgeschenk)
{
    let totaal_incl_btw = 0;
    let kansarray = [];
    let w = 10;
    let b = 2;
    let f = 3;
    
    for(let i = 0; i <= 9; i++)//10 getallen van 0 tot 9 worden in het array gestoken.
    {
        kansarray.push(i);
    }
    
    let kans = kansarray[Math.floor(Math.random() * kansarray.length)];//neem een wilkeurige getal uit het array.
    
    if(kans == 0) // het kans is 1 op 10. het getal moet 0 zijn.
    {
        let geschenk = geschenkmand[Math.floor(Math.random() * geschenkmand.length)];

        switch(geschenk)
        {
            case "W":
                totaal_incl_btw = w + (w / 100 * 21); 
            break;
            case "B":
                totaal_incl_btw = b + (b / 100 * 6); 
            break;
            case "F":
                totaal_incl_btw = f + (f / 100 * 12); 
            break;
        }

        lotterijkans.push(true);
        lotterijgeschenk.push(geschenk);
        return totaal_incl_btw;
    }
    else
    {
        lotterijkans.push(false);
    }
    
}