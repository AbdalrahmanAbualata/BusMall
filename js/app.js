'use strict';

let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let midImgEl = document.getElementById('midImg');
let rightImgEl = document.getElementById('rightImg');
let resultsContainerEl = document.getElementById('resultsContainer')
let spanEl = document.getElementById('span1')
spanEl.textContent = "results";
resultsContainerEl.appendChild(spanEl);
let ulEl = document.getElementById('results');
resultsContainerEl.appendChild(ulEl);
let attempts = [1];
let maxAttempts = 25;
let products = [];
let productsName = [];
let vote =[];
let view =[];



let productsImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg ', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.jpg', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg']




function Product(ProductName) {
    this.pName = ProductName.split('.')[0];
    this.img = 'img/' + ProductName;
    this.vote = 0;
    this.view = 0;
    productsName.push(this.pName);
    products.push(this);
}


for (let i = 0; i < productsImages.length; i++) {
    new Product(productsImages[i]);

}
function randomIndex() {

    return Math.floor(Math.random() * products.length);
}

function saveToLocalStorage() {
    let localData = JSON.stringify(products);
    let attemptData = JSON.stringify(attempts);
    localStorage.setItem('item2', attemptData);
    localStorage.setItem('item', localData);

}


function readFromLocalStorage() {
    let attemptStringObj = localStorage.getItem('item2');
    let attemptNormalObj = JSON.parse(attemptStringObj);
    if (attemptNormalObj!== null) {
      attempts=attemptNormalObj;};
     
    let stringObj = localStorage.getItem('item');
    let normalObj = JSON.parse(stringObj);
    ulEl.textContent = "";
    if (normalObj !== null) {
    
    products= normalObj;
    }
      for (let i = 0; i < products.length; i++) {
        let liEl = document.createElement('li');
        liEl.textContent = ` [${products[i].pName}] has  (${products[i].vote}) votes and {${products[i].view}} views .`
        ulEl.appendChild(liEl);
        
      }
    
    }
readFromLocalStorage();




let leftIndex;
let midIndex;
let rightIndex;
let indexArray = [];

function renderRandomImg() {

    leftIndex = randomIndex();
    midIndex = randomIndex();
    rightIndex = randomIndex();
    while (leftIndex === rightIndex || leftIndex === midIndex || midIndex === rightIndex || indexArray.includes(leftIndex) || indexArray.includes(rightIndex) || indexArray.includes(midIndex)) {

        leftIndex = randomIndex();
        midIndex = randomIndex();
        rightIndex = randomIndex();

        // while (leftIndex === rightIndex || leftIndex === midIndex || midIndex === rightIndex) {
        //     leftIndex = randomIndex();
        //     midIndex=randomIndex();  
        // }
    }
    indexArray[0] = leftIndex;
    indexArray[1] = midIndex;
    indexArray[2] = rightIndex;

    leftImgEl.setAttribute('src', products[indexArray[0]].img);
    midImgEl.setAttribute('src', products[indexArray[1]].img);
    rightImgEl.setAttribute('src', products[indexArray[2]].img);
    leftImgEl.setAttribute('title', products[leftIndex].pName);
    midImgEl.setAttribute('title', products[midIndex].pName);
    rightImgEl.setAttribute('title', products[rightIndex].pName);
    products[leftIndex].view++;
    products[midIndex].view++;
    products[rightIndex].view++;
}

renderRandomImg();

leftImgEl.addEventListener('click', countTheVotes);
midImgEl.addEventListener('click', countTheVotes);
rightImgEl.addEventListener('click', countTheVotes);


function countTheVotes(event) {


    if (attempts[0] < maxAttempts) {

        let clickedImg = event.target.id;//any img i clicked .
        if (clickedImg === 'leftImg') {
            products[leftIndex].vote++;
        }
        else if (clickedImg === 'rightImg') {
            products[rightIndex].vote++;
        }
        else if (clickedImg === 'midImg') {
            products[midIndex].vote++;
        }

        renderRandomImg();

    } else {
        leftImgEl.removeEventListener('click', countTheVotes);
        midImgEl.removeEventListener('click', countTheVotes);
        rightImgEl.removeEventListener('click', countTheVotes);
        chartrender();

    }
    attempts[0]++;
}

spanEl.addEventListener('click', resultsfun);
 
function resultsfun(event) {
     if(attempts==26){
        attempts=[1]
        
    }
    let clickedResult = event.target.id;
    ulEl.textContent = "" ;
    for (let i = 0; i < products.length; i++) {
        let liEl = document.createElement('li');
        liEl.textContent = ` [${products[i].pName}] has  (${products[i].vote}) votes and {${products[i].view}} views .`
        ulEl.appendChild(liEl);
        vote.push(products[i].vote);
        view.push(products[i].view);
        
    }
  
    saveToLocalStorage();
}



  function chartrender (){
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productsName,
        datasets: [{
            label: '# of Votes',
            data: vote,
            backgroundColor: [
                'rgba(255, 206, 86, 1)'

            ],
            borderColor: [

                'rgba(255, 206, 86, 1)',

            ],
            borderWidth: 1
        },
        {
            label: '# of views',
            data: view,
            backgroundColor: [
                'rgba(54, 162, 235, 1)'

            ],
            borderColor: [

                'rgba(54, 162, 235, 1)'

            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true

            }
        }
    }
});
    }








// function saveToLocalStorage() {
//     let localData = JSON.stringify(products);
//     localStorage.setItem('product', localData );
// }
// function readFromLocalStorage() {
//     let stringObj = localStorage.getItem('product');

//     let normalObj = JSON.parse(stringObj);

//     if (normalObj !== null) {
//        products = normalObj;
//        ulEl.appendChild(liEl);
//     }
//     }
// readFromLocalStorage();