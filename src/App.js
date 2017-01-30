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
      indexOfPreviousCheckbox: null,
      indexOfCurrentCheckbox: null
    };
  }
  
  componentDidMount() {
    const items = [
      { text: '0 This is an inbox layout', isChecked: false },
      { text: '1 Check one item', isChecked: false },
      { text: '2 Hold down your Shift key', isChecked: false },
      { text: '3 Check a lower item', isChecked: false },
      { text: '4 Items should be checked', isChecked: false }
    ];
    
    const newItemsTest = [
    ];
    
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        // const newItems = response.data.map(user => {
        //   return {
        //     text: user.email,
        //     isChecked: false
        //   };
        // });
        
        this.setState({
          items: [
            ...items,
            ...newItemsTest
          ]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  handleClick(e) {
    const { target } = e;
    const itemIndex = Number(target.id);
    const { items } = this.state;
    const isCurrentChecked = !items[itemIndex].isChecked;
        
    this.setState({
      items: [
        ...items.slice(0, itemIndex),
        Object.assign({}, items[itemIndex], {isChecked: isCurrentChecked}),
        ...items.slice(itemIndex + 1)
      ],
      indexOfCurrentCheckbox: itemIndex
    });
  }
  
  render() {
    let renderItems = null;
    const { items } = this.state;
    
    if (items) {
      renderItems = items.map((item, index) => {
        return <Item 
                 key={index}
                 id={index}
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
