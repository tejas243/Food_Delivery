import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const { cartItems, food_list, removeFromCart } = useContext(StoreContext);

    const navigate = useNavigate();
    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {Object.keys(cartItems).length === 0 ? (
                    <div className="cart-empty-message">Your cart is empty.</div>
                ) : (
                    food_list.filter(item => cartItems[item._id] > 0).map(item => (
                        <div className="cart-items-item" key={item._id}>
                            <img className="cart-item-img" src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <p>${item.price}</p>
                            <p>{cartItems[item._id]}</p>
                            <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
                            <button className="cart-remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
                        </div>
                    ))
                )}
                <hr />
                {Object.keys(cartItems).length > 0 && (
                    <div className="cart-total-section">
                        <h2>Cart Total</h2>
                        <div className="cart-total-row">
                            <span>Subtotal</span>
                            <span>${food_list.reduce((acc, item) => acc + (cartItems[item._id] ? item.price * cartItems[item._id] : 0), 0).toFixed(2)}</span>
                        </div>
                        <div className="cart-total-row">
                            <span>Delivery Fee</span>
                            <span>$2</span>
                        </div>
                        <div className="cart-total-row total">
                            <span>Total</span>
                            <span>${(food_list.reduce((acc, item) => acc + (cartItems[item._id] ? item.price * cartItems[item._id] : 0), 0) + 2).toFixed(2)}</span>
                        </div>
                        <button className="cart-checkout-btn" onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                        <label className="cart-promo-label">If you have a promo code, Enter it here</label>
                        <form className="cart-promo-form">
                            <input className="cart-promo-input" type="text" placeholder="promo code" />
                            <button className="cart-promo-submit" type="submit">Submit</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart