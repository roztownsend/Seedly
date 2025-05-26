import ShippingForm from '../components/shipping-form/ShippingForm'
import { OrderSummary } from '../components/order-summary/OrderSummary'
import ProductCardCart from '../components/card-component/ProductCardCart';
import { useCartStore } from '../stores/cartStore';

const Shipping = () => {
  const { cartItems } = useCartStore();

  return (
    <div className="w-5/6 mx-auto py-8 flex flex-col lg:flex-row gap-8">
      {/* Shipping form section */}
      <div className="w-full lg:w-1/2">
        <ShippingForm />
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
