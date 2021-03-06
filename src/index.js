import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'assets/vendor/nucleo/css/nucleo.css';
import 'assets/vendor/@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/argon-dashboard-react.scss';

import AdminLayout from 'layouts/Admin.jsx';
import AuthLayout from 'layouts/Auth.jsx';

import DashboardLayout from './Dashboard/layout/Layout';
const istate = {
  selectstatus: false,
  teacher: [],
  TeacherSections: null,
  marksType: null,
  sectionMarksSemester: null,
  currentCourse:null,
  currentSection:null,
  currentSCSDDC:null,
};
const reducer = (state = istate, action) => {
  console.log(action);
  if (action.type === 'TeacherSections') {
    return {
      ...state,
      TeacherSections: action.payload.data,
    };
  }else if (action.type === 'changeCourse') {
    return {
      ...state,
      currentCourse:action.payload.s,
      currentSection:action.payload.d,
      currentSCSDDC:action.payload.f
    };
  }
   else if (action.type === 'ChangeId')
    return {
      ...state,
      teacher: action.payload.s,
    };
  else if (action.type === 'logout') {
    return {
      state: [],
    };
  } else if (action.type === 'setMarksInfo') {
    return {
      ...state,
      marksType: action.payload.s,
      sectionMarksSemester: action.payload.d,
    };
  }
  return state;
};
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const peristedState = loadState();
const store = createStore(reducer, peristedState);

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};

store.subscribe(() => {
  saveState(store.getState());
});
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/portal" render={(props) => <AdminLayout {...props} />} />
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <Route
          path="/dashboard"
          render={(props) => <DashboardLayout {...props} />}
        />
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
