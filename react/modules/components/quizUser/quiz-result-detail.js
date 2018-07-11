import React from 'react';

class QuizResultDetails extends React.Component {

    constructor(props){
        super(props);
    }


    render(){

        const itemShow = this.props.storeInfo.map((item) => {
            console.log("item", item);
        })
        return(
            <div>
                <h1>Here we wil display records...</h1>
                { this.itemShow}
            </div>
        )
    }
}

export default QuizResultDetails;