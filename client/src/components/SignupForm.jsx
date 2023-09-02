
import {useState} from 'react'
import { Link,useNavigate } from "react-router-dom";

function SignupForm() {
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [contact,setContact]=useState('')
  const [accountId,setAccountId]=useState('')
  const [password,setPassword]=useState('')

  const navigate = useNavigate();

  async function registerUser(event){
    event.preventDefault()

    const response=await fetch('http://localhost:1337/api/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        contact,
        accountId,
        password
      })
    })

    const data=await response.json()
    console.log(data)
    if(!data.status ){
      window.alert(data.msg)
    }
    else
    {
      window.alert("Registration Successful")
      navigate("/");
    }
  }
  return(
    <div className="bg-primary d-flex align-items-center justify-content-center p-5 ">
      <form className="col-4 mt-20 bg-white " onSubmit={registerUser}>

        <div className=" pt-5 p-5">
            <h2>SignUp</h2>

          <label htmlFor="name" className="form-label pt-2">
            Name 
          </label>
          <input
            value={name}
            onChange={(e)=> setName(e.target.value)}
            type="text"
            className="form-control"
            aria-describedby="name"
          />

          <label htmlFor="exampleInputEmail1" className="form-label pt-2">
            Email address
          </label>
          <input
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
          />

        <label htmlFor="number" className="form-label pt-2">
            Mobile Number 
          </label>
          <input
            value={contact}
            onChange={(e)=> setContact(e.target.value)}
            type="number"
            className="form-control"
            id="contact"
            aria-describedby="contact"
          />

        <label htmlFor="number" className="form-label pt-2">
            Account Number 
          </label>
          <input
            value={accountId}
            onChange={(e)=> setAccountId(e.target.value)}
            type="number"
            className="form-control"
            aria-describedby="accountNumber"
          />

        <div className="mb-3 pt-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            type="password"
            className="form-control"
            />
        </div>

        <div className="d-grid gap-2 pb-4 pt-4">
            <button type="submit" className="btn btn-primary " >
                SignUp
            </button>
            <div className="text-left mt-2">Already have an account? <Link to="/login">Log In</Link></div>
        </div>
        </div>

      </form>
    </div>
  ) 
}

export default SignupForm;
