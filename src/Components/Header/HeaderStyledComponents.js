import styled from "styled-components";

export const MainHeaderDiv = styled.div`
  height: 4em;
  position: fixed;
  background-color: white;
  width: 100%;
  z-index: 999;
`;

export const HeaderDiv = styled.div`
  display: flex;
  position: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin-left: 5vw;
  height: 4rem;
  width: 100%;
`;

export const NavCategoryDiv = styled.div`
  display: flex;
  z-index: 999;
  flex-direction: row;
  padding: 1em 0 0 0;
`;

export const HeaderUl = styled.label`
  cursor: pointer;
  padding: 0.25em 0.5em 0em 0.5em;
  margin: 0;
`;
export const HeaderLi = styled.label`
  cursor: pointer;
  padding: 0 0 0 0;
  text-transform: uppercase;
`;

export const DropDownContainer = styled.div`
  cursor: pointer;
  position: absolute;
  top: 1em;
  right: 3.5em;
  width: 1.5em;
  height: 1.5em;
  margin: 0;
  justify-content: center;
  line-height: 160%;
`;
export const DropDownHeader = styled("div")`
  content-align: center;
  justify-content: space-around;
  font-weight: 700;
  padding: 0;
`;

export const DropDownListContainer = styled("div")`
  position: flex;
  margin: 0 0 0 -4rem;
`;

export const DropDownList = styled("ul")`
  cursor: auto;
  width: 5.5em;
  position: center;
  padding: 0;
  margin: 0.7em;

  background: #ffffff;
  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  font-weight: 900;
  justify-content: "center";

  &:first-child {
    padding-top: 0.8em;
  }
  :last-child {
    padding-bottom: 0.8em;
  }
`;

export const ListItem = styled("li")`
  cursor: pointer;
  list-style: none;
  margin-bottom: 0.8em;
  padding-left: 1rem;
`;
export const VectorLabel = styled.label`
  cursor: pointer;
  position: absolute;
  bottom: 0.1rem;
  right: 0.1rem;
`;
export const BasketContainer = styled.div`
  align-self: center;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 2rem;
  height: 1.7rem;
  width: 1rem;
`;

export const DropDownMiniCartHeader = styled("div")`
  cursor: pointer;
  content-align: center;
  justify-content: space-around;
  font-weight: 700;
  z-index: 999;
  position: absolute;
  padding: 0;
`;
export const DropDownMiniCart = styled("ul")`
  cursor: auto;
  z-index: 997;
  overflow-y: auto;
  position: absolute;
  padding: 0;
  top: 2.9rem;
  height: 35rem;

  width: 20rem;
  background: #ffffff;

  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  font-weight: 900;
  justify-content: "center";

  margin: 0 0 0 -18.25rem;
  &:first-child {
    padding-top: 0.8em;
  }
  :last-child {
    padding-bottom: 0.8em;
  }
`;

export const ToCartButton = styled.button`
  background-color: #ffffff;
  margin: 0 0.4rem 0 0;
  width: 46%;
  height: 2.5rem;
`;

export const ToCheckOutButton = styled.button`
  margin: 0 0 0 0.4rem;
  background-color: #5ece7b;
  color: white;
  width: 46%;
  height: 2.5rem;
`;

export const CartCounterLabel = styled.label`
  background-color: black;
  color: white;
  cursor: pointer;
  border-radius: 1000rem;
  font-weight: 900;
  width: 20px;
  height: 20px;
  position: absolute;
  font-size: 14px;
  text-align: center;
  left: 0.8rem;
  bottom: 1rem;
  z-index: 999;
`;

export const TotalPriceContainer = styled.div`
position: fixed;
top: 33.5em;
paddingBottom: 0.25rem;
right: 3.5em;
width: 18.5rem;      
text-align: center;
z-index: 997;
width: 17.2rem;
height: 5rem;
background-color: white;
font-weight: 900;
`;

export const TotalPriceLabelContainer = styled.div `
  height: 2.5rem;
`

export const TotalLabel = styled.label `
width: auto;
margin: 0 7rem 0 0;
font-family: Roboto;
font-weight: 500;
size: 16px;
`

export const TotalPriceLabel = styled.label `
width: 3rem;
`
