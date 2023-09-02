import React from "react";
import "../assets/styles/Profile.css";
import { useState,useEffect } from "react";

export default function Services(e) {

  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const token = localStorage.getItem("token");
  const [balance, setBalance] = useState("");
  const [totalDeposit,setTotalDeposit] = useState("");
  const [totalWithdraw,setTotalWithdraw]=useState("");


  const getData= async()=>{
    const response=await fetch("http://localhost:1337/api/balance",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token
      }),
    });

    const data= await response.json();
    if(data.status)
    {
      setBalance(data.balance);
      setTotalDeposit(data.totalDeposit);
      setTotalWithdraw(data.totalWithdraw);
    }
    else
    {
      window.alert(data.msg);
    }
  }

  useEffect(()=>{
    getData();
  },[]
  );


  const handleDeposit = async(e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:1337/api/deposit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        depositAmount
      }),
    });
    const data = await response.json();

    if(data.status){
      setBalance(data.balance);
      setTotalDeposit(data.totalDeposit);
      console.log(data)
    }
    else
    { 
      window.alert(data.msg);
    }
    
  }

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:1337/api/withdraw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        withdrawAmount,
      }),
    });
    const data = await response.json();
    
    if(data.status){
      setBalance(data.balance);
      setTotalWithdraw(data.totalWithdraw);
    }
    else
    {
      window.alert(data.msg);
    }
    
    console.log(data);
  }

  return (
    <div className="flexcontainer row bg-primary">

      <div className="col-md-4">
        <div className="row-md-3 m-5 p-3 bg-light">
          <div>
            <h3 className="p-2">Total Balance</h3>
            <h4 className="p-2 amount">₹{balance}</h4>
          </div>
        </div>
        <div className="row-md-3 m-5 p-3 bg-light">
          <div>
            <h3 className="p-2">Total Deposit</h3>
            <h4 className="p-2 amount">₹{totalDeposit}</h4>
          </div>
        </div>
        <div className="row-md-3 m-5 p-3 bg-light">
          <div>
            <h3 className="p-2">Total Withdrawal</h3>
            <h4 className="p-2 amount">₹{totalWithdraw}</h4>
          </div>
        </div>
     </div>

      <div className="col-md-6">
        <div className="row-md-6  m-4 p-3 bg-light">
          <form onSubmit={handleDeposit} >
            <div className="form-group">
              <label htmlFor="inputDeposit">
                <h2 className="pb-4 pt-4">Deposit</h2>
              </label>
              <input
                value={depositAmount}
                onChange={(e)=> setDepositAmount(e.target.value)}
                type="string"
                className="form-control mb-4 mt-4 pt-2 pb-2 w-60"
                aria-describedby="depositAmount"
                placeholder="Deposit Amount"
              />
              <small id="emailHelp" className="form-text text-muted"></small>
            </div>
            <div className="d-grid gap-2 pb-3 pt-3">
              <button type="submit" className="btn btn-primary ">
                Deposit
              </button>
            </div>
          </form>
        </div>

        <div className="row-md-6 m-4 p-3 bg-light">
          <form onSubmit={handleWithdraw}>
            <div className="form-group">
              <label htmlFor="inputDeposit">
                <h2 className="pb-4 pt-4">Withdraw</h2>
              </label>
              <input
                value={withdrawAmount}
                onChange={(e)=> setWithdrawAmount(e.target.value)}
                type="string"
                className="form-control mb-4 mt-4 pt-2 pb-2 w-60"
                aria-describedby="depositAmount"
                placeholder="Withdraw Amount"
              />
              <small id="emailHelp" className="form-text text-muted"></small>
            </div>
            <div className="d-grid gap-2 pb-3 pt-3">
              <button type="submit" className="btn btn-primary ">
                Withdraw
              </button>
            </div>
          </form>
        </div>

      </div>

      <div className="col-md-2">

      </div>

    </div>
  );
}