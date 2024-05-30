import { Link } from "react-router-dom";

export function Footer() {
  return (
    <div className="container py-8 text-sm font-medium text-muted-foreground">
      <p>FitFuel Copyright ©2024</p>
      <p>Designed by Robert Shalajev</p>
      <Link to="/terms" className="underline-offset-4 hover:underline">
        Terms and Conditions
      </Link>
    </div>
  );
}
