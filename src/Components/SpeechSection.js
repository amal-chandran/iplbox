import React from "react";
import { Paper } from "material-ui";
import TimeAgo from 'timeago-react';

export default ({ data }) => {

    return (
        <Paper style={{ boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)", borderRadius: '10px', marginBottom: "10px" }}>
            <div className="speechContainer">

                <div className="speechSection">
                    <div className="sectionHead queryHead">
                        <div className="headContent">Query</div>

                        <div className="timeStamp">
                            <TimeAgo datetime={data.timestamp} />
                        </div>
                    </div>
                    <div>{data.query_text}</div>
                </div>

                <div className="speechSection">
                    <div className="sectionHead responceHead">
                        <div className={data.is_error_occured ? "headContent headContentErr" : "headContent"}>Responce</div>

                        <div className="timeStamp">{data.responceTime}</div>
                    </div>
                    <div className={data.is_error_occured ? "errorData" : ""}>{data.query_response}</div>
                </div>

                <div className="speechSection">
                    <div className="sectionHead responceTimeHead">
                        Responce Time :
                  <div className="responceTime">{data.response_time + " "}seconds</div>
                    </div>
                </div>
            </div>
        </Paper>
    );
}