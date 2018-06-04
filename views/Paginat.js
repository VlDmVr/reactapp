import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import './views.css';
import $ from 'jquery';
import { connect } from 'react-redux';

class Paginat extends Component{
    constructor(props){
        super(props);
    }

    selectPaginItem(e){
        //const currentItem = e.target.innerHTML;
        const index = e.target.getAttribute('index');
        const start = index*5;
        const end = (index*5) + 5;
        console.log(start);
        console.log(end);
    }

    createPagination(){

        const pagItems = Math.ceil(this.props.countRows.cntRows/5);
        let arr = [];
          
        for(let i=0; i<pagItems; i++){
            arr[i] = <Pagination.Item index={i} key={i} onClick={this.selectPaginItem.bind(this)}>{i+1}</Pagination.Item>;
        }
        return arr;
    }

    render(){
        return(
            <div>
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    {this.createPagination()}
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        );
    }
}

export default connect(
    state => ({
        countRows: state.countRows
      }
    ),
    dispatch => ({
        putCountRows: (count) => {
            dispatch({ type: 'COUNT_ROWS', payload: count });
        }
    })
  )(Paginat);