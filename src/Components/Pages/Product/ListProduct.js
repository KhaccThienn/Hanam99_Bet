import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as CategoryService from "../../../Services/CategoryService";
import * as ProductService from "../../../Services/ProductService";
import Swal from 'sweetalert2';

function ListProduct() {
    const [listProd, setListProd] = useState([]);
    const [listCate, setListCate] = useState([]);
    const [reload, setReload] = useState(false);
    const fetchApiData = async () => {
        const [result, error] = await ProductService.getAllProducts();
        if (result) {
            setListProd(result);
            console.log(result);
        }
        if (error) {
            console.log(error);
        }
    }

    const getAllCategory = async () => {
        const [result, error] = await CategoryService.getAllCategories();
        if (result) {
            setListCate(result);
            console.log(result);
        }
        if (error) {
            console.log(error);
        }
    }

    const handleDeleteProduct = async (id) => {
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
            const [result, error] = await ProductService.deleteProduct(id);
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
                console.log(error);
            }
        }

    }

    useEffect(() => {
        getAllCategory();
        fetchApiData();
    }, [reload])

    return (
        <div className='container-fluid p-5'>
            <Link to={'/product/add'} className='btn btn-primary rounded-0' >Add Product</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price Old</th>
                        <th>Price New</th>
                        <th>Picture</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Active Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listProd && listProd.map((e, i) => {
                            return (
                                <tr key={i}>
                                    <td>{e.productId}</td>
                                    <td>{e.productName}</td>
                                    <td>{e.priceOld}</td>
                                    <td>{e.priceNew}</td>
                                    <td className='w-25'>
                                        <img src={e.picture} alt={e.productName} className='card-img' />

                                    </td>
                                    <td>{e.description}</td>
                                    <td>{
                                        listCate && listCate.map((v, id) => {
                                            if (v.categoryId === e.categoryId) {
                                                return v.categoryName;
                                            }
                                        })

                                    }</td>
                                    <td>{e.active ? "Activated" : "Unactived"}</td>
                                    <td>
                                        <Link to={`/product/edit/${e.productId}`} className='btn btn-success rounded-0'> Update </Link>
                                        <button className='btn btn-danger rounded-0'
                                            onClick={() => handleDeleteProduct(e.productId)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListProduct