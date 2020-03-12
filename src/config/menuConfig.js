const menuList = [{
    title: '首页',
    key: '/home',
    icon: 'home',
}, {
    title: '商品',
    key: '/products',
    icon: 'appstore',
    children: [{
        title: '品类管理',
        key: '/category',
        icon: 'bars'
    }, {
        title: '商品管理',
        key: '/product',
        icon: 'tool'
    }]
},{
    title: '用户管理',
    key: '/user',
    icon: 'user'
}]

export default menuList