import React, { useState } from 'react'
import * as CategoryService from "../../../Services/CategoryService"
import * as ProductService from "../../../Services/ProductService"
import { useEffect } from 'react';
function AddProduct() {

  const initState = {
    productId: '',
    productName: '',
    priceOld: 0,
    priceNew: 1,
    picture: {},
    description: '',
    categoryId: '',
    active: "true",
  };

  const [category, setCategory] = useState([]);
  const [postImage, setPostImage] = useState();
  const [postData, setPostData] = useState(initState)

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleChangeFile = (e) => {
    setPostImage(e.target.files[0]);
  };

  const getAllCategories = async () => {
    const [result, error] = await CategoryService.getAllCategories();

    if (result) {
      setCategory(result);
      console.log(result);
    }
    if (error) {
      console.log(error);
    }
  };

  const handleSubmitForm = async () => {
    const formData = new FormData();

    formData.append("productId", postData.productId);
    formData.append("productName", postData.productName);
    formData.append("priceOld", postData.priceOld);
    formData.append("priceNew", postData.priceNew);
    formData.append("picture", postImage);
    formData.append("description", postData.description);
    formData.append("categoryId", postData.categoryId);
    formData.append("active", postData.active === "true" ? true : false);

    console.log(postImage);

    const [result, error] = await ProductService.createProduct(formData);
    if (result) {
      console.log(result);
    }
    if (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getAllCategories();
  }, [])

  return (
    <div className='container p-5'>
      <div className='form-group'>
        <label>Product Id</label>
        <input type='text' className='form-control rounded-0' onChange={(e) => handleChangeInput(e)} name='productId' />
      </div>

      <div className='form-group'>
        <label>Product Name</label>
        <input type='text' className='form-control rounded-0' onChange={(e) => handleChangeInput(e)} name='productName' />
      </div>

      <div className='form-group'>
        <label>Product Old Price</label>
        <input type='text' className='form-control rounded-0' onChange={(e) => handleChangeInput(e)} defaultValue={0} name='priceOld' />
      </div>

      <div className='form-group'>
        <label>Product New Price</label>
        <input type='text' className='form-control rounded-0' onChange={(e) => handleChangeInput(e)} name='priceNew' />
      </div>

      <div className='form-group'>
        <label>Product Picture</label>
        <input type='file' className='form-control rounded-0' name='picture' onChange={(e) => handleChangeFile(e)} />
      </div>
      <div className="w-25">
        {postImage && (
          <img
            className='card-img'
            alt={postImage.name}
            src={URL.createObjectURL(postImage)}
          />
        )}
      </div>

      <div className='form-group'>
        <label>Product Description</label>
        <textarea name='description' cols="30" className='form-control' onChange={(e) => handleChangeInput(e)} rows="5"></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="categoryId">Category</label>
        <select className="form-control" name="categoryId" onChange={handleChangeInput} id="categoryId">
          <option>Choose One</option>
          {
            category && category.map((e, i) => {
              return (
                <option value={e.categoryId} key={i}>{e.categoryId} - {e.categoryName}</option>
              )
            })
          }
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="active">Activate Status</label>
        <select
          // className={err.title ? "custom-select is-invalid  rounded-0" : "custom-select  rounded-0"}
          className="custom-select rounded-0"
          onChange={handleChangeInput} name="active" id="active">
          <option value="true">Activating</option>
          <option value="false">Not Activating</option>
        </select>
      </div>

      <button className='btn btn-primary rounded-0 ' onClick={() => handleSubmitForm()}>Submit</button>
    </div>
  )
}

export default AddProduct