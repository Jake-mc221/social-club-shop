'use client';

import { useState } from 'react';
import { ShoppingCart, X } from 'lucide-react';
import { CartItem } from '@/types';



interface Props {
  items: CartItem[];
  onRemove: (id: number) => void;
}

export default function CartButton({ items, onRemove }: Props) {
  const [open, setOpen] = useState(false);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open cart"
        className="fixed z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#2a2a2a] border border-[#3a3a3a] text-white shadow-lg"
        style={{ bottom: 'calc(2.5rem + env(safe-area-inset-bottom))', right: '1.5rem' }}
      >
        <ShoppingCart className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center font-serif">
            {count}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-80 h-[480px] flex flex-col bg-[#1a1a1a] border border-[#2e2e2e] rounded-2xl transition-all duration-300 ease-out font-serif ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#2e2e2e]">
          <span className="text-white text-lg font-bold">Cart</span>
          <button onClick={() => setOpen(false)} className="text-[#666] w-18 h-18 rounded-full flex items-center justify-center" >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="overflow-y-auto flex-1 px-5 py-4">
          {items.length === 0 ? (
            <p className="text-[#555] text-sm text-center mt-8">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.image} className="w-8 h-8 object-cover" />
                    <div>
                      <p className="text-white text-sm font-semibold">{item.name}</p>
                      <p className="text-[#666] text-xs">${item.price.toFixed(2)} × {item.quantity}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-[#555] hover:text-white transition-colors text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-[#2e2e2e]">
            <div className="flex justify-between text-white text-sm mb-4">
              <span className="text-[#888]">Total</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <button
              className="w-full py-3 rounded-full bg-white text-black text-sm font-bold tracking-wide"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
