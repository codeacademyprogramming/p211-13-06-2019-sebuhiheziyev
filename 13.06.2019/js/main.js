"use strict";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const dragArea = document.getElementsByClassName("drag-area")[0];
const dropArea = document.getElementsByClassName("drop-area")[0];
const timerHolder = document.querySelector("#timer .timer-holder");
const timerSpan = timerHolder.querySelector("span");
let timerInterval;
let secondPassed = 0;

let draggedElement;
let hasGameStarted = false;

for(let i = 0; i < 8; i++)
{
  const cardHolder = document.createElement("div");
  cardHolder.classList.add("card-holder");

  const cardItem = document.createElement("div");
  cardItem.classList.add("card-item");
  cardItem.setAttribute("draggable", true);

  cardItem.ondragstart = function()
  {
    draggedElement = this;
    if(!hasGameStarted)
    {
      hasGameStarted = true;
      timerHolder.classList.remove("hidden");
      //initialize timer
       timerInterval = setInterval(() => {
        timerSpan.innerText = ++secondPassed;
      }, 1000);
    }
  }

  const randomIndex = GenerateRandomNumber(0, numbers.length - 1);
  const number = numbers[randomIndex];

  numbers.splice(randomIndex, 1);
  cardItem.innerText = number;

  cardHolder.appendChild(cardItem);
  dragArea.appendChild(cardHolder);
}

[...dropArea.children].forEach((holder, index) => {
  holder.ondragover = function(e)
  {
    e.preventDefault();
    if(draggedElement.innerText == index + 1)
    {
      this.style.backgroundColor = "green";
    }
    else
    {
      this.style.backgroundColor = "red";
    }
  }
  holder.ondragleave = function()
  {
    this.style.backgroundColor = "initial";
  }
  holder.ondrop = function()
  {
    if(draggedElement.innerText == index + 1)
    {
      this.appendChild(draggedElement);
    }

    this.style.backgroundColor = "initial";

    if(document.querySelectorAll(".drag-area .card-item").length == 0){
      clearInterval(timerInterval);
      timerHolder.classList.add("active");
    }

  }

})

function GenerateRandomNumber(min, max) 
{
  return Math.round(min + Math.random() * (max - min));
}