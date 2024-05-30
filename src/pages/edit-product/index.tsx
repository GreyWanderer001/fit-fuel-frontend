import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { selectCurrentUser } from "@/features/auth/authSlice";
import type { Product } from "@/features/get-products";
import axios from "@/shared/axios-instance";
import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
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
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Skeleton } from "@/shared/components/ui/skeleton";

const editProductSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
  manufacturer: z.string().min(3),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  availability: z.string().regex(/^(?:\d+|\d*\.\d+)%?$/),
  image: z.string().url(),
});

type EditProductForm = z.infer<typeof editProductSchema>;

export function EditProduct() {
  const user = useSelector(selectCurrentUser);

  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<Product>();

  const form = useForm<EditProductForm>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: product?.name,
      description: product?.description,
      manufacturer: product?.manufacturer,
      price: product?.price.toString(),
      availability: product?.availability.toString(),
      image: product?.image,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(`/products/${id}`);

    axios.get<Product>(`/products/${id}`).then((response) => {
      setProduct(response.data);

      form.setValue("name", response.data?.name);
      form.setValue("description", response.data?.description);
      form.setValue("manufacturer", response.data?.manufacturer);
      form.setValue("price", response.data?.price.toString());
      form.setValue("availability", response.data?.availability.toString());
      form.setValue("image", response.data?.image);
    });
  }, [form, id, navigate, user]);

  async function handleSave(data: EditProductForm) {
    const price = parseFloat(data.price);

    const payload = {
      ...data,
      price,
    };

    await axios.patch(`/products/${id}`, payload);

    toast.success("Product updated successfully");

    navigate(`/products/${id}`);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {product ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSave)}
            className="container flex w-fit grow flex-col gap-8 py-16 md:grid md:grid-cols-2"
          >
            <div>
              <div className="max-h-96 max-w-96 overflow-hidden">
                <img
                  src={product.image}
                  alt=""
                  className="size-full max-h-96 max-w-96"
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="mt-4 max-w-96">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Card className="h-fit">
              <CardHeader>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="manufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardHeader>

              <CardContent>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-4 flex flex-col justify-between gap-4 font-semibold tracking-tight text-secondary-foreground md:flex-row md:items-center">
                  <div className="flex grow items-center gap-2 rounded-sm bg-secondary px-8 py-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <span className="text-xl">€</span>
                  </div>

                  <div className="flex items-center gap-2 rounded-sm bg-secondary px-8 py-4">
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <span> LEFT</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full">
                  <Save className="mr-2 size-5" />
                  <span>Save</span>
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      ) : (
        <Skeleton className="container my-16 h-64 w-[50em] grow rounded-md" />
      )}

      <Footer />
    </div>
  );
}
