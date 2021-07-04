'use strict';

let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let midImgEl = document.getElementById('midImg');
let rightImgEl = document.getElementById('rightImg');
let resultsContainerEl=document.getElementById('resultsContainer')
let ulEl = document.getElementById('results');
resultsContainerEl.appendChild(ulEl );
let products = [];
let attempts = 1;
let maxAttempts = 10;
let productsImages=['bag.jpg','banana.jpg','bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg' , 'dragon.jpg', 'pen.jpg ', 'pet-sweep.jpg', 'scissors.jpg' , 'shark.jpg', 'sweep.jpg' , 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg' ]

function Product(ProductName){
    this.pName= ProductName.split('.')[0];
    this.img = 'img/' + ProductName;
    this.votes = 0;
    this.views = 0;
    products.push(this);
}

    
for (let i = 0; i < productsImages.length; i++) {
    new  Product(productsImages[i]);
    
}
function randomIndex() {
  
    return Math.floor(Math.random() * products.length);
}

let leftIndex;
let midIndex;
let rightIndex;

function renderRandomImg() {

    leftIndex = randomIndex();
    midIndex = randomIndex();
    rightIndex = randomIndex();
    while (leftIndex === rightIndex || leftIndex === midIndex || midIndex === rightIndex) {
        leftIndex = randomIndex();
        midIndex=randomIndex();  
    }
    leftImgEl.setAttribute('src', products[leftIndex].img);
    midImgEl.setAttribute('src', products[midIndex].img);
    rightImgEl.setAttribute('src', products[rightIndex].img);
    leftImgEl.setAttribute('title', products[leftIndex].pName);
    midImgEl.setAttribute('title', products[midIndex].pName);
    rightImgEl.setAttribute('title', products[rightIndex].pName);
    products[leftIndex].views++;
    products[midIndex].views++;
    products[rightIndex].views++;
 
}

renderRandomImg();

leftImgEl.addEventListener('click', countTheVotes);
midImgEl.addEventListener('click', countTheVotes);
rightImgEl.addEventListener('click', countTheVotes);

function countTheVotes(event) {
    if (attempts < maxAttempts) {
       
        let clickedImg = event.target.id;
        if (clickedImg === 'leftImg') {
            products[leftIndex].votes++;
        }
        else if (clickedImg === 'rightImg') {
            products[rightIndex].votes++;
        }
        else if (clickedImg === 'midImg') {
            products[midIndex].votes++;
        }
     renderRandomImg();
       
    } else {
        leftImgEl.removeEventListener('click', countTheVotes);
        midImgEl.removeEventListener('click', countTheVotes);
        rightImgEl.removeEventListener('click', countTheVotes);
        let pEl=document.createElement('p');
pEl.addEventListener('click',resultsfun )
pEl.textContent="results"
resultsContainerEl.appendChild(pEl );
    }
    attempts++;
}

// let pEl=document.createElement('p');
// pEl.addEventListener('click',resultsfun )
// pEl.textContent="results"
// resultsContainerEl.appendChild(pEl );
function resultsfun(event){
    let clickedResult= event.target.id;
ulEl = document.getElementById('results');
        for (let i = 0; i < products.length; i++) {
            let liEl = document.createElement('li');
            liEl.textContent = ` (${products[i].pName}) has  (${products[i].votes}) votes and (${products[i].views}) views .`
            ulEl.appendChild(liEl);
        }

        resultsContainerEl.appendChild(pEl );
    }
