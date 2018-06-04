import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import PopUp from './PopUp';
import Paginat from './Paginat';
import CreateGood from './CreateGood';
import './views.css';
import $ from 'jquery';
import { relative, isAbsolute } from 'path';
import { connect } from 'react-redux';


class Products extends Component{

    constructor(props){
        super(props);
    }

    componentWillMount(){

        //первоначальная загрузка из БД
        $.ajax({
            type : 'POST',
            url : '/php/allSelectHandler.php',
            data: { 'start': 0, 'end': 5 },
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
    //метод удаление товара 
    deleteGood(e){
        //если форма редактирования/создания нового товара уже открыта, то удаление не работает
        if(document.getElementById('popUp').style.display == "block"){
            return;
        }
        e.stopPropagation();
        const dataId = e.target.parentNode.parentNode.getAttribute('data-id');

        $.ajax({
            type : 'POST',
            url : '/php/deleteGoodHandler.php',
            data: { 'id': dataId },
            cache: false,
            dataType: 'json',
            success : (data) => {

                if(data){
                    $.ajax({
                        type : 'POST',
                        url : '/php/allSelectHandler.php',
                        cache: false,
                        dataType: 'json',
                        success : (dataUpd) => {
            
                            //клонирование массива объектов после загрузки с сервера
                            const copyClone =  this.cloneData(dataUpd);
            
                            this.props.loadAllData(dataUpd);
                            this.props.cAllData(copyClone);
                        }
                    });
                }
            }
        });
    }

    loadContentFromDb(){
        if(this.props.preloadAllData.data){
            const allData = this.props.preloadAllData.data.map((value, index) => {
                return( <tr key={index} data-id={value.id}>
                            <td>{index + 1}</td>
                            <td>{value.title}</td>
                            <td>{value.description}</td>
                            <td>{value.price}</td>
                            <td><Button bsStyle="info" onClick={this.deleteGood.bind(this)}>Удалить</Button></td>
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
                            <th style={{width: 50}}>#</th>
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
        countRows: state.countRows
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
      }  
    })
)(Products);