import gql from "graphql-tag";

export const catNamesAndCurrencyQuery = gql`
query {
  currencies
  category {
    products {
      category
    }
  }
}
`