let language = document.querySelector('.language');
let dropdown__language = document.querySelector('.dropdown-language__content');
let dropdown__language__items = document.querySelectorAll('.dropdown-language__content ul li');


language.addEventListener('click', function() {
  dropdown__language.classList.toggle('active');
});

document.addEventListener('click', function(event) {
  if(!language.contains(event.target)) {
    dropdown__language.classList.remove('active');
  }
});


let signIn = document.querySelector('.sign-in');
let signIn_content = document.querySelector('.dropdown-sign-in__content');
let ul = document.querySelector('.dropdown-sign-in__content ul');
let ulHeight = ul.offsetHeight


let signInBtn = false;

signIn.addEventListener('click', function() {
  if(signInBtn === false) {
    signInBtn = true;
    signIn_content.style.height = ulHeight + 'px';
  } else{
    signIn_content.style.height = "0";
    signInBtn = false;
  }
});

document.addEventListener("click", function(event) {
  if(!signIn.contains(event.target)) {
    signIn_content.style.height = 0;
    signInBtn = false;
  }
});

