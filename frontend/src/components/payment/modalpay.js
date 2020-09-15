import React, {Component} from 'react';
import {Modal} from 'rsuite'
import {Button, ButtonToolbar} from 'rsuite'
import { Table } from 'rsuite';
const { Column, HeaderCell, Cell } = Table; 
import {connect} from 'react-redux';
import {getOrder} from '../../actions/order';
import {updateDetailTable} from '../../actions/tables';

export class ModalPay extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          content: [],
        };
      }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.order!==this.props.order){ 
            this.setState({content: JSON.parse(this.props.order.content)})
        }
    }

    payment() {
        const data = {
            'ordered' : false,
            'current_order_id' : null
        }
        this.props.updateDetailTable(this.props.table.id, data)
    }
    render() {
        return (
                <Modal size="sm" show={this.props.show} onHide={this.props.close}>
                    <Modal.Header>
                        <Modal.Title>Modal Title {this.props.table.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table
                            height={200}
                            data = {this.state.content}
                            >
                            <Column width={200} >
                                <HeaderCell>Tên</HeaderCell>
                                <Cell dataKey="name" />
                            </Column>
                    
                            <Column width={200} >
                                <HeaderCell>Số lượng</HeaderCell>
                                <Cell dataKey="amount" />
                            </Column>
                    
                            <Column width={200}>
                                <HeaderCell>Giá</HeaderCell>
                                <Cell dataKey="price" />
                            </Column>
                            </Table>
                            <div>Tổng hóa đơn: {this.props.order.total} </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={e => this.payment()} appearance="primary">
                        Thanh Toán
                        </Button>
                        <Button color="red" onClick={this.props.close} appearance="primary">
                        Hủy
                        </Button>
                        
                    </Modal.Footer>
                </Modal>
        )
    }
}

const mapStateToProps = state => ({
    order : state.order.order,
})

export default connect(mapStateToProps, {getOrder, updateDetailTable})(ModalPay);