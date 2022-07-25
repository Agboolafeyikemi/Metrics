import React, { useEffect, useState } from "react";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Filter } from "../Filters/Filter";
import { ChartComponent } from "../Chart/Chart";
import "./graphModal.css";

const theme = () =>
  createTheme({
    overrides: {
      MuiPaper: {
        root: {
          width: "70%",
          height: "70%",
        },
      },
    },
  });

// There is only 2 months of data for 2013. So Periods can be either 4/2013 or 5/2013.

export const GraphModal = ({ open, toggleModal, userData, graphData }) => {
  const [state, setState] = useState({
    sortBy: "conversion",
    period: 4,
    graphData: [],
  });
  let data = graphData;
  let dataMap = new Map();
  for (let i = 1; i <= 31; i++) {
    dataMap.set(i, 0);
  }

  useEffect(() => {
    countGraph(state.sortBy, state.period);
  }, []);

  const countGraph = (sortBy, period) => {
    data.forEach((ad) => {
      let time = new Date(ad.time);
      var month = time.getUTCMonth() + 1; //months from 1-12
      if (month == period) {
        var day = time.getUTCDate();
        if (ad.type === sortBy) {
          if (dataMap.get(day)) {
            dataMap.set(day, dataMap.get(day) + 1);
          } else {
            dataMap.set(day, 1);
          }
        }
      }
    });
    let stateData = [["x", sortBy]].concat(Array.from(dataMap.entries()));
    setState({ ...state, graphData: stateData, sortBy, period });
  };

  const revenueGraph = (period) => {
    data.forEach((ad) => {
      let time = new Date(ad.time);
      var month = time.getUTCMonth() + 1; //months from 1-12
      if (month == period) {
        var day = time.getUTCDate();
        if (dataMap.get(day)) {
          dataMap.set(day, dataMap.get(day) + ad.revenue);
        } else {
          dataMap.set(day, ad.revenue);
        }
      }
    });
    let stateData = [["x", "revenue"]].concat(Array.from(dataMap.entries()));
    setState({ ...state, graphData: stateData, sortBy: "revenue", period });
  };

  const processData = (category, period) => {
    let sortBy = category || state.sortBy;
    let month = period || state.period;
    if (sortBy === "revenue") {
      revenueGraph(month);
    } else {
      countGraph(sortBy, month);
    }
  };

  return (
    <MuiThemeProvider theme={theme()}>
      <Dialog
        maxWidth={"lg"}
        open={open}
        fullScreen={false}
        onClose={toggleModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Graph showing
          <div className={"filter-dropdown-graph"}>
            <Filter
              none={false}
              theme={"graph"}
              default={"conversion"}
              sortByOptions={[
                {
                  name: "Impression",
                  id: "impression",
                },
                {
                  name: "Conversion",
                  id: "conversion",
                },
                {
                  name: "Revenue",
                  id: "revenue",
                },
              ]}
              onApply={(cat) => processData(cat, null)}
            />
          </div>{" "}
          Per day for {userData.name} during the period
          <div className={"filter-dropdown-graph"}>
            <Filter
              none={false}
              theme={"graph"}
              default={"4"}
              sortByOptions={[
                {
                  name: "April 2013",
                  id: "4",
                },
                {
                  name: "May 2013",
                  id: "5",
                },
              ]}
              onApply={(per) => processData(null, per)}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <ChartComponent data={state.graphData} category={state.sortBy} />
          <span className="graph-info">
            ( Hover on tne graph to see the values )
          </span>
        </DialogContent>
      </Dialog>
    </MuiThemeProvider>
  );
};
