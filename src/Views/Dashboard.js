import React, { Component } from "react";
import { SpeechSection } from "./../Components";
import { Grid, Menu, MenuItem, Icon } from "material-ui";
import { Progress } from "../Components";
import Logo from "./../Assets/logo.svg";
import isEmpty from "lodash/isEmpty";
import Button from "material-ui/Button/Button";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { push } from 'react-router-redux';
import Config from './../Config/config.json';
import * as authHelper from "./../Helper/authHelper";

let messageDataConnecting = [
    { message: "connecting to alexa" },
    { message: "turn on alexa and get ready" },
    { message: "let's talk alexa about ipl matches" },
    { message: "we are ready" },
    { message: "start asking questions" }
];

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.getData();
        this.state = { logsList: [] };
        this.LogData = [];
        this.Unmounted = false;
        const { hasura_id } = this.props.authData;

    }

    getRequestOptions = (body) => {
        const { hasura_id } = this.props.authData;

        return {
            "method": "POST",
            "headers": authHelper.getHeader(false),
            "body": JSON.stringify(body(hasura_id))
        };
    }

    getData = () => {
        setTimeout(() => {
            let body = (hasura_id) => ({
                "type": "select",
                "args": {
                    "table": "logs",
                    "columns": [
                        "*"
                    ],
                    "where": {
                        "$and": [
                            {
                                "hasura_id": {
                                    "$eq": hasura_id
                                }
                            }
                        ]
                    },
                    "order_by": [
                        {
                            "column": "timestamp",
                            "order": "desc"
                        }
                    ],
                    "limit": "5"
                }
            });


            fetch(Config.url.data, this.getRequestOptions(body))
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((response) => {
                    if (!isEmpty(response)) {
                        this.setState({ logsList: response });
                    }
                    if (!this.Unmounted)
                        this.getData();
                }).catch((err) => {
                    if (!this.Unmounted)
                        this.getData();
                });
        }, 1000);
    }
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClear = () => {
        this.LogData = [];

        let body = (hasura_id) => ({
            "type": "delete",
            "args": {
                "table": "logs",
                "where": {
                    "hasura_id": {
                        "$eq": hasura_id
                    }
                }
            }
        });

        fetch(Config.url.data, this.getRequestOptions(body))
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            });
        this.setState({ logsList: this.LogData });
        this.handleClose();
    };

    componentWillUnmount() {
        this.Unmounted = true;
    }

    render() {
        let { state } = this;
        const { anchorEl } = this.state;
        return (
            <div className="dashboardAnimate">
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
                        <div style={{ marginBottom: "12px", textAlign: "right" }}>

                            <Button
                                aria-owns={anchorEl ? 'simple-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                <Icon color="action">menu</Icon>
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClear}>Clear All</MenuItem>
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <MenuItem onClick={(e) => {
                                    this.props.actions.push("/");
                                    this.handleClose(e);
                                }}>Logout</MenuItem>
                            </Menu>

                        </div>

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

const mapStateToProps = (state) => {
    const { auth, userAuth } = state;
    return {
        authData: userAuth.authData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            push
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
