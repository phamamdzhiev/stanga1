export default function useDiscountPrice(price, discount) {
    const discountedPrice = (price * discount)/100;
    return (price - discountedPrice).toFixed(2);
}