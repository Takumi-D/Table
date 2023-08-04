import React, { Component } from "react";

class ErrorBoundary extends Component{

    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: true
        })
    }

    render(){
        if(this.state.error){
            return (<h3>Что-то пошло не так!!!</h3>);
        }

        return this.props.children;
    }
}

export default ErrorBoundary;