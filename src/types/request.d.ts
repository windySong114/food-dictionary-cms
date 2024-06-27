// 推荐使用的Promsie返回结构
declare type ArrayResult<T = any> = [boolean,T]

// 请求发送的结构体
type RequestOptionMethod = 'POST' | 'post' | 'GET' | 'get' | 'PUT' | 'put' | 'DELETE' | 'delete'
declare type RequestOption = {
    url:string,
    method?:RequestOptionMethod,
    data?:any,
    params?:any,
    headers?:any,
    responseType?:any,
    onUploadProgress?:(e:any)=>void,
    baseURL?:string,
    banAutoToast?:boolean,
    cancelToken?:import('axios').CancelToken
    transformRequest?:Array<any>
};

// 声明路由当前项类型
declare type RouteItem<T = any> = {
	id?: string | number;
	path: string;
	name?: string | symbol | undefined | null;
	title?: string;
	url?: string;
	redirect?: string;
	hidden?: boolean;
	children: T[];
	k?: T;
	meta?: {
		title?: string;
		isLink?: string;
		hidden?: boolean;
		isKeepAlive?: boolean;
		isAffix?: boolean;
		isIframe?: boolean;
		roles?: string[];
		icon?: string;
		isDynamic?: boolean;
		isDynamicPath?: string;
		isIframeOpen?: string;
		loading?: boolean;
	};
	query?: { [key: string]: T };
	params?: { [key: string]: T };
	contextMenuClickId?: string | number;
	commonUrl?: string;
	isFnClick?: boolean;
	transUrl?: string;
};

// 用户信息
declare type UserInfo<T = any> = {
	id: number | string;
	username: string;
	nickname: string;
	roleName: string;
	roleCode: string;
	password: string;
	avatar: string;
	phone: string | number;
	email: string;
	status: number;
	token: string;
	hasLogin: boolean;
	roles: Array<string>;
	verifyCode: string;
};

// 声明路由 to from
declare interface RouteToFrom<T = any> extends RouteItem {
	path?: string;
	children?: T[];
}

// 声明路由当前项类型集合
declare type RouteItems<T extends RouteItem = any> = T[];

// 声明 ref
declare type RefType<T = any> = T | null;

// 声明 HTMLElement
declare type HtmlType = HTMLElement | string | undefined | null;

// 申明 children 可选
declare type ChilType<T = any> = {
	children?: T[];
};

// 申明 数组
declare type EmptyArrayType<T = any> = T[];

// 申明 对象
declare type EmptyObjectType<T = any> = {
	[key: string]: T;
};

// 申明 EnumsType
declare type EnumsType = {
	value: string | number;
	label: string | number;
};

// 鼠标滚轮滚动类型
declare interface WheelEventType extends WheelEvent {
	wheelDelta: number;
};
