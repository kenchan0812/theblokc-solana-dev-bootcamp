import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";
import base58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const account = new web3.PublicKey(
  process.env.MINT_ACC as any
);
const decode = base58.decode(process.env.PRIVATE_KEY as any);
const payer = web3.Keypair.fromSecretKey(decode);
const mint = new web3.PublicKey(process.env.MINT_KEY as any);


async function main() {
  let signature = await token.mintTo(
    connection,
    payer,
    mint,
    account,
    payer.publicKey,
    10000000000
  );

  console.log(`mint tx: ${signature}`);
}

main();


