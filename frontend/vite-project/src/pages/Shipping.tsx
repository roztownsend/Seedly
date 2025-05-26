import ShippingForm from '../components/shipping-form/ShippingForm'
import { OrderSummary } from '../components/order-summary/OrderSummary'
import ProductCardCart from '../components/card-component/ProductCardCart';
import { useCartStore } from '../stores/cartStore';
import StepHeader from '../components/step-header/StepHeader';

const Shipping = () => {
  const { cartItems } = useCartStore();

  return (
      <div className="w-11/12 lg:w-5/6 mx-auto py-10 flex flex-col lg:flex-row gap-12">

        {/* Shipping form section */}
        <div className="p-4 w-full mx-auto max-w-lg">
  
          {/* Shipping form */}
          <div>
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <StepHeader currentStep="Address" />
            </div>

            <ShippingForm />
          </div>
        </div>


        {/* Cart items and order summary section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6 max-h-[80vh] overflow-y-auto pr-2">
          {/* Cart items list */}
          <div className="space-y-4">
            {cartItems.map((item) => {
              return (
                <div key={item.id} className="list-wrapper">
                  <ProductCardCart id={item.id} />
                </div>
              );
            })}
          </div>

          {/* Order summary */}
          <OrderSummary showButton={false}/>
        </div>
      </div>
  );
};

export default Shipping;
