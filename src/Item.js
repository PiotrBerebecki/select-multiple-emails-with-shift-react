import React, { Component } from 'react';

class Item extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isChecked: false
    };
  }
  
  handleClick(e) {
    const { target } = e;
    
    if (target.nodeName === 'INPUT') {
      console.log('child', target);
    }
  }
  
  render() {
    return (
      
      <div className="item">
         <label onClick={this.handleClick}>
          <input
            type="checkbox"
            checked={this.state.isChecked}
          />
         </label>
         <p>{this.props.text}</p>
      </div>
      
    );
  } 
}

export default Item;
