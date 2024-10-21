"use client"

import { useState } from "react"


export default function homepage(){

  // GAME PANEL CONTROLS

 const [player1,setPlayer1]=useState('Player1')
 const [player2,setPlayer2]=useState('Player2')
 const [gamePanelOpen,setgamePanelOpen]=useState(true)
    function getInput(){
        event.preventDefault()
        setPlayer1(event.target[0].value)
        setPlayer2(event.target[1].value)
        setgamePanelOpen(false)
      
      
    
    }

    // GAME BOARD CONTROLS
    const [gameMove,setGameMove]=useState(0)
    const [currentSymbol,setCurrentSymbol] =useState('X')
    const [winner,setWinner]=useState('')
    const [tie,setTie]=useState('')
    const  [gameSymbols,setGameSymbols]= useState(
        [
          [' ',' ',' '],
          [' ',' ',' '],
          [' ',' ',' ']
        ]
      )
      function checkWinner(gameSymbols){
        const winnerCheckList=
        {firstRow:gameSymbols[0][0]!==' '&&gameSymbols[0][0]===gameSymbols[1][0]&&gameSymbols[1][0]===gameSymbols[2][0],
          centerRow:gameSymbols[0][1]!==' '&&gameSymbols[0][1]===gameSymbols[1][1]&&gameSymbols[1][1]===gameSymbols[2][1],
          lastRow:gameSymbols[0][2]!==' '&&gameSymbols[0][2]===gameSymbols[1][2]&&gameSymbols[1][2]===gameSymbols[2][2],
          firstColumn:gameSymbols[0][0]!==' '&&gameSymbols[0][0]===gameSymbols[0][1]&&gameSymbols[0][1]===gameSymbols[0][2],
          centerColumn:gameSymbols[1][0]!==' '&&gameSymbols[1][0]===gameSymbols[1][1]&&gameSymbols[1][1]===gameSymbols[1][2],
          lastColumn:gameSymbols[2][0]!==' '&&gameSymbols[2][0]===gameSymbols[2][1]&&gameSymbols[2][1]===gameSymbols[2][2],
          rightCross:gameSymbols[0][2]!==' '&&gameSymbols[0][2]===gameSymbols[1][1]&&gameSymbols[1][1]===gameSymbols[2][0],
          leftCross:gameSymbols[2][2]!==' '&&gameSymbols[2][2]===gameSymbols[1][1]&&gameSymbols[1][1]===gameSymbols[0][0],
        }
       if(Object.values(winnerCheckList).indexOf(true)!==-1){ return Object.values(winnerCheckList).indexOf(true)}
        // return Object.values(winnerCheckList).indexOf(true)!==-1
      }


      function gameControls(index,innerindex){
        if(gameSymbols[index][innerindex]===' ') {currentSymbol==='X'?setCurrentSymbol('O'):setCurrentSymbol('X')
           setGameMove((state)=>state+1)
            setGameSymbols((state) => {
           const newGameSymbols = [...state]
                 newGameSymbols[index] = [...newGameSymbols[index]]
                 newGameSymbols[index][innerindex] = currentSymbol
                 var winnerIndex = checkWinner(newGameSymbols)
                 if(winnerIndex==0||winnerIndex){ setTimeout(() => {
                    setWinner(currentSymbol)
                 }, 10); }
               
                 return newGameSymbols
                 
           })
           if(gameMove==8){setTie(true)}
           console.log(gameMove,tie);
           console.log(winner)
           
     }
   
     
 }
 
function resumePlay(){
    setWinner('')
    setTie('')
    setGameMove(0)
    setGameSymbols([
        [' ',' ',' '],
        [' ',' ',' '],
        [' ',' ',' ']
      ])
}
 
function newGame(){
    resumePlay()
    setgamePanelOpen('true')
}

    return(
        <div>
           <div id="screen">

            {/* GAME PANNEL OPEN CLOSE*/}
          
            <div id="gamePanel" className={`${gamePanelOpen ? "block" : "hidden"} flex justify-center h-screen items-center`}
>
                <div id="inputs " className="w-1/4 text-center bg-teal-600 py-4 rounded">
                    <form onSubmit={()=>{getInput(this)}} method="POST">
                        <div className=" py-4"><input type="text" required className="w-9/12 outline-none p-2 rounded text-rose-700" name="player1" placeholder="Player 1"/></div>
                        <div className="py-4"><input type="text" required  className="w-9/12 outline-none p-2 rounded text-blue-700" name="player2" placeholder="Player 2"/></div>
                        <div className="py-4"><input type="submit" value="Start Game" className="rounded bg-teal-900 p-2 cursor-pointer  "/></div>
                    </form>
                </div>
            </div>
            
                
                {/* GAME BORD  */}
            <div id='gameBoard' className={`${!gamePanelOpen?"block":'hidden'} relative`}>
                <div id="Header " className="p-2 bg-teal-900">
                    <div className="flex justify-evenly items-center">
                        <div><h3>XO GAME</h3></div>
                        <div>
                        <h3 className="text-red-500" >{player1}-X</h3>
                        <h3 className="text-blue-500" >{player2}-O</h3>
                        </div>
                    </div>
                </div>


                <div className="  h-screen flex  justify-center items-center ">
                    <div className="width-1/2 height-1/2  ">
                    {(!winner&&!tie)?gameSymbols.map((data,index)=>{
                             
                    return  <div  key={index} className="flex relative  justify-center  items-center width-1/2 height-1/2">
                                { data.map( (value,innerindex)=>{ return   <div className={` ${innerindex==2?'border-r-0 ':'border-r-2'}   ${index==2?'border-b-0':'border-b-2'} ${value=='X'?'text-red-500':'text-blue-500'} flex text-5xl justify-center items-center h-32 w-32`} key={innerindex} onClick={()=>{gameControls(index,innerindex)}} >{value} </div>}) }
                            </div> 

                        }):
                            <div className="bg-teal-700 py-10 px-4 rounded transition-2s">
                            
                            { winner? 
                                    <h4 className="text-3xl">
                                     <span  className={`${winner== 'X'?'text-red-500':'text-blue-500'} `}>{winner== 'X'?player1:player2}</span>  is the Winner 🎉 
                                    </h4> :
                                     <h4 className="text-3xl">Match Tie !</h4>
                                   
                             }
                                     
            
                                <div className="py-6 flex justify-evenly">
                                    <button className="rounded bg-teal-900 p-2" onClick={newGame}>New Game</button> 
                                    <button className="rounded  text-black-800 p-2" onClick={resumePlay}>Resume</button>
                                </div>
                            </div>
                        }
                        
                    </div>
                   {/* STRIKE LINE */}
                                {/* { innerindex==2 ?<div className=" absolute w-full h-full  flex justify-center items-center">
                                        <div className=" absolute  bg-stone-600  h-full w-1 "></div>
                                     </div>:'' } */}
                </div>
                   
                
            </div>

           

           </div>
        </div>
    )
}