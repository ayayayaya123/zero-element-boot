import React, { useState, useEffect } from 'react';

import PreviewAutoLayout from '@/components/PreviewAutoLayout'
import PreviewItem from './PreviewItem';

export default function (props) {

  // 获取要显示的数据的接口
  let api = '/api/crud/fieldModel/fieldModels'
  // 获取layoutJson的本地接口
  let layoutJsonApi = '/api/layoutJson'
  // let layoutJsonApi = ''
  // 获取layoutJson的api接口，如果本地接口为空，则会使用该接口请求api
  // let layoutName = 'thisAutoLayout'
  let layoutName = ''

  const allComponents = {PreviewItem}
  
  return (
      <PreviewAutoLayout api={api} layoutApi={layoutJsonApi} layoutName={layoutName} allComponents={allComponents} {...props}/>
  )
}

