import React from 'react';

class Popup extends React.Component {
    render() {
      const styles = {
        top: 133,
        left: 467.422,
       minWidth: 234.211
      }

      return (
        <div className='rbc-overlay' style = {styles}>
          <div className=' popup_inner'>
           
          <button className = "btn btn-primary" onClick={this.props.closePopup}>Create New Brief</button>
          <button className = "btn btn-primary" onClick={this.props.closePopup}>View Briefs</button>
          </div>
        </div>
      );
    }
  }
  
  export default Popup;