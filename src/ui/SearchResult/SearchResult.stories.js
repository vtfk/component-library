import React from 'react'
import { getConfig } from '../../../scripts/storybook/storyConfig'

import { SearchResult } from '.'

export default getConfig(
  { title: 'SearchResult', component: SearchResult }
)

export function Basic () {
  return (
    <SearchResult
      emptyMessage="Ingen resultater"
      loading={false}
      loadingText={'Vennligst vent...'}
      items={
        [
          {
            title: '1',
            secondary: 'Small',
            description: 'Description',
          },
          {
            title: '2',
            secondary: 'Small',
            description: 'Description',
          },
          {
            title: '3',
            secondary: 'Small',
            description: 'Description',
          },
        ]
      }
      onClick={(item) => {
        console.log(item)
      }}
    />
  )
}

export function Loading () {
  return (
    <SearchResult
      emptyMessage="Ingen resultater"
      loading={true}
      loadingText={'Vennligst vent...'}
      items={[]}
      onClick={(item) => {
        console.log(item)
      }}
    />
  )
}

export function Empty () {
  return (
    <SearchResult
      emptyMessage="Ingen resultater"
      loading={false}
      items={[]}
      onClick={(item) => {
        console.log(item)
      }}
    />
  )
}

// export function Sizes () {
//   return (
//     <table>
//       <tbody>
//         <tr>
//           <td>small</td>
//           <td><InitialsBadge size='small' firstName='Per' lastName='Hansen' /></td>
//         </tr>
//         <tr>
//           <td>default</td>
//           <td><InitialsBadge firstName='Fred' lastName='Aker' /></td>
//         </tr>
//         <tr>
//           <td>large</td>
//           <td><InitialsBadge size='large' firstName='Nils' lastName='Pedersen' /></td>
//         </tr>
//       </tbody>
//     </table>
//   )
// }
