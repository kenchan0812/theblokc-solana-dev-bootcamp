import Button from "./components/Button";
import "./scss/main.scss";
import { useState } from "react";
import { Buffer } from "buffer";
import idl from "./idl.json";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";

const { SystemProgram, Keypair } = web3;
window.Buffer = Buffer;
const programID = new PublicKey("HPfx6VWTYwep1pFZ5JYpHMLMpdWgGRXEL9E1NL4Bb7N3");
const opts = {
  preflightCommitment: "processed",
};
const network = clusterApiUrl("devnet");
let new_account = Keypair.generate();

const App = () => {
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [walletaddress, setWalletAddress] = useState("");
  const [Tx, setTx] = useState("");
  const [inputVal, setInput] = useState({
    name: null,
    email: null,
  });

  let Txsignature = null;
  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };

  const connectWallet = async () => {
    try {
      await window.solana.connect();
      const provider = getProvider();
      const walletAddress = provider.wallet.publicKey.toString();
      setWalletAddress(walletAddress);
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
    if (walletaddress) {
      new_account = Keypair.generate();
      window.solana.disconnect();
      setWalletAddress("");
      setInput({});
      setuserName("");
      setuserEmail("");
      setTx(null);
    }

    if (!window.solana) {
      alert(
        "Solana wallet not found. Please install Sollet or Phantom extension."
      );
      return;
    }
  };

  const input = async () => {
    new_account = Keypair.generate();
    setInput({});
    setTx(null);

    const dataAcc = new_account;
    console.log(dataAcc);
    const provider = getProvider();
    const program = new Program(idl, programID, provider);

    try {
      Txsignature = await program.rpc.initialize(userName, userEmail, {
        accounts: {
          initAccount: new_account.publicKey,
          signer: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [new_account],
      });
      alert("Appending Input");
      const transaction = await provider.connection.getTransaction(
        Txsignature,
        "confirmed"
      );
      console.log(transaction);

      setTx(Txsignature);
      setuserName("");
      setuserEmail("");
    } catch (err) {
      console.error("Transaction Error:", err);
    }

    setuserName("");
    setuserEmail("");
  };

  const findTxRes = async () => {
    if (inputVal.name && inputVal.email !== null) {
      setInput({});
      return;
    }
    try {
      const provider = getProvider();
      const transaction = await provider.connection.getTransaction(
        Tx.toString(),
        "confirmed"
      );
      console.log(transaction);
      console.log(
        "Transaction Confirmation:",
        transaction.meta.logMessages[8].slice(25)
      );
      setInput({
        name: transaction.meta.logMessages[8].slice(18),
        email: transaction.meta.logMessages[9].slice(19),
      });
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  return (
    <div className="App">
      <header className={walletaddress ? "App-header" : ""}>
        <Button
          text={walletaddress ? "Disconnect Wallet" : "Connect Wallet"}
          onClick={connectWallet}
        ></Button>
        {!walletaddress && <br />}
        {walletaddress && (
          <>
            <div class="form__group field">
              <input
                type="input"
                class="form__field"
                placeholder="Name"
                name="name"
                id="name"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
                required
              />
              <label for="name" class="form__label">
                Name
              </label>
            </div>
          </>
        )}
        {walletaddress && (
          <>
            <div class="form__group field">
              <input
                type="input"
                class="form__field"
                placeholder="Email"
                name="email"
                id="email"
                value={userEmail}
                onChange={(e) => setuserEmail(e.target.value)}
                required
              />
              <label for="email" class="form__label">
                Email
              </label>
            </div>
          </>
        )}

        <br />
        {walletaddress && <Button text="Submit" onClick={input}></Button>}
        <br />
        <div className="gettingInput">
          {walletaddress && Tx && (
            <a
              href={`https://explorer.solana.com/tx/${Tx}?cluster=devnet`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                text={"Get Transaction"}
                onClick={() => {
                  return;
                }}
              ></Button>
            </a>
          )}
          {walletaddress && Tx && <br />}
          {walletaddress && Tx && (
            <Button text="Transaction Input" onClick={findTxRes}></Button>
          )}
        </div>
        <div className="retrieveData">
          {walletaddress && inputVal.name && inputVal.email !== null && (
            <div className="formatted-text">
              <p>Name: {inputVal.name}</p>
              <p>Email: {inputVal.email}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default App;
