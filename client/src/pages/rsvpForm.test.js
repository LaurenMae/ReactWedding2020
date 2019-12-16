import React from 'react';
import ReactDOM from 'react-dom';
import RsvpForm from './rsvpForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const values = {
    fistName: 'Jamie',
    lastName: 'Morris'
  };

  ReactDOM.render(<RsvpForm submit={() => {}} values={values} setValues={() => {}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
