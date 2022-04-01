import React, {  useRef, useState } from 'react'
import { Tile } from '../Tile/Tile'
import "./ChessBoard.css"
import Rules from "../../rules/Rules"

  const vertical = [1,2,3,4,5,6,7,8]
  const horizontal = ['a','b','c','d','e','f','g','h']
  const initialState = [{
    image:"./images/king_black.png",
    x:4,
    y:7,
    type: 'king',
    team: 'opponent'
  },
  {
    image:"./images/king_white.png",
    x:4,
    y:0,
    type: 'king',
    team: 'our'
  },
  {
    image:"./images/queen_white.png",
    x:3,
    y:0,
    type: 'queen',
    team: 'our'
  },
  {
    image:"./images/rook_white.png",
    x:0,
    y:0,
    type: 'rook',
    team: 'our'
  }]

  const game = {
    ongoing: true,
    check: false,
    mate: false,
    pat: false,
    remi: false
  }

  export const ChessBoard = () => {
  const [turn,setTurn] = useState(true)
  const [activePiece, setActivePiece] = useState(null)
  const [gridX,setGridX] = useState(0)
  const [gridY,setGridY] = useState(0)
  const [pieces,setPieces] = useState(JSON.parse(JSON.stringify(initialState)))
  const [gameState, setGameState] = useState(JSON.parse(JSON.stringify(game)))
  const chessboardRef = useRef(null)
  const rules = new Rules();

const board =[];

  function reset(){
      setTurn(true)
      setPieces(JSON.parse(JSON.stringify(initialState)))
      setGameState(JSON.parse(JSON.stringify(game)))
    
  }

  function grabPiece(e){
    const element = e.target;
    const chessboard = chessboardRef.current;
    if(element.classList.contains('chess-piece') && chessboard){
      const gridX = Math.floor((e.clientX - chessboard.offsetLeft)/100);
      const gridY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/100));
      setGridX(gridX);
      setGridY(gridY);
      const x= e.clientX - 50;
      const y= e.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

    setActivePiece(element);
    }
  }
  function movePiece(e){
   const chessboard = chessboardRef.current;
    if(activePiece && chessboard){
      const minX = chessboard.offsetLeft - 10;
      const maxX = chessboard.offsetLeft+chessboard.clientWidth - 100;
      const minY = chessboard.offsetTop;
      const maxY = chessboard.offsetLeft+chessboard.clientHeight - 100;
      const x= e.clientX - 50;
      const y= e.clientY - 50;
      activePiece.style.position = "absolute";
      // activePiece.style.left = `${x}px`;
      // activePiece.style.top = `${y}px`;
    if(x<minX){
      activePiece.style.left = `${minX}px`
    }else if(x>maxX){
      activePiece.style.left = `${maxX}px`
    }else{
      activePiece.style.left = `${x}px`
    }
    if(y<minY){
      activePiece.style.top = `${minY}px`
    }else if(y>maxY){
      activePiece.style.top = `${maxY}px`
    }else{
      activePiece.style.top = `${y}px`
    }
  }
}
  function dropPiece(e){
    const chessboard = chessboardRef.current
    if(activePiece && chessboard){
      const x = Math.floor((e.clientX - chessboard.offsetLeft)/100);
      const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/100));
      
      const currentPiece = pieces.find(p=> p.x === gridX && p.y === gridY)
      //const attackedPiece = pieces.find(p=> p.x === x && p.y === y)
      let validMove;
      if(currentPiece){
        
        if(currentPiece.type !=='king'){
        validMove = rules.isValidMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces, turn,false,false)
        }else{
        validMove = rules.isValidForKing(gridX, gridY, x, y, currentPiece.team, pieces, turn, gameState)
        }
        
        if(validMove){
        const updatedPieces = pieces.reduce((results, piece)=>{
          if(piece.x === gridX && piece.y===gridY){
            piece.x = x;
            piece.y = y;
            results.push(piece)
          }else if(!(piece.x === x && piece.y === y)){
            results.push(piece)
          }
          rules.ifCheck(pieces, currentPiece.team, turn, gameState)
          return results;
        },[])

        setPieces(updatedPieces)
        setTurn(!turn)
        
      }else{
          activePiece.style.position = 'relative'
          activePiece.style.removeProperty('top')
          activePiece.style.removeProperty('left')
        }
      
      }
      setActivePiece(null);
    }
  }



    for(let i=7; i>=0; i--){
      for(let j=0; j<8;j++){
         let number = i+j;
         let image = undefined;
         pieces.forEach(p=>{
           if(p.x === j && p.y ===i){
             image = p.image
           }
         })
  
         board.push(
           <Tile key={`${i},${j}`} number={number} image={image}/>
         )
      }
    }
  
  if(pieces.length===2){
    console.log("Remi")
  }
    


  return (
    <div className='container'>
      <button className="reset" onClick={reset} >RESET</button>
    <div 
    onMouseUp={e=> dropPiece(e)}
    onMouseMove={e=>movePiece(e)} 
    onMouseDown={e => grabPiece(e)}
    ref={chessboardRef}
    className='board'>
      {board}
    </div>
    </div>
  
  )
  }
