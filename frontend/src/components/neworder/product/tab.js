import React, {Component} from 'react';

import {connect} from 'react-redux';
import PropType from 'prop-types';
import {addFood, newOrder } from '../../../actions/order'
import { Notification, InputNumber, Button } from 'rsuite'

export class Tab extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.product.id,
      category: this.props.product.category,
      name: this.props.product.name,
      price: this.props.product.price,
      amount: 1,
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({
      amount: value
    });
  }

  checkContent() {
    if (this.props.order.content === undefined) {
      return []
    } else {
      return JSON.parse(this.props.order.content)
    }
  }

  sortArray(product) {
    var content = this.checkContent()
    content.push(product)
    var o = {}
    var result = content.reduce((r, e) => {
      var key = e.id
      if (!o[key]) {
        o[key] = e;
        r.push(o[key]);
      } else {
        o[key].amount += Number(e.amount)
      }
      return r;
    }, [])
    const data = {
      "total" : result.reduce((total, obj) => obj.price*obj.amount + total, 0),
      "content" : JSON.stringify(result) 
    }    
    if (this.props.neworder == true) {
      this.props.newOrder(data)
    } else {
      this.props.addFood(this.props.order.id,data);
    }
      
  }
 
  orderProduct(e) {
      const {neworder, ...product} = this.state;
      this.sortArray(product)
    }

    render() {
      
        return (
              <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-4">
                <div className="card shadow">
                  <div className="card-body text-center">
                    <div className="text-warning">
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="fas fa-star" />
                      <i className="far fa-star" />
                    </div>
                    <h4 className="card-title display-4">{this.props.product.name}</h4>
                    <h4>{this.props.product.price}</h4>
                    <br></br>
                    <InputNumber value={this.state.amount} onChange={this.handleChange} max={20} min={1}></InputNumber>
                    <br></br>
                    <Button color="orange" onClick={e => this.orderProduct(this.props.product)}>Chọn</Button>
                  </div>
                </div>
              </div>
        )
    }
}

const mapStateToProps = state => ({
  order : state.order.order,
})

export default connect(mapStateToProps, {addFood, newOrder})(Tab);