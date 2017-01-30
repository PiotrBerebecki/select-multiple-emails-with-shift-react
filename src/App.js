import React, { Component } from 'react';
import axios from 'axios';
import Item from './Item';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      items: null, 
    };
  }
  
  componentDidMount() {
    const items = [
      { text: 'This is an inbox layout', isChecked: false },
      { text: 'Check one item', isChecked: false },
      { text: 'Hold down your Shift key', isChecked: false },
      { text: 'Check a lower item', isChecked: false },
      { text: 'Items should be checked', isChecked: false }
    ];
    
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const newItems = response.data.map(user => {
          return {
            text: user.email,
            isChecked: false
          };
        });
        
        this.setState({
          items: [
            ...items,
            ...newItems
          ]
        });
      })
      .catch(error => {
        console.log(error);
      });
      
    
    // setTimeout(() => {
    //   this.setState({
    //     items: [
    //       { text: 'This is an inbox layout', isChecked: false },
    //       { text: 'Check one item', isChecked: true }
    //     ]
    //   });
    // }, 2000);
  }
  
  handleClick(e) {
    console.log('parent', e.target);
  }
  
  render() {
    let renderItems = null;
    const { items } = this.state;
    
    if (items) {
      renderItems = items.map((item, index) => {
        return <Item 
                 key={index} 
                 text={item.text} 
                 onClick={this.handleClick}
                 isChecked={item.isChecked}
               />;
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
