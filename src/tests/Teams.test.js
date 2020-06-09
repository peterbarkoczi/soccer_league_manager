import React from "react";
import {shallow, mount} from "enzyme";
import Teams from "../components/pages/Teams";
import {TeamsProvider} from "../components/contexts/TeamsContext";

describe('Teams', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <TeamsProvider>
                <Teams/>
            </TeamsProvider>);
    });

    it('should render a <Teams /> component', function () {
        expect(wrapper.find('.team').length).toEqual(11);
    });
})