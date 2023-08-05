import { compileFlatState, isEmpty } from '@/utils/util'

// 资产概况图
export const mockData = {
  code: '00',
  message: '操作成功',
  data: {
    id: '-1',
    name: '贴源库数据源',
    expand: true,
    children: [
      {
        id: '1',
        name: '主数据',
        expand: false,
        children: [
          {
            id: 'ff80808187b7aa280187bb0cdf0b0000',
            name: 'student',
            expand: false,
          },
          {
            id: 'ff80808187b1019b0187b123b68e0000',
            name: 'staff_base_info',
            expand: false,
          },
          {
            id: '2c9280888822a5c60188232a18580031',
            name: 'test_teacher_xx',
            expand: false,
          },
          {
            id: '2c9280888822a5c60188277d05de01bf',
            name: 'test_qy_xx',
            expand: false,
          },
          {
            id: '2c9280888822a5c6018828d1348c0359',
            name: 'test_ggjs_xx',
            expand: false,
          },
          {
            id: '2c928083882e651b018831a062fc0041',
            name: 'test_yy_xx',
            expand: false,
          },
          {
            id: '2c92808388330fcf0188429736670134',
            name: 'test_sjkc_xx',
            expand: false,
          },
          {
            id: '2c92808388461d37018846b702e2008a',
            name: 'test_ts_aa_xx',
            expand: false,
          },
          {
            id: '2c92808288474ca1018847dd8cd70058',
            name: 'test_gljs_xx',
            expand: false,
          },
          {
            id: '2c9280868848072801884b80f1e200d6',
            name: 'test_qsjs_xx',
            expand: false,
          },
          {
            id: '2c928086884c2bb401884cbc595f0035',
            name: 'test_pxjs_xx',
            expand: false,
          },
          {
            id: '2c928086884d2f7c0188508a5281004e',
            name: 'test_zzxx_xx',
            expand: false,
          },
          {
            id: '2c928086884d2f7c0188518ada3d0100',
            name: 'test_tsjs_xx',
            expand: false,
          },
          {
            id: '2c928086884d2f7c0188523228810155',
            name: 'test_xy_js',
            expand: false,
          },
          {
            id: '2c928086884d2f7c018855c4fb4a018b',
            name: 'test_yljs_xx',
            expand: false,
          },
          {
            id: '2c928086886fa7600188749e101c00b3',
            name: 'test_kx_xx',
            expand: false,
          },
          {
            id: '2c928086886fa7600188760935ad0109',
            name: 'test_yw_xx',
            expand: false,
          },
          {
            id: '2c928086886fa760018876252403013a',
            name: 'test_sx_xx',
            expand: false,
          },
          {
            id: '2c9280868888fd8d01888e63a2a2034f',
            name: 'test_ls_xx',
            expand: false,
          },
          {
            id: '2c9280868888fd8d01888e6c50f0039f',
            name: 'uuuuuuuu',
            expand: false,
          },
          {
            id: '2c9280868888fd8d018894966cf90994',
            name: 'test_bj_xx',
            expand: false,
          },
          {
            id: '2c9280868888fd8d018894b483b70a25',
            name: 'test_xbjx_xx',
            expand: false,
          },
          {
            id: '2c9280868894be4a018894d82f78001a',
            name: 'test_db_xx',
            expand: false,
          },
          {
            id: '2c9280888919ea9d01891a7eb38f0000',
            name: 'test_teacher',
            expand: false,
          },
          {
            id: '2c928088894972bd01894e5ceef40101',
            name: 'jsxx',
            expand: false,
          },
          {
            id: '2c928088894972bd018952116b480265',
            name: 'qyzt',
            expand: false,
          },
        ],
      },
      {
        id: '2',
        name: '交易数据',
        expand: false,
        children: [
          {
            id: '4028408187b70c0d0187b71b347b002a',
            name: 'zx_stu_mid_info',
            expand: false,
          },
          {
            id: '4028807a87b77e040187b78970810000',
            name: 'wxw_test',
            expand: false,
          },
          {
            id: '4028408187bcb8510187bce6db05013e',
            name: 'eee',
            expand: false,
          },
          {
            id: '4028408187bcb8510187bd4a6bfc0165',
            name: 'nat_xzxk_info',
            expand: false,
          },
          {
            id: '4028408187bcb8510187c0c1301902f9',
            name: 'student_huji_info',
            expand: false,
          },
          {
            id: '4028408187bcb8510187c1c332380353',
            name: 'my_wxw_test',
            expand: false,
          },
          {
            id: '4028408187bcb8510187c5ec2a3f0436',
            name: 'data_source_from_other_zx',
            expand: false,
          },
          {
            id: 'ff80808187c543530187c5629cbc004f',
            name: 'db_test',
            expand: false,
          },
          {
            id: 'ff80808187c659b50187e5ff05f50037',
            name: 'test_js_kq',
            expand: false,
          },
          {
            id: '2c9280888822a5c60188239b59ca00b5',
            name: 'test_sjpz',
            expand: false,
          },
          {
            id: '2c9280888822a5c60188287917390300',
            name: 'fcf117test',
            expand: false,
          },
          {
            id: '2c9280888822a5c6018827afda380293',
            name: 'test05172',
            expand: false,
          },
          {
            id: '2c9280888822a5c601882c64ea5e0395',
            name: 'test_ts_a_xx',
            expand: false,
          },
          {
            id: '2c9280888822a5c601882c87cfb8040e',
            name: 'fcf117testzx',
            expand: false,
          },
          {
            id: '2c9280888822a5c601882c88b76f042a',
            name: 'test_fb_xx',
            expand: false,
          },
          {
            id: 'ff808081882c848701882ce6a5e10015',
            name: 'test_child_info',
            expand: false,
          },
          {
            id: '2c928088882d800b01882e3dd7530022',
            name: 'test_0516yz',
            expand: false,
          },
          {
            id: '2c928083882e651b018831993f530015',
            name: 'test_idii',
            expand: false,
          },
          {
            id: '2c928083882e651b01883299875000ba',
            name: 'test_hmd_xx',
            expand: false,
          },
          {
            id: '2c928083882e651b018832c720a500df',
            name: 'test_rmd_xx',
            expand: false,
          },
          {
            id: '2c9280868848072801884b59bae50050',
            name: 'test_cap_xx',
            expand: false,
          },
          {
            id: '2c928086884d2f7c01885702284e01cc',
            name: 'test_bug3297',
            expand: false,
          },
          {
            id: '2c928087886a1e1301886b56cee20024',
            name: 'test_dwy_cs',
            expand: false,
          },
          {
            id: '2c928087886a1e1301886bdfae830077',
            name: 'test_jh_psqlt',
            expand: false,
          },
          {
            id: '4028807a87acab130187acac7fec0000',
            name: 'ceshi_zyj0423',
            expand: false,
          },
          {
            id: '2c928083887adc7f01887afd474a0053',
            name: 'fcfchangetest',
            expand: false,
          },
          {
            id: '2c928083887adc7f01887b0b1d96009f',
            name: 'zq_test_dict',
            expand: false,
          },
          {
            id: '2c9280868888fd8d01888e721d9203b4',
            name: 'test_btx_xx',
            expand: false,
          },
          {
            id: '2c9280868888fd8d01888f5219140558',
            name: 'btx_test',
            expand: false,
          },
          {
            id: '2c9280868888fd8d01888f85598b058d',
            name: 'btx_test2',
            expand: false,
          },
          {
            id: '2c9280868888fd8d018893bf8b270675',
            name: 'btx_01',
            expand: false,
          },
          {
            id: '2c9280868888fd8d018893e85a570796',
            name: 'test_btx_xxs',
            expand: false,
          },
          {
            id: '2c9280868888fd8d018893f20d590888',
            name: 'test_btx_xxt',
            expand: false,
          },
          {
            id: '2c9280868888fd8d01889401172b08f8',
            name: 'test_btx_sxx',
            expand: false,
          },
          {
            id: '2c9280868894be4a018895428b9400f8',
            name: 'test_btx_xxl',
            expand: false,
          },
          {
            id: '2c9280868894be4a018898803fb00162',
            name: 'test_ms_xx',
            expand: false,
          },
          {
            id: '2c9280868894be4a018898a2c100025c',
            name: 'btx06',
            expand: false,
          },
          {
            id: '2c9280868894be4a018899cb2d7803b9',
            name: 'test_btx_uub',
            expand: false,
          },
          {
            id: '2c9280868894be4a01889dd3c14203f9',
            name: 'test_ld_xx',
            expand: false,
          },
          {
            id: 'ff808081889ed2d701889ed925720018',
            name: 'test_nullable',
            expand: false,
          },
          {
            id: '2c928086889e05d101889edff5290030',
            name: 'jj_hello',
            expand: false,
          },
          {
            id: '2c928086889e05d101889f5c30300077',
            name: 'test_jdong_xx',
            expand: false,
          },
          {
            id: '2c928086889e05d10188a3cb827000bb',
            name: 'test_yh_xx',
            expand: false,
          },
          {
            id: '2c92808688ad07b90188ad1aad37001f',
            name: 'test_qbtx_xx',
            expand: false,
          },
          {
            id: '2c92808688ad07b90188ad286bc40099',
            name: 'test_qbtx_clicktwo',
            expand: false,
          },
          {
            id: '2c92808688ad07b90188ad8c0f6800f3',
            name: 'test_lkl_xx',
            expand: false,
          },
          {
            id: '2c92808688ae65b50188b2505e01003a',
            name: 'test_zd_jh_xx',
            expand: false,
          },
          {
            id: '2c92808688b257060188b7f2fbc4001a',
            name: 'test_wl_xx',
            expand: false,
          },
          {
            id: '2c92808688b257060188be168689012c',
            name: 'test_psql_zx',
            expand: false,
          },
          {
            id: '2c92808889064b5f01890af1685400ad',
            name: 'test_hx_xx',
            expand: false,
          },
          {
            id: '2c928088894972bd01894cbb866c002f',
            name: 'test_jk_xx',
            expand: false,
          },
          {
            id: 'ff808081894e538b01894e56e19b0000',
            name: 'zq_test_nat_r',
            expand: false,
          },
          {
            id: '2c928088894972bd01894e8de08301c5',
            name: 'qyjyxx',
            expand: false,
          },
          {
            id: '2c928088894972bd01894ea16b2f01f8',
            name: 'test_iijs_xx',
            expand: false,
          },
          {
            id: '2c928088894972bd018952550e8f02a0',
            name: 'test_jsgl_yz',
            expand: false,
          },
          {
            id: '2c928088894972bd0189526f90ca02cf',
            name: 'test_jsjhkl_xx',
            expand: false,
          },
          {
            id: '2c92808889528795018953a6af5f00c8',
            name: 'test_js_five',
            expand: false,
          },
          {
            id: '2c92808889528795018953493bdb0088',
            name: 'test_glyz_four',
            expand: false,
          },
          {
            id: '2c9280888952879501896165b3b900f6',
            name: 'test_js_six',
            expand: false,
          },
          {
            id: '2c92808889528795018962fa60880d21',
            name: 'test777',
            expand: false,
          },
          {
            id: '2c928088895287950189679a1f2a1162',
            name: 'test_rq_fw',
            expand: false,
          },
          {
            id: 'ff808081896bc33701896bdb03470099',
            name: 'test_js_shi',
            expand: false,
          },
          {
            id: '2c9280888971bd960189725b4a110413',
            name: 'front_ys',
            expand: false,
          },
          {
            id: '2c9280888971bd96018971da01f20103',
            name: 'test_zl717',
            expand: false,
          },
          {
            id: '2c9280888975ed7101897682ae5902be',
            name: 'test_yzgz720',
            expand: false,
          },
          {
            id: '2c9280888975ed71018976599c8c016a',
            name: 'textymf11',
            expand: false,
          },
          {
            id: '2c928088898591e8018985fac3420043',
            name: 'test_btyz721',
            expand: false,
          },
          {
            id: '2c9280858986a36d018987204720042e',
            name: 'test_time724',
            expand: false,
          },
          {
            id: '2c9280858990511b0189916128fe0107',
            name: 'test_js_seventeen',
            expand: false,
          },
          {
            id: '2c92808389919ef2018991ada2780024',
            name: 'test_lx718',
            expand: false,
          },
          {
            id: '2c9280838991bc5901899558f0bd008f',
            name: 'test_js_qi111',
            expand: false,
          },
          {
            id: '2c928085899a1e5601899a8a6e4f03cf',
            name: 'test_hb_mt',
            expand: false,
          },
          {
            id: '2c928085899a956d01899a9dda560053',
            name: 'test_hb_mte1',
            expand: false,
          },
          {
            id: '2c9280838991bc59018996733ea20707',
            name: 'test_summt',
            expand: false,
          },
          {
            id: '2c928085899a1e5601899a2916fb0035',
            name: 'test_qj724',
            expand: false,
          },
          {
            id: '2c928085899a1e5601899a6467ec012f',
            name: 'test_qc_rmt',
            expand: false,
          },
          {
            id: '2c928085899a956d01899b10f31b0093',
            name: 'test_js_tw',
            expand: false,
          },
          {
            id: '2c928085899a956d01899b2bb7b500ac',
            name: 'test_bzd_vcmt',
            expand: false,
          },
          {
            id: '2c928085899a956d01899b2f31fa00c2',
            name: 'test_zd_cmt',
            expand: false,
          },
          {
            id: '2c928085899a956d01899b3530ff00d8',
            name: 'test_amt1',
            expand: false,
          },
          {
            id: '2c928085899a956d01899b42b9630106',
            name: 'test_hb_22',
            expand: false,
          },
          {
            id: '2c928085899a956d01899b4b03440131',
            name: 'test_qc22',
            expand: false,
          },
          {
            id: '2c928085899a956d0189aac709fd05c1',
            name: 'qyjyxx2',
            expand: false,
          },
          {
            id: '2c92808589aad51f0189aae1201d0021',
            name: 'test_bug_hg1',
            expand: false,
          },
          {
            id: '2c92808589aad51f0189ab2237450116',
            name: 'test_xs_sj_bug',
            expand: false,
          },
          {
            id: '2c92808689bad0580189be08b0dd0001',
            name: 'testty',
            expand: false,
          },
          {
            id: '2c92808689b98e720189ba5d0b850288',
            name: 'test_js_eight',
            expand: false,
          },
          {
            id: '2c92808689bad0580189be0cb3ff002b',
            name: 'test_lx_jh',
            expand: false,
          },
          {
            id: 'ff80808189ba87570189ba8fedae0000',
            name: 'test_jh_lxtwo',
            expand: false,
          },
        ],
      },
      {
        id: '3',
        name: '参考数据',
        expand: false,
        children: [
          {
            id: '2c9280888822a5c601882d64d10c0464',
            name: 'test_ck_zl',
            expand: false,
          },
        ],
      },
      {
        id: '4',
        name: '分析数据',
        expand: false,
        children: [
          {
            id: '2c928086884d2f7c018850e0901a00d8',
            name: 'test_fxss_xx',
            expand: false,
          },
        ],
      },
      {
        id: '99',
        name: '其他数据',
        expand: false,
        children: [
          {
            id: 'ff80808187c0b14b0187c0c77b3a0012',
            name: 'class_info',
            expand: false,
          },
        ],
      },
    ],
  },
  successful: true,
}

// 只处理除跟节点之外的数据
function tranformData(data) {
  let edges = [] // 线
  let nodes = [] // 节点集合
  // 拉平数据
  const flatData = compileFlatState(data)

  // 拉平之后遍历进行填充
  flatData.forEach((item, index) => {
    const { node } = item
    const temp = {
      id: node.id,
      name: node.name,
      label: node.name,
      index,
      level: item.parents?.length || 0,
      isLeaf: !item.children,
      tag: node.name,
    }
    const hasChildren = !isEmpty(item.children)
    //  如果存在子项，则追加label
    if (hasChildren) {
      temp.label = `${temp.name}\n(${item.children.length})`
      temp.childrenNum = item.children.length
      // 拼接连接线
      node.children.forEach(child => {
        edges.push({
          source: node.id,
          target: child.id,
        })
      })
    }
    if (temp.isLeaf) {
      temp.parents = [flatData[item.parent].node]
    }

    nodes.push(temp)
  })
  // console.log(flatData)
  // console.log({ edges, nodes })
  return { edges, nodes }
}

export function fomatTreeData() {
  const mapper = (node, disabled = false) => {
    const mapperNode = {
      id: node.id,
      name: node.name,
      disabled,
    }
    if (node.children && node.children.length) {
      mapperNode.children = node.children.map(item => mapper(item, false))
    }
    return mapperNode
  }

  return mockData.data.children.map(item => mapper(item, true))
}

export function getMockData() {
  return tranformData(mockData.data.children)
}
