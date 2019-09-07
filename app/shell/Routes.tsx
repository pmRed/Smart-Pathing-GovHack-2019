import { Home, Map } from '@material-ui/icons';
import HomePage from '../pages/index';
import GMapPage from '../pages/gmap';

const Routes = [
  {
    path: '/',
    sidebarName: 'Home',
    navbarName: 'Home',
    icon: Home,
    component: HomePage
  },
  {
    path: '/gmap',
    sidebarName: 'Sydney',
    navbarName: 'Sydney',
    icon: Map,
    component: GMapPage 
  }
];

export default Routes;