import RSVP from './pages/rsvp';
import Hotels from './pages/hotels';
import Home from './pages/home';
import Gifts from './pages/gifts';
import OrderOfService from './pages/orderOfService';
import Menu from './pages/menu';
import BridalParty from './pages/bridalParty';
import InviteRsvp from './pages/InviteRsvp';
import RsvpConfirmation from './pages/rsvpConfirmation';

export const routes = [
    {
      path: "/",
      component: Home
    },
    {
      path: "/Home",
      component: Home
    },
    {
      path: "/Hotels",
      component: Hotels
    },
    {
      path: "/RSVP",
      component: RSVP
    },
    {
      path: "/RSVP/:invitee",
      component: InviteRsvp
    },
    {
      path: "/RSVP/:invitee/thankyou",
      component: RsvpConfirmation
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