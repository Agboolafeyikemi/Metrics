import * as React from "react";
import { Chart } from "react-google-charts";
import "./Chart.css";
import { css } from "@emotion/react";

import GridLoader from "react-spinners/GridLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
`;

export const ChartComponent = (props) => {
  return (
    <div className={"chart-div"}>
      <Chart
        className={"chart"}
        width="100%"
        height={"400px"}
        chartType="LineChart"
        loader={
          <GridLoader
            css={override}
            sizeUnit={"px"}
            size={10}
            color={"#0080FF"}
            loading={true}
          />
        }
        data={props.data}
        options={{
          hAxis: {
            title: "period",
            viewWindow: { min: 1, max: 31 },
          },
          vAxis: {
            title: props.category,
          },
        }}
      />
    </div>
  );
};
