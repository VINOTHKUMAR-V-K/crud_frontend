import React, { useEffect, useState } from 'react'
import "../styles/wallpaper.css"
import QuickSearchItems from './QuickSearchItems'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../axiosClient'
const QuickSearches = () => {
    const navigate=useNavigate();
    
    const [mealtype, setMealtype] = useState([])
    useEffect(() => {
        axiosClient.get(`zomoto/getAllMealtype`)
            .then((res) => setMealtype(res.data))
            .catch((err) => err);
    }, [])

    const navgateFilter =(mealtypeid)=>{
        var locId= sessionStorage.getItem("locationID")
        if(locId){
            navigate(`/filter?mealtype=${mealtypeid}&location=${locId}`)
        }else{
            navigate(`/filter?mealtype=${mealtypeid}`)
        }
        
    }

    return (
        <div>
            <div className='content'>
                <h1>Get ready for your meals...</h1>
                <h1>Taste it!, Swiggy it!</h1>
            </div>
            <div className='container'>
                <div className='row '> 
                    {mealtype && mealtype.map((m, i) => { 
                      return <div key={i} className='col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 col-xs-12 ' onClick={()=>navgateFilter(m.meal_type)}>
                            <QuickSearchItems img={m.image} meals={m.name} describe={m.content} id={m.meal_type} />
                        </div>

                    })}

                </div>
            </div>
        </div>
    )
}

export default QuickSearches