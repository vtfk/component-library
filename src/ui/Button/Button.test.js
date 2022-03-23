import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { Button, IconButton } from '.'

describe('Button', () => {
  test('loads and displays button text', async () => {
    render(<Button>Knappeteksten er her</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Knappeteksten er her')
  })

  test('defaults to primary button', async () => {
    render(<Button>Primærknapp</Button>)
    expect(screen.getByRole('button')).toHaveClass('button-primary')
  })

  test('defaults to medium button', async () => {
    render(<Button>Mediumknapp</Button>)
    expect(screen.getByRole('button')).toHaveClass('button-medium')
  })

  test('assigning specific type changes button type class', async () => {
    render(<Button type='secondary'>Primærknapp</Button>)
    const btn = screen.getByRole('button')

    expect(btn).toHaveClass('button-secondary')
    expect(btn).not.toHaveClass('button-primary')
  })

  test('assigning specific size changes button size class', async () => {
    render(<Button size='large'>Primærknapp</Button>)
    const btn = screen.getByRole('button')

    expect(btn).toHaveClass('button-large')
    expect(btn).not.toHaveClass('button-medium')
  })

  test('assigning class works and doesn\'t override button classes', async () => {
    render(<Button className='testclass'>Primærknapp</Button>)
    const btn = screen.getByRole('button')

    expect(btn).toHaveClass('button')
    expect(btn).toHaveClass('button-primary')
    expect(btn).toHaveClass('button-medium')
    expect(btn).toHaveClass('testclass')
  })

  test('one click on the button should trigger onClick once', async () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>Klikknapp</Button>)
    const btn = screen.getByRole('button')

    fireEvent.click(btn)
    expect(onClick).toBeCalledTimes(1)
  })

  test('click on a disabled button shouldn\'t trigger onClick', async () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick} disabled>Disablaknapp</Button>)
    const btn = screen.getByRole('button')

    fireEvent.click(btn)
    expect(onClick).toBeCalledTimes(0)
  })

  test('click on a button with a spinner shouldn\'t trigger onClick', async () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick} spinner>Spinningknapp</Button>)
    const btn = screen.getByRole('button')

    fireEvent.click(btn)
    expect(onClick).toBeCalledTimes(0)
  })
})

describe('IconButton', () => {
  test('loads and displays icon button text', async () => {
    render(<IconButton icon='add'>Knappeteksten er her</IconButton>)
    expect(screen.getByRole('button')).toHaveTextContent('Knappeteksten er her')
  })

  test('assigning class works and doesn\'t override default classes', async () => {
    render(<IconButton icon='add' bordered className='testclass'>Bordered</IconButton>)
    const btn = screen.getByRole('button')

    expect(btn).toHaveClass('icon-button')
    expect(btn).toHaveClass('icon-button-transparent-bordered')
    expect(btn).toHaveClass('testclass')
  })

  test('verify that correct icon is added', async () => {
    render(<IconButton icon='close'>Close icon</IconButton>)
    const svg = document.getElementsByTagName('svg')[0]
    expect(svg).toHaveAttribute('data-jest-svg-name', 'icon-close')
  })

  test('one click on the button should trigger onClick once', async () => {
    const onClick = jest.fn()
    render(<IconButton icon='add' onClick={onClick}>Klikkikonknapp</IconButton>)
    const btn = screen.getByRole('button')

    fireEvent.click(btn)
    expect(onClick).toBeCalledTimes(1)
  })

  test('click on a disabled button shouldn\'t trigger onClick', async () => {
    const onClick = jest.fn()
    render(<IconButton icon='add' onClick={onClick} disabled>Disablaikonknapp</IconButton>)
    const btn = screen.getByRole('button')

    fireEvent.click(btn)
    expect(onClick).toBeCalledTimes(0)
  })

  test('click on a button with a spinner shouldn\'t trigger onClick', async () => {
    const onClick = jest.fn()
    render(<IconButton icon='add' onClick={onClick} spinner>Spinningikonknapp</IconButton>)
    const btn = screen.getByRole('button')

    fireEvent.click(btn)
    expect(onClick).toBeCalledTimes(0)
  })
})
