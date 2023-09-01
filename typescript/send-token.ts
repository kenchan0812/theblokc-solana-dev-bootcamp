import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";
import base58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const account = new web3.PublicKey(
  "4Vw8MUHUg9zyJs65AnCXXS1gbw81nwwp7J92pdpDqpR4"
);
const decode = base58.decode(process.env.PRIVATE_KEY as any);
const payer = web3.Keypair.fromSecretKey(decode);
const mint = new web3.PublicKey("7o2HrjPf2J4voxKz3QGJgnXj8uHfV2nzHedyUFaGgahN");
const fromTokenAccount = new web3.PublicKey(process.env.MINT_ACC as any)
const pubkey = new web3.PublicKey("5Eh25gUPJDoNtTd3v6vpZ5VAwmjUUrxN28MpJDCfR2xA")



async function main() {
  const toTokenAccount = await token.getOrCreateAssociatedTokenAccount(connection, payer, mint, pubkey);
  const signature = await token.transfer(
    connection,
    payer,
    fromTokenAccount,
    toTokenAccount.address,
    payer.publicKey,
    50
  )
}

main();