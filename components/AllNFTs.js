import React, { useContext, useEffect, useState } from "react";

import { ethers } from "ethers";

import { AppContext } from "./MarketPlace";

import axios from "axios";

function AllNFTs() {
  const { contract } = useContext(AppContext);

  const [NFTs, setNFTs] = useState([]);

  useEffect(() => {
    const getNFTInfo = async (nfts) => {
      const promises = nfts.map(
        (nft) =>
          new Promise((resolve) => {
            const [tokenId, owner, seller, price] = nft;
            contract.tokenURI(tokenId).then((uri) => {
              const obj = {
                tokenId: tokenId.toNumber(),
                owner,
                seller,
                price: ethers.utils.formatUnits(price.toString(), "ether"),
                uri,
              };
              if (!uri.startsWith("ipfs")) {
                axios.get(uri).then((res) => {
                  resolve({ ...obj, metadata: res.data });
                });
              } else {
                resolve(obj);
              }
            });
          })
      );
      const data = await Promise.all(promises);
      return data;
    };
    if (contract)
      contract
        .getAllNFTs()
        .then((nfts) => getNFTInfo(nfts).then((data) => setNFTs(data)));
  }, [contract]);

  return (
    <table>
      <thead>
        <tr>
          <th>Token Id</th>
          <th>Owner</th>
          <th>Seller</th>
          <th>Price</th>
          <th>URI</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {NFTs.map(({ tokenId, owner, seller, price, uri, metadata }) => (
          <tr key={tokenId}>
            <td>{tokenId}</td>
            <td>{owner}</td>
            <td>{seller}</td>
            <td>{price}</td>
            <th>{uri}</th>
            <th>
              <img
                style={{ width: 300, height: 200 }}
                src={metadata?.image ?? ""}
              />
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AllNFTs;
