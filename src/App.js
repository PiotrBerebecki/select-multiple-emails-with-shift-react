import React, { Component } from 'react';
import './App.css';
import Item from './Item';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [
        'This is an inbox layout',
        'Check one item',
        'Hold down your Shift key',
        'Check a lower item',
        'Everything in-between should also be set to checked / unchecked'
      ]
    };
  }
  
  render() {
    
    const renderItems = this.state.messages.map((message, index) => {
      return <Item key={index} text={message}/>;
    });
    
    return (
      
      <div className="inbox">
          
          { renderItems }
          
      </div>
    
    );
  }
}

export default App;
