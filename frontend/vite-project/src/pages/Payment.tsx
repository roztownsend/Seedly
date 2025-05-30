import PaymentForm from '../components/payment-form/PaymentForm';
import { OrderSummary } from '../components/order-summary/OrderSummary';
import StepHeader from '../components/step-header/StepHeader';
import CartItemList from '../components/cart-list-item/CartListItem';
import './page-styles/Payment.css';

const Payment = () => {
  return (
    <div className="payment-container">
      {/* Payment form section */}
      <div className="payment-form-section">
        <StepHeader currentStep="Payment" />
        <PaymentForm />
      </div>

      {/* Cart items and order summary section */}
      <div className="cart-summary-section">
        <CartItemList />
        <OrderSummary showButton={false} />
      </div>
    </div>
  );
};

export default Payment;