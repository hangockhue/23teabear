import React, { Component } from 'react';
import {AnimatePresence, motion} from 'framer-motion'
import {NavLink} from 'react-router-dom'
export class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: "0"
        }
    }

    chooseOption(e) {
        console.log(e.target.value)
    }

    render() {
        return (
            <motion.div 
            initial={{opacity : 0}}
            animate = {{opacity : 1}}
            exit = {{opacity: 0}}
            >
                <div className="option-group">
                <div className="option-container">
                    <NavLink activeStyle={{color:'black'}} to="/table" className="option">
                    <span className="option__indicator" />
                    <span className="option__label">
                        <sub>Bàn mới</sub>
                    </span>
                    </NavLink>
                    <NavLink activeStyle={{color:'black'}} to="/addorder" className="option" >
                    <span className="option__indicator" />
                    <span className="option__label">
                        <sub>Thêm món</sub>
                    </span>
                    </NavLink>
                </div>
                </div>
                <div className="option-group">
                <div className="option-container">
                    <NavLink activeStyle={{color:'black'}} to="/payment" className="option" htmlFor="option-3">
                    <span className="option__indicator" />
                    <span className="option__label">
                        <sub>Thanh toán</sub>
                    </span>
                    </NavLink>
                    <NavLink activeStyle={{color:'black'}} to="/manage" className="option" htmlFor="option-4">
                    <span className="option__indicator" />
                    <span className="option__label">
                        <sub>Quản lí</sub>
                    </span>
                    </NavLink>
                </div>
                </div>
            </motion.div>
        )
    }
}

export default Option;