import * as Web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';

const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));

async function main() {

    const tokenAccount = await token.getAssociatedTokenAddress(
        new Web3.PublicKey("2ismzLWfUbNz8yudJH5XjguSVf83JnxXvudfb41kUmHa"),
        new Web3.PublicKey("5Eh25gUPJDoNtTd3v6vpZ5VAwmjUUrxN28MpJDCfR2xA")
    )

    const account = await token.getAccount(connection, tokenAccount)
    console.log(account.amount)

}

main()