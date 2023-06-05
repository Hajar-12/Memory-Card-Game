let arr = [
    '<i class="fa-solid fa-carrot"  data-id="1"></i>',
    '<i class="fa-solid fa-carrot"  data-id="1"></i>',
    '<i class="fa-solid fa-burger"   data-id="2"></i>',
    '<i class="fa-solid fa-burger"   data-id="2"></i>',
    '<i class="fa-solid fa-bowl-food "    data-id="3"></i>',
    '<i class="fa-solid fa-bowl-food "    data-id="3"></i>',
    '<i class="fa-solid fa-egg egg"     data-id="4"></i>',
    '<i class="fa-solid fa-egg egg"     data-id="4"></i>',
    '<i class="fa-solid fa-cheese"    data-id="5"></i>',
    '<i class="fa-solid fa-cheese"    data-id="5"></i>',
    '<i class="fa-solid fa-fish-fins"     data-id="6"></i>',
    '<i class="fa-solid fa-fish-fins"     data-id="6"></i>',
    '<i class="fa-solid fa-lemon"    data-id="7"></i>',
    '<i class="fa-solid fa-lemon"    data-id="7"></i>',
    '<i class="fa-solid fa-ice-cream"     data-id="8"></i>',
    '<i class="fa-solid fa-ice-cream"     data-id="8"></i>',
    '<i class="fa-solid fa-bread-slice"    data-id="9"></i>',
    '<i class="fa-solid fa-bread-slice"    data-id="9"></i>',
    '<i class="fa-solid fa-bacon"     data-id="10"></i>',
    '<i class="fa-solid fa-bacon"     data-id="10"></i>',
    '<i class="fa-solid fa-apple-whole"    data-id="11"></i>',
    '<i class="fa-solid fa-apple-whole"    data-id="11"></i>',
    '<i class="fa-solid fa-cookie"     data-id="12"></i>',
    '<i class="fa-solid fa-cookie"     data-id="12"></i>',    
]

const l = arr.slice(0,arr.length/3)
const m = arr.slice(0,arr.length/2)
const cards = document.querySelector('.card')   
const startGame = document.querySelector('.start-form')
const start = document.querySelector('.play-card')
const easy = start.querySelector('.easy')
const medium = start.querySelector('.medium')
const hard = start.querySelector('.hard')
const timer = document.querySelector('#timer')
let second , min , hour ;


function generateRandom(arr,div){
    for(let i=arr.length-1 ;i>=0;i--){
        let j = Math.floor(Math.random() * i)
        let k = arr[i]
        arr[i] = arr[j]
        arr[j] = k
        const count = Math.abs(i - arr.length)
        
        div.innerHTML+= `<div class='memory'><div class='front-face c'id="${count}">${arr[i]}</div><div class='back-face c'></div></div>`
}
return div;
}
const card = cards.querySelectorAll('.memory')
const b =  document.querySelectorAll(' i')
let hasFlippedCard = false;
    let firstCard , SecondCard , firstCardId , SecondCardId,firstId,secondId ;
function flipCard(){

    this.classList.toggle('flip')

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        firstId = firstCard.querySelector('.c').id
        
        firstCardId = firstCard.querySelector('.front-face i').dataset.id
        
        
    }
    else{
        hasFlippedCard = false;
        SecondCard = this;
        secondId = SecondCard.querySelector('.c').id
        SecondCardId = SecondCard.querySelector('.front-face i').dataset.id
        comparing(firstCardId,SecondCardId,firstCard,SecondCard,firstId,secondId)

    }

   
}
function comparing(id1,id2,firstCard,SecondCard,firstId,secondId){
    
if(id1 === id2){
    if(!(firstId === secondId)){
        firstCard.classList.add('disable')
        SecondCard.classList.add('disable')
setTimeout(()=>{
    firstCard.querySelector('.front-face').classList.add('green-background')
    SecondCard.querySelector('.front-face').classList.add('green-background')
},300)
 
    }
    let countWin = 0;
    const done = cards.querySelectorAll('.memory')
     done.forEach(a=>{
         if(a.classList.contains('flip')){
            countWin++;
            if(countWin === done.length){
                setTimeout(()=>{    
                    clearTimeout(timex);
                    Swal.fire({
                        title: 'You Win',
                        text:`The total Time is:  ${hour.innerText}  ${min.innerText}  ${second.innerText}`,
                        // text: 'You Win',
                    })
                    .then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            hours = 0;      mins = 0;      seconds = 0;
                            hours.innerHTML = '00:';
                            seconds.innerHTML = '00'
                                clearTimeout(timex);
                            location.reload()

                        }
                    })
                },400)
                
            }
         }
     })
}
else{
    setTimeout(()=>{
        firstCard.classList.remove('flip')
        SecondCard.classList.remove('flip')
    },500)
   

}
}

// CHOOSE LEVEL
start.addEventListener('click',()=>{
    start.classList.add('flip')
})

easy.addEventListener('click',()=>{
    chooseLevel(l,'easy-width','easy-padding')
})
hard.addEventListener('click',()=>{
    chooseLevel(arr,'hard-width','hard-padding')
})
medium.addEventListener('click',()=>{
    chooseLevel(m,'medium-width','medium-padding')
})
function chooseLevel(array,width,customClass){
    cards.classList.add(customClass)
    startGame.classList.add('hide')
    cards.classList.remove('hide')
    cards.classList.add(width)
    generateRandom(array,cards)
    const card = cards.querySelectorAll('.memory')
    card.forEach(car=>car.addEventListener('click',flipCard))
    timer.innerHTML = ` <span id="hours">00:</span>
    <span id="mins">00:</span>
    <span id="seconds">00</span> `
     hour = document.getElementById('hours');
     second = document.getElementById('seconds');
     min = document.getElementById('mins');
     startTimer();
}

let  hours = 0;
let  mins = 0;
let  seconds = 0;

function startTimer(){
  timex = setTimeout(function(){

      seconds++;
    if(seconds >59){seconds= 0;mins++;
       if(mins>59) {
       mins=0;hours++;}
         if(hours <10) {hour.innerText = `0${hours}:`} else {hour.innerText =` ${hours}:`;}
                        
    if(mins<10){                     
     min.innerText = `0${mins}:`;}       
       else {min.innerText = `${mins}:`};
                   }    
    if(seconds <10) {
      second.innerText = `0${seconds}`;} else {
      second.innerText = seconds;
      }
     

      startTimer();
  },1000);
}
   