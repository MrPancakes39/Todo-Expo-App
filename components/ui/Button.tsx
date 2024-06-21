import { useState } from "react";
import { Pressable, Text, View, type PressableProps } from "react-native";

import { cn } from "~/utils/cn";

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
    : "bg-violet-400 border-violet-400";
  const colorPressed = customColor
    ? cn(customColor.bg[1], customColor.border[1])
    : "bg-violet-500 border-violet-500";

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
      <Text className={cn("text-base font-semibold uppercase text-white", customColor?.text)}>
        {children}
      </Text>
    </Pressable>
  );
}
