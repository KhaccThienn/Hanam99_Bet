import React from 'react'
import { useState } from 'react'
import * as CategoryService from "../../../Services/CategoryService";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function ListCategory() {

    const [listCategory, setListCategory] = useState([]);
    const [reload, setReload] = useState(false);
    const fetchingDataAPI = async () => {
        const [result, error] = await CategoryService.getAllCategories();
        if (result) {
            console.log(result);
            setListCategory(result);
        }
        if (error) {
            console.log(error);
        }
    }
    const handleDeleteCategory = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You are deleting an item ! Be Patient !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        });
        if (confirm.isConfirmed) {
            const [result, error] = await CategoryService.deleteCategory(id);
            if (result) {
                console.log(result);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Delete Success !",
                    showConfirmButton: false,
                    timer: 1500
                });
                setReload(!reload);
            }
            if (error) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: error.response.data.msg ?? error.response.data.title,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

    }

    useEffect(() => {
        fetchingDataAPI();
    }, [reload]);

    return (
        <div className='container p-5'>
            <Link to={'/category/create'} className='btn btn-primary rounded-0'>Create One</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Active Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listCategory.length > 0 ?
                            listCategory.map((e, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{e.categoryId}</td>
                                        <td>{e.categoryName}</td>
                                        <td>{e.active ? "Activating" : "UnActivating"}</td>
                                        <td className='w-25'>
                                            <Link to={`/category/edit/${e.categoryId}`} className='btn btn-success rounded-0'> Update </Link>
                                            <button className='btn btn-danger rounded-0' onClick={() => handleDeleteCategory(e.categoryId)}> Delete </button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <th colSpan={3} className='text-center'>Nothing to show</th>
                            </tr>
                    }


                </tbody>
            </table>
        </div>
    )
}

export default ListCategory