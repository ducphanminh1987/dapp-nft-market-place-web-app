import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import { AppContextComp } from "../components/MarketPlace";
import Header from "../components/Header";
import ListNFT from "../components/ListNFT";
import AllNFTs from "../components/AllNFTs";

export default function Home() {
  const [currentPage, setCurrentPage] = useState("allnfts");
  return (
    <AppContextComp>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "allnfts" && <AllNFTs />}
      {currentPage === "mynfts" && <AllNFTs />}
      {currentPage === "listnft" && <ListNFT setCurrentPage={setCurrentPage} />}
    </AppContextComp>
  );
}
