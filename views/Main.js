import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './views.css';

class Main extends Component {
    
    render(){  
        return (
            <div>
                <h2>Главная</h2>
                <div><span>Перейти в раздел <Link to="/about">О приложении</Link></span></div>
                <div><span>Перейти в раздел <Link to="/products">Товары</Link></span></div>
            </div>
        );
    }
}

export default Main;