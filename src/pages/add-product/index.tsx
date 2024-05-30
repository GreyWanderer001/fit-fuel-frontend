import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import { selectCurrentUser } from "@/features/auth/authSlice";
import axiosInstance from "@/shared/axios-instance";
import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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

const addProductSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
  manufacturer: z.string().min(3),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  availability: z.string().regex(/^(?:\d+|\d*\.\d+)%?$/),
  image: z.string().url(),
});

type AddProductForm = z.infer<typeof addProductSchema>;

export function AddProduct() {
  const [isPending, startTransition] = useTransition();
  const user = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  const form = useForm<AddProductForm>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      description: "",
      manufacturer: "",
      price: "",
      availability: "",
      image: "",
    },
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  function handleAdd(data: AddProductForm) {
    startTransition(() => {
      axiosInstance
        .post("/products", data)
        .then(() => {
          navigate("/products");
          toast.success("Product added successfully");
        })
        .catch((error) => {
          toast.error(error.response?.data.message || "An error occurred");
        });
    });
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAdd)}
          className="container max-w-screen-sm grow py-16"
        >
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Add Product</CardTitle>

              <CardDescription>
                Add a new product to the store. Fill in the details below.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>

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
                    <FormLabel>Manufacturer</FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button className="w-full" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 size-5 animate-spin" />
                ) : (
                  <Plus className="mr-2 size-5" />
                )}
                <span>Add product</span>
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Footer />
    </div>
  );
}
