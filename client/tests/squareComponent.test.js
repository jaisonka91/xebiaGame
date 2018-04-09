import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SquareComponent from '../components/squareComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('SquareComponent', () => {
  it('should render 1 child', () => {
    const wrapper = shallow(<SquareComponent><div>test</div></SquareComponent>);
    expect(wrapper.find(".square")).to.have.length(1);
  });
});
