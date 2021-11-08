export const HowManyItems = (itemsLength) => {
    if(itemsLength === 1) {
        return ", 1 item"
    } else if(itemsLength > 1) {
        return `, ${itemsLength} items`
    }
}