import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Container from '../container';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe('Container', () => {
  it('should render 1 child', () => {
    const wrapper = shallow(<Container positionSet={[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]}/>);
    expect(wrapper).to.have.length(1);
  });

  // it('resolve click test', () => {
  //   const handleResolve = sinon.spy();
  //   const wrapper = shallow(<Container positionSet={[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]}/>);
  //   wrapper.find('.buttonClick').simulate('click');
  //   expect(handleResolve.callCount).to.eql(1);
  // });

});
