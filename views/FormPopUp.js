import React, {Component} from 'react';
import { Form, FormGroup, Col, Button, FormControl } from 'react-bootstrap';
import './views.css';

class FormPopUp extends Component {

    constructor(props){
        super(props);
    }
    
    render(){
        console.log(this.props); 
        return (
            <div>
                <div id="formWrapper"> 
                    <h3>Редактирование товара</h3>
                    <Form horizontal>
                        <FormGroup>
                            <Col sm={11}>
                                <FormControl type="text" placeholder="Название" defaultValue="" />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formControlsTextarea">
                            <Col sm={11}>
                                <FormControl componentClass="textarea" placeholder="Описание" defaultValue="" />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col sm={11}>
                                <FormControl type="text" placeholder="Цена" defaultValue="" />
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