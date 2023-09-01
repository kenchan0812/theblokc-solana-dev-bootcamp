import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";
import base58 from "bs58";
import dotenv from "dotenv";

dotenv.config();

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const myPublicKey = new web3.PublicKey(
  "BM4QXco1wuRQMiuizKm5kSK8J9mr3iuPnnp3iTd2cCpu"
);
const decode = base58.decode(process.env.PRIVATE_KEY as any);
const payer = web3.Keypair.fromSecretKey(decode);

async function main() {
  const balance = await connection.getBalance(myPublicKey);
  console.log("Balance: ", balance / web3.LAMPORTS_PER_SOL);

  //  const mint = await token.createMint(
  //    connection,
  //    payer,
  //    payer.publicKey,
  //    null,
  //    9
  //  );

  // console.log(mint.toBase58());
}

main();

//7RA2TMMiWXTRJALfG4rvGtRTXctcj2YGHEZLDyt7dka3