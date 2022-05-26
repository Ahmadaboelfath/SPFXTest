export const addItemToArrayImmutably= (arr: any[], item)=>{
    let newArr = arr.slice(0);
    if(Array.isArray(item)){
        newArr = newArr.concat(item);
    }else{
        newArr.push(item);
    }
    return newArr;
}