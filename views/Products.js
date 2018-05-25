import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PopUp from './PopUp';
import './views.css';
import $ from 'jquery';
import { relative, isAbsolute } from 'path';
import { connect } from 'react-redux';


class Products extends Component{

    constructor(props){
        super(props);

        /*this.state = {
            data: []
        };*/

        //selectProduct(this.srcData());
        
        
    }

    componentWillMount(){
        
        this.props.loadAllData(this.srcData());
        
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
     return  [
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
            ];
    }

    selectUserRow(id){
        if(id){
            const row = this.props.preloadAllData.data.filter( value => {
                return value.id == id;
            });
            return row;
        }
    }

    selectItem(e){
        const selectId = e.target.parentNode.getAttribute('data-id');
        const resaltRow = this.selectUserRow(selectId);
        this.props.selectRow(resaltRow);
    }

    loadContentFromDb(){
        if(this.props.preloadAllData.data){
            const allData = this.props.preloadAllData.data.map((value, index) => {
                return( <tr key={index} data-id={value.id}>
                            <td>{index + 1}</td>
                            <td>{value.title}</td>
                            <td>{value.description}</td>
                            <td>{value.price}</td>
                        </tr> );
            });
            return allData;
        }
    }
    
    render(){
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
                        {this.loadContentFromDb()}
                    </tbody>
                </Table>
                
            </div>
        );
    }
}

export default connect(
    state => ({
        preloadAllData: state.preloadAllData,
        selectId: state.selectId
      }
    ),
    dispatch => ({
      loadAllData: (allDbData) => {
        dispatch({ type: 'PRELOAD_ALL_DATA', payload: allDbData });
      },
      selectRow: (row) => {
          dispatch({ type: 'SELECT_ID', payload: row });
      }  
    })
  )(Products);