import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import './views.css';
import $ from 'jquery';

class Products extends Component{

    constructor(props){
        super(props);

        this.state = {
            data: []
        };

    }

    componentWillMount(){ 
       $.ajax({
            type : 'POST',
            url : '/php/allSelectHandler.php',
            cache: false,
            dataType: 'json',
            success : (data) => {

                this.setState({data: data});
            }
        }); 
    }
    
    render(){
        const allData = this.state.data;
        return(
            <div>
                <h2>Смартфоны</h2>
                <Table striped bordered condensed hover className="productsTable">
                    <thead>
                        <tr>
                            <th style={{width: 50}}>#</th>
                            <th style={{width: 150}}>Название</th>
                            <th style={{width: 400}}>Описание</th>
                            <th style={{width: 100}}>Цена</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allData.map((value, index) => {
                            return(
                                <tr key={index} data-id={value.id}>
                                    <td>{index + 1}</td>
                                    <td>{value.title}</td>
                                    <td>{value.description}</td>
                                    <td>{value.price}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Products;