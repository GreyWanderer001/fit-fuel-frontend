import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { useAppDispatch } from "@/app/store";
import { addToCart } from "@/features/cart/cartSlice";
import { Button } from "@/shared/components/ui/button";

export function AddToCartButton({
  id,
  name,
  variant = "default",
  className,
}: {
  id: string;
  name?: string;
  variant?: "default" | "lg";
  className?: string;
}) {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(addToCart(id));
    toast.success(`${name ?? "Product"} added to cart`);
  }

  return (
    <Button
      onClick={handleClick}
      size={variant === "default" ? "icon" : "default"}
      className={className}
    >
      <ShoppingCart className="size-5" />

      {variant === "lg" && <span>Add to cart</span>}
    </Button>
  );
}
