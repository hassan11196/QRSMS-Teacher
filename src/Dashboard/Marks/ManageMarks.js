import React, { Component } from 'react';
import NavBar from '../Navbar/Navbar';
import { Button as BTTN, Icon, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Initial } from 'react-initial';
import { FaSlidersH, FaInfoCircle } from 'react-icons/fa';
import {
  Table,
  Card,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CardBody,
} from 'reactstrap';
import { Button, Container, Row, Col, Form, Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

class ManageMarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEvaluationtype: '',
      currentWtg: '',
      currentMarks: '',
      code: '',
      TeacherFetchedCourses: [],
      Evaluation: '',
      course: '',
      section: null,
      csrf_token: 0,
      weightage: 0,
      Tmarks: 0,
      scsddc: '',
      marksInfo: '',
      visible: false,
      open: false,
      
    };
    this.CourseBox = this.CourseBox.bind(this);
    this.SectionBox = this.SectionBox.bind(this);
    this.setEvaluation = this.setEvaluation.bind(this);
    this.setSection = this.setSection.bind(this);
    this.setCourse = this.setCourse.bind(this);
    this.startMarking = this.startMarking.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    console.log(this.props.teacherSections)
    axios.get('/management/get_csrf').then((response) => {
      return response.data.csrftoken;
    });

    this.setState(
      {
        csrf_token: Cookies.get('csrftoken'),
      },
      () => {
        console.log(this.state.csrf_token);
      }
    );

    axios.get('/teacher/sections/').then((response) => {
      this.setState({
        TeacherFetchedCourses: response.data.sections,
      });
      console.log('courses ka data',this.state.TeacherFetchedCourses);
      console.log(Array(response.data));

      this.props.TeacherSections(response.data.sections);
      console.log('sectiondata');
      console.log(this.state.SectionInfo);
    });
  }
  startMarking() {
    let form = new FormData();
    form.append('csrfmiddlewaretoken', this.state.csrf_token);
    form.append('scsddc', this.state.scsddc);
    form.append('marks_type', this.state.Evaluation);
    form.append('total_marks', this.state.Tmarks);
    form.append('weightage', this.state.weightage);
    form.append('section', this.state.section);
    axios.get('/management/get_csrf');
    console.log(form)
    axios.post('/teacher/add_marks/', form).then((response) => {
      console.log(response.data);
      this.setState({
        visible: false,
      });
    });
  }
  setCourse(e) {
    this.setState({ course: e.target.value });
  }
  setSection(e) {
    console.log(e.target.name)
    this.setState({
      section: e.target.value,
      scsddc: e.target[e.target.selectedIndex].getAttribute('name'),
    },()=>{
      console.log(this.state.scsddc)
    });
    let form = new FormData();
    console.log(e.target[e.target.selectedIndex].getAttribute('name'));
    form.append('csrfmiddlewaretoken', this.state.csrf_token);
    form.append('scsddc', e.target[e.target.selectedIndex].getAttribute('name'));
    axios.post('/teacher/get_marks_info/', form).then((response) => {
      this.setState({
        marksInfo: response.data,
      });
    });
    console.log(this.state.marksInfo)
  }
  setEvaluation(e) {
    this.setState(
      {
        Evaluation: e.target.value,
      },
      () => {
        console.log(this.state.Evaluation);
      }
    );
  }
  SectionBox(data) {
    return <option name={data.scsddc}>{data.section_name} </option>;
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  CourseBox(data) {
    return <option name={data.course_code}>{data.course_code}</option>;
  }
  render() {
    console.log(this.state.marksInfo);
    return (
      <div>
        <NavBar />

        <Container fluid>
          <br />
          <div style={{ width: 'auto', paddingBottom: '2rem' }}>
            <Breadcrumb>
              <Breadcrumb.Item href="/dashboard/home">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Manage Marks</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Modal
            isOpen={this.state.open}
            toggle={() => {
              this.setState({ open: !this.state.visible });
            }}
          >
            <ModalHeader
              toggle={() => {
                this.setState({ open: !this.state.visible });
              }}
            >
              <h2 style={{ fontWeight: 'bold' }}>Edit Evaluation</h2>
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col>
                  <Form.Label style={{ fontWeight: 'bold' }}>
                    Evaluation Type
                  </Form.Label>
                  <form>
                    <Form.Control as="select" onChange={this.setEvaluation}>
                      <option selected disabled>
                        {this.state.currentEvaluationtype}
                      </option>
                      <option name="Mid 1" value="Mid 1">
                        Mid 1
                      </option>
                      <option name="Mid 2" value="Mid 2">
                        Mid 2
                      </option>
                      <option name="Final" value="Final">
                        Final
                      </option>
                      <option name="CP" value="CP">
                        Class Participation
                      </option>
                      <option name="Project" value="Project">
                        Project
                      </option>
                      <option name="Quiz" value="Quiz">
                        Quiz
                      </option>
                      <option name="Assignment" value="Assignment">
                        Assignment
                      </option>
                    </Form.Control>
                  </form>
                </Col>
              </Row>
              <Row style={{ marginTop: '1rem' }}>
                <Col xs={6}>
                  <form>
                    <Form.Label style={{ fontWeight: 'bold' }}>
                      Total Marks
                    </Form.Label>
                    <Form.Control
                      as="input"
                      value={this.state.currentMarks}
                      onChange={this.handleChange}
                      name="currentMarks"
                    ></Form.Control>
                  </form>
                </Col>
                <Col xs={6}>
                  <form>
                    <Form.Label style={{ fontWeight: 'bold' }}>Weightage</Form.Label>
                    <Form.Control
                      as="input"
                      value={this.state.currentWtg}
                      onChange={this.handleChange}
                      name="currentWtg"
                    ></Form.Control>
                  </form>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <BTTN color="primary">Save</BTTN>{' '}
              <BTTN
                color="secondary"
                onClick={() => {
                  this.setState({ open: !this.state.open });
                }}
              >
                Cancel
              </BTTN>
            </ModalFooter>
          </Modal>
          <Modal
            isOpen={this.state.visible}
            toggle={() => {
              this.setState({ visible: !this.state.visible });
            }}
          >
            <ModalHeader
              toggle={() => {
                this.setState({ visible: !this.state.visible });
              }}
            >
              <h2 style={{ fontWeight: 'bold' }}>Add Evaluation</h2>
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col>
                  <Form.Label style={{ fontWeight: 'bold' }}>
                    Evaluation Type
                  </Form.Label>
                  <form>
                    <Form.Control as="select" onChange={this.setEvaluation}>
                      <option selected disabled>
                        Select Evaluation Type
                      </option>
                      <option name="Mid 1" value="Mid 1">
                        Mid 1
                      </option>
                      <option name="Mid 2" value="Mid 2">
                        Mid 2
                      </option>
                      <option name="Final" value="Final">
                        Final
                      </option>
                      <option name="CP" value="CP">
                        Class Participation
                      </option>
                      <option name="Project" value="Project">
                        Project
                      </option>
                      <option name="Quiz" value="Quiz">
                        Quiz
                      </option>
                      <option name="Assignment" value="Assignment">
                        Assignment
                      </option>
                    </Form.Control>
                  </form>
                </Col>
              </Row>
              <Row style={{ marginTop: '1rem' }}>
                <Col xs={6}>
                  <form>
                    <Form.Label style={{ fontWeight: 'bold' }}>
                      Total Marks
                    </Form.Label>
                    <Form.Control
                      as="input"
                      onChange={this.handleChange}
                      name="Tmarks"
                    ></Form.Control>
                  </form>
                </Col>
                <Col xs={6}>
                  <form>
                    <Form.Label style={{ fontWeight: 'bold' }}>Weightage</Form.Label>
                    <Form.Control
                      as="input"
                      onChange={this.handleChange}
                      name="weightage"
                    ></Form.Control>
                  </form>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <BTTN
                color="primary"
                onClick={() => {
                  this.startMarking();
                }}
              >
                Generate Evaluation
              </BTTN>{' '}
              <BTTN
                color="secondary"
                onClick={() => {
                  this.setState({ visible: !this.state.visible });
                }}
              >
                Cancel
              </BTTN>
            </ModalFooter>
          </Modal>
          <Row>
            <Col md="3">
              <form>
                <Form.Label style={{ fontWeight: 'bold' }}>Course</Form.Label>
                <Form.Control as="select" onChange={this.setCourse}>
                  <option>Select Course</option>
                  {this.props.teacherSections ? (
                    this.props.teacherSections.map((c) => {
                      return this.CourseBox(c);
                    })
                  ) : (
                    <h2>Courses Not Available</h2>
                  )}
                </Form.Control>
              </form>
            </Col>
            <Col md="3">
              <form>
                <Form.Label style={{ fontWeight: 'bold' }}>Section</Form.Label>
                <Form.Control as="select" onChange={this.setSection}>
                  <option>Select Section</option>
                  {this.state.course != '' ? (
                    this.props.teacherSections.map((c) => {
                      return this.SectionBox(c);
                    })
                  ) : (
                    <option>Select A Course First</option>
                  )}
                </Form.Control>
              </form>
            </Col>
            <Col md="3"></Col>
          </Row>
          <br />
          <BTTN
            primary
            onClick={() => {
              this.setState({
                visible: true,
              });
            }}
          >
            Add Evaluation
          </BTTN>
          <br />
          <div style={{ height: '1rem' }}></div>
{this.state.section !== null ?
<div>
{this.state.marksInfo.length !== 0 ? (
            <div>
              <Card>
                <CardHeader style={{ backgroundColor: 'black' }}>
                  <span>
                    <h3 style={{ fontWeight: 'bold', color: 'white' }}>
                      Student Marks
                    </h3>
                  </span>
                </CardHeader>
                <CardBody style={{ border: '1px solid' }}>
                  <Table
                    style={{
                      paddingTop: '1rem',
                      borderRadius: '0.25rem',
                      borderTopLeftRadius: '0.25rem',
                      borderTopRightRadius: '0.25rem',
                    }}
                    className=" table-dark table-flush"
                    responsive
                  >
                    <thead className="thead-dark">
                      {/* <th style={{textAlign:'center'}}>Serial No.</th> */}
                      <th>
                        <span style={{ marginLeft: '2rem' }}>Evaluation</span>
                      </th>
                      <th style={{ textAlign: 'center' }}>Section</th>
                      <th style={{ textAlign: 'center' }}>Total Marks</th>
                      <th style={{ textAlign: 'center' }}>Weightage</th>
                      <th style={{ textAlign: 'center' }}>Average</th>
                      <th style={{ textAlign: 'center' }}>Standard Deviation</th>
                      <th style={{ textAlign: 'center' }}>Action</th>
                    </thead>
                    <tbody>
                      {this.state.marksInfo.map((obj, i) => {
                        return (
                          <tr key={i}>
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
                                    name={obj.marks_type}
                                  />
                                </a>
                                <Media>
                                  <span
                                    style={{ textAlign: 'center' }}
                                    className="mb-0 text-sm"
                                  >
                                    {obj.marks_type}
                                  </span>
                                </Media>
                              </Media>
                            </th>
                            <td style={{ textAlign: 'center', paddingTop: '2rem' }}>
                              {obj.section}
                            </td>
                            <td style={{ textAlign: 'center', paddingTop: '2rem' }}>
                              {obj.total_marks}
                            </td>
                            <td style={{ textAlign: 'center', paddingTop: '2rem' }}>
                              {obj.weightage}
                            </td>
                            <td style={{ textAlign: 'center', paddingTop: '2rem' }}>
                              {obj.mean}
                            </td>
                            <td style={{ textAlign: 'center', paddingTop: '2rem' }}>
                              {obj.sd}
                            </td>
                            <td style={{ textAlign: 'center', paddingTop: '2rem' }}>
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  style={{ border: 'none' }}
                                  className="btn-icon-only text-light"
                                  href="#pablo"
                                  role="button"
                                  size="sm"
                                  color=""
                                  right
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu
                                className="dropdown-menu-arrow" 
                                  right
                                  style={{
                                    // textAlign: 'center',
                                    border: 'none',
                                    minWidth: '8rem',
                                    maxWidth: '8rem',
                                  
                                  }}
                                >
                                  <DropdownItem
                                    right
                                    onClick={() => {
                                      this.setState({
                                        currentEvaluationtype: obj.marks_type,
                                        currentMarks: obj.total_marks,
                                        currentWtg: obj.weightage,
                                        open: true,
                                      });
                                    }}
                                  >
                                    <FaSlidersH /> Edit
                                  </DropdownItem>
                                  <DropdownItem onClick={() => {this.props.setMarksInfo(this.state.scsddc,obj.marks_type)}} href='/admin/SetMarks'>
                                    <FaInfoCircle /> Details
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </div>
          ) : (
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginTop: '2rem',
                textAlign: 'center',
              }}
            >
              No Marks Data
            </div>
          )}
</div>
:           <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginTop: '2rem',
                textAlign: 'center',
              }}
            >
              Select Course and Section First
            </div>
 }
          
        </Container>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    TeacherSections: (data) => {
      dispatch({ type: 'TeacherSections', payload: { data } });
    },

    setMarksInfo:(s,d)=>{
      dispatch({type: 'setMarksInfo',payload:{s,d}})
    },

    changeid: (s) => {
      console.log(s);
      dispatch({ type: 'ChangeId', payload: { s } });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    teacher: state.teacher,
    teacherSections: state.TeacherSections,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageMarks);
