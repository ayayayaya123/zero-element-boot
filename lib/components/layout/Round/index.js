function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Container from "../../container/Container";
import Flexbox from "../Flexbox";
export default function Round(props) {
  const {
    children,
    ...data
  } = props;
  return /*#__PURE__*/React.createElement(Flexbox, _extends({
    align: "between"
  }, data), children);
}