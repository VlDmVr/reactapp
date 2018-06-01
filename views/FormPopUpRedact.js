import React, {Component} from 'react';
import { Form, FormGroup, Col, Button, FormControl } from 'react-bootstrap';
import $ from 'jquery';
import './views.css';
import { connect } from 'react-redux';

class FormPopUpRedact extends Component {

    constructor(props){
        super(props);
    }

    //изменение данных в таблице через связь(ссылки) двух объектов 
    //в хранилище(this.props.selectRow - объекта выбранной строки и this.props.preloadAllData - объекта всех записей товаров на странице)
    onChangeItem(e){
        const editAttrName = e.target.getAttribute('name');
        const editValue = e.target.value;

        this.props.selectRow.row[0][editAttrName] = editValue;
       
        this.props.replaceAllData(this.props.preloadAllData.data);
    }
    //изменение состояния таблицы при нажатии кнопок "Отменить" и "Отправить"
    clickForm(e){
        //--------------------------------Отменить----------------------------
        if(e.target.getAttribute('id') == 'cancelForm'){
            //обнуляем всю выбранную строку товара в хранилище
            this.props.setData2Row(null);

            //клонирование массива объектов dataCopy для восстановления данных, при нажатии кнопки "Отменить"
            const copyClone = this.cloneData(this.props.copyAllData.dataCopy);

            this.props.replaceAllData(copyClone);
            document.getElementById('popUp').style.display = "none";
            //разблокировка кнопки "Создать товар"
            document.getElementById('createGood').children[0].removeAttribute('disabled');
        }
        //-------------------------------Отправить----------------------------
        if(e.target.getAttribute('id') == 'sendForm'){

            const id = this.props.selectRow.row[0].id;
            const title = this.props.selectRow.row[0].title;
            const description = this.props.selectRow.row[0].description;
            const price = this.props.selectRow.row[0].price;

            //закрыть диалоговое окно редактирования товара
            document.getElementById('popUp').style.display = "none";
            //разблокировка кнопки "Создать товар"
            document.getElementById('createGood').children[0].removeAttribute('disabled');
            //обнуляем всю выбранную строку товара в хранилище
            this.props.setData2Row(null);

            $.ajax({
                type : 'POST',
                url : '/php/updateGoodsHandler.php',
                data: { 'id': id, 'title': title, 'description': description, 'price': price },
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
                
                                this.props.replaceAllData(dataUpd);
                                this.props.setCopyAllData(copyClone);
                            }
                        });
                    }
                }
            });
        }
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

    getForm2PopUp(){
        const selectRow = this.props.selectRow.row;
        
        if(selectRow){
            return(
                <Form horizontal onChange={this.onChangeItem.bind(this)}>
                    <Col sm={11} disabled="">
                        <input type="text" name="id" defaultValue={selectRow[0].id} autoComplete="off" hidden disabled/>
                    </Col>
                    <FormGroup>
                        <Col sm={11}>
                            <FormControl type="text" name="title" placeholder="Название" defaultValue={selectRow[0].title} autoComplete="off" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlsTextarea">
                        <Col sm={11}>
                            <FormControl componentClass="textarea" name="description" placeholder="Описание" defaultValue={selectRow[0].description} autoComplete="off"  style={{ maxWidth: '280px' }}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={11}>
                            <FormControl type="text" name="price" placeholder="Цена" defaultValue={selectRow[0].price} autoComplete="off" />
                        </Col>
                    </FormGroup>

                    <FormGroup onClick={this.clickForm.bind(this)} >
                        <Col smOffset={2} sm={11} >
                            <Button id="sendForm" style={{ marginLeft: -25 }} >Отправить</Button>
                            <Button id="cancelForm" style={{ marginLeft: 15 }} >Отменить</Button>
                        </Col>
                    </FormGroup>
                </Form>
            );
        }
    }
    
    render(){
        return (
            <div>
                <div id="formWrapper"> 
                    <h3>Редактирование товара</h3>
                    <p>Можно перемещать форму редактирования</p>
                    {this.getForm2PopUp()} 
                </div>
            </div>
        );
    }
}



export default connect(
    state => ({
        selectRow: state.selectId,
        preloadAllData: state.preloadAllData,
        copyAllData: state.copyAllData
    }),
    dispatch => ({ 
        replaceAllData: (allData) => {
            dispatch({ type: 'PRELOAD_ALL_DATA', payload: allData });
        },
        setCopyAllData: (copyData) => {
            dispatch( {type: "COPY_ALL_DATA", payload: copyData} );
        },
        setData2Row: (row) => {
            dispatch({ type: 'SELECT_ID', payload: row });
        }
    })
)
(FormPopUpRedact);