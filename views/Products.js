import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import './views.css';

class Products extends Component{
    
    render(){
        return(
            <div>
                <h2>Products</h2>
                <Table striped bordered condensed hover className="productsTable">
                    <thead>
                        <tr>
                        <th style={{width: 50}}>#</th>
                        <th style={{width: 150}}>Title</th>
                        <th style={{width: 400}}>Description</th>
                        <th style={{width: 100}}>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Products;