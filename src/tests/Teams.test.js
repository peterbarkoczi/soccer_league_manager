import React from "react";
import { shallow } from "enzyme";
import Teams from "../components/pages/Teams";

describe('Teams', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Teams />);
    });

    it('should render a <Teams /> component', function () {
        expect(wrapper.find('div.teams').length).toEqual(1);
    });
})