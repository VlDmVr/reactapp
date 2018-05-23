import React, {Component} from 'react';
import FormPopUp from './FormPopUp';
import './views.css';

class PopUp extends Component{

    constructor(props){
        super(props);

        this.state = {
            leftPopUpCoordinates: '',
            topPopUpCoordinates: ''
        };
    }

    userDragPopUp(e){
        this.setState({
                    leftPopUpCoordinates: e.pageX,
                    topPopUpCoordinates: e.pageY
                        });
    }

    componentDidMount(){
        const computedStyle = getComputedStyle(document.getElementById('popUp'));
        const middlePopUpWidth = parseInt(computedStyle.width)/2;
        const middlePopUpHeight = parseInt(computedStyle.height)/2;
        const widthPopUp = (document.documentElement.clientWidth/2)-middlePopUpWidth;
        const heightPopUp = (document.documentElement.clientHeight/2)-middlePopUpHeight;
       
        this.setState({
            leftPopUpCoordinates: widthPopUp,
            topPopUpCoordinates: heightPopUp
        });
      
    }
    
    render(){
        return(
            <div id="popUp" className="popUp" style={{ left: this.state.leftPopUpCoordinates, top: this.state.topPopUpCoordinates }} draggable onDragEnd={this.userDragPopUp.bind(this)}>
                <FormPopUp state={this.state} />
            </div>
        );
    }
}

export default PopUp;