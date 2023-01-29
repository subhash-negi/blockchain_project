
import React,{useState, useEffect} from 'react';

const Buyer =({state, address}) =>{

  const[account,setAccount]=useState("");
  const[buyflat,setBuyflat]=useState("");
  const[depositfund,setDepositfund]=useState("");
  const[depo,setdepo]=useState("");
  const[vote,setvote]=useState("");
  const[fund,setfund]=useState("");
  const[remaining,setremaining]=useState("");
  useEffect(()=>{
    const getAccount=async()=>{
        const {web3}=state;
        const accounts=await web3.eth.getAccounts();
        console.log("connected account:",accounts);
        setAccount(accounts[0]);
    }
   state.web3 && getAccount();
  },[state,state.web3]);

  useEffect(()=>{
    const getdeposit=async()=>{
      const{contract}=state;
        const depositamount=await contract.methods.getdepositamt().call({from:account});
        setdepo(depositamount/10**18);
        console.log("depositedamt is",depositamount); 
    }
    getdeposit();
  },[account]);

  useEffect(()=>{
    const getremaining=async()=>{
      const{contract}=state;
      const remain=await contract.methods.getamtremaining().call({from:account});
      setremaining(remain/10**18);
    }
    getremaining();
  },[account]);

  const buy=async()=>{
    const {contract}=state;
    try{
        let amount=await document.getElementById("amount").value;
        amount=amount*10**18;
        console.log(amount);
        const confirm= await contract.methods.buyflat().send({value:amount, from:account});
        console.log(confirm);
        setBuyflat("successful");
      }catch(e){
        if(e.message.includes("owner cannot buy flat"))
        {
          setBuyflat("owner cannot buy flat");
        }
        else if(e.message.includes("Deadline has passed"))
        {
          setBuyflat("Deadline has passed");
        }
        else if(e.message.includes("only new buyers are allowed to buy"))
        {
          setBuyflat("only new buyers are allowed to buy");
        }
        else if(e.message.includes("please check the flat price"))
        {
          setBuyflat("please check the flat price");
        }
        else if(e.message.includes("minimum price to book is 1 ethereum"))
        {
          setBuyflat("minimum price to book is 1 ethereum");
        }
        else if(e.message.includes("all flats are sold"))
        {
          setBuyflat("all flats are sold");
        }
      }
  }
  const deposit=async()=>{
    const{contract}=state;
    try{
      let fund=await document.getElementById("fund").value;
      fund=fund*10**18;
      const confirmfund=await contract.methods.depositFund().send({value:fund,from:account});
  
      setDepositfund(" deposit ho gya bhai");

    }catch(e){
      if(e.message.includes("Deadline has passed"))
      {
        setDepositfund("Deadline has passed");
      }
      else if(e.message.includes("owner cannot buy flat"))
      {
        setDepositfund("owner cannot buy flat");
      }
      else if(e.message.includes("you are new buyer"))
      {
        setDepositfund("you are new buyer");
      }
      else if(e.message.includes("please check the remaining amount"))
      {
        setDepositfund("please check the remaining amount");
      }
      else if(e.message.includes("Minimum price to deposit is 1 eth"))
      {
        setDepositfund("Minimum price to deposit is 1 eth");
      }
    }
  }
  const voting=async()=>{
    const{contract}=state;
    try{
      let voted=await contract.methods.putVote().send({from:account});
      setvote("succesfully voted");
    }catch(e){
      if(e.message.includes("owner cannot vote"))
      {
        setvote("owner cannot vote");
      }
      else if(e.message.includes("project has not ended yet"))
      {
        setvote(e.message.includes("project has not ended yet"))
      }
      else if(e.message.includes("voting time has passed"))
      {
        setvote("voting time has passed");
      }
      else if(e.message.includes("you have not bought flat"))
      {
        setvote("you have not bought flat");
      }
      else if(e.message.includes("you have already voted"))
      {
        setvote("you have already voted");
      }
    }
  }
  const fundclaim=async()=>{
    const{contract}=state;
    try{ 
      const fund=await contract.methods.claimFundUser().send({from:account});
    }catch(e){
      if(e.message.includes("you have not bought flat"))
      {
        setfund("you have not bought flat");
      }
      else if(e.message.includes("only users can claim fund"))
      {
        setfund("only users can claim fund");
      }
      else if(e.message.includes("project is not over yet"))
      {
        setfund("project is not over yet");
      }
      else if(e.message.includes("voting time has not yet passed"))
      {
        setfund("voting time has not yet passed");
      }
      else if(e.message.includes("majority support contractor"))
      {
        setfund("majority supporrt contractor");
      }
      else if(e.message.includes("Funds already claimed"))
      {
        setfund("Funds already claimed");
      }
    }
  }

    

  return <>
  <div className='flex'>
    <div className='mt-32 h-64 w-2/5 ml-32 rounded-lg border-4 shadow-2xl shadow-blue-700/50   border-blue-700'>
      <p className='text-3xl font-bold ml-48 mt-16 mb-4'>BUYER ACCOUNT</p> < p className=' ml-2 font-bold text-2xl text-green-500 mb-4'>{account}</p>
      <center><input className='border-lime-700 border-2 rounded-lg'   id="amount" type="number" placeholder="enter amount to book"/>
      <button onClick={buy} className=' text-xl mt-4 ml-6 rounded-md font-bold border-2 border-black px-4 bg-stone-200'>BOOK YOUR FLAT</button></center>
    </div>

    <div className='mt-32 h-64 w-2/5 ml-16 rounded-lg border-4 shadow-2xl shadow-blue-700/50 border-blue-700'>
    <p className='text-3xl font-bold ml-40 mt-20 mb-4'>DEPOSITED AMOUNT </p> <p className='ml-80 text-2xl font-bold text-green-500'>{depo}</p>
    </div>
  </div>

  <div className='flex'>
    <div className='mt-24 h-64 w-2/5 ml-32 rounded-lg border-4 shadow-2xl shadow-blue-700/50 border-blue-700'>
      <p className='ml-36 text-3xl font-bold ml-8 mt-16 mb-4'>AMOUNT REMAINING</p> <center><p className='text-2xl font-bold text-green-500'>{remaining}</p></center>
      <center>
        <input className='ml-6 border-lime-700 border-2 rounded-lg' id="fund" type="number" placeholder="enter remaining amount you wanna pay"/>
        <button onClick={deposit} className=' text-xl mt-4 ml-6 rounded-md font-bold border-2 border-black px-4 bg-stone-200'>DEPOSIT REMAINING</button>
      </center>
    </div>

    <div className='mt-24 h-64 w-2/5 ml-16 rounded-lg border-4 shadow-2xl shadow-blue-700/50 border-blue-700'>
      <center>
        <button onClick={voting} className=' h-16 w-64 text-xl rounded-md font-bold border-2 text-white border-double border-black outline outline-offset-4 outline-blue-500 px-4 bg-blue-600 mt-16 mb-8'>PUT VOTE IN FAVOUR</button><br/>
        <button onClick={fundclaim} className='h-16 w-64 text-2xl  rounded-md font-bold border-2 outline outline-offset-4 outline-blue-500 border-double text-white border-black px-4 bg-blue-600'>CLAIM FUND</button>
      </center>
    </div>
  </div>







        <div className='mt-12 ml-12 shadow-2xl h-64 w-11/12 border-2 border-dashed border-black mb-32 rounded-lg'>
            <p className='text-2xl font-bold ml-8 mt-4'>CONNECTED ACCOUNT:-<span className='ml-24 text-2xl text-green-500'>{account}</span></p>
            <p className='text-2xl font-bold ml-8 mt-4'>BUY FLAT MESSAGE:-<span className='ml-10 text-2xl text-green-500'>{buyflat}</span></p>
           
            <p className='text-2xl font-bold ml-8 mt-4'>DEPOSIT MESSAGE:-<span className='ml-8 text-2xl text-green-500'>{depositfund}</span></p>
            <p className='text-2xl font-bold ml-8 mt-4'>CLAIM FUND MESSAGE:-<span className='ml-8 text-2xl text-green-500'>{fund}</span></p>
            <p className='text-2xl font-bold ml-8 mt-4'>VOTING MESSAGE:-<span className='ml-8 text-2xl text-green-500'>{vote}</span></p>
            
        </div>

      </>                                                                                                                                                           
  
};

export default Buyer;
