import React from "react";
import { Paper } from "material-ui";

export default ({ data }) => (
    <Paper style={{ boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.2)", borderRadius: '10px', marginBottom: "10px" }}>
        <div className="speechContainer">

            <div className="speechSection">
                <div className="sectionHead queryHead">
                    <div className="headContent">Query</div>

                    <div className="timeStamp">{data.queryTime}</div>
                </div>
                <div>{data.queryData}</div>
            </div>

            <div className="speechSection">
                <div className="sectionHead responceHead">
                    <div className={data.responceErr ? "headContent headContentErr" : "headContent"}>Responce</div>

                    <div className="timeStamp">{data.responceTime}</div>
                </div>
                <div className={data.responceErr ? "errorData" : ""}>{data.responceData}</div>
            </div>

            <div className="speechSection">
                <div className="sectionHead responceTimeHead">
                    Responce Time :
                  <div className="responceTime">{data.totalResponceTime}</div>
                </div>
            </div>
        </div>
    </Paper>
);