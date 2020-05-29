import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import D from '../../assets/img/d.png';
import { Redirect } from 'react-router-dom';
import { Popover, PopoverBody } from 'reactstrap';
import { connect } from 'react-redux';
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TeacherInfo: [],
      popoverOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    this.setState({
      TeacherInfo: this.props.teacher,
    });
  }
  componentDidUpdate() {
    console.log('logs');
    if (this.props.teacher !== this.state.TeacherInfo)
      this.setState({
        TeacherInfo: this.props.teacher,
      });
  }
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }
  render() {
    console.log(this.state.TeacherInfo);
    if (this.state.TeacherInfo === []) {
      return <Redirect to="/auth/login" />;
    } else
      return (
        <div>
          <Navbar bg="dark" variant="dark" style={{ height: '6rem' }}>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <div
                  style={{ display: 'inline-flex', float: 'right' }}
                  bg="dark"
                  variant="dark"
                  float="right"
                >
                  <h3
                    style={{
                      paddingTop: '1rem',
                      paddingRight: '1rem',
                      color: 'white',
                      wordSpacing: '2px',
                    }}
                  >
                    <img
                      onClick={() => {
                        this.toggle();
                      }}
                      id="Popover1"
                      src={D}
                      style={{
                        width: '3.5rem',
                        height: '3.5rem',
                        borderRadius: '50%',
                        margin: '1rem',
                      }}
                    />
                    <span style={{ fontWeight: '700' }}>
                      Howdy, {this.state.TeacherInfo.first_name}{' '}
                      {this.state.TeacherInfo.last_name}
                    </span>
                  </h3>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Popover
            placement="bottom"
            isOpen={this.state.popoverOpen}
            target="Popover1"
            toggle={this.toggle}
          >
            <PopoverBody
              className="btn"
              style={{ wordSpacing: '1rem', border: 'none' }}
              onClick={() => {
                this.props.logout([]);
              }}
            >
              <i className="fas fa-power-off"></i>
              <span type="button" style={{ paddingLeft: '0.7rem' }}>
                Logout
              </span>
            </PopoverBody>
          </Popover>
        </div>
      );
  }
}
const mapStateToProps = (state) => {
  return {
    teacher: state.teacher,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (s) => {
      dispatch({ type: 'logout', payload: { s } });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
