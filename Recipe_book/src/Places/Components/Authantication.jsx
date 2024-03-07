import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie'

const Authantication = () => {
  const { setUser, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
    //this variable for register ke liye
  const [name,setName]=useState();
  const [email ,setEmail]=useState();
  const [password,setPassword]=useState();
 
//cookies ke liye
  const [_,setCookies]=useCookies('access_token')
  //this is for login
  const [logEmail,setLogEmail]=useState();
  const [logPassword,setLogPassword]=useState();
  //  register data
  const userData = {
    name: name,
    email: email,
    password: password,
};
//login data 
  const logData = {
    email:logEmail,
    password:logPassword
  };

    const handleOnsubmitRegister = async(e)=>{
      e.preventDefault();

      try {
        const response= await axios.post('http://localhost:3000/register',userData)
        .then(res=>{
          console.log(res.data)
          setName('')
          setEmail('')
          setPassword('')
          alert("user registered successfully now you can login")
          
        })
        .catch(err=>{
          console.log(err)
          alert("user not registered Try again")
        })

        
      } catch (error) {
        console.log("error during registeration",error)
      }

    }


    //handling the login user form 
    axios.defaults.withCredentials= true;
    const handleOnLogin = async(e)=>{
        e.preventDefault();

        try {
          const response= await axios.post('http://localhost:3000/login',logData,{withCredentials:true});
                // Store the token in a cookie or local storage
          setCookies('access_token',response.data.token)
          window.localStorage.setItem("userId",response.data.userId)


        // Update the authentication state
        setIsLoggedIn(true);
          setUser(response.data.user);
          setIsLoggedIn(true)
        alert("you logged in ");
        // Redirect the user to the home page or wherever you want them to go after login
        navigate('/recipe/create');
  
          
        } catch (error) {
          console.log("error during login",error)
          alert("please fill all detail correct .")
        }
  
        
    }


    

    

  return (
    <div className='w-full h-screen  '>
      <div className='flex flex-wrap px-16 w-[100%] h-screen rounded-lg  mx-auto py-8 '>

            {/* login ke liye form */}
          <div className='flex-1 sm:w-1/2  p-2 w-full h-[350px] bg-gradient-to-r bg-gradient-to-r from-slate-900 to-slate-700 rounded-l-lg'>

              <h1 className=' text-center text-white'>Login</h1>
              <hr className=' mt-3 ' />
              <form onSubmit={handleOnLogin}  className=' mt-5'>
                <div >
                  <input type="email" value={logEmail}  name='email' placeholder=' Enter email...' onChange={(e)=>setLogEmail(e.target.value)}  
                      className=' w-[100%] p-2 bg-white text-black border-none outline-none rounded-xl  mb-5'/>
                </div>
             
                <div >
                  <input type="password" value={logPassword}  name='password' placeholder=' Enter password...' onChange={(e)=>setLogPassword(e.target.value)}  
                      className=' w-[100%] p-2 bg-white text-black border-none outline-none rounded-xl  mb-5'/>
                </div>

                <button className=' w-[100%] rounded-lg p-4 bg-green-500'>Login</button>

              </form>


          </div>


    {/* register ke liye form */}
          <div className=' w-full sm:w-1/2 h-[350px] p-2 bg-gradient-to-r from-violet-200 to-pink-200 rounded-r-lg'>
              <h1 className=' text-center'>Register</h1>
              <hr  className=' w-[100%] mt-3 bg-black h-[2px]'/>
              <form onSubmit={handleOnsubmitRegister} className=' mt-5'>
                    <div >
                      <input type="text" value={name}  name='name' placeholder=' Enter name...' onChange={(e)=>setName(e.target.value)}  
                          className=' w-[100%] p-2 bg-white text-black border-none outline-none rounded-xl  mb-5'/>
                    </div>
                    <div >
                      <input type="email" value={email}  name='email' placeholder=' Enter email...'  onChange={(e)=>setEmail(e.target.value)} 
                          className=' w-[100%] p-2 bg-white text-black border-none outline-none rounded-xl  mb-5'/>
                    </div>
                
                    <div >
                      <input type="password" value={password}  name='password' placeholder=' Enter password...'  onChange={(e)=>setPassword(e.target.value)} 
                          className=' w-[100%] p-2 bg-white text-black border-none outline-none rounded-xl  mb-5'/>
                    </div>

                    
                    <button className=' w-[100%] rounded-lg p-4 bg-green-500'>Register</button>
                    
                  </form>

              
          </div>
      </div>
    </div>
  )
}

export default Authantication