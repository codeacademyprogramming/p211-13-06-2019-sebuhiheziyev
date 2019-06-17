'use strict' ;
  const gameZone = document.getElementsByClassName("game-zone")[0];
  const tet = [];
  const imges = [
    "img/fruit1.png",
    "img/fruit2.png",
    "img/fruit3.png",
    "img/fruit4.png",
    "img/fruit5.png",
    "img/fruit6.png",
    "img/fruit7.png"
  ];
  let img ;
  let dragElement;
  let count = 0;
  let scor = document.getElementsByClassName("scor")[0];

  function rose (){ 
    img = document.createElement('img');
    img.classList.add("img-style", "tet");
    gameZone.appendChild(img);
    tet.push(img);
    tet.forEach(function(t){
     t.ondrag = function(){
     dragElement = t;
    }
    })
    
    const ran = Math.floor(Math.random() * imges.length);
    let x = Math.floor(Math.random() * 397);
    img.style.left = x + 'px'; 
    img.setAttribute('src',imges[ran]);
    img.setAttribute('draggable','true');
  }
  setInterval (rose , 1000);



  const trash = document.getElementsByClassName("icon")[0];
  trash.ondragover = function(e){
    e.preventDefault();

  }
   

  trash.ondrop = function(){
   this.appendChild(dragElement);
   dragElement.style.display = "none";
   count++;
   scor.innerText = count;
    
  }
 

  
 
  