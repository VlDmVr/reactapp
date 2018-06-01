import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import '../../views/views.css';
import { Nav, NavItem } from 'react-bootstrap';

class Links extends Component{

    render(){
        return(
            <nav className="navLinks">
                <Nav bsStyle="pills">
                    <NavItem href="/">
                        Главная
                    </NavItem>
                    <NavItem href="/about">
                        О приложении
                    </NavItem>
                    <NavItem href="/products">
                        Товары
                    </NavItem>
                </Nav>
            </nav>
        );
    }
}

export default Links;