import React, { useContext } from "react";
import { AppContext } from "./MarketPlace";

function Header({ currentPage, setCurrentPage }) {
  const { account, connectMetamask } = useContext(AppContext);
  return (
    <div className="header">
      <a className="company-name" href="index.html">
        {" "}
        <h3>DAPP NFT Place Market</h3>
      </a>
      <div className="links">
        <a
          className={currentPage === "allnfts" ? "active" : ""}
          href="#"
          onClick={() => setCurrentPage("allnfts")}
        >
          Market Place
        </a>
        <a
          className={currentPage === "mynfts" ? "active" : ""}
          href="#"
          onClick={() => setCurrentPage("mynfts")}
        >
          My NFTs
        </a>
        <a
          className={currentPage === "listnft" ? "active" : ""}
          href="#"
          onClick={() => setCurrentPage("listnft")}
        >
          Create NFT
        </a>
      </div>
      <div className="connect-btn">
        {account ? (
          `Welcome ${account.substring(0, 10)}...`
        ) : (
          <button className="connect-btn">Connect to Wallet</button>
        )}
      </div>
    </div>
  );
}

export default Header;
