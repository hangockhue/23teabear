import React, {Component} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Product from './product/product'
import Table from './table/table'
import { Notification} from 'rsuite'

import {connect} from 'react-redux';
import {getOrder, resetOrder} from '../../actions/order';
import {getDetailTable, updateDetailTable} from '../../actions/tables';

export class NewOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: false,
            neworder : true
        }
        this.orderProduct = this.orderProduct.bind(this)
    }
    nofication(msg) {
        Notification['success']({
          title: msg,
          duration: 1000,
        })
      }

    updateTable() {
        const data = {
            'ordered' : true,
            'current_order_id' : this.props.order.id
        }
        this.props.updateDetailTable(this.props.detail_table.id, data)
      }

    orderProduct() {
        this.setState({
            order:!this.state.order
        })
    }
    componentDidMount() {
        this.props.getDetailTable(this.props.match.params.id)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.order !== this.props.order) {
            this.nofication("Đã thêm món thành công")
          if( prevProps.order.id !== this.props.order.id) {
            this.setState({
                neworder: false
            })
            this.updateTable()
          }   
        }         
      }
    render() {
        return(
            <motion.div
                initial={{opacity : 0}}
                animate = {{opacity : 1}}
                exit = {{opacity : 0}}
            >
                <div className="wrap">
                    {this.state.order == false && <Table orderProduct={this.orderProduct} drinks={this.props.order.content}></Table>}
                    {this.state.order == true && <Product orderProduct={this.orderProduct} neworder={this.state.neworder} ></Product>}
                </div>
            </motion.div>
        )
    }
}

const mapStateToProps = state => ({
    order : state.order.order,
    detail_table : state.tables.detail_table,
    message : state.messages.message
    
})

export default connect(mapStateToProps, {getOrder,getDetailTable, resetOrder, updateDetailTable})(NewOrder);