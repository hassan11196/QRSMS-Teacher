import React, { Component } from 'react';
import NavBar from '../Navbar/Navbar';
import { Button as BTTN, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Table, Input, CardBody, Card, CardHeader } from 'reactstrap';
import { Button, Container, Row, Col, Form, Breadcrumb } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

class SetMarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csrf_token: 0,
      currentSCSDDC: '',
      currentMarksType: '',
      marksInfo: [],
      marksArray: [],
      wtgArray: [],
    };
    this.SaveMarks = this.SaveMarks.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    axios.get('/management/get_csrf').then((response) => {
      return response.data.csrftoken;
    });

    this.setState({
      csrf_token: Cookies.get('csrftoken'),
    });
  }
  onChange(e) {
    console.log(e.target.name, e.target.value);
    this.state.marksInfo.map((obj, i) => {
      if (obj.student_id === e.target.name) {
        this.setState({
          marksArray: this.state.marksArray.map((object, j) => {
            if (j == i) {
              object = e.target.value;
              this.setState({
                wtgArray: this.state.wtgArray.map((c, m) => {
                  if (m == i) {
                    c = (e.target.value / obj.total_marks) * obj.weightage;
                    console.log(e.target.value, obj.total_marks, obj.weightage);
                  }
                  return c;
                }),
              });
            }
          }),
        });
        obj.obtained_marks = e.target.value;
        obj.obtained_weightage =
          (obj.obtained_marks / obj.total_marks) * obj.weightage;
      }
    });
  }
  componentDidMount() {
    this.setState({
      currentMarksType: this.props.scsddc,
      currentSCSDDC: this.props.marks,
    });
    var arrayMarks = [];
    var arrayWtg = [];
    let form = new FormData();
    form.append('csrfmiddlewaretoken', this.state.csrf_token);
    form.append('scsddc', this.props.marks);
    form.append('marks_type', this.props.scsddc);
    axios.post('/teacher/get_marks/', form).then((response) => {
      console.log(response);
      this.setState(
        {
          marksInfo: response.data.studentMarks,
        },
        () => {
          var len = this.state.marksInfo.length;
          console.log(len);
          var a = 0;
          for (a = 0; a < len; a++) {
            arrayMarks.push(0);
            arrayWtg.push(0);
          }
          this.setState(
            {
              marksArray: arrayMarks,
              wtgArray: arrayWtg,
            },
            () => {
              console.log(this.state.marksArray, arrayMarks, this.state.wtgArray);
            }
          );
        }
      );
    });
  }
  SaveMarks() {
    console.log(this.state.marksInfo);
    let form = new FormData();
    form.append('csrfmiddlewaretoken', this.state.csrf_token);
    form.append('scsddc', this.props.marks);
    form.append('marks_type', this.props.scsddc);
    form.append('marks_data', JSON.stringify(this.state.marksInfo));

    axios.post('/teacher/update_marks/', form).then((response) => {
      console.log(response);
      this.setState({
        marksInfo: response.data.studentMarks,
      });
    });
  }
  render() {
    console.log(this.props);
    // if (this.props.teacher === []) {
    //   return <Redirect to="/auth/login" />;
    // } else
    return (
      <div>
        <NavBar />
        <Container fluid style={{ paddingTop: '2rem' }}>
          <div style={{ width: 'auto', paddingBottom: '1rem' }}>
            <Breadcrumb>
              <Breadcrumb.Item href="/dashboard/home">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Manage Marks</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          {/* <Container> */}
          <div style={{ paddingBottom: '1rem' }}>
            <BTTN
              primary
              onClick={() => {
                this.SaveMarks();
              }}
            >
              Save
            </BTTN>
          </div>
          <Card style={{ border: '1px solid' }}>
            <CardHeader style={{ backgroundColor: 'black', margin: '-1px' }}>
              <span>
                <h3 style={{ fontWeight: 'bold', color: 'white' }}>Student Marks</h3>
              </span>
            </CardHeader>
            <CardBody>
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
                    <span style={{ textAlign: 'center' }}>S No.</span>
                  </th>
                  <th style={{ textAlign: 'center' }}>ID</th>
                  {/* <th style={{ textAlign: 'center' }}>Name</th> */}
                  <th style={{ textAlign: 'center' }}>Marks</th>
                  <th style={{ textAlign: 'center' }}>Weightage</th>
                </thead>
                <tbody>
                  {this.state.marksInfo.map((obj, i) => {
                    return (
                      <tr key={i} style={{ textAlign: 'center' }}>
                        <td>{i + 1}</td>
                        <td>{obj.student_id}</td>
                        {/* <td></td> */}
                        <td style={{ textAlign: 'center' }}>
                          <Input
                            style={{ width: '5rem', textAlign: 'center' }}
                            name={obj.student_id}
                            value={this.state.marksArray[i]}
                            onChange={this.onChange}
                          />
                        </td>
                        <td>{this.state.wtgArray[i]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
        {/* </Container> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    scsddc: state.sectionMarksSemester,
    marks: state.marksType,
    teacher: state.teacher,
    teacherSections: state.TeacherSections,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    TeacherSections: (data) => {
      dispatch({ type: 'TeacherSections', payload: { data } });
    },

    setMarksInfo: (s, d) => {
      dispatch({ type: 'setMarksInfo', payload: { s, d } });
    },

    changeid: (s) => {
      dispatch({ type: 'ChangeId', payload: { s } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetMarks);
