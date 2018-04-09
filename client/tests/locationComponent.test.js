import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LocationComponent from '../components/locationComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('LocationComponent', () => {
  it('should render 1 child', () => {
    const wrapper = shallow(<LocationComponent text={"S"}/>);
    expect(wrapper.find(".locations")).to.have.length(1);
  });
  it('should not render any child', () => {
    const wrapper = shallow(<LocationComponent />);
    expect(wrapper.find(".locations")).to.have.length(0);
  });
});
