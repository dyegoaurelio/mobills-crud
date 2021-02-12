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

export const DashboardContent = styled.div` 
grid-area: 2 / 2 / 3 / 3;
display: grid;
grid-template-rows: 1fr 2fr ;
width: 100%;
`

// eslint-disable-next-line react/react-in-jsx-scope
export const CardArea = styled.div` 
display: grid;
grid-template: auto 1fr / 1fr ;

h1, h2 {
    margin: 2vh 0 0 5%;
    padding:0;
    grid-area: 1 / 1 / 2 / 2;
}

body{
    grid-area: 2 / 1 / 3 / 2 ;
    display: flex;
    align-items: center;
    justify-content: center;

    .MuiCard-root{
        height: 50%;
        width: 25%;
        padding: 15px;
        margin: 20px;
    }
}
`
