import React, {Component} from 'react';
import { Form, FormGroup, Col, Button, FormControl } from 'react-bootstrap';
import './views.css';
import { connect } from 'react-redux';

class FormPopUp extends Component {

    constructor(props){
        super(props);
    }
    //изменение данных в таблице
    onChangeItem(e){
        const editAttrName = e.target.getAttribute('name');
        const editValue = e.target.value;

        //изменение редактируемых данных в выбранной строке
        const newRow = this.props.selectRow.row.map( (val, ind) => {
            
            if(val[editAttrName]){
                val[editAttrName] = editValue;
            }

            return this.props.selectRow.row[0]
        });
        
        //изменение редактируемых данных во всей таблице
        const allData = this.props.preloadAllData.data;
        for(let i=0; i<allData.length; i++){
            if(allData[i].id == newRow[0].id){
                allData[i].id = newRow[0].id;
                break;
            }
        }
        
        this.props.replaceAllData(allData);
    }
    //изменение состояния таблицы при нажатии кнопок "Отменить" и "Отправить"
    clickForm(e){
        if(e.target.getAttribute('id') == 'cancelForm'){
            this.props.setData2Row(null);

            //клонирование массива объектов dataCopy для восстановления данных, при нажатии кнопки "Отменить"
            const copyClone =  this.props.copyAllData.dataCopy.map( (val, ind) => {
                var intersect = {};
                for(var key in val){
                    intersect[key] = val[key];
                }
                return intersect;
            });
            
            this.props.replaceAllData(copyClone);
        }
    }

    getForm2PopUp(){
        const selectRow = this.props.selectRow.row;
        if(selectRow){
            return(
                <Form horizontal onChange={this.onChangeItem.bind(this)} >
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
                            <FormControl componentClass="textarea" name="description" placeholder="Описание" defaultValue={selectRow[0].description} autoComplete="off" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={11}>
                            <FormControl type="text" name="price" placeholder="Цена" defaultValue={selectRow[0].price} autoComplete="off" />
                        </Col>
                    </FormGroup>

                    <FormGroup onClick={this.clickForm.bind(this)} >
                        <Col smOffset={2} sm={11} >
                            <Button id="sendForm" style={{ marginLeft: -15 }} >Отправить</Button>
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
(FormPopUp);