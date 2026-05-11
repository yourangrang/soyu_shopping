import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../components/FileUpload';




const clothings = [
  {key:1, value: "자켓"},
  {key:2, value: "상의"},
  {key:3, value: "드레스"},
  {key:4, value: "팬츠"},
  {key:5, value: "스커트"},
  {key:6, value: "신발"},
]

const color = [
  {key:1, value: "블랙"},
  {key:2, value: "화이트"},
  {key:3, value: "브라운"},
  {key:4, value: "블루"},
  {key:5, value: "그린"},
  {key:6, value: "실버"},
]
const fit = [
  {key:1, value: "슬림핏"},
  {key:2, value: "레귤러핏"},
  {key:3, value: "루즈핏"},
  {key:4, value: "오버핏"},
  {key:5, value: "와이드핏"},
]
const gender = [
  {key:1, value: "남"},
  {key:2, value: "여"},
]
const style = [
  {key:1, value: "미니멀"},
  {key:2, value: "스트릿"},
  {key:3, value: "빈티지"},
  {key:4, value: "클래식"},
]



const UploadProductPage = () => {

  
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    // size: 1,
    clothings: 1,
    color: 1,
    fit:1,
    gender:1,
    style:1,
    images: []
  })
  
  const userData = useSelector(state => state.user?.userData);
  const navigate = useNavigate();
  
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct ((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleImages = (newImages) => {
      setProduct ((prevState) => ({
          ...prevState,
          images: newImages
      }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const body = {
            writer: userData.id,
            ...product
        }

        try {
            await axiosInstance.post('/products', body);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }



    return (
      <section>
        <div className='text-center m-7 '>
          <h1>상품 업로드</h1>
        </div>

        <form className='mt-6' onSubmit={handleSubmit}>

          <FileUpload images={product.images} onImageChange={handleImages} />


          <div className='m-4'>
            <label htmlFor='title'>이름</label>
            <input 
            className='w-full px-4 py-2 bg-white border rounded-md'
            name="title" id="title" onChange={handleChange} value={product.title}
            />
          </div>

          <div className='m-4'>
            <label htmlFor='description'>설명</label>
            <input 
            className='w-full px-4 py-2 bg-white border rounded-md'
            name="description" id="description" onChange={handleChange} value={product.description}
            />
          </div>

          <div className='m-4'>
            <label htmlFor='price'>가격</label>
            <input 
            className='w-full px-4 py-2 bg-white border rounded-md'
            type="number" name="price" id="price" onChange={handleChange} value={product.price}
            />
          </div>

          {/* <div className='m-4'>
            <label htmlFor='size'>사이즈</label>
            <select 
              className='w-full px-4 py-2 bg-white border rounded-md'
              name="size"  id="size" onChange={handleChange} value={product.size}
            >
              {size.map(item => (
                <option key={item.key} value={item.key}>{item.value}</option>
              ))}
            </select>
          </div> */}

          <div className='m-4'>
            <label htmlFor='color'>색상</label>
            <select 
              className='w-full px-4 py-2 bg-white border rounded-md'
              name="color"  id="color" onChange={handleChange} value={product.color}
            >
              {color.map(item => (
                <option key={item.key} value={item.key}>{item.value}</option>
              ))}
            </select>
          </div>

          <div className='m-4'>
            <label htmlFor='fit'>핏</label>
            <select 
              className='w-full px-4 py-2 bg-white border rounded-md'
              name="fit"  id="fit" onChange={handleChange} value={product.fit}
            >
              {fit.map(item => (
                <option key={item.key} value={item.key}>{item.value}</option>
              ))}
            </select>
          </div>

          <div className='m-4'>
            <label htmlFor='gender'>성별</label>
            <select 
              className='w-full px-4 py-2 bg-white border rounded-md'
              name="gender"  id="gender" onChange={handleChange} value={product.gender}
            >
              {gender.map(item => (
                <option key={item.key} value={item.key}>{item.value}</option>
              ))}
            </select>
          </div>

          <div className='m-4'>
            <label htmlFor='clothings'>종류</label>
            <select 
              className='w-full px-4 py-2 bg-white border rounded-md'
              name="clothings"  id="clothings" onChange={handleChange} value={product.clothings}
            >
              {clothings.map(item => (
                <option key={item.key} value={item.key}>{item.value}</option>
              ))}
            </select>
          </div>

          <div className='m-4'>
            <label htmlFor='style'>스타일</label>
            <select 
              className='w-full px-4 py-2 bg-white border rounded-md'
              name="style"  id="style" onChange={handleChange} value={product.style}
            >
              {style.map(item => (
                <option key={item.key} value={item.key}>{item.value}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
              <button
              type='submit'
              className='w-full px-4 py-2 text-white bg-black rounded-md hover:bg-gray-700'>
                  업로드하기
              </button>
          </div>

        </form>
      </section>
    )
}

export default UploadProductPage