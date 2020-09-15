import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Panel, PanelGroup , Pagination} from 'rsuite'
import { Grid, Row, Col, FlexboxGrid, Button } from 'rsuite';
import {getOldOrders} from '../../actions/order';

import ColumnTable from './columntable'

export class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activePage: 1,
          results : [],
          pages : 1,
        };
        this.handleSelect = this.handleSelect.bind(this);
      }
    
      handleSelect(eventKey) {
        this.setState({
          activePage: eventKey
        });
        this.props.getOldOrders(eventKey)
      }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.old_orders!==this.props.old_orders){
          this.setState({
            results: this.props.old_orders.results,
            pages : Math.ceil(this.props.old_orders.count/5)
        });
        }
       }

    componentDidMount(){
        this.props.getOldOrders(this.state.activePage);
    }
    render() {
        return (
            <Grid fluid>
                <Row >
                    <Col xsHidden xs={2}></Col>
                    <Col xs={20}>
                        <PanelGroup accordion bordered>
                        {this.state.results.map(order => (
                            <Panel key={order.id} header={order.id} >
                                    <ColumnTable order={order}></ColumnTable>
                            </Panel>
                        ))}
                        </PanelGroup>
                        <FlexboxGrid justify="center">
                            <Pagination
                                    prev
                                    last
                                    next
                                    first
                                    size="lg"
                                    pages={this.state.pages}
                                    activePage={this.state.activePage}
                                    onSelect={this.handleSelect}
                                    />
                        </FlexboxGrid>
                    </Col>
                    <Col xsHidden xs={2}></Col>
                </Row>
            </Grid>
            
        )
    }
}

const mapStateToProps = state => ({
    old_orders : state.order.old_orders
})
export default connect(mapStateToProps, {getOldOrders})(History);