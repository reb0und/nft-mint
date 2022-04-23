# nft-mint

## NFT Ethereum Minter Tutorial

⚠️ Very old project, most likely still functional but code is example for minting process not learning. 

Created this as an example to show how to mint an NFT on the Ethereum Mainnet through NodeJS.


**Setup**

Open up your [config.json](https://github.com/reb0und/nft-mint/blob/main/config.json) file. There are a few options
 - privateKey: this is your wallet key used to grant access 
 - gas: this is the GWEI integer you are setting for the amount of gas you wish to use
 - maxAmountToMint: self explanatory, max amount of tokens you wish to mint
 - infuraKey: [Here](https://ethereumico.io/knowledge-base/infura-api-key-guide/) is a tutorial on how to retrieve your [Infura Key](https://infura.io/dashboard). This allows you to connect to the Ethereum network
 - collectionAdress: the address of the collection you wish to mint

In order to run you must configure the [ABI.json file](https://github.com/reb0und/nft-mint/blob/main/ABI.json) for the collection you wish to mint from. You can do this by heading to the Etherscan contract and scrolling down until you see the ABI. You will want to copy this and replace your ABI file with it. 

After you have done this open up the [app.js](https://github.com/reb0und/nft-mint/blob/main/app.js) file. You must adjust the sale and mint functions for your collection. The determiner for if the sale is live or not will either be a boolean or an integer defined as a timestamp. This will countdown. You can specify your interval time for time between each check. Once either the sale is live or the time has been met, the mint function will trigger. You must adjust the script for your own mint function. This can be found by searching for `{"stateMutability": "payable"}` in your ABI. Replace the current mint function with this and you are good to go. 

**Run `npm or yarn mint` to start**
