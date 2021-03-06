import React, { Component } from 'react';
import NavBar from '../Navbar/Navbar';
import './SetMarks.css';
import { Button as BTTN, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Table, Input, CardBody, Card, CardHeader } from 'reactstrap';
import { Button, Container, Row, Col, Form, Breadcrumb } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      copyMarksInfo: [],
      marksArray: [],
      wtgArray: [],
      showSave: false,
    };
    this.onSearch = this.onSearch.bind(this);
    this.SaveMarks = this.SaveMarks.bind(this);
    this.onChange = this.onChange.bind(this);
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
  onSearch(e) {
    console.log(e.target.value);
    if (e.target.value === '') {
      this.setState({ copyMarksInfo: this.state.marksInfo });
    }
    const searchValue = e.target.value.toLowerCase();
    var newData = [];
    this.state.marksInfo.some((item) => {
      let name = item.student_id;
      if (name.toLowerCase().includes(searchValue)) {
        newData.push(item);
      }
    });
    if (newData) {
      this.setState({
        copyMarksInfo: newData,
      });
    } else {
      this.setState({
        copyMarksInfo: [],
      });
    }
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
    this.state.marksInfo.map(
      (obj, i) => {
        if (obj.student_id === e.target.name) {
          if (obj.total_marks < parseInt(e.target.value)) {
            return;
          }
          this.setState({
            showSave: true,
            marksArray: this.state.marksArray.map((object, j) => {
              if (j == i) {
                object = e.target.value;
                this.setState({
                  wtgArray: this.state.wtgArray.map((c, m) => {
                    if (m == i) {
                      c = (e.target.value / obj.total_marks) * obj.weightage;
                    }
                    return c;
                  }),
                });
              }
            }),
          });
          obj.obtained_marks = e.target.value;
          obj.obtained_weightage =
            (e.target.value / obj.total_marks) * obj.weightage;
        }
      },
      () => {
        this.setState({
          copyMarksInfo: this.state.marksInfo,
        });
      }
    );
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
          copyMarksInfo: response.data.studentMarks,
        },
        () => {
          var len = this.state.marksInfo.length;
          console.log(len);
          var a = 0;
          for (a = 0; a < len; a++) {
            arrayMarks.push(this.state.marksInfo[a].obtained_marks);
            arrayWtg.push(this.state.marksInfo[a].obtained_weightage);
          }
          this.setState(
            {
              marksArray: arrayMarks,
              wtgArray: arrayWtg,
            },
            () => {
              // console.log(this.state.marksArray, arrayMarks, this.state.wtgArray);
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
      if (response.data.Status === 'Success') {
        this.setState(
          {
            type: 'success',
            snackMessage: 'Marks Saved Successfully',

            showSave: false,
          },
          () => {
            this.notify();
          }
        );
      } else {
        this.setState(
          {
            type: 'error',
            snackMessage: 'Unable to save Marks',
          },
          () => {
            this.notifyDanger();
          }
        );
      }
    });
  }
  render() {
    // console.log(this.props);
    // if (this.props.teacher === []) {
    //   return <Redirect to="/auth/login" />;
    // } else
    return (
      <div>
        <NavBar />
        <Container fluid style={{ paddingTop: '2rem' }}>
          <div style={{ width: 'auto', paddingBottom: '0' }}>
            <Breadcrumb>
              <Breadcrumb.Item href="/dashboard/home">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/portal/Marks">Manage Marks</Breadcrumb.Item>
              <Breadcrumb.Item active>Set Marks</Breadcrumb.Item>
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
          <Container style={{ marginLeft: '-15px' }}>
            <Row>
              <Col xs={9}>
                <div style={{ paddingBottom: '1rem' }}>
                  {this.state.showSave ? (
                    <BTTN
                      primary
                      onClick={() => {
                        this.SaveMarks();
                      }}
                    >
                      <i
                        className="fas fa-save"
                        style={{ paddingRight: '1rem' }}
                      ></i>
                      Save
                    </BTTN>
                  ) : (
                      <BTTN
                        disabled
                        primary
                        onClick={() => {
                          this.SaveMarks();
                        }}
                      >
                        <i
                          className="fas fa-save"
                          style={{ paddingRight: '1rem' }}
                        ></i>
                      Save
                      </BTTN>
                    )}
                </div>
              </Col>
              <Col xs={3}>
                <div style={{ paddingRight: '0.4rem' }} className="search">
                  <span
                    className="fa fa-search"
                    style={{
                      position: 'absolute',
                      paddingLeft: '1.5rem',
                      top: '13px',
                      left: '18px',
                      fontSize: '15px',
                    }}
                  ></span>
                  <Input
                    type="search"
                    onChange={this.onSearch}
                    style={{ width: '96%', marginLeft: '1rem' }}
                  />
                </div>
              </Col>
            </Row>
            <Card style={{ border: '1px solid' }}>
              <CardHeader style={{ backgroundColor: 'black', margin: '-1px' }}>
                <span>
                  <h3 style={{ fontWeight: 'bold', color: 'white' }}>
                    Student Marks
                  </h3>
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
                    <th style={{ textAlign: 'center' }}>Serial No.</th>
                    <th style={{ textAlign: 'center' }}>ID</th>
                    <th style={{ textAlign: 'center' }}>Name</th>
                    <th style={{ textAlign: 'center' }}>Total Marks</th>
                    <th style={{ textAlign: 'center' }}>Marks</th>
                    <th style={{ textAlign: 'center' }}>Weightage</th>
                  </thead>
                  <tbody>
                    {this.state.copyMarksInfo.map((obj, i) => {
                      return (
                        <tr key={i} style={{ textAlign: 'center' }}>
                          <td>{i + 1}</td>
                          <td>{obj.student_id}</td>
                          <td>{obj.student_name}</td>
                          <td>{obj.total_marks}</td>
                          <td style={{ width: '5rem', textAlign: 'center' }}>
                            <Input
                              style={{
                                width: '5rem',
                                height: '1.75rem',
                                textAlign: 'center',
                              }}
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
        </Container>
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
