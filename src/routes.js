import QRAttendance from './Dashboard/Attendance/qr';
import Index from 'views/Index.jsx';
import ManualAttendance from './Dashboard/Attendance/manual';
import Profile from 'views/examples/Profile.jsx';
import Maps from 'views/examples/Maps.jsx';
import Register from 'views/examples/Register.jsx';
import Login from 'views/examples/Login.jsx';
import Tables from 'views/examples/Tables.jsx';
import Icons from 'views/examples/Icons.jsx';
import ManageMarks from './Dashboard/Marks/ManageMarks.js';
import SetMarks from './Dashboard/Marks/SetMarks.js';
import DashboardHome from './Dashboard/home/index';
import CustomLogin from './login';

var routes = [
  // {
  //   path: '/index',
  //   name: 'Dashboard',
  //   icon: 'ni ni-tv-2 text-primary',
  //   component: Index,
  //   layout: '/admin',
  // },
  {
    path: '/home',
    name: 'Home',
    icon: 'ni ni-circle-08 text-white',
    component: DashboardHome,
    layout: '/dashboard',
  },
  {
    path: '/manual-attendance',
    name: 'Maunal Attendance',
    icon: 'ni ni-single-copy-04 text-white',
    component: ManualAttendance,
    layout: '/portal',
  },
  {
    path: '/QR-attendance',
    name: 'QR Attendance',
    icon: 'fas fa-qrcode text-white',
    component: QRAttendance,
    layout: '/portal',
  },
  {
    path: '/Marks',
    name: 'Manage Marks',
    icon: 'fas fa-poll-h text-white',
    component: ManageMarks,
    layout: '/portal',
  },
  {
    path: '/SetMarks',
    name: 'Set Marks',
    icon: 'ni ni-tv-2 text-white',
    component: SetMarks,
    layout: '/portal',
  },
  // {
  //   path: '/icons',
  //   name: 'Icons',
  //   icon: 'ni ni-planet text-blue',
  //   component: Icons,
  //   layout: '/admin',
  // },
  // {
  //   path: '/maps',
  //   name: 'Maps',
  //   icon: 'ni ni-pin-3 text-orange',
  //   component: Maps,
  //   layout: '/admin',
  // },
  // {
  //   path: '/user-profile',
  //   name: 'User Profile',
  //   icon: 'ni ni-single-02 text-yellow',
  //   component: Profile,
  //   layout: '/admin',
  // },
  // {
  //   path: '/tables',
  //   name: 'Tables',
  //   icon: 'ni ni-bullet-list-67 text-red',
  //   component: Tables,
  //   layout: '/admin',
  // },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   icon: 'ni ni-circle-08 text-pink',
  //   component: Register,
  //   layout: '/auth',
  // },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-circle-08 text-white',
    component: CustomLogin,
    layout: '/accounts',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-circle-08 text-white',
    component: CustomLogin,
    layout: '/auth',
  },
];
export default routes;
