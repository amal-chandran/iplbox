import React, { Component } from "react";

export default class Progress extends Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "",
            selected: 0
        }
    }
    componentDidMount() {
        this.intervalData = setInterval(() => {
            if (this.props.data.length > this.state.selected) {
                let selected = this.state.selected + 1;
                this.setState({
                    message: this.props.data[selected - 1].message,
                    selected
                });
            } else {
                if (!this.props.repeat) {
                    this.props.callback();
                    clearInterval(this.intervalData);
                } else {
                    let selected = 1;

                    this.setState({
                        message: this.props.data[selected - 1].message,
                        selected
                    });
                }
            }
        }, 2000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalData);
    }

    render() {
        return (
            <div>
                <div className="messageShow">
                    {this.state.message}
                </div>
                <div className="progress">
                    {this.state.selected > 0 ? this.props.data.map((singleData, i) =>
                        (<div key={i} className={"progressItem " + (this.state.selected > i ? "progressItemSelected" : "")}></div>)) : ""}
                </div>
            </div>
        );
    };
}   