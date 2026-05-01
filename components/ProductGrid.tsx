import ProductCard from '@/components/ProductCard';
import type { Product } from "@/types";

interface Props {
  products: Product[];
  onAddToCart: (id: number) => void;
}

export default function ProductGrid({ products, onAddToCart } : Props) {
  return (
    <div className="flex flex-wrap bg-transparent">
      {products.map((product) => (
        <div className="w-1/2 px-1 py-2" key={product.id}>
          
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
}
