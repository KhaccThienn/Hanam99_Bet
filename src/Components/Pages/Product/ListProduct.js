import React from 'react'
import { Link } from 'react-router-dom'

function ListProduct() {
    return (
        <div className='container-fluid p-5'>
            <Link to={'/product/add'} className='btn btn-primary rounded-0' >Add Product</Link>
            <table class="table table-bordered">
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

                </tbody>
            </table>
        </div>
    )
}

export default ListProduct