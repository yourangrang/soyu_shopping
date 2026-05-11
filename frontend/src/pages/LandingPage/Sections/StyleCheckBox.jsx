import React, { useState } from 'react'

const StyleCheckBox = ({style, checkedStyle, onFilters}) => {


    
    return (
            
            <div className='absolute z-10 max-sm:left-0 mt-2 text-xs sm:text-[15px] p-2 mb-3 bg-white rounded-m w-96 flex flex-wrap '>
                {style?.map(s => (
                <div key={s._id} className='w-1/3 py-2  sm:p-1'>
                    <input 
                        checked={checkedStyle.includes(s._id)}
                        onChange={() => {
                            let newChecked = [...checkedStyle];

                            if (newChecked.includes(s._id)) {
                                newChecked = newChecked.filter(id => id !== s._id);
                            } else {
                                newChecked.push(s._id);
                            }

                            onFilters(newChecked);
                        }}
                        type="checkbox"
                        id={s._id}
                        value={s._id}
                    />
                    {" "}
                    <label htmlFor={s._id}>{s.name}</label>
                </div>
                ))}
            </div>
    )
}

export default StyleCheckBox