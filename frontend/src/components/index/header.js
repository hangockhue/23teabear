import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
export class Header extends Component {
    render() {
        return(
            <div className="option-group">
                    <div className="option-container">
                        <h4><b>{this.props.title}</b></h4>
                    </div>
             </div>
        )
    }
}

export default Header;
