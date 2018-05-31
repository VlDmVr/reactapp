import React, {Component} from 'react';
import FormPopUpRedact from './FormPopUpRedact';
import FormPopUpCreate from './FormPopUpCreate';
import './views.css';
import { connect } from 'react-redux';

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

    togglePopUpForm(){
        if(this.props.selectId.row){
            return(
                <div>
                    <FormPopUpRedact />
                </div>
            );
        }
        else{
            return(
                <div>
                    <FormPopUpCreate />
                </div>
            );
        }
    }
    
    render(){
        return(
            <div id="popUp" className="popUp"
            style={{ left: this.state.leftPopUpCoordinates, top: this.state.topPopUpCoordinates }} 
            draggable onDragEnd={this.userDragPopUp.bind(this)}>
                {this.togglePopUpForm()}
            </div>
        );
    }
}

export default connect(
    state => ({
        preloadAllData: state.preloadAllData,
        selectId: state.selectId,
        copyData: state.copyAllData
      }
    ),
    dispatch => ({
      loadAllData: (allDbData) => {
        dispatch({ type: 'PRELOAD_ALL_DATA', payload: allDbData});
      },
      cAllData: (data) => {
          dispatch( {type: "COPY_ALL_DATA", payload: data} );
      },
      selectRow: (row) => {
          dispatch({ type: 'SELECT_ID', payload: row });
      }  
    })
  )(PopUp);