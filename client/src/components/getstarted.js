import React from 'react'
import { useState, useEffect } from "react"
import Navbar from './navbar';
import{Link, Routes,Route} from 'react-router-dom';
import getWeb3 from "../getWeb3";
import Lottery from "../contracts/Estate.json";
import Middle from './midcontainer';

const Getstarted = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [address,setaddress]=useState(null);
  const[account,setAccount]=useState("");
  const[owner,setOwner]=useState("");
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
        alert("Failed to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);
  useEffect(()=>{
    const getAccount=async()=>{
        const {web3}=state;
        const accounts=await web3.eth.getAccounts();
        //console.log("connected account:",accounts);
        setAccount(accounts[0]);
    }
   state.web3 && getAccount();  
  },[state,state.web3]);
  const getowner=async()=>{
    const {contract}=state;
    const own=await contract.methods.owner().call({from:account});
        //console.log("owner:",own);
    setOwner(own)
    }
    getowner();
  return (
    <>

       <Navbar/>

       <img src="https://assets-news.housing.com/news/wp-content/uploads/2022/03/15102726/Vastu-for-flats-in-apartments.jpg" className='ml-12 mt-16 h-96 w-11/12 mr-32 rounded-lg border-4 b border-black'></img>
       <center><h1 className='text-6xl my-10 font-bold'> ARE YOU</h1></center>
       <div className='ml-12 h-64 w-11/12 border-8 border-purple-500 mb-32 rounded-lg'>

          <Link to="/manager"><center><button className='w-64 text-white text-4xl border-4 border-green-500 mt-10 py-2 font-bold px-4 bg-blue-700 rounded-lg'>MANAGER</button></center></Link>
        
       <Link to="/buyer"><center><button className='w-64 text-white text-4xl border-4 border-green-500 mt-4 py-2 font-bold px-4 bg-orange-500 rounded-lg'>BUYER</button></center></Link>
     </div>
    </>
  );
}

export default Getstarted;
