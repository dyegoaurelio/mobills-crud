import styled from 'styled-components'

export const Page = styled.div` 
display: grid;
grid-template: auto 1fr auto / auto 1fr auto;
height: 100vh;
`

export const Content = styled.div` 
grid-column: 2 / 3;
grid-row: 2 / 3;
`
