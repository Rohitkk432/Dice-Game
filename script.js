'use strict';
const roll_btn=document.querySelector('.btn--roll');
const hold_btn=document.querySelector('.btn--hold');
const new_btn=document.querySelector('.btn--new');
let dice=document.querySelector('.dice');
let playing=0;
let score=0;
let total_score=[0,0];


function init(){
    playing=0;
    score=0;
    total_score=[0,0];
    dice.classList.add('hidden');
    document.querySelector('#score--0').textContent=0;
    document.querySelector('#score--1').textContent=0;
    document.querySelector('#current--0').textContent=0;
    document.querySelector('#current--1').textContent=0;
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    roll_btn.disabled=false;
    hold_btn.disabled=false;
}
function rolling(){
    let i;
    i=Math.trunc(Math.random()*6)+1;
    dice.src=`./dice-${i}.png`;
    return i;
};
function winner(){
    if(document.querySelector(`#score--${playing}`).textContent>=100){
        document.querySelector(`.player--${playing}`).classList.add('player--winner');
        roll_btn.disabled=true;
        hold_btn.disabled=true;
    }
};
function change_player(){
    total_score[`${playing}`]+=score;
    document.querySelector(`#score--${playing}`).textContent=total_score[`${playing}`];
    document.querySelector(`#current--${playing}`).textContent=0;
    winner();
    if (playing==0){
        playing=1;
    }else if (playing==1){
        playing=0
    };
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
    score=0;
};

roll_btn.addEventListener('click',function(){
    dice.classList.remove('hidden');
    let val=rolling();
    if (val!=1){
        score+=val
        document.querySelector(`#current--${playing}`).textContent=score;
    }else{
        score=0;
        document.querySelector(`#current--${playing}`).textContent=score;
        change_player()
    }
});
hold_btn.addEventListener('click',change_player);
new_btn.addEventListener('click',init);


init();