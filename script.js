'use strict';
const roll_btn=document.querySelector('.btn--roll');
const hold_btn=document.querySelector('.btn--hold');
const new_btn=document.querySelector('.btn--new');
const rules_btn=document.querySelector('.btn--rules');
const close_btn=document.querySelector('.close-btn');
let dice=document.querySelector('.dice');
let playing=0;
let score=0;
let total_score=[0,0];

const particless = document.querySelector('.particless');

const confetti = ()=>{
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        particles: {
            number: {
                value: 0
            },
            color: {
                // value: ["#00FFFC", "#FC00FF", "#fffc00"]
                value: ["#ff5888", "#ff0249", "#e5c9d1"]
            },
            shape: {
                type: "confetti",
                options: {
                    confetti: {
                        type: ["circle", "square"]
                    }
                }
            },
            opacity: {
                value: 1,
                animation: {
                    enable: true,
                    minimumValue: 0,
                    speed: 2,
                    startValue: "max",
                    destroy: "min"
                }
            },
            size: {
                value: 20,
                random: {
                    enable: true,
                    minimumValue: 7
                }
            },
            links: {
                enable: false
            },
            life: {
                duration: {
                    sync: true,
                    value: 5
                },
                count: 1
            },
            move: {
                enable: true,
                gravity: {
                    enable: true,
                    acceleration: 20
                },
                speed: 35,
                decay: 0.1,
                direction: "none",
                random: false,
                straight: false,
                outModes: {
                    default: "destroy",
                    top: "none"
                }
            }
        },
        interactivity: {
            detectsOn: "window",
            events: {
                resize: true
            }
        },
        detectRetina: true,
        emitters: {
            direction: "none",
            life: {
                count: 0,
                duration: 0.1,
                delay: 0.4
            },
            rate: {
                delay: 0.1,
                quantity: 200
            },
            size: {
                width: 0,
                height: 0
            }
        }
    });
}
function anim(){
    particless.style.display = 'block';
    confetti();
}


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
    particless.style.display = 'none';
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
        anim();
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


rules_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('.modal-of-rules').classList.remove('hide-modal');
});

close_btn.addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('.modal-of-rules').classList.add('hide-modal');
});

document.querySelector('.rules-modal-overlay').addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('.modal-of-rules').classList.add('hide-modal');
});

init();