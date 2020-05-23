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

    }
    render() {
        return (
            <di>

            </di>
        )
    }
}

export default SetMarks