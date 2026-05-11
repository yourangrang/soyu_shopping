import React, { useState } from 'react'

const FitCheckBox = ({fit, checkedFit, onFilters}) => {


    
    return (
            
            <div className='absolute z-10  max-sm:left-0 mt-2 text-xs sm:text-[15px] p-2 mb-3 bg-white rounded-m w-96 flex flex-wrap '>
                {fit?.map(f => (
                <div key={f._id} className='w-1/3 py-2  sm:p-1'>
                    <input 
                        type="checkbox"
                        checked={checkedFit.includes(f._id)}
                        onChange={() => {
                            let newChecked;

                            if (checkedFit.includes(f._id)) {
                                newChecked = [];
                            } else {
                                newChecked = [f._id];
                            }

                            onFilters(newChecked);
                         }}
                    />
                    {" "}
                    <label htmlFor={f._id}>{f.name}</label>
                </div>
                ))}
            </div>
    )
}

export default FitCheckBox