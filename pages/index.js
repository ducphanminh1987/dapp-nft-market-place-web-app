import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { AppContextComp } from "../components/MarketPlace";
import Metamask from "../components/Metamask";
import ListNFT from "../components/ListNFT";
import AllNFTs from "../components/AllNFTs";

export default function Home() {
  return (
    <AppContextComp>
      <Metamask />
      <ListNFT></ListNFT>
      <AllNFTs></AllNFTs>
    </AppContextComp>
  );
}
