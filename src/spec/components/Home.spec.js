/* eslint-env mocha*/

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import {mount} from 'enzyme';
import Home from './../../components/Home';

expect.extend(expectJSX);

describe('Home Component', () => {
    // it('should render the container', () => {
    //     let component = mount(<Home/>);
    //     expect(component.find('.container').length).toEqual(1);
    // })
});
