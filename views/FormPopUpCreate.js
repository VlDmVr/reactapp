import React, {Component} from 'react';
import { Form, FormGroup, Col, Button, FormControl } from 'react-bootstrap';
import ErrorFormField from './ErrorFormField';
import $ from 'jquery';
import './views.css';
import { connect } from 'react-redux';
import { SSL_OP_CRYPTOPRO_TLSEXT_BUG } from 'constants';

class FormPopUpCreate extends Component{

    constructor(props){
        super(props);
    }

    //метод обнуляет значения в форме "Создание товара"
    makeEmptyValue(){
        const form = document.getElementById('formForCreateGood');
        const inputsCollect = form.getElementsByTagName('input');
        const texareaCollect = form.getElementsByTagName('textarea');

        for(let i=0; i<inputsCollect.length; i++){

            inputsCollect[i].value = '';
            inputsCollect[i].style.border = '';
            const parent = inputsCollect[i].parentNode;
            parent.getElementsByClassName('errorFormField')[0].style.display = 'none';
        }

        texareaCollect[0].value = '';
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

    //изменение состояния таблицы при нажатии кнопок "Отменить" и "Отправить"
    clickForm(e){
        //--------------------------------Отменить----------------------------
        if(e.target.getAttribute('id') == 'cancelForm'){
            //обнуление данных
            this.makeEmptyValue();

            document.getElementById('popUp').style.display = "none";
            //разблокировка кнопки "Создать товар"
            document.getElementById('createGood').children[0].removeAttribute('disabled');
        }
        //-------------------------------Отправить----------------------------
        if(e.target.getAttribute('id') == 'sendForm'){

            let error = false;

            const form = document.getElementById('formForCreateGood');
            const inputsCollect = form.getElementsByTagName('input');
            const texareaCollect = form.getElementsByTagName('textarea');
            //получение данных из формы создания товара
            const title = inputsCollect[0].value;
            const price = inputsCollect[1].value;
            const description = texareaCollect[0].value;

            if(!title){
                const errorTitle = form.getElementsByClassName('errorFormField')[0];
                errorTitle.style.display = 'block';
                inputsCollect[0].style.border = '1px solid red';
                error = true;
            }
            if(!price){
                const errorPrice = form.getElementsByClassName('errorFormField')[1];
                errorPrice.style.display = 'block';
                inputsCollect[1].style.border = '1px solid red';
                error = true;
            }

            if(error){
                return;
            }else{

                //закрыть диалоговое окно редактирования товара
                document.getElementById('popUp').style.display = "none";
                //разблокировка кнопки "Создать товар"
                document.getElementById('createGood').children[0].removeAttribute('disabled');

                $.ajax({
                    type : 'POST',
                    url : '/php/createGoodhandler.php',
                    data: { 'title': title, 'description': description, 'price': price },
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

                //обновление общего количества строк в состояние 
                this.props.putCountRows(this.props.countRows.cntRows + 1);
                
                //обнуление данных в форме
                this.makeEmptyValue();
            }
        }
    }
    //валидация обязательных полей в форме создания товара
    validateRequiredFild(e){
        const parent = e.target.parentNode;
        if(parent.getElementsByClassName('errorFormField')[0]){
            parent.getElementsByClassName('errorFormField')[0].style.display = 'none';
            e.target.style.border = '';
        }
    }

    getForm2PopUp(){
        return(
            <Form horizontal id="formForCreateGood" onChange={this.validateRequiredFild.bind(this)}>
                <FormGroup>
                    <Col sm={11}>
                        <FormControl type="text" name="title" placeholder="Название" defaultValue="" autoComplete="off" />
                        <ErrorFormField />
                    </Col>
                    <div>*</div>
                </FormGroup>

                <FormGroup controlId="formControlsTextarea">
                    <Col sm={11}>
                        <FormControl componentClass="textarea" name="description" placeholder="Описание" defaultValue="" autoComplete="off"  style={{ maxWidth: '280px' }}/>
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col sm={11}>
                        <FormControl type="text" name="price" placeholder="Цена" defaultValue="" autoComplete="off" />
                        <ErrorFormField />
                    </Col>
                    <div>*</div>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={11} onClick={this.clickForm.bind(this)}>
                        <Button id="sendForm" style={{ marginLeft: -25 }} >Отправить</Button>
                        <Button id="cancelForm" style={{ marginLeft: 15 }} >Отменить</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }

    render(){
        return(
            <div>
                <div id="formWrapper"> 
                    <h3>Создание товара</h3>
                    <p>Можно перемещать форму создания товара</p>
                    <p style={{ fontSize: '12px' }}>* поля обязательные для заполнения</p>
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
        copyAllData: state.copyAllData,
        countRows: state.countRows

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
        },
        putCountRows: (count) => {
            dispatch({ type: 'COUNT_ROWS', payload: count });
        }
    })
)
(FormPopUpCreate);