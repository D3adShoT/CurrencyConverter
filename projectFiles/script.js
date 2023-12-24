const BASE_URL ='https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
updateExchangeRate = async () =>{
    let amtComp = document.querySelector(".amount input");
    let amt = amtComp.value;
    if(amt ==0 || amt <0){
        amt = 1;
        amtComp.value = 1;
    }
    let newCallURL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    console.log(newCallURL);
    let resp = await fetch(newCallURL);
    let data = await resp.json();
    let rate = data[toCurr.value.toLowerCase()];
    let infoComp = document.querySelector(".info");
    let totalVal = amt*rate;
    infoComp.innerText = `${amt} ${fromCurr.value} = ${totalVal} ${toCurr.value}`;

}
for(let drops of dropdowns){
    for(code in countryList){
        let newOption = document.createElement("option");
        newOption.innerHTML = code;
        newOption.value = code;
        if(drops.name =="from" && newOption.value =="USD"){
            newOption.selected ="selected";
        }
        if(drops.name =="to" && newOption.value =="INR"){
            newOption.selected ="selected";
        }
        drops.append(newOption);
    }
    drops.addEventListener("change",(evt)=>{
        updateFlag(evt);
    });
}
const updateFlag = (ele) =>{
    let newOpt = ele.target.value;
    let newImgURL = `https://flagsapi.com/${newOpt}/flat/64.png`;
    let imgComp = ele.target.parentElement.querySelector("img");
    imgComp.src =newImgURL;
}
btn.addEventListener("click",(event)=>{
    event.preventDefault();
    updateExchangeRate();
});
window.addEventListener("load",()=>{
    updateExchangeRate();
});
