import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [positions, setPositions] = useState([])
  const [deletedPositions, setDeletedPositions] = useState([])

  useEffect(()=>{
    console.log(deletedPositions)
  },[deletedPositions])

  const onClickMain=(e)=>{
    if(e.target === e.currentTarget){
      setPositions(prevState => [...prevState, {x: e.clientX, y: e.clientY}])
      setDeletedPositions([])
    }
  }

  const onClickUndo=()=>{
    if(positions.length>0){
      const newPositions = positions;
      const deletedPosition = newPositions.pop();
      setPositions(newPositions)
      setDeletedPositions(prevState=>[...prevState, deletedPosition])
    }else{
      alert("Não existem items para serem desfeitos")
    }
  }

  const onClickRedo=()=>{
    if(deletedPositions.length>0){
      const newDeletedPositions = deletedPositions;
      const reinstatedPosition = newDeletedPositions.pop();
      setDeletedPositions(newDeletedPositions)
      setPositions(prevState=>[...prevState, reinstatedPosition])
    }else{
      alert("Não existem items para serem refeitos")
    }
  }

  return (
      <div className='main' onClick={onClickMain}>
        <button onClick={onClickUndo}>undo</button>
        <button onClick={onClickRedo}>redo</button>
        {positions && positions.map((item, index) => {
          return (
            <div 
              key={index} 
              className='item' 
              style={{
                position:'absolute',
                top:`${item.y}px`, 
                left:`${item.x}px`, 
                width:'1em', 
                height:'1em', 
                borderRadius:'50%', 
                backgroundColor:'black'
              }}/>)
        })}

      </div>
  )
}

export default App
