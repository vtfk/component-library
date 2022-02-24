import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SearchField } from '.'

const items = [
  {
    itemTitle: 'One',
    itemSecondary: 'Hey there',
    itemDescription: 'Desc'
  },
  {
    itemTitle: 'Two',
    itemSecondary: 'Hey there',
    itemDescription: 'Desc'
  },
  {
    itemTitle: 'Three',
    itemSecondary: 'Hey there',
    itemDescription: 'Desc'
  }
]

const basicSetup = (props = {}) => {
  const utils = render(
    <SearchField
      placeholder='Dette er placeholderen for Basic'
      rounded
      {...props}
    />)
  const textbox = utils.getByRole('textbox')

  return {
    textbox,
    ...utils
  }
}

const itemsSetup = (props = {}) => {
  const loadingText = 'Loading...'
  const emptyText = 'Empty...'
  const utils = render(
    <SearchField
      placeholder='Dette er placeholderen for Items'
      debounceMs={0}
      loadingText={loadingText}
      emptyText={emptyText}
      rounded
      items={items}
      {...props}
    />)
  const textbox = utils.getByRole('textbox')

  return {
    textbox,
    loadingText,
    emptyText,
    ...utils
  }
}

const childrenSetup = (props = {}) => {
  const loadingText = 'Loading...'
  const emptyText = 'Empty...'
  const childText = 'Child'
  const utils = render(
    <SearchField
      placeholder='Dette er placeholderen for Children'
      debounceMs={0}
      loadingText={loadingText}
      emptyText={emptyText}
      rounded
      {...props}
    >
      <table>
        <tbody>
          <tr>
            <td>{childText}</td>
          </tr>
        </tbody>
      </table>
    </SearchField>)
  const textbox = utils.getByRole('textbox')

  return {
    textbox,
    loadingText,
    emptyText,
    childText,
    ...utils
  }
}

describe('Basic SearchField', () => {
  test('is loaded and displayed', () => {
    const { textbox } = basicSetup()
    expect(textbox).toBeInTheDocument()
  })

  test('doesn\'t have search results container after load', () => {
    const { container } = basicSetup()
    expect(container.getElementsByClassName('search-result').length).toBe(0)
  })

  test('doesn\'t have search results container after input changed', () => {
    const { textbox, container } = basicSetup()

    const event = { target: { value: 'Hey Basic there' } }
    fireEvent.change(textbox, event)

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(0)
  })

  test('to have onChange called after input changed', () => {
    const onChange = jest.fn()
    const { textbox, container } = basicSetup({ onChange })

    const event = { target: { value: 'Hey Basic there' } }
    fireEvent.change(textbox, event)

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(0)
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('doesn\'t have onSearch called after input changed', () => {
    const onSearch = jest.fn()
    const { textbox, container } = basicSetup({ onSearch })

    const event = { target: { value: 'Hey Basic there' } }
    fireEvent.change(textbox, event)

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(0)
    expect(onSearch).toHaveBeenCalledTimes(0)
  })

  test('to have onSearch called after Enter is pressed', () => {
    const onSearch = jest.fn()
    const { textbox, container } = basicSetup({ onSearch })

    const event = { target: { value: 'Hey Basic there' } }
    fireEvent.change(textbox, event)

    userEvent.type(textbox, '{enter}')

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(0)
    expect(onSearch).toHaveBeenCalledTimes(1)
  })

  test('to have onSearch called after search icon is clicked', () => {
    const onSearch = jest.fn()
    const { textbox, container } = basicSetup({ onSearch })
    const searchIcon = container.getElementsByClassName('icon')[0]

    const event = { target: { value: 'Hey Basic there' } }
    fireEvent.change(textbox, event)

    userEvent.click(searchIcon)

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(0)
    expect(onSearch).toHaveBeenCalledTimes(1)
  })

  test('doesn\'t have search results container after ArrowDown is pressed', () => {
    const { textbox, container } = basicSetup()

    const event = { target: { value: 'Hey Basic there' } }
    fireEvent.change(textbox, event)

    userEvent.type(textbox, '{arrowdown}')

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(0)
  })

  test('doesn\'t have search results container after ArrowUp is pressed', () => {
    const { textbox, container } = basicSetup()

    const event = { target: { value: 'Hey Basic there' } }
    fireEvent.change(textbox, event)

    userEvent.type(textbox, '{arrowup}')

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(0)
  })

  test('does nothing after Escape is pressed', () => {
    const { textbox, container } = basicSetup()

    const event = { target: { value: 'Hey Basic there' } }
    fireEvent.change(textbox, event)

    userEvent.type(textbox, '{esc}')

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(0)
  })
})

describe('Items SearchField', () => {
  test('is loaded and displayed', () => {
    const { textbox } = itemsSetup()
    expect(textbox).toBeInTheDocument()
  })

  test('doesn\'t have search results container after load', () => {
    const { container } = itemsSetup()
    expect(container.getElementsByClassName('search-result').length).toBe(0)
  })

  test('should have search results container after input changed', () => {
    const { textbox, container } = itemsSetup()

    const event = { target: { value: 'Hey there' } }
    fireEvent.change(textbox, event)

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(1)
  })

  test('to have onChange called after input changed', () => {
    const onChange = jest.fn()
    const { textbox, container } = itemsSetup({ onChange })

    const event = { target: { value: 'Hey there' } }
    fireEvent.change(textbox, event)

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(1)
    expect(onChange).toHaveBeenCalledTimes(1)
  })

  test('to have onSearch called after input changed', async () => {
    const onSearch = jest.fn()
    const onChange = jest.fn()
    const { textbox, container } = itemsSetup({ onChange, onSearch })

    const event = { target: { value: 'Hey there' } }
    fireEvent.change(textbox, event)

    expect(textbox).toHaveValue(event.target.value)
    expect(await screen.findByRole('table')).toBeInTheDocument()
    expect(container.getElementsByClassName('search-result').length).toBe(1)
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledTimes(1)
  })

  test('to have onSearch called after search icon is clicked', () => {
    const onSearch = jest.fn()
    const { container } = itemsSetup({ onSearch, value: 'Hey there' })
    const searchIcon = container.getElementsByClassName('icon')[0]

    userEvent.click(searchIcon)

    expect(container.getElementsByClassName('search-result').length).toBe(1)
    expect(onSearch).toHaveBeenCalledTimes(1)
  })

  test('to have onSelected called after Enter is pressed - and search results container to be closed', () => {
    const onSelected = jest.fn()
    const { textbox, container } = itemsSetup({ onSelected })

    const event = { target: { value: 'Hey there' } }
    fireEvent.change(textbox, event)

    userEvent.type(textbox, '{enter}')

    expect(textbox).toHaveValue(items[0].itemTitle) // the component sets "itemTitle" as value when selected
    expect(container.getElementsByClassName('search-result').length).toBe(0)
    expect(onSelected).toHaveBeenCalledTimes(1)
  })

  test('should have search results container after ArrowDown is pressed', () => {
    const { textbox, container } = itemsSetup()

    const event = { target: { value: 'Hey there' } }
    fireEvent.change(textbox, event)

    userEvent.type(textbox, '{arrowdown}')

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(1)
  })

  test('should have search results container after ArrowUp is pressed', () => {
    const { textbox, container } = itemsSetup()

    const event = { target: { value: 'Hey there' } }
    fireEvent.change(textbox, event)

    userEvent.type(textbox, '{arrowup}')

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(1)
  })

  test('should close search results container after Escape is pressed', () => {
    const { textbox, container } = itemsSetup()

    const event = { target: { value: 'Hey there' } }
    fireEvent.change(textbox, event)

    userEvent.type(textbox, '{esc}')

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(0)
  })

  test('search results container should have three elements after input changed', () => {
    const { textbox, container } = itemsSetup()

    const event = { target: { value: 'Hey there' } }
    fireEvent.change(textbox, event)

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(1)
    expect(screen.getAllByRole('row').length).toBe(3)
  })

  test('item 2 should be selected when ArrowDown is clicked followed by Enter', () => {
    const { textbox, container } = itemsSetup()

    const event = { target: { value: 'Hey there' } }
    fireEvent.change(textbox, event)

    userEvent.type(textbox, '{arrowdown}{enter}')

    expect(textbox).toHaveValue(items[1].itemTitle) // the component sets "itemTitle" as value when selected
    expect(container.getElementsByClassName('search-result').length).toBe(0)
  })

  test('shouldn\'t have search results container after ArrowDown is pressed when there\'s no input', () => {
    const { textbox, container } = itemsSetup()

    userEvent.type(textbox, '{arrowdown}')

    expect(textbox).toHaveValue('')
    expect(container.getElementsByClassName('search-result').length).toBe(0)
  })

  test('shouldn\'t have search results container after ArrowUp is pressed when there\'s no input', () => {
    const { textbox, container } = itemsSetup()

    userEvent.type(textbox, '{arrowup}')

    expect(textbox).toHaveValue('')
    expect(container.getElementsByClassName('search-result').length).toBe(0)
  })

  test('item 3 should be selected when ArrowDown is clicked followed by Enter followed by a new search and two ArrawDown\'s and Enter', () => {
    const { textbox, container } = itemsSetup()

    const event = { target: { value: 'Hey there' } }
    fireEvent.change(textbox, event)

    userEvent.type(textbox, '{arrowdown}{arrowdown}{enter}')

    expect(textbox).toHaveValue(items[2].itemTitle)
    expect(container.getElementsByClassName('search-result').length).toBe(0)

    event.target.value = 'Hey'
    fireEvent.change(textbox, event)

    userEvent.type(textbox, '{enter}')

    expect(textbox).toHaveValue(items[0].itemTitle)
    expect(container.getElementsByClassName('search-result').length).toBe(0)
  })

  test('shows loadingText when debounceMs > 0 is set', () => {
    const { textbox, loadingText, container } = itemsSetup({ debounceMs: 1000, loading: true })

    const event = { target: { value: 'Hey there' } }
    fireEvent.change(textbox, event)

    expect(container.getElementsByClassName('search-result').length).toBe(1)
    expect(screen.getByText(loadingText)).toBeInTheDocument()
  })

  test('shows emptyText when no matches found', () => {
    const { textbox, emptyText, container } = itemsSetup({ debounceMs: 1000, items: [] })

    const event = { target: { value: 'Hey there' } }
    fireEvent.change(textbox, event)

    expect(container.getElementsByClassName('search-result').length).toBe(1)
    expect(screen.getByText(emptyText)).toBeInTheDocument()
  })
})

describe('Children SearchField', () => {
  test('is loaded and displayed', () => {
    const { textbox } = childrenSetup()
    expect(textbox).toBeInTheDocument()
  })

  test('doesn\'t have search results container after load', () => {
    const { container } = childrenSetup()
    expect(container.getElementsByClassName('search-result').length).toBe(0)
  })

  test('should have search results container with children after input changed', () => {
    const { textbox, childText, container } = childrenSetup()

    const event = { target: { value: 'Hey there' } }
    fireEvent.change(textbox, event)

    expect(textbox).toHaveValue(event.target.value)
    expect(container.getElementsByClassName('search-result').length).toBe(1)
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByRole('row').length).toBe(1)
    expect(screen.getByRole('cell')).toHaveAccessibleName(childText)
  })
})
