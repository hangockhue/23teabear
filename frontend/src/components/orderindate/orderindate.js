import React, {Component} from 'react';
import {Panel, PanelGroup , Pagination} from 'rsuite'
import { Grid, Row, Col, FlexboxGrid, Button } from 'rsuite';
import {connect} from 'react-redux'
import {getTotalOrderDate} from '../../actions/order'


import ColumnTable from './columntable'

export class OrderInDate extends Component {
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
      }

      componentDidUpdate(prevProps, prevState) {
        if(prevProps.total_orders_date!==this.props.total_orders_date){
          this.setState({
            results: this.props.total_orders_date.results,
            pages : Math.ceil(this.props.total_orders_date.count/5)
        });
        }
       }
    componentDidMount() {
        this.props.getTotalOrderDate(this.state.activePage)
    }
    render() {
        return (
            <Grid fluid>
                <Row >
                    <Col xsHidden xs={2}></Col>
                    <Col xs={20}>
                        <PanelGroup accordion bordered>
                        {this.state.results.map(record => (
                            <Panel key={record.ordered_at} header={"Doanh số ngày " + "/" + new Date(record.ordered_at).toISOString().split('T')[0]} >
                                <ColumnTable record={record}></ColumnTable>
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
    total_orders_date : state.order.total_orders_date
})

export default connect(mapStateToProps, {getTotalOrderDate})(OrderInDate);