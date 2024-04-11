import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import GetUserId from '../Hooks/GetUserId';


const SingleRecipe = () => {

    const userId = GetUserId();
    const  [recipeCreator,setRecipeCerator]=useState();


    const [loading,setLoading] = useState(false)
    const [mealData,setMealData]=useState();
    const {id}=useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        setLoading(true)
        const fetchData = async(id)=>{
            const response= await Axios.get(`https://recipe-book-ivt5.onrender.com/recipe/${id}`);
            //console.log(response.data)
            setMealData(response.data)
            setRecipeCerator(response.data.userOwner)
           
            setLoading(false)
        }
        fetchData(id)
    },[id])


const deletRecipe = async(e)=>{
    e.preventDefault();
    e.stopPropagation();
    
    const isDeleting = window.confirm("are you sure to delete it? ")
    setLoading(true)
    
    if(!isDeleting){
        setLoading(false)
        return ;
    }
    try {
        const response = await Axios.delete(`https://recipe-book-ivt5.onrender.com/recipe/${id}`);
        alert("Recipe Deleted thanks!")
        navigate('/recipe/home')
        console.log(response)
    } catch (error) {
        console.log(error);
        alert("recipe not deleted something went wrong")
    }finally{
        setLoading(false);
        }
}

        if(loading){
            return <h1 className=' text-center my-20'>processing please wait....</h1>
        }
  return (
    <div className='w-[100%] m-h-[100vh]  cursor-pointer bg-[#2d2013] text-white md:flex flex-col justify-center overflow-auto'>
        <div className=' w-[100%] h-[100vh] px-2 md:px-10 md:flex md:flex-col justify-center pt-5'>
            {mealData &&  (
            
            
               <div className=' w-[100%] md:w-[500px]  mx-auto  '>
                        <img src={mealData.imageUrl} alt={mealData.name} className=' pt-5 w-[300px] md:w-[500px] h-[200px]  object-cover   '/>

                    <div>
                    <h2 className=' font-bold text-[24px] text-center p-4 text-white bg-gradient-to-r from-blue-800 to-indigo-900 '> {mealData.name}</h2>
                    </div>

                    <div>
                        <hr  className='w-[100%] h-[5px] bg-black'/>
                    </div>
                    {userId==recipeCreator &&
                        <>

                            <button className=' bg-orange-500 absolute top-24'  onClick={deletRecipe}>Delete</button>
                            <Link to={`/recipe/edit/${id}`}> <button className=' bg-yellow-500 absolute top-24 right-[50%]' >Edit</button></Link>
                        </>
                    }
                </div>
            
        
            
            )}

            <div className=' mt-5'>
                
                <div className='w-full p-4 text-sm md:text-base'>
                    <h1 className=' font-bold mb-5 '>Ingridents:</h1>
                    {mealData && 
                    <div>
                        <h2 className=' font-medium'>{mealData.ingredients}</h2>
                        
                    </div>
                    }

                   <h1>Instructions:</h1>
                   {mealData && 
                   <p>{mealData.instructions}</p>
                   }
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleRecipe