import React, { useState, Fragment, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import Forgot from "./components/ForgotPass/forgot";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import PrivateRoute from "./utils/PrivateRoute";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import AlertComponent from "./components/AlertComponent/AlertComponent";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Icon from "@material-ui/core/Icon";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar/index";
import Card from "./components/Card/Card.js";
import CardHeader from "./components/Card/CardHeader.js";
import CardIcon from "./components/Card/CardIcon.js";
import CardBody from "./components/Card/CardBody.js";
import CardFooter from "./components/Card/CardFooter.js";
import GridItem from "./components/Grid/GridItem.js";
import Warning from "@material-ui/icons/Warning";
import Danger from "./components/Typography/Danger.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "./components/Grid/GridContainer.js";
// import './assets/styles/App.scss';
import styles from "./assets/jss/material-dashboard-react/views/dashboardStyle.js";
import reducers from "./reducers";
import { ViewFiles,RecycleBinViewFiles, SharedViewFiles, SettingsViewFiles, RequestViewFiles,  Shared } from "./pages";

import RightPane from "./components/RightPane/RightPane";
import generatedummyFileSystem from "./utils/dummyFileSystem";
import Axios from "axios";
import CheckOnline from "./components/CheckOnline/CheckOnline";

import { ThemeProvider, useTheme } from "./contexts/themeContext";

const useStyles = makeStyles(styles);
const rootEl = document.getElementById("root");
const store = createStore(
  reducers,
  {
    fileSystem:
      localStorage.getItem("fileSystem") &&
      Object.keys(localStorage.getItem("fileSystem")).length > 0
        ? JSON.parse(localStorage.getItem("fileSystem"))
        : generatedummyFileSystem(),
  },
  composeWithDevTools()
);

// export const fileChosenContext = React.createContext({
//   fileTypeChosen: "none",
//   chooseOpen: "false",
// });

function App() {
  const classes = useStyles();
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  const [a, seta] = useState(0);
  const [b, setb] = useState(0);
  const [online, setOnline] = useState(true);
  const darkTheme = useTheme();

  const [currentView, setCurrentView] = useState("home");


  function handleViewChange(viewName) {
    setCurrentView(viewName);
  }

  useEffect(() => {
    localStorage.setItem("theme", "light");

    Axios(
      `http://14.102.108.122:3000/getdata?ping=${localStorage.getItem("ping")}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*", // It can be used to overcome cors errors
          "Content-Type": "application/json",
          Authtoken: localStorage.getItem("authtoken"),
        },
        data: JSON.stringify({
          IMEI: localStorage.getItem("IMEI"),
        }),
      }
    )
      .then((res) => {
        console.log(res);
        seta(
          ((res.data.current_storage * res.data.filled_per) / 100).toFixed(2)
        );
        setb(res.data.current_storage);
        localStorage.setItem(
          "used",
          isNaN(
            ((res.data.current_storage * res.data.filled_per) / 100).toFixed(2)
          )
            ? 0
            : ((res.data.current_storage * res.data.filled_per) / 100).toFixed(
                9
              ) *
                1000 *
                1000 *
                1000
        );
        localStorage.setItem(
          "total",
          isNaN(res.data.current_storage)
            ? 20 * 1000 * 1000 * 1000
            : res.data.current_storage * 1000 * 1000 * 1000
        );
      })
      .catch(() => {
        if (localStorage.getItem("used") == null)
          localStorage.setItem("used", 0);
        if (localStorage.getItem("total") == null)
          localStorage.setItem("total", 20 * 1000 * 1000 * 1000);
      });
  }, []);

  const checkOnce = setInterval(() => {
    if (online) {
      Axios.get("https://randomfox.ca/floof/")
        .then((response) => {})
        .catch((error) => {
          setOnline(false);
          clearInterval(checkOnce);
        });
    }
  }, 1000);
  const handleOnlineClick = () => {
    setOnline(true);
    const checkOnline = setInterval(() => {
      if (online) {
        Axios.get("https://randomfox.ca/floof/")
          .then((response) => {
            console.log(online);
          })
          .catch((error) => {
            setOnline(false);
            clearInterval(checkOnline);
          });
      }
    }, 1000);
  };
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <HashRouter>
            <Fragment>
              <div className="App">
                <Switch>
                  <Route path="/login" exact={true}>
                    {online ? "" : <CheckOnline click={handleOnlineClick} />}
                    <LoginForm
                      showError={updateErrorMessage}
                      updateTitle={updateTitle}
                      setA={(val) => seta(val)}
                      setB={(val) => setb(val)}
                    />
                  </Route>
                  <PrivateRoute path="/shared" exact={true}>
                    {/* {online ? "" : <CheckOnline click={handleOnlineClick} />}
                    <Route path="*" component={Sidebar} /> */}

                    <Shared />
                    {/* <RightPane
                      a={a}
                      b={b}
                      title={title}
                      setA={(val) => seta(val)}
                      setB={(val) => setb(val)}
                    /> */}
                  </PrivateRoute>
                  <PrivateRoute path="/" exact={true}>
                    <div className={`Dashboard ${darkTheme ? "dark" : ""}`}>
                      {online ? "" : <CheckOnline click={handleOnlineClick} />}
                      <Route
                        path="*"
                        render={(props) => (
                          <Sidebar
                            handleViewChange={handleViewChange}
                            {...props}
                          />
                        )}
                      />

                      {currentView === "home" && <ViewFiles />}
                      {currentView === "recycleBin" && <RecycleBinViewFiles />}
                      {currentView === "sharedFiles" && <SharedViewFiles />}
                      {currentView === "fileRequest" && <RequestViewFiles />}
                      {currentView === "settings" && <SettingsViewFiles />}
                      <RightPane
                        a={a}
                        b={b}
                        title={title}
                        setA={(val) => seta(val)}
                        setB={(val) => setb(val)}
                      />
                    </div>
                  </PrivateRoute>
                </Switch>
                <AlertComponent
                  errorMessage={errorMessage}
                  hideError={updateErrorMessage}
                />
              </div>
            </Fragment>
          </HashRouter>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
