import React, { Component } from 'react';
import NavBar from '../Navbar/Navbar';
import { Button as BTTN, Icon, Input } from 'semantic-ui-react';

import { Message } from 'semantic-ui-react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import Switch from 'react-switch';
import Graphics3 from '../../assets/img/d.png';
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
import { Redirect } from 'react-router-dom';
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
      newWtg: 0,
      Total: 0,
      newMarks: 0,
      code: '',
      TeacherFetchedCourses: [],
      Evaluation: '',
      course: '',
      section: '',
      csrf_token: 0,
      weightage: 0,
      Tmarks: 0,
      scsddc: '',
      marksInfo: [],
      custom: false,
      visible: false,
      open: false,
      custom: false,
    };
    this.CourseBox = this.CourseBox.bind(this);
    this.SectionBox = this.SectionBox.bind(this);
    this.setEvaluation = this.setEvaluation.bind(this);
    this.setSection = this.setSection.bind(this);
    this.setCourse = this.setCourse.bind(this);
    this.startMarking = this.startMarking.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.finalize = this.finalize.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.change_evaluation = this.change_evaluation.bind(this);
  }

  change_evaluation() {
    let form = new FormData();
    form.append('csrfmiddlewaretoken', this.state.csrf_token);
    form.append('scsddc', this.state.scsddc);
    form.append('marks_type', this.state.currentEvaluationtype);
    form.append('new_type', this.state.currentEvaluationtype);
    form.append('old_marks', this.state.currentMarks);
    form.append('new_marks', this.state.newMarks);
    form.append('old_weightage', this.state.currentWtg);
    form.append('new_weightage', this.state.newWtg);

    axios.post('/teacher/update_evaluation/', form).then((response) => {
      if (response.data.Status === 'Success') {
        form.append('csrfmiddlewaretoken', this.state.csrf_token);
        form.append('scsddc', this.state.scsddc);
        axios.post('/teacher/get_marks_info/', form).then((response) => {
          console.log(response);
          this.setState({
            marksInfo: response.data,
            open: false,
          });
        });
        this.setState(
          {
            type: 'success',
            snackMessage: 'Evaluation Updated',
          },
          () => {
            this.notify();
          }
        );
        // alert('Evaluation Updated');
      } else {
        this.setState(
          {
            type: 'error',
            snackMessage: "Evaluation Couldn't be updated.Please Retry",
          },
          () => {
            this.notifyDanger();
          }
        );
        // alert("Evaluation Couldn't be updated.Please Retry");
      }
    });
  }
  notify = () => {
    toast.success(
      <div
        style={{
          paddingLeft: '1rem',
          borderRadius: '50%',
          height: '2rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ marginLeft: '-6px', marginRight: '8px', marginTop: '-32px' }}>
          <i className="fas fa-check-circle"></i>
        </div>
        <div>
          <h5 style={{ marginTop: '0.8rem' }}>
            <b style={{ fontSize: '16px' }}>{'Action Successful'}</b>
          </h5>

          <h6
            style={{
              paddingBottom: '1rem',
              fontSize: '13px',
              marginLeft: '-20px',
              width: '200px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {this.state.snackMessage}
          </h6>
        </div>
      </div>,
      { containerId: 'B' }
    );
  };
  notifyDanger = () => {
    toast.error(
      <div
        style={{
          paddingLeft: '1rem',
          borderRadius: '50%',
          height: '2rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ marginLeft: '-6px', marginRight: '8px', marginTop: '-26px' }}>
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <div>
          <h5 style={{ marginTop: '0.8rem' }}>
            <b style={{ fontSize: '16px' }}>{'An Error Occured'}</b>
          </h5>

          <h6
            style={{
              marginBottom: '1rem',
              fontSize: '13px',
              marginLeft: '-20px',
              width: '200px',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {this.state.snackMessage}
          </h6>
        </div>
      </div>,
      { containerId: 'A' }
    );
  };
  handleSwitch(custom) {
    this.setState({ custom }, () => {
      console.log(this.state.custom);
    });
  }
  componentDidMount() {
    console.log(this.props.teacherSections);
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
      console.log('courses ka data', this.state.TeacherFetchedCourses);
      console.log(Array(response.data));

      this.props.TeacherSections(response.data.sections);
      console.log('sectiondata');
      console.log(this.state.SectionInfo);
    });
  }
  finalize() {
    let form = new FormData();
    form.append('csrfmiddlewaretoken', this.state.csrf_token);
    form.append('scsddc', this.state.scsddc);
    axios.post('/teacher/generate_grades/', form).then((response) => {
      if (response.data === 'Success') {
        this.setState(
          {
            type: 'success',
            snackMessage: 'Grades Finalize',
          },
          () => {
            this.notify();
          }
        );
      } else {
        this.setState(
          {
            type: 'error',
            snackMessage: 'Unable to Finalize Grades',
          },
          () => {
            this.notifyDanger();
          }
        );
      }
    });
  }
  startMarking() {
    if (this.state.Evaluation === '') {
      this.setState({
        error: 'Evaluation Type is not defined',
        showAlert: true,
        visible: false,
      });
      return;
    }

    let form = new FormData();
    form.append('csrfmiddlewaretoken', this.state.csrf_token);
    form.append('scsddc', this.state.scsddc);
    form.append('marks_type', this.state.Evaluation);
    form.append('total_marks', this.state.Tmarks);
    form.append('weightage', this.state.weightage);
    form.append('section', this.state.section);
    axios.get('/management/get_csrf');
    console.log(form);
    axios.post('/teacher/add_marks/', form).then((response) => {
      if (response.data.message !== 'Marks Open For This Section.') {
        this.setState(
          {
            type: 'error',
            snackMessage: response.data.message,
          },
          () => {
            this.notifyDanger();
          }
        );
      } else {
        this.setState(
          {
            type: 'Success',
            snackMessage: 'Evaluation Added Successfully!',
          },
          () => {
            this.notify();
          }
        );
        let form = new FormData();

        form.append('csrfmiddlewaretoken', this.state.csrf_token);
        form.append('scsddc', this.state.scsddc);
        axios.post('/teacher/get_marks_info/', form).then((response) => {
          {
            this.setState({
              marksInfo: response.data,
            });
          }
        });
      }

      this.setState({
        visible: false,
      });
    });
  }
  setCourse(e) {
    this.setState({ course: e.target.value }, () => {
      console.log(this.state.course);
    });
  }
  setSection(e) {
    let newscs = e.target[e.target.selectedIndex].getAttribute('name');
    console.log(e.target[e.target.selectedIndex].getAttribute('name'));
    this.setState(
      {
        section: e.target.value,
        scsddc: e.target[e.target.selectedIndex].getAttribute('name'),
      },
      () => {
        console.log(this.state.scsddc);
      }
    );
    let form = new FormData();
    var Total = 0;
    form.append('csrfmiddlewaretoken', this.state.csrf_token);
    form.append('scsddc', newscs);
    axios.post('/teacher/get_marks_info/', form).then((response) => {
      console.log(response.data);
      this.setState(
        {
          marksInfo: response.data,
        },
        () => {
          var len = this.state.marksInfo.length;
          for (var i = 0; i < len; i++) {
            Total = Total + this.state.marksInfo[i].weightage;
          }
          this.setState({
            Total: Total,
          });
        }
      );
    });
    console.log(this.state.marksInfo);
  }
  setEvaluation(e) {
    this.setState(
      {
        newEvaluationtype: e.target.value,
      },
      () => {
        console.log(
          this.state.newEvaluationtype + '  ' + this.state.currentEvaluationtype
        );
      }
    );
  }
  SectionBox(data) {
    if (this.state.course === data.course_code) {
      return <option name={data.scsddc}>{data.section_name} </option>;
    }
  }
  handleChange(e) {
    console.log(e.target.value + ' ' + e.target.name);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  CourseBox(data) {
    return <option name={data.course_code}>{data.course_code}</option>;
  }
  render() {
    if (
      this.props.teacher === [] ||
      this.props.teacher === null ||
      this.props.teacher === undefined
    ) {
      return <Redirect to="/auth/login" />;
    } else
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
            <ToastContainer
              enableMultiContainer
              containerId={'B'}
              position={toast.POSITION.TOP_RIGHT}
            />{' '}
            <ToastContainer
              enableMultiContainer
              containerId={'A'}
              position={toast.POSITION.TOP_RIGHT}
            />{' '}
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
                <h2 style={{ fontWeight: 'bold' }}>
                  Edit {this.state.currentEvaluationtype}'s Evaluation
                </h2>
              </ModalHeader>
              <ModalBody>
                <Row style={{ marginTop: '1rem' }}>
                  <Col xs={6}>
                    <form>
                      <Form.Label style={{ fontWeight: 'bold' }}>
                        Total Marks
                      </Form.Label>
                      <Form.Control
                        as="input"
                        value={this.state.newMarks}
                        onChange={this.handleChange}
                        name="newMarks"
                      ></Form.Control>
                    </form>
                  </Col>
                  <Col xs={6}>
                    <form>
                      <Form.Label style={{ fontWeight: 'bold' }}>
                        Weightage
                      </Form.Label>
                      <Form.Control
                        as="input"
                        value={this.state.newWtg}
                        onChange={this.handleChange}
                        name="newWtg"
                      ></Form.Control>
                    </form>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <BTTN
                  color="primary"
                  onClick={() => {
                    this.change_evaluation();
                  }}
                >
                  Save
                </BTTN>{' '}
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
                  <Col xs={9}>
                    {this.state.custom === false ? (
                      <div>
                        <form>
                          <Form.Label style={{ fontWeight: 'bold' }}>
                            Evaluation Type
                          </Form.Label>
                          <Form.Control as="select" onChange={this.setEvaluation}>
                            <option selected disabled>
                              Evaluation Type
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
                          </Form.Control>
                        </form>
                      </div>
                    ) : (
                      <div>
                        <Form.Label style={{ fontWeight: 'bold' }}>
                          Evaluation Type
                        </Form.Label>
                        <form>
                          <Input
                            name="Evaluation"
                            placeholder={'Enter Evaluation Type'}
                            style={{ width: '100%' }}
                            onChange={this.handleChange}
                          />
                        </form>
                      </div>
                    )}
                  </Col>
                  <Col xs={3}>
                    <Form.Label style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                      Custom ?
                    </Form.Label>
                    {/* <br />
                    <br /> */}
                    <Switch
                      checked={this.state.custom}
                      onChange={this.handleSwitch}
                      className="mr-2 mb-2"
                    />
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
                      <Form.Label style={{ fontWeight: 'bold' }}>
                        Weightage
                      </Form.Label>
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
            <Row>
              <Col xs={6}>
                {this.state.course === '' || this.state.section === '' ? (
                  <BTTN
                    disabled
                    primary
                    onClick={() => {
                      this.setState({
                        visible: true,
                      });
                    }}
                  >
                    <i style={{ paddingRight: '1rem' }} className="fas fa-plus"></i>
                    Add Evaluation
                  </BTTN>
                ) : (
                  <BTTN
                    primary
                    onClick={() => {
                      this.setState({
                        visible: true,
                      });
                    }}
                  >
                    <i style={{ paddingRight: '1rem' }} className="fas fa-plus"></i>
                    Add Evaluation
                  </BTTN>
                )}
              </Col>
              <Col xs={6}>
                <div style={{ float: 'right' }}>
                  {this.state.marksInfo.length === 0 || this.state.Total < 100 ? (
                    <BTTN
                      primary
                      disabled
                      onClick={() => {
                        this.finalize();
                      }}
                    >
                      <i
                        style={{ paddingRight: '1rem' }}
                        className="fas fa-check-circle"
                      ></i>
                      Finalize Grades
                    </BTTN>
                  ) : (
                    <BTTN
                      primary
                      onClick={() => {
                        this.finalize();
                      }}
                    >
                      <i
                        style={{ paddingRight: '1rem' }}
                        className="fas fa-check-circle"
                      ></i>
                      Finalize Grades
                    </BTTN>
                  )}
                </div>
              </Col>
            </Row>
            <br />
            {this.state.showAlert === true ? (
              <Message negative>
                <Message.Header>
                  <i
                    className="fas fa-exclamation-triangle"
                    style={{ paddingRight: '2rem' }}
                  ></i>
                  {this.state.error}
                  <span style={{ float: 'right' }}>
                    {' '}
                    <i
                      className="fa fa-times"
                      style={{ paddingRight: '2rem' }}
                      onClick={() => {
                        this.setState({
                          showAlert: false,
                        });
                      }}
                    ></i>
                  </span>
                </Message.Header>
              </Message>
            ) : null}
            <div style={{ height: '1rem' }}></div>
            {this.state.section !== null ? (
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
                            <th style={{ textAlign: 'center' }}>
                              Standard Deviation
                            </th>
                            <th style={{ textAlign: 'center' }}>Max</th>
                            <th style={{ textAlign: 'center' }}>Min</th>
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
                                  <td
                                    style={{
                                      textAlign: 'center',
                                      paddingTop: '2rem',
                                    }}
                                  >
                                    {obj.section}
                                  </td>
                                  <td
                                    style={{
                                      textAlign: 'center',
                                      paddingTop: '2rem',
                                    }}
                                  >
                                    {obj.total_marks}
                                  </td>
                                  <td
                                    style={{
                                      textAlign: 'center',
                                      paddingTop: '2rem',
                                    }}
                                  >
                                    {obj.weightage}
                                  </td>
                                  <td
                                    style={{
                                      textAlign: 'center',
                                      paddingTop: '2rem',
                                    }}
                                  >
                                    {obj.marks_mean.toFixed(2)}
                                  </td>
                                  <td
                                    style={{
                                      textAlign: 'center',
                                      paddingTop: '2rem',
                                    }}
                                  >
                                    {obj.marks_standard_deviation.toFixed(2)}
                                  </td>
                                  <td
                                    style={{
                                      textAlign: 'center',
                                      paddingTop: '2rem',
                                    }}
                                  >
                                    {obj.max_marks}
                                  </td>
                                  <td
                                    style={{
                                      textAlign: 'center',
                                      paddingTop: '2rem',
                                    }}
                                  >
                                    {obj.min_marks}
                                  </td>
                                  <td
                                    style={{
                                      textAlign: 'center',
                                      paddingTop: '2rem',
                                    }}
                                  >
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
                                              newMarks: obj.total_marks,
                                              newWtg: obj.weightage,
                                              newEvaluationtype: obj.marks_type,
                                              currentEvaluationtype: obj.marks_type,
                                              currentMarks: obj.total_marks,
                                              currentWtg: obj.weightage,
                                              open: true,
                                            });
                                          }}
                                        >
                                          <FaSlidersH /> Edit
                                        </DropdownItem>
                                        <DropdownItem
                                          onClick={() => {
                                            this.props.setMarksInfo(
                                              this.state.scsddc,
                                              obj.marks_type
                                            );
                                          }}
                                          href="/portal/SetMarks"
                                        >
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
            ) : (
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginTop: '2rem',
                  textAlign: 'center',
                }}
              >
                Select Course and Section First
              </div>
            )}
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

    setMarksInfo: (s, d) => {
      dispatch({ type: 'setMarksInfo', payload: { s, d } });
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
