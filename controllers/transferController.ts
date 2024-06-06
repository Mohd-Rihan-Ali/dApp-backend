import { Request, Response } from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

export const transferBalance = async (req: Request, res: Response) => {
  try {
    const { senderPrivateKey, recipientAddress, amount } = req.body;

    // Connect to the appropriate network
    const provider = new ethers.providers.JsonRpcProvider(
      `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
    );
    const wallet = new ethers.Wallet(senderPrivateKey, provider);

    // Convert the amount to wei
    const amountInWei = ethers.utils.parseEther(amount);

    const tx = {
      to: recipientAddress,
      value: amountInWei,
    };

    const signedTx = await wallet.signTransaction(tx);
    const txResponse = await provider.sendTransaction(signedTx);
    const receipt = await txResponse.wait();

    res.send(`Transaction successful with hash: ${receipt.transactionHash}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
