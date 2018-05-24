import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PopUp from './PopUp';
import './views.css';
import $ from 'jquery';
import { relative, isAbsolute } from 'path';
import { connect } from 'react-redux';
import selectProduct from '../reducers';


class Products extends Component{

    constructor(props){
        super(props);

        //selectProduct(this.srcData());
    }

    componentWillMount(){
        const initialState = {
            data: [
            {
                id: 16,
                title: 'Samsung',
                description: 'Samsung Aaaaa Bbbbb Ccccc',
                price: '10 000'
            },
            {
                id: 17,
                title: 'iPhone',
                description: 'iPhone Aaaaa Bbbbb Ccccc',
                price: '20 000'
            },
            {
                id: 18,
                title: 'Asus',
                description: 'Asus Aaaaa Bbbbb Ccccc',
                price: '5 000'
            },
          ],
          selectUserRow: ''
          };

          this.props.selectProduct(initialState);
        /*
       $.ajax({
            type : 'POST',
            url : '/php/allSelectHandler.php',
            cache: false,
            dataType: 'json',
            success : (data) => {

                this.setState({data: data});
            }
        });
        */ 
    }

    srcData() {
     return {   
                data: [
                {
                    id: 16,
                    title: 'Samsung',
                    description: 'Samsung Aaaaa Bbbbb Ccccc',
                    price: '10 000'
                },
                {
                    id: 17,
                    title: 'iPhone',
                    description: 'iPhone Aaaaa Bbbbb Ccccc',
                    price: '20 000'
                },
                {
                    id: 18,
                    title: 'Asus',
                    description: 'Asus Aaaaa Bbbbb Ccccc',
                    price: '5 000'
                },
            ],
            selectUserRow: ''
        };
}

    selectUserRow(id){
        if(id){
            const row = this.state.data.filter( value => {
                return value.id == id;
            });
            return row;
        }
    }

    selectItem(e){
        const selectId = e.target.parentNode.getAttribute('data-id');
        this.setState({selectUserRow: this.selectUserRow(selectId)});
    }
    
    render(){
        //const allData = this.state.data;
        console.log(this.props.selectProduct);
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

export default connect(
    state => ({
        selectProduct: state.selectProduct
      }
    ),
    dispatch => ({
      onAddTrack: (trackName) => {
        dispatch({ type: 'ADD_TRACK', payload: trackName});
      }
    })
  )(Products);