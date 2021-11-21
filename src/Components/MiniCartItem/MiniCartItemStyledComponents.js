import styled from "styled-components";

export const CartItemMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1em 0 1em 0;
`;

export const CartItemData = styled.div`
  width: 95%;

  
`;
export const CartItemValues = styled.div`
  width: 100%;
  display-direction: column;
`;
export const AttributeValue = styled.label`
  display: flex;
  font-family: Source Sans Pro, sans-serif;
  font-weight: 400;
  font-size: 14px;
  height: auto;
  margin: 0.25rem;
  flex-wrap: wrap;
  grid-gap: 4px;
`;
export const AttributeValue2 = styled.label`
  display: flex;
  flex-wrap: wrap;
 
  border: 1px solid grey;
  color: rgba(166, 166, 166, 1);
  background-color: rgba(0, 0, 0, 0.15);
  padding: 0.1rem 0.35rem 0.1rem 0.35rem;
`;
export const AttributeValue3 = styled.label`
  display: flex;
  flex-wrap: wrap;
  
  color: black;
  background-color: white;
  border: 1px solid black;
  padding: 0.1rem 0.35rem 0.1rem 0.35rem;
`;

export const AttributeName = styled.p`
  margin: 0.5rem;
  font-weight: 300;
  font-size: 13px;
  margin: 0.5rem 0 0.1rem 0;
`;
export const QuantityButtons = styled.button`
  height: 1.5rem;
  width: 1.5rem;
  cursor: pointer;
  background-color: white;
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
`;
export const QuantityValues = styled.label`
  font-weight: 500;
  font-size: 24px;
`;

export const QuantityCounter = styled.div`
  margin: 0 0.5rem 0 0;
  justify-content: space-between;
  
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
`;
export const PriceLabel2 = styled.label`
  padding: 0;
  margin: 0;
  width: 100%;
  font-style: normal;
  font-weight: 500;
  
  font-size: 16px;
  line-height: 160%;
  text-align: left;
`;

export const OrderAttributesSection = styled.div `
display: flex;
flex-direction: row;
`
export const OrderNamePriceAttributesContainer = styled.div `
display: flex;
flex-direction: column;
flex-wrap: wrap;
width: 55%;
`

export const MiniCartProductNameLabel = styled.p `
margin: 0;
font-weight: 300;
`

export const MiniVectorIncLabel = styled.label `
  position: absolute;
  margin: 0rem 0 0 0rem;
`
export const MiniVectorDecLabel = styled.label `
  position: absolute;
  margin: -0.15rem 0 0.1rem 0rem;
`
export const MiniCartImgContainer = styled.div `
 display: flex;
 align-items: center;
`
export const MiniCartProductImg = styled.img `
width: 105px;
display: flex;
height: fit-content;
`