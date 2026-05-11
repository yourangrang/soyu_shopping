import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavItem from './Sections/NavItem';


const NavBar = () => {
    const [ menu, setMenu ] = useState(false);

    const handleMenu = () => {
        setMenu(!menu);
    }

    return (
        <nav className='w-full fixed  z-10 text-lg  p-3 bg-white/70 backdrop-blur-md shadow-md ' >
            <div className='w-full'>
                <div className=' flex items-center justify-between mx-auto  px-6 max-[420px]:px-2 max-sm:px-2 max-md:w-full lg:w-9/12 lg:px-0'>
                    {/* logo */}
                    <div className='flex items-center text-2xl h-14 font-black bg-gray-200 w-30 '>
                        <Link to='/'>
                            <img className='w-14 h-14' src="/Logo2.png" alt="logo" />
                        </Link>  
                    </div>
                    {/* menu button */}
                    <div className='text-5xl sm:hidden h-14'>
                        <button onClick={handleMenu} >{menu ? "-" : "+" }</button>
                    </div>
                    {/* big screen nav-itmes */}
                    <div className='hidden sm:block '>
                        <NavItem />
                    </div>
                </div>
                
                {/* small screen nav-itmes */}
                <div className='block sm:hidden'>
                    {menu && <NavItem mobile/>}
                </div>

            </div>
        </nav>
    )
}

export default NavBar