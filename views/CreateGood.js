import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import './views.css';

class CreateGood extends Component{
    constructor(props){
        super(props);
    }

    createGood(){
        document.getElementById('popUp').style.display = "block";
    }

    render(){
        console.log(document.getElementById('createGood'));
        return(
            <div id="createGood">
                <Button onClick={this.createGood.bind(this)}>Создать товар</Button>
            </div>
        );
    }
}

export default CreateGood;