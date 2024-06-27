
/**
 * 配置表单组件的单项配置
 */
type YlRef<T> = T | import('vue').Ref<T>

type YlFieldItem = {
    label:YlRef<string>,
    field?:string,
    placeholder?:string,
    startField?: string, //区间类型时代表开始时间的字段名
    endField?: string, //区间类型时代表结束时间的字段名
    province?:string, //省市区时 省的字段名
    city?: string, //省市区时 省的字段名
    fullWidth?: boolean, //省市区时 市的字段名
    area?: string, //省市区时 区的字段名
    provinceName?: string, // 省市区时 省中文名字段
    cityName?: string, // 省市区时 市中文名字段
    min?: number; //最小值
    areaName?: string, // 省市区时 区中文名字段
    type:ReturnType<typeof import('@/yl-admin/dynamic-form/enums/FieldTypeEnum').default.getValue>, //组件类型
    required?:YlRef<boolean>, //是否必填
    hidden?:YlRef<boolean>, // 是否隐藏
    readonly?:YlRef<boolean>, // 是否只读
    multiple?:boolean, // 是否多选
    fileLimit?:number, // 文件数量限制
    disabledDate?:(date:Date)=>boolean, // 不可选日期
    rule?:Array<any>, //验证规则
    activeText?: String, // 激活文本
    inactiveText?: String, // 失活文本
    activeValue?: any; // 激活值
    inactiveValue?: any; // 失活值
    props?:{            //部分组件需要props，主要是级联组件
        multiple?:boolean  //多选
        checkStrictly?:boolean, //是否子父级不关联
        emitPath?:boolean, //是否输出完整路径
        value?:string, //值的字段
        label?:string, //文字的字段
        children?:string, // 子级的字段名
        disabled?:string //可选状态
    },
    options?:YlRef<Array<any>>, // 下拉选项
    dict?: any, //枚举值
    dictExclude?:any[], // 传枚举值时，需要排除部分
    span?:number, // layout布局时的宽度
    serverMode?:ReturnType<typeof import('@/yl-admin/yl-file-upload/enum/SERVER_MODE').default.getValue>, // 文件上传组件的文件服务类型
    fileType?:ReturnType<typeof import('@/yl-admin/yl-file-upload/enum/FILE_TYPE').default.getValue>, //文件上传组件的文件类型
    rows?:number, //textarea的行数 
    valueFormat?:string // 日期选择器等组件的值类型
    noFloat?:boolean //input数字框时，不允许小数
}


type YlColItem = {
    label?:string,//同title
    title?:string,//同label
    field?:string, //字段名
    colType?:'selection'|'index'|'expand', //列类型
    sortable?:boolean, // 是否可排序
    hidden?:YlRef<boolean>, //是否隐藏
    width?:string |number, //列宽
    minWidth?:string |number, // 列宽最小值
    formatter?:(row:any,column:any,fieldData:any,ylIndex:number)=>string //值格式化
    dict?: any, //枚举值
    // 编辑态使用
    type?:ReturnType<typeof import('@/yl-admin/dynamic-form/enums/FieldTypeEnum').default.getValue>, // 表内编辑时
    genFieldConfig?:(row:any)=>Partial<YlFieldItem> //当表单内的编辑的配置是动态时，通过这个更新。
    children?: Array<Omit<YlColItem, 'children'>>  // 多级表头
} & Partial<Omit<YlFieldItem,'label' | 'span'>>  //继承表单项所有配置，用来控制编辑态


type YlDataListScopeRow = Record<string,any> & {
    ylIndex:number,     //当前页序号
    ylFullIndex:number //计算页面后的总序号
} 

type YlPageParam = {
    current?:number,
    size?:number
}
/**
 * tagsView的单个记录数据
 */
 type TagsViewItem = {
    path:string,
    meta:YlRouterMeta,
    query:any,
    params:any
}

/**
 * 路由的meta信息
 */

 type RouterMeta = {
    _id?:string,
    hidden:boolean,
    icon?:string | null,
    roles?:null,  // 不知道啥
    title?:string | null,
    _isHideSidebar?:boolean,
}

// 推荐使用的Promsie返回结构
declare type ArrayResult<T = any> = [boolean,T]

// 请求发送的结构体
type YlRequestOptionMethod = 'POST' | 'post' | 'GET' | 'get' | 'PUT' | 'put' | 'DELETE' | 'delete'
declare type YlRequestOption = {
    url:string,
    method?:YlRequestOptionMethod,
    data?:any,
    params?:any,
    headers?:any,
    responseType?:any,
    onUploadProgress?:(e:any)=>void,
    baseURL?:string,
    banAutoToast?:boolean,
    cancelToken?:import('axios').CancelToken
    transformRequest?:Array<any>
}