import React from 'react'
import './Tile.css'

export const Tile = (props) => {
    const{
    image,
    number,
    // column,
    // row,
    // horizontal
    } = props
if(number%2===0){
    // if(row === 0 && column === 0){
    //     return (
    //         <div className='tile black-tile'>
    //             <div className='top white-text'>{row+1}</div>
    //             <div className='bottom white-text'>{horizontal[column]}</div>
    //         </div>
    //     )
    // }
    // else if (row === 0){
    //     return (
    //         <div className='tile black-tile'>
    //             <div className='top'></div>
    //             <div className='bottom white-text'>{horizontal[column]}</div>
    //         </div>
    //       )
    // }else if(column === 0){
    //     return (
    //         <div className='tile black-tile'>
    //             <div className='top white-text'>{row+1}</div>
    //             <div className='bottom'></div>
    //         </div>
    //       )
    // }
    // else{
        return (
            <div className='tile black-tile'>
               { image && <div className="chess-piece" style={{"backgroundImage": `url(${image})`}}></div>}
            </div>
          )
    //}
}else{
    // if(row === 0){
    //     return (
    //         <div className='tile white-tile'>
    //             <div className='top'></div>
    //             <div className='bottom black-text'>{horizontal[column]}</div>
    //         </div>
    //       )
    // }else if(column === 0){
    //     return (
    //         <div className='tile white-tile'>
    //             <div className='top black-text'>{row+1}</div>
    //             <div className='bottom'></div>
    //         </div>
    //       )
    // }
    // else{
        return (
            <div className='tile white-tile'>
               {image && <div className="chess-piece" style={{"backgroundImage": `url(${image})`}}></div>}
            </div>
          )
    // }
   
}

  
}
