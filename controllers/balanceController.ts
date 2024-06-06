import { Request, Response } from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
const INFURA_KEY = process.env.INFURA_KEY;

export const ethBalance = async (req: Request, res: Response) => {
  try {
    const accountAddress = req.params.id as string;

    const provider = new ethers.providers.JsonRpcProvider(
      `https://sepolia.infura.io/v3/${INFURA_KEY}`
    );

    const balance = await provider.getBalance(accountAddress);
    console.log("balance:", balance);

    const balanceInEther = ethers.utils.formatEther(balance); //wei to ether

    // res.send(`The balance of the account is: ${balanceInEther} ETH`);
    res.send(balanceInEther);
    console.log(`The balance of the account is: ${balanceInEther} ETH`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

export const bnbBalance = async (req: Request, res: Response) => {
  try {
    const accountAddress = req.params.id as string;

    const provider = new ethers.providers.JsonRpcProvider(
      `https://bsc-dataseed.binance.org/`
    );
    const balance = await provider.getBalance(accountAddress);
    console.log("balance:", balance);

    const balanceInBNB = ethers.utils.formatEther(balance); //wei to BNB

    // res.send(`The balance of the account is: ${balanceInBNB} BNB`);
    res.send(balanceInBNB);
    console.log(`The balance of the account is: ${balanceInBNB} BNB`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

