import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import './views.css';
import { connect } from 'react-redux';

class CreateGood extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(this.props.selectId.row){
            document.getElementById('createGood').children[0].setAttribute('disabled', 'disabled');
        }

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
  )(CreateGood);