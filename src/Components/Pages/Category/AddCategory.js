import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as CategoryService from "../../../Services/CategoryService"
import Swal from 'sweetalert2';

function AddCategory() {
    const [postData, setPostData] = useState({
        categoryName: '',
        active: "true"
    });
    const [err, setErr] = useState({});

    const navigate = useNavigate();


    const handleChangeInput = async (e) => {
        setErr({});
        const { name, value } = await e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    }

    const handleSubmitForm = async () => {
        postData.active = postData.active === "true" ? true : false;

        console.log(postData);
        const [result, error] = await CategoryService.createCategory(postData);
        if (result) {
            console.log(result);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Add Success !",
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

    return (
        <div className='container p-5'>
            {err && <p className='text-danger'>{err.title}</p>}
            <div className='form-group'>
                <label>Category Name: </label>
                <input className={err.title ? "form-control is-invalid  rounded-0" : "form-control  rounded-0"} onChange={(e) => handleChangeInput(e)} name='categoryName' placeholder='Category Name...' />
            </div>
            <div className="form-group">
                <label htmlFor="active">Activate Status</label>
                <select className={err.title ? "custom-select is-invalid  rounded-0" : "custom-select  rounded-0"} onChange={handleChangeInput} name="active" id="active">
                    <option value="true">Activating</option>
                    <option value="false">Not Activating</option>
                </select>
            </div>
            <button type='button' onClick={() => { handleSubmitForm() }} className='btn btn-primary rounded-0'>Submit</button>
        </div>
    )
}

export default AddCategory