import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  appearanceAnimationVariants,
  heroAnimationVariants,
} from "@/shared/animation-variants";
import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

const MLink = motion(Link);

export function Hero() {
  return (
    <motion.div
      className="mx-auto flex w-fit flex-col items-center gap-8 p-8 lg:flex-row-reverse"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        className="max-h-96 max-w-96"
        variants={heroAnimationVariants}
      >
        <img
          src="/home-hero.jpg"
          alt=""
          className="size-full max-h-96 max-w-96 object-contain"
        />
      </motion.div>

      <div className="max-w-md">
        <motion.h1
          className="text-4xl font-extrabold tracking-tight lg:text-5xl"
          variants={appearanceAnimationVariants}
          custom={1}
        >
          Welcome to <span className="text-primary">FitFuel</span>!
        </motion.h1>

        <motion.p
          className="mt-6 text-xl text-muted-foreground"
          custom={2}
          variants={appearanceAnimationVariants}
        >
          Achieve your fitness goals with our carefully curated supplements and
          join our supportive athlete community. Explore now!
        </motion.p>

        <MLink
          custom={3}
          variants={appearanceAnimationVariants}
          className={cn(buttonVariants({ size: "lg" }), "mt-6")}
          to="/products"
        >
          Explore Products
        </MLink>
      </div>
    </motion.div>
  );
}
