import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './views.css';

class Main extends Component {
    
    render(){  
        return (
            <div>
                <h2>Main</h2>
                <div><span className="navLinks">Перейти в раздел <Link to="/about">About</Link></span></div>
                <div><span className="navLinks">Перейти в раздел <Link to="/products">Products</Link></span></div>
            </div>
        );
    }
}

export default Main;