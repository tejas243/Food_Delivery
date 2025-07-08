import React, { useState, useContext } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cartItems, food_list } = useContext(StoreContext);

  // Build order summary from cart
  const items = food_list.filter(item => cartItems[item._id] > 0).map(item => ({
    name: item.name,
    qty: cartItems[item._id],
    price: item.price
  }));
  const delivery = 2;
  const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
  const total = subtotal + delivery;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="placeorder-container">
        <h2 className="placeorder-title">Place Your Order</h2>
        <div className="placeorder-content">
          <div className="placeorder-summary">
            <h3>Your cart is empty.</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="placeorder-container">
      <h2 className="placeorder-title">Place Your Order</h2>
      <div className="placeorder-content">
        <div className="placeorder-summary">
          <h3>Order Summary</h3>
          <ul>
            {items.map((item, idx) => (
              <li key={idx} className="placeorder-item">
                <span>{item.name} x{item.qty}</span>
                <span>${(item.qty * item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="placeorder-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="placeorder-row">
            <span>Delivery Fee</span>
            <span>${delivery.toFixed(2)}</span>
          </div>
          <div className="placeorder-row placeorder-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <form className="placeorder-form" onSubmit={handleSubmit}>
          <h3>Delivery Details</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <button type="submit" className="placeorder-btn">Place Order</button>
          {orderPlaced && <div className="placeorder-success">Thank you! Your order has been placed.</div>}
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
