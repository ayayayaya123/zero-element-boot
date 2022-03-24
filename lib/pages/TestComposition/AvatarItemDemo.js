import React from 'react';
import AvatarItem from "../../composition/AvatarItem";
import Cart from "../../components/cart/Cart";
export default function Demo(props) {
  const config = {
    "avatar": "https://media.geeksforgeeks.org/wp-content/uploads/20200403151026/adblur_gfg.png",
    "title": "admin"
  };
  return /*#__PURE__*/React.createElement(Cart, null, /*#__PURE__*/React.createElement(AvatarItem, config));
}