// 获取角色列表
export async function getRoleListApi(query:{
    size?: number,
    current?: number,
    roleName?: string
}){
    let [suc,res] = await $utils.https.request({
        url: "/role/list",
        method: "GET",
        params: query
    })
    return [suc,res]
}

// 新增/编辑角色
export async function saveRoleApi(data:{
    roleId?: string,
    roleName: string,
    remark?: string,
    status: number
}){
    let [suc,res] = await $utils.https.request({
        url: "/role/save",
        method: "POST",
        data:data
    })
    return [suc,res]
}

// 删除角色
export async function deleteRoleApi(roleId: string){
    let [suc,res] = await $utils.msg.confirm('此操作将删除该条数据, 是否继续?','温馨提示')
    if(!suc) return [false,null]
    let [roleSuc,roleRes] = await $utils.https.request({
        url:`/role/delete/${roleId}`,
        method:"POST",
    })
    return  [roleSuc,roleRes]
}

// 禁用/启用角色
export async function updatePublishStatusApi(roleId: string){
    let [suc,res] = await $utils.https.request({
        url: "/role/update_publish_status",
        method: "POST",
        data:{
            roleId
        }
    })
    return [suc,res]
}