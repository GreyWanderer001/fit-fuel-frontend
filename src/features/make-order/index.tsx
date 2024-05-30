import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useAppDispatch, useTypedSelector } from "@/app/store";
import { reset, selectProducts } from "@/features/cart/cartSlice";
import axios from "@/shared/axios-instance";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

import { MakeOrder, makeOrderSchema } from "./schemas";

export function MakeOrderForm({ total_price }: { total_price: number }) {
  const form = useForm<MakeOrder>({
    resolver: zodResolver(makeOrderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const dispatch = useAppDispatch();
  const products = useTypedSelector(selectProducts);

  function onSubmit(values: MakeOrder) {
    form.reset();

    axios.post("/orders", { ...values, products });

    dispatch(reset());

    toast.success("Order has been placed!");
  }

  return (
    <Form {...form}>
      <form
        className="flex h-fit justify-end"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="max-w-md">
          <CardHeader>
            <p className="space-x-2 text-2xl tracking-tight">
              <span className="font-semibold">Estimated total </span>

              <span>€{total_price} EUR</span>
            </p>

            <p className="text-sm text-muted-foreground">
              Tax included. Shipping and discounts calculated at checkout.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>

                  <FormControl>
                    <Input type="tel" placeholder="+XX YYYY" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>

                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button className="w-full">Check out</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
