import React, { Component } from "react";
import { SpeechSection } from "./../Components";
import { Grid } from "material-ui";
import { Progress } from "../Components";
import Logo from "./../Resources/logo.svg";
import openSocket from 'socket.io-client';


let data = [
    {
        queryTime: "20:40:36",
        queryData: "Alexa search for artist of a 'hello' from musicbrain",
        responceTime: "20:40:46",
        responceData: "It is directed by 'rahul'",
        responceErr: false,
        totalResponceTime: "10ms"

    }, {
        queryTime: "20:40:36",
        queryData: "Alexa search for artist of a 'hello' from ",
        responceTime: "20:40:46",
        responceData: "Error:Slot is missing from the utterance",
        responceErr: true,

        totalResponceTime: "10ms"
    }, {
        queryTime: "20:40:36",
        queryData: "Alexa search for artist of a 'hello' from ",
        responceTime: "20:40:46",
        responceData: "Error:Slot is missing from the utterance",
        responceErr: true,

        totalResponceTime: "10ms"
    }
];

let messageDataConnecting = [
    { message: "connecting to alexa" },
    { message: "turn on alexa and get ready" },
    { message: "let's talk alexa about ipl matches" }
];

let messageDataConnected = [
    { message: "we are ready" },
    { message: "start asking questions" }
];

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        const socket = openSocket('https://bot.camouflage81.hasura-app.io/');
        socket.on('connect', text => {
            this.setState({ message: messageDataConnected });
            console.log("Connected");
            // this.updateUI({
            //     timestamp: "20:40:36",
            //     query_text: "Alexa search for artist of a 'hello' from ",
            //     response_text: "20:40:46",
            //     response_text: "Error:Slot is missing from the utterance",
            //     is_error_occured: true,
            //     response_time: "10ms"
            // });
        });
        socket.on('intentRequest', this.updateUI);
        this.messageData = [];
        this.state = { data: this.messageData, message: messageDataConnecting };
    }

    updateUI(responce) {
        let mapData = {
            queryTime: responce.timestamp,
            queryData: responce.query_text,
            responceTime: responce.timestamp,
            responceData: responce.response_text,
            responceErr: responce.is_error_occured,
            totalResponceTime: responce.response_time
        }
        console.log(mapData);
        // this.messageData.unshift(mapData);
        this.setState({ data: this.messageData });
    }
    render() {
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
                    {this.state.data.length === 0 ? <Progress repeat={true} callback={() => { }} data={this.state.message} /> : ""}
                    {this.state.data.map((singleQuery, i) => (
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
