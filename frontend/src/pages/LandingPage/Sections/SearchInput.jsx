import React from 'react'

import { IoSearchOutline } from "react-icons/io5";


const SearchInput = ({onSearch, searchTerm}) => {
    return (
        <div className='flex justify-center  '>
            <div className='flex  rounded-full bg-gray-100 py-2 px-4 '>
                <IoSearchOutline className=' text-2xl mr-2 '/>
                <input 
                    className='  bg-gray-100 focus:outline-none  max-[410px]:w-36 '
                    type="text" 
                    placeholder='검색어를 입력하세요'
                    onChange={onSearch}
                    value={searchTerm}
                />
            </div>
        </div>
    )
}

export default SearchInput