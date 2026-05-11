import React, { useState } from 'react'

const ColorCheckBox = ({color, checkedColor, onFilters}) => {


    
    return (
            
            <div className='absolute z-10 max-sm:left-0 mt-2 text-xs sm:text-[15px] p-2 mb-3 bg-white rounded-m w-96 flex flex-wrap '>
                {color?.map(c => (
                <div key={c._id} className='w-1/3 py-2  sm:p-1'>
                    <input 
                        type="checkbox"
                        checked={checkedColor.includes(c._id)}
                        onChange={() => {
                            let newChecked = [...checkedColor];

                            if (newChecked.includes(c._id)) {
                                newChecked = newChecked.filter(id => id !== c._id);
                            } else {
                                newChecked.push(c._id);
                            }

                            onFilters(newChecked);
                        }}
                    />
                    {" "}
                    <label htmlFor={c._id}>{c.name}</label>
                </div>
                ))}
            </div>
    )
}

export default ColorCheckBox