import { Home, Map } from '@material-ui/icons';
import HomePage from '../pages/index';
import HeatMapPage from '../pages/gmap';
import GreenMapPage from '../pages/green';

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
    sidebarName: 'Heat Map',
    navbarName: 'Heat Map',
    icon: Map,
    component: HeatMapPage 
  },
  {
    path: '/green',
    sidebarName: 'Geenery Map',
    navbarName: 'Greenery Map',
    icon: Map,
    component: GreenMapPage 
  }
];

export default Routes;