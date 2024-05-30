import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { AddToCartButton } from "@/features/add-to-cart";
import type { Product } from "@/features/get-products";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

export function ProductCard({
  id,
  name,
  description,
  price,
  image,
  className,
  isEditMode,
  deleteProduct,
}: Product & {
  isEditMode?: boolean;
  deleteProduct?: (id: string) => void;
  className?: string;
}) {
  const splittedPrice = price.toString().split(".");

  return (
    <div className={cn("w-56 p-4", className)}>
      <Link to={`/products/${id}`} className="group block pb-2">
        <div className="size-48 overflow-hidden rounded-md">
          <img
            src={image}
            alt=""
            className="size-full transition-transform group-hover:scale-105"
          />
        </div>

        <div className="mt-4">
          <h3 className="line-clamp-1 text-xl">{name}</h3>

          <p className="line-clamp-1 text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </Link>

      <div className="flex items-center justify-between pt-2">
        {isEditMode ? (
          <>
            {deleteProduct && (
              <Button
                size="icon"
                variant="destructive"
                onClick={() => deleteProduct(id)}
              >
                <Trash2 className="size-5" />
              </Button>
            )}

            <Link
              className={buttonVariants({ size: "icon" })}
              to={`/products/${id}/edit`}
            >
              <Pencil className="size-5" />
            </Link>
          </>
        ) : (
          <>
            <p className="text-sm">
              <span>Price </span>
              <span className="text-xl text-primary">{splittedPrice[0]}</span>
              <span>.{splittedPrice[1]} </span>
              <span className="text-xl">€</span>
            </p>

            <AddToCartButton id={id} name={name} />
          </>
        )}
      </div>
    </div>
  );
}
