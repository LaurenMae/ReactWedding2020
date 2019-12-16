import React from 'react';
import ReactDOM from 'react-dom';
import Rsvp from './rsvp';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
    location: {
      state: {
        email: 'jamie@email.com'
      }
    }
  }),
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Rsvp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
