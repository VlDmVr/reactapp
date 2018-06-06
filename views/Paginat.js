import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';
import './views.css';
import $ from 'jquery';
import { connect } from 'react-redux';

class Paginat extends Component{
    constructor(props){
        super(props);
    }
    //выборка товаров из БД по определенным критериям и сохранение их в стейт
    selectPaginItem(e, param=null){
        e.stopPropagation();
        let index = "";
        if(param){
            index = param;
        }else{
            index = e.target.getAttribute('index');
        }
        const limit = 5;
        const offset = index * limit;

        //сохранение параметров limit и offset для текущей выборки
        this.props.putParamsSelected({ limit: limit, offset: offset });
        //запрос к БД с выборкой определеннного диапазона товаров
        $.ajax({
            type : 'POST',
            url : '/php/allSelectHandler.php',
            data: { 'limit': limit, 'offset': offset },
            cache: false,
            dataType: 'json',
            success : (data) => {

                //клонирование массива объектов dataCopy для восстановления данных, при нажатии кнопки "Отменить"
                const copyClone =  data.map( (val, ind) => {
                    var intersect = {};
                    for(var key in val){
                        intersect[key] = val[key];
                    }
                    return intersect;
                });

                this.props.loadAllData(data);
                this.props.cAllData(copyClone);
            }
        });
    }
    //создание нумерованных кнопок пагинации
    createPagination(){
        //механизм сделать кнопку активной
        const selectParam = this.props.paramsSelectedGoodsList.params.offset/this.props.paramsSelectedGoodsList.params.limit;
        
        const pagItems = Math.ceil(this.props.countRows.cntRows/5);
        let arr = [];
          
        for(let i=0; i<pagItems; i++){
            arr[i] = <Pagination.Item index={i} key={i} active={selectParam === i} onClick={this.selectPaginItem.bind(this)}>{i+1}</Pagination.Item>;
        }
        return arr;
    }
    //создание не нумерованных кнопок навигации
    catchClick(e){
        //индекс элемента по которому произошел click
        const index = this.props.paramsSelectedGoodsList.params.offset/this.props.paramsSelectedGoodsList.params.limit;
        //число кнопок
        const pagItems = Math.ceil(this.props.countRows.cntRows/5);
        //кнопка First
        if(e.target.parentNode.getAttribute('data-item') == "paginationFirst"){
            this.selectPaginItem(e, 0);
        }
        //кнопка Last
        if(e.target.parentNode.getAttribute('data-item') == "paginationLast"){
            this.selectPaginItem(e, this.createPagination().length - 1);
        }
        //кнопка Prev
        if(e.target.parentNode.getAttribute('data-item') == "paginationPrev"){
            if(this.props.paramsSelectedGoodsList.params.offset == 0){
                return;
            }
            this.selectPaginItem(e, index-1);
        }
        //кнопка Next
        if(e.target.parentNode.getAttribute('data-item') == "paginationNext"){
            if(pagItems == (index+1)){
                return;
            }
            this.selectPaginItem(e, index+1);
        }
    }

    renderAllPaginationItems(){
        if(this.props.countRows.cntRows){
            return(
                    <Pagination onClick={this.catchClick.bind(this)}>
                        <Pagination.First data-item="paginationFirst" />
                        <Pagination.Prev data-item="paginationPrev" />
                        {this.createPagination()}
                        <Pagination.Next data-item="paginationNext" />
                        <Pagination.Last data-item="paginationLast" />
                    </Pagination> 
                );
        }
    }

    render(){
        return(
            <div>
                {this.renderAllPaginationItems()}
            </div>
        );
    }
}

export default connect(
    state => ({
        preloadAllData: state.preloadAllData,
        selectId: state.selectId,
        copyData: state.copyAllData,
        countRows: state.countRows,
        paramsSelectedGoodsList: state.paramsSelectedGoodsList
      }
    ),
    dispatch => ({
        loadAllData: (allDbData) => {
            dispatch({ type: 'PRELOAD_ALL_DATA', payload: allDbData});
            },
        cAllData: (data) => {
            dispatch( {type: "COPY_ALL_DATA", payload: data} );
        },
        selectRow: (row) => {
            dispatch({ type: 'SELECT_ID', payload: row });
        },
        putCountRows: (count) => {
            dispatch({ type: 'COUNT_ROWS', payload: count });
        },
        putParamsSelected: (params) => {
            dispatch({ type: "PARAMS_SELECTED_GOODS_LIST", payload: params });
        }
    })
  )(Paginat);