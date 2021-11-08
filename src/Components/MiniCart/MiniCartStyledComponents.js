import styled from "styled-components";

export const MiniCartMain = styled.div`
  padding: 1em 0 1em 3%;
  align-content: center;
  
  position: relative;
  z-index: 995;
  height: calc(40% + 15rem);
  
  flex-wrap: wrap;
  grid-gap: 1em;
  flex-direction: column;
  overflow-y: auto;
`;

export const MyBagLengthCounter = styled.div `
  display: flex;
  flex-direction: row;
` 

export const MyBagText = styled.p `
  margin: 0;
  font-weight: 700;
`

export const NoOfItemsText = styled.p `
  margin: 0;
  width: 80%;
  font-weight: 500; 
`

export const NoProductsMiniCartDiv = styled.div `
  display: flex;
  height: 100%;
  align-items: center;
`

export const NoProductsMiniCartText = styled.p `
  margin: 0;
`