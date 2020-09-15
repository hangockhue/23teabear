import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import ListOrder from './listOrder'
import {connect} from 'react-redux'

export class Table extends Component {

    render() {
        return (
            <div className="row">
              <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-4">
                <NavLink to='/table' className="card">
                  <div className="card-body text-center">
                    <div className="text-reset" ><h3 className="card-title display-4">Trở về</h3></div>
                  </div>
                </NavLink>
              </div>
              <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-4">
                <div className="card">
                  <div className="card-body text-center">
                    <a className="text-reset" onClick={this.props.orderProduct}><h3 className="card-title display-4">Gọi món</h3></a>
                  </div>
                </div>
            </div>
            {this.props.drinks != undefined && JSON.parse(this.props.drinks).map(drink => (
              <ListOrder key={drink.id} drink={drink}></ListOrder>
            ))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
  order : state.order.order,
})

export default connect(mapStateToProps)(Table);