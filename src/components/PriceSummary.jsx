import styles from "./PriceSummary.module.css";
import formatPrice from "../utils/priceConverter";

export default function PriceSummary({ subtotal }) {
  const shipping = subtotal === 0 ? 0 : 15; //hardcoded shipping value for demo purposes
  const tax = 0.13 * subtotal; //hardcoded 13% tax for demo purposes
  const total = subtotal + shipping + tax;

  return (
    <div>
      <div>Subtotal</div>
      <div data-testid="subtotalValue">{formatPrice(subtotal)}</div>
      <div>Shipping</div>
      <div data-testid="shippingValue">{formatPrice(shipping)}</div>
      <div>Tax</div>
      <div data-testid="taxValue">{formatPrice(tax)}</div>
      <div>Order total</div>
      <div data-testid="totalValue">{formatPrice(total)}</div>
    </div>
  );
}
