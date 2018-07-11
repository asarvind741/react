import React from 'react';
import Countdown from 'react-countdown-now';

// Random component

class Timer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            isCompleted: false
        }

        this.timeUpFunction = this.timeUpFunction.bind(this)
    }

    timeUpFunction(){
        var event = {currentTarget:{value:'submit'}}
        this.props.onAnswerSelected(event);
    }

    shouldComponentUpdate(){
        return false;
    }

    render() {
        const Completionist = () => <span>You are good to go!</span>;

        // Renderer callback with condition
        const renderer = ({ hours, minutes, seconds }) => {
                return <span>{hours}:{minutes}:{seconds}</span>;
        };
        return(
        <Countdown
            date={Date.now() + 5000}
            onComplete = { this.timeUpFunction}
            renderer={this.renderer}
        />
        )
    }

}

export default Timer;



