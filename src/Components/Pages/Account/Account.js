import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUserData } from '../../../Redux/Reducer/user';
import * as AccountService from "../../../Services/AccountService";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Account() {
    const [userData, setUserData] = useState({});
    const [postData, setPostData] = useState({});
    const [err, setErr] = useState({});

    const navigate = useNavigate();

    const userDatas = useSelector(selectUserData);

    const getLocalStorage = () => {
        const res = localStorage.key(0) ? JSON.parse(localStorage.getItem('user_data')) : null;
        return res;
    }

    const handleChangeInput = async (e) => {
        setErr({});
        const { name, value } = await e.target;
        setPostData({
            ...postData,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        postData.accountId = userDatas.user.accountId;
        console.log(postData);
        const [result, error] = await AccountService.changePassword(postData);
        if (result) {
            console.log(result);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Change Password Success !",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        }
        if (error) {
            console.log(error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: error.response.data.msg,
                showConfirmButton: false,
                timer: 1500
            });

            setErr(error.response.data);
        }
    }

    useEffect(() => {
        const res = getLocalStorage();
        setUserData(res);
    }, [userDatas.user]);

    return (
        <div className='container'>
            <div className='form-group'>
                <label>Old Password</label>
                <input type='text' onChange={e => handleChangeInput(e)} className='form-control' name='oldPassword' />
            </div>
            <div className='form-group'>
                <label>New Password</label>
                <input type='text' onChange={e => handleChangeInput(e)} className='form-control' name='newPassword' />
            </div>
            <button type='button' onClick={() => handleSubmit()} className='btn btn-block btn-primary' >Change Password</button>
        </div>
    )
}

export default Account