import React, { Component } from 'react';
import NavBar from '../Navbar/Navbar';
import { Button as BTTN, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import 'mdbreact/dist/css/mdb.css';
import { Redirect } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Button, Container, Row, Col, Form, Breadcrumb } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

class ManageMarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      TeacherFetchedCourses: [],
      Evaluation: '',
    };
    this.CourseBox = this.CourseBox.bind(this);
    this.SectionBox = this.SectionBox.bind(this);
    this.setEvaluation = this.setEvaluation.bind(this);
  }
  componentDidMount() {
    axios.get('/person/get_csrf').then((response) => {
      return response.data.csrftoken;
    });

    this.setState({
      csrf_token: Cookies.get('csrftoken'),
    });

    axios.get('/teacher/sections/').then((response) => {
      this.setState({
        TeacherFetchedCourses: response.data.sections,
      });
      console.log('courses ka data');
      console.log(Array(response.data));

      this.props.TeacherSections(response.data.sections);
      console.log('sectiondata');
      console.log(this.state.SectionInfo);
    });
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
    console.log(data);
    //if (data.course_code === this.state.code)
    return <option name={data.section_name}>{data.section_name}</option>;
  }

  CourseBox(data) {
    return <option name={data.course_code}>{data.course_code}</option>;
  }
  render() {
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
          <Row>
            <Col md="3">
              <form>
                <Form.Label style={{ fontWeight: 'bold' }}>Semester</Form.Label>
                <Form.Control as="select">
                  <option>Fall 2019</option>
                  <option>Spring 2019</option>
                </Form.Control>
              </form>
            </Col>

            <Col md="3">
              <form>
                <Form.Label style={{ fontWeight: 'bold' }}>Course</Form.Label>
                <Form.Control as="select" onChange={this.handleCourse}>
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
                  {this.state.code !== '' ? (
                    this.props.teacherSections.map((c) => {
                      return this.SectionBox(c);
                    })
                  ) : (
                    <option>Select A Course First</option>
                  )}
                </Form.Control>
              </form>
            </Col>
            <Col md="3">
              <form>
                <Form.Label style={{ fontWeight: 'bold' }}>
                  Evaluation Type
                </Form.Label>
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
          <div
            style={{
              paddingLeft: '1rem',
              paddingTop: '1rem',
              paddingBottom: '1rem',
              float: 'right',
            }}
          ></div>
          <br />
          <br />
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
