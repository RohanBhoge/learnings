let string="hello world";
function stringToUppercase(str){
len=string.length;
for(i=0;i<len;i++){
if(str[0]==str[i]){
    str[i]=str[0].toUpperCase()
}
else if(str[i]==" "){
    str[i+1]=str[i+1].toUpperCase()
}
console.log(str)
}}
stringToUppercase(string);