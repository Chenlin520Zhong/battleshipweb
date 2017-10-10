/*
Chenlin Zhong  Sep 2016
*/


(function() {
var shipsY = {};
shipsY.place=[false,false,false,false,false];
shipsY.lifes=[5,4,3,3,2];

var shipsE = {};
var shipnames=['carrier','cruiser','submarine','destroyer','corvette'];
shipsE.place=[false,false,false,false,false];
shipsE.lifes=[5,4,3,3,2];

var vertical=true;
var templength=0;
var tempship=-1;
var tempshipE=-1;
var Showships=false;
var count=0;

EMPTY_GRID= -1;
SHIP_PLACED_0 = 0;
SHIP_PLACED_0 = 1;
SHIP_PLACED_0 = 2;
SHIP_PLACED_0 = 3;
SHIP_PLACED_0 = 4;
SHOOT_NOHIT = 5;
SHOOT_HIT = 6;
var game_start=false;
var your_turn=true;
var isHit=false;
var sunkship=-1;


var boardstate=new Array(100);

for(var i=0;i<100;i++){
	boardstate[i]=-1;
}

var baf=document.getElementById('you');
for(var i=0;i<10;i++){
	for(var j=0;j<10;j++){
		var g=document.createElement('div');
		baf.appendChild(g);
		g.setAttribute('class','grid');
		g.setAttribute('x',i);
		g.setAttribute('y',j);
		g.setAttribute('grid-state',EMPTY_GRID);
		//g.innerHTML=i+''+j; show the coodinate of the grid
		g.setAttribute('id',i*10+j);
		g.addEventListener('click', placeship); 
		g.addEventListener('mouseover', over); 
		g.addEventListener('mouseout', out); 
	}
}

 baf=document.getElementById('enemy');
for(var i=0;i<10;i++){
	for(var j=0;j<10;j++){
		var g=document.createElement('div');
		baf.appendChild(g);
		g.setAttribute('class','grid');
		g.setAttribute('x',i);
		g.setAttribute('y',j);
		g.setAttribute('placed',false);
		g.setAttribute('id',100+i*10+j);
		g.setAttribute('grid-state',EMPTY_GRID);
		g.addEventListener('click', youclick); 
		//g.innerHTML=i+''+j; show the coodinate of the grid
	}
}

	
	var cb=document.getElementById('control-board');
	cb.addEventListener('click', selectship); 

var inf=document.getElementById('info');

function selectship(e){
	
	if(e.target.id!='control-board'
		&&e.target.id!='rotate'
		&&e.target.id!='info'
		){
		templength=0;
	if(shipsY.place[parseInt(e.target.id)%1000]==false){
		tempship=parseInt(e.target.id)%1000;
		templength=shipsY.lifes[tempship];
	
	}
	}
	
}


function over(e){
	if(templength>0){
		if(vertical){
			for(i=0;i<templength;i++){
				
				if((i*10+parseInt(e.target.getAttribute('id')))>99)break;
				var tempgrid=document.getElementById(i*10+parseInt(e.target.getAttribute('id')));
				if(tempgrid.getAttribute('grid-state')>-1)break;
				grid_paint(i*10+parseInt(e.target.getAttribute('id')),'black');
				
			}
		}else{
			
			for(i=0;i<templength;i++){
				if(i>0&&(i+parseInt(e.target.getAttribute('id')))%10==0)break;
				var tempgrid=document.getElementById(i+parseInt(e.target.getAttribute('id')));
				if(tempgrid.getAttribute('grid-state')>-1)break;
					if(i>0&&(i+parseInt(e.target.getAttribute('id')))%10==0)break;
				grid_paint(i+parseInt(e.target.getAttribute('id')),'black');
				
			}
		}
		
	}
}
function out(e){
		
	if(templength>0){
		if(vertical){
			for(i=0;i<templength;i++){
				
				if((i*10+parseInt(e.target.getAttribute('id')))>99)break;
				var tempgrid=document.getElementById(i*10+parseInt(e.target.getAttribute('id')));
				if(tempgrid.getAttribute('grid-state')>-1)break;
				grid_paint(i*10+parseInt(e.target.getAttribute('id')),"#0080FF");
			}
		}else{
			
			for(i=0;i<templength;i++){
				if(i>0&&(i+parseInt(e.target.getAttribute('id')))%10==0)break;
				var tempgrid=document.getElementById(i+parseInt(e.target.getAttribute('id')));
				if(tempgrid.getAttribute('grid-state')>-1)break;
					if(i>0&&(i+parseInt(e.target.getAttribute('id')))%10==0)break;
				grid_paint(i+parseInt(e.target.getAttribute('id')),"#0080FF");
				
			}
		}
		
	}
}

document.getElementById("showships").addEventListener('click',showyourships);
function showyourships(){
	Showships=!Showships;
	if(Showships){
	for(var i=0;i<100;i++){
		if(document.getElementById(100+i).getAttribute('grid-state')>=0&&
		document.getElementById(100+i).getAttribute('grid-state')<=4
		){
		 grid_paint(100+i,'gray');
		}
	}	
	}else{
		for(var i=0;i<100;i++){
		if(document.getElementById(100+i).getAttribute('grid-state')>=0&&
		document.getElementById(100+i).getAttribute('grid-state')<=4
		){
		 grid_paint(100+i,'#0080FF');
		}
		}
	}
}



function placeship(e){
	
	loop1:if(templength>0){
		if(vertical){
			
			for(i=0;i<templength;i++){
				if((i*10+parseInt(e.target.getAttribute('id')))>99)break loop1;
				var tempgrid=document.getElementById(i*10+parseInt(e.target.getAttribute('id')));
				if(tempgrid.getAttribute('grid-state')>-1)
				break loop1;
				//alert(tempgrid.getAttribute('grid-state'));
				
			}
			for(i=0;i<templength;i++){
				if((i*10+parseInt(e.target.getAttribute('id')))>99)break;
				var tempgrid=document.getElementById(i*10+parseInt(e.target.getAttribute('id')));
				tempgrid.setAttribute('grid-state',tempship);
					switch(tempship){
					case 0:
					tempgrid.innerHTML="I";
					break;
					case 1:
					tempgrid.innerHTML="II";
					break;
					case 2:
					tempgrid.innerHTML="III";
					break;
					case 3:
					tempgrid.innerHTML="IV";
					break;
					case 4:
					tempgrid.innerHTML="V";
					break;
					
					default:
				}
				grid_paint(i*10+parseInt(e.target.getAttribute('id')),'grey');
			}
			
			shipsY.place[tempship]=true;
			templength=0;
			
		}else{
			
			for(i=0;i<templength;i++){
				
					if(i>0&&(i+parseInt(e.target.getAttribute('id')))%10==0)break loop1;
				var tempgrid=document.getElementById(i+parseInt(e.target.getAttribute('id')));
				if(tempgrid.getAttribute('grid-state')>-1)break loop1;
			}
			for(i=0;i<templength;i++){
				if(i>0&&(i+parseInt(e.target.getAttribute('id')))%10==0)break;
				var tempgrid=document.getElementById(i+parseInt(e.target.getAttribute('id')));
				tempgrid.setAttribute('grid-state',tempship);
					switch(tempship){
					case 0:
					tempgrid.innerHTML="I";
					break;
					case 1:
					tempgrid.innerHTML="II";
					break;
					case 2:
					tempgrid.innerHTML="III";
					break;
					case 3:
					tempgrid.innerHTML="IV";
					break;
					case 4:
					tempgrid.innerHTML="V";
					break;
					
					default:
				}
				
				grid_paint(i+parseInt(e.target.getAttribute('id')),'grey');
				
			}
			shipsY.place[tempship]=true;
			templength=0;
		}
		//document.getElementById(1000+tempship).disabled='disabled';
		document.getElementById(1000+tempship).style.color='grey';
		tempship=null;
		for(var i=0;i<shipsY.place.length;i++){
			if(!shipsY.place[i])break loop1;
		}
		alert('game start');
		generate_enemy();
		templength=0;
		game_start=true;
	}
}
//generate_enemy();
var r=document.getElementById('rotate');
r.addEventListener('click',rotateship);
function rotateship(){
	vertical=!vertical;
}

function grid_paint(id,c){
	var tempgrid=document.getElementById(id);
				tempgrid.style.backgroundColor = c;
}

function generate_enemy(){
	
	for(var i=0;i<shipsE.lifes.length;i++){
		templength=shipsE.lifes[i];
		tempshipE=i;
		do{
	   var tempid = Math.floor(Math.random()*100)+100;
		var direction=Math.floor(Math.random()*2);
		}while(!legalplace(tempid,direction));
		
	}
}
function legalplace(tid,dir){
	if(document.getElementById(tid).getAttribute('grid-state')!=EMPTY_GRID)return false;
	if(dir==0){
		for(var i=1;i<templength;i++){
				if((i*10+tid)>199)return false;
				//if(i>0&&(i+tid)%10==0)return false;
		if(document.getElementById(tid+i*10).getAttribute('grid-state')!=EMPTY_GRID)return false;	
		}
		for(var i=0;i<templength;i++){
			document.getElementById(tid+i*10).setAttribute('grid-state',tempshipE);
			//grid_paint(tid+i*10,'grey');
		}
		//shipsE.place[tempship]=true;
		
		return true;
	}else if(dir==1){
		for(var i=1;i<templength;i++){
				if(i>0&&(i+tid)%10==0)return false;
		if(document.getElementById(tid+i).getAttribute('grid-state')!=EMPTY_GRID)return false;	
		}
		
		for(var i=0;i<templength;i++){
			document.getElementById(tid+i).setAttribute('grid-state',tempshipE);
			//grid_paint(tid+i,'grey');
		}
		
		//shipsE.place[tempship]=true;
		return true;
	}
}

function youclick(e){
	if(your_turn&&game_start){
		tempshipE=-1;
		if(e.target.getAttribute('grid-state')<SHOOT_NOHIT){
			if(e.target.getAttribute('grid-state')==EMPTY_GRID){
				e.target.setAttribute('grid-state',SHOOT_NOHIT);
				e.target.innerHTML='';
				grid_paint(e.target.getAttribute('id'),'black');
				your_turn=!your_turn;
				
				enemyAction();
			}
			else if(e.target.getAttribute('grid-state')>EMPTY_GRID){
				tempshipE=e.target.getAttribute('grid-state');
				shipsE.lifes[tempshipE]--;
				if(shipsE.lifes[tempshipE]<=0){
					document.getElementById('info').value=
					document.getElementById('info').value+
					"\n"+
					"Enemy's "+shipnames[tempshipE]+" has sunk";
									
                document.getElementById('info').scrollTop=Math.max(0,document.getElementById('info').scrollHeight-document.getElementById('info').offsetHeight);

				}
				checkVictory();
				e.target.setAttribute('grid-state',SHOOT_HIT);
				grid_paint(e.target.getAttribute('id'),'#CD6090');
			}	
		}
	}
}

	function checkVictory(){
		
		if(your_turn){
			for(var i=0;i<shipsE.lifes.length;i++){
				if(shipsE.lifes[i]>0)return false;
			}
				document.getElementById('info').value=
				document.getElementById('info').value+
				"\n"+
				"You win!";
                document.getElementById('info').scrollTop=Math.max(0,document.getElementById('info').scrollHeight-document.getElementById('info').offsetHeight);
				
				game_start=false;
			
		}else{
			for(var i=0;i<shipsY.lifes.length;i++){
				if(shipsY.lifes[i]>0)return false;
			}
				document.getElementById('info').value=
				document.getElementById('info').value+
				"\n"+
				"Enemy win!";
                document.getElementById('info').scrollTop=Math.max(0,document.getElementById('info').scrollHeight-document.getElementById('info').offsetHeight);
			game_start=false;
		}
		
	}

function enemyAction(){
		while(!your_turn&&game_start){
			// sleep(timeout(),1000);
			 //timeout();
				var targetGrid= document.getElementById(nextStep());
				count++;
				targetGrid.innerHTML=count;
				if(targetGrid.getAttribute('grid-state')<SHOOT_NOHIT){
					if(targetGrid.getAttribute('grid-state')==EMPTY_GRID){
						targetGrid.setAttribute('grid-state',SHOOT_NOHIT);
						grid_paint(targetGrid.getAttribute('id'),'black');
					isHit=false;
					sunkship=-1;
					boardstate[targetGrid.getAttribute('id')]=0;
						your_turn=!your_turn;
					}
					else if(targetGrid.getAttribute('grid-state')>EMPTY_GRID){
						tempship=targetGrid.getAttribute('grid-state');
						shipsY.lifes[tempship]--;
						sunkship=-1;
						if(shipsY.lifes[tempship]<=0){
							document.getElementById('info').value=
							document.getElementById('info').value+
							"\n"+
							"Your "+shipnames[tempship]+" has sunk";
											
						document.getElementById('info').scrollTop=Math.max(0,document.getElementById('info').scrollHeight-document.getElementById('info').offsetHeight);
						sunkship=tempship;
						}
						isHit=true;
						boardstate[targetGrid.getAttribute('id')]=1;
						checkVictory();
						targetGrid.setAttribute('grid-state',SHOOT_HIT);
						grid_paint(targetGrid.getAttribute('id'),'#CD6090');
					}	
					
				}
		}
}

function timeout(){
	
}


document.getElementById('submit').addEventListener('click',newpageGen);

var str1=heredoc(function(){/*
<html>
<head>
<link 
<link href="style.css"  rel="stylesheet" type="text/css">
</head>
<h1>Battleship game</h1>
<body text-align='center'>;

<div class="whole">
<div id="you" class="battlefield you">
</div>
<div id="control-board">
<button id='1000'>carrier</button>
<button id='1001'>cruiser</button>
<button id='1002'>submarine</button>
<button id='1003'>destroyer</button>
<button id='1004'>corvette</button>
<button id='rotate'>rotate-ship</button>
<button id='showships'>showships</button>


<textarea id='info' >Welcome! Place your ships on the left..</textarea>

</div>
<div id="enemy" class="battlefield enemy">
</div>
<br/>
<br/>
 <textarea id='newcode' >
 //input your code here
 //parameters you can use:
 //Array boardstate(100) from 0 to 99 =
 // -1 nonHit
 // 0 missed
 // 1 hit
 // boolean isHit: if it hit any ship last round default=false;
 // integer sunkship: if it hit any ship and it sunk last round =
 // from 0 to 4 as ship index, if no, sunkship=-1, default=-1
 // use the function name nextStep()
 // example below
 
var step=0;
 
function nextStep(){
	return step++;
}
 </textarea>
	<button id='submit'>submit</button>

</div>

<div id='code1'></div>
<div id='code2'></div>


<script>

var str1,str2;

(function() {
	
var shipsY = {};
shipsY.place=[false,false,false,false,false];
shipsY.lifes=[5,4,3,3,2];

var shipsE = {};
var shipnames=['carrier','cruiser','submarine','destroyer','corvette'];
shipsE.place=[false,false,false,false,false];
shipsE.lifes=[5,4,3,3,2];

var vertical=true;
var templength=0;
var tempship=-1;
var tempshipE=-1;
var Showships=false;
var count=0;


EMPTY_GRID= -1;
SHIP_PLACED_0 = 0;
SHIP_PLACED_0 = 1;
SHIP_PLACED_0 = 2;
SHIP_PLACED_0 = 3;
SHIP_PLACED_0 = 4;
SHOOT_NOHIT = 5;
SHOOT_HIT = 6;
var game_start=false;
var your_turn=true;
var isHit=false;
var sunkship=-1;

var step=0;

var boardstate=new Array(100);

for(var i=0;i<100;i++){
	boardstate[i]=-1;
}

var baf=document.getElementById('you');
for(var i=0;i<10;i++){
	for(var j=0;j<10;j++){
		var g=document.createElement('div');
		baf.appendChild(g);
		g.setAttribute('class','grid');
		g.setAttribute('x',i);
		g.setAttribute('y',j);
		g.setAttribute('grid-state',EMPTY_GRID);
		//g.innerHTML=i+''+j; show the coodinate of the grid
		g.setAttribute('id',i*10+j);
		g.addEventListener('click', placeship); 
		g.addEventListener('mouseover', over); 
		g.addEventListener('mouseout', out); 
	}
}

 baf=document.getElementById('enemy');
for(var i=0;i<10;i++){
	for(var j=0;j<10;j++){
		var g=document.createElement('div');
		baf.appendChild(g);
		g.setAttribute('class','grid');
		g.setAttribute('x',i);
		g.setAttribute('y',j);
		g.setAttribute('placed',false);
		g.setAttribute('id',100+i*10+j);
		g.setAttribute('grid-state',EMPTY_GRID);
		g.addEventListener('click', youclick); 
		//g.innerHTML=i+''+j; show the coodinate of the grid
	}
}

	
	var cb=document.getElementById('control-board');
	cb.addEventListener('click', selectship); 

var inf=document.getElementById('info');

function selectship(e){
	
	if(e.target.id!='control-board'
		&&e.target.id!='rotate'
		&&e.target.id!='info'
		){
		templength=0;
	if(shipsY.place[parseInt(e.target.id)%1000]==false){
		tempship=parseInt(e.target.id)%1000;
		templength=shipsY.lifes[tempship];
	
	}
	}
	
}


function over(e){
	if(templength>0){
		if(vertical){
			for(i=0;i<templength;i++){
				
				if((i*10+parseInt(e.target.getAttribute('id')))>99)break;
				var tempgrid=document.getElementById(i*10+parseInt(e.target.getAttribute('id')));
				if(tempgrid.getAttribute('grid-state')>-1)break;
				grid_paint(i*10+parseInt(e.target.getAttribute('id')),'black');
				
			}
		}else{
			
			for(i=0;i<templength;i++){
				if(i>0&&(i+parseInt(e.target.getAttribute('id')))%10==0)break;
				var tempgrid=document.getElementById(i+parseInt(e.target.getAttribute('id')));
				if(tempgrid.getAttribute('grid-state')>-1)break;
					if(i>0&&(i+parseInt(e.target.getAttribute('id')))%10==0)break;
				grid_paint(i+parseInt(e.target.getAttribute('id')),'black');
				
			}
		}
		
	}
}
function out(e){
		
	if(templength>0){
		if(vertical){
			for(i=0;i<templength;i++){
				
				if((i*10+parseInt(e.target.getAttribute('id')))>99)break;
				var tempgrid=document.getElementById(i*10+parseInt(e.target.getAttribute('id')));
				if(tempgrid.getAttribute('grid-state')>-1)break;
				grid_paint(i*10+parseInt(e.target.getAttribute('id')),"#0080FF");
			}
		}else{
			
			for(i=0;i<templength;i++){
				if(i>0&&(i+parseInt(e.target.getAttribute('id')))%10==0)break;
				var tempgrid=document.getElementById(i+parseInt(e.target.getAttribute('id')));
				if(tempgrid.getAttribute('grid-state')>-1)break;
					if(i>0&&(i+parseInt(e.target.getAttribute('id')))%10==0)break;
				grid_paint(i+parseInt(e.target.getAttribute('id')),"#0080FF");
				
			}
		}
		
	}
}

document.getElementById("showships").addEventListener('click',showyourships);
function showyourships(){
	Showships=!Showships;
	if(Showships){
	for(var i=0;i<100;i++){
		if(document.getElementById(100+i).getAttribute('grid-state')>=0&&
		document.getElementById(100+i).getAttribute('grid-state')<=4
		){
		 grid_paint(100+i,'gray');
		}
	}	
	}else{
		for(var i=0;i<100;i++){
		if(document.getElementById(100+i).getAttribute('grid-state')>=0&&
		document.getElementById(100+i).getAttribute('grid-state')<=4
		){
		 grid_paint(100+i,'#0080FF');
		}
		}
	}
}



function placeship(e){
	
	loop1:if(templength>0){
		if(vertical){
			
			for(i=0;i<templength;i++){
				if((i*10+parseInt(e.target.getAttribute('id')))>99)break loop1;
				var tempgrid=document.getElementById(i*10+parseInt(e.target.getAttribute('id')));
				if(tempgrid.getAttribute('grid-state')>-1)
				break loop1;
				//alert(tempgrid.getAttribute('grid-state'));
				
			}
			for(i=0;i<templength;i++){
				if((i*10+parseInt(e.target.getAttribute('id')))>99)break;
				var tempgrid=document.getElementById(i*10+parseInt(e.target.getAttribute('id')));
				tempgrid.setAttribute('grid-state',tempship);
					switch(tempship){
					case 0:
					tempgrid.innerHTML="I";
					break;
					case 1:
					tempgrid.innerHTML="II";
					break;
					case 2:
					tempgrid.innerHTML="III";
					break;
					case 3:
					tempgrid.innerHTML="IV";
					break;
					case 4:
					tempgrid.innerHTML="V";
					break;
					
					default:
				}
				grid_paint(i*10+parseInt(e.target.getAttribute('id')),'grey');
			}
			
			shipsY.place[tempship]=true;
			templength=0;
			
		}else{
			
			for(i=0;i<templength;i++){
				
					if(i>0&&(i+parseInt(e.target.getAttribute('id')))%10==0)break loop1;
				var tempgrid=document.getElementById(i+parseInt(e.target.getAttribute('id')));
				if(tempgrid.getAttribute('grid-state')>-1)break loop1;
			}
			for(i=0;i<templength;i++){
				if(i>0&&(i+parseInt(e.target.getAttribute('id')))%10==0)break;
				var tempgrid=document.getElementById(i+parseInt(e.target.getAttribute('id')));
				tempgrid.setAttribute('grid-state',tempship);
					switch(tempship){
					case 0:
					tempgrid.innerHTML="I";
					break;
					case 1:
					tempgrid.innerHTML="II";
					break;
					case 2:
					tempgrid.innerHTML="III";
					break;
					case 3:
					tempgrid.innerHTML="IV";
					break;
					case 4:
					tempgrid.innerHTML="V";
					break;
					
					default:
				}
				grid_paint(i+parseInt(e.target.getAttribute('id')),'grey');
				
			}
			shipsY.place[tempship]=true;
			templength=0;
		}
		//document.getElementById(1000+tempship).disabled='disabled';
		document.getElementById(1000+tempship).style.color='grey';
		tempship=null;
		for(var i=0;i<shipsY.place.length;i++){
			if(!shipsY.place[i])break loop1;
		}
		alert('game start');
		generate_enemy();
		templength=0;
		game_start=true;
	}
}
//generate_enemy();
var r=document.getElementById('rotate');
r.addEventListener('click',rotateship);
function rotateship(){
	vertical=!vertical;
}

function grid_paint(id,c){
	var tempgrid=document.getElementById(id);
				tempgrid.style.backgroundColor = c;
}

function generate_enemy(){
	
	for(var i=0;i<shipsE.lifes.length;i++){
		templength=shipsE.lifes[i];
		tempshipE=i;
		do{
	   var tempid = Math.floor(Math.random()*100)+100;
		var direction=Math.floor(Math.random()*2);
		}while(!legalplace(tempid,direction));
		
	}
}
function legalplace(tid,dir){
	if(document.getElementById(tid).getAttribute('grid-state')!=EMPTY_GRID)return false;
	if(dir==0){
		for(var i=1;i<templength;i++){
				if((i*10+tid)>199)return false;
				//if(i>0&&(i+tid)%10==0)return false;
		if(document.getElementById(tid+i*10).getAttribute('grid-state')!=EMPTY_GRID)return false;	
		}
		for(var i=0;i<templength;i++){
			document.getElementById(tid+i*10).setAttribute('grid-state',tempshipE);
			//grid_paint(tid+i*10,'grey');
		}
		//shipsE.place[tempship]=true;
		
		return true;
	}else if(dir==1){
		for(var i=1;i<templength;i++){
				if(i>0&&(i+tid)%10==0)return false;
		if(document.getElementById(tid+i).getAttribute('grid-state')!=EMPTY_GRID)return false;	
		}
		
		for(var i=0;i<templength;i++){
			document.getElementById(tid+i).setAttribute('grid-state',tempshipE);
			//grid_paint(tid+i,'grey');
		}
		
		//shipsE.place[tempship]=true;
		return true;
	}
}

function youclick(e){
	if(your_turn&&game_start){
		tempshipE=-1;
		if(e.target.getAttribute('grid-state')<SHOOT_NOHIT){
			if(e.target.getAttribute('grid-state')==EMPTY_GRID){
				e.target.setAttribute('grid-state',SHOOT_NOHIT);
				e.target.innerHTML='';
				grid_paint(e.target.getAttribute('id'),'black');
				your_turn=!your_turn;
				enemyAction();
			}
			else if(e.target.getAttribute('grid-state')>EMPTY_GRID){
				tempshipE=e.target.getAttribute('grid-state');
				shipsE.lifes[tempshipE]--;
				if(shipsE.lifes[tempshipE]<=0){
					document.getElementById('info').value=
					document.getElementById('info').value+
					"\n"+
					"Enemy's "+shipnames[tempshipE]+" has sunk";
									
                document.getElementById('info').scrollTop=Math.max(0,document.getElementById('info').scrollHeight-document.getElementById('info').offsetHeight);

				}
				checkVictory();
				e.target.setAttribute('grid-state',SHOOT_HIT);
				grid_paint(e.target.getAttribute('id'),'#CD6090');
			}	
		}
	}
}

	function checkVictory(){
		
		if(your_turn){
			for(var i=0;i<shipsE.lifes.length;i++){
				if(shipsE.lifes[i]>0)return false;
			}
				document.getElementById('info').value=
				document.getElementById('info').value+
				"\n"+
				"You win!";
                document.getElementById('info').scrollTop=Math.max(0,document.getElementById('info').scrollHeight-document.getElementById('info').offsetHeight);
				
				game_start=false;
			
		}else{
			for(var i=0;i<shipsY.lifes.length;i++){
				if(shipsY.lifes[i]>0)return false;
			}
				document.getElementById('info').value=
				document.getElementById('info').value+
				"\n"+
				"Enemy win!";
                document.getElementById('info').scrollTop=Math.max(0,document.getElementById('info').scrollHeight-document.getElementById('info').offsetHeight);
			game_start=false;
		}
		
	}

function enemyAction(){
		while(!your_turn&&game_start){
			// sleep(timeout(),1000);
			 timeout();
				var targetGrid= document.getElementById(nextStep());
				count++;
				targetGrid.innerHTML=count;
				if(targetGrid.getAttribute('grid-state')<SHOOT_NOHIT){
					if(targetGrid.getAttribute('grid-state')==EMPTY_GRID){
						targetGrid.setAttribute('grid-state',SHOOT_NOHIT);
						grid_paint(targetGrid.getAttribute('id'),'black');
				isHit=false;
				sunkship=-1;
				boardstate[targetGrid.getAttribute('id')]=0;
						your_turn=!your_turn;
					}
					else if(targetGrid.getAttribute('grid-state')>EMPTY_GRID){
						tempship=targetGrid.getAttribute('grid-state');
						shipsY.lifes[tempship]--;
						sunkship=-1;
						if(shipsY.lifes[tempship]<=0){
							document.getElementById('info').value=
							document.getElementById('info').value+
							"\n"+
							"Your "+shipnames[tempship]+" has sunk";
											
						document.getElementById('info').scrollTop=Math.max(0,document.getElementById('info').scrollHeight-document.getElementById('info').offsetHeight);
						sunkship=tempship;
						}
						isHit=true;
						boardstate[targetGrid.getAttribute('id')]=1;
						checkVictory();
						targetGrid.setAttribute('grid-state',SHOOT_HIT);
						grid_paint(targetGrid.getAttribute('id'),'#CD6090');
					}	
					
				}
		}
}

function timeout(){
	
}


document.getElementById('submit').addEventListener('click',newpageGen);

function strings(a,b){
	return(a+n+'');
}

function heredoc(fn) {
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n'
}

 */});
 
var str2=heredoc(function(){/*
 
function newpageGen(){
	
	newWindow =window.open('test.html');
	  newWindow.document.write(
	  document.getElementById('code1').getAttribute('s1')+'\n'
	 + document.getElementById('newcode').value+'\n'
	 +document.getElementById('code1').getAttribute('s2')
	  ); 
	  newWindow.document.getElementById('code1').setAttribute('s1',
	  document.getElementById('code1').getAttribute('s1')
	  );
	  newWindow.document.getElementById('code1').setAttribute('s2',
	  document.getElementById('code1').getAttribute('s2')
	  );
	  
}
})()
</script>
 </body>
</html>
 */});
function newpageGen(){
	newWindow =window.open('battleship.html');
	  newWindow.document.write(
	  str1+'\n'
	  +document.getElementById('newcode').value+'\n'
	  +str2
	  ); 
	  newWindow.document.getElementById('code1').setAttribute('s1',str1);
	  newWindow.document.getElementById('code1').setAttribute('s2',str2);
}



function heredoc(fn) {
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n'
}

//AI function here

var step =3;
var tstep=0;
var st='';
var direct=0;
NORTH=1;
SOUTH=-1;
WEST=2;
EAST=-2;
var slength=-1;
var tpoint=-1;
function nextStep(){
	/*for(var i=0;i<10;i++){
		for(var j=0;j<10;j++){
			st+=boardstate[i*10+j]+' ';
		}
	}*/
	//alert(st);
	st='';
	slength=-1;
		switch(parseInt(sunkship)){
            case 0:
                slength=5;
                break;
            case 1:
                slength =4;
                break;
            case 2:
                slength =3;
                break;
            case 3:
                slength =3;
                break;
            case 4:
                slength =2;
                break;
        }
		if(slength!=-1){
			 switch (direct){
			case NORTH:for(var i=0;i<slength;i++)boardstate[tstep+i*10]=2;break;
			case SOUTH:for(var i=0;i<slength;i++)boardstate[tstep-i*10]=2;break;
			case WEST:for(var i=0;i<slength;i++)boardstate[tstep+i]=2;break;
			case EAST:for(var i=0;i<slength;i++)boardstate[tstep-i]=2;break;
		}
		
		tpoint=-1;
		direct=0;
		}
	cl=checkleft();
    if(cl==-1){
	do{
	if(step>99)step-=100;
	tstep=step;
	step+=9;}while(boardstate[tstep]>-1);
	}else{
		
		if(direct==0){
			tpoint=cl;
			tstep=tpoint;
			direct=turn();
			
		}else if(!foward()||!isHit){
			direct=direct*-1;
			tstep=tpoint;
			if(!foward())direct=turn();
		}
		
	}
			
	return tstep;
	
	function checkleft(){
		for(var i=0;i<boardstate.length;i++){
		if(boardstate[i]==1)return i;
	}
	return -1;
	}
	function turn(){
		if(isLegal(tpoint-10)){tstep=tpoint-10;return NORTH;}
		if(isLegal(tpoint+10)){tstep=tpoint+10;return SOUTH;}
		if(isLegal(tpoint-1)){tstep=tpoint-1;return WEST;}
		if(isLegal(tpoint+1)){tstep=tpoint+1;return EAST;}
	}
	function foward(){
		if(direct==NORTH&&isLegal(tstep-10)){tstep=tstep-10;return true;}
		if(direct==SOUTH&&isLegal(tstep+10)){tstep=tstep+10;return true;}
		if(direct==WEST&&isLegal(tstep-1)){tstep=tstep-1;return true;}
		if(direct==EAST&&isLegal(tstep+1)){tstep=tstep+1;return true;}
		return false;
	}
	function isLegal(c){
		if(c>=0&&c<=99&&(c%10==tstep%10||Math.floor(c/10)==Math.floor(tstep/10))){
		if(boardstate[c]==-1)return true;}
		else return false;
	}
}

//end AI function 

})()

