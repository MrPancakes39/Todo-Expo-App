import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";

import { cn } from "~/utils/cn";

type ButtonIntent<T extends string> = {
  intent: Record<T, string>;
  pressed: Record<T, string>;
};

const buttonStyles: ButtonIntent<"default" | "primary"> = {
  intent: {
    default: "bg-neutral-50 border-neutral-400",
    primary: "bg-blue-400 border-blue-400",
  },
  pressed: {
    default: "bg-neutral-200 border-neutral-400",
    primary: "bg-blue-500 border-blue-500",
  },
};

const buttonVariants = cva(
  ["inline-flex h-10 items-center justify-center rounded-md px-6 py-0 border shadow-sm"],
  {
    variants: {
      ...buttonStyles,
    },
    defaultVariants: {
      intent: "default",
    },
  }
);
interface ButtonVariants extends VariantProps<typeof buttonVariants> {}

export type ButtonProps = React.PropsWithoutRef<PressableProps> &
  Pick<ButtonVariants, "intent"> & {
    children: string;
    className?: string;
    elRef?: React.Ref<View>;
  };

export function Button({ className, intent = "default", children, elRef, ...props }: ButtonProps) {
  const textColor = intent === "default" ? "text-neutral-700" : "text-white";
  const [btnVarient, setBtnVarient] = useState(buttonVariants({ intent }));

  return (
    <Pressable
      ref={elRef}
      {...props}
      className={cn(btnVarient, className)}
      onPressIn={(...args) => {
        setBtnVarient(buttonVariants({ pressed: intent }));
        props.onPressIn?.(...args);
      }}
      onPressOut={(...args) => {
        setBtnVarient(buttonVariants({ intent }));
        props.onPressOut?.(...args);
      }}>
      <Text className={cn("text-base font-semibold uppercase", textColor)}>{children}</Text>
    </Pressable>
  );
}
