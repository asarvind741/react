import React from 'react';

class Success extends React.Component {

    render() {
        if (this.props.isSubmit) {
            return (
                <div>
                    <h3>Successfull...</h3>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3>Failed...</h3>
                </div>
            )
        }

    }
}

export default Success;