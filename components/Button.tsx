import { forwardRef, useState } from "react";
import { Pressable, Text, type View, type PressableProps } from "react-native";

import { cn } from "~/lib/cn";

export type ButtonProps = PressableProps & {
  children: string;
  className?: string;
  btnColor?: {
    bg: [`bg-${string}`, `bg-${string}`];
    border: [`border-${string}`, `border-${string}`];
    text: `text-${string}`;
  };
};

export const Button = forwardRef<View, ButtonProps>(
  ({ className, children, btnColor: customColor, ...props }, ref) => {
    const colorDefault = customColor
      ? cn(customColor.bg[0], customColor.border[0])
      : "bg-gray-50 border-gray-50";
    const colorPressed = customColor
      ? cn(customColor.bg[1], customColor.border[1])
      : "bg-gray-300 border-gray-300";

    const [btnColor, setBtnColor] = useState(colorDefault);

    return (
      <Pressable
        ref={ref}
        {...props}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-md border px-6 py-0 shadow-sm",
          btnColor,
          className
        )}
        onPressIn={(...args) => {
          props.onPressIn?.(...args);
          setBtnColor(colorPressed);
        }}
        onPressOut={(...args) => {
          props.onPressOut?.(...args);
          setBtnColor(colorDefault);
        }}>
        <Text
          className={cn(
            "font-inter text-base font-semibold uppercase text-black",
            customColor?.text
          )}>
          {children}
        </Text>
      </Pressable>
    );
  }
);
