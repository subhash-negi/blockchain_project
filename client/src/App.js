import React, { useState, useEffect } from "react"
import {Routes,Route} from 'react-router-dom';

import { BrowserRouter } from "react-router-dom";
import getWeb3 from "./getWeb3";
import Lottery from "./contracts/Estate.json";
import "./App.css";
import Manager from "./components/manager";
import Getstarted from "./components/getstarted";
import Home from "./components/Home";
import Buyer from "./components/buyerinfo";
const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [address,setaddress]=useState(null);
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = Lottery.networks[networkId];
        console.log("Contract Address:", deployedNetwork.address);
        const instance = new web3.eth.Contract(
          Lottery.abi,
          deployedNetwork && deployedNetwork.address
        );
        setaddress(deployedNetwork.address);
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="getstarted" element={<Getstarted/>}></Route>
          <Route path="buyer" element={<Buyer state={state} address={address}/>}></Route>
          <Route path="manager" element={<Manager state={state}/>}></Route>
      </Routes>
   </>
  
  );
};
export default App;
