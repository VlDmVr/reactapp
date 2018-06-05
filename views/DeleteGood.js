import React, {Component} from 'react';
import './views.css';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class DeleteGood extends Component{

    constructor(props){
        super(props);
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
                        data: { 'limit': this.props.paramsSelectedGoodsList.params.limit, 'offset': this.props.paramsSelectedGoodsList.params.offset },
                        cache: false,
                        dataType: 'json',
                        success : (dataUpd) => {
            
                            if(dataUpd){
                                //клонирование массива объектов после загрузки с сервера
                                const copyClone =  this.cloneData(dataUpd);
                
                                this.props.loadAllData(dataUpd);
                                this.props.cAllData(copyClone);
                            }else{
                                const paramsObj = this.props.paramsSelectedGoodsList.params;
                                this.props.paramsSelectedGoodsList.params.offset = this.props.paramsSelectedGoodsList.params.offset - 5;
                                this.props.countRows.cntRows = this.props.countRows.cntRows - 1;
                                this.props.putCountRows(this.props.countRows.cntRows);
                                console.log(this.props.countRows.cntRows);
                                $.ajax({
                                    type : 'POST',
                                    url : '/php/allSelectHandler.php',
                                    data: { 'limit': this.props.paramsSelectedGoodsList.params.limit, 'offset': this.props.paramsSelectedGoodsList.params.offset },
                                    cache: false,
                                    dataType: 'json',
                                    success : (dataUpdNew) => {
                        
                                        //клонирование массива объектов после загрузки с сервера
                                        const copyClone =  this.cloneData(dataUpdNew);
                        
                                        this.props.loadAllData(dataUpdNew);
                                        this.props.cAllData(copyClone);
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }

    render(){
        return(
            
            <Button bsStyle="info" onClick={this.deleteGood.bind(this)}>Удалить</Button>
            
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
  )(DeleteGood);