import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../../views/views.css';

class Links extends Component{

    render(){
        return(
            <nav className="navLinks">
                <Link to="/">Главная</Link>
                <Link to="/about">About</Link>
                <Link to="/products">Products</Link>
            </nav>
        );
    }
}

export default Links;