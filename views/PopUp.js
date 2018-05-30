import React, {Component} from 'react';
import FormPopUp from './FormPopUp';
import './views.css';

class PopUp extends Component{

    constructor(props){
        super(props);

        this.state = {
            leftPopUpCoordinates: 200,
            topPopUpCoordinates: 200
        };
    }

    userDragPopUp(e){
        this.setState({
                    leftPopUpCoordinates: e.pageX,
                    topPopUpCoordinates: e.pageY
                        });
    }
    
    render(){
        return(
            <div id="popUp" className="popUp"
            style={{ left: this.state.leftPopUpCoordinates, top: this.state.topPopUpCoordinates }} 
            draggable onDragEnd={this.userDragPopUp.bind(this)}>
                <div>
                    <FormPopUp />
                </div>
            </div>
        );
    }
}

export default PopUp;