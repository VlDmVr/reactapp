import React, {Component} from 'react';
import { Form, FormGroup, Col, Button, FormControl } from 'react-bootstrap';
import './views.css';
import { connect } from 'react-redux';

class FormPopUp extends Component {

    constructor(props){
        super(props);
    }

    onChangeItem(e){
        console.log(e.target.value);
    }

    getForm2PopUp(){
        const selectRow = this.props.selectRow.row;
        if(selectRow){
            return(
                <Form horizontal disabled="">
                    <Col sm={11} disabled="">
                        <input type="text" name="id" value={(selectRow ? selectRow[0].id : '')} autoComplete="off" onChange={this.onChangeItem.bind(this)}  />
                    </Col>
                    <FormGroup>
                        <Col sm={11}>
                            <FormControl type="text" name="title" placeholder="Название" defaultValue={selectRow[0].title} autoComplete="off" onChange={this.onChangeItem.bind(this)} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formControlsTextarea">
                        <Col sm={11}>
                            <FormControl componentClass="textarea" name="description" placeholder="Описание" value={(selectRow ? selectRow[0].description : '')} autoComplete="off" onChange={this.onChangeItem.bind(this)} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col sm={11}>
                            <FormControl type="text" name="price" placeholder="Цена" value={(selectRow ? selectRow[0].price : '')} autoComplete="off" onChange={this.onChangeItem.bind(this)} />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={11}>
                            <Button type="submit" style={{ margin: '0  0 20 20'}}>Отправить</Button>
                            <Button type="submit" style={{ margin: '0  0 0 20' }}>Отменить</Button>
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
        selectRow: state.selectId
    }),
    dispatch => ({

    })
)
(FormPopUp);