import React, { Component } from 'react';
import NavBar from '../Navbar/Navbar';
import { Button as BTTN, Icon, Input } from 'semantic-ui-react';
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
      course: '',
      section: '',
      csrf_token: 0,
      weightage: 0,
      Tmarks: 0,
      scsddc: '',
      marksInfo: '',
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
    axios.get('/management/get_csrf').then((response) => {
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
  startMarking() {
    let form = new FormData();
    form.append('csrfmiddlewaretoken', this.state.csrf_token);
    form.append('scsddc', this.state.scsddc);
    form.append('marks_type', this.state.Evaluation);
    form.append('total_marks', this.state.Tmarks);
    form.append('weightage', this.state.weightage);
    form.append('section', this.state.section);
    axios.get('/management/get_csrf');
    axios.post('/teacher/add_marks/', form).then((response) => {
      console.log(response.data);
    });
  }
  setCourse(e) {
    this.setState({ course: e.target.value });
  }
  setSection(e) {
    this.setState({
      section: e.target.value,
      scsddc: e.target[e.target.selectedIndex].getAttribute('name'),
    });
    let form = new FormData();
    console.log(e.target[e.target.selectedIndex].getAttribute('name'));
    form.append('csrfmiddlewaretoken', this.state.csrf_token);
    form.append('scsddc', e.target[e.target.selectedIndex].getAttribute('name'));
    axios
      .post('http://localhost:3000/teacher/get_marks_info', form)
      .then((response) => {
        this.setState({
          marksInfo: response.data,
        });
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
    //if (data.course_code === this.state.code)
    return <option name={data.scsddc}>{data.section_name}</option>;
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
          <br />
          <br />
          <Row>
            <Form.Label style={{ fontWeight: 'bold' }}>Add New Marks</Form.Label>

            <Col md="3">
              <form>
                <Form.Label style={{ fontWeight: 'bold' }}>Total Marks</Form.Label>
                <Form.Control
                  as="input"
                  onChange={this.handleChange}
                  name="Tmarks"
                ></Form.Control>
              </form>
            </Col>
            <Col md="3">
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
          <BTTN primary onClick={this.startMarking}>
            Generate Marks
          </BTTN>
        </Container>
        <div>Ahsan Bhai marksInfo Ka data yahan table men chipka do</div>
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
