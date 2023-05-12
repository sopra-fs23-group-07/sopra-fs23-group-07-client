import PropTypes from "prop-types";
import React from "react";

const MyBaseContainer = props => (
    <div {...props} className={`base-container ${props.className ?? ''}`}>
      {props.children}
    </div>
  );
  
  MyBaseContainer.propTypes = {
    children: PropTypes.node,
  };
  export default MyBaseContainer;