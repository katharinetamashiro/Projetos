//function to draw the board and pass the positions of buttons
function drawBoard() 
{

	for (y=8; y > 0; y--) 
	{
		document.write('<tr>');

		for (x=1; x < 9; x++)
		{
			document.write('<td><input type="button" class="btn" id='+x+","+y+' onclick="onClick('+x+","+y+');" oncontextmenu="rightClick('+x+","+y+');" backgroundImage="url()" value="" > </td>');
		}
		 
		document.write('</tr>');
	}
	
	//calls function to implant the mines on board
	implantMine();

	//calls function to catch neighbors around each position
	getNeighborsArray();
}

//function to get random number to put in (x,y)
function getRandomInt(min, max) 
{
 	return Math.floor(Math.random() *8) + 1;
}

//function to implant mine on board with the random number (x,y)
function implantMine()
{
	var qnt=7;
	var mine="";

	while (qnt > 0)
	{
		var x = getRandomInt();
		var y = getRandomInt();
		qnt--;
		console.log(x,y);
		mine=document.getElementById(x+","+y);
		mine.setAttribute('value', '*');
	}
}

//function to implant the number of mines around the position that is being analised
function neighborsMines (neighbors_position, position)
{
	var mines=0;
	
	//loop to catch each element of array
	for (var i=0; i < neighbors_position.length; i++){
		
		var neighbor_pos=document.getElementById(neighbors_position[i]);
		var neighbor_value=neighbor_pos.getAttribute('value');
		var position_value=position.getAttribute('value');
		
		//if the neighbors value is "*" then the variable mines will be incremented, BUT, this will only happen IF the position it's not "*" either, or the loop will change it to n mines
		if ((neighbor_value == "*") && (position_value != "*"))
		{
			mines++;
			position.setAttribute('value', mines);
		}
	}
}

//function to get the position of valid neighbors
function getNeighborsArray()
{
	var array_neighbors = [];
	var array_positions = [];
	//loop to pass by all buttons
	for (var y=1; y<=8; y++){

		for (var x=1; x<=8; x++){
			
			var neighbors_position=[];
			var position=document.getElementById(x+","+y);
			var position_manipul=position; //this variable it's just to manipul the position of neighbors and to not change the value of var position
			
			if ((x>1) && (y<8)){		//top left
				neighbors_position.push(position_manipul=(x-1)+","+(y+1));
			}
			
			if ((x>1) && (y>1)){		//down left
				neighbors_position.push(position_manipul=(x-1)+","+(y-1));
			}
			
			if ((x<8) && (y<8)){		//top right
				neighbors_position.push(position_manipul=(x+1)+","+(y+1));
			}
			
			if ((x<8) && (y>1)){		//down right
				neighbors_position.push(position_manipul=(x+1)+","+(y-1));
			}
			
			if (x>1){		//left
				neighbors_position.push(position_manipul=(x-1)+","+y);
			}
			
			if (x<8){		//right
				neighbors_position.push(position_manipul=(x+1)+","+y);
			}
			
			if (y>1){		//down
				neighbors_position.push(position_manipul=x+","+(y-1));
			}
			
			if (y<8){		//top
				neighbors_position.push(position_manipul=x+","+(y+1));
			}

			neighborsMines(neighbors_position, position);
			//revealBlank(neighbors_position,position);
		}	
	}
}

//function onclick
function onClick(x,y) 
{

	var element=document.getElementById(x+","+y);
	var element_value=element.getAttribute('value');
	var element_background=element.getAttribute('backgroundImage');
	console.log(element);

	if ( element_background == "url()"){
		if ( element_value == "*") //if the btn clicked its a bomb, shows alert
		{
			element.style.backgroundImage='url(./mine.png)';
			alert("You lose...");
			revealBoard();
		}
		else if ( element_value == "")
		{
			element.style.color= "black";
			element.style.backgroundColor="#7e8790";
			revealBlank(x,y);
		}
		else 
		{
			element.style.color= "black";
			element.style.backgroundColor="#7e8790";
		}
	}
}

//function right click to add flags 
function rightClick(x,y)
{
	var element=document.getElementById(x+","+y);
	var element_value=element.getAttribute('backgroundImage');
	
	if (element_value == "url()")
	{
		return element.style.backgroundImage="url(./flag.png)";
	}
	else
	{
		return element.style.backgroundImage="url()";
	}
	console.log(element_value);
}

//function to reveal all the board
function revealBoard()
{	
	for (y=1; y <= 8; y++)
	{
		for (x=1; x <=8; x++)
		{
			var buttons=document.getElementById(x+","+y);
			var buttons_value=buttons.getAttribute('value');
			
			if (buttons_value == "*")
			{
				console.log(buttons, buttons_value);
				buttons.style.backgroundImage='url(./mine.png)';
			}
			
			else 
			{
				buttons.style.backgroundColor="#7e8790";
				buttons.style.color="black";
			}
		}
	}	
}

function revealBlank(x,y)
{
	var clicked_position=document.getElementById(x+","+y);
	var clicked_neighbor=document.getElementById(x+","+y);
	var clicked_neighbor_id=clicked_neighbor.getAttribute('id');
	var clicked_neighbor_value=clicked_neighbor.getAttribute('value');
	//console.log(clicked_position);

	if ((x>1) && (y<8)){		//top left
		if ((clicked_neighbor_id=(x-1)+","+(y+1)) && clicked_neighbor_value == "")
		{
			console.log(clicked_neighbor);
			clicked_neighbor.setAttribute('id', (x-1)+","+(y+1))
			clicked_neighbor.style.color= "black";
			clicked_neighbor.style.backgroundColor="#7e8790";
		}
	}
	
	// if ((x>1) && (y>1)){		//down left
	// 	neighbors_position.push(position_manipul=(x-1)+","+(y-1));
	// }
	
	// if ((x<6) && (y<6)){		//top right
	// 	neighbors_position.push(position_manipul=(x+1)+","+(y+1));
	// }
	
	// if ((x<6) && (y>1)){		//down right
	// 	neighbors_position.push(position_manipul=(x+1)+","+(y-1));
	// }
	
	// if (x>1){		//left
	// 	neighbors_position.push(position_manipul=(x-1)+","+y);
	// }
	
	// if (x<6){		//right
	// 	neighbors_position.push(position_manipul=(x+1)+","+y);
	// }

	// if (y>1){		//down
	// 	neighbors_position.push(position_manipul=x+","+(y-1));
	// }
			
	// if (y<6){		//top
	// 	neighbors_position.push(position_manipul=x+","+(y+1));
	// }
	
}