import React, { Component } from 'react';
import Dijkstra from './Dijkstra/dijkstra'
import './App.css';
const diagram = require('./assets/diagram.jpg');

class App extends Component<ComponentProps, ComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            startNode: '',
            endNode: ''
        };
    }

    handleOnChange= (event:React.FormEvent<HTMLInputElement>) : void =>{
        event.preventDefault();
        let value = event.currentTarget.value.toUpperCase();
        // @ts-ignore
        this.setState({[event.target.name]:  value});
    };


    render() {
        const { startNode, endNode } = this.state;
        return (
            <div className="App">
                {<img src={diagram} className="diagram" alt="graph diagram" />}
                <h1 className="App-header">
                    Find the Shortest Path
                </h1>

                <div>
                    <label htmlFor="startNode">Please enter a start point</label>
                    <input
                        type="text"
                        name="startNode"
                        className="startNode"
                        value={startNode}
                        onChange={(event) => this.handleOnChange(event)}
                    />
                    <label htmlFor="endNode">Please enter an end point</label>
                    <input
                        type="text"
                        name="endNode"
                        value={endNode}
                        onChange={(event) => this.handleOnChange(event)}
                    />
                    {(startNode!=='' && endNode!=='') && (
                        <Dijkstra start={startNode} end={endNode}/>
                    )}
                </div>
            </div>
        );
    }
}

interface ComponentProps { }
interface ComponentState {
    startNode: string
    endNode: string
}

export default App;
