class Selection{
    constructor(sentence,num){
        this.sentence = sentence;
        this.num = num;
    }
}

function isEmpty(field){
    return new Promise((res,rej)=>{
        if(field.value == ''){
            field.style.borderBottom = "2px solid red";

            const emptyPromise  = new Promise((resolve,rej)=>{
                field.focus();
                setTimeout(()=>{
                    resolve("resolved");   
                },3000);
            });

            emptyPromise.then((res)=>{
                field.style.border = "1px solid gainsboro";
            });
            rej('rej');
        } else {
            res('res');
        }
    })
}

let sentence = document.getElementById('sentence');
let number = document.getElementById('nos');
let options_dis = document.getElementById('selection');

let arrObj = [];

async function instruct(){
    await isEmpty(sentence);
    await isEmpty(number);

    let obj = new Selection(sentence.value,number.value);
    arrObj.push(obj);
    console.log(arrObj, Selection);

    options_dis.innerHTML = '';

    for(obj of arrObj){
        options_dis.innerHTML += `<li> "${obj.sentence}" &nbsp&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp&nbsp   ${obj.num} Times </li>`; 
    }

    sentence.value = '';
    number.value = '';

    sentence.focus();
}

sentence.addEventListener("keydown",async (e)=>{
    if(e.code == "Enter"){
        instruct();
    }
})

number.addEventListener("keydown",async (e)=>{
    if(e.code == "Enter"){
        instruct();
    }
})

function sort(arr){
    for(let i=0;i<arr.length - 1;i++){
        for(let j=1;j<arr.length - i;j++){
            if(arr[j].num > arr[j-1].num){
                let temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

let display = document.getElementById("displayOpt");
let input = document.getElementById("input");
let selectArr = [];

function displayOpt(){
    if(selectArr.length < 4){
        for(obj of selectArr){
            display.innerHTML += `<p>${obj.sentence}</p>`;
        }
    } else {
        for(let i=0;i<3;i++){
            display.innerHTML += `<p>${selectArr[i].sentence}</p>`;
        }
    }
}

function removeOpt(){
    display.innerHTML = ``;
}

input.addEventListener("keyup", (e)=>{
    removeOpt();
    
    let sortedArr = sort(arrObj);
    let regex = `${input.value}`;
    for(obj of sortedArr){
        if(obj.sentence.match(regex)){
            selectArr.push(obj);
        }
    }

    console.log("selected Array = ",selectArr);

    displayOpt();
    selectArr = [];
})






