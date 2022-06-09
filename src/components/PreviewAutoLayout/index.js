import React from 'react';
import { ChakraProvider, Flex, Box, VStack } from "@chakra-ui/react";
import { AutoLayout } from 'zero-element-boot';
import useTokenRequest from 'zero-element-boot/lib/components/hooks/useTokenRequest';

export default function Index (props) {
  // 参数
  const {api,layoutApi,layoutName} = props;

  // 判断 layoutApi 是否为空，如果为空，则用 layoutName 拼接api路径
  const localLayoutApi = layoutApi || '/api/' + layoutName

  // 从api获取显示数据
  const [ data ] = useTokenRequest({ api });
  const records = data && data.records;
  const dataX = []
  dataX.push({ items: records })

  // 从layoutApi获取layoutJson
  const respLayoutData = useTokenRequest({ api: localLayoutApi });
  const layoutJson = respLayoutData && respLayoutData[0]

  /**
   * 页面配置
   */
  const config = {
    items: dataX.length > 0 ? dataX : [],
    layout: layoutJson
  };

  // 控制台输出信息
  const onJarItemClick = (item) => {
    //TODO
    console.log(item, ' === item')
    console.log('layoutJson===',layoutJson)
  }

  return (
    <ChakraProvider>
      <Flex>
        <Box>
          <VStack spacing='3px'>
            <AutoLayout {...config} onItemClick={onJarItemClick} />
          </VStack>
        </Box>
      </Flex>
    </ChakraProvider>
  )
}