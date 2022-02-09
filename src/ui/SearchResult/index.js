import React from 'react'
import PropTypes from 'prop-types'

import { Paragraph } from '../Typography'

import './styles.scss'

export function SearchResult ({
  items = [],
  loading = false,
  loadingText = 'Laster...',
  emptyMessage,
  onClick,
  ...props
}) {
  return (
    <div className='search-result'>
      <div className='search-results-inner'>
        {
          !loading &&
          items.length > 0 &&
          items.map((item, index) => {
            return (
              <div onMouseDown={() => { onClick(item) }} key={index} className='search-results-item'>
                <Paragraph className='search-results-item-title'>{item.title}</Paragraph>
                {
                  item.secondary &&
                    <Paragraph className='search-results-item-secondary' size='small'>{item.secondary}</Paragraph>
                }
                {
                  item.description &&
                    <Paragraph className='search-results-item-description' size='small'>{item.description}</Paragraph>
                }
              </div>
            )
          })
        }

        {
          !loading &&
          items.length === 0 &&
            <div className='search-results-item-message search-alternatives'>
              <Paragraph>
                {emptyMessage}
              </Paragraph>
            </div>
        }

        {
          loading &&
            <div className='search-results-item-message search-alternatives'>
              <Paragraph>
                {loadingText}
              </Paragraph>
            </div>
        }
      </div>
    </div>
  )
}

SearchResult.propTypes = {
  emptyMessage: PropTypes.any,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  onClick: PropTypes.func.isRequired
}
