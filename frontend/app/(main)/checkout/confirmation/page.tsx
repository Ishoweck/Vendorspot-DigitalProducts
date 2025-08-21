"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  Package,
  MapPin,
  Truck,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useTempStore } from "@/stores/tempStore";
import { useProducts } from "@/hooks/useAPI";

export default function CheckoutConfirmationPage() {
  const { cartItems, clearCart } = useTempStore();
  const [orderCode, setOrderCode] = useState("");
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  const { data: productsData } = useProducts({
    page: 1,
    limit: 100,
  });

  useEffect(() => {
    const generateOrderCode = () => {
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.random().toString(36).substring(2, 8).toUpperCase();
      return `ORD-${random}-${timestamp}`;
    };

    const calculateDeliveryDate = () => {
      const today = new Date();
      const deliveryDate = new Date(today);
      deliveryDate.setDate(today.getDate() + 5);
      return deliveryDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    setOrderCode(generateOrderCode());
    setEstimatedDelivery(calculateDeliveryDate());

    if (productsData?.data?.data && cartItems.length > 0) {
      const products = productsData.data.data;
      const cartProductData = cartItems
        .map((cartItem) => {
          const product = products.find((p) => p._id === cartItem.productId);
          return product ? { ...product, quantity: cartItem.quantity } : null;
        })
        .filter(Boolean);

      setCartProducts(cartProductData);
    }

    setTimeout(() => {
      clearCart();
    }, 1000);
  }, [cartItems, productsData, clearCart]);

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.075;
  const shippingFee = 0;
  const total = subtotal + tax + shippingFee;

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-success-600" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 font-display mb-2">
            Order Confirmed!
          </h1>
          <p className="text-neutral-600 mb-4">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-primary-700 mb-1">Order Number</p>
            <p className="text-xl font-bold text-primary-900">{orderCode}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                Order Details
              </h2>
              <div className="space-y-4">
                {cartProducts.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:space-x-4 pb-4 border-b border-neutral-100 last:border-b-0 last:pb-0"
                  >
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.thumbnail || "/api/placeholder/200/150"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <h3 className="font-medium text-neutral-900 truncate sm:truncate break-words">
                        {item.name}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right ml-auto sm:ml-0">
                      <p className="font-semibold text-neutral-900">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                Delivery Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-neutral-400 mt-1" />
                  <div>
                    <p className="font-medium text-neutral-900">
                      Delivery Address
                    </p>
                    <p className="text-neutral-600 text-sm">
                      123 Lagos Street, Victoria Island
                      <br />
                      Lagos, Nigeria
                      <br />
                      +234 901 234 5678
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Truck className="w-5 h-5 text-neutral-400 mt-1" />
                  <div>
                    <p className="font-medium text-neutral-900">
                      Delivery Method
                    </p>
                    <p className="text-neutral-600 text-sm">
                      Standard Delivery (3-5 business days)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-neutral-400 mt-1" />
                  <div>
                    <p className="font-medium text-neutral-900">
                      Estimated Delivery
                    </p>
                    <p className="text-neutral-600 text-sm">
                      {estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <Package className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    What happens next?
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      You'll receive an email confirmation shortly
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      We'll notify you when your order ships
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      Track your package with the provided tracking number
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">VAT (7.5%)</span>
                  <span className="font-medium">₦{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-neutral-900">
                      Total Paid
                    </span>
                    <span className="text-lg font-semibold text-neutral-900">
                      ₦{total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/dashboard/user/orders"
                className="w-full btn-primary mb-4 block text-center"
              >
                View Order
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </Link>

              <Link
                href="/products"
                className="block w-full btn-outline text-center"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 p-4 bg-neutral-50 rounded-lg">
                <p className="text-sm text-neutral-600 text-center">
                  Need help? Contact our support team at{" "}
                  <a
                    href="mailto:support@example.com"
                    className="text-primary-600 hover:underline"
                  >
                    support@example.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
