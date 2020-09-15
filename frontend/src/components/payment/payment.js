import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import ModalPay from './modalpay'
import { Notification} from 'rsuite'

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {getTables} from '../../actions/tables';
import {getOrder} from '../../actions/order';

export class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          table: [],
          content: [],
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
      }
    static propTypes = {
        tables: PropTypes.array.isRequired,
    }
    nofication(msg) {
        Notification['success']({
          title: msg,
          duration: 1000,
        })
      }
    componentDidMount(){
        this.props.getTables();
    }

    close() {
        this.setState({ show: false });
    }
    open(filterTable) {
        this.setState({ show: true, table: filterTable });
        this.props.getOrder(filterTable.current_order_id)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.detail_table !== this.props.detail_table) {
            this.close()
            this.props.getTables()
            this.nofication("Thanh toán thành công")
        }
    }

    render() {
        return (
            <div className="wrap">
                <NavLink to="/" className="box box1 shadow1">
                    <h3>Trở về</h3>
                </NavLink>
                {this.props.tables.filter(table => table.ordered == true).map( filterTable =>
                        (
                        <a onClick={e =>(this.open(filterTable))} key={filterTable.id} className="box box1 shadow1">
                            <h3>{filterTable.name}</h3>
                        </a>
                    ))}
                
                <ModalPay close={this.close} show={this.state.show} table={this.state.table}></ModalPay>
            </div>  
        )
    }
}

const mapStateToProps = state => ({
    tables : state.tables.tables,
    order : state.order.order,
    detail_table : state.tables.detail_table,
})

export default connect(mapStateToProps, {getTables, getOrder})(Payment);