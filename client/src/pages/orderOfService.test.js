import React from 'react';
import ReactDOM from 'react-dom';
import OrderOfService from './orderOfService';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<OrderOfService />, div);
  ReactDOM.unmountComponentAtNode(div);
});
