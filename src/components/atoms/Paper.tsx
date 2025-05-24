import type { FC, HTMLAttributes, ReactNode } from "react";
import clsx from "classnames";

interface PaperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  elevation?: "none" | "sm" | "md" | "lg";
}

const Paper: FC<PaperProps> = ({
  children,
  className,
  elevation = "sm",
  ...rest
}) => {
  const shadow = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  }[elevation];

  return (
    <div
      className={clsx("bg-white rounded-lg border border-neutral-200", shadow, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Paper;