import 'styles/ui/BaseContainer.scss';
import PropTypes from "prop-types";
import React from "react";

const BaseContainer = props => (
  <div {...props} className={`base-container ${props.className ?? ''}`}>
    {props.children}
  </div>
);

BaseContainer.propTypes = {
  children: PropTypes.node,
};

export default BaseContainer;