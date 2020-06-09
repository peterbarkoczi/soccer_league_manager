import React from "react";
import { shallow } from "enzyme";
import App from "../App";

describe('App', () => {
    it('should render a <div />', function () {
        const wrapper = shallow(<App />);
        expect(wrapper.find('div.App').length).toEqual(1);
    });
})