
import {useState} from 'react'
import { Link,useNavigate } from "react-router-dom";

function LoginForm() {

  const navigate = useNavigate();
  const [accountId,setAccountId]=useState('')
  const [password,setPassword]=useState('')

  async function loginUser(event){
    event.preventDefault()

    const response=await fetch('http://localhost:1337/api/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        accountId,
        password
      })
    })

    const data=await response.json()
    console.log(data)

    if(!data.status || !data){
      window.alert("Invalid Credentials")
    }
    else{
      localStorage.setItem('token',data.accessToken);
       localStorage.setItem('isLoggedIn', true);
      navigate("/home")
    }
    // else{
    //   localStorage.setItem('accountId',data.accountId)
    //   localStorage.setItem('balance',data.balance)
    //   localStorage.setItem('name',data.name)
    //   localStorage.setItem('contact',data.contact)
    //   localStorage.setItem('email',data.email)
    //   navigate("/home");  
    // }
  }

  
  return(
    <>
    <div className="bg-primary d-flex align-items-center justify-content-center p-5 ">
      <form className="col-4 mt-20 bg-white " onSubmit={loginUser}>

        <div className=" pt-5 p-5">
            <h2>LogIn</h2>
          <label htmlFor="exampleInputEmail1" className="form-label pt-2" placeholder="Email address">
            Account Number
          </label>
          <input
            value={accountId}
            onChange={(e)=> setAccountId(e.target.value)}
            type="string"
            className="form-control"
            aria-describedby="accountHelp"
          />
          <div id="accountHelp" className="form-text">
            
          </div>

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
                LogIn
            </button>
            <div className="text-left mt-2">Not registered yet ? <Link to="/signup">Create Account</Link></div>
        </div>
        </div>

      </form>
    </div>
    
      </>
  ) 
}

export default LoginForm;


