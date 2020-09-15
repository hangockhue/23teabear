import React, { Component } from 'react';
import {AnimatePresence, motion} from 'framer-motion'
import { NavLink } from 'react-router-dom';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTables} from '../../actions/tables';
import {resetOrder} from '../../actions/order';
export class Table extends Component {

    static propTypes = {
        tables: PropTypes.array.isRequired,
    }

    componentDidMount(){
        this.props.getTables();
        this.props.resetOrder();
        // console.log(this.props)
    }


    render() {
        return(
            <motion.div
                initial={{opacity : 0}}
                animate = {{opacity : 1}}
                exit = {{opacity: 0}}
            >
            <div className="wrap">
                <NavLink to="/" className="box box1 shadow1">
                    <h3>Trở về</h3>
                </NavLink>
                {this.props.match.path == "/table" && 
                    this.props.tables.filter(table =>  table.ordered == false).map( filterTable =>
                        (
                        <NavLink to={'/table/'+filterTable.id} key={filterTable.id} className="box box1 shadow1">
                            <h3>{filterTable.name}</h3>
                        </NavLink>
                    ))}
                {this.props.match.path == "/addorder" && 
                    this.props.tables.filter(table =>  table.ordered == true).map( filterTable =>
                        (
                        <NavLink to={'/addorder/'+filterTable.id} key={filterTable.id} className="box box1 shadow1">
                            <h3>{filterTable.name}</h3>
                        </NavLink>
                    ))}
            </div>  
            </motion.div>
        )
    }
}

const mapStateToProps = state => ({
    tables : state.tables.tables
})

export default connect(mapStateToProps, {getTables, resetOrder})(Table);
