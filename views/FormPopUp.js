import React, {Component} from 'react';
import { Form, FormGroup, Col, Button, FormControl } from 'react-bootstrap';
import './views.css';

class FormPopUp extends Component {

    constructor(props){
        super(props);
    }
    
    render(){
       //console.log(this.state);
        return (
            <div>
                <div id="formWrapper"> 
                    <h3>Редактирование товара</h3>
                    <Form horizontal>
                            <Col sm={11}>
                                <input type="text" name="id" value="" />
                            </Col>
                        <FormGroup>
                            <Col sm={11}>
                                <FormControl type="text" name="title" placeholder="Название" defaultValue="" />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsTextarea">
                            <Col sm={11}>
                                <FormControl componentClass="textarea" name="description" placeholder="Описание" defaultValue="" />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col sm={11}>
                                <FormControl type="text" name="price" placeholder="Цена" defaultValue="" />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button type="submit">Отправить</Button>
                            </Col>
                        </FormGroup>
                        </Form>
                    </div>
                </div>
        );
    }
}

export default FormPopUp;