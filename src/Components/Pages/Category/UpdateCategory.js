import React from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as CategoryService from "../../../Services/CategoryService"
import Swal from 'sweetalert2';
import { useEffect } from 'react';

function UpdateCategory() {
    const { id } = useParams();
    const [postData, setPostData] = useState({
        categoryId: id,
        categoryName: '',
        active: true
    });
    const [apiData, setApiData] = useState({});
    const [err, setErr] = useState({});

    const navigate = useNavigate();


    const fetchingAPIData = async (id) => {
        const [data, err] = await CategoryService.getCategoryByID(id);
        if (data) {
            setApiData(data);
            setPostData({
                categoryId: data.categoryId,
                categoryName: data.categoryName
            })
            console.log(data);
        }
        if (err) {
            console.log(err);
        }
    }

    const handleChangeInput = async (e) => {
        setErr({});
        const { name, value } = await e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    }

    const handleSubmitForm = async () => {
        postData.active = postData.active == "true" ? true : false;
        console.log(postData);
        const [result, error] = await CategoryService.updateCategory(id, postData);
        if (result) {
            console.log(result);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Update Success !",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/category');
        }
        if (error) {
            console.log(error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.response.data.title,
                showConfirmButton: false,
                timer: 1500
            });
            setErr(error.response.data);
        }
    }

    useEffect(() => {
        fetchingAPIData(id)
    }, [id]);

    return (
        <div className='container p-5'>
            {err && <p className='text-danger'>{err.title}</p>}
            <div className='form-group'>
                <label>Category Name: </label>
                <input className={err.title ? "form-control is-invalid  rounded-0" : "form-control  rounded-0"} defaultValue={apiData.categoryName} onChange={(e) => handleChangeInput(e)} name='categoryName' placeholder='Category Name...' />
            </div>
            <div className="form-group">
                <label htmlFor="active">Activate Status</label>
                <select defaultValue={apiData.active} className={err.title ? "custom-select is-invalid  rounded-0" : "custom-select  rounded-0"} onChange={handleChangeInput} name="active" id="active">
                    <option value={true} selected={apiData.active ? true : false}>Activating</option>
                    <option value={false} selected={!apiData.active ? true : false}>Not Activating</option>
                </select>
            </div>
            <button type='button' onClick={() => { handleSubmitForm() }} className='btn btn-primary rounded-0'>Submit</button>
        </div>
    )
}

export default UpdateCategory