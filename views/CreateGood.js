import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import './views.css';

class CreateGood extends Component{
    constructor(props){
        super(props);
    }

    createGood(e){
        document.getElementById('popUp').style.display = "block";
        e.target.setAttribute('disabled', 'disabled');
    }

    render(){
        return(
            <div id="createGood">
                <Button onClick={this.createGood.bind(this)}>Создать товар</Button>
            </div>
        );
    }
}

export default CreateGood;