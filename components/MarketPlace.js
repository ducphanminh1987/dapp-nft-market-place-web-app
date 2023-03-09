"use client";

import React, { useState, useEffect } from "react";

import { ethers } from "ethers";

import { address, abi } from "../contract/NFTMarketPlace.json";

import Pinata from "../utils/pinata";

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0YzFkOWYxYS1kNzJmLTQxYTQtYjA3NC1iZDg5MWFiNzliNTAiLCJlbWFpbCI6ImR1Y3BoYW5taW5oMTk4N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMmJkYjM2MzFmZTAxZTEzYjBjZjkiLCJzY29wZWRLZXlTZWNyZXQiOiI3YmUzODExOWFjYmIxNmRhYjJjYWU2MDViNjBjOTNkMDVkN2UyOGNjOTk1MjhiYTc3YTczOGNmZjMzMzg3YzI5IiwiaWF0IjoxNjc4MzY2OTQ2fQ.0s_edb9sqQSY3Y9wLXmkgyExZ7MQOjFKZTeKWv8TVFY";

const AppContext = React.createContext(null);

const AppContextComp = ({ children }) => {
  const pinata = Pinata(JWT);

  const [account, setAccount] = useState();
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const { ethereum } = window;
    // get all Metamask connected accounts
    ethereum
      .request({
        method: "eth_accounts",
      })
      .then((accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      });
  }, []);

  useEffect(() => {
    if (account) {
      // init contract
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(address, abi, signer);
      setContract(contract);
    } else {
      setContract(null);
    }
  }, [account]);

  const connectMetamask = async () => {
    const { ethereum } = window;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    }
  };

  return (
    <AppContext.Provider value={{ account, contract, connectMetamask, pinata }}>
      {children}
    </AppContext.Provider>
  );
};

AppContext.propTypes = {};

export { AppContext, AppContextComp };
