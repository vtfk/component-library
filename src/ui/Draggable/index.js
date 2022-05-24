import React, { useEffect, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

export function Draggable ({ children, active, contained, width, height }) {
  const [isDragging, setIsDragging] = useState(false)
  const [coordinates, setCoordinates] = useState(undefined)
  const [mouseSelfDelta, setMouseSelfDelta] = useState(undefined)
  const thisRef = useRef(undefined)

  const parsedStyle = useMemo(() => {
    const _s = { width, height }
    if (coordinates?.x && coordinates?.y) {
      _s.top = `${coordinates.y}px`
      _s.left = `${coordinates.x}px`
    }
    return _s
  }, [width, height, coordinates])

  useEffect(() => {
    /**
     *
     * @param {MouseEvent} e
     * @returns
     */
    function handleMouseMove (e) {
      if (!active || !isDragging) return

      if (thisRef?.current) {
        let x = e.clientX - mouseSelfDelta.x
        let y = e.clientY - mouseSelfDelta.y

        const width = thisRef.current.clientWidth
        const height = thisRef.current.clientHeight
        const bboxRight = x + thisRef.current.clientWidth
        const bboxBottom = y + height
        const parentWidth = thisRef.current.parentNode.clientWidth
        const parentHeight = thisRef.current.parentNode.clientHeight

        if (contained) {
          if (x <= 1) x = 1
          else if (bboxRight >= parentWidth) x = parentWidth - width
          if (y <= 1) y = 1
          else if (bboxBottom >= parentHeight) y = parentHeight - height
        } else {
          if (x === 0) x = -1
          if (y === 0) y = -1
        }

        setCoordinates({
          x,
          y
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [active, isDragging])

  useEffect(() => {
    function handleMouseUp () {
      setIsDragging(false)
    }

    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  })

  function handleDragStart (e) {
    if (thisRef) {
      setIsDragging(true)
      setMouseSelfDelta({
        x: e.clientX - thisRef.current.offsetLeft,
        y: e.clientY - thisRef.current.offsetTop
      })
      setCoordinates({
        x: thisRef.current.offsetLeft,
        y: thisRef.current.offsetTop
      })
    }
  }

  function handleDragEnd (e) {
    setIsDragging(false)
  }

  return (
    <div className='draggable' ref={thisRef} onMouseDown={(e) => handleDragStart(e)} style={parsedStyle} onMouseUp={(e) => handleDragEnd(e)}>
      {children && children}
    </div>
  )
}

Draggable.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  contained: PropTypes.bool,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}
