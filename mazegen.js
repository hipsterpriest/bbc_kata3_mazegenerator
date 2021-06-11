/**
Generate and show a maze, using the simple Depth-first search algorithm.

First attempt at an algorithm in plain js.
Attempted recursion doesn't work. Draws a wonky maze.

*/

let maze=[];
let cell= {
    visited:false,
    north: false,     // walls - assume all closed ie false
    east: false,    
    south: false,
    west: false,
};

let width=8; height=width;  // assume square eg 8x8
let vc=0;                   // visit count for debugging

// generate "blank" maze
 const makeBlankMaze = () => {

    for (let x=0;x<width;x++){
        for (let y=0;y<height;y++){
         maze[x,y]={
            visited:false,
            north: false,   // walls - assume all closed ie false
            east: false,    // on second thoughts should really change to true       
            south: false,
            west: false,
        };;    
        }        
    }
}

// take in (x,y) and return a list of the max 4 neighbours
const getNeighbours = (x,y) =>{

    let n=[];
 
    // return a valid neighbour for each of the options

    if (x>0)
     n.push([x-1, y]);  //left neighbour
    
     if (y>0)
      n.push([x, y-1]); //top neighbour

    if (x<(width-1))
     n.push([x+1, y]);  //right neighbour

    if (y<(height-1))
     n.push([x, y+1]);  //bottom neighbour
    
     return n;
}


/**
    Mark the current cell as visited, and get a list of its neighbors. 
    For each neighbor, starting with a randomly selected neighbor:
        If that neighbor hasn't been visited, remove the wall between this cell and that neighbor, and then recurse with 
            that neighbor as the current cell.
 */
const generateMaze = (cX, cY) => { 
    
    maze[cX,cY].visited=true; vc++;
    
    let neighbours = getNeighbours(cX, cY);
        
    // create a small array of random indexes into neighbours
    let rands = [0, 1, 2, 3]; 
       
    rands.length=neighbours.length;         //adjust length then sort
    rands.sort(() => Math.random() - 0.5);
   
    // For each neighbour
    
    for (let i = 0; i < rands.length; i++) {     
        
        // pick a random neighbour
        let rIndex=rands[i];        
       
        let nX=neighbours[rIndex][0];
        let nY=neighbours[rIndex][1];        
        
        if (!maze[nX,nY].visited){  //If that neighbor hasn't been visited...
            
            maze[nX,nY].visited=true;
            
            // remove the wall between this cell and that neighbour
            if (nX>cX)                   // r neighbour
                maze[cX,cY].east=true;
            if (nX<cX)                   // l neighbour
                maze[cX,cY].west=true;
            if (nY>cY)                   // t neighbour
                maze[cX,cY].south=true;
            if (nY<cY)                   // b neighbour
                maze[cX,cY].north=true;                      

            //recurse with that neighbour as the current cell
            generateMaze(nX,nY);
       }     
        
    }
}

const printMaze = () => {

    let lastLine="";
    for (let y=0;y<height;y++){
        let top="";
        let mid="";
        let here=" ";
        for (let x=0;x<width;x++){
                        
            if (!maze[x,y].north) top+=("+--"); else top+="+  ";

            // X marks the starting point (startX, startY) 
            if ((x===startX) && (y===startY)) here="X "; else here="  ";            
            if (!maze[x,y].east) mid = mid + ("|") + here; 
                else mid = mid + " " + here;                       
        }
    top+="+";    
    mid+="|";    
    console.log(top);
    console.log(mid);
    if (lastLine==="") lastLine=top; // use firstline generated, as the last line
    
    }
    //draw last line
    console.log(lastLine);
}

// Start cell is random
let startX= Math.floor(Math.random() * width); 
let startY= Math.floor(Math.random() * height);

makeBlankMaze();
printMaze(generateMaze(startX, startY)); 

// end 
