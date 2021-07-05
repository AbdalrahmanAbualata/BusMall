'use strict';

let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');
let leftImgEl = document.getElementById('leftImg');
let midImgEl = document.getElementById('midImg');
let rightImgEl = document.getElementById('rightImg');
let resultsContainerEl=document.getElementById('resultsContainer')
let spanEl = document.getElementById('span1')
resultsContainerEl.appendChild(spanEl);
spanEl.textContent="results";
let ulEl = document.getElementById('results');
resultsContainerEl.appendChild(ulEl );
let productsName=[];
let products = [];
let votes =[];
let views =[];
let attempts = 1;
let maxAttempts = 25;
let productsImages=['bag.jpg','banana.jpg','bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg','chair.jpg','cthulhu.jpg','dog-duck.jpg' , 'dragon.jpg', 'pen.jpg ', 'pet-sweep.jpg', 'scissors.jpg' , 'shark.jpg', 'sweep.jpg' , 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg' ]

function Product(ProductName){
    this.pName= ProductName.split('.')[0];
    this.img = 'img/' + ProductName;
    this.votes = 0;
    this.views = 0;
    products.push(this);
    productsName.push(this.pName);
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
let indexArray=[];

function renderRandomImg() {

    leftIndex = randomIndex();
    midIndex = randomIndex();
    rightIndex = randomIndex();
while (leftIndex === rightIndex || leftIndex === midIndex || midIndex === rightIndex||indexArray.includes(leftIndex) ||indexArray.includes(rightIndex)||indexArray.includes(midIndex)){
       
    leftIndex = randomIndex();
    midIndex = randomIndex();
    rightIndex = randomIndex();

    // while (leftIndex === rightIndex || leftIndex === midIndex || midIndex === rightIndex) {
    //     leftIndex = randomIndex();
    //     midIndex=randomIndex();  
    // }
}
    indexArray[0]=leftIndex ; 
    indexArray[1]=midIndex ; 
    indexArray[2]=rightIndex ; 
    
    leftImgEl.setAttribute('src', products[indexArray[0]].img);
    midImgEl.setAttribute('src', products[indexArray[1]].img);
    rightImgEl.setAttribute('src', products[indexArray[2]].img);
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

spanEl.addEventListener('click',resultsfun );

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
        
       
    }
    attempts++;
}

spanEl.addEventListener('click',resultsfun );

function resultsfun(event){
    
ulEl.textContent="";/*to remove the  content in the ul and fill it in the for loop  */
let clickedResult= event.target.id;
for (let i = 0; i < products.length; i++) {
    let  liEl = document.createElement('li');
    liEl.textContent = ` [${products[i].pName}] has  (${products[i].votes}) votes and {${products[i].views}} views .`
    ulEl.appendChild(liEl);
    votes.push( products[i].votes)
    views.push( products[i].views)
}

    if (attempts > 24) {
        
   
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productsName,
        datasets: [{
            label: '# of Votes',
            data: votes,
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
            data:views,
            backgroundColor: [
                'rgba(54, 162, 235, 1)'
                
            ],
            borderColor: [
                
                'rgba(54, 162, 235, 1)'
               
            ],
            borderWidth: 1
        }]
    },
    options: {responsive: false,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true
    
            }
        }
    }
});
}

}

// var ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: productsName,
//         datasets: [{
//             label: '# of Votes',
//             data: votes,
//             backgroundColor: [
//                 'rgba(255, 206, 86, 1)'
                
//             ],
//             borderColor: [
              
//                 'rgba(255, 206, 86, 1)',
    
//             ],
//             borderWidth: 1
//         },
//         {
//             label: '# of views',
//             data:views,
//             backgroundColor: [
//                 'rgba(54, 162, 235, 1)'
                
//             ],
//             borderColor: [
                
//                 'rgba(54, 162, 235, 1)'
               
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {responsive: false,
//         maintainAspectRatio: true,
//         scales: {
//             y: {
//                 beginAtZero: true
    
//             }
//         }
//     }
// });








// let pEl=document.createElement('p');
// pEl.addEventListener('click',resultsfun )
// pEl.textContent="results"
// resultsContainerEl.appendChild(pEl );
// function resultsfun(event){
//     let clickedResult= event.target.id;
// ulEl = document.getElementById('results');
//         for (let i = 0; i < products.length; i++) {
//             let liEl = document.createElement('li');
//             liEl.textContent = ` (${products[i].pName}) has  (${products[i].votes}) votes and (${products[i].views}) views .`
//             ulEl.appendChild(liEl);
//         }

//         resultsContainerEl.appendChild(pEl );
//     }
