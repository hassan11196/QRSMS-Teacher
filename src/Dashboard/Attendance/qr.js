import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import { TableRow, td } from 'material-ui';
import { Button as BTTN, Icon } from 'semantic-ui-react';
import { Initial } from 'react-initial';
import { Redirect } from 'react-router-dom';
import NavBar from '../Navbar/Navbar';
import { Card, Button, Row, Col, Form, Breadcrumb } from 'react-bootstrap';
import {
  Table,
  Container,
  Modal,
  Media,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
// import { MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';
var QRCode = require('qrcode.react');
class QRAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
      hour: '',
      csrf_token: 0,
      json_qr: '',
      SectionInfo: null,
      nodey: [],
      Section_Nodes: [],
      new_scsddc: '',
      new_section: '',
      new_cc: '',
      response_start_attendance: '',
      teacher_sections: '',
    };
    this.toggle = this.toggle.bind(this);
    this.Modal1render = this.Modal1render.bind(this);
    this.Modal2render = this.Modal2render.bind(this);
    this.startAttendance = this.startAttendance.bind(this);
  }
  componentDidMount() {
    axios.get('/management/get_csrf').then((response) => {
      return response.data.csrftoken;
    });

    this.setState({
      csrf_token: Cookies.get('csrftoken'),
    });

    axios.get('/teacher/sections/').then((response) => {
      console.log('courses ka data');
      console.log(Array(response.data));
      this.setState({
        SectionInfo: Array(response.data.sections[0]),
        teacher_sections: response.data.sections,
        SectionInfo: Array(response.data.sections),
      });
      this.props.TeacherSections(response.data.sections);
      console.log('sectiondata');
      console.log(this.state.SectionInfo);
      console.log('Weird Table');
      let nodey = [];
      // nodey.push(this.renderdata(this.state.SectionInfo[0]));
      if (this.state.SectionInfo !== null)
        this.state.SectionInfo[0].forEach((element) => {
          nodey.push(this.renderdata(element));
        });

      console.log(nodey);
      this.setState({
        Section_Nodes: nodey,
      });
    });
  }
  startAttendance = () => {
    console.log('calling');
    this.setState({
      modal1: !this.state.modal1,
      modal2: !this.state.modal2,
    });
    let form = new FormData();
    form.append('csrfmiddlewaretoken', this.state.csrf_token);
    form.append('slot', this.state.hour);
    form.append('scsddc', this.state.new_scsddc);
    form.append('section', this.state.new_section);
    form.append('course_code', this.state.new_cc);
    axios
      .post('/teacher/start_attendance/', form)
      .then((response) => {
        // console.log(response.data);
        this.setState({
          json_qr: response.data.qr_json,
          response_start_attendance: response.data.message,
        });
      })
      .then(() => {
        // this.setState({
        //     modal2: !this.state.modal2,
        //     modal1: !this.state.modal1,
        // })
      });
  };

  toggle = () => {
    this.setState({
      modal1: !this.state.modal1,
    });
  };
  toggle2 = () => {
    this.setState({
      modal2: !this.state.modal2,
    });
  };
  MarkAttendance = (cc, ssdc, sec) => {
    console.log('cc,');
    console.log(cc);
    console.log(ssdc);
    console.log(sec);
    this.setState({
      new_cc: cc,
      new_scsddc: ssdc,
      new_section: sec,
    });
    this.toggle();
  };
  1;
  Modal1render = () => {
    console.log('this.state.json_qr');
    console.log(this.state.json_qr);
    return (
      <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
        <ModalBody style={{ textAlign: 'center', overflow: 'auto' }}>
          <QRCode
            level="L"
            id="QR"
            size="1500"
            value={JSON.stringify(this.state.json_qr)}
            style={{ width: '100%', height: '100%' }}
          />
          ,
          <br />
        </ModalBody>
        <ModalFooter>
          <div atyle={{ float: 'left' }}>
            <BTTN
              color="secondary"
              onClick={() => {
                this.zoomin();
              }}
            >
              <i style={{paddingRight:'1rem'}} className="fas fa-search-minus"></i>
              Zoom In
            </BTTN>
          </div>
          <BTTN
            color="secondary"
            onClick={() => {
              this.zoomout();
            }}
          >
            <i style={{paddingRight:'1rem'}} className="fas fa-search-plus"></i>
            Zoom Out
          </BTTN>
        </ModalFooter>
      </Modal>
    );
  };
  zoomin = () => {
    var GFG = document.getElementById('QR');
    // var modal1 = document.getElementById('m  odal');
    var currWidth = GFG.clientWidth;
    var currHeight = GFG.clientHeight;
    // var modalWidth = modal1.clientWidth;
    // var modalHeight = modal1.clientHeight;
    GFG.style.width = currWidth + 100 + 'px';
    GFG.style.height = currHeight + 100 + 'px';
    // modal1.style.width = modalWidth + 100 + 'px';
    // modal1.style.height = modalHeight + 100 + 'px';
  };

  zoomout = () => {
    var GFG = document.getElementById('QR');
    // var modal1 = document.getElementById('modal');
    var currWidth = GFG.clientWidth;
    var currHeight = GFG.clientHeight;
    // var modalWidth = modal1.clientWidth;
    // var modalHeight = modal1.clientHeight;
    GFG.style.width = currWidth - 100 + 'px';
    GFG.style.height = currHeight - 100 + 'px';
    // modal1.style.width = modalWidth - 100 + 'px';
    // modal1.style.height = modalHeight - 100 + 'px';
  };
  Modal2render = () => {
    return (
      <Modal isOpen={this.state.modal1} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Class Hour</ModalHeader>
        <ModalBody>
          <Form>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Select Course</Form.Label>
              <Form.Control as="select" onChange={this.setHour}>
                <option>Select Hour</option>
                <option name="1"> 8:00 AM - 9:00</option>
                <option name="2">9:00 AM- 10:00</option>
                <option name="3">10:00 AM- 11:00</option>
                <option name="4">11:00 AM- 12:00</option>
                <option name="5">12:00 AM- 1:00</option>
                <option name="6">1:00 AM- 2:00</option>
                <option name="7">2:00 AM- 3:00</option>
                <option name="8">3:00 AM- 4:00</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </ModalBody>
        <ModalFooter>
          <BTTN color="primary" onClick={() => this.toggle()}>
            Close
          </BTTN>
          <BTTN color="secondary" onClick={() => this.startAttendance()}>
            Start Attendance
          </BTTN>
        </ModalFooter>
      </Modal>
    );
  };
  setHour = (e) => {
    let h = e.target.options[e.target.selectedIndex].getAttribute('name');

    this.setState((oldState) => ({
      hour: h,
    }));

    console.log(this.state.hour);
  };

  renderdata(c) {
    console.log('registration table k ander');
    console.log(c);
    return (
      <tr    key={'rowCol' + c.course_name}
      >
        <th scope="row" style={{ textAlign: 'center' }}>
                                    <Media className="align-items-center">
                                      <a
                                        className="avatar rounded-circle mr-3"
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        <Initial
                                          radius={55}
                                          height={40}
                                          width={40}
                                          seed={1}
                                          fontSize={20}
                                          name={c.course.course_name}
                                        />
                                      </a>
                                      <Media>
                                        <span
                                          style={{fontSize: '13.5px', textAlign: 'center' }}
                                          className="mb-0 text-sm"
                                        >
                                          {c.course.course_name}
                                        </span>
                                      </Media>
                                    </Media>
                                  </th>
        
          
        
        <td style={{ fontSize: '13.5px', textAlign: 'center' }}>{c.course_code}</td>
        <td style={{ fontSize: '13.5px', textAlign: 'center' }}>{c.section_name}</td>
        <td style={{ fontSize: '13.5px', textAlign: 'center' }}>
          {c.section_seats}
        </td>
        <td style={{ color: '#10A7F0', textAlign: 'center' }}>
          <BTTN
            size="tiny"
            primary
            onClick={() => {
              this.MarkAttendance(c.course_code, c.scsddc, c.section_name);
            }}
          >
            Mark Attendance
          </BTTN>
        </td>
        <div></div>
      </tr>
      // </li>
    );
  }
  render() {
    if (this.props.teacherSections === [] || this.props.teacherSections === null || this.props.teacherSections === undefined) {
      return <Redirect to="/auth/login" />;
    } else
      return (
        <div>
          <NavBar />

          <br />
          <Container fluid>
            <div style={{ width: 'auto', paddingBottom: '2rem' }}>
              <Breadcrumb>
                <Breadcrumb.Item href="/dashboard/home">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>QR Attendance</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Card style={{ border: '1px solid black' }}>
              <Card.Header
                style={{
                  marginTop: '-1px',
                  backgroundColor: 'black',
                  border: '1px solid black',
                  marginLeft: '-1px',
                }}
              >
                <span>
                  <h3 style={{ fontWeight: 'bold', color: 'white' }}>
                    Assign Sections
                  </h3>
                </span>
              </Card.Header>
              <Card.Body>
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <th style={{marginLeft:'2rem'}}>Course Name</th>
                    <th style={{ textAlign: 'center' }}>Course Code</th>
                    <th style={{ textAlign: 'center' }}>Section</th>
                    <th style={{ textAlign: 'center' }}>No of Seats</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                  </thead>
                  <tbody>{this.state.Section_Nodes}</tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>
          {this.Modal1render()}
          {this.Modal2render()}
        </div>
      );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    TeacherSections: (data) => {
      dispatch({ type: 'TeacherSections', payload: { data } });
    },
    changeid: (s) => {
      dispatch({ type: 'ChangeId', payload: { s } });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    teacher: state.teacherinfo,
    teacherSections: state.TeacherSections,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QRAttendance);
