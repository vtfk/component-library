import React, { useEffect, useMemo, useRef, useState } from 'react'
import './styles.scss'

export function Draggable ({ children, active, width, height }) {
  const [isDragging, setIsDragging] = useState(false)
  const [coordinates, setCoordinates] = useState(undefined)
  const thisRef = useRef(undefined)

  const parsedStyle = useMemo(() => {
    let _s = { width, height };
    if(coordinates?.x && coordinates?.y) {
      _s.top = `${coordinates.y}px`
      _s.left = `${coordinates.x}px`
    }
    console.log('Style', _s);
    return _s;
  }, [width, height, coordinates])

  useEffect(() => {
    function handleMouseMove (e) {
      if(!isDragging) return;
      console.log('Moving', e)
      console.log(`Client - ${e.clientX}:${e.clientY}`)
      console.log(`Layer - ${e.layerX}:${e.layerY}`)
      console.log(`Offset - ${e.offsetX}:${e.offsetY}`)
      console.log(`Page - ${e.pageX}:${e.pageY}`)
      console.log(`Screen - ${e.screenX}:${e.screenY}`)
      console.log('Ref', thisRef?.current)


      if(thisRef?.current) {
        console.dir(thisRef.current)
        console.log(`Client - ${e.clientX}:${e.clientY}`)
        console.log(`Dialog - ${thisRef.current.offsetLeft} : ${thisRef.current.offsetTop} `)

        let deltaX = e.clientX - (thisRef.current.offsetLeft / 2);
        let deltaY = e.clientY - (thisRef.current.offsetTop / 2);

        // deltaX = Math.max(deltaX, 0);
        // deltaY = Math.min(1080, deltaY);

        setCoordinates({
          x: deltaX,
          y: deltaY
        })
      }
    }
    console.log('Registering event listerner');
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      console.log('Unregistering')
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDragging])

  useEffect(() => {
    function handleMouseUp() {
      setIsDragging(false);
    }

    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    }
  })

  useEffect(() => {
    if (thisRef) {
      setCoordinates(thisRef)
    }
    console.log(coordinates)
  }, [thisRef])

  function handleDragStart (e) {
    console.log('Drag started', e)
    setIsDragging(true)
  }

  function handleDragEnd (e) {
    console.log('Drag stopped')
    setIsDragging(false)
  }

  return (
    <div className='draggable' ref={thisRef} onMouseDown={(e) => handleDragStart(e)} style={parsedStyle} onMouseUp={(e) => handleDragEnd(e)}>
      {children && children}
    </div>
  )
}
