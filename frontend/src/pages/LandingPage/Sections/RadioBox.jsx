import React, { useState } from 'react'

const RadioBox = ({prices, checkedPrice, onFilters, }) => {


    
    return (
        <div>
            
            {/* {open && */}
            <div className='absolute z-10 max-sm:left-0 text-xs sm:text-[15px] p-2 mb-3 mt-2 bg-white rounded-m flex flex-wrap '>
                {prices?.map(price => (
                <div key={price._id} className='w-1/3 py-2  sm:p-1'>
                    <input 
                        checked={checkedPrice === price.array}
                        onChange={e => onFilters(e.target.value)}
                        type="radio"
                        id={price._id}
                        value={price._id}
                    />
                    {" "}
                    <label htmlFor={price._id}>{price.name}</label>
                </div>
                ))}
            </div>
            {/* } */}
        </div>
    )
}

export default RadioBox