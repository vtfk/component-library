/* eslint react/prop-types: 0 */
import React, { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Select, SelectMultiple } from '.'

const items = [
  { value: '1', label: 'Item 1' },
  { value: '2', label: 'Item 2' },
  { value: '3', label: 'Item 3' }
]

const SelectComponent = ({ error, onChange }) => {
  const [selected, setSelected] = useState(null)

  return (
    <Select
      items={items}
      placeholder='Placeholder'
      label='Label'
      selectedItem={selected}
      error={error}
      onChange={item => {
        setSelected(item)
        if (typeof onChange === 'function') onChange(item)
      }}
    />
  )
}

const SelectMultipleComponent = ({ error, onChange }) => {
  const [selected, setSelected] = useState([])

  const handleMultiChange = (item) => {
    const newArray = [...selected]
    const removeIndex = newArray.map(function (item) { return item.value }).indexOf(item.value)

    if (removeIndex === -1) newArray.push(item)
    else newArray.splice(removeIndex, 1)

    setSelected(newArray)
    if (typeof onChange === 'function') onChange(newArray)
  }

  return (
    <SelectMultiple
      items={items}
      placeholder='Placeholder'
      label='Label'
      selectedItem={selected}
      error={error}
      onChange={item => handleMultiChange(item)}
    />
  )
}

describe('Select', () => {
  test('loads and displays select placeholder', () => {
    render(<SelectComponent />)
    expect(screen.getByRole('button')).toHaveTextContent('Placeholder')
  })

  test('opening adds correct class', () => {
    render(<SelectComponent />)
    expect(screen.getByTestId('container')).toHaveClass('is-closed')

    userEvent.click(screen.getByRole('button')) // open select
    expect(screen.getByTestId('container')).toHaveClass('is-open')

    userEvent.click(screen.getByRole('button')) // close select
    expect(screen.getByTestId('container')).toHaveClass('is-closed')
  })

  test('selection adds correct class', async () => {
    render(<SelectComponent />)
    expect(screen.getByTestId('container')).toHaveClass('not-selected')

    userEvent.click(screen.getAllByRole('radio')[0]) // select first item
    expect(screen.getByTestId('container')).toHaveClass('has-selected')
  })

  test('selection returns correct item', async () => {
    const mockChange = jest.fn()
    render(<SelectComponent onChange={mockChange} />)
    expect(mockChange).toBeCalledTimes(0)

    // select first item
    userEvent.click(screen.getAllByRole('radio')[0])
    expect(mockChange).toBeCalledTimes(2) // onClick triggers onChange
    expect(mockChange.mock.calls[1][0]).toBe(items[0])

    // select second item
    userEvent.click(screen.getAllByRole('radio')[1])
    expect(mockChange).toBeCalledTimes(4)
    expect(mockChange.mock.calls[3][0]).toBe(items[1])
  })

  test('error message renders', () => {
    render(<SelectComponent error='feil' />)
    expect(screen.getByText(/feil/)).toBeInTheDocument()
  })
})

describe('SelectMultiple', () => {
  test('loads and displays select placeholder', () => {
    render(<SelectMultipleComponent />)
    expect(screen.getByRole('button')).toHaveTextContent('Placeholder')
  })

  test('opening adds correct class', () => {
    render(<SelectMultipleComponent />)
    expect(screen.getByTestId('container')).toHaveClass('is-closed')

    userEvent.click(screen.getByRole('button')) // open select
    expect(screen.getByTestId('container')).toHaveClass('is-open')

    userEvent.click(screen.getByRole('button')) // close select
    expect(screen.getByTestId('container')).toHaveClass('is-closed')
  })

  test('selection adds correct class', async () => {
    render(<SelectMultipleComponent />)
    expect(screen.getByTestId('container')).toHaveClass('not-selected')

    userEvent.click(screen.getAllByRole('option')[1]) // select first item
    expect(screen.getByTestId('container')).toHaveClass('has-selected')
  })

  test('selection returns correct items', async () => {
    const mockChange = jest.fn()
    render(<SelectMultipleComponent onChange={mockChange} />)
    expect(mockChange).toBeCalledTimes(0)

    // select first item
    userEvent.click(screen.getAllByRole('option')[1])
    expect(mockChange).toBeCalledTimes(1)
    expect(mockChange.mock.calls[0][0]).toStrictEqual([items[0]])

    // select second item
    userEvent.click(screen.getAllByRole('option')[3])
    expect(mockChange).toBeCalledTimes(2)
    expect(mockChange.mock.calls[1][0]).toStrictEqual([items[0], items[1]])

    // unselect first item
    userEvent.click(screen.getAllByRole('option')[1])
    expect(mockChange).toBeCalledTimes(3)
    expect(mockChange.mock.calls[2][0]).toStrictEqual([items[1]])
  })

  test('error message renders', () => {
    render(<SelectMultipleComponent error='feil' />)
    expect(screen.getByText(/feil/)).toBeInTheDocument()
  })
})
