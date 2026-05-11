import React  from 'react'

const CheckBox = ({ clothings, checkedclothings, onFilters }) => {
    // const handleToggle = (clothingId) => {

    //     // 현재 누른 checkbox가 이미 누른 checkbox 인지 체크
    //     const currentIndex = checkedclothings.indexOf(clothingId);

    //     const newChecked = [...checkedclothings];

    //     if (currentIndex === -1) {
    //         newChecked.push(clothingId);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }
    //     onFilters(newChecked);

    // }


    
    return (
            <div className='text-md max-sm:font-bold max-sm:text-[14px] flex flex-wrap justify-center  '>
                        <div
                            // type='checkbox'
                            // onChange={() => handleToggle(clothing._id)}
                            onClick={() => onFilters([])}
                            // checked={checkedclothings.indexOf(clothing._id) === -1 ? false : true}
                            //  checked={checkedclothings.length === 0}
                            className={`cursor-pointer rounded-xl  max-sm:w-11 w-14 h-8 max-sm:mx-[1px] lg:mx-2 flex items-center justify-center hover:bg-gray-200 transition-all duration-300 ease-in ${checkedclothings.length === 0 ? 'bg-black text-white font-bold ':''}`}
                        >전체</div>
                        {/* <label>전체</label> */}
                {clothings?.map(clothing => (
                    <div key={clothing._id} >
                        <div
                            // type='checkbox'
                            // onChange={() => handleToggle(clothing._id)}
                            onClick={() => onFilters(clothing._id)}
                            // checked={checkedclothings.indexOf(clothing._id) === -1 ? false : true}
                            //  checked={checkedclothings === clothing._id}
                            className={`cursor-pointer  rounded-xl  max-sm:w-11 w-14 h-8  max-sm:mx-[1px] lg:mx-2 flex items-center justify-center hover:bg-gray-200 transition-all duration-300 ease-in ${checkedclothings === clothing._id ? 'bg-black text-white  font-bold  ':''}`}
                        >{clothing.name}</div>
                        {/* <label>{clothing.name}</label> */}
                    </div>
                ))}
            </div>
    )
}

export default CheckBox