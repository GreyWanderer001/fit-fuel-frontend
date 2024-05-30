import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useTypedSelector } from "@/app/store";
import { removeFromCart, selectProducts } from "@/features/cart/cartSlice";
import { type Cart, getCart } from "@/features/get-cart";
import { MakeOrderForm } from "@/features/make-order";
import { appearanceAnimationVariants } from "@/shared/animation-variants";
import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

const MotionTableRow = motion(TableRow);
const MotionTableBody = motion(TableBody);

export function Cart() {
  const [cart, setCart] = useState<Cart | undefined>();

  const dispatch = useAppDispatch();

  const products = useTypedSelector(selectProducts);

  useEffect(() => {
    getCart(products).then((response) => setCart(response.data));
  }, [products]);

  if (!cart) {
    return null;
  }

  function handleDelete(id: string) {
    dispatch(removeFromCart(id));
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container grow py-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Your cart
        </h1>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr,_28em]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>

                <TableHead>Name</TableHead>

                <TableHead>Price</TableHead>

                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <MotionTableBody
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {cart?.cart_items.map(({ id, name, price, image }, index) => (
                <MotionTableRow
                  key={index}
                  custom={index}
                  variants={appearanceAnimationVariants}
                >
                  <TableCell className="hidden sm:table-cell">
                    <div className="size-16 overflow-hidden rounded-md">
                      <img
                        src={image}
                        alt=""
                        className="size-full transition-transform group-hover:scale-105"
                      />
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">{name}</TableCell>

                  <TableCell>${price}</TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-5 w-5" />

                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/products/${id}`}>View Details</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => handleDelete(id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </MotionTableRow>
              ))}
            </MotionTableBody>
          </Table>

          <MakeOrderForm total_price={cart.total_price ?? 0} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
