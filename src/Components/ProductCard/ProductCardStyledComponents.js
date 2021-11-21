import styled from "styled-components";


export const MainProductCard = styled.div`
  padding: 7rem 0 0 3%;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 10px;
  justify-content: space-around;
  margin-bottom: 1rem;
`;
export const PhotoSection = styled.div`
  display: flex;
  grid-gap: 7px;
  width: 30em;
`;

export const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 20px;
`;

export const MainImage = styled.img`
  width: 80%;
  height: fit-content;
  
`;
export const ImgMiniature = styled.img`
  width: 3.5em;
  height: 4em;
`;

export const ProductDataContainer = styled.div`
  flex-wrap: wrap;
  margin: 2rem 0 2rem 0;
`;

export const ProductName = styled.label`
  font-weight: 600;
  font-size: 30px;
`;

export const ProductAttributeName = styled.p`
  width: fit-content;
  height: content-fit;
  text-transform: uppercase;
  font-family: Roboto Condensed;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 18px;
`;
export const ProductAttributeValues = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const ProductAttributesContainer = styled.div`
  width: fit-content;
`;

export const AttributeValue = styled.label`
  cursor: pointer;
  width: 63px;
  height: 45px;
  border: 1px solid black;
  font-family: Source Sans Pro;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.05em;
  margin: 0.3rem 0.5rem 0 0;
`;

export const PRICE = styled.p`
  margin: 3rem 0 1rem 0;
  width: 38px;
  height: 18px;
  text-transform: uppercase;
  font-family: Roboto Condensed;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
`;

export const PriceLabel2 = styled.label`
  padding: 0;
  margin: 0;
  width: 100%;
  font-family: Raleway;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 18px;
  text-align: left;
`;

export const AddToCartButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  align-self: center;
  width: 292px;
  height: 52px;
  margin: 1rem 0 0 0;
  background: lighgrey;
  font-family: Raleway;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: grey;
`;

export const FirstName = styled.p `
font-weight: 600;
font-size: 30px;
margin-bottom: 0;
`
export const SecondName = styled.p `
font-weight: 400;
font-size: 30px;
margin: 0;
`

export const InterweaveDiscriptionContainer = styled.div `
width: 292px;
margin-top: 2.5rem;
`