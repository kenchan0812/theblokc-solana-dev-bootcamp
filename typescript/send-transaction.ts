import * as web3 from "@solana/web3.js";
import dotenv from "dotenv";
import bs58 from "bs58";

dotenv.config();

const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

const decoded = bs58.decode(
  "58MXdbBwM3rtCKicMhYeTVyavMLM7bXa8s6ZRDqH5bHwMemkPrbPVs9MG8FFEfjSnWpWJCt6xR2uXd5jAZxfoaZM"
);

const keypair = web3.Keypair.fromSecretKey(decoded);

async function main() {
  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: new web3.PublicKey(
        "9mkiznq5tk2Shn4Z5jonvzjKBJ7KxCtPfJ5J38hkqfSS"
      ),
      lamports: 1000,
    })
  );

  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [keypair]
  );

  console.log("Transaction Hash:", signature);
}

main();

//7RA2TMMiWXTRJALfG4rvGtRTXctcj2YGHEZLDyt7dka3