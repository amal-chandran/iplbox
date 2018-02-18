import React, { Component } from "react";
import { Grid, FormControl, Paper, Typography, InputLabel, TextField } from "material-ui";
import Logo from "./../Resources/logo.svg";
import { Progress } from "../Components";
import { Redirect } from 'react-router-dom';
import SocialLogin from 'react-social-login'

const ButtonSocialLogin = ({ children, triggerLogin, ...props }) => (

    <a onClick={triggerLogin} {...props} className='btn reverse'>
        login{" "}
        <span>
            with amazon
  </span>
    </a>
)
let SocialLoginBTN = SocialLogin(ButtonSocialLogin);

export default class Initial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RedirectMe: false
        };
    }

    handleSocialLogin = (data) => {
        console.log(data);
    }
    handleSocialLoginFailure = (data) => {
        console.log(data);
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
                    <p style={{ margin: "1em", color: "gray" }} >
                        * To continue with alexa services you need to login with your amazone account
</p>
                    <SocialLoginBTN
                        provider='amazon'
                        appId='amzn1.application-oa2-client.26aaf63624854cbcaa084735a0fc47ed'
                        onLoginSuccess={this.handleSocialLogin}
                        onLoginFailure={this.handleSocialLoginFailure}
                    >
                    </SocialLoginBTN>


                </Grid>
                <Grid item xs>
                </Grid>
            </Grid>
        );
    }
}
