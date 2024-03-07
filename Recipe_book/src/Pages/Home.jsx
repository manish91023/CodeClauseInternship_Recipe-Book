import React from 'react'
import { useEffect, useState } from 'react'

import axios from 'axios'
import Avtar from '../Shared/UiElements/Avtar'
import { Link } from 'react-router-dom'
const Home = () => {

  const [meals,setMeals]=useState(null);
  const [loading,setLoading]=useState(true)
  const [error,setError] = useState(null)

  useEffect(()=>{
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
         const response = await axios.get('http://localhost:3000/recipe');
         setMeals(response.data)
          setLoading(false)
         console.log(response);
      } catch (error) {
        console.error(error)
         setError(error)
         setLoading(false)
      }
     };
     
     fetchData();
  },[])

    if(loading){
      return <div className=' text-center my-auto'>Loading....</div>
    }

    if(error){
      return <div>error:{error.message};</div>
    }
  return (
    <>
       <div className=' flex flex-wrap justify-center mt-3 '>
      {meals && meals.map(meal=>(
        <Link key={meal._id} to={`/recipe/${meal._id}`}>
        
          <Avtar banner={meal.imageUrl} title={meal.name}/>
        </Link>
      ))}
      </div>
    </>
  )
}

export default Home