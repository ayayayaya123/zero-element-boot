import NamedLayout from './NamedLayout';
import NamedList from './NamedList';
import NamedCart from './NamedCart';
import NamedContainer from './NamedContainer';
import NamedSeperator from './NamedSeperator';
import NamedGateway from './NamedGateway';

import NextIndicator from './NextIndicator';

// AutoComponent
import AutoLayout from './AutoLayout';
// import  { CloneAutoLayout }  from './CloneAutoLayout';
import AutoComponent from './AutoComponent';

import APIContainer from './container/APIContainer';

//set components config
import { set as NamedLayoutSet } from '@/components/config/NamedLayoutConfig';
import { set as NamedCartSet } from '@/components/config/NamedCartConfig';
import { set as NamedPresenterSet } from '@/components/config/NamedPresenterConfig';
import { set as NamedIndicatorSet } from '@/components/config/NamedIndicatorConfig';
import { set as FormItemTypeSet } from '@/components/config/formItemTypeConfig';

//layout
import Flexbox from '@/components/layout/Flexbox';
import Itembox from '@/components/layout/Itembox';
import Gridbox from '@/components/layout/Gridbox';
import Wrap from '@/components/layout/Wrap';
import Stack from '@/components/layout/Stack';
import Round from '@/components/layout/Round';

//cart 
import Cart from './cart/Cart';
import HightlightCart from './cart/HightlightCart';
import HoverShadowCart from './cart/HoverShadowCart';
import SelectCart from './cart/SelectCart';
import SelectIndicatorCart from './indicator/SelectIndicatorCart';
import CheckBoxIndicatorCart from './indicator/CheckBoxIndicatorCart';
import Circle from './cart/Circle';
import Corner from './cart/Corner';
// import indicator from './cart/indicator';
import PageCart from './cart/PageCart';
import Rectangle from './cart/Rectangle';
import RoundCart from './cart/Round';
import Page from './cart/Page';

import SelectedCartUpperRightIcon from './indicator/SelectedCartUpperRightIcon';
import SelectedCartRightIcon from './indicator/SelectedCartRightIcon';

import DefaultHoverIndicator from './indicator/DefaultHoverIndicator';
import MyIndicatorSelect from './indicator/MyIndicatorSelect';
import MyIndicatorSelected from './indicator/MyIndicatorSelected';
import RightIconCheckboxIndicatorDefauct from './indicator/RightIconCheckboxIndicator/Defauct';
import RightIconCheckboxIndicatorSelect from './indicator/RightIconCheckboxIndicator/Select';
import RightIconCheckboxIndicatorSelected from './indicator/RightIconCheckboxIndicator/Selected';

import RightIconIndicatorDefault from '@/components/indicator/RightIconIndicatorDefault';
import RightIconIndicatorHover from '@/components/indicator/RightIconIndicatorHover';
import RightIconIndicatorSelected from '@/components/indicator/RightIconIndicatorSelected';

import {Avatar, DownloadButton, ItemPlaceholder} from '@/components/presenter';
import {Title, Subtitle} from '@/presenter/demo';

// Form 组件
import { InputCompx, SelectFetch, CheckboxFetch, CheckboxModalFetch } from '@/components/formItemType';

NamedLayoutSet({
  Flexbox,
  Itembox,
  Gridbox,
  Wrap,
  Stack,
  Round
})

NamedCartSet({
  Cart,
  HightlightCart,
  HoverShadowCart,
  SelectCart,
  SelectIndicatorCart,
  CheckBoxIndicatorCart,
  Circle,
  Corner,
  // indicator,
  PageCart,
  Page,
  Rectangle,
  Round: RoundCart,
  SelectedCartUpperRightIcon,
  SelectedCartRightIcon,
  DefaultHoverIndicator,
  MyIndicatorSelect,
  MyIndicatorSelected,
})

NamedIndicatorSet({
  RightIconCheckboxIndicatorDefauct,
  RightIconCheckboxIndicatorSelect,
  RightIconCheckboxIndicatorSelected,
  RightIconIndicatorDefault,
  RightIconIndicatorHover,
  RightIconIndicatorSelected
})

NamedPresenterSet({
  Avatar,
  Title,
  Subtitle,
  DownloadButton,
  ItemPlaceholder
})

FormItemTypeSet({
  "input": InputCompx, 
  "select-fetch": SelectFetch,
  "checkbox-fetch": CheckboxFetch,
  "checkbox-modal-fetch": CheckboxModalFetch
})


// default to export core components
export {
        AutoLayout,
        // CloneAutoLayout,
        AutoComponent,

    NamedLayout,
    NamedList,
    NamedCart,
    NamedContainer,
    NamedSeperator,
    NamedGateway,

    // 
    NextIndicator,
    
    //
    APIContainer
};
