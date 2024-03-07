
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoSearchSharp } from "react-icons/io5";
import { AuthContext } from './AuthContext';
import Logout from './Logout';
import { useCookies } from 'react-cookie';


const Navigation = () => {
  const {isLoggedIn} = useContext(AuthContext);
  const [cookies,setCookies]=useCookies(['access_token'])
    

  const navigate= useNavigate();
    const logOut=()=>{
        setCookies("access_token","")
        window.localStorage.removeItem("userId")
        navigate('/recipe/auth')
    }

  return (
    <div className=' w-[100%] h-[70px] bg-[#23180d] text-white flex justify-between items-center px-2 md:px-7'>

        <div><h2 className=' font-bold'>RecipeDuniya</h2></div>
        <div className='hidden md:flex w-[250px] bg-yellow-300 rounded-lg'>
            <input type="text" placeholder='search...' className=' p-2  text-blue-400 px-3'/>
            <IoSearchSharp className=' mt-3 mx-3 w-[20px] cursor-pointer '/>
        </div>
        <div>

        <Link className='mr-5' to='/recipe/home'>Home</Link>
            {!cookies.access_token && 
                <Link className='bg-orange-500 px-7 py-4 text-white rounded-lg' to='/recipe/auth'>Login</Link>
            }

        {cookies.access_token && 
            <>
                <Link className='mx-5' to="/recipe/create">Create</Link>
                <button onClick={logOut}>Logout</button>
            </>
        }
         
        </div>
    </div>
  )
}

export default Navigation