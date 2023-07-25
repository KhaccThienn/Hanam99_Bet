import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { selectUserData } from './../../../Redux/Reducer/user';
import * as AccountService from "../../../Services/AccountService";
import Swal from 'sweetalert2';
import { useCookies } from 'react-cookie';

function Header() {

    const [userData, setUserData] = useState({});
    const [cookies, setCookie, removeCookie] = useCookies(["access_token", "refresh_token"]);
    const [reload, setReload] = useState(false);
    const userDatas = useSelector(selectUserData);
    const navigate = useNavigate();

    const getLocalStorage = () => {
        const res = localStorage.key(0) ? JSON.parse(localStorage.getItem('user_data')) : null;
        return res;
    }

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You are logging out now ! Be Patient !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        });
        if (result.isConfirmed) {
            const [data, err] = await AccountService.logout();
            if (data) {
                console.log(data);
                removeCookie('access_token');
                removeCookie('refresh_token');
                localStorage.removeItem("user_data");
                localStorage.removeItem("access_token");
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "LogOut Success !",
                    showConfirmButton: false,
                    timer: 1500
                });
                setReload(!reload);
                navigate('/');
            }
            if (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        const res = getLocalStorage();
        setUserData(res);
    }, [userDatas.user, reload]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to={"/"}>Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                        <li className="nav-item active">
                            <Link className="nav-link" to={"/"}>Home <span className="sr-only">(current)</span></Link>
                        </li>

                        {
                            (!userData || !userDatas.user)
                            &&
                            <li className="nav-item">
                                <Link className="nav-link" to={"/login"}>Login</Link>
                            </li>
                        }
                        {
                            (userData?.accountId && userDatas.user?.accountId)
                            &&

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                    Account
                                </Link>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to={"/account"}>Change Password</Link>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item" onClick={() => handleLogout()}>Log Out</button>
                                </div>
                            </li>
                        }


                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Header