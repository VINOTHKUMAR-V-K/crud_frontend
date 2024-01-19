import React from 'react';
import "../styles/wallpaper.css"

const QuickSearchItems = (props) => {
  return (
    <div>
        <div className='row m-auto '>
            <div className='grid px-0 g-5 d-flex border border-4 rounded-3 shadow  bg-body rounded'>
                <img src={props.img} alt="food images" height={"150px"} width={"150px"} />
                <div className='px-2 py-4 '>
                <h4>{props.meals}</h4>
                <h6>{props.describe}</h6>
                <h6>{`Meal_type: ${props.id}`}</h6>
                </div>
            </div>
        </div>
    </div>
  )
}

export default QuickSearchItems;