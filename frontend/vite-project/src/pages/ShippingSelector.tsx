import { OrderSummary } from '../components/order-summary/OrderSummary'
import StepHeader from '../components/step-header/StepHeader';
import CartItemList from '../components/cart-list-item/CartListItem';
import './page-styles/shipping.css';
import { ShippingSelector } from '../components/shipping-selector/ShippingSelector';
import { useSelection } from '../stores/shippingOptionStore';

const ShippingSelectorPage  = () => {
  const selectedShipping = useSelection();
  return (
      <div className="shipping-container">

        {/* Shipping form section */}
        <div className="shipping-form-section">
  
          {/* Shipping form */}
            <StepHeader currentStep="Shipping" />
            <ShippingSelector />

        </div>

        {/* Cart items and order summary section */}
        <div className="cart-summary-section">
          {/* Cart items list */}
          <CartItemList /> 

          {/* Order summary */}
          <OrderSummary showButton={false} shippingOption={selectedShipping}/>
        </div>
      </div>
  );
};

export default ShippingSelectorPage;
