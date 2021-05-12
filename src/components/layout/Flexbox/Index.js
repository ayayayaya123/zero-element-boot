import React, { useImperativeHandle, forwardRef } from 'react';

//CR. 2021-01-13 do not dependens NamedSeperator with layout
//import NamedSeperator from '@/components/NamedSeperator';

require('./index.less');

/**
 * @param {对齐方式: [start, center, end, around, between, start-with-last-end, align-content-center] } align
 * @param {对齐方向: [row, column, row-reverse, column-reverse] } direction
 * @param {子项对齐方式: start, center, end, [full, half, quad]: for item width } justify
 * @param {ReactElement} Seperator 直接转入的分隔线组件（不引入NamedSeperator依赖）
 * Seperator: 'Divider', 组件名
 * {
      name: 'Divider',
      props:{
          lineType:'solid' 分割线类型
      }
   }
   @param {是否划线} isLastItem
 */
export default forwardRef(function Flexbox(props, ref) {

  const { children, align='', direction='', justify={}, isLastItem, Seperator } = props;
  // console.log('align=', align, 'direction=', direction, 'justify=', justify)

  useImperativeHandle(ref, () => ({
    getClassName: () => {
      return `l-FlexBox  ${align} ${direction}`;
    }
  }));

  // get named seperator
  //const defaultSeperator = (typeof seperator === 'string') ? seperator : seperator.name

  return React.Children.map(children, child => {
    
    return (
      <>
        <div className={`l-FlexBoxItem ${direction} ${justify}`}>
          {child}
        </div>
        {/* {defaultSeperator && (!isLastItem) ? <NamedSeperator name={defaultSeperator} /> : null} */}
        {Seperator}
      </>
    )
  })
})