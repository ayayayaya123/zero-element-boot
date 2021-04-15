module.exports = {
    xname: 'Flexbox',
    props: {
      align: 'start',
      direction: 'column',
      justify: 'center'
    },
    // cart: {
    //   xname: 'HoverShadowCart',
    //   props: {
    //     padding: '16px',
    //   }
    // },
    children: [
      
      {
        presenter: 'TextContent',
        gateway: {
          xname: 'Binding',
          props: {
            binding: {
              title: 'title',
              describe: 'describe'
            }
          }
        }
      },
      {
        presenter: 'ImageAnimation',
        gateway: {
          xname: 'Binding',
          props: {
            binding: {
              url: 'imgUrl'
            }
          }
        }
      },
      {
        presenter: 'FootContent',
        gateway: {
          xname: 'Binding',
          props: {
            binding: {
              adType: 'adType',
              createTime: 'createTime'
            }
          }
        }
      },
    ]
}