import styles from "./PriceSummary.module.css";
import formatPrice from "../utils/priceConverter";

export default function PriceSummary({ subtotal }) {
  const shipping = subtotal === 0 ? 0 : 15; //hardcoded shipping value for demo purposes
  const tax = 0.13 * subtotal; //hardcoded 13% tax for demo purposes
  const total = subtotal + shipping + tax;

  return (
    <div className={styles.summaryRoot}>
      <div className={styles.entryLabel} id="subtotal">
        Subtotal
      </div>
      <div data-testid="subtotalValue" className={styles.valueLabel}>
        {formatPrice(subtotal)}
      </div>
      <div className={styles.entryLabel} id="shipping">
        Shipping
      </div>
      <div data-testid="shippingValue" className={styles.valueLabel}>
        {formatPrice(shipping)}
      </div>
      <div className={styles.entryLabel} id="tax">
        Tax
      </div>
      <div data-testid="taxValue" className={styles.valueLabel}>
        {formatPrice(tax)}
      </div>
      <div className={`${styles.entryLabel} ${styles.totalLabel}`}>
        Order total
      </div>
      <div
        data-testid="totalValue"
        className={`${styles.valueLabel} ${styles.totalLabel}`}
      >
        {formatPrice(total)}
      </div>
    </div>
  );
}
