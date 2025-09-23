// File: frontend/src/pages/OrderHistoryPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './OrderHistoryPage.css'; // We'll create this next

export function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/my-orders', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error('Could not fetch orders.');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [token]);

    if (isLoading) return <p>Loading order history...</p>;
    if (!token) return <p>Please log in to view your order history.</p>;

    return (
        <div className="order-history-wrapper">
            <h1>Your Order History</h1>
            {orders.length === 0 ? (
                <p>You have not placed any orders yet.</p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.order_id} className="order-card">
                            <h3>Order #{order.order_id}</h3>
                            <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                            <p><strong>Total:</strong> ₹{parseFloat(order.total_amount).toFixed(2)}</p>
                            <p><strong>Status:</strong> Processing</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}