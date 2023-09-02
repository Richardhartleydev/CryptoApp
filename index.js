//Fetch the coin data from our API key
//We chose specific coins, currency and 24h info on their website before generating
fetch(
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Ctether%2Cethereum%2Clitecoin%2Ccardano%2Cdogecoin&vs_currencies=gbp&include_24hr_change=true"
)
  //Then read it as a json file
  .then(res => res.json())
  //When it is read as a json file execute this function :
  .then(json => {
    const container = document.querySelector(".container");
    const coins = Object.getOwnPropertyNames(json);
    //This function allows our HTML file <div class="container"> to see API info
    //Then it stores crypo name, price and price change in "coins" variable

    //This function starts a loop, searching the data in "coins" variable
    //It takes the current single 'coin' and reads its "coinInfo" variable
    for (let coin of coins) {
      const coinInfo = json[`${coin}`];
      const price = coinInfo.gbp;
      const change = coinInfo.gbp_24h_change.toFixed(5);
      //Now the coinInfo for each individual 'coin' can be read under :
      //Price = in gbp ... Price change in gbp over 24 hours to 5 decimal places

      //now we add new info to container variable.
      //Make coin a class. When the value is less than 0 = falling, else = rising
      //make the coin logo = coinname.png in our file 'images'
      //make coin-name and GBP h3 and span respectively so we can add CCS styling
      //make £coin-price and price change <span> so we can add CCS styling
      container.innerHTML += `
            <div class="coin ${change < 0 ? "falling" : "rising"}">
                <div class="coin-logo">
                    <img src="images/${coin}.png">
                </div>
                <div class="coin-name">
                    <h3>${coin}</h3>
                    <span>/GBP</span>
                </div>
                <div class="coin-price">
                    <span class="price">£${price}</span>
                    <span class="change">${change}</span>
                </div>
            </div>
    `;
    }
  });
