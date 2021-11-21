import styled from "styled-components";

export const CartItemMain = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90vw;
  border-top: 2px solid #e5e5e5;
`;


export const CartItemValues = styled.div`
  margin-top: 1rem;
  width: 100%;
  
  justify-content: space-between;
  display: flex; 
  flex-direction: row;
`;

export const ProductAttributesCartContainer = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
width: auto;
`

export const AttributeValue = styled.label`
  display: flex;
  flex-wrap: wrap;
  font-family: Source Sans Pro, sans-serif;
  grid-gap: 4px;
`;
export const AttributeValue2 = styled.label`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid black;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
`;
export const AttributeValue3 = styled.label`
  display: flex;
  flex-wrap: wrap;
  color: white;
  background-color: black;
  border: 1px solid black;
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
`;

export const AttributeName = styled.p`
  margin: 0.5rem;
`;
export const QuantityButtons = styled.button`
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
  background-color: white;

  padding: 0.4rem 0.3rem 0.8rem 0.3rem;
  box-sizing: border-box;
`;
export const QuantityValues = styled.label`
  font-weight: 500;
  font-size: 24px;
`;

export const QuantityCounter = styled.div`
  
  justify-content: space-between;
  grid-gap: 1rem;
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
  font-weight: 700;
  font-size: 24px;
  line-height: 18px;
  text-align: left;
`;

export const CartProductPic = styled.img `
width: 30vw;
user-select: none;
min-width: 7.5rem;
max-width: 15rem;
height: fit-content;
align-self: center;
display: flex;
`

export const NextProductPic = styled.label `
cursor: pointer;
height: 120%;
z-index: 995;
display: inline-flex;
border-radius: 25px;
align-items: center;
width: 2rem;
justify-content: space-around;

align-self: center;
&:hover {
  background-color: black;
  opacity: 0.5;
}

`

export const PreviousProductPic = styled.label `
  cursor: pointer;
  z-index: 995;
  display: inline-flex;
  height: 120%;
  border-radius: 25px;
  align-items: center;
  justify-content: space-around;
  width: 2rem;
  align-self: center;
  
  &:hover {
    background-color: black;
    opacity: 0.5;
  }
`
export const FirstNameText = styled.p `
  font-weight: 600;
  font-size: 30px;
  margin: 0;
`
export const SecondNameText = styled.p `
  font-weight: 400;
  font-size: 30px;
  margin: 0;
`
export const PriceContainer = styled.div `
margin: 1rem 0 1rem 0;
`

export const QuantityAndPicContainer = styled.div `
display: flex;
grid-gap: 1rem;
`
export const IncreaseAmountLabel = styled.label `
position: absolute;
margin: 0.2rem 0 0 0.5rem;
`

export const ImageSliderContainer = styled.div `
display: flex;
 flex-direction: row;
  justify-content: center;
 align-items: center;
`
export const ImagesSliderControl = styled.div `
position: absolute;

 width: 30vw;
  max-width: 20rem;
   height: 10rem;
    display: flex;
 justify-content: space-around;`