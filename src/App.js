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
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.indexOfCurrentCheckbox === this.state.indexOfCurrentCheckbox;
  }
  
  handleClick(event) {
    const { target, shiftKey } = event;
    const itemIndex = Number(target.id);
    const { items } = this.state;
    const isCurrentChecked = !items[itemIndex].isChecked;
            
    this.setState({
      items: [
        ...items.slice(0, itemIndex),
        {...items[itemIndex], isChecked: isCurrentChecked},
        ...items.slice(itemIndex + 1)
      ],
      indexOfCurrentCheckbox: itemIndex
    }, () => {
      this.processShift(shiftKey, itemIndex, isCurrentChecked);
      this.setState({
        indexOfPreviousCheckbox: itemIndex
      });
    });
  }
  
  processShift(shiftKey, itemIndex, isCurrentChecked) {
    if (shiftKey && this.state.indexOfPreviousCheckbox !== null) {
      let min = Math.min(this.state.indexOfPreviousCheckbox, itemIndex);
      let max = Math.max(this.state.indexOfPreviousCheckbox, itemIndex);
      
      const updatedItems = this.state.items.map((item, index) => {
        if (index >= min && index <= max && index !== itemIndex) {
          return {...item, isChecked: isCurrentChecked};
        }
        return item;
      });
      
      this.setState({
        items: updatedItems
      });
    }
  }
  
  render() {
    console.log('render parent');
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
