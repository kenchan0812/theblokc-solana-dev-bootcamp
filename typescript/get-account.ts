import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";
import base58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const getAccount = new web3.PublicKey(
  process.env.MINT_ACC as any
);

async function main() {
  const account = await token.getAccount(connection, getAccount);
  console.log(account);
}

main();