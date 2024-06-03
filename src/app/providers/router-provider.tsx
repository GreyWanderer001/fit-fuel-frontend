import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
} from "react-router-dom";

import { About } from "@/pages/about";
import { AddProduct } from "@/pages/add-product";
import { Cart } from "@/pages/cart";
import { EditProduct } from "@/pages/edit-product";
import { Home } from "@/pages/home";
import { Login } from "@/pages/login";
import { Orders } from "@/pages/orders";
import { Product } from "@/pages/product";
import { Products } from "@/pages/products";
import { Terms } from "@/pages/terms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <Product />,
  },
  {
    path: "/products/:id/edit",
    element: <EditProduct />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/add-product",
    element: <AddProduct />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
]);

export function RouterProvider() {
  return <ReactRouterProvider router={router} />;
}
