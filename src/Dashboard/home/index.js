import React from 'react';
import { FaHome, FaMobileAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  ListGroupItem,
  Container,
  Row,
  Col,
} from 'reactstrap';
import D from '../../assets/img/d.png';
import { CardTitle } from 'reactstrap';
import { Navbar, Nav } from 'react-bootstrap';
import NavbarPage from '../Navbar/Navbar';
// core components
import axios from 'axios';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      batch: '',
      degree_name_enrolled: '',
      degree_short_enrolled: '',
      department_name_enrolled: '',
      uni_mail: '',
      current_semester: '',
      warning_count: '',
      attending_semester: false,
      student_year: '',
      admission_section: '',
      semester_code: '',
      user: '',
      home_jsonURL: '/teacher/home_json/',
      user_data: [],
    };
  }
  componentDidMount() {
    console.log(this.props);
    axios.get(this.state.home_jsonURL).then((response) => {
      console.log(response.data);
      if (response.data.status === 'success') {
        this.setState({
          user_data: response.data,
        });
      }
    });
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
        <>
          <div>
            <NavbarPage />

            <Container className="mt-7" fluid style={{ paddingBottom: '3rem' }}>
              <Row>
                <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                  <Card
                    style={{ border: '1px solid black' }}
                    className="card-profile shadow"
                  >
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img alt="..." className="rounded-circle" src={D} />
                          </a>
                        </div>
                      </Col>
                    </Row>
                    <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                      <div className="d-flex justify-content-between"></div>
                    </CardHeader>
                    <CardBody className="pt-0 pt-md-4">
                      <Row>
                        <div className="col">
                          <div className="card-profile-stats d-flex justify-content-center mt-md-5"></div>
                        </div>
                      </Row>
                      <div className="text-center">
                        <h3>
                          {this.state.user_data.first_name}{' '}
                          {this.state.user_data.last_name}
                        </h3>
                        <div className="h5 font-weight-300">
                          <i className="ni location_pin mr-2" />
                          Karachi, Pakistan
                        </div>
                        <div className="h5 mt-4">
                          <i className="ni business_briefcase-24 mr-2" />
                          {this.state.degree_name_enrolled}
                        </div>
                        <div>
                          <i className="ni education_hat mr-2" />
                          FAST NUCES Karachi
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col className="order-xl-1" xl="8">
                  <Card className="shadow" style={{ border: '1px solid black' }}>
                    <CardHeader className="bg-white border-0">
                      <Row className="align-items-center">
                        <Col xs="8">
                          <h2 style={{ fontWeight: '500' }} className="mb-0">
                            My Profile
                          </h2>
                        </Col>
                        <hr style={{ marginTop: '1rem', width: '500%' }} />
                      </Row>
                    </CardHeader>
                    <CardBody style={{ marginTop: '-50px' }}>
                      <h4 className="heading-small text-muted mb-4">
                        <span style={{ paddingRight: '0.7rem' }}>
                          <FaHome />
                        </span>{' '}
                        User information
                      </h4>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name:
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.first_name}
                            </span>
                          </Col>
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name:
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.last_name}
                            </span>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Date of Birth:
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.DOB}
                            </span>
                          </Col>
                          <Col lg="6" style={{ paddingBottom: '1rem' }}>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address:
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.nu_email}
                            </span>
                          </Col>
                        </Row>
                      </div>
                      <hr className="my-4" />
                      {/* Address */}
                      <h4 className="heading-small text-muted mb-4">
                        <span style={{ paddingRight: '0.7rem' }}>
                          <FaMobileAlt />
                        </span>{' '}
                        Contact information
                      </h4>
                      <div className="pl-lg-4">
                        <Row>
                          <Col md="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address:
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.current_address}
                            </span>
                          </Col>

                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City:
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.permanent_city}
                            </span>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: '1rem   ' }}>
                          {' '}
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country:
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.current_country}
                            </span>
                          </Col>
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              CNIC:
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.CNIC}
                            </span>
                          </Col>
                        </Row>
                        <Row style={{ paddingTop: '1rem   ' }}>
                          {' '}
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Mobile No:
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.mobile_contact}
                            </span>
                          </Col>
                          <Col lg="6">
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Emergency Contact:
                            </label>
                            <span
                              style={{
                                fontWeight: '500',
                                paddingLeft: '0.6rem',
                                fontSize: '13px',
                              }}
                            >
                              {' '}
                              {this.state.user_data.emergency_contact}
                            </span>
                          </Col>
                        </Row>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    teacher: state.teacher,
    teacherSections: state.TeacherSections,
  };
};
export default connect(mapStateToProps)(Home);
