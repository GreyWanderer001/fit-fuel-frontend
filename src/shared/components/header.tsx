import {
  Info,
  LogIn,
  LogOut,
  Menu,
  PackageSearch,
  ShoppingCart,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { useAppDispatch } from "@/app/store";
import { reset, selectCurrentUser } from "@/features/auth/authSlice";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shared/components/ui/sheet";

export function Header() {
  const user = useSelector(selectCurrentUser);

  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(reset());

    localStorage.removeItem("access_token");

    toast.success("Logged out successfully");
  }

  return (
    <header className="border-b">
      <nav className="container grid grid-cols-[1fr,_max-content,_1fr] py-2">
        <Link to="/" className="flex items-center text-lg font-medium">
          FitFuel
        </Link>

        <ul className="hidden gap-2 sm:flex">
          <li className={buttonVariants({ variant: "ghost" })}>
            <Link to="/">Home</Link>
          </li>

          <li className={buttonVariants({ variant: "ghost" })}>
            <Link to="/products">Products</Link>
          </li>

          <li className={buttonVariants({ variant: "ghost" })}>
            <Link to="/about">About us</Link>
          </li>

          {!user ? (
            <li className={buttonVariants({ variant: "ghost" })}>
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <Button onClick={handleLogout} variant="ghost">
              Logout
            </Button>
          )}
        </ul>

        <div className="hidden justify-end sm:flex">
          <Link
            to="/cart"
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            <ShoppingCart className="size-5" />
          </Link>
        </div>

        <div className="col-start-3 flex justify-end sm:hidden">
          <Sheet>
            <SheetTrigger
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <Menu />
            </SheetTrigger>

            <SheetContent>
              <ul className="flex flex-col gap-4">
                <Link to="/" className="flex items-center font-medium">
                  <span>FitFuel</span>
                </Link>

                <Link to="/products" className="flex items-center">
                  <PackageSearch className="mr-2 size-4" />
                  <span>Products</span>
                </Link>

                <Link to="/about" className="flex items-center">
                  <Info className="mr-2 size-4" />
                  <span>About us</span>
                </Link>

                <Link to="/cart" className="flex items-center">
                  <ShoppingCart className="mr-2 size-4" />
                  <span>View Cart</span>
                </Link>

                {!user ? (
                  <Link to="/login" className="flex items-center">
                    <LogIn className="mr-2 size-4" />
                    <span>Login</span>
                  </Link>
                ) : (
                  <button onClick={handleLogout} className="flex items-center">
                    <LogOut className="mr-2 size-4" />
                    <span>Logout</span>
                  </button>
                )}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
