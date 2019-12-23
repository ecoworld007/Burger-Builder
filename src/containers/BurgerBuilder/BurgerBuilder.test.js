import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuidler';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurberBuilder/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} onInitPurchase={() => {}}/>);
  });

  it('should display <Burger/>, <BuildControls/> and <OrderSummary/> elements when ingredients are fetched', () => {
    wrapper.setProps({ings: {salad: 0}, price: 4});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});