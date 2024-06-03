import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCurrentUser } from "@/features/auth/authSlice";
import { Cart, getCart } from "@/features/get-cart";
import { appearanceAnimationVariants } from "@/shared/animation-variants";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

export interface Order {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
  products: string[];
  cart: Cart;
}

const MotionTableRow = motion(TableRow);
const MotionTableBody = motion(TableBody);

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const user = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(`/login`);

    const controller = new AbortController();

    axios
      .get<Order[]>("/order", {
        signal: controller.signal,
      })
      .then((response) => {
        response.data.forEach((order) => {
          getCart(order.products).then((cart) => {
            setOrders((prev) => [...prev, { ...order, cart: cart.data }]);
          });
        });
      });

    return () => {
      controller.abort();
    };
  }, [navigate, user]);

  if (!orders.length) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container grow py-16">
        <ul>
          {orders.map(
            ({ name, email, address, comment, cart, phone }, index) => (
              <>
                {index !== 0 && <hr className="my-8" />}

                <li
                  key={`${name}-${index}`}
                  className="grid gap-4 sm:grid-cols-2"
                >
                  <Card className="h-fit">
                    <CardHeader>
                      <CardTitle>{name}</CardTitle>
                      <CardDescription>{email}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {comment && (
                        <div>
                          <h3 className="font-bold">Comment</h3>
                          <p>{comment}</p>
                        </div>
                      )}

                      {address && (
                        <div>
                          <h3 className="font-bold">Address</h3>
                          <p>{address}</p>
                        </div>
                      )}

                      {phone && (
                        <div>
                          <h3 className="font-bold">Phone</h3>
                          <p>{phone}</p>
                        </div>
                      )}
                    </CardContent>

                    <CardFooter>
                      <p>
                        Total:{" "}
                        <span className="font-medium">${cart.total_price}</span>
                      </p>
                    </CardFooter>
                  </Card>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">
                          <span className="sr-only">Image</span>
                        </TableHead>

                        <TableHead>Name</TableHead>

                        <TableHead>Price</TableHead>
                      </TableRow>
                    </TableHeader>

                    <MotionTableBody
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {cart?.cart_items.map(({ name, price, image }, index) => (
                        <MotionTableRow
                          key={`${index}-${name}`}
                          custom={index}
                          variants={appearanceAnimationVariants}
                        >
                          <TableCell>
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
                        </MotionTableRow>
                      ))}
                    </MotionTableBody>
                  </Table>
                </li>
              </>
            ),
          )}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
