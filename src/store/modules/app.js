import { getAdminSetting, setAdminSetting } from '@/config/datastore'

const app = {
  state: {
    setting: getAdminSetting(),
    menu: [],
    menuItems: [] // 平铺菜单
  },
  mutations: {
    SAVE_SETTING: (state, setting) => {
      state.setting = { ...setting }
    },
    SET_MENU: (state, { menu, menuItems }) => {
      state.menu = menu
      state.menuItems = menuItems
    },
    SET_SIDEBAR: (state) => {
      state.setting.sidebar = !state.setting.sidebar
      setAdminSetting(state.setting)
    },
    SET_TAGS_VIEW: (state) => {
      state.setting.tagsView = !state.setting.tagsView
      setAdminSetting(state.setting)
    },
    SET_THEME: (state, theme) => {
      state.setting.theme = theme
      setAdminSetting(state.setting)
    },
    SET_MENU_TYPE: (state, type) => {
      state.setting.menuType = type
      setAdminSetting(state.setting)
    },
    SET_WIDE_TYPE: (state, type) => {
      state.setting.wideType = type
      setAdminSetting(state.setting)
    },
    TOGGLE_FIXED_HEADER: (state, isFixed) => {
      state.setting.fixedHeader = isFixed
      setAdminSetting(state.setting)
    },
    TOGGLE_FIXED_ASIDE: (state, isFixed) => {
      state.setting.fixedAside = isFixed
      setAdminSetting(state.setting)
    }
  },
  actions: {
    setRouterMenu: ({ commit, state }, menus) => {
      return new Promise(resolve => {
        const menu = setMenu(menus)
        const menuItems = getMenuItems(menu)
        commit('SET_MENU', { menu, menuItems })
        resolve({ menu, menuItems })
      })
    },
    toggleSideBar: ({ commit }) => {
      commit('SET_SIDEBAR')
    },
    toggleTagsView: ({ commit }) => {
      commit('SET_TAGS_VIEW')
    },
    setThemeMode: ({ commit }, theme) => {
      document.body.className = `theme-${theme}`
      commit('SET_THEME', theme)
    },
    setMenuType: ({ commit }, type) => {
      commit('SET_MENU_TYPE', type)
    },
    setWideType: ({ commit }, type) => {
      commit('SET_WIDE_TYPE', type)
    },
    toggleFixedHeader: ({ commit }, isFixed) => {
      commit('TOGGLE_FIXED_HEADER', isFixed)
    },
    toggleFixedAside: ({ commit }, isFixed) => {
      commit('TOGGLE_FIXED_ASIDE', isFixed)
    }
  }
}

// 菜单树拼接子父级关系
function setMenu(menus) {
  const all = []
  const mapper = (route, parent) => {
    const parents = parent ? parent.split(',') : []
    parents.push(route.name)
    const child = []
    if (route.children) {
      route.children.forEach(item => {
        child.push(mapper(item, parents.join(',')))
      })
    }
    if (child.length === 0) {
      return {
        ...route,
        parents: parents
      }
    }
    return {
      ...route,
      parents: parents,
      children: child
    }
  }
  menus.forEach(item => {
    all.push(mapper(item))
  })
  return all
}

// 递归平铺菜单树
function getMenuItems(menus) {
  const all = []
  const mapper = (menu) => {
    if (menu.name && !menu.children) {
      all.push({ ...menu })
    }
    if (menu.children) {
      menu.children.forEach(item => {
        mapper(item)
      })
    }
  }
  menus.forEach(item => {
    mapper(item)
  })
  return all
}

export default app
