import React from 'react';
import ReactDOM from 'react-dom';
import BridalParty from './bridalParty';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BridalParty />, div);
  ReactDOM.unmountComponentAtNode(div);
});
