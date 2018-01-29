import React, { Component } from "react";
import { Grid } from "material-ui";
import Logo from "./../Resources/logo.svg";
import { Progress } from "../Components";
import { Redirect } from 'react-router-dom';

let data = [
    { message: "let's talk alexa about ipl matches" },
    { message: "turn on alexa and get ready" },
    { message: "Ask 'Alexa get me the ipl score from iplbrain'" },
    { message: "Ask 'Alexa get me the ipl score of 2020 from iplbrain'" }
];
export default class Initial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RedirectMe: false
        };
    }
    render() {

        return (
            <Grid container spacing={24}>
                <Grid item xs>
                </Grid>
                <Grid item xs={10} sm={3}>
                    <div className="initialHead">
                        <img src={Logo} width="60%" alt="IPL Brain Logo" /><br />
                        iplbox
             </div>
                    <div>
                        <Progress repeat={false} callback={() => { this.setState({ RedirectMe: true }) }} data={data} />
                        {this.state.RedirectMe ? <Redirect to="/dashboard" /> : ""}
                    </div>
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        );
    }
}