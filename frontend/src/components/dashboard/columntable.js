import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table; 

export class ColumnTable extends Component {

    render() {
      console.log()
        return(
            <div>
            <Table
              height={200}
              data = {JSON.parse(this.props.order.content)}
            >
              <Column width={200} >
                <HeaderCell>Tên </HeaderCell>
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
        <div>Tổng hóa đơn : {this.props.order.total}</div>
          </div>
        )
    }
}

export default ColumnTable