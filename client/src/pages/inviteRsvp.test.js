import React from 'react';
import ReactDOM from 'react-dom';
import InviteRsvp from './InviteRsvp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const history = {
    location: {
      state: {

      }
    }
  }
  ReactDOM.render(<InviteRsvp history={history} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
