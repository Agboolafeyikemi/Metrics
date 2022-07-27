import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import Footer from "./components/Footer/Footer";
import { Search } from "./components/Search/Search";
import { Filter } from "./components/Filters/Filter";
import { GraphModal } from "./components/GraphModal/graphModal";
import { isEmpty } from "./constants";
import api from "./api/users";
var LogData = require("./data/logs.json");

const App = () => {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [showGraph, setShowGraph] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [data, setData] = useState({});
  const [openFilters, setOpenFilters] = useState(false);
  const showUserMetrics = (user) => {
    setSelectedUserId(user.id);
    setShowGraph(true);
  };
  const toggleModal = () => {
    setShowGraph(!showGraph);
  };
  const onChangeName = (e) => {
    setSearch(e.target.value);
    setTimeout(() => {
      const res = userData.filter(
        (user) =>
          user.name && user.name.toLowerCase().includes(search.toLowerCase())
      );
      setUserData(res);
    }, 100);
  };
  //retrieve users
  const retrieveUsers = async () => {
    const res = await api.get("/users");
    return res.data;
  };
  const parseData = () => {
    let map = new Map();
    LogData.forEach((data) => {
      if (map.has(data.user_id)) {
        let userData = map.get(data.user_id);
        if (data.type === "impression") {
          userData.totoalImpressions++;
        } else {
          userData.totalConversions++;
          userData.totalRevenue += data.revenue;
        }
        userData.graphData.push(data);
        map.set(data.user_id, userData);
      } else {
        let userData = {
          totoalImpressions: 0,
          totalConversions: 0,
          totalRevenue: 0,
          graphData: [],
        };
        if (data.type === "impression") {
          userData.totoalImpressions++;
        } else {
          userData.totalConversions++;
          userData.totalRevenue += data.revenue;
        }
        userData.graphData.push(data);
        map.set(data.user_id, userData);
      }
    });
    setData(map);
  };

  const onApply = (sortBy) => {
    if (!sortBy) {
      setUserData(userData);
      setOpenFilters(false);
      return;
    }

    if (sortBy === "name") {
      userData.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      // return;
    } else if (sortBy === "impression") {
      userData.sort(function (a, b) {
        let userA = data.get(a.id);
        let userB = data.get(b.id);
        if (userA.totoalImpressions > userB.totoalImpressions) {
          return -1;
        }
        if (userA.totoalImpressions < userB.totoalImpressions) {
          return 1;
        }
        return 0;
      });
    } else if (sortBy === "conversion") {
      userData.sort(function (a, b) {
        let userA = data.get(a.id);
        let userB = data.get(b.id);
        if (userA.totalConversions > userB.totalConversions) {
          return -1;
        }
        if (userA.totalConversions < userB.totalConversions) {
          return 1;
        }
        return 0;
      });
    } else {
      userData.sort(function (a, b) {
        let userA = data.get(a.id);
        let userB = data.get(b.id);
        if (userA.totalRevenue > userB.totalRevenue) {
          return -1;
        }
        if (userA.totalRevenue < userB.totalRevenue) {
          return 1;
        }
        return 0;
      });
    }

    setUserData([...userData]);
    setOpenFilters(false);
  };

  useEffect(() => {
    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) setUserData(allUsers);
    };
    getAllUsers();
  }, []);
  useEffect(() => {
    parseData();
  }, []);

  return (
    <div className="App">
      <h1 className={"header"}>Ad Testing Metrics</h1>
      <div className="inner-container">
        <div className="search-box">
          <div>
            <Search onChange={onChangeName} searchName={search} />
          </div>
          <div>
            <Filter
              label={true}
              none={true}
              sortByOptions={[
                {
                  name: "Name",
                  id: "name",
                },
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
              onApply={onApply}
            />
          </div>
        </div>

        {!isEmpty(data) && (
          <div className="row">
            {userData.map((user) => {
              return (
                user && (
                  <Card
                    key={user.id}
                    user={user}
                    data={data.get(user.id)}
                    showUserMetrics={showUserMetrics}
                  />
                )
              );
            })}
          </div>
        )}
        {showGraph && (
          <GraphModal
            open={showGraph}
            toggleModal={toggleModal}
            userData={userData.find((user) => user.id === selectedUserId)}
            graphData={data.get(selectedUserId).graphData}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
