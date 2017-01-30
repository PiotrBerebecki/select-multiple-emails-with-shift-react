import React, { Component } from 'react';
import axios from 'axios';
import Item from './Item';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      messages: null, 
    };
  }
  
  componentDidMount() {
    const messages = [
      'This is an inbox layout',
      'Check one item',
      'Hold down your Shift key',
      'Check a lower item',
      'Everything in-between should also be set to checked / unchecked'
    ];
    
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const users = response.data.map(user => user.email);
        this.setState({
          messages: [
            ...messages,
            ...users
          ]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  handleClick(e) {
    console.log('parent', e.target);
  }
  
  render() {
    let renderItems = null;
    const { messages } = this.state;
    
    if (messages) {
      renderItems = messages.map((message, index) => {
        return <Item key={index} text={message} onClick={this.handleClick}/>;
      });
    }
    
    return (
      
      <div className="inbox">
          { renderItems }
      </div>
    
    );
  }
}

export default App;
