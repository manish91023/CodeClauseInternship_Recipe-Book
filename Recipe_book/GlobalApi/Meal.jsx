import Axios from 'axios'

const mealData =()=>{
    Axios.get(`www.themealdb.com/api/json/v1/1/search.php?s=egg`)
}


export default{
    mealData
}