import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import D from '../../assets/img/d.png';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import {
  Popover,
  PopoverBody,
  Media,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
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
          <Navbar
            position="fixed"
            bg="dark"
            variant="dark"
            style={{ height: '5rem' }}
          >
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
                {/* <div
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
                    onClick={
                      (() => {
                        this.toggle();
                      },
                      () => {
                        console.log(this.state.popoverOpen);
                      })
                    }
                    id="Popover1"
                    src={D}
                    style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      borderRadius: '50%',
                      margin: '1rem',
                    }}
                  />
                  Howdy, {this.state.user.first_name} {this.state.user.last_name}{' '}
                </h3>
              </div> */}
                <UncontrolledDropdown nav style={{ marginLeft: '-50px' }}>
                  <DropdownToggle className="pr-2" nav>
                    <Media className="align-items-center">
                      <span
                        style={{ marginLeft: '-160px' }}
                        className="avatar avatar-sm rounded-circle"
                      >
                        <img
                          src={D}
                          style={{
                            width: '3.5rem',
                            height: '3.5rem',
                            borderRadius: '50%',
                          }}
                        />
                      </span>
                      <Media
                        style={{ marginLeft: '2rem !important' }}
                        className="ml-2 d-none d-lg-block"
                      >
                        <span
                          className="mb-0 text-sm font-weight-bold"
                          style={{ marginLeft: '1rem' }}
                        >
                          Howdy, {this.state.TeacherInfo.first_name}{' '}
                          {this.state.TeacherInfo.last_name}{' '}
                        </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem to="/dashboard/home" tag={Link}>
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>
                    <DropdownItem to="/portal/user-profile" tag={Link}>
                      <i className="ni ni-settings-gear-65" />
                      <span>Settings</span>
                    </DropdownItem>
                    {/* <DropdownItem to="/portal/user-profile" tag={Link}>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                  <DropdownItem to="/portal/user-profile" tag={Link}>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem> */}
                    <DropdownItem divider />
                    <DropdownItem
                      onClick={() => {
                        this.props.logout([]);
                      }}
                    >
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          {/* <Popover
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target="Popover1"
          toggle={this.toggle}
        >
          <PopoverBody
            className="btn"
            style={{ wordSpacing: '1rem' }}
            onClick={() => {
              this.props.logout([]);
            }}
          >
            <i className="fas fa-power-off"></i>
            <span type="button" style={{ paddingLeft: '0.7rem' }}>
              Logout
            </span>
          </PopoverBody>
        </Popover> */}
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
