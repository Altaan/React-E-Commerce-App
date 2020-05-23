import React from "react";
import { withRouter } from "react-router-dom"; // withRouter is a Higher Order Component (HOC) used to avoid prop drilling/tunneling, which is the passing of props through multiple children to get to the child that uses the props

import "./menu-item.styles.scss";

// this component is used to create the structure for every section on the home page.
// directory component is passing the sections, which are destructured below
const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => (
  <div
    className={`${size} menu-item`}
    // by clicking on the section the user is taken to the collection page of the selected collection
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    ></div>
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

// withRouter will return a modified MenuItem component that has access to the history, location and match objects
export default withRouter(MenuItem);
