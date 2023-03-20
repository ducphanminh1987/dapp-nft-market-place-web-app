import React, { useContext, useEffect, useState } from "react";

import { ethers } from "ethers";

import { AppContext } from "./MarketPlace";

import axios from "axios";

function MyNFTs() {
  const { contract } = useContext(AppContext);

  const [NFTs, setNFTs] = useState([]);

  useEffect(() => {
    const getNFTInfo = async (nfts) => {
      debugger;
      const promises = nfts.map(
        (nft) =>
          new Promise((resolve) => {
            const [tokenId, owner, seller, price] = nft;
            contract.tokenURI(tokenId).then((uri) => {
              console.log("uri", uri);
              const obj = {
                tokenId: tokenId.toNumber(),
                owner,
                seller,
                price: ethers.utils.formatUnits(price.toString(), "ether"),
                uri,
              };
              axios
                .get(uri, {
                  headers: {
                    Accept: "text/plain",
                  },
                })
                .then((res) => {
                  resolve({ ...obj, metadata: res.data });
                })
                .catch((err) => {
                  console.error(err);
                  resolve(obj);
                });
            });
          })
      );
      const data = await Promise.all(promises);
      return data;
    };
    if (contract)
      contract
        .getMyNFTs()
        .then((nfts) => getNFTInfo(nfts).then((data) => setNFTs(data)));
  }, [contract]);

  return (
    <div className="grid-container">
      {NFTs.map((nft, index) => (
        <div key={index} className="grid-item">
          <img src={nft.metadata?.image ?? ""} />
          <div className="details">
            <span className="nft-details-item nft-name">
              {nft.metadata?.name ?? ""}
            </span>
            <span className="nft-details-item nft-address">
              Owner: {nft.owner}
            </span>
            <span className="nft-details-item nft-address">
              Seller: {nft.seller}
            </span>
            <span className="nft-details-item nft-price">
              Price: {nft.price} ETH
            </span>
            <span className="nft-details-item">
              <button className="btn-buy">Buy</button>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyNFTs;
