var haveDebt = false 
var haveArrest = false 

console.log(haveDebt || haveArrest);
haveDebt = true
haveArrest = false 
console.log(haveDebt || haveArrest);
haveDebt = false 
haveArrest = true
console.log(haveDebt || haveArrest);
haveDebt = true
haveArrest = true
console.log(haveDebt || haveArrest);
 