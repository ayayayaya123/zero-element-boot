import React, { useImperativeHandle, forwardRef, useState } from 'react';

require('./index.less');

/**
 * line 分割线
 * 参数
 * Seperator: Seperator, 组件名
   props:{
      lineType:'solid' 分割线类型
   }
 */

export default forwardRef(function SelectBox(props, ref) {

  const { children, align = '', direction = '', justify = '', line = {}, isLastItem } = props;

  useImperativeHandle(ref, () => ({
    getClassName: () => {
      return `l-SelectBox ${align} ${direction}`;
    }
  }));

  //分割线
  const Seperator = line.Seperator;

  function clickItem(props) {
    const { itemIndex } = props;
    if(props.onSelected && props.onItemClick){
      props.onSelected(itemIndex)
      props.onItemClick(props)
    }
  }

  const [onHover, setOnHover] = useState(false);

  return React.Children.map(children, child => {
    const childProps = child.props;

    const { isSelected } = childProps;

    const toggleHover = () => {
      const result = !onHover;
      setOnHover(result)
    }

    const fill = '#ffffff';
    // const margin = '6px';
    // const padding = '10px'
    // let linewidth = '';
    // let activeLeftLine = line.activeLeftLine ? line.activeLeftLine : '3px';
    const hoverColor = '#EAEAEA';
    // const activeColor = hoverColor;
    // const lineColor = '#4285F4';
    let bgColor = `${fill}`;
    if (onHover) {
      bgColor = `${hoverColor}80`;
    } else {
      bgColor = `${fill}ff`;
    }

    // if(isSelected){
    //   bgColor = activeColor;
    //   linewidth = activeLeftLine;
    // }

    return (
      <>
        {/* <div className={`l-SelectBoxItem ${direction} ${align}`} onClick={() => clickItem(childProps)}
          style={{
            position: 'relative',
            margin: `${margin}`,
            padding: `${padding}`,
            backgroundColor: `${bgColor}`,
          }}
          onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()}
        >
          {linewidth ? (
            <div style={{position:'absolute', 
            height: '100%',
            left: 0,
            top: 0,
            borderStyle: `solid`,
            borderWidth: `0 0 0 ${linewidth}`,
            borderColor: `${lineColor}`}}></div>
          ): null} */}
        <div onClick={() => clickItem(childProps)}
          onMouseEnter={() => toggleHover()} onMouseLeave={() => toggleHover()}
        >
          {child}
        </div>

        {/* </div>
        {Seperator && (!isLastItem) ? <Seperator {...line.props} /> : null} */}
      </>

    )
  })
})