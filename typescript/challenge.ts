import * as Web3 from '@solana/web3.js'
import bs58 from "bs58";

async function main() {
    const publicKey = new Web3.PublicKey("7RA2TMMiWXTRJALfG4rvGtRTXctcj2YGHEZLDyt7dka3");
    const programKey = new Web3.PublicKey("EMvCimsN8EH2kwnBFDUThkpN5AUrrscmTqg4B7Xv7bsY"); 
    const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));
    const decoded = bs58.decode(
        "58MXdbBwM3rtCKicMhYeTVyavMLM7bXa8s6ZRDqH5bHwMemkPrbPVs9MG8FFEfjSnWpWJCt6xR2uXd5jAZxfoaZM"
      );
      
      const keypair = Web3.Keypair.fromSecretKey(decoded);
    const instruction = new Web3.TransactionInstruction({
        keys: [
            {
                pubkey: publicKey,
                isSigner: true,
                isWritable: false,
            }
        ],
        data: Buffer.alloc(20),
        programId:programKey,
    });

    const transaction = new Web3.Transaction().add(
        instruction)

    const signature = await Web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [keypair]
    )
    console.log('SIGNATURE', signature)
}

main()
.then(() => process.exit(0))
.catch(err => {
    console.error(err)
});