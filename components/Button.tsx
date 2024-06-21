import { forwardRef, useState } from "react";
import { Pressable, Text, type View, type PressableProps } from "react-native";

import { cn } from "~/lib/cn";

export type ButtonProps = PressableProps & {
  children: string;
  className?: string;
  btnStyle?: {
    bg?: [`bg-${string}`, `bg-${string}`];
    border?: [`border-${string}`, `border-${string}`];
    text?: string;
  };
};

export const Button = forwardRef<View, ButtonProps>(
  ({ className, children, btnStyle, ...props }, ref) => {
    const bgColors =
      btnStyle && btnStyle.bg ? btnStyle.bg : (["bg-gray-50", "bg-gray-300"] as const);
    const borderColors =
      btnStyle && btnStyle.border
        ? btnStyle.border
        : (["border-gray-50", "border-gray-300"] as const);
    const textStyle = btnStyle && btnStyle.text ? btnStyle.text : "";

    const colorDefault = `${bgColors[0]} ${borderColors[0]}`;
    const colorPressed = `${bgColors[1]} ${borderColors[1]}`;

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
        <Text className={cn("font-inter text-base font-semibold capitalize text-black", textStyle)}>
          {children}
        </Text>
      </Pressable>
    );
  }
);
