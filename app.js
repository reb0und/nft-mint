const { ethers } = require("ethers");
const fs = require('fs');

const ABI = require('./data/ABI.json');

// contract abi which can be found on etherscan - check docs for more info

const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

// file containing private key, custom gwei, and max amount of tokens to mint

const ADDRESS = "0xdb68c12b5cc499461b87c9d4e63d1a299990e1d8";

// coontract wallet address

const GAS_LIMIT = 2000000;

// gas limit - self explanatory

const GAS_PRICE = ethers.utils.parseUnits(config.gas, "gwei");
const MAX_AMOUNT = config.maxAmountMint;
// const TOKEN_PRICE = ethers.utils.parseEther('0');
const INTERVAL = 500;

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/98a14611be3340498aa7bade53439321');
const wallet = new ethers.Wallet(config.privateKey, provider);
const contract = new ethers.Contract(ADDRESS, ABI, wallet);

async function main() {
  try {

    /* you have to search the ABI to find the correct determiner to tell you wether or not the sale is live
    it can be specified as a boolean as shown here or be a later time -> you need to indentify this function or object, here it is the openToAll() function 
    */

    const saleIsActive = await contract.openToAll();
    console.log(saleIsActive, Math.round(new Date().getTime() / 1000));
    if (saleIsActive || saleIsActive <= Math.round(new Date().getTime() / 1000)) {
      clearInterval(timer);
      console.log("Sale Live");

      /* contract.insertMintFunction
      
      mint function will have attribute  {"stateMutability": "payable"} inside ABI.json
      
      */

      await contract.mint(MAX_AMOUNT, {
        gasLimit: GAS_LIMIT,
        gasPrice: GAS_PRICE,
        nonce: startingNonce,
      });

      // mint function

    }
  } catch (error) {
    console.log(error);
  }
}

let startingNonce;
let timer;

(async () => {
  startingNonce = await provider.getTransactionCount(wallet.address);
  timer = setInterval(() => {
    main();
  }, INTERVAL);
})();