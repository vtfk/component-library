import React, { useEffect, useMemo, useRef, useState } from "react"
import "./styles.scss"

export function Draggable ({children, width, height}) {
  const [isDragging, setIsDragging] = useState(false);
  const [coordinates, setCoordinates] = useState(undefined);

  const parsedStyle = useMemo(() => {
    return {
      width,
      height
    }
  }, [width, height])

  useEffect(() => {
    function handleMouseMove(e) {
      if(!isDragging) return;
      console.log('Moving', e)

      console.log(`Client - ${e.clientX}:${e.clientY}`)
      console.log(`Layer - ${e.layerX}:${e.layerY}`)
      console.log(`Offset - ${e.offsetX}:${e.offsetY}`)
      console.log(`Page - ${e.pageX}:${e.pageY}`)
      console.log(`Screen - ${e.screenX}:${e.screenY}`)

    }

    addEventListener('mousemove', handleMouseMove)

    return () => {
      removeEventListener('mousemove', handleMouseMove)
    }
  })

  function handleDragStart(e) {
    console.log('Drag started', e)
    setIsDragging(true);
  }

  function handleDragEnd(e) {
    console.log('Drag stopped')
    setIsDragging(false)
  }

  return (
    <div className="draggable" onMouseDown={handleDragStart} style={parsedStyle} onMouseUp={handleDragEnd}>
      {children && children}
    </div>
  )
}