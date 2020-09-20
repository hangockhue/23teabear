import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './index/header';
import Option from './index/option';
// Hien Thi Ban
import Payment from './payment/payment'
import Table from './index/table'
// Dat mon
import Order from './order/order';
import NewOrder from './neworder/neworder';
// Dang Nhap
import Login from './login/login'
// Quan li
import Dashboard from './dashboard/dashboard';
import History from './dashboard/history';
import OrderInDate from './orderindate/orderindate'
// Redux and Route
import { Provider } from 'react-redux';
import store from '../store'
import { loadUser } from '../actions/auth'
import PrivateRoute from './common/PrivateRoute';

// import 'rsuite/lib/styles/index.less'; // or 'rsuite/dist/styles/rsuite-default.css'
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: "none",
            title: "23 Tea Beer"
        }
    }
    componentDidMount() {
        store.dispatch(loadUser());
    }
    render() {
            return (
                    <Provider store={store}>
                        <Router>
                            <Header title={this.state.title}></Header>
                            <Switch>
                                <PrivateRoute exact path="/" component={Option}/>
                                <Route exact path="/login" component={Login}></Route>
                                <PrivateRoute exact path="/table" component={Table}/>
                                <PrivateRoute path="/table/:id" component={NewOrder}/>
                                <Route exact path="/payment" component={Payment}></Route>
                                <Route exact path="/addorder" component={Table}></Route>
                                <Route path="/addorder/:id" component={Order}></Route>
                                <PrivateRoute path="/manage" component={Dashboard} />
                                <PrivateRoute path="/history" component={History} />
                                <PrivateRoute path="/totaldate" component={OrderInDate} />
                            </Switch>
                        </Router>
                    </Provider>
                )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));