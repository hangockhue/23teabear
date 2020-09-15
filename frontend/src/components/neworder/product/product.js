import React, {Component} from 'react';
import Tab from './tab'
import {Tabs, TabLink, TabContent} from 'react-tabs-redux'

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getCategorys, getProducts} from '../../../actions/order';

export class Product extends Component {
    static propTypes = {
        categorys : PropTypes.array.isRequired,
        products: PropTypes.array.isRequired
    }
    componentDidMount() {
        this.props.getCategorys();
        this.props.getProducts();
    }
    style = {
        backgroundColor: '#FFE53B', 
        backgroundImage: 'linear-gradient(147deg, #FFE53B 0%, #fd3838 74%)',
        borderRadius: '0.75em',
        padding: '1rem 2rem',
        marginRight: '0.2rem', 
        cursor: 'pointer', 
        fontWeight: 'bold', 
    }
    render() {
        return(
            <Tabs>
                {this.props.categorys.map(category => (
                    <TabLink to={category.id} key={category.id} style={this.style}>{category.name}
                    </TabLink>
                ))}
                    <button style={this.style} onClick={this.props.orderProduct} > Đóng</button>
                {this.props.categorys.map(category => (
                    <TabContent key={category.id} for={category.id} >
                        {/* <div className="container mb-4"> */}
                            <div className="row">
                            {this.props.products.filter(product => product.category == category.id).map(filterProduct =>
                                (  
                                    <Tab key={filterProduct.id} product={filterProduct} neworder={this.props.neworder}></Tab>   
                                ))}
                            </div> 
                        {/* </div> */}
                    </TabContent>
                ))}
            </Tabs>
        )
    }
}

const mapStateToProps = state => ({
    categorys : state.order.categorys,
    products : state.order.products,
})

export default connect(mapStateToProps, {getCategorys, getProducts})(Product);