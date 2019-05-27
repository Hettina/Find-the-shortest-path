import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Dijkstra from '../dijkstra';

afterEach(cleanup);

describe('Test Dijkstra component', () => {
    it('renders when empty string is passed in fot start and end', () => {
        const container = render(<Dijkstra start={''} end={''}/>);
        expect(container).toMatchSnapshot()
    });
    it('renders when empty string is passed in for just the end', () => {
        const container = render(<Dijkstra start={'A'} end={''}/>);
        expect(container).toMatchSnapshot()
    });
    it('renders when values are passed in for start and end', () => {
        const container = render(<Dijkstra start={'A'} end={'C'}/>);
        expect(container).toMatchSnapshot()
    });
});

