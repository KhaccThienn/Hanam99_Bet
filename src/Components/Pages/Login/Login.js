import React, { useState } from 'react'
import * as AccountService from "../../../Services/AccountService";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../Redux/Reducer/user';
import { useCookies } from 'react-cookie';

function Login() {

    const [postData, setPostData] = useState({});
    const [err, setErr] = useState({});

    const [cookies, setCookie, removeCookie] = useCookies(["access_token", "refresh_token"]);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleChangeInput = async (e) => {
        setErr({});
        const { name, value } = await e.target;
        setPostData({
            ...postData,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        const [result, error] = await AccountService.login(postData);

        if (result) {

            console.log(result);

            // localStorage.setItem('user_data', JSON.stringify(result));

            setCookie("access_token", result.accesstoken);
            setCookie("refresh_token", result.refreshtoken);

            dispatch(setUser(result));

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: "Login Success !",
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
                title: error.response,
                showConfirmButton: false,
                timer: 1500
            });

            setErr(error.response);
        }
    }

    return (
        <div className='container'>
            <form>
                {err && <p className='text-danger'>{err?.msg}</p>}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text"
                        onChange={e => handleChangeInput(e)}
                        className={err?.msg ? "form-control is-invalid" : "form-control"}
                        id="username" name='username' />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        onChange={e => handleChangeInput(e)}
                        className={err?.msg ? "form-control is-invalid" : "form-control"}
                        name='password' id="password" />
                </div>
                <button type="button" onClick={() => handleSubmit()} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login