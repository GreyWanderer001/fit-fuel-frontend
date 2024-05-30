import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { getProducts, type Product } from "@/features/get-products";
import { appearanceAnimationVariants } from "@/shared/animation-variants";
import { ProductCard } from "@/shared/components/product-card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function RecommendationSection() {
  const [isPending, setIsPending] = useState(true);
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((products) => {
      setRecommendations(products.slice(0, 4));
      setIsPending(false);
    });
  }, []);

  return (
    <main className="p-8">
      <h2 className="text-center text-2xl font-medium tracking-tight sm:text-3xl">
        🔥 WE RECOMMEND 🔥
      </h2>

      <ul className="mx-auto mt-8 grid max-w-fit place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {isPending
          ? [1, 2, 3, 4].map((index) => (
              <li key={index}>
                <Skeleton className="h-[21.5em] w-56" />
              </li>
            ))
          : recommendations.map((product, index) => (
              <motion.li
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                variants={appearanceAnimationVariants}
                key={product.id}
              >
                <ProductCard {...product} />
              </motion.li>
            ))}
      </ul>
    </main>
  );
}
