import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch() {
        this.setState({hasError: true})
    }


    render() {
        if(this.state.hasError) {
            return(
                <div>
                    <h1>Oops, something's wrong</h1>
                </div>
            )
        }
    }
}

export default ErrorBoundary;