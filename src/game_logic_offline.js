
var wrapper={
    game_start:function(store){
var Engine = new Worker("worker.js");
var Time_for_move=prompt("Введите время на 1 ход (в секундах)");
if (Time_for_move===null){
    location.replace("https://4battle.ru")
}
if(Time_for_move==="0" || isNaN(parseInt(Time_for_move))){
    location.reload();
}
Time_for_move*=1000;
    var c = document.getElementById("myCanvas");
 var scale = window.devicePixelRatio*2; 
 var ctx = c.getContext('2d');
  var drawSquare = function(x, y) {
     var k = Math.round(g_cellSize / 4);
     ctx.strokeRect(x * g_cellSize + k + offset, y * g_cellSize + k + offset, g_cellSize - (k * 2), g_cellSize - (k * 2));
 };
  var drawTriangle = function(x, y) {
     var x1 = x * g_cellSize + (g_cellSize / 2) + offset;
     var y1 = y * g_cellSize + (g_cellSize / 4) + offset;
     var x2 = x * g_cellSize + (g_cellSize / 5) + offset;
     var y2 = y * g_cellSize + (g_cellSize - (g_cellSize / 5)) + offset;
     var x3 = x * g_cellSize + (g_cellSize - (g_cellSize / 5)) + offset;
     var y3 = y * g_cellSize + (g_cellSize - (g_cellSize / 5)) + offset;
     ctx.beginPath();
     ctx.moveTo(x1, y1);
     ctx.lineTo(x2, y2);
     ctx.lineTo(x3, y3);
     ctx.closePath();
     ctx.stroke();
 };
 var drawCross = function(x, y) {
     var k = Math.round(g_cellSize / 2) + offset;
     var midx = x * g_cellSize + k;
     var midy = y * g_cellSize + k;
     ctx.beginPath();
     ctx.moveTo(midx - 10, midy - 10);
     ctx.lineTo(midx + 10, midy + 10);
     ctx.closePath();
     ctx.stroke();
     ctx.beginPath();
     ctx.moveTo(midx + 10, midy - 10);
     ctx.lineTo(midx - 10, midy + 10);
     ctx.closePath();
     ctx.stroke();
 };
 var drawCircle = function(x, y) {
     var k = Math.round(g_cellSize / 2) + offset;
     ctx.beginPath();
     ctx.arc(x * g_cellSize + k, y * g_cellSize + k, g_cellSize/3.5, 0, Math.PI * 2, true);
     ctx.closePath();
     ctx.stroke();
 };
 var drawWinLine = function(xs, ys, r, g, b, winner) {
     var Winnerfigure = figureOfplayer(winner);
     for (i = 0; i < (xs.length); i += 1) {
         clear_cell(xs[i], ys[i]);
         Winnerfigure(xs[i], ys[i]);
         ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + 0.5 + ")";
         drawBox(xs[i], ys[i]);
     }
 };
 var drawBox = function(x, y) {
     ctx.fillRect(x * g_cellSize + offset + lineWidth/2, y * g_cellSize + offset + lineWidth/2, g_cellSize - lineWidth, g_cellSize - lineWidth);
 };
 var checkWon = function(id) {
     var r, g, h, won, xx, yy, xs, ys;
     for (var i = 0; i < Game_Board.length; i++) {
         for (var j = 0; j < Game_Board[i].length; j++) {
             for (var d = 0; d < 360; d = d + 45) {
                 r = d * Math.PI / 180;
                 g = Math.round(Math.sin(r));
                 h = Math.round(Math.cos(r));
                 won = true;
                 xx = i;
                 yy = j;
                 xs = new Array;
                 ys = new Array;
                 for (var ii = 0; ii <= (FiguresToWin - 1); ii++) {
                     if (xx < 0 || xx >= Game_Board.length || yy < 0 || yy >= Game_Board[0].length) {
                         won = false;
                         break;
                     }
                     if (Game_Board[xx][yy] !== players[id]) {
                         won = false;
                         break;
                     }
                     xs.push(xx);
                     ys.push(yy);
                     xx += g;
                     yy += h;
                 }
                 if (won == true) {
                     console.log("won");
                     console.log(xx);
                     console.log(yy);
                     drawwon(xs,ys,id);
                     return true;
                 }
             }
         }
     }
 };
 
 
 var Game_Board = [ 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0] 
]

var lineWidth =3;
var g_cellSize;
 var InnerWidth = window.innerWidth - document.getElementById("LeftColumn").clientWidth - document.getElementById("RightColumn").clientWidth;
 console.log(InnerWidth)
console.log(window.innerHeight)
 if (window.innerWidth < 767) {
     g_cellSize = Math.floor((window.innerWidth ) / 21);
      lineWidth = 2;
 } else {
if (InnerWidth> window.innerHeight-56) {
 g_cellSize = Math.floor((window.innerHeight-56) / 21);
 console.log(InnerWidth)
}else{
   g_cellSize = Math.floor(InnerWidth  / 21); 
}
 
 }


 if (localStorage.getItem('sound') == "true") {
     $('.custom-control-input').prop('checked', true);
 }

 var audio = new Audio('https://4battle.ru/1.mp3');
 audio.volume = 0.5;
 var timer;
 var Selected_Bonus;
 var YourIndex;
 var Game_Mode;
 var FiguresToWin = 5;
 var Rows = 21;
 var black_theme = 0;
 var Columns = 21;
 var players = [null,null,null,null];
 var YourIndex=randomInteger(0,3);
 var b=randomInteger(0,3);
 while(YourIndex===b){
   b=randomInteger(0,3);
 }



 players[YourIndex]=-1;
 players[b]=1;

  for (var i = 0; i < 4; i++) {
        if(players[i]===null){
        store.commit("set_player",{i:i,username:"empty"});
        }else if(players[i]===-1){
            store.commit("set_player",{i:i,username:"human"});
        }else{
            store.commit("set_player",{i:i,username:"computer"});
        }
     }
        switch (YourIndex) {
         case 0:
         store.commit("set_current_figure","fa fa-circle")
             break;
         case 1:
         store.commit("set_current_figure","fa fa-caret-up")
             break;
         case 2:
             store.commit("set_current_figure","fa fa-square-o")
             break;
         case 3:
             store.commit("set_current_figure","fa fa-times")
             break;
     };
    
   
 var offset = lineWidth / 2;
 var height = g_cellSize * Rows + (lineWidth);
 var width = g_cellSize * Columns + (lineWidth);
 if (window.innerWidth >= 767) {
    store.commit("set_margin",((window.innerHeight-56)-height)/2) 
 } 

 var lastMoveColumn;
 var lastMoveRow;
 var Now_turns;
 var Last_Turn;
 var lastPlayer;
 var block_color = "rgba(" + 155 + "," + 155 + "," + 155 + "," + 0.7 + ")";
 var Paused = false;
console.log(g_cellSize);
 var url = window.location.href;
  $( 'a[href="#"]' ).click( function(e) {
      e.preventDefault();
   } );
store.commit("set_player_min_count",2)
store.commit("set_player_count",2);

c.style.width = width + "px";
c.style.height = height + "px";
 c.width = width*scale;
 c.height = height*scale;

 ctx.scale(scale, scale);
ctx.lineWidth = lineWidth;
 c.addEventListener('click', function(ev) {
     if (Now_turns === YourIndex && !Paused) {
         var xz, yz;
         var of = c.getBoundingClientRect();
         xz = ev.clientX - of .left;
         yz = ev.clientY - of .top;
         var xx = divide(xz, g_cellSize);
         var yy = divide(yz, g_cellSize);
             if (Game_Board[yy][xx] === 0) {
                make_move(xx,yy,YourIndex)
                console.log(xx, yy);
             }
     }  
 }, false);

 ctx.clearRect(0, 0, width, height);
 ctx.strokeStyle = '#8DA382';
 for (var i = 0; i <= Columns; i++) {
     var k = g_cellSize * i + (offset);
     ctx.beginPath();
     ctx.moveTo(k, 0);
     ctx.lineTo(k, height);
     ctx.stroke();
 };
 for (var i = 0; i <= Rows; i++) {
     var k = g_cellSize * i + (offset);
     ctx.beginPath();
     ctx.moveTo(0, k);
     ctx.lineTo(width, k);
     ctx.stroke();
 }
  if(randomInteger(0,1)===0){
       Now_turns=YourIndex;
     }else{
       Now_turns=b
     }
    document.getElementById(Now_turns + "x").innerHTML = " <--";
    Last_Turn = Now_turns;
    Paused = false;
    timer = setInterval(timer_F, 1000);
    if(Now_turns===b){
        store.commit("clear_time",Time_for_move/1000); 
        make_move(10,10,b);
    }else{
          store.commit("clear_time",Time_for_move/10); 
    }

 function randomInteger(min, max) {
     var rand = min + Math.random() * (max + 1 - min);
     rand = Math.floor(rand);
     return rand;
 }


 function timer_F() {
     if (store.state.seconds > 0) {
         store.commit("countdown_step");
     } else {
        if(Now_turns===YourIndex){
           Move_transition();
           document.getElementById(Last_Turn + "x").innerHTML = "";
           document.getElementById(Now_turns + "x").innerHTML = " <--";
            Last_Turn = Now_turns;
         if(Now_turns===b){
               Engine.postMessage([Game_Board,1,Time_for_move]);
             }
        }
           
     }
 }
 

 

 function clear_cell(x, y) {
     if (black_theme == 0) {
         ctx.fillStyle = "rgb(" + 255 + "," + 255 + "," + 255 + ")";
     } else {
         ctx.fillStyle = "rgb(" + 66 + "," + 66 + "," + 66 + ")";
     }

     drawBox(x, y);
 }

 function colorOfplayer(player) {
     switch (player) {
         case 3:
             return "rgba(" + 0 + "," + 0 + "," + 255 + "," + 0.5 + ")";
         case 0:
             return "rgba(" + 0 + "," + 255 + "," + 0 + "," + 0.5 + ")";
         case 1:
             return "rgba(" + 0 + "," + 197 + "," + 255 + "," + 0.5 + ")";
         case 2:
             return "rgba(" + 255 + "," + 165 + "," + 0 + "," + 0.5 + ")";
     };
 }

 function figureOfplayer(player) {
     switch (player) {
         case 0:
             return (x, y) => {
                 drawCircle(x, y);
             };
         case 1:
             return (x, y) => {
                 drawTriangle(x, y);
             };
         case 2:
             return (x, y) => {
                 drawSquare(x, y);
             };
         case 3:
             return (x, y) => {
                 drawCross(x, y);
             };
     };
 }

 function Move_transition() {
    if(Now_turns===b){
       store.commit("clear_time",Time_for_move/10); 
    }else{
          store.commit("clear_time",Time_for_move/1000); 
    } 
     clearInterval(timer);
     timer = setInterval(timer_F, 1000);

     if (Now_turns === players.length - 1) {
         Now_turns = 0;
         while (players[Now_turns] === null) {
             Now_turns += 1;
         }
     } else {
         Now_turns += 1;
         while (players[Now_turns] === null) {
             if (Now_turns === players.length - 1) {
                 Now_turns = 0;
                 continue;
             };
             Now_turns += 1;
         }
     }
     if (Now_turns == YourIndex && localStorage.getItem('sound') == "true") {
         audio.play();
     }
 }

 function divide(numerator, denominator) {
     var remainder = numerator % denominator;
     var quotient = (numerator - remainder) / denominator;
     return quotient;
 }


 function drawwon(xs, ys, winner){
         Paused = true;
     drawWinLine(ys, xs, 255, 20, 147, winner);
     iziToast.show({
         theme: 'dark',
         timeout: false,
         close: false,
         drag: false,
         message: "Do you want to play another one?",
         layout: 2,
         position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
         progressBarColor: 'rgb(0, 255, 184)',
         buttons: [
             ['<button>Ok</button>', function(instance, toast) {
                 location.reload();
             }],
             ['<button>Close</button>', function(instance, toast) {
                 instance.hide({
                     transitionOut: 'fadeOutUp'
                 }, toast, 'close', 'btn2');
             }]
         ]
     });

 }
 


 
function make_move(column,row,ID){
         if ((lastMoveColumn !== null) && (lastMoveColumn !== undefined)) {
             ctx.fillStyle = colorOfplayer(lastPlayer);
             drawBox(lastMoveColumn, lastMoveRow);
     }
     lastMoveColumn = column;
     lastMoveRow = row;
     lastPlayer = ID;
     console.log(Game_Board)
     Game_Board[row][column] = players[ID];
     var figure = figureOfplayer(ID);
     figure(column, row);
     if(checkWon(ID)){
     clearInterval(timer);
     timer=null;
     timer_F=null;
     }
     Move_transition();
     document.getElementById(Last_Turn + "x").innerHTML = "";
     document.getElementById(Now_turns + "x").innerHTML = " <--";
     Last_Turn = Now_turns;
     if(players[ID]===-1){
       Engine.postMessage([Game_Board,1,Time_for_move]);
     }     
}





  Engine.onmessage = function(e) {
    console.log(e.data.bestmove);
    console.log(`Cache Hits: ${e.data.CacheHits}`)
    console.log(`Cache Cutoffs: ${e.data.CacheCutoffs}`)
    console.log(`Cache Puts: ${e.data.CachePuts}`)
    console.log(`function calls ${e.data.fc}`)
    console.log(`Call to iterative mtdf took ${e.data.time} seconds.`)
    console.log(`StateCacheHits: ${e.data.StateCacheHits}`)
    console.log(`StateCachePuts: ${e.data.StateCachePuts}`)
    console.log(e.data.firstMoves)
    make_move(e.data.bestmove.j,e.data.bestmove.i,b)
    }


 }
}




export default {wrapper:wrapper}