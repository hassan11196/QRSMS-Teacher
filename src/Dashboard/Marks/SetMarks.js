import React, { Component } from 'react';
import NavBar from '../Navbar/Navbar';
import { Button as BTTN, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Button, Container, Row, Col, Form, Breadcrumb } from 'react-bootstrap';
// import { FaChartBar, FaBook, FaWrench, FaHome, FaUser, FaBookReader, FaChalkboardTeacher, FaRegListAlt, FaMarkdown, FaUserGraduate, FaFilePdf } from "react-icons/fa";
import { connect } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';


class SetMarks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            csrf_token: 0,
            currentSCSDDC:'',
            currentMarksType:'',
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
    componentDidMount() {
        this.setState({
            currentMarksType:this.props.marks,
            currentSCSDDC:this.props.scsddc
        })
        

        let form = new FormData();
        form.append('csrfmiddlewaretoken', this.state.csrf_token);
        form.append('scsddc', this.state.currentSCSDDC);
        form.append('marks_type', 'Mid 1');
        axios.post('/teacher/get_marks/', form).then((response) => {
        console.log(response.data)
            this.setState({
            marksInfo: response.data,
        });
    });
    }
    render() {
        return (
            <div>

            </div>
        )
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
  
      setMarksInfo:(s,d)=>{
        dispatch({type: 'setMarksInfo',payload:{s,d}})
      },
  
      changeid: (s) => {
        console.log(s);
        dispatch({ type: 'ChangeId', payload: { s } });
      },
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(SetMarks);
