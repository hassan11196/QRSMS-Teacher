import React, {Component} from 'react'
import {Nav,Navbar} from 'react-bootstrap'
import D from '../../assets/img/d.png';
export class NavBar extends Component{
    render(){
        return(
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
                      <span style={{fontWeight:'700'}}>
                      Howdy, Abdul Rehman{' '}
                      </span>
                    </h3>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}