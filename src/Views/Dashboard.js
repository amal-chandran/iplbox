import React, { Component } from "react";
import { SpeechSection } from "./../Components";
import { Grid } from "material-ui";
import { Progress } from "../Components";
import Logo from "./../Resources/logo.svg";
import isEmpty from "lodash/isEmpty";

let messageDataConnecting = [
    { message: "connecting to alexa" },
    { message: "turn on alexa and get ready" },
    { message: "let's talk alexa about ipl matches" },
    { message: "we are ready" },
    { message: "start asking questions" }
];

export default class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.getData();
        this.state = { logsList: [] };
        this.LogData = [];
    }

    getData = () => {
        setTimeout(() => {
            fetch("https://bot.defect94.hasura-app.io/logs")
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((response) => {
                    if (!isEmpty(this.LogData)) {
                        if (response.timestamp !== this.LogData[0].timestamp && !isEmpty(response.timestamp))
                            this.LogData.unshift(response);
                    } else {
                        this.LogData.unshift(response);
                    }

                    this.setState({ logsList: this.LogData });
                    this.getData();
                }).catch((err) => {
                    this.getData();
                });
        }, 1000);
    }

    render() {
        let { state } = this;
        return (<div className="dashboardAnimate">
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <div className="mainHead">
                        <img src={Logo} width="100px" alt="IPL Brain Logo" /><br />
                        iplbox
        </div>
                </Grid>
                <Grid item xs>
                </Grid>
                <Grid item xs={10} md={5} lg={4} xl={4} sm={5}>
                    {state.logsList.length === 0 ? <Progress repeat={true} callback={() => { }} data={messageDataConnecting} /> : ""}
                    {state.logsList.map((singleQuery, i) => (
                        <SpeechSection key={i} data={singleQuery} />
                    ))}
                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        </div>
        );
    }

}
