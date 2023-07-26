import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as CategoryService from "../../../Services/CategoryService"
import * as ProductService from "../../../Services/ProductService"

function UpdateProduct() {
    const { id } = useParams();

    const [category, setCategory] = useState([]);
    const [postImage, setPostImage] = useState();
    const [apiData, setApiData] = useState({});
    const [postData, setPostData] = useState({
        productId: id,
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

    const getProductByID = async (id) => {
        const [result, error] = await ProductService.getProductByID(id);

        if (result) {
            setPostData(result);
            setApiData(result);
            console.log(result);
        }
        if (error) {
            console.log(error);
        }
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        postData.categoryId = Number(postData.categoryId);
        formData.append("productId", id);
        formData.append("productName", postData.productName ?? apiData.productName);
        formData.append("priceOld", Number(postData.priceOld) ?? Number(apiData.priceOld));
        formData.append("priceNew", Number(postData.priceNew) ?? Number(apiData.priceNew));
        formData.append("picture", postData.picture ?? apiData.picture);
        formData.append("description", postData.description ?? apiData.description);
        formData.append("categoryId", Number(postData.categoryId) ?? Number(apiData.categoryId));
        formData.append("active", (postData.active === "true" ? true : false) ?? apiData.active);


        console.log(postData);
        const [result, error] = await ProductService.updateProduct(id, formData);
        if (result) {
            console.log(result);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Update Success !",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/product');
        }
        if (error) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.response.data.msg ?? error.response.data.title ,
                showConfirmButton: false,
                timer: 1500
            });
            console.log(error);
        }
    };


    useEffect(() => {
        getAllCategories();
        getProductByID(id);
    }, [])

    return (

        <form onSubmit={handleSubmitForm} className='container p-5'>
            <div className="form-group">
                <label>Product Id</label>
                <input
                    type="text"
                    disabled={true}
                    className="form-control"
                    name="productId"
                    defaultValue={apiData.productId}
                    onChange={handleChangeInput}
                />
            </div>

            <div className="form-group">
                <label>Product Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="productName"
                    defaultValue={apiData.productName}
                    onChange={handleChangeInput}
                />
            </div>

            <div className="form-group">
                <label>Product Old Price</label>
                <input
                    type="text"
                    className="form-control"
                    name="priceOld"
                    defaultValue={apiData.priceOld}
                    onChange={handleChangeInput}
                />
            </div>

            <div className="form-group">
                <label>Product New Price</label>
                <input
                    type="text"
                    className="form-control"
                    name="priceNew"
                    defaultValue={apiData.priceNew}
                    onChange={handleChangeInput}
                />
            </div>

            <div className="form-group">
                <label>Product Picture</label>
                <input
                    type="text"
                    className="form-control"
                    name="picture"
                    defaultValue={apiData.picture}
                    onChange={handleChangeInput}
                />
            </div>
            <div className='w-25'>
                <p>Old Image: </p>
                <img src={apiData.picture} alt="" className='card-img' />
            </div>

            <div className="form-group">
                <label>Product Description</label>
                <textarea name="description" cols="30" className="form-control" defaultValue={apiData.description} onChange={handleChangeInput} rows="5">
                </textarea>
            </div>

            <div className="form-group">
                <label htmlFor="categoryId">Category</label>
                <select className="form-control" name="categoryId" onChange={handleChangeInput} id="categoryId">
                    <option>Choose One</option>
                    {category && category.map((e, i) => {
                        return (
                            <option value={e.categoryId} key={i} selected={e.categoryId === apiData.categoryId}>{e.categoryId} - {e.categoryName}</option>
                        )
                    })}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="active">Activate Status</label>
                <select

                    className="custom-select rounded-0"
                    onChange={handleChangeInput} name="active" id="active">
                    <option value="true" selected={apiData.active === "true" ? true : false}>Activating</option>
                    <option value="false" selected={apiData.active === "false" ? false : true}>Not Activating</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary rounded-0">Submit</button>
        </form>
    )
}

export default UpdateProduct