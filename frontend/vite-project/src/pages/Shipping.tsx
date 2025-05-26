import ShippingForm from '../components/shipping-form/ShippingForm'
import { OrderSummary } from '../components/order-summary/OrderSummary'
import StepHeader from '../components/step-header/StepHeader';
import CartItemList from '../components/cart-list-item/CartListItem';
import './page-styles/shipping.css';

const Shipping = () => {

  return (
      <div className="shipping-container">

        {/* Shipping form section */}
        <div className="shipping-form-section">
  
          {/* Shipping form */}
            <StepHeader currentStep="Address" />
            <ShippingForm />

        </div>

        {/* Cart items and order summary section */}
        <div className="cart-summary-section">
          {/* Cart items list */}
          <CartItemList /> 

          {/* Order summary */}
          <OrderSummary showButton={false}/>
        </div>
      </div>
  );
};

export default Shipping;
