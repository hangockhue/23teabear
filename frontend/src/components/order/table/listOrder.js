import React, {Component} from 'react';


export class ListOrder extends Component {

    render() {
        return(
        <div className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 mt-4">
            <div className="card">
            <div className="card-body text-center">
        <a className="text-reset"><h3 className="card-title display-4">{this.props.drink.name} x {this.props.drink.amount}</h3></a>
            </div>
            </div>
        </div>
        ) 
    }
}

export default ListOrder