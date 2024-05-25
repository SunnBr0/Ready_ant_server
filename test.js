let arr = [[1,1],[1,2],[2,1]]
for(let i = 0; i < arr.length; i++){
    if(arr[i][0] == 1&&arr[i][1] == 2){
        arr.splice(i,1)
    }
}
console.log(arr);