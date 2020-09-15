import React, {Component} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Product from './product/product'
import Table from './table/table'

import {connect} from 'react-redux';
import {getOrder} from '../../actions/order';
import {getDetailTable} from '../../actions/tables';

export class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderStatus: false,
            page: '',
            drinks: [],
        }
        this.orderProduct = this.orderProduct.bind(this)
    }
    componentDidMount() {
        this.props.getDetailTable(this.props.match.params.id)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.detail_table !== this.props.detail_table) {
            this.props.getOrder(this.props.detail_table.current_order_id)
        } 
    }
    orderProduct() {
        this.setState({
            orderStatus:!this.state.orderStatus
        })
    }
    render() {
        return(
            <motion.div
                initial={{opacity : 0}}
                animate = {{opacity : 1}}
                exit = {{opacity : 0}}
            >
                <div className="wrap">
                    {this.state.orderStatus == false && <Table orderProduct={this.orderProduct} drinks={this.props.order.content}></Table>}
                    {this.state.orderStatus == true && <Product orderProduct={this.orderProduct} ></Product>}
                    
                </div>
            </motion.div>
        )
    }
}

const mapStateToProps = state => ({
    order : state.order.order,
    detail_table : state.tables.detail_table
})

export default connect(mapStateToProps, {getOrder,getDetailTable})(Order);