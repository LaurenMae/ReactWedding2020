import RSVP from './pages/rsvp';
import Details from './pages/details';
import Home from './pages/home';
import Gifts from './pages/gifts';
import OrderOfService from './pages/orderOfService';
import Menu from './pages/menu';
import BridalParty from './pages/bridalParty';

export const routes = [
    {
      path: "/",
      component: Home
    },
    {
      path: "/Details",
      component: Details
    },
    {
      path: "/RSVP",
      component: RSVP
    },
    {
      path: "/Gifts",
      component: Gifts
    },
    {
      path: "/OrderofService",
      component: OrderOfService
    },
    {
      path: "/Menu",
      component: Menu
    },
    {
      path: "/BridalParty",
      component: BridalParty
    }
];