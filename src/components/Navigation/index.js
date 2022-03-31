import React from 'react';
import { withRouter } from 'react-router-dom';

import { Container, Path } from './styles';
import GoBack from './GoBack';

// New
import "./styles.css"
import {useTheme} from "../../contexts/themeContext"

const showPath = path => {
  const pathArr = path.split('/').filter(p => p);
  const len = pathArr.length;
  const arr = [<span key={0}>{` root `}</span>];

  pathArr.map((p, _) => {
    _ === len - 1
      ? arr.push(
          <span className="currentPath" key={_ + 1}>
            / {p}
          </span>
        )
      : arr.push(<span key={_ + 1}>{` / ${p} `}</span>);
  });
  return arr;
};

const goBack = path => {
  let newPath = path.split('/');
  newPath.splice(newPath.length - 1, 1);
  return newPath.join('/');
};

const Navigation = props => {

  const darkTheme = useTheme()

  return (
    <div className={`nav-container ${darkTheme ? "dark-theme" : ""}`}>

      <Container className='path-container' >
      <div
        style={{ marginTop: -2, cursor: 'pointer' }}
        onClick={() => {
          if(props.location.pathname === '/')
            {console.log("dsd")}
          else{
            props.history.push(goBack(props.location.pathname));
          }
            
        }}
      >
        <div className="back-btn">
          <GoBack
            fill={props.location.pathname === '/' ? '#acb9c3' : '#545B61'}
          />
        </div>
      </div>
      <Path className='path' >{showPath(props.location.pathname)}</Path>
    </Container>
    </div>
  );
};

export default withRouter(Navigation);
