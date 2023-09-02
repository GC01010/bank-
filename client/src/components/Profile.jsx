import React, { useEffect,useState } from 'react'
import IMAGES from './Image'
import '../assets/styles/Profile.css'

export default function Profile() {

    const [name, setName]= useState("");
    const [email, setEmail]= useState("");
    const [contact, setContact]= useState("");
    const [accountId, setAccountId]= useState("");

   const token=localStorage.getItem("token");

   useEffect( ()=>{
    getProfile();
   },[]
   );

   const getProfile=async()=>{

    const response=await fetch('http://localhost:1337/api/profile',{
       method: 'POST',
       headers :{
        "Content-Type" : "application/json"
       } ,
       body: JSON.stringify({
        token
       })
    }).catch((err)=>{
        console.log(err);
    })

    const data= await response.json();
    
    setName(data.name);
    setEmail(data.email);
    setContact(data.contact);
    setAccountId(data.accountId);

   }


  return (
    <div className='flexContainer'>

        <div className='container emp-profile bg-light d-flex align-items-center justify-content-center m-5 pr-0'>
            <form method='' className='bg-light m-5 pr-0'>
                <div className='row bg-light'>
                    <div className='col-md-4'>
                        <img className='image img-thumbnail' src={IMAGES.imgtwo} alt="profileImage" />
                        <h3>{name}</h3>
                    </div>

                    <div className='col-md-6'>
                            <div className='row-md-3 mt-4'>
                                <p> Name :</p>   
                                <label htmlFor="name">{name}</label>
                            </div>
                            <div className='row-md-3 mt-4'>
                            <p> Email :</p>
                                <label htmlFor="Email">{email}</label>
                            </div>
                            <div className='row-md-3 mt-4'>
                            <p> Mobile No. :</p>
                            <label htmlFor="mobileNumber">{contact}</label>
                            </div>
                            <div className='row-md-3 mt-4'>
                            <p> Account No. :</p>
                            <label htmlFor="accountNumber">{accountId}</label>
                            </div>
                    </div>

                </div>

            </form>
        </div>
    </div>
  )
}