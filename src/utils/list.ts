
// 将一颗树扁平化
function flatTree<T>(tree: T[], key: string = 'children'): T[] {
    let res: T[] = [];
    function flat(arr: T[]) {
        arr.forEach((item: T) => {
            res.push(item);
            if ((item as any)[key] && (item as any)[key].length) {
                flat((item as any)[key]);
            }
        })
    }
    flat(tree);
    return res;
}

// 遍历一个树,如果有返回值,当返回值为true时,会抛出结果停止遍历.
function eachTree<T>(tree: T[], call: (item: T) => any, childKey: keyof T ='children' as keyof T){
    for(let i = 0;i<tree.length;i++){
        let result = call(tree[i])
        if (result){
            return result
        }
        if (tree[i][childKey]){
            result = eachTree(tree[i][childKey] as any as T[], call, childKey)
            if (result) {
                return result
            }
        }
    }
}


export default {
    flatTree,
    eachTree
}