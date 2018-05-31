import React, {Component} from 'react';
import './views.css';

class ErrorFormField extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="errorFormField">
                <span>Поле обязательное для заполнения</span>
            </div>
        );
    }
}

export default ErrorFormField;