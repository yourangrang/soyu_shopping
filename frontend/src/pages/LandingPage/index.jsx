import React, { useEffect, useState } from 'react'
import axiosInstance from './../../utils/axios';
import { clothings, prices, color, fit, gender, style } from './../../utils/filterData'
import SearchInput from './../LandingPage/Sections/SearchInput';
import CardItem from './../LandingPage/Sections/CardItem';
import CheckBox from './../LandingPage/Sections/CheckBox';
import RadioBox from './../LandingPage/Sections/RadioBox';
import ColorCheckBox from './../LandingPage/Sections/ColorCheckBox';
import FitCheckBox from './../LandingPage/Sections/FitCheckBox';
import GenderCheckBox from './../LandingPage/Sections/GenderCheckBox';
import StyleCheckBox from './../LandingPage/Sections/StyleCheckBox';

const LandingPage = () => {

    const [open, setOpen] = useState(false);

    
    const limit = 8
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [filters, setFilters] = useState({
    clothings: [], 
    price: [],
    color: [],
    fit: [],
    gender: [],
    style: [],

})


    useEffect(() => {
        fetchProducts({ skip, limit });
    }, [])

    const fetchProducts = async ({ skip, limit, loadMore = false, filters = {}, searchTerm = "" }) =>{
        const params = {
            skip,
            limit,
            filters,
            searchTerm
        }
        try {
            const response = await axiosInstance.get('/products', { params })
            

            if(loadMore) {
                setProducts([...products, ...response.data.products])
            } else {
                setProducts(response.data.products);
            }
            setHasMore(response.data.hasMore);
        } catch (error) {
            console,error(error);
        }
    }

    

    const handleLoadMore = () => {
        const body = {
            skip: skip + limit,
            limit,
            loadMore: true,
            filters,
            searchTerm
        }
        fetchProducts(body);
        setSkip(skip + limit)
    }

    const handleFilters = (newFilteredData, category) => {
        const newFilters = { ...filters };
        newFilters[category] = newFilteredData;
        if(category === 'price') {
            const priceValues = handlePrice(newFilteredData);
            newFilters[category] = priceValues
        }
        if( newFilteredData.length === 0 ) {
            const newFilters = { ...filters };
            newFilters[category] = [];
        }
        

        showFilteredResults(newFilters);
        setFilters(newFilters);
    } 

    const handlePrice = (value) => {
        let array = [];

        for (let key in prices) {
            if (prices[key]._id === parseInt(value, 10)) {
                array = prices[key].array
            }
        }
        return array;
    }

   
    

    const showFilteredResults = (filters) => {
        const body = {
            skip: 0,
            limit,
            filters,
            searchTerm
        }

        fetchProducts(body);
        setSkip(0);
    }

    const handleSearchTerm = (event) => {
        const body = {
            skip: 0,
            limit,
            filters,
            searchTerm: event.target.value
        }
        setSkip(0);
        setSearchTerm(event.target.value);
        fetchProducts(body);
    }

    return (
        <section>
            <div className='flex flex-col my-10  '>
                <div className=' md:w-2/3 mx-auto mb-10' >
                    <CheckBox clothings={clothings}
                            checkedclothings={filters.clothings} 
                            onFilters={filters => handleFilters(filters, "clothings")}
                    />
                </div>
                {/* 상세필터 */}
                <div className='flex gap-1 text-sm '>
                        <div className='flex items-center '>
                            <svg width="26" height="26" viewBox="0 0 24 24" focusable="false" class="fr-ec-icon fr-ec-icon--default fr-ec-button-icon__icon" role="presentation">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.47 8.6C6.741 9.746 7.773 10.6 9 10.6C10.227 10.6 11.259 9.746 11.53 8.6H21V7.401H11.53C11.259 6.255 10.227 5.401 9 5.401C7.773 5.401 6.741 6.255 6.47 7.401H3V8.6H6.47ZM7.6 8C7.6 7.229 8.228 6.6 9 6.6C9.772 6.6 10.4 7.229 10.4 8C10.4 8.771 9.772 9.4 9 9.4C8.228 9.4 7.6 8.771 7.6 8ZM12.47 16.6C12.741 17.746 13.773 18.6 15 18.6C16.227 18.6 17.259 17.746 17.53 16.6H21V15.401H17.53C17.259 14.255 16.227 13.401 15 13.401C13.773 13.401 12.741 14.255 12.47 15.401H3V16.6H12.47ZM13.6 16C13.6 15.229 14.228 14.6 15 14.6C15.772 14.6 16.4 15.229 16.4 16C16.4 16.771 15.772 17.4 15 17.4C14.228 17.4 13.6 16.771 13.6 16Z"></path>
                            </svg>
                        </div>
                        
                        <div className=' md:w-1/2 ml-2 flex max-sm:flex-wrap gap-2 max-[400px]:text-[9px]  max-sm:gap-[2px] '>
                            {/* 성별 */}
                            <div>
                                <button 
                                    onClick={() => setOpen(prev => prev === "gender" ? "" : "gender")}
                                    className={`flex border-2 rounded-full p-1 max-sm:rounded-3xl hover:border-black max-sm:p-0  ${open === "gender" ? 'font-bold border-black': ''}`} 
                                >
                                    <h2 className='ml-2 my-auto sm:w-12 '>구분</h2>
                                    <div className={`${open === "gender" ? 'rotate-180': ''}`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="fr-ec-icon fr-ec-icon--default fr-ec-filter-pill--icon" role="presentation">
                                            <path d="M12 15.3319L6.59399 11.0079L7.40599 9.99194L12 13.6679L16.594 9.99194L17.406 11.0079L12 15.3319Z"></path>
                                        </svg>
                                    </div>
                                </button>
                                {open === "gender" &&
                                <GenderCheckBox
                                    gender={gender}                 
                                    checkedGender={filters.gender}   
                                    onFilters={filters => handleFilters(filters, "gender")}
                                />
                                }
                            </div>

                            {/* 가격 */}
                            <div>
                                <div className='flex gap-1 max-w-[100px]'>
                                    <button 
                                        onClick={() => setOpen(prev => prev === "price" ? "" : "price")}
                                         className={`flex border-2 rounded-full p-1 hover:border-black max-sm:p-0 ${open === "price" ? 'font-bold border-black': ''}`} 
                                    >
                                    <h2 className=' ml-2  my-auto sm:w-12'>가격대</h2>
                                        <div className={`${open === "price" ? 'rotate-180': ''}`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="fr-ec-icon fr-ec-icon--default fr-ec-filter-pill--icon" role="presentation">
                                                <path d="M12 15.3319L6.59399 11.0079L7.40599 9.99194L12 13.6679L16.594 9.99194L17.406 11.0079L12 15.3319Z"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                                 {open === "price" &&
                                <RadioBox prices={prices}
                                        checkedPrice={filters.price}
                                        onFilters={filters => handleFilters(filters, "price")}
                                        
                                />
                                }
                            </div>
                            {/* 컬러 */}
                            <div >
                                <button 
                                    onClick={() => setOpen(prev => prev === "color" ? "" : "color")}
                                    className={`flex border-2 rounded-full p-1 hover:border-black max-sm:p-0 ${open === "color" ? 'font-bold border-black': ''}`} 
                                >
                                    <h2 className=' ml-2  my-auto sm:w-12'>색상</h2>
                                        <div className={`${open === "color" ? 'rotate-180': ''}`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="fr-ec-icon fr-ec-icon--default fr-ec-filter-pill--icon" role="presentation">
                                                <path d="M12 15.3319L6.59399 11.0079L7.40599 9.99194L12 13.6679L16.594 9.99194L17.406 11.0079L12 15.3319Z"></path>
                                            </svg>
                                        </div>
                                    </button>
                                {open === "color" &&
                                <ColorCheckBox
                                    color={color}                 // filterData.js에서 가져오기
                                    checkedColor={filters.color}   // LandingPage의 filters.color 상태
                                    onFilters={filters => handleFilters(filters, "color")}
                                />
                                }
                            </div>
                            {/* 핏 */}
                            <div >
                                <button 
                                    onClick={() => setOpen(prev => prev === "fit" ? "" : "fit")}
                                    className={`flex border-2 rounded-full p-1 hover:border-black max-sm:p-0 ${open === "fit" ? 'font-bold border-black': ''}`} 
                                >
                                    <h2 className=' ml-2  my-auto sm:w-12'>핏</h2>
                                        <div className={`${open === "fit" ? 'rotate-180': ''}`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="fr-ec-icon fr-ec-icon--default fr-ec-filter-pill--icon" role="presentation">
                                                <path d="M12 15.3319L6.59399 11.0079L7.40599 9.99194L12 13.6679L16.594 9.99194L17.406 11.0079L12 15.3319Z"></path>
                                            </svg>
                                        </div>
                                    </button>
                                {open === "fit" &&
                                <FitCheckBox
                                    fit={fit}                 
                                    checkedFit={filters.fit}   
                                    onFilters={filters => handleFilters(filters, "fit")}
                                />
                                }
                            </div>
                            {/* 스타일 */}
                            <div >
                                <button 
                                    onClick={() => setOpen(prev => prev === "style" ? "" : "style")}
                                    className={`flex border-2 rounded-full p-1 hover:border-black max-sm:p-0 ${open === "style" ? 'font-bold border-black': ''}`} 
                                >
                                    <h2 className=' ml-2 my-auto sm:w-12 '>스타일</h2>
                                        <div className={`${open === "style" ? 'rotate-180': ''}`}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" class="fr-ec-icon fr-ec-icon--default fr-ec-filter-pill--icon" role="presentation">
                                                <path d="M12 15.3319L6.59399 11.0079L7.40599 9.99194L12 13.6679L16.594 9.99194L17.406 11.0079L12 15.3319Z"></path>
                                            </svg>
                                        </div>
                                    </button>
                                {open === "style" &&
                                <StyleCheckBox
                                    style={style}                 
                                    checkedStyle={filters.style}   
                                    onFilters={filters => handleFilters(filters, "style")}
                                />
                                }
                            </div>

                        </div>
                </div>
            </div>
{/* max-sm:ml-[20%] max-md:ml-[17%] md:ml-[30%] */}
            {/* 서치 */ }
            <div className='fixed z-10 top-5 ml-[30%] max-[820px]:ml-[20%] max-[730px]:ml-[15%]  max-[639px]:ml-[25%]  max-[440px]:ml-[22%]   '>
                <SearchInput searchTerm={searchTerm}
                             onSearch={handleSearchTerm}            
                />
            </div>
            {/* 필터 */}
            {/* 카드 */}
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-1'>
                {products.map(product => 
                    <CardItem product={product} key={product._id} />
                )}
            </div>
            {/* 더보기 */}
            {hasMore && 
                <div className='flex justify-center mt-5'>
                    <button
                     onClick={handleLoadMore}
                     className='px-4 py-2 mb-5 text-white bg-black rounded-md hover:bg-gray-500'>
                        더 보기
                    </button>
                </div>
            }

        </section>
    )
}

export default LandingPage