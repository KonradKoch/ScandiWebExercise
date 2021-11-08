const divideTheName = (name) => {
    let productName = name
    let productNameArray = productName.split(" ", productName.length);
    let [first, ...rest] = productNameArray
    let firstName = first;
    let secondName = rest.join(" ");
    return { firstName, secondName }
}

export default divideTheName;