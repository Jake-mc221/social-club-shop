'use client';

import PixelBlast from '@/components/PixelBlast';
import { MoveDown } from 'lucide-react';
import ShinyText from '@/components/ShinyText';
import LogoClient from '@/components/LogoClient';
import { PRODUCTS } from "@/data/products";
import ProductGrid from '@/components/ProductGrid';
import CartButton from '@/components/CartButton';
import { useEffect, useRef, useState, useMemo } from 'react';
import { CartItem, SortBy } from '@/types';


export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [scrollOp, setScrollOp] = useState(1);
  const [scrollOpAppear, setScrollOpAppear] = useState(0);
  const logoRef = useRef<HTMLDivElement>(null);

  const [sortBy, setSortBy] = useState<SortBy>('default');

  const sortedProducts = useMemo(() => {
    const arr = [...PRODUCTS];
    if (sortBy === 'price-asc') return arr.sort((a,b) => a.price - b.price);
    if (sortBy === 'price-desc') return arr.sort((a,b) => b.price - a.price);
    if (sortBy === 'alpha') return arr.sort((a,b) => a.name.localeCompare(b.name));
    return arr;
  }, [sortBy]);

  useEffect(() => {
    const onScroll = () => {
      setScrollOp(Math.max(0, 1 - window.scrollY / 700));
      if (logoRef.current) {
        const logoBottom = logoRef.current.offsetTop + logoRef.current.offsetHeight;
        const past = window.scrollY - logoBottom;
        setScrollOpAppear(Math.min(1, Math.max(0, past / 100)));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const addToCart = (id: number) => {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;
    setCartItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <>
      {/* Full-screen background */}
      <div className="fixed inset-0 z-0 bg-[#141414]">
        <PixelBlast
          variant="square"
          pixelSize={2}
          color="#414141"
          patternScale={3}
          patternDensity={1.4}
          enableRipples
          rippleSpeed={1}
          rippleThickness={0.49}
          rippleIntensityScale={3}
          speed={6}
          transparent
          edgeFade={0.25}
          className=""
          style={{}}
        />
      </div>

      {/* Navbar */}
      <div className="z-50 font-serif fixed w-full flex flex-row bg-black/90 py-2 items-center" style={{ opacity: scrollOpAppear }}>
        <LogoClient src="/eg.glb" width={40} height={40} />
        <h1 className="text-white text-base font-bold max-w-xl leading-tight pl-1">
          Something Socialhi Club.
        </h1>

      </div>

      {/* Centered content */}
      <div className="relative z-10 flex items-center justify-center w-full h-screen font-serif">
        <div className="flex flex-col items-center gap-6 text-center px-4">
          <h1 className="text-white text-4xl font-bold max-w-xl leading-tight">
            Something Social Club.
          </h1>
          <div ref={logoRef}>
            <LogoClient src="/eg.glb" width={300} height={300} />
          </div>
        </div>
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" style={{ opacity: scrollOp }}>
          <ShinyText
            text="scroll to view shop"
            speed={1.5}
            delay={0}
            color="#e8e0d4"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
            className="italic"
          />
          <MoveDown className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="flex flex-row gap-1 justify-center px-2 py-2">
          <button
            onClick={() => setSortBy ('alpha')}
            className={`text-[#888] text-xs font-bold font-serif border border-[#3a3a3a]  px-4 py-2 ${sortBy === 'alpha' ? 'bg-white text-black' : ''}`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Alphabetical
          </button>
          <button
            onClick={() => setSortBy('price-desc')}
            className={`text-[#888] text-xs font-bold font-serif border border-[#3a3a3a]  px-4 py-2 ${sortBy === 'price-desc' ? 'bg-white text-black' : ''}`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Price: High -{'>'} Low
          </button>
          <button
            onClick={() => setSortBy('price-asc')}
            className={`text-[#888] text-xs font-bold font-serif border border-[#3a3a3a]  px-4 py-2 ${sortBy === 'price-asc' ? 'bg-white text-black' : ''}`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Price: Low -{'>'} high
          </button>
          <button
            onClick={() => setSortBy('default')}
            className={`text-[#888] text-xs font-bold font-serif border border-[#3a3a3a]  px-4 py-2 ${sortBy === 'default' ? 'bg-white text-black' : ''}`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Reset
          </button>
        </div>
        <ProductGrid products={sortedProducts} onAddToCart={addToCart} />
      </div>
      <CartButton items={cartItems} onRemove={removeFromCart} />
    </>
  );
}
