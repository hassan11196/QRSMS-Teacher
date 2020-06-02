import React from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Message } from 'semantic-ui-react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Spinner,
} from 'reactstrap';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
class FacultyLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidLogin: false,
      loading: false,
      username: '',
      password: '',
      csrf_token: 0,
      status: '',
      user_auth: false,
      facultydata: [],
      loginURL: '/teacher/login/',
      home_jsonURL: '/teacher/home_json/',
    };

    this.handlechange = this.handlechange.bind(this);
    this.handlelogin = this.handlelogin.bind(this);
  }

  handlechange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  LoadingSpinner() {
    return (
      <div>
        <Spinner animation="border" style={{ color: 'black' }} /> <br />{' '}
        <small>Logging In</small>
      </div>
    );
  }
  handlelogin(e) {
    console.log('Start mein set hone se pehle');
    console.log(this.state.loading);

    this.setState({
      loading: true,
      csrf_token: Cookies.get('csrftoken'),
    });
    // console.log(this.state)
    e.preventDefault();
    var formd = new FormData();
    formd.append('csrfmiddlewaretoken', this.state.csrf_token);
    formd.append('username', this.state.username);
    formd.append('password', this.state.password);
    axios
      .post(this.state.loginURL, formd)
      .then((res) => {
        axios.get(this.state.home_jsonURL).then((response) => {
          console.log(response.data);
          if (response.data.status === 'success') {
            console.log(response.data);
            this.props.changeid(response.data);
            console.log(this.props);
            this.setState({
              status: response.data.status,
              facultydata: response.data,
            });
          }
        });
      })
      .catch((error) => {
        console.log(error.response.data.status);
        this.setState({
          invalidLogin: true,
          error: error.response.data.status,
        });
      })
      .finally((response) => {
        this.setState({ loading: false });
      });
  }
  get_csrf_token() {
    axios.get('/management/get_csrf').then((response) => {
      Cookies.set('csrftoken', response.data.csrfToken);
      this.setState({
        csrf_token: response.data.csrfToken,
      });
    });
  }
  componentDidMount() {
    this.get_csrf_token();
  }

  render() {
    if (this.state.status === 'success') {
      return <Redirect to="/dashboard/home" />;
    }
    return (
      <>
        {/* <div>
          {this.state.invalidLogin === true ? (
            <Message negative>
              <Message.Header>
                <i className="fas fa-exclamation-triangle"></i>
                {this.state.error}
              </Message.Header>
            </Message>
          ) : null}
        </div> */}

        <Col lg="5" md="7">
          <Card className="shadow border-0">
            <div style={{ margin: '1rem' }}>
              {this.state.invalidLogin === true ? (
                <Message negative>
                  <Message.Header style={{ textAlign: 'center' }}>
                    <i
                      className="fas fa-exclamation-triangle"
                      style={{ marginRight: '1rem' }}
                    ></i>
                    <span style={{ textAlign: 'center' }}>
                      Invalid ID or Password
                    </span>
                  </Message.Header>
                </Message>
              ) : null}
            </div>
            <CardHeader style={{ border: 'none' }} className="bg-transparent pb-5">
              <div className="text-muted text-center mb-3">
                QRSMS - Teacher Portal
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="username"
                      onChange={this.handlechange}
                      placeholder="NU Email"
                      type="email"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      name="password"
                      onChange={this.handlechange}
                      placeholder="Password"
                      type="password"
                    />
                  </InputGroup>
                </FormGroup>
                {/* <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div> */}
                <div className="text-center">
                  {this.state.loading ? (
                    this.LoadingSpinner()
                  ) : (
                    <Button
                      className="my-4"
                      style={{
                        borderRadius: '0.5rem',
                        color: 'white',
                        backgroundColor: 'black',
                      }}
                      type="button"
                      color="black"
                      onClick={this.handlelogin}
                    >
                      Sign in
                    </Button>
                  )}
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              ></a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    TeacherSections: (data) => {
      dispatch({ type: 'TeacherSections', payload: { data } });
    },

    changeid: (s) => {
      console.log(s, 'ahsan');
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
export default connect(mapStateToProps, mapDispatchToProps)(FacultyLogin);
