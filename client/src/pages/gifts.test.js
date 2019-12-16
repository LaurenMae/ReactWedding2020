import React from 'react';
import ReactDOM from 'react-dom';
import Gifts from './gifts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Gifts />, div);
  ReactDOM.unmountComponentAtNode(div);
});
