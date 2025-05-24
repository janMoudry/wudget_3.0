import type { FC, HTMLAttributes, ReactNode } from "react";
import clsx from "classnames";

type Variant = "h1" | "h2" | "h3" | "body" | "small";

interface TypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  variant?: Variant;
}

const Typography: FC<TypographyProps> = ({
  children,
  variant = "body",
  className,
  ...rest
}) => {
  const base = "text-neutral-900";
  const variants: Record<Variant, string> = {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-semibold",
    h3: "text-xl font-medium",
    body: "text-base",
    small: "text-sm text-neutral-600",
  };

  return (
    <p className={clsx(base, variants[variant], className)} {...rest}>
      {children}
    </p>
  );
};

export default Typography;