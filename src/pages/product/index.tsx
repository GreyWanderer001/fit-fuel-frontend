import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AddToCartButton } from "@/features/add-to-cart";
import type { Product } from "@/features/get-products";
import axios from "@/shared/axios-instance";
import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function Product() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    axios
      .get<Product>(`/products/${id}`)
      .then((response) => setProduct(response.data));
  }, [id]);

  const splittedPrice = product?.price.toString().split(".") || ["0", "00"];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {product ? (
        <main className="container flex w-fit grow flex-col gap-8 py-16 md:grid md:grid-cols-2">
          <div className="max-h-96 max-w-96 overflow-hidden">
            <img
              src={product.image}
              alt=""
              className="size-full max-h-96 max-w-96"
            />
          </div>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>

              <CardDescription>{product.manufacturer}</CardDescription>
            </CardHeader>

            <CardContent>
              <p>{product.description}</p>

              <div className="mt-4 flex items-center justify-between gap-4 font-semibold tracking-tight text-secondary-foreground">
                <p className="grow rounded-sm bg-secondary px-8 py-4">
                  <span className="text-primary">{splittedPrice[0]}</span>
                  <span>.{splittedPrice[1]}€</span>
                </p>

                <p className="rounded-sm bg-secondary px-8 py-4">
                  <span className="text-primary">{product.availability}</span>
                  <span> LEFT</span>
                </p>
              </div>
            </CardContent>

            <CardFooter>
              <AddToCartButton
                className="grow"
                id={product.id}
                name={product.name}
                variant="lg"
              />
            </CardFooter>
          </Card>
        </main>
      ) : (
        <Skeleton className="container my-16 h-64 w-[50em] grow rounded-md" />
      )}

      <Footer />
    </div>
  );
}
