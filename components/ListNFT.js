import React, { useState, useContext } from "react";

import { ethers } from "ethers";

import { AppContext } from "./MarketPlace";

function ListNFT({ setCurrentPage }) {
  const {
    contract,
    pinata: { uploadIPFSImage, uploadIPFSMetadata },
  } = useContext(AppContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send the form data to the server or handle it locally
    if (!contract) return;

    const asset = await uploadIPFSImage(file);
    const { IpfsHash } = asset;

    const metadata = {
      description,
      external_url: "https://openseacreatures.io/3",
      image: `https://gateway.pinata.cloud/ipfs/${IpfsHash}`,
      name,
      attributes: [
        {
          trait_type: "Base",
          value: "Starfish",
        },
        {
          trait_type: "Eyes",
          value: "Big",
        },
        {
          trait_type: "Mouth",
          value: "Surprised",
        },
        {
          trait_type: "Level",
          value: 5,
        },
        {
          trait_type: "Stamina",
          value: 1.4,
        },
        {
          trait_type: "Personality",
          value: "Sad",
        },
        {
          display_type: "boost_number",
          trait_type: "Aqua Power",
          value: 40,
        },
        {
          display_type: "boost_percentage",
          trait_type: "Stamina Increase",
          value: 10,
        },
        {
          display_type: "number",
          trait_type: "Generation",
          value: 2,
        },
      ],
    };

    const ipfsJsonPinResult = await uploadIPFSMetadata(metadata);
    const { IpfsHash: jsonMetadataHash } = ipfsJsonPinResult;

    const uri = `https://gateway.pinata.cloud/ipfs/${jsonMetadataHash}`;

    const listPrice = await contract.getListPrice();

    debugger;

    const transaction = await contract.createToken(
      uri,
      ethers.utils.parseEther(price),
      {
        value: listPrice.toString(),
      }
    );

    await transaction.wait();

    setCurrentPage("mynfts");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="name">Description:</label>
      <input
        id="description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label htmlFor="price">Price:</label>
      <input
        id="price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <label htmlFor="file">File:</label>
      <input
        id="file"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default ListNFT;
