import React, { Component, createRef, Fragment, useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { LOCAL } from "../../utils/constants";
import { showPathEntries } from "../../utils/fileSystem";

import MagnifyIcon from "./MagnifyIcon";
import SearchResults from "./SearchResults";
import Filter from "./Filter";
import { Container, Line, Input, Search } from "./styles";
import TextField from "@material-ui/core/TextField";
import "./styles.css"


// New
import searchIcon from '../../assets/img/search.svg';
import searchDarkIcon from "../../assets/img/searchdark.svg"
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import sarvvidLogoDark from "../../assets/img/sarvvidLogodark.svg"
import sunImg from "../../assets/img/sun.svg"
import moonImg from "../../assets/img/moon.svg"
import MenuIcon from "@material-ui/icons/MenuRounded"
import { useMenuToggle, useMenuUpdateToggle, useTheme, useThemeUpdate } from "../../contexts/themeContext"

// import { makeStyles } from "@material-ui/core/styles";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//   },
// }));
// class SearchBar extends Component {
//   _ref = createRef();
//   state = {
//     term: "",
//     width: 0,
//     mode: LOCAL,
//     data: null,
//   };

//   componentDidMount() {
//     this.setState(() => {
//       const { width } = getComputedStyle(this._ref.current);
//       return {
//         width,
//       };
//     });
//   }

//   handleMode = (mode) => {
//     this.setState({
//       mode,
//     });
//   };

//   render() {

//     // let searchOpen = true

//     // console.log("searchOpen...", searchOpen)

//     return (
//       <div className="middlePane_searchBar" ref={this._ref}>
//         <form className="search_bar" noValidate autoComplete="off" style={{height:"100%"}} >
//           <div className="menu-btn">
//           <MenuIcon  style = {{fontSize:"2rem"}} />
//           </div>

//           <input
//             id="outlined-search"
//             className="searchBar_text"
//             label="Search"
//             type="search"
//             placeholder="Search"
//             // variant="outlined"

//             onChange={(event) =>
//               this.setState({ term: event.target.value.toLowerCase() })
//             }
//           />
          
//           {/* <CloseRoundedIcon className = {`close_button ${this.state.term.length ? "active_close" : "" }`} onClick = {() => {searchOpen = false} } /> */}
//         </form>
//         {this.state.term.length > 0  ? (
//           <Container style={{ width: "60%" }}>
//             <Filter mode={this.state.mode} handleMode={this.handleMode} />
//             <Line />
//             <SearchResults
//               // style={{ width: "50%" }} //wi dth:1136.47px
//               term={this.state.term}
//               isDraggable={false}
//               data={
//                 this.state.mode === LOCAL
//                   ? this.props.entry
//                   : Object.keys(this.props.fileSystem).map(
//                       (id) => this.props.fileSystem[id]
//                     )
//               }
//               closeResult={() => this.setState({ term: "" })}
//             />
//           </Container>
//         ) : (
//           ""
//         )}
//       </div>
//     );
//   }
// }

const SearchBar = (props) => {
  const _ref = useRef()
  const [term, setTerm] = useState("")
  const [width, setWidth] = useState(0)
  const [mode, setMode] = useState(LOCAL)
  const [data, setData] = useState(null)

  const toggleBtn = useMenuToggle()
  const toggleMenu = useMenuUpdateToggle()
  const darkTheme = useTheme()
  const toggleTheme = useThemeUpdate()


  useEffect(() => {
    const  { width } =  getComputedStyle(_ref.current)
    setWidth(width)
  })

  const handleMode = (mode) => {
    setMode(mode)
  }

  return(
    <div className={`middlePane_searchBar ${darkTheme ? "dark-theme" : ""}`} ref = {_ref} >
      <div className="mobile_header">
        <div className={`menu-btn ${toggleBtn ? "" : "opened"}`}  onClick = {() => toggleMenu()} >
          <MenuIcon style = {{fontSize:"2rem", color:`${darkTheme? "#fafafa" : "#000"}`}}  />
        </div>
        <div className="min_logo">
          <img src={sarvvidLogoDark} alt="logo"/>
        </div>
        <div className={`min-theme-toggle ${darkTheme ? "dark" : ""}`} onClick={() => toggleTheme()} >
          <div className="min_theme_toggle">
            <img src={moonImg} alt="mooon" />
            <img src={sunImg} alt="sun" />
          </div>
        </div>
      </div>
      <form  className="search_bar" noValidate autoComplete="off" style={{height: "100%"}} >
        <div className="search-section">
          {darkTheme ? <img src={searchDarkIcon} alt="search" /> : <img src={searchIcon} alt="search" />}
          <input  type="search" label = "Search" placeholder="Search" id="outlined-search" className={`searchBar_text ${toggleBtn ? "" : "opened"} ${darkTheme ? "dark" : ""}`} onChange={(e) => {setTerm(e.target.value.toLowerCase())}} />
        </div>
      </form>
      {term.length > 0 ? (
        <Container style={{width: "60%"}} >
          <Filter mode = {mode} handleMode = {handleMode} />
          <Line/>
          <SearchResults term = {term} isDraggable = {false} data = {
            mode === LOCAL ? props.entry : Object.keys(props.fileSystem).map(
              (id) => props.fileSystem[id]
            )
          }  closeResult = {() => {setTerm("")}} />
        </Container>
      ) : ( " " ) }
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const path = ownProps.location.pathname;
  return {
    entry: showPathEntries(path, state.fileSystem),
    fileSystem: state.fileSystem,
  };
};

export default withRouter(connect(mapStateToProps)(SearchBar));
