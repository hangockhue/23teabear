import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export class AddOrder extends Component {
    render() {
        return (
            <div className="wrap">
                <NavLink to="/" className="box box1 shadow1">
                    <h3>Trở về</h3>
                </NavLink>
                {this.props.tables.filter(table =>  table.ordered == true).map( filterTable =>
                    (
                    <NavLink to={'/addorder/'+filterTable.id} key={filterTable.id} className="box box1 shadow1">
                        <h3>{filterTable.name}</h3>
                    </NavLink>
                ))}
            </div>  
        )
    }
}