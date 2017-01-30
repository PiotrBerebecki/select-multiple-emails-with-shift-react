import React, { Component } from 'react';

class Item extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      isChecked: false
    };
  }
  
  componentDidMount() {
    this.setState({
      isChecked: this.props.isChecked
    });
  }
    
  handleClick(e) {
    const { target } = e;
    
    if (target.nodeName === 'INPUT') {
      this.props.onClick(e);
    }
  }
  
  render() {
    return (
      
      <div className="item">
         <label onClick={this.handleClick}>
          <input
            type="checkbox"
            checked={this.props.isChecked}
            onChange={() => {}}
          />
         </label>
         <p>{this.props.text}</p>
      </div>
      
    );
  } 
}

export default Item;
