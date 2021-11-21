

export const catNamesAndCurrencyQuery = `
query {
  currencies
  category {
    products {
      category
    }
  }
}
`

export const getAllProductsQuery = `
query {
  category {
    products {
      inStock
      description
      attributes {
        name
        id
        items {
          displayValue
        }
      }
      category
      name
      gallery
      prices {
        amount
        currency
      }
    }
  }
}
`