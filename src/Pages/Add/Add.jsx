import React, { useEffect, useState } from 'react'
import "./Add.css"
import axios from "axios"
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'



const Add = ({url}) => {

const[image,setImage] = useState(false); 
const[data,setData] = useState({
  name:"",
  description:"",
  price:"",
  category:"Salad",
})

const onChangeHandler = (event) =>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data =>({...data,[name]:value}) )
}

// For API CALL
// To prevent reloading page
const onsubmitHandler = async(event) =>{
    event.preventDefault();
    // formData will contain key/value pairs where the keys are the names of the form fields and the values are the corresponding values entered by the user. This formData object can then be used to send the form data to a server
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price)) // To covert string to number 
    formData.append("category",data.category)
    formData.append("image",image)


    // This is the endpoint where we upload the product and stored in the backend folder - UPLOAD
    const response = await axios.post(`${url}/api/food/add`,formData)

    // To check if it is sent - form should be reset
    if (response.data.success){
        setData({
          name:"",
          description:"",
          price:"",
          category:"Salad",
        })
        setImage(false)
        toast.success(response.data.message)
    }

   else{
      toast.error(response.data.message)
    }




}


useEffect(()=>{
    console.log(data)
},[data])
  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onChangeHandler}>
        
        <div className="add-image-upload  flex-col">
          <p >Upload Image</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt=""></img>
          </label>
          <input  onChange={(e)=>setImage(e.target.files[0])}type="file" id="image" hidden required></input>
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name}type="text" name="name" placeholder='Type here'></input>
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea  onChange={onChangeHandler} value={data.description} name="description" rows="6"  placeholder='Write content here' required></textarea>
        </div>

        <div className="add-category-price">

          <div className="add-category flex-col">
            <p>Product Category</p>
            <select   onChange={onChangeHandler}name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input  onChange={onChangeHandler} value={data.price}type="number" name="price" placeholder='$20'></input>
          </div>

          

        </div>
        <button type="submit" onClick={onsubmitHandler}className='add-btn'>ADD</button>
      
      </form>
    </div>
  )
}

export default Add
