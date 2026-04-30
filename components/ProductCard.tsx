import type { Product } from "@/types";
import FadeIn from '@/components/FadeIn';

interface Props {
  product: Product;
  onAddToCart: (id: number) => void;
}
export default function ProductCard({ product, onAddToCart }: Props) {
  return (
    <FadeIn delay={0.1} duration={0.6} translateY={40}>
      <div className="relative p-3 border border-[#3a3a3a] border-t-[#555] font-serif bg-black/60 flex flex-col gap-3">
        <span className="absolute -top-px -left-px w-[3px] h-[3px] bg-[#555] block" />
        <span className="absolute -top-px -right-px w-[3px] h-[3px] bg-[#555] block" />
        <span className="absolute -bottom-px -left-px w-[3px] h-[3px] bg-[#555] block" />
        <span className="absolute -bottom-px -right-px w-[3px] h-[3px] bg-[#555] block" />
        
        <div className="relative w-full h-48 overflow-hidden bg-[#2a2a2a]">
          
          <img src={product.image} className="w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xs text-[#e8e0d4] uppercase tracking-widest truncate">{product.name}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white">${product.price}</span>

          </div>
        </div>

        <button
          onClick={() => onAddToCart(product.id)}
          className="w-full py-2 rounded-full bg-[#2a2a2a] border border-[#3a3a3a] text-[#aaa] text-xs font-bold tracking-wide hover:bg-[#333] transition-colors"
        >
          + Add to Cart
        </button>
      </div>
      
    </FadeIn>
  );
}
