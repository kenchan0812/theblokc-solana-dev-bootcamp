import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";
import base58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const mint = new web3.PublicKey(process.env.MINT_KEY as any);

async function main() {
  let balance = await token.getMint(connection, mint);

  console.log(`balance: ${balance.supply}`);

}

main();