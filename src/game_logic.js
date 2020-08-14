
var wrapper={
    socket:0,
    create_socket:function(){
        var sitename = "backend.4battle.ru:8443";
if (window.sessionStorage.guest_username!==undefined){
var socket = io.connect("wss://" + sitename, {
     transports: ["websocket"],
    query: "guest_name="+window.sessionStorage.guest_username
 });
}else{
     var socket = io.connect("wss://" + sitename, {
     transports: ["websocket"]
 });}
     wrapper.socket=socket;
    },
    game_start:function(store,getParameterByName,escapeHtml){
var socket=wrapper.socket;
  window.onunload = function(){
 socket.disconnect()
 }

 $("#set_block").click(bonus_click);
 $("#destroy_block").click(bonus_click);
 $("#destroy_player_figure").click(bonus_click);
 $("#enemy_figure_transform").click(bonus_click);
 $("#mine").click(bonus_click);


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
 var FiguresToWin = 7;
 var Rows = 21;
 var black_theme = 0;
 var Columns = 21;
 var players = [];
 var Game_Board = [];
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
 var Paused = true;
 var UsedForBonus = {};
console.log(g_cellSize);
 var url = window.location.href;
  $( 'a[href="#"]' ).click( function(e) {
      e.preventDefault();
   } );
 var duel = 0;
 if (getParameterByName("duel") != null) {
     duel = 1;
     store.commit("set_player_min_count",2)
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
         socket.emit('MoveTimeUp');
         clearInterval(timer);
     }
 }
 var previous_element;

 function bonus_click() {
     if (this.classList.contains('disabled')) {
         return;
     }
     if (previous_element == undefined) {
         this.classList.add('active');
         Selected_Bonus = this;
     } else if (previous_element == this) {
         if (this.classList.contains('active')) {
             this.classList.remove('active');
             Selected_Bonus = null;
         } else {
             this.classList.add('active');
             Selected_Bonus = this;
         }

     } else {
         previous_element.classList.remove('active');
         this.classList.add('active');
         Selected_Bonus = this
     }
     previous_element = this;
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
     switch (players.indexOf(player)) {
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
     switch (players.indexOf(player)) {
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
    store.commit("clear_time",45);
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
 var checkWon = function() {
     if (Game_Mode == "point") {
         if ((Game_Board[9][9] == socket.io.engine.id) &&
             (Game_Board[9][9] == socket.io.engine.id) &&
             (Game_Board[9][10] == socket.io.engine.id) &&
             (Game_Board[9][11] == socket.io.engine.id) &&
             (Game_Board[10][11] == socket.io.engine.id) &&
             (Game_Board[11][11] == socket.io.engine.id) &&
             (Game_Board[11][9] == socket.io.engine.id) &&
             (Game_Board[10][9] == socket.io.engine.id) &&
             (Game_Board[11][10] == socket.io.engine.id)
         ) {
             socket.emit('win_detected');
         }
         return;
     }
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
                     if (Game_Board[xx][yy] !== socket.io.engine.id) {
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
                     socket.emit('win_detected');
                     return;
                 }
             }
         }
     }
 };
 var checkforbonus = function() {
     var LengthForBonus = 3;
     var temporaryusedbonus = {};
     var r, g, h, won, xx, yy;
     for (var i = 0; i < Game_Board.length; i++) {
         for (var j = 0; j < Game_Board[i].length; j++) {
             for (var d = 0; d < 360; d = d + 45) {
                 r = d * Math.PI / 180;
                 g = Math.round(Math.sin(r));
                 h = Math.round(Math.cos(r));
                 won = true;
                 xx = i;
                 yy = j;
                 for (var ii = 0; ii <= (LengthForBonus - 1); ii++) {
                     if (xx < 0 || xx >= Game_Board.length || yy < 0 || yy >= Game_Board[0].length) {
                         won = false;
                         break;
                     }
                     if (Game_Board[xx][yy] !== socket.io.engine.id || UsedForBonus[xx.toString() + yy.toString()] == 1) {
                         won = false;
                         break;
                     }
                     temporaryusedbonus[xx.toString() + yy.toString()] = 1;
                     xx += g;
                     yy += h;
                 }
                 if (won == true) {
                     UsedForBonus = Object.assign(UsedForBonus, temporaryusedbonus);
                     console.log("Bonus Activated");
                     socket.emit('GetBonus');
                     return;
                 }
             }
         }
     }
 };
 var private_game=false;
 if (getParameterByName("pass") != null) {
     document.getElementById('Link2').value = url;
     $('#Link').modal('show');
     private_game=true;
 }


 if (getParameterByName("classic") == null) {
     document.getElementById('bonus2').style["display"] = "block"
 }

 if ((getParameterByName("classic") != null) && (private_game)) {
     FiguresToWin = 5
     Game_Mode = "classic"
     socket.emit('private_matchmaking_classic', getParameterByName("pass"), duel);
 }

 if ((getParameterByName("classic") != null) && (!private_game)) {
     FiguresToWin = 5
     Game_Mode = "classic"
     socket.emit('matchmaking_classic', duel);
 }

 if ((getParameterByName("point") != null) && (private_game)) {
     FiguresToWin = 5
     Game_Mode = "point"
     socket.emit('private_matchmaking_point', getParameterByName("pass"), duel);
 }

 if ((getParameterByName("point") != null) && (!private_game)) {
     FiguresToWin = 5
     Game_Mode = "point"
     socket.emit('matchmaking_point', duel);
 }
 if ((getParameterByName("modern") != null) && (private_game)) {
     FiguresToWin = 5
     Game_Mode = "modern"
     socket.emit('private_matchmaking', getParameterByName("pass"), duel);
 }

 if ((getParameterByName("modern") != null) && (!private_game)) {
     document.getElementById('bonus2').style["display"] = "block"
     FiguresToWin = 5
     Game_Mode = "modern"
     socket.emit('matchmaking', duel);
 }



 socket.on('player_Names', function(data) {
     for (var i = 0; i < data.length; i++) {
        var username=escapeHtml(data[i]);
        store.commit("set_player",{i:i,username:username});
     }
 });
 socket.on('PlayerTimeUp', function() {
     Move_transition();
     document.getElementById(Last_Turn + "x").innerHTML = "";
     document.getElementById(Now_turns + "x").innerHTML = " <--";
     Last_Turn = Now_turns;
 });
 socket.on('Map_Load', function(data) {
     var xxx, yyy;
     ctx.fillStyle = block_color;
     for (var xxx = 0; xxx < Columns; xxx++) {
         Game_Board[xxx] = [];
         for (var yyy = 0; yyy < Rows; yyy++) {
             Game_Board[xxx][yyy] = data[xxx][yyy];
             if (data[xxx][yyy] === "Obstacle") {
                 drawBox(xxx, yyy);
             }
             if (data[xxx][yyy] === "Point") {
                 ctx.fillStyle = "rgba(" + 103 + "," + 161 + "," + 231 + "," + 0.7 + ")";
                 drawBox(xxx, yyy);
             }
         }
     }
 });
 socket.on('get_bonus', function(bonus_name) {
     store.commit("change_bonus_amount_by",{bonus_name:bonus_name,amount:1});
 });
 socket.on('bonus_used', function(data, x, y, SID) {
     switch (data) {
         case 'set_block':
             Game_Board[x][y] = "Obstacle";
             ctx.fillStyle = block_color;
             drawBox(x, y);
             break;
         case 'destroy_block':
             Game_Board[x][y] = null;
             clear_cell(x, y);
             break;
         case 'destroy_player_figure':
             Game_Board[x][y] = null;
             clear_cell(x, y);
             break;
         case 'enemy_figure_transform':
             Game_Board[x][y] = SID;
             clear_cell(x, y);
             console.log(colorOfplayer(SID));
             ctx.fillStyle = colorOfplayer(SID);
             var figure = figureOfplayer(SID);
             figure(x, y)
             drawBox(x, y);
             checkforbonus()
             checkWon();
             break;
     }
     console.log("bonus used", data);
     if (SID == socket.io.engine.id) {
         Selected_Bonus = undefined;
         store.commit("change_bonus_amount_by",{data:bonus_name,amount:-1})
     }
 });
 socket.io.on('connect_error', function(err) {
document.getElementById("server_info").classList.remove('border-info');
document.getElementById("server_info").classList.add('border-danger');
document.getElementById("server_info_bullet").classList.remove('connecting');
document.getElementById("server_info_text").textContent="Failed to connect to the  server";
document.getElementById("server_info_bullet").classList.add('offline');
  console.log('Error connecting to server');
});
 socket.on('error', function(error) {

     alert(error);
 });
 socket.on('disconnect', function(error) {
    generate_message("You was disconnected due to afk","user","Server","text-danger");
 });
 socket.on('player_left', function(data) {
     if (Now_turns === players.indexOf(data)) {
         players[players.indexOf(data)] = null;
         Move_transition();
     } else {
         players[players.indexOf(data)] = null;
     }
     store.commit("player_count_decrement");
     document.getElementById(Last_Turn + "x").innerHTML = "";
     document.getElementById(Now_turns + "x").innerHTML = " <--";
     Last_Turn = Now_turns;
 });

 socket.on('FirstTurn', function(data) {
     console.log(data);
     YourIndex = players.indexOf(socket.io.engine.id);
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
     Now_turns = players.indexOf(data);
     document.getElementById(Now_turns + "x").innerHTML = " <--";
     Last_Turn = Now_turns;
     Paused = false;
     timer = setInterval(timer_F, 1000);
 });

 socket.on('win_detected', function(xs, ys, winner) {
     Paused = true;
     drawWinLine(xs, ys, 255, 20, 147, winner);

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

 });
 socket.on('players_waiting', function(count) {
    store.commit("set_player_count",count);
 });
 socket.on('get_Players', function(data) {
    players = data;
 });
 socket.on('Fake_on_move', function(column, row, SID) {
     console.log("Wfwf")
     var figure = figureOfplayer(SID);
     figure(column, row);
     setTimeout(function() {
         clear_cell(column, row);
     }, 1000);
     Move_transition();
     document.getElementById(Last_Turn + "x").innerHTML = "";
     document.getElementById(Now_turns + "x").innerHTML = " <--";
     Last_Turn = Now_turns;
 });
 socket.on('On_move', function(column, row, SID) {
     if ((lastMoveColumn !== null) && (lastMoveColumn !== undefined)) {
         if (Game_Board[lastMoveColumn][lastMoveRow] === lastPlayer) {
             ctx.fillStyle = colorOfplayer(lastPlayer);
             drawBox(lastMoveColumn, lastMoveRow);
         }

     }
     lastMoveColumn = column;
     lastMoveRow = row;
     lastPlayer = SID;
     Game_Board[column][row] = SID;
     var figure = figureOfplayer(SID);
     figure(column, row);
     if (SID == socket.io.engine.id) {
         checkWon();
         if (Game_Mode != "classic") {
             checkforbonus()
         }

     }
     Move_transition();
     document.getElementById(Last_Turn + "x").innerHTML = "";
     document.getElementById(Now_turns + "x").innerHTML = " <--";
     Last_Turn = Now_turns;
 });


 var c = document.getElementById("myCanvas");
 var scale = window.devicePixelRatio*2; 
c.style.width = width + "px";
c.style.height = height + "px";
 c.width = width*scale;
 c.height = height*scale;
 var ctx = c.getContext('2d');
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
         if ((Game_Mode !== "classic") &&
             (Selected_Bonus != undefined)) {
             Selected_Bonus.classList.remove('active')
             socket.emit('use_bonus', xx, yy, Selected_Bonus.id);
             if (Selected_Bonus.id === "mine" && Game_Board[xx][yy] === null) {
                store.commit("change_bonus_amount_by",Selected_Bonus.id,-1);
             }
             Selected_Bonus = undefined;
         } else {
             if (Game_Board[xx][yy] === null) {
                 socket.emit('Make_Move', xx, yy);
                 console.log(xx, yy);
             }
         }


     } else {
         if ((Game_Mode !== "classic") &&
             (Selected_Bonus != undefined)) {
             Selected_Bonus.classList.remove('active')
             socket.emit('use_bonus', xx, yy, Selected_Bonus.id);
             Selected_Bonus = undefined;
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
 ///////////////////////CHAT
 var INDEX = 0;
function send_msg(){
    var msg = $("#chat-input").val(); 
 if(msg.trim() == ''){
      return false;
    }
    socket.emit('send_message',msg);
    $("#chat-input").val(''); 
  }

function enterkey(e) {
  if(e.keyCode===13) {
    e.preventDefault()
send_msg();
}
}
document.getElementById("chat-input").addEventListener("keydown", enterkey, false);

  $("#chat-submit").click(function(e) {
send_msg();
  })
  
  function generate_message(msg, type,username,color) {
    INDEX++;
    var str="";
    str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+" \">";
    str += "          <div class=\"username "+color+"\">";
    str += escapeHtml(username+": ");
    str += "          <\/div>";
    str += "          <div class=\"cm-msg-text\">";
    str += escapeHtml(msg);
    str += "          <\/div>";
    str += "        <\/div>";
    $(".chat-logs").append(str);
    $("#cm-msg-"+INDEX).hide().fadeIn(300);
    //if(type == 'self'){
    // $("#chat-input").val(''); 
   // }    
    $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);    
  }  
  
  
 socket.on('message_received', function (username,msg) {
  var color;
  if(username!=="Server"){
     switch (store.state.players.indexOf(username)) {
            case 0:
            color="text-success";
                break;
            case 1:
            color=" \"  style= \" color: rgb(0, 197, 255);         "
                break;
            case 2:
            color="text-warning";
                break;
            case 3:
            color="text-primary";
                break;
            default:
            color="text-primary";
            break;

        };
  }
  else{
    color="text-danger";
  }
 
  generate_message(msg.trim(),"user",username,color);
});
 /////////
 }
}




export default {wrapper:wrapper}