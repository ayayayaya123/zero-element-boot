import * as React from 'react';
import PlainListDemo from "./Demo/PlainListDemo";
import RoundListDemo from "./Demo/RoundListDemo";
import RectangleListDemo from "./Demo/RectangleListDemo";
import CircleListDemo from "./Demo/CircleListDemo";
import AdItemDemo from "./Demo/AdItemDemo";
import { Cart } from "../components/cart";
import TestUserSelectionDemo from "./TestUserSelectionDemo";
import NamedCartTest from "./Test/NamedCartTest";
import IsValidElementTest from "./Test/IsValidElementTest";
import ContainerTest from "./Test/ContainerTest";
import AutoLayoutDemo from "./AutoLayoutDemo";
import UserItemDemo from "./Demo/UserItemDemo";
import AdListDemo from "../composition/AdList/Sandbox";
import ComponentListDemo from "./ComponentListDemo"; // import CheckboxListDemo from '@/pages/CheckboxListDemo';
//复选框测试

import CheckBoxDemo from "./Demo/CheckboxDemo";
export default function index(props) {
  function onItemClickHandle(data) {// console.log('data = ', data)
  } //<TestUserSelectionDemo />
  // <AdListDemo onItemClickHandle={onItemClickHandle} />
  //<AdItemDemo/>


  return /*#__PURE__*/React.createElement(ComponentListDemo, {
    onItemClickHandle: onItemClickHandle
  });
}