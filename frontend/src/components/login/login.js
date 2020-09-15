import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {login} from '../../actions/auth';

export class Login extends Component {
    state = {
      username: '',
      password: '',
    };
      
    static propTypes = {
      login: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool,
    };

    onChange = e => this.setState({
      [e.target.name]: e.target.value
    })

    onSubmit = (e) => {
      e.preventDefault();
      this.props.login(this.state.username, this.state.password);
    }
    render() {
      if (this.props.isAuthenticated) {
        return <Redirect to="/" />;
      }
      const { username, password } = this.state;
        return(
            <div className="container">
            <div className="login-form">
              <div className="main-div">
                <div className="panel">
                  <h2>Đăng nhập</h2>
                </div>
                <form id="Login" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input type="text" className="form-control" name="username" id="username" placeholder="Tên đăng nhập"
                     onChange={this.onChange} value={username} />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" name="password" id="password" placeholder="Password"
                    onChange={this.onChange} value={password} />
                  </div>
                  <div className="forgot">
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                   </div>
                </form>
              </div>
            </div></div>)
    }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(
  mapStateToProps, 
  { login }
)(Login);
