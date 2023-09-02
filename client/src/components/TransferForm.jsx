import React from "react";
import {useState} from 'react'

export default function TransferForm() {
    
    const [accountId, setAccountId] = useState('')
    const [amount, setAmount] = useState('')
    const token = localStorage.getItem('token')

    const transferMoney = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:1337/api/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                accountId,
                amount
            })
        })
        const data = await response.json();
          window.alert(data.msg);
    }

  return (
    <div className="bg-primary d-flex align-items-center justify-content-center p-5 ">
      <form className="col-4 mt-20 bg-white " onSubmit={transferMoney}>

        <div className=" pt-5 p-5">
            <h2 className="text-center">Tranfer Money</h2>
          <label htmlFor="accountNumber" className="form-label pt-2">
            Reciever Account Number
          </label>
          <input
            value={accountId}
            onChange={(e)=> setAccountId(e.target.value)}
            type="string"
            className="form-control"
            aria-describedby="accountNumber"
          />

        <div className="mb-3 pt-3">
          <label htmlFor="transferAmount" className="form-label">
            Transfer Amount
          </label>
          <input
            value={amount}
            onChange={(e)=> setAmount(e.target.value)}
            type="string"
            className="form-control"
            />
        </div>

        <div className="d-grid gap-2 pb-4 pt-4">
            <button type="submit" className="btn btn-primary ">
                Transfer Money
            </button>
        </div>
        </div>

      </form>
    </div>
  );
}