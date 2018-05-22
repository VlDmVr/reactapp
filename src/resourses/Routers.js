import React, {Component} from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Main from '../../views/Main';
import About from '../../views/About';
import Products from '../../views/Products';
import NotFound from '../../views/NotFound';
import Links from './Links';

class Routers extends Component{
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Links />
                    <Switch>
                        <Route exact path="/" component={Main}></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/products" component={Products}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Routers;