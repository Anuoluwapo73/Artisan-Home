"use client";

import { useState } from "react";
import { X, Mail, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: any[];
  totalAmount: number;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  totalAmount,
}: CheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleCheckout = async () => {
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Send email via API route
      const response = await fetch("/api/send-order-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          cartItems,
          totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setIsSuccess(true);
      
      // Clear the cart
      dispatch(clearCart());
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setEmail("");
      }, 3000);
    } catch (err) {
      setError("Failed to process checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl p-6 animate-scale-in">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={onClose}
          disabled={isLoading}
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold playfair-display-regular mb-2">
                Complete Your Order
              </h2>
              <p className="text-muted-foreground">
                Enter your email to receive order confirmation
              </p>
            </div>

            {/* Order Summary */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Items:</span>
                <span className="font-semibold">{cartItems.length}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-semibold">${totalAmount}.00</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Shipping:</span>
                <span className="font-semibold text-amber-700">Free</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-lg">${totalAmount}.00</span>
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              {error && (
                <p className="text-sm text-amber-600 mt-2">{error}</p>
              )}
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white py-6 text-lg font-semibold"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Processing...</span>
                </div>
              ) : (
                `Proceed to Checkout ($${totalAmount}.00)`
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              By proceeding, you agree to receive order confirmation via email
            </p>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Order Confirmed!</h3>
            <p className="text-muted-foreground mb-4">
              We've sent a confirmation email to:
            </p>
            <p className="font-semibold text-lg mb-4">{email}</p>
            <p className="text-sm text-muted-foreground">
              Thank you for your order!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
