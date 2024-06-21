import { useState } from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";

import { cn } from "~/lib/cn";

export type ButtonProps = React.PropsWithoutRef<PressableProps> & {
  children: string;
  className?: string;
  btnColor?: {
    bg: [`bg-${string}`, `bg-${string}`];
    border: [`border-${string}`, `border-${string}`];
    text: `text-${string}`;
  };
  elRef?: React.Ref<View>;
};

export function Button({
  className,
  children,
  btnColor: customColor,
  elRef,
  ...props
}: ButtonProps) {
  const colorDefault = customColor
    ? cn(customColor.bg[0], customColor.border[0])
    : "bg-gray-50 border-gray-50";
  const colorPressed = customColor
    ? cn(customColor.bg[1], customColor.border[1])
    : "bg-gray-300 border-gray-300";

  const [btnColor, setBtnColor] = useState(colorDefault);

  return (
    <Pressable
      ref={elRef}
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
      <Text className={cn("text-base font-semibold uppercase text-black", customColor?.text)}>
        {children}
      </Text>
    </Pressable>
  );
}
