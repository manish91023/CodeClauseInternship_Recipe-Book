import React, { useContext, useEffect, useState } from 'react'
import { FaImages } from "react-icons/fa";
import GetUserId from '../Hooks/GetUserId';
import sampleImage from '../assets/file_514830.png'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Create = () => {
 const navigate=useNavigate()
 const userId = GetUserId();
 const recipeId=useParams();

 const [name,setName]= useState('')
 const [ingradients,setIngradients]=useState('')
 const [instructions,setInstructions]= useState('')
 const [imageUrl,setImageUrl]=useState('')

 const [preview,setPreview]=useState(null);
 const [selectedFile,setSelectedFile]=useState()
 const [loading,setLoading]=useState(false)

  useEffect(()=>{
    const fetchData=async()=>{
     // console.log(recipeId)
      const response= await axios.get(`http://localhost:3000/recipe/${recipeId.id}`);
      //console.log(response) 
      setName(response.data.name)
      setIngradients(response.data.ingredients)
      setInstructions(response.data.instructions)
      setImageUrl(response.data.imageUrl)
      
    }
    fetchData();
  },[])

 const RecipeData = {
    name:name,
    ingredients:ingradients,
    instructions:instructions,
    imageUrl:imageUrl,
    userOwner:userId
 }

 const handleImage=(e)=>{
    setPreview(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0])
 }

 const uploadImage = async(e)=>{
    e.preventDefault()
    if(!selectedFile){
      alert("select an image")
      return
    }
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("file",selectedFile);
      formData.append("upload_preset","le0w7ev3")

      const response = await fetch('https://api.cloudinary.com/v1_1/dno1deskb/image/upload',{
        method:'post',
        body:formData
      });

      const data =await response.json();
      let imgUrl= data.secure_url;
     // console.log(imgUrl)
      setImageUrl(imgUrl)
     // console.log(imageUrl)
      alert("image uploaded")
    } catch (error) {
      alert("failed to upload image ")
      console.log(error)
    }finally{
      setLoading(false)
    }
 }

 const onSubmit =async(e)=>{
    e.preventDefault();
    // if(!selectedFile){
    //   alert("select an file")
    //   setLoading(false)
    //   return;
    // }
    setLoading(true)
    try {
      const createRes= await axios.put(`https://recipe-book-ivt5.onrender.com/recipe/edit/${recipeId.id}`,RecipeData)
      .then(res=>{
        console.log(res.data);
        setImageUrl('')
        setIngradients("")
        setInstructions("")
        setName("")
        alert("post edited  successfully")
        navigate('/recipe/home')
      }).catch(err=>{
        console.log(err)
        alert("recipe not created")
      })
    } catch (error) {
      console.log(error)
      alert("something went wrong")
    }finally{
      setLoading(false)
    }
 }

 return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-800 to-indigo-900'>
      <div className='flex flex-col justify-center items-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <div className='mb-4'>
          <img src={preview ? preview : sampleImage} alt='Select Image' className='w-32 h-32 rounded-full' />
        </div>
        <form className='w-full' onSubmit={onSubmit}>
          <div className='mb-4'>
            <label htmlFor="imageUpload" className='cursor-pointer'>
              <p className='flex items-center justify-center bg-orange-500 text-white px-6 py-3 rounded-lg'>
                <FaImages className='mr-2' />Select Image
              </p>
              <input type="file" id='imageUpload' accept='image/*' onChange={handleImage} className='hidden' />
            </label>
            {loading ? <p>Uploading...</p> : <button className='w-full bg-green-500' onClick={uploadImage}>Upload</button>}
          </div>
          <div className='mb-4'>
            <label className='font-bold' htmlFor="">Name</label>
            <input type="text" name='name' value={name} placeholder='Enter name of recipe' onChange={(e)=>setName(e.target.value)} className='w-full bg-gray-50 py-3 rounded-lg' />
          </div>
          <div className='mb-4'>
            <label className='font-bold' htmlFor="">Ingredients</label>
            <textarea name="ingradients" value={ingradients} onChange={(e)=>setIngradients(e.target.value)} id="" cols="50" rows="5" className='w-full px-4 py-2 border border-black bg-gray-50 rounded-lg'></textarea>
          </div>
          <div className='mb-4'>
            <label className='font-bold' htmlFor="">Instructions</label>
            <textarea name="instructions" value={instructions} onChange={(e)=>setInstructions(e.target.value)} id="" cols="50" rows="5" className='w-full px-2 py-2 bg-gray-50 border border-black rounded-lg'></textarea>
          </div>
          {loading ? <button className='bg-gray-500 w-full'>Creating...</button> : <button className='w-full bg-green-500' type='submit'>Add</button>}
        </form>
      </div>
    </div>
 )
}

export default Create