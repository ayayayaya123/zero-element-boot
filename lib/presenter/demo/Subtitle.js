import React from 'react';
export default function (props) {
  const {
    contentTxt
  } = props;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: '6px',
      color: "#787878"
    }
  }, contentTxt);
}