import React from 'react';
import { render, cleanup, fireEvent} from 'react-testing-library';
import App from './App';

afterEach(cleanup);

describe('Test Dijkstra component', () => {
  it('renders app', () => {
    const container = render(<App />);
    expect(container).toMatchSnapshot()
  });

  it('should not display result paragraph in snapshot when only one input is added', async () => {
    const {container} = render(<App/>);
    // @ts-ignore
    const input: HTMLInputElement  = container.querySelector('input.startNode');

    fireEvent.change(input, {target: {value: 'h'}});
    expect(container).toMatchSnapshot()
  });

  it('should fire handleOnChange when something is typed in the input', async () => {
      const {container} = render(<App/>);
      // @ts-ignore
      const input: HTMLInputElement  = container.querySelector('input.startNode');

      fireEvent.change(input, {target: {value: 'h'}});
      expect(input.value).toBe('H')
  });

});
