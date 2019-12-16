import React from 'react';
import ReactDOM from 'react-dom';
import RsvpConfirmation from './rsvpConfirmation';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const history = {
    location: {
      state: {
        email: 'jamie@email.com',
        attendance: 'attending'
      }
    }
  };

  ReactDOM.render(<RsvpConfirmation history={history} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
