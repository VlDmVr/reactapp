import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PopUp from './PopUp';
import './views.css';
import $ from 'jquery';
import { relative, isAbsolute } from 'path';

class Products extends Component{

    constructor(props){
        super(props);

        this.state = {
            data: []
        };

    }

    /*componentWillMount(){ 
       $.ajax({
            type : 'POST',
            url : '/php/allSelectHandler.php',
            cache: false,
            dataType: 'json',
            success : (data) => {

                this.setState({data: data});
            }
        }); 
    }*/

    selectItem(e){
        console.log(e.target.parentNode.getAttribute('data-id'));
    }
    
    render(){
        const allData = this.state.data;
        return(
            <div>
                <PopUp />
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
                    <tbody onClick={this.selectItem.bind(this)}>
                        {
                         
                            <tr data-id="16">
                                <td>1</td>
                                <td>Samsung</td>
                                <td>Samsung Aaaaa Bbbbb Ccccc</td>
                                <td>10 000</td>
                            </tr>
                        }
                        {
                            <tr data-id="17">
                                <td>2</td>
                                <td>iPhone</td>
                                <td>iPhone Aaaaa Bbbbb Ccccc</td>
                                <td>20 000</td>
                            </tr>
                        }
                        {
                            <tr data-id="18">
                                <td>3</td>
                                <td>Asus</td>
                                <td>Asus Aaaaa Bbbbb Ccccc</td>
                                <td>5 000</td>
                            </tr>
                        }
                        {/*allData.map((value, index) => {
                            return(
                                <tr key={index} data-id={value.id}>
                                    <td>{index + 1}</td>
                                    <td>{value.title}</td>
                                    <td>{value.description}</td>
                                    <td>{value.price}</td>
                                </tr>)
                        })*/}
                    </tbody>
                </Table>
                
            </div>
        );
    }
}

export default Products;