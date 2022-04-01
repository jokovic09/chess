export default class Rules{
    tileIsOccupied(x,y,boardState,team,pass){
        let piece;
        if(pass){
            piece = boardState.find(p=> p.x === x && p.y ===y&& !(p.type === 'king' && p.team === team ))
        }else{
            piece = boardState.find(p=> p.x === x && p.y ===y && !(p.type === 'king' && p.team !== team ) )
        }
        if(piece){
            return true
        }else{
            return false
        }
    }

    tileIsOccupiedbyOpponent(x,y,boardState,team){
        const piece = boardState.find(p=> p.x===x && p.y===y && p.team !== team)
        if(piece){
            return true
        }else{
            return false
        }
    }
    ifCheck(boardState, team, turn, gameState){
        gameState.check=false;
        let check = false;
        let king;
        boardState.forEach(p=>{
            if(p.team === team){
            for(let x=0;x<=7;x++){
                for(let y=0;y<=7;y++){
                    if(this.isValidMove(p.x,p.y,x,y,p.type,p.team,boardState,turn,true)){
                        boardState.forEach(p=>{
                            if(p.team !== team && p.x === x && p.y === y && p.type==='king'){
                                    console.log("CHECK!!!!!!!!!!")
                                    gameState.check = true;
                                    check=true;
                                    if(check){
                                        boardState.forEach(p=>{
                                            if(p.type==='king'&&p.team !== 'our'){
                                                //GLEDANJE KRALJEVIH MJESTA I JELI MAT
                                    king=p;
                                    let kingAvailable=[]
                                    for(let x=0;x<=7;x++){
                                        for(let y=0;y<=7;y++){
                                            if(Math.abs(king.x-x)<=1 && Math.abs(king.y-y) <=1 
                                            && (!this.tileIsOccupied(x,y,boardState, team)
                                            ||this.tileIsOccupiedbyOpponent(x,y,boardState,team))){
                                                kingAvailable.push({
                                                    x: x,
                                                    y: y
                                                })
                                            }
                                        }
                                    }
                            
                                    let arr =[];
                                    boardState.forEach(p=>{
                                        if(p.team !== king.team){
                                        for(let x=0;x<=7;x++){
                                            for(let y=0;y<=7;y++){
                                                if(this.isValidMove(p.x,p.y,x,y,p.type,'opponent',boardState,turn,true)){
                                                    arr.push({
                                                        x: x,
                                                        y: y
                                                    })
                                                }     
                                             }
                                            }
                                        }
                                    })
                                         kingAvailable = kingAvailable.filter(ar => !arr.find(rm => (rm.x === ar.x && ar.y === rm.y) ))
                                    if(kingAvailable.length===0){
                                            console.log(`White wins!!!!!`)
                                    }
                                    //JELI MAT
                                            }   
                                    })}
                        //             else{

                        //                 boardState.forEach(p=>{
                        //                     if(p.type==='king'&&p.team !== 'our'){
                        //                         //GLEDANJE KRALJEVIH MJESTA I JELI MAT
                        //             king=p;
                        //             let kingAvailable=[]
                        //             for(let x=0;x<=7;x++){
                        //                 for(let y=0;y<=7;y++){
                        //                     if(Math.abs(king.x-x)<=1 && Math.abs(king.y-y) <=1 
                        //                     && (!this.tileIsOccupied(x,y,boardState, team)
                        //                     ||this.tileIsOccupiedbyOpponent(x,y,boardState,team))){
                        //                         kingAvailable.push({
                        //                             x: x,
                        //                             y: y
                        //                         })
                        //                     }
                        //                 }
                        //             }
                            
                        //             let arr =[];
                        //             boardState.forEach(p=>{
                        //                 if(p.team !== king.team){
                        //                 for(let x=0;x<=7;x++){
                        //                     for(let y=0;y<=7;y++){
                        //                         if(this.isValidMove(p.x,p.y,x,y,p.type,'opponent',boardState,turn,true)){
                        //                             arr.push({
                        //                                 x: x,
                        //                                 y: y
                        //                             })
                        //                         }     
                        //                      }
                        //                     }
                        //                 }
                        //             })
                        //                  kingAvailable = kingAvailable.filter(ar => !arr.find(rm => (rm.x === ar.x && ar.y === rm.y) ))
                        //                  console.log(kingAvailable)
                        //             if(kingAvailable.length===0){
                        //                     console.log(`PAT`)
                        //             }

                                
                        //             }
                        //         //pat
                        //     }
                         
                        // )}
                                    //PAT
                                    
                    }   
                 }
                        )
            }}}
        }
        if(check){
            boardState.forEach(p=>{
                if(p.type==='king'&&p.team !== 'our'){
                    //GLEDANJE KRALJEVIH MJESTA I JELI MAT
        king=p;
        let kingAvailable=[]
        for(let x=0;x<=7;x++){
            for(let y=0;y<=7;y++){
                if(Math.abs(king.x-x)<=1 && Math.abs(king.y-y) <=1 
                && (!this.tileIsOccupied(x,y,boardState, team)
                ||this.tileIsOccupiedbyOpponent(x,y,boardState,team))){
                    kingAvailable.push({
                        x: x,
                        y: y
                    })
                }
            }
        }

        let arr =[];
        boardState.forEach(p=>{
            if(p.team !== king.team){
            for(let x=0;x<=7;x++){
                for(let y=0;y<=7;y++){
                    if(this.isValidMove(king.x,king.y,x,y,p.type,'opponent',boardState,turn,true)){
                        arr.push({
                            x: x,
                            y: y
                        })
                    }     
                 }
                }
            }
        })
             kingAvailable = kingAvailable.filter(ar => !arr.find(rm => (rm.x === ar.x && ar.y === rm.y) ))
        if(kingAvailable.length===0){
                console.log(`White wins!!!!!`)
        }
        //JELI MAT
                }   
        })}
    })}
    
    isValidMove(px, py, x, y, type, team, boardState,turn,pass){
        if(!pass){
        if(turn){
            if(team==='opponent'){
                return false
            }
        }else if(!turn){
            if(team==='our'){
                return false
            }
        }}

        if(px===x && py===y){
            return false
        }

        if(type==='rook'){
                if(x===px || y===py){
                   if(!this.tileIsOccupied(x,y,boardState,team,pass)||this.tileIsOccupiedbyOpponent(x,y,boardState,team)){
                       if(y===py){
                           if(px>x){
                            for(let i=px-1;i>x;i--){
                                if(this.tileIsOccupied(i,y,boardState,team,pass)){
                                return false;
                           }
                        }
                        }else if(px<x){
                            for(let i=x-1;i>px;i--){
                                if(this.tileIsOccupied(i,y,boardState, team,pass)){
                                    return false
                           }
                        }}
                       }else if(x===px){
                            if(py>y){
                            for(let i=py-1;i>y;i--){
                                if(this.tileIsOccupied(x,i,boardState, team,pass)){
                                return false;
                           }
                        }
                            }else if(py<y){
                            for(let i=y-1;i>py;i--){
                                if(this.tileIsOccupied(x,i,boardState, team,pass)){
                                    return false
                           }
                        }}
                       }
                    
                      return true
                    }
                    }
                
        }else if(type==='queen'){

            if(x===px || y===py || (Math.abs(px-x) === Math.abs(py-y))){
                if(!this.tileIsOccupied(x,y,boardState, team,pass) || this.tileIsOccupiedbyOpponent(x,y,boardState,team)){
                    if(y===py){
                        if(px>x){
                         for(let i=px-1;i>x;i--){
                             if(this.tileIsOccupied(i,y,boardState, team,pass)){
                             return false;
                        }
                     }
                     }else if(px<x){
                         for(let i=x-1;i>px;i--){
                             if(this.tileIsOccupied(i,y,boardState, team,pass)){
                                 return false
                        }
                     }}
                    }else if(x===px){
                         if(py>y){
                         for(let i=py-1;i>y;i--){
                             if(this.tileIsOccupied(x,i,boardState, team,pass)){
                             return false;
                        }
                     }
                         }else if(py<y){
                         for(let i=y-1;i>py;i--){
                             if(this.tileIsOccupied(x,i,boardState, team,pass)){
                                 return false
                        }
                     }}
                    }else if(x>px && y>py){
                        let j = y;
                        for(let i=x-1;i>px;i--){
                            j--;
                            if(this.tileIsOccupied(i,j,boardState, team,pass)){
                            return false;
                       }
                    }
                    }else if(x>px && y<py){
                        let j = y;
                        for(let i=x-1;i>px;i--){
                            j++;
                            if(this.tileIsOccupied(i,j,boardState, team,pass)){
                            return false;
                       }
                    }
                    }else if(x<px && y>py){
                        let j = x;
                        for(let i=y-1;i>py;i--){
                            j++;
                            if(this.tileIsOccupied(j,i,boardState, team,pass)){
                            return false;
                       }
                    }
                    }else if(x<px && y<py){
                        let j = x;
                        for(let i=y+1;i<py;i++){
                            j++;
                            if(this.tileIsOccupied(j,i,boardState, team,pass)){
                            return false;
                       }
                    }
                    }
                    return true
                  }
                
            }

        }else if(type==='king'){
            if(Math.abs(px-x)<=1 && Math.abs(py-y) <=1){
                return true
            }
        }

        return false
    }

    isValidForKing(px, py, x, y, team, boardState, turn, gameState){
        if(turn){
            if(team==='opponent'){
                return false
            }
        }else if(!turn){
            if(team==='our'){
                return false
            }
        }

        let opponentColor;
        if(turn){
            opponentColor = 'Black'
        }else{
            opponentColor = 'White'
        }

        if(px===x && py===y){
            return false
        }

        let kingAvailable=[]
        for(let x=0;x<=7;x++){
            for(let y=0;y<=7;y++){
                if(Math.abs(px-x)<=1 && Math.abs(py-y) <=1 
                && (!this.tileIsOccupied(x,y,boardState, team)
                ||this.tileIsOccupiedbyOpponent(x,y,boardState,team))){
                    kingAvailable.push({
                        x: x,
                        y: y
                    })
                }
            }
        }

        let arr =[];
        boardState.forEach(p=>{
            if(p.team !== team){  
                for(let x=0;x<=7;x++){
                    for(let y=0;y<=7;y++){
                            if(this.isValidMove(p.x,p.y,x,y,p.type,'opponent',boardState,turn,true)){
                                arr.push({
                                    x: x,
                                    y: y
                                })
                            }     
                        }
                    }
            }  
        })

        //****GAMESTATE CHECK */
        // let kingPosition ={
        //     x:px,
        //     y:py
        // }
        // arr.forEach(p=>{
        //     if(p.x===kingPosition.x && p.y===kingPosition.y){
        //         gameState.check = true;
        //     }
        // })

        // *** GAMESTATE WINS AND PAT *//
             kingAvailable = kingAvailable.filter(ar => !arr.find(rm => (rm.x === ar.x && ar.y === rm.y) ))
        // if(kingAvailable.length===0){
        //     if(gameState.check){
        //         console.log(`${opponentColor} wins!!!!!`)
        //     }
        // }




            let available = kingAvailable.find(elem => elem.x === x && elem.y === y);
            
                // boardState.forEach(p=>{
                //     if(p.team !== team){
                //     for(let x=0;x<=7;x++){
                //         for(let y=0;y<=7;y++){
                //             if(this.isValidMove(p.x,p.y,x,y,p.type,p.team,boardState,turn,true)){
                //                 arr.push({
                //                     x: x,
                //                     y: y
                //                 })
                //             }     
                //          }
                //         }
                //     }
                // })
            

            if(available){
                return true
            }
            return false
    }
}