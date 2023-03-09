import React, { useContext } from "react";
import { AppContext } from "./MarketPlace";

function Metamask() {
  const { account, connectMetamask } = useContext(AppContext);
  return (
    <div>
      {account ? (
        `Welcome ${account}`
      ) : (
        <button onClick={connectMetamask}>Connect</button>
      )}
    </div>
  );
}

export default Metamask;
