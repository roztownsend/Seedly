import ShippingForm from '../components/shipping-form/ShippingForm'
import { OrderSummary } from '../components/order-summary/OrderSummary'
import ProductCardCart from '../components/card-component/ProductCardCart';
import { useCartStore } from '../stores/cartStore';

const Shipping = () => {
  const { cartItems } = useCartStore();

  return (
    <div className="max-w-7xl mx-auto flex gap-8 items-start py-8">
      {/* Shipping form section */}
      <div className="flex-1">
        <ShippingForm />
      </div>

      {/* Cart items and order summary section */}
      <div className="w-full space-y-6">
        {/* Cart items list */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <ProductCardCart key={item.id} item={item} />
          ))}
        </div>

        {/* Order summary */}
        <OrderSummary />
      </div>
    </div>
  )
}

export default Shipping;
