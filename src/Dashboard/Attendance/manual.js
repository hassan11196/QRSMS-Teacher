import React, { Component } from 'react';
import NavBar from '../Navbar/Navbar';
import { Button as BTTN, Icon } from 'semantic-ui-react';
import { Table, Input } from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Breadcrumb,
} from 'react-bootstrap';
// import { FaChartBar, FaBook, FaWrench, FaHome, FaUser, FaBookReader, FaChalkboardTeacher, FaRegListAlt, FaMarkdown, FaUserGraduate, FaFilePdf } from "react-icons/fa";
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

class AttendanceEntry {
  constructor() {}
}

const attendance_data = {
  campus_name: 'Karachi',
  semester: 'FALL2019',
  course_code: 'CS309',
  student_cnt: 6,
  attendance_cnt: 4,
  student_list: [
    { name: 'Hassan', uid: '17K-3654' },
    { name: 'Ahmed', uid: '17K-3669' },
    { name: 'Ahsan', uid: '17K-3650' },
    { name: 'Noman', uid: '17K-3755' },
    { name: 'Shameer', uid: '17K-3664' },
    { name: 'Manga', uid: '17K-3798' },
  ],
  attendance_list: [
    {
      lno: 1,
      ldate: '17/09/2019',
      credit_hours: 3,
      student_list: [
        { uid: '17K-3654', status: 'P' },
        { uid: '17K-3669', status: 'A' },
        { uid: '17K-3650', status: 'A' },
        { uid: '17K-3755', status: 'A' },
        { uid: '17K-3664', status: 'A' },
        { uid: '17K-3798', status: 'A' },
      ],
    },
    {
      lno: 2,
      ldate: '18/09/2019',
      credit_hours: 3,
      student_list: [
        { uid: '17K-3654', status: 'P' },
        { uid: '17K-3669', status: 'P' },
        { uid: '17K-3650', status: 'A' },
        { uid: '17K-3755', status: 'A' },
        { uid: '17K-3664', status: 'P' },
        { uid: '17K-3798', status: 'P' },
      ],
    },
    {
      lno: 3,
      ldate: '19/09/2019',
      credit_hours: 3,
      student_list: [
        { uid: '17K-3654', status: 'P' },
        { uid: '17K-3669', status: 'A' },
        { uid: '17K-3650', status: 'A' },
        { uid: '17K-3755', status: 'A' },
        { uid: '17K-3664', status: 'A' },
        { uid: '17K-3798', status: 'P' },
      ],
    },
    {
      lno: 4,
      ldate: '20/09/2019',
      credit_hours: 3,
      student_list: [
        { uid: '17K-3654', status: 'A' },
        { uid: '17K-3669', status: 'A' },
        { uid: '17K-3650', status: 'A' },
        { uid: '17K-3755', status: 'A' },
        { uid: '17K-3664', status: 'A' },
        { uid: '17K-3798', status: 'P' },
      ],
    },
  ],
};

let students = [
  {
    Sno: 1,
    id: 'k173650',
    name: 'Ahsan',
    regdate: '21-Sept-18',
    status: ['P', 'A', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  },
  {
    Sno: 2,
    id: 'k173755',
    name: 'Noman',
    regdate: '1-Sept-18',
    status: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  },
  {
    Sno: 3,
    id: 'k173654',
    name: 'Hassan',
    regdate: '2-Sept-18',
    status: ['P', 'P', 'A', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  },
  {
    Sno: 4,
    id: 'k173621',
    name: 'Mustafa',
    regdate: '3-Sept-18',
    status: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  },
  {
    Sno: 5,
    id: 'k173745',
    name: 'Huzaiafa',
    regdate: '20-Sept-18',
    status: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  },
  {
    Sno: 6,
    id: 'k173795',
    name: 'Danish',
    regdate: '11-Sept-18',
    status: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  },
  {
    Sno: 7,
    id: 'k173652',
    name: 'Qadri',
    regdate: '8-Sept-18',
    status: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  },
  {
    Sno: 8,
    id: 'k173850',
    name: 'Junaid',
    regdate: '7-Sept-18',
    status: ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  },
];
class ManualAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: undefined,
      fetched_data: [],
      students_api: undefined,
      class_api: undefined,
      students_sheets: [],
      class_attendances: [],
      fetched_attendance_data: undefined,
      copy: undefined,
      fetched_status: false,
      code: '',
      section: '',
      attData: '',
      ssdc: '',
      hour: '',
      csrfmiddlewaretoken: '',
    };
    this.handleCourse = this.handleCourse.bind(this);
    this.setSection = this.setSection.bind(this);
    this.handleAttState = this.handleAttState.bind(this);
    this.setHour = this.setHour.bind(this);
    // this.onSearch = this.onSearch.bind(this);
  }
  // onSearch(e) {
  //   console.log(e.target.value)
  //   if (e.target.value === '') {
  //     this.setState({ fetched_attendance_data: this.state.copy });
  //   }
  //   const searchValue = e.target.value.toLowerCase();
  //   var newData = [];
  //   console.log("copy",this.state.copyList)
  //   this.state.fetched_attendance_data.student_sheets.some(item => {
  //       let name=item.student.user.first_name + ' ' + item.student.user.last_name
  //       if (name.toLowerCase().includes(searchValue)) {
  //         newData.push(item);
  //       }
  //     });
  //     if (newData) {
  //       this.setState({
  //         fetched_attendance_data: newData
  //       });
  //     } else {
  //       this.setState({
  //         fetched_attendance_data:undefined
  //       });
  //     }

  // }
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

      this.props.TeacherSections(response.data.sections);
      console.log('sectiondata');
      console.log(this.state.SectionInfo);
    });

    // let query_section = {
    //   city: 'Karachi',
    //   campus: 'MainCampus',
    //   department: 'ComputerSciences',
    //   degree: 'BS(CS)',
    //   semester_code: 'FALL2019',
    //   course_code: this.state.code,
    //   section: this.state.section,
    // };

    // let config = {
    //   headers: {
    //     DataType: 'json',
    //     'content-type': 'application/json',
    //   },
    //   // body: qs.stringify(query_section)
    // };

    // axios
    //   .post('/teacher/get_attendance/', query_section, config)
    //   .then((response) => {
    //     console.log('attendace data arha h');
    //     console.log(response.data);
    //     this.setState({
    //       // Expected student_api
    //       //   {
    //       //     "status": "success",
    //       //     "student_sheets": [
    //       //         {
    //       //             "url": "http://localhost:8000/api/studentinfosection/5/",
    //       //             "student": "http://localhost:8000/rest/students/17K-3654/",
    //       //             "attendance_sheet": "http://localhost:8000/api/attendance_sheet/19/",
    //       //             "mark_sheet": "http://localhost:8000/api/marksheet/16/"
    //       //         },
    //       //         {
    //       //             "url": "http://localhost:8000/api/studentinfosection/6/",
    //       //             "student": "http://localhost:8000/rest/students/17K-3650/",
    //       //             "attendance_sheet": "http://localhost:8000/api/attendance_sheet/20/",
    //       //             "mark_sheet": "http://localhost:8000/api/marksheet/17/"
    //       //         }
    //       //     ],
    //       //     "class_sheet": [
    //       //         {
    //       //             "url": "http://localhost:8000/api/sectionattendance/20/",
    //       //             "class_date": "2019-11-27",
    //       //             "attendance_slot": 1,
    //       //             "attendance_time_start": "03:10:40.528560",
    //       //             "attendance_interval_allowed": 30,
    //       //             "qr_change_interval": 1800,
    //       //             "duration_hour": 1,
    //       //             "scsddc": "E_CS309_FALL2019_BS(CS)_ComputerSciences_MainCampus_Karachi",
    //       //             "section": "E"
    //       //         },
    //       //         {
    //       //             "url": "http://localhost:8000/api/sectionattendance/21/",
    //       //             "class_date": "2020-01-06",
    //       //             "attendance_slot": 1,
    //       //             "attendance_time_start": "02:09:14.900296",
    //       //             "attendance_interval_allowed": 30,
    //       //             "qr_change_interval": 1800,
    //       //             "duration_hour": 1,
    //       //             "scsddc": "E_CS309_FALL2019_BS(CS)_ComputerSciences_MainCampus_Karachi",
    //       //             "section": "E"
    //       //         },
    //       //         {
    //       //             "url": "http://localhost:8000/api/sectionattendance/22/",
    //       //             "class_date": "2020-01-06",
    //       //             "attendance_slot": 2,
    //       //             "attendance_time_start": "02:09:35.765007",
    //       //             "attendance_interval_allowed": 30,
    //       //             "qr_change_interval": 1800,
    //       //             "duration_hour": 1,
    //       //             "scsddc": "E_CS309_FALL2019_BS(CS)_ComputerSciences_MainCampus_Karachi",
    //       //             "section": "E"
    //       //         }
    //       //     ]
    //       // }
    //       fetched_attendance_data: response.data.attendance_data,
    //       fetched_status: true,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log('something Bad Happend');
    //     return;
    //   });
  }

  ///////////////////
  handleAttState(e) {
    let url = e.target.options[e.target.selectedIndex].getAttribute('url');
    let state = e.target.options[e.target.selectedIndex].getAttribute('state');
    url = url.replace('http://localhost:8000', '');
    url = url.replace('http://qrsms-v1.herokuapp.com', '');
    console.log('URL Before Replace', url);
    // console.log(window.location.protocol);
    // if (window.location.protocol === 'https:') {
    //   console.log(url);
    //   url = url.replace('http', 'https');
    //   console.log(url);
    // }
    // console.log('URL Aftet Replace', url);
    axios
      .get(url)
      .then((response) => {
        this.setState({
          attData: response.data,
        });
      })
      .then(() => {
        this.setState((prevState) => ({
          attData: {
            // object that we want to update
            ...prevState.attData, // keep all other key-value pairs
            state: state, // update the value of specific key
          },
        }));
      })
      .then(() => {
        axios
          .put(url, this.state.attData)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error.response.data.status);
            this.setState({
              snackMessage: error.response.data.status,
            });
            this.notifyDanger();
          });
      });
  }
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
  ////////////////////
  getNewAttendanceEntry(attendance_list, student_list) {
    // let new_lno = attendance_list.length + 1;
    // let ldate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    // let new_student_list = student_list.map((student) => {
    //   return { uid: student.uid, status: 'A' };
    // });
    // return {
    //   lno: new_lno,
    //   ldate: ldate,
    //   student_list: new_student_list,
    //   credit_hours: 3,
    // };
  }
  renderTable() {
    return (
      <Table className=" align-items-center table-dark table-flush" responsive>
        <thead className="thead-dark">
          <tr>
            <th style={{ fontWeight: '700', fontSize: '15px' }} colSpan="2"></th>
            <th style={{ fontWeight: '700', fontSize: '15px' }}>Lecture No.</th>
            {this.state.fetched_data.attendance_list.map((day_att, i) => {
              return (
                <th style={{ fontWeight: '700', fontSize: '15px' }} key={i}>
                  {day_att.lno}
                </th>
              );
            })}
          </tr>
          <tr>
            <th style={{ fontWeight: '700', fontSize: '15px' }} colSpan="2"></th>
            <th style={{ fontWeight: '700', fontSize: '15px' }}>Lecture Date.</th>
            {this.state.fetched_data.attendance_list.map((day_att, i) => {
              return (
                <th style={{ fontWeight: '700', fontSize: '15px' }} key={i}>
                  {day_att.ldate}
                </th>
              );
            })}
          </tr>
          <tr>
            <th style={{ fontWeight: '700', fontSize: '15px' }} colSpan="2"></th>
            <th style={{ fontWeight: '700', fontSize: '15px' }}>Credit Hours</th>
            {this.state.fetched_data.attendance_list.map((day_att, i) => {
              return (
                <th style={{ fontWeight: '700', fontSize: '15px' }} key={i}>
                  {day_att.credit_hours}
                </th>
              );
            })}
          </tr>
          <tr style={{ border: 'thin solid white' }}>
            <th style={{ fontWeight: '700', fontSize: '15px' }}>S no.</th>
            <th style={{ fontWeight: '700', fontSize: '15px' }}>Name</th>
            <th style={{ fontWeight: '700', fontSize: '15px' }}>Roll No </th>

            {this.state.fetched_data.attendance_list.map((day_att, i) => {
              return (
                <th style={{ fontWeight: '700', fontSize: '15px' }} key={i}></th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {this.state.fetched_data.student_list.map((student, index) => {
            return (
              <tr key={index}>
                <td style={{ fontSize: '15px', fontWeight: 'bold' }}>{index + 1}</td>
                <td style={{ fontSize: '15px', fontWeight: 'bold' }}>
                  {student.name}
                </td>
                <td style={{ fontSize: '15px', fontWeight: 'bold' }}>
                  {student.uid}
                </td>
                {this.state.fetched_data.attendance_list
                  .reduce((starting_arr, current_element) => {
                    starting_arr.push(
                      current_element.student_list.filter((stud) =>
                        stud.uid === student.uid ? true : false
                      )
                    );
                    return starting_arr;
                  }, [])
                  .map((student_data_for_day, i) => {
                    return (
                      <td key={i} style={{ fontSize: '15px', fontWeight: 'bold' }}>
                        <select>
                          {student_data_for_day[0].status}
                          <option
                            // style={{ width: '5rem', height: '3rem' }}
                            selected={
                              student_data_for_day[0].status === 'A' ? true : false
                            }
                          >
                            A
                          </option>
                          <option
                            // style={{
                            //   minWidth: '5rem',
                            //   maxWidth: '5rem',
                            //   minHeight: '1.75rem',
                            //   maxHeight: '1.75rem',
                            // }}
                            selected={
                              student_data_for_day[0].status === 'P' ? true : false
                            }
                          >
                            P
                          </option>
                          <option>L</option>
                        </select>
                      </td>
                    );
                  })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  renderFetchedTable() {
    if (this.state.fetched_status === false) {
      return <h1>Data Not Fetched</h1>;
    }
    return (
      <Table
        className=" align-items-center table-dark table-flush border"
        responsive
      >
        <thead className="thead-dark">
          <tr>
            <th style={{ fontWeight: '700' }} colSpan="2"></th>
            <th style={{ fontWeight: '700' }}>Lecture No.</th>
            {this.state.fetched_attendance_data !== undefined ? (
              this.state.fetched_attendance_data.class_sheet.map(
                (day_att, index) => {
                  return (
                    <th key={index} style={{ fontWeight: '700' }}>
                      {this.state.fetched_attendance_data.class_sheet.length - index}
                    </th>
                  );
                }
              )
            ) : (
              <h5></h5>
            )}
          </tr>
          <tr>
            <th style={{ fontWeight: '700' }} colSpan="2"></th>
            <th style={{ fontWeight: '700' }}>Lecture Slot</th>
            {this.state.fetched_attendance_data !== undefined ? (
              this.state.fetched_attendance_data.class_sheet.map(
                (day_att, index) => {
                  return (
                    <th key={index} style={{ fontWeight: '700' }}>
                      {day_att.attendance_slot}
                    </th>
                  );
                }
              )
            ) : (
              <h5></h5>
            )}
          </tr>
          <tr>
            <th style={{ fontWeight: '700' }} colSpan="2"></th>
            <th style={{ fontWeight: '700' }}>Lecture Date.</th>
            {this.state.fetched_attendance_data !== undefined ? (
              this.state.fetched_attendance_data.class_sheet.map((day_att, i) => {
                return (
                  <th style={{ fontWeight: '700' }} key={i}>
                    {day_att.class_date}
                  </th>
                );
              })
            ) : (
              <h5></h5>
            )}
          </tr>
          <tr>
            <th style={{ fontWeight: '700' }} colSpan="2"></th>
            <th style={{ fontWeight: '700' }}>Duration Hours</th>
            {this.state.fetched_attendance_data !== undefined ? (
              this.state.fetched_attendance_data.class_sheet.map((day_att, i) => {
                return (
                  <th style={{ fontWeight: '700' }} key={i}>
                    {day_att.duration_hour}
                  </th>
                );
              })
            ) : (
              <h5></h5>
            )}
          </tr>
          <tr style={{ border: 'thin solid white' }}>
            <th style={{ fontWeight: '700' }}>S no.</th>
            <th style={{ fontWeight: '700' }}>Name</th>
            <th style={{ fontWeight: '700' }}>Roll No </th>

            {this.state.fetched_attendance_data !== undefined ? (
              this.state.fetched_attendance_data.class_sheet.map((day_att, i) => {
                return (
                  <th style={{ fontWeight: '700', fontSize: '15px' }} key={i}></th>
                );
              })
            ) : (
              <h5></h5>
            )}
          </tr>
        </thead>
        <tbody>
          {console.log('Ahsan', this.state.fetched_attendance_data.student_sheets)}
          {this.state.fetched_attendance_data !== undefined ? (
            this.state.fetched_attendance_data.student_sheets.map(
              (student_data, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {student_data.student.user.first_name +
                        ' ' +
                        student_data.student.user.last_name}
                    </td>
                    <td>{student_data.student.uid}</td>

                    {student_data.attendance_sheet.attendance.length > 0 ? (
                      this.state.fetched_attendance_data.class_sheet.map(
                        (class_att) => {
                          let attendance_of_stud = student_data.attendance_sheet.attendance.filter(
                            (att_obj) =>
                              att_obj.class_date === class_att.class_date &&
                              att_obj.attendance_slot == class_att.attendance_slot
                          );
                          console.log('Hooooooo');
                          console.log(attendance_of_stud);
                          if (attendance_of_stud.length == 0) {
                            return (
                              <td>
                                <Form.Control as="select">
                                  <option state="NR">NR</option>
                                </Form.Control>
                              </td>
                            );
                          } else {
                            if (attendance_of_stud[0].state == 'A')
                              return (
                                <td>
                                  <Form.Control
                                    as="select"
                                    onChange={this.handleAttState}
                                  >
                                    <option
                                      url={attendance_of_stud[0].url}
                                      state="A"
                                    >
                                      {attendance_of_stud[0].state}
                                    </option>
                                    <option
                                      url={attendance_of_stud[0].url}
                                      state="P"
                                    >
                                      P
                                    </option>
                                    <option
                                      url={attendance_of_stud[0].url}
                                      state="L"
                                    >
                                      L
                                    </option>
                                  </Form.Control>
                                </td>
                              );
                            else if (attendance_of_stud[0].state == 'P')
                              return (
                                <td>
                                  <Form.Control
                                    as="select"
                                    onChange={this.handleAttState}
                                  >
                                    <option
                                      url={attendance_of_stud[0].url}
                                      state="P"
                                    >
                                      {attendance_of_stud[0].state}
                                    </option>
                                    <option
                                      url={attendance_of_stud[0].url}
                                      state="A"
                                    >
                                      A
                                    </option>
                                    <option
                                      url={attendance_of_stud[0].url}
                                      state="L"
                                    >
                                      L
                                    </option>
                                  </Form.Control>
                                </td>
                              );
                            else if (attendance_of_stud[0].state == 'L')
                              return (
                                <td>
                                  <Form.Control
                                    as="select"
                                    onChange={this.handleAttState}
                                  >
                                    <option
                                      url={attendance_of_stud[0].url}
                                      state="L"
                                    >
                                      {attendance_of_stud[0].state}
                                    </option>
                                    <option
                                      url={attendance_of_stud[0].url}
                                      state="P"
                                    >
                                      P
                                    </option>
                                    <option
                                      url={attendance_of_stud[0].url}
                                      state="A"
                                    >
                                      A
                                    </option>
                                  </Form.Control>
                                </td>
                              );
                          }
                        }
                      )
                    ) : (
                      <h5></h5>
                    )}
                  </tr>
                );
              }
            )
          ) : (
            <h5></h5>
          )}
        </tbody>
      </Table>
    );
  }

  addAttendance() {
    var sec = this.state.ssdc.split('_');
    let form = new FormData();
    console.log(this.state.section);
    form.append('csrfmiddlewaretoken', this.state.csrf_token);
    form.append('slot', this.state.hour);
    form.append(
      'scsddc',
      this.state.section + '_' + this.state.code + '_' + this.state.ssdc
    );
    form.append('section', this.state.section);
    form.append('course_code', this.state.code);
    axios
      .post('/teacher/start_attendance/', form)
      .then((response) => {
        console.log(response);
        /**
       * Created by MeePwn
       * https://github.com/maybewaityou
       *
       * description:
       *
      
       */
        let query_section = {
          city: 'Karachi',
          campus: 'MainCampus',
          department: 'ComputerSciences',
          degree: 'BS(CS)',
          semester_code: 'Spring2020',
          course_code: this.state.code,
          section: sec[0],
        };

        let config = {
          headers: {
            DataType: 'json',
            'content-type': 'application/json',
          },
          // body: qs.stringify(query_section)
        };
        console.log('check', query_section);
        axios
          .post('/teacher/get_attendance/', query_section, config)
          .then((response) => {
            console.log(response.data);
            console.log(
              response.data.attendance_data.student_sheets[0].attendance_sheet.scsddc
            );
            this.setState({
              fetched_attendance_data: response.data.attendance_data,
              copy: response.data.attendance_data,
              fetched_status: true,
              ssdc:
                response.data.attendance_data.student_sheets[0].attendance_sheet
                  .scsddc,
              course_code: response.data.attendance_data.course_code,
              section: response.data.attendance_data.section,
            });
          })
          .catch((err) => {
            console.log(err);
            console.log('something Bad Happend');
            return;
          });
        /**
         * Created by MeePwn
         * https://github.com/maybewaityou
         *
         * description:
         *
         */
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        // window.location.reload()
        // let sheet = this.state.fetched_data;
        // console.log(sheet);
        // // let new_entry = this.getNewAttendanceEntry(
        // //   sheet.attendance_list,
        // //   sheet.student_list
        // // );
        // // sheet.attendance_list.push(new_entry);
        // this.setState({
        //   fetched_data: this.state.fetched_attendance_data,
        // });
        this.getAttendanceOfSection();
      });
    // let sheet = this.state.fetched_data;
    // let new_entry = this.getNewAttendanceEntry(sheet.attendance_list, sheet.student_list);
    // sheet.attendance_list.push(new_entry);
    // this.setState({
    //   fetched_data: sheet
    // })
  }

  renderTableData() {
    return this.state.students.map((students, index) => {
      const { Sno, id, name, regdate, status } = students; //destructuring
      return (
        <tr key={id}>
          <td>{Sno}</td>
          <td>{id}</td>
          <td>{name}</td>
          <td>{regdate}</td>
          {status.map((s) => {
            return <td>{s}</td>;
          })}
        </tr>
      );
    });
  }
  setSection(e) {
    this.setState(
      {
        section: e.target.options[e.target.selectedIndex].getAttribute('name'),
      },
      () => {
        console.log(this.state.section);
      }
    );
    let sec = e.target.options[e.target.selectedIndex].getAttribute('name');
    this.setState(
      {
        section: sec,
      },
      () => {
        console.log(this.state.section);
        this.getAttendanceOfSection();
      }
    );
    // this.setState(
    //   (oldState) => ({
    //     section: sec,
    //   }),
    //   () => {
    //     console.log(this.state.section);
    //   }
    // );
  }
  getAttendanceOfSection() {
    console.log(this.state.section);
    let query_section = {
      city: 'Karachi',
      campus: 'MainCampus',
      department: 'ComputerSciences',
      degree: 'BS(CS)',
      semester_code: 'Spring2020',
      course_code: this.state.code,
      section: this.state.section,
    };

    let config = {
      headers: {
        DataType: 'json',
        'content-type': 'application/json',
      },
      // body: qs.stringify(query_section)
    };
    console.log('check', query_section);
    axios
      .post('/teacher/get_attendance/', query_section, config)
      .then((response) => {
        console.log('attendace data arha h');
        console.log(response.data);
        //console.log(attendance_data.student_sheets[0].attendance_sheet.scsddc);
        // console.log(
        //   response.data.attendance_data.student_sheets[0].attendance_sheet.scsddc
        // );
        let fetched_data = response.data.attendance_data;

        let sorted_class_sheet = response.data.attendance_data.class_sheet
          .sort((first, second) => {
            var n = Date(first.class_date) - Date(second.class_date);
            if (n !== 0) {
              return n;
            } else {
              return first.attendance_slot - second.attendance_slot;
            }
          })
          .reverse();
        fetched_data.class_sheet = sorted_class_sheet;
        this.setState({
          fetched_attendance_data: fetched_data,
          copy: response.data.attendance_data,
          fetched_status: true,
          ssdc: 'Spring2020_BS(CS)_ComputerSciences_MainCampus_Karachi', // Hardcoded ssdc
          course_code: response.data.attendance_data.course_code,
          section: response.data.attendance_data.section,
        });
      })
      .catch((err) => {
        console.log(err);
        console.log('something Bad Happend');
        return;
      });
  }
  SectionBox(data) {
    if (data.course_code === this.state.code)
      return <option name={data.section_name}>{data.section_name}</option>;
  }
  handleCourse(e) {
    let course_code = e.target.options[e.target.selectedIndex].getAttribute('name');

    this.setState((oldState) => ({
      code: course_code,
    }));
  }
  CourseBox(data) {
    return <option name={data.course_code}>{data.course_code}</option>;
  }
  setHour = (e) => {
    let h = e.target.options[e.target.selectedIndex].getAttribute('name');

    this.setState((oldState) => ({
      hour: h,
    }));

    console.log(this.state.hour);
  };
  render() {
    console.log('HGe');
    console.log(this.props.teacherSections);
    console.log('HGe');
    if (
      this.props.teacherSections === [] ||
      this.props.teacherSections === null ||
      this.props.teacherSections === undefined
    ) {
      return <Redirect to="/auth/login" />;
    } else
      return (
        <div>
          <NavBar />
          <ToastContainer
            enableMultiContainer
            containerId={'A'}
            position={toast.POSITION.TOP_RIGHT}
          />{' '}
          <Container fluid>
            <br />
            <div style={{ width: 'auto', paddingBottom: '2rem' }}>
              <Breadcrumb>
                <Breadcrumb.Item href="/dashboard/home">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Manual Attendance</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Row>
              <Col md="4">
                <form>
                  <Form.Label style={{ fontWeight: 'bold' }}>
                    Attendance Hour
                  </Form.Label>
                  <Form.Control as="select" onChange={this.setHour}>
                    <option>Select Hour</option>
                    <option name="1">08:00 AM - 09:00</option>
                    <option name="2">09:00 AM - 10:00</option>
                    <option name="3">10:00 AM - 11:00</option>
                    <option name="4">11:00 AM - 12:00</option>
                    <option name="5">12:00 PM - 01:00</option>
                    <option name="6">01:00 PM - 02:00</option>
                    <option name="7">02:00 PM - 03:00</option>
                    <option name="8">03:00 PM - 04:00</option>
                  </Form.Control>
                </form>
              </Col>
              <Col md="4">
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
              <Col md="4">
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
            </Row>
            <Row>
              <Col xs={9}>
                <div
                  style={{
                    paddingTop: '2rem',
                    paddingBottom: '1rem',
                  }}
                >
                  {this.state.hour === '' ||
                  this.state.code === '' ||
                  this.state.section === '' ? (
                    <BTTN disabled primary onClick={() => this.addAttendance()}>
                      <i
                        style={{ paddingRight: '1rem' }}
                        className="fas fa-plus"
                      ></i>
                      Add Attendance
                    </BTTN>
                  ) : (
                    <BTTN primary onClick={() => this.addAttendance()}>
                      <i
                        style={{ paddingRight: '1rem' }}
                        className="fas fa-plus"
                      ></i>
                      Add Attendance
                    </BTTN>
                  )}
                </div>
              </Col>
              <Col xs={3}>
                {/* <div className="search">
      <span className="fa fa-search" style={{position: "absolute",
  paddingLeft:"1.5rem",
  top: "11px",
  left: "7px",
  fontSize: "15px"}}></span>  
      <Input type="search" onChange={this.onSearch} style={{width:'96%',marginLeft:'1rem'}}/>
      </div> */}
              </Col>
            </Row>

            <div style={{ marginLeft: '-2px', marginTop: '1rem' }}>
              <Card style={{ border: '1px solid black' }}>
                <Card.Header style={{ marginTop: '-1px', backgroundColor: 'black' }}>
                  <span>
                    <h3 style={{ fontWeight: 'bold', color: 'white' }}>
                      Student Attendance
                    </h3>
                  </span>
                </Card.Header>
                <Card.Body>{this.renderFetchedTable()}</Card.Body>
              </Card>
            </div>
          </Container>
          {/* </Container> */}
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
  console.log(state);
  return {
    teacher: state.teacherinfo,
    teacherSections: state.TeacherSections,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManualAttendance);
