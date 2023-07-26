import React, { useState } from 'react'
import * as CategoryService from "../../../Services/CategoryService"
import * as ProductService from "../../../Services/ProductService"
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
function AddProduct() {


  const [category, setCategory] = useState([]);
  const [postImage, setPostImage] = useState();
  const [postData, setPostData] = useState({
    productId: '',
    productName: '',
    priceOld: 0,
    priceNew: 0,
    picture: '',
    description: '',
    categoryId: 16,
    active: true
  });

  const navigate = useNavigate();

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

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    postData.categoryId = Number(postData.categoryId);
    formData.append("productId", postData.productId ?? "");
    formData.append("productName", postData.productName ?? "");
    formData.append("priceOld", Number(postData.priceOld) ?? 0);
    formData.append("priceNew", Number(postData.priceNew) ?? 0);
    formData.append("picture", postData.picture ?? "");
    formData.append("description", postData.description ?? "");
    formData.append("categoryId", Number(postData.categoryId) ?? -1);
    formData.append("active", postData.active === "true" ? true : false);


    const [result, error] = await ProductService.createProduct(formData);
    if (result) {
      console.log(result);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "Add Success !",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/product');
    }
    if (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error.response.data.msg ?? error.response.data.title,
        showConfirmButton: false,
        timer: 1500
      });
      console.log(error);
    }
  };


  useEffect(() => {
    getAllCategories();
  }, [])

  return (

    <form onSubmit={handleSubmitForm} className='container p-5'>
      <div className="form-group">
        <label>Product Id</label>
        <input type="text" className="form-control" name="productId" onChange={handleChangeInput} />
      </div>

      <div className="form-group">
        <label>Product Name</label>
        <input type="text" className="form-control" name="productName" onChange={handleChangeInput} />
      </div>

      <div className="form-group">
        <label>Product Old Price</label>
        <input type="text" className="form-control" name="priceOld" onChange={handleChangeInput} defaultValue={0} />
      </div>

      <div className="form-group">
        <label>Product New Price</label>
        <input type="text" className="form-control" name="priceNew" onChange={handleChangeInput} />
      </div>

      <div className="form-group">
        <label>Product Picture</label>
        <input type="text" className="form-control" name="picture" onChange={handleChangeInput} />
      </div>

      <div className="form-group">
        <label>Product Description</label>
        <textarea name="description" cols="30" className="form-control" onChange={handleChangeInput} rows="5"></textarea>
      </div>

      <div className="form-group">
        <label htmlFor="categoryId">Category</label>
        <select className="form-control" name="categoryId" onChange={handleChangeInput} id="categoryId">
          <option>Choose One</option>
          {category && category.map((e, i) => {
            return (
              <option value={e.categoryId} key={i}>{e.categoryId} - {e.categoryName}</option>
            )
          })}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="active">Activate Status</label>
        <select
          // className={err.title ? "custom-select is-invalid  rounded-0" : "custom-select  rounded-0"}
          className="custom-select rounded-0"
          onChange={handleChangeInput} defaultValue={"true"} name="active" id="active">
          <option value="true">Activating</option>
          <option value="false">Not Activating</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary rounded-0">Submit</button>
    </form>
  )
}

export default AddProduct