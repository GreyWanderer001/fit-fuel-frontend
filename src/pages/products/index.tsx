import { zodResolver } from "@hookform/resolvers/zod";
import { FilterX, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { v4 } from "uuid";
import { z } from "zod";

import { selectCurrentUser } from "@/features/auth/authSlice";
import { getProducts, type Product } from "@/features/get-products";
import axiosInstance from "@/shared/axios-instance";
import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import { ProductCard } from "@/shared/components/product-card";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Skeleton } from "@/shared/components/ui/skeleton";

const formSchema = z.object({
  type: z.string(),
  manufacturer: z.string(),
  price: z.string(),
});

export function Products() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      manufacturer: "",
      price: "",
    },
  });

  const user = useSelector(selectCurrentUser);

  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const [isPending, setIsPending] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const type = searchParams.get("type") || undefined;
  const manufacturer = searchParams.get("manufacturer") || undefined;
  const price = searchParams.get("price") || undefined;

  useEffect(() => {
    getProducts(type, manufacturer, price).then((products) => {
      setProducts(products);
      setIsPending(false);

      const manufacturers = products.map((product) => product.manufacturer);
      setManufacturers([...new Set(manufacturers)]);

      const types = products.map((product) => product.type);
      setTypes([...new Set(types)]);
    });
  }, [manufacturer, price, type]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    setSearchParams(data);
  }

  function handleClearFilters() {
    setSearchParams("");
    form.reset();
  }

  async function handleDeleteProduct(id: string) {
    try {
      await axiosInstance.delete(`/products/${id}`);

      setProducts((products) =>
        products.filter((product) => product.id !== id),
      );

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container grow py-8">
        <div className="flex items-end justify-center gap-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 md:flex-row md:items-end"
            >
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>

                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturer</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Manufactorer" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {manufacturers.map((manufacturer) => (
                          <SelectItem key={manufacturer} value={manufacturer}>
                            {manufacturer}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Types</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Types" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {types.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="flex md:hidden"
              >
                <FilterX className="mr-2 size-5" />
                <span>Clear Filters</span>
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={handleClearFilters}
                className="hidden md:flex"
              >
                <FilterX />
              </Button>

              {user && (
                <Link
                  to="/add-product"
                  onClick={handleClearFilters}
                  className={buttonVariants()}
                >
                  <Plus className="mr-2 size-5" />
                  <span>Add Product</span>
                </Link>
              )}

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>

        <ul className="mx-auto mt-8 grid max-w-fit place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {isPending
            ? [1, 2, 3, 4].map((index) => (
                <li key={index}>
                  <Skeleton className="h-[21.5em] w-56" />
                </li>
              ))
            : products.map((product) => (
                <li key={v4()}>
                  <ProductCard
                    isEditMode={!!user}
                    deleteProduct={handleDeleteProduct}
                    {...product}
                  />
                </li>
              ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
