import styled from "styled-components";

export const ProductCard = styled.div`
  box-sizing: border-box;
  height: 444px;
  width: 386px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 998;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
  &:hover .product-list-shopping-button {
    display: block;
  }
`;

export const CurrentCategory = styled.div`
  padding: 3em 0 0 0;
  margin: 0 0 0 5vw;
  text-transform: capitalize;
  font-size: 42px;
  font-weight: 400;
  font-style: normal;
`;

export const ProductList = styled.div`
  margin: 3em 0 0 1vw;
  display: grid;
  grid-gap: 40px;
  grid-template-columns: repeat(3, 386px);
  box-sizing: border-box;
  justify-items: center;
  justify-content: center;
  align-content: center;
  place-item: center;
`;

export const ProductNameLabel = styled.label`
  width: 100%;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
  text-align: left;
  padding: 1em 0 0 0;
`;

export const PriceLabel = styled.label`
  width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  text-align: left;
`;

export const ProductNameAndPriceContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  margin-left: 0.5rem;
`