import React, { useState } from 'react'

const GenderCheckBox = ({gender, checkedGender, onFilters}) => {


    
    return (
            
            <div className='absolute z-10 max-sm:left-0  mt-2 text-xs sm:text-[15px] p-2 mb-3 bg-white rounded-m w-96 flex flex-wrap '>
                {gender?.map(g => (
                <div key={g._id} className='w-1/3 py-2  sm:p-1'>
                    <input 
                        type="checkbox"
                        checked={checkedGender.includes(g._id)}
                        onChange={() => {
                            let newChecked;

                            if (checkedGender.includes(g._id)) {
                                newChecked = [];
                            } else {
                                newChecked = [g._id];
                            }

                            onFilters(newChecked);
                        }}
                    />
                    {" "}
                    <label htmlFor={g._id}>{g.name}</label>
                </div>
                ))}
            </div>
    )
}

export default GenderCheckBox