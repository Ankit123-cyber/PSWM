// var ul=document.getElementById("ul");
// var btn=document.getElementById("btn");
// btn.addEventListener("click",function(){
//     contactlist.forEach(element => {
//         var li=document.createElement('li');
//         li.innerText=element;
//         ul.append(li);
//     });
// })
const CopyButton=document.getElementById('btn-copy');
const inputval=document.getElementById('input-data');
CopyButton.onclick=function(){
    inputval.select();
   // document.execCommand('Copy');

   var displayCopiedMsg=document.getElementById('my-modal');
function showmodal(){
    displayCopiedMsg.style.display="block";
}
showmodal();

function showmodal(){
    displayCopiedMsg.style.display="block";
}
/*now show automatically after 1sec*/
setTimeout(showmodal,1000);
/*now close automatically after 2sec*/
function closemodal(){
    displayCopiedMsg.style.display="none";
}
setTimeout(closemodal,2000);


};






// CopyButton.addEventListener('click',(e)=>{
//     const contentd=document.getElementById('input-data').value;
//     navigator.clipboard.writeText(contentd);
//     const copied=navigator.clipboard.readText();
//     console.log(copied);
// })