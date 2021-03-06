import React from 'react';
import { Route, Switch } from 'react-router-dom';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';

// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.jsx';
import AdminFooter from 'components/Footers/AdminFooter.jsx';
import Sidebar from 'components/Sidebar/Sidebar.jsx';

import routes from 'routes.js';

class DashboardLayout extends React.Component {
  componentDidMount() {
    document.body.classList.add('bg-white');
  }
  componentWillUnmount() {
    document.body.classList.remove('bg-white');
  }
  getRoutes(routes) {
    return routes.map((prop, key) => {
      if (prop.layout === '/dashboard') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  }
  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: '/portal/index',
            imgSrc: require('assets/img/brand/argon-react.png'),
            imgAlt: '...',
          }}
        />
        <div style={{backgroundColor:'#133469', height:'70rem'}} className="main-content" ref="mainContent">
          {/* <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          /> */}
          <Switch>{this.getRoutes(routes)}</Switch>
          {/* <Container fluid>
            <AdminFooter />
          </Container> */}
        </div>
      </>
    );
  }
}

export default DashboardLayout;
