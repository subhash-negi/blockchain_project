import React,{ useEffect, useState } from "react";


const Manager=({state})=>{
    const[account,setAccount]=useState("");
    const[cbalanace,setCbalance]=useState();
    const[buyers,setBuyers]=useState();
    const[soldflats,setSoldflats]=useState();
    const[votes,setVotes]=useState();
    const[message,setMessage]=useState("");
    const[owner,setOwner]=useState("");


    useEffect(()=>{
        const getAccount=async()=>{
            const {web3}=state;
            const accounts=await web3.eth.getAccounts();
            //console.log("connected account:",accounts);
            setAccount(accounts[0]);
        }
       state.web3 && getAccount();  
    },[state,state.web3]);

    
    const contractBalance=async()=>{
        const{contract}=state;
        try{
            const balance=await contract.methods.getBalance().call({from:account});
            console.log(balance);
            setCbalance(balance/10**18);
        }catch(e){
                setCbalance("you are not the manager");
            }
    }
    const totalBuyers=async()=>{
        const {contract}=state;
            
        const buyer=await contract.methods.totalBuyers().call({from:account});
        setBuyers(buyer);
    }

    const sold_flats=async()=>{
        const {contract}=state;
            
        const flats=await contract.methods.soldFlats().call({from:account});
        setSoldflats(flats);
    }
    const countvotes=async()=>{
        const {contract}=state;
            
        const voting=await contract.methods.totalVote().call({from:account});
        setVotes(voting);
    }
    const claimfund=async()=>{
        const{contract}=state;
        try{
            const claim =await contract.methods.claimFundContractor().send({from:account}); 
            //console.log(claim);
            setMessage("successful");   
        }catch(e){
            console.log(e);
            if(e.message.includes("fund is already claimed"))
            {
                setMessage("fund is already claimed");
            }
            else if(e.message.includes("only contractor can claim the funds"))
            {
                setMessage("you are not the manager");
            }
            else if(e.message.includes("project has not ended yet"))
            {
                setMessage("project has not ended yet");
            }
            else if(e.message.includes("Voting time has not yet passed"))
            {
                setMessage("Voting time has not yet passed");
            }
            else if(e.message.includes("majority does not support"))
            {
                setMessage("majority does not support");
            }
        }
        
    }
        const getowner=async()=>{
        const {contract}=state;
        const own=await contract.methods.owner().call({from:account});
            //console.log("owner:",own);
        setOwner(own)
        }
        getowner();

        //console.log(block.timestamp());
    
    
    return<>
    <img src="https://rentpath-res.cloudinary.com/$img_current/t_3x2_jpg_xl/0394d04ac6fc1650c20543a15ee815f4" className='ml-12 mt-16 h-96 w-11/12 mr-32 rounded-lg border-4 b border-black'></img>
    <p>{console.log("ksdj",state)}</p>
    <div className='mt-12 ml-12 h-3/4 w-11/12 border-8 border-purple-500 mb-32 rounded-lg'>
        <p className='text-2xl font-bold ml-8 mt-4'>MANAGER ACCOUNT<span className='ml-24 text-2xl text-green-500'>{owner}</span></p>
        <p className='text-2xl font-bold ml-8 mt-4'>TOTAL BUYERS <span className='ml-44 text-2xl text-green-500'>{buyers}</span>
        <span><button onClick={totalBuyers}className=' text-xl mt-4 ml-80 rounded-md font-bold border-2 border-black px-4 bg-stone-200'>UPDATE BUYERS</button></span></p>
        <p className='text-2xl font-bold ml-8 mt-4'>SOLD FLATS <span className='ml-52 text-2xl text-green-500'>{soldflats}</span>
        <span> <button onClick={sold_flats}className=' text-xl mt-4 ml-80 rounded-md font-bold border-2 border-black px-4 bg-stone-200'>UPDATE SOLD FLATS</button></span></p>
        <p className='text-2xl font-bold ml-8 mt-4'>TOTAL VOTES<span className='ml-52 text-2xl text-green-500'>{votes}</span>
        <span><button onClick={countvotes}className=' text-xl mt-4 ml-80 rounded-md font-bold border-2 border-black px-4 bg-stone-200'> UPDATE VOTES IN FAVOUR</button></span></p>
        <p className='text-2xl font-bold ml-8 mt-4'>FUND COLLECTED<span className='ml-36 text-2xl text-green-500'>{cbalanace}</span>
        <span><button onClick={contractBalance}className=' text-xl mt-4 ml-80 rounded-md font-bold border-2 border-black px-4 bg-stone-200'>VERIFY AND SHOW BALANCE</button></span></p>
        <p className='text-2xl font-bold ml-8 mt-4'>MESSAGE<span className='ml-52 text-2xl text-green-500'>{message}</span></p>
        <center><button onClick={claimfund}className=' text-xl mt-4 ml-6 rounded-md font-bold border-2 border-black px-4 bg-stone-200'>CLAIM FUND</button></center>
    </div>
    
    <p>connected account:{account}</p>
    </> 

};
export default Manager;
