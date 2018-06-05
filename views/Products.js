import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import PopUp from './PopUp';
import Paginat from './Paginat';
import CreateGood from './CreateGood';
import DeleteGood from './DeleteGood';
import './views.css';
import $ from 'jquery';
import { relative, isAbsolute } from 'path';
import { connect } from 'react-redux';


class Products extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){
        //если данные уже существуют, то загружать ничего не надо
        if(this.props.preloadAllData.data && this.props.selectId.row){
            return;
        }
        //загрузка параметров при которых будет показан выбранный список товаров
        let limit = '';
        let offset = '';
        if(this.props.paramsSelectedGoodsList.params){
            limit = this.props.paramsSelectedGoodsList.params.limit;
            offset = this.props.paramsSelectedGoodsList.params.offset;
        }else{
            limit = 5;
            offset = 0;
            this.props.putParamsSelected({ limit: limit, offset: offset });
        }
        //первоначальная загрузка из БД
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
        
        //общее количество записей в БД
        $.ajax({
            type : 'POST',
            url : '/php/allCountData.php',
            cache: false,
            dataType: 'json',
            success : (data) => {

                this.props.putCountRows(data);
            }
        });
    }
    //метод клонирования данных для копии основных данных и использовании для восстановления исходных данных(например, при нажатии кнопки отмена в форме редактирования)
    cloneData(arrData){
        const copyClone =  arrData.map( (val, ind) => {
            var intersect = {};
            for(var key in val){
                intersect[key] = val[key];
            }
            return intersect;
        });

        return copyClone;
    }
    //выбрать редактируемую строку, после клика по строке таблицы
    selectUserRow(id){
        if(id){
            const row = this.props.preloadAllData.data.filter( value => {
                return value.id == id;
            });
            return row;
        }
    }
    //выбор строки в таблице для редактирования
    selectItem(e){
        //если выбранная строка существует, то return
        if(this.props.selectId.row){
            return
        }
        //если форма уже открыта, то return
        if(document.getElementById('popUp').style.display == "block"){
            return;
        }
        document.getElementById('popUp').style.display = "block";
        document.getElementById('createGood').children[0].setAttribute('disabled', 'disabled');
        const selectId = e.target.parentNode.getAttribute('data-id');
        const resaltRow = this.selectUserRow(selectId);
        this.props.selectRow(resaltRow);
    }

    loadContentFromDb(){
        if(this.props.preloadAllData.data){
            const allData = this.props.preloadAllData.data.map((value, index) => {
                return( <tr key={index} data-id={value.id}>
                            <td>{value.id}</td>
                            <td>{value.title}</td>
                            <td>{value.description}</td>
                            <td>{value.price}</td>
                            <td><DeleteGood /></td>
                        </tr> );
            });
            return allData;
        }
    }
    
    render(){  
        return(
            <div>
                <CreateGood />
                <PopUp />
                <h2>Смартфоны</h2>
                <Table striped bordered condensed hover className="productsTable">
                    <thead>
                        <tr>
                            <th style={{width: 50}}>id</th>
                            <th style={{width: 150}}>Название</th>
                            <th style={{width: 400}}>Описание</th>
                            <th style={{width: 100}}>Цена</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody onClick={this.selectItem.bind(this)}>
                        {this.loadContentFromDb()}
                    </tbody>
                </Table>
                <Paginat />
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
)(Products);