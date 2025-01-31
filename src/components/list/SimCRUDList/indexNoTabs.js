import React, { useRef, useState, useEffect } from 'react';
import { history } from 'umi';
import { useSize } from 'ahooks';
import { useForm } from 'react-hook-form';
import useLayout from '@/components/hooks/useLayout';
// import ContainerContext from '@/components/AutoX/ContainerContext';

import {
  ButtonGroup,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input, // 文本框
  Stack, // 布局组件 设置子元素坚决
  FormControl, // 未表单元素添加动态效果 如校验 禁用等
  FormLabel, // label
  FormErrorMessage,
  Spinner,
  useToast,
} from "@chakra-ui/react";

const promiseAjax = require('@/components/utils/request');

import { InputCompx } from './formItemCompx'
// import InputCompx from './formItemCompx/InputCompx'

require('./index.less');

const formItemMap = {
  input: InputCompx
}

/**
 * 列表属性{template}包括 [布局, Cart, 分隔线, 数据转换 [,子组件] ]
 * 简单列表仅向子组件传递数据源以及 子组件属性
 * @param {*} props 
 * @param {object} layout  布局
 * @param {array}} items,dataSource
 * 
 * @param { path: 跳转页面, model: 弹出模态框 } navigation 
 * @param { 回调方法 } cb 
 * @param { 切换CRUD开关 } isSwtich
 * 
 */
export default function SimCRUDList(props) {

  const { children, layout, items, dataSource = items, navigation, onItemClick, cb, isSwtich = true, ...rest } = props;

  const { api: { createAPI, getAPI, updateAPI, deleteAPI } } = navigation.model;

  const [layoutRef, { getClassName }] = useLayout();

  const [isOpen, setIsOpen] = useState(false)
  const [isDelOpen, setIsDelOpen] = useState(false)
  const [currentId, setCurrentId] = useState('')
  const [currentData, setCurrentData] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [modelTitle, setModelTitle] = useState('Title')

  const containerRef = useRef();
  const size = useSize(containerRef);

  const initialRef = useRef()
  const finalRef = useRef()
  const toast = useToast()

  const Child = React.Children.only(children);

  //根据 id 获取数据
  // useEffect(() => {

  //   if (getAPI && currentId && !isDelOpen) {
  //     getData(currentId)
  //   }

  // }, [currentId]);

  // 检查数据是否有效
  if (!(dataSource && Array.isArray(dataSource))) {
    return tips(dataSource)
  }

  // 列表 item 点击事件
  function clickAction(item) {
    if (navigation) {
      if (navigation.path) {
        const nav = navigation.detail;
        if (nav.indexOf('(id)') === -1) {
          history.push({
            pathname: nav,
            query: {
              itemData: item
            }
          })
        } else if (nav.indexOf('(id)') > -1) {
          const formatNav = nav.replace('(id)', item.id);
          history.push({
            pathname: formatNav,
            query: {
            }
          })
        }
      } else if (navigation.model && isSwtich) {
        console.log('item === ', item)
        getData(item.id)
        setModelTitle('编辑')
        setCurrentId(item.id)
        setIsOpen(true)
      } else if (onItemClick) {
        onItemClick(item)
      }
    } else if (onItemClick) {
      onItemClick(item)
    }
  }

  // 新增 点击事件
  function clickAddAction(nav) {
    if (nav.path) {
      history.push({
        pathname: navigation.path,
        query: {
        }
      })
    } else if (nav.model) {
      setModelTitle('添加')
      setCurrentId('')
      setIsOpen(true)
    }

  }

  //关闭模态框
  function onClose() {
    reset()
    setCurrentData({})
    setIsOpen(false)
  }

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  function validateData(values) {

    return new Promise((resolve) => {
      setTimeout(() => {
        if (currentId) {
          putData(values, currentId)
        } else {
          postData(values)
        }
        resolve()
      }, 2000)
    })
  }

  //获取详情数据
  function getData(id) {
    const api = `${getAPI.replace('(id)', id)}`;
    const queryData = {};
    setLoading(true)
    promiseAjax(api, queryData).then(resp => {
      if (resp && resp.code === 200) {
        setCurrentData(resp.data)
      } else {
        console.error("获取数据失败")
      }
    }).finally(_=>{
      setLoading(false)
    });
  }

  //新增数据
  function postData(values) {
    const api = `${createAPI}`;
    const queryData = { ...values };
    promiseAjax(api, queryData, { method: 'POST' }).then(resp => {
      if (resp && resp.code === 200) {
        toastTips('修改成功')
        cb(true)
        setIsOpen(false)
      } else {
        console.error("提交失败 === ", resp)
        toastTips('提交失败', 'error')
      }
    });
  }

  //修改数据
  function putData(values, id) {
    const api = `${updateAPI.replace('(id)', id)}`;
    const queryData = { ...values };
    promiseAjax(api, queryData, { method: 'PUT' }).then(resp => {
      if (resp && resp.code === 200) {
        toastTips('修改成功')
        cb(true)
        setIsOpen(false)
      } else {
        console.error("修改失败 == ", resp)
        toastTips('修改失败', 'error')
      }
    });
  }

  //删除确认提示
  function showDelModel(item) {
    if (deleteAPI && item && item.id) {
      setCurrentId(item.id)
      setIsDelOpen(true)
    } else {
      console.log('未设置 deleteAPI 或 item 数据异常')
    }
  }

  //删除数据
  function delData(values, id) {
    const api = `${deleteAPI.replace('(id)', id)}`;
    const queryData = { ...values };
    promiseAjax(api, queryData, { method: 'DELETE' }).then(resp => {
      if (resp && resp.code === 200) {
        toastTips('删除成功')
        cb(true)
        setIsOpen(false)
      } else {
        console.error("删除失败 == ", resp)
        toastTips('删除失败', 'error')
      }
    });
  }

  //根据type 加载表单组件
  function handleFormItem(list) {
    const fieldList = list;
    return fieldList.map((item, index) => {

      const { label, field, type } = item;

      const C = formItemMap[type]

      return <FormControl isInvalid={errors[field]} key={`${index}_i`}>
        <FormLabel htmlFor={field}>{label}</FormLabel>
        <C {...item} register={register} errors={errors} defaultValue={currentData[field]} />
        <FormErrorMessage>
          {errors[field] && errors[field].message}
        </FormErrorMessage>
      </FormControl>
    })
  }

  // tips
  function toastTips(text, status = 'success') {
    toast({
      title: text,
      description: "",
      status: status,
      duration: 3000,
      isClosable: true,
      position: 'top'
    })
  }

  return <div
    style={{
      overflow: 'auto',
      position: 'relative',
      alignItems: 'center'
    }}
    className={getClassName()}
    ref={containerRef}
  >
    {/* <ContainerContext.Provider value={size}> */}
    {dataSource.map((item, i) => {
      return (
        <div style={{ position: 'relative' }} key={i}>
          <div onClick={() => clickAction(item)}>
            {
              React.isValidElement(Child) ?
                React.cloneElement(Child, {
                  ...rest,
                  ...item,
                  layout: layout,
                  // key: i,
                  ref: layoutRef,
                  isLastItem: dataSource.length == (i + 1) ? true : false,
                  index: i
                })
                : <Child {...rest} {...item} layout={layout} ref={layoutRef} onItemClick={onItemClick} index={i} />
            }
          </div>
          {
            isSwtich ? (

              <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                width: '26px',
                height: '26px',
                background: '#c3c3c3',
                borderRadius: '50%',
                textAlign: 'center',
              }} onClick={() => showDelModel(item)} >
                <div className={`del-btn`} ></div>
              </div>
            ) : null
          }

        </div>

      )
    })}
    {/* </ContainerContext.Provider> */}
    {
      navigation && isSwtich ? (
        <div className='footerContent' >
          <div className='footerBtn' onClick={() => clickAddAction(navigation)}>
            <div className='addBtn'>
            </div>
          </div>
        </div>
      ) : <></>
    }

    {/* 编辑模态框 */}
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modelTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {isLoading ? (
            <Spinner />
          ) : (
            <form onSubmit={handleSubmit(validateData)}>
              <Stack spacing="2">
                {
                  handleFormItem(navigation.model.fields)
                }
                {/* <FormControl isInvalid={errors.account}>
                <FormLabel htmlFor='account'>用户名</FormLabel>
                <Input bgColor="gray.50" placeholder="请输入用户名" id='account'
                  {...register('account', {
                    required: '请输入用户名',
                    minLength: { value: 4, message: '最小长度应为4' },
                  })}
                />
                <FormErrorMessage>
                  {errors.account && errors.account.message}
                </FormErrorMessage>
              </FormControl> */}
                <Stack direction='row' spacing={4} align='center'>
                  <Button width='100px' colorScheme='teal' variant='solid' isLoading={isSubmitting} type='submit'>
                    保存
                  </Button>
                  <Button width='100px' colorScheme='teal' variant='outline' onClick={onClose}>取消</Button>
                </Stack>
              </Stack>
            </form>
          )}

        </ModalBody>

        {/* <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onOk}>
              Save
              </Button>
          </ModalFooter> */}
      </ModalContent>
    </Modal>

    {/* 删除提示模态框 */}
    <Modal isOpen={isDelOpen} onClose={() => setIsDelOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>提示</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>确定要删除吗?</div>
        </ModalBody>

        <ModalFooter>

          <Stack direction='row' spacing={4} align='center'>
            <Button variant='ghost' onClick={() => setIsDelOpen(false)}>取消</Button>
            <Button colorScheme='blue' mr={3} onClick={() => delData({}, currentId)}>
              确定
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>



  </div>
}

function tips(dataSource) {
  return <div>PlainList 数据无效</div>;
}