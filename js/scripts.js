/*!
* Start Bootstrap - Freelancer v7.0.7 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
//


//TODO organize these lol
import { COMMON_PASS } from "./commonPass.js";
const image = document.getElementById('circle-image');
const textbox = document.getElementById("pwd");
let audio = new Audio('assets/mp3/sonicRing2.mp3');
let isAnimating = false;
const strengthBar=document.getElementById("strength-bar");
const showBox = document.getElementById("showBox");

showBox.checked=false;

showBox.addEventListener("click",()=> {
  let x = document.getElementById("pwd");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
})

textbox.addEventListener('input', ()=>{
    let score = 0;
    let entropy = 0;
    let charpool=0; //Counts total number of possible characters that COULD be in the password, for calculating entropy.
    let pass = document.getElementById("pwd")
    let passAdvice = "";
    length=textbox.value.length;
    if (checkCommonPass(pass.value)){
        passAdvice+="Your password is a common known password.<br>"
    }else{
    if (length>8){ //give points based on length
        score += 10;
        if (length>11){
            score +=10;
            if(length>15){
                score+=10;
            }
        }
    }else{
        passAdvice+="Your password is too short!<br>"
    }
    if (/[a-z]/.test(pass.value)){ //check for lowercase
        score+=5;
        charpool+=26;
    }
    if (/[A-Z]/.test(pass.value)){ //uppercase
        score+=5;
        charpool+=26;
    }
    if (/[0-9]/.test(pass.value)){ //digit
        score+=5;
        charpool+=10;
    }
    if (/[^A-Za-z0-9]/.test(pass.value)){ //non alpha-numeric character
        score+=5;
        charpool+=32;
    }

    if (hasRepeats(pass.value)){
        score-=10;
        passAdvice+="Avoid repeating characters.<br>"
    }

    entropy = pass.value.length * Math.log2(charpool); //Calculates entropy, formula from internet.
    if (entropy >27){
        score+=3;
        if (entropy>35){
            score+=3;
            if (entropy>59){
                score+=4;
            }
        }
    }else{
        passAdvice+="Try using a greater variety of characters (Capital and lowercase letters, digits, and symbols).<br>"
    }
}
    score = Math.round(score/60*100);
    const color = findScoreColor(score, pass);
    document.documentElement.style.setProperty("--strength-color", color);
    strengthBar.style.background = color;
    strengthBar.style.width = score + "%";
    if(score < 90 && score > 70) {
        passAdvice+="This is a decent password, but could be improved."
    } else if(score>89){
        passAdvice+="This is a very strong password"
    }

    if (pass.value.length=== 0) passAdvice="";
    document.getElementById("PassAnalCont").innerHTML = passAdvice; //give total score
    
})

if(image){
image.addEventListener('click', ()=> {

    if (!isAnimating) {
    isAnimating = true;
    image.classList.add('spinning-image');
    audio.currentTime=0;
    audio.play();
    setTimeout(()=> {
        image.classList.remove('spinning-image');
        isAnimating=false;
    },1000);
    }
})
}

function hasRepeats (str) {
    return /(.)\1{2,}/.test(str);
}

function checkCommonPass(str){
    let normalizedPass = str
    .toLowerCase()
    .replace(/@/g, "a")
    .replace(/\$/g, "s")
    .replace(/0/g, "o")
    .replace(/1/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/[^a-z]/g, ""); 
    if (COMMON_PASS.has(normalizedPass)){
        return true;
    } else {
        return false;
    }
}

function findScoreColor(score, pass) {
  if (pass.value.length === 0) return "#f7f7f7";        // neutral / empty
  if (score < 50) return "#e74c3c";         // red
  if (score < 70) return "#f1c40f";         // yellow (warm)
  if (score < 90) return "#3498db";         // blue
  return "#2ecc71";                         // green
}


window.addEventListener('DOMContentLoaded', event => {
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
