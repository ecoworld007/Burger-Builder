import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems/>);
  });

  it('should return 2 <NavigationItem/> elements when isAuthenticated is false', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should return 3 <NavigationItem/> elements when isAuthenticated is true', () => {
    // wrapper = shallow(<NavigationItems isAuthenticated/>);
    wrapper.setProps({ isAuthenticated: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should return logout <NavigationItem/> elements when isAuthenticated is true', () => {
    wrapper.setProps({ isAuthenticated: true});
    expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem> )).toEqual(true);
  });
});