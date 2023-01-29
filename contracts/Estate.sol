 //SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Estate{
    address payable public owner;
    uint public totalFlats;
    uint public flatPrice=20*(10**18);
    uint public endTime;
    uint public totalBuyers;
    uint public soldFlats;
    uint public votingEndTime;
    uint public totalVote;
    bool fundClaimed;

    struct BuyerDetails
    {
        address payable buyerAddress;
        uint totalAmountPaid;
        uint amountRemaining;
        bool fundClaimed;
    }
    BuyerDetails[] public buyerDetails;
    mapping(address=>uint) public buyerMap;
    mapping(address=>bool)public voted;

    constructor(uint _totalFlats, uint _endTime, uint _votingEndTime)
    {
        owner=payable(msg.sender);
        endTime=block.timestamp+ _endTime;
        totalFlats=_totalFlats;
        votingEndTime=block.timestamp + _votingEndTime;
        buyerDetails.push();
    }
    function buyflat() external payable
    {
        require(msg.sender!=owner,"owner cannot buy flat");
        require(block.timestamp<endTime,"Deadline has passed");
        require(buyerMap[msg.sender]==0,"only new buyers are allowed to buy");
        require(msg.value<=flatPrice,"please check the flat price");
        require(msg.value>0,"minimum price to book is 1 ethereum");
        require(soldFlats<totalFlats,"all flats are sold");

            BuyerDetails memory buyer=BuyerDetails({
            buyerAddress:payable(msg.sender),
            totalAmountPaid:msg.value,
            amountRemaining:flatPrice-msg.value,
            fundClaimed:false
        });

        soldFlats++;
        totalBuyers++;
        buyerDetails.push(buyer);
        buyerMap[msg.sender]=buyerDetails.length-1;
        
      
    }
    function depositFund() external payable
    {
      require(block.timestamp<endTime,"Deadline has passed");
      require(msg.sender!=owner,"owner cannot buy flat");
      require(buyerMap[msg.sender]!=0,"you are new buyer");


      uint location=buyerMap[msg.sender];
      BuyerDetails memory buyer=buyerDetails[location];
     
      require(msg.value == buyer.amountRemaining,"please check the remaining amount");
     
      require(msg.value>0,"Minimum price to deposit is 1 eth");

      buyerDetails[location].totalAmountPaid=buyerDetails[location].totalAmountPaid+msg.value;

       buyerDetails[location].amountRemaining=buyerDetails[location].amountRemaining-msg.value;

       //emit Message("Money deposited");
    }
    function putVote() external
    {
        require(msg.sender!=owner,"owner cannot vote");
        require(block.timestamp>endTime,"project has not ended yet");
        require(block.timestamp<votingEndTime,"Voting time has passed");
        require(buyerMap[msg.sender]!=0,"you have not bought flat");
        require(voted[msg.sender]==false,"you have already voted");
        totalVote++;
        voted[msg.sender]=true;
    }

    function claimFundContractor() public{
        require(fundClaimed==false,"fund is already claimed");
        require(msg.sender==owner,"only contractor can claim the funds");
        require(block.timestamp>endTime,"project has not ended yet");
        require(block.timestamp>votingEndTime,"Voting time has not yet passed");
        require(totalVote>totalBuyers/2,"majority does not support");
        uint amount=address(this).balance;
        fundClaimed=true;
        owner.transfer(amount);   
    }
    function claimFundUser() public{
        require(buyerMap[msg.sender]!=0,"you have not bought flat");
        require(msg.sender!=owner,"only users can claim the fund");
        require(block.timestamp>endTime,"project is not over yet");
        require(block.timestamp>votingEndTime,"voting time has not yet passed");
        require(totalVote<=totalBuyers/2,"majority support contractor");
        uint location=buyerMap[msg.sender];
        require(buyerDetails[location].fundClaimed==false,"Funds already claimed");
        uint amount=buyerDetails[location].totalAmountPaid;
        buyerDetails[location].totalAmountPaid=0;
        buyerDetails[location].fundClaimed=true;
        address payable buyer=buyerDetails[location].buyerAddress;
        fundClaimed=true;
        buyer.transfer(amount); 
    }
    function getBalance()public view returns(uint256){
        require(owner==msg.sender,"you are not the manager");
        return address(this).balance;
    }

    function getdepositamt() public view returns (uint256){
        uint index=buyerMap[msg.sender];
        uint answer=buyerDetails[index].totalAmountPaid;
        return answer;
    }
    function getamtremaining()public view returns(uint256){
        uint index=buyerMap[msg.sender];
        uint answer2=buyerDetails[index].amountRemaining;
        return answer2;
    }
}
