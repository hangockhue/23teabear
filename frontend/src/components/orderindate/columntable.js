import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell } = Table; 

export class ColumnTable extends Component {

    render() {
      console.log(this.props.record)
        return(
            <div>
            <Table
              height={200}
              data = {[this.props.record]}
            >
              <Column width={200} >
                <HeaderCell>Ngày bán </HeaderCell>
                <Cell dataKey="ordered_at" />
              </Column>
    
              <Column width={200} >
                <HeaderCell>Số đơn hàng</HeaderCell>
                <Cell dataKey="amount" />
              </Column>
    
              <Column width={200}>
                <HeaderCell>Tông doanh thu</HeaderCell>
                <Cell dataKey="total" />
              </Column>
              
            </Table>
          </div>
        )
    }
}

export default ColumnTable