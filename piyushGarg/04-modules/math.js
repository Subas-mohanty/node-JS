function add(a,b){
    return a + b;
}
function sub(a,b){
    return a - b;
}
module.exports=add;
// module.exports=sub; // this is wrong , this will override the add function export, so to solve this we can do something like this , by passing them as objects

// module.exports={
//     add,
//     sub
// };

// or we can export like this

// exports.product=(a,b)=>a*b; // you can't use both object type and this type
// exports.divide=(a,b)=>a/b;