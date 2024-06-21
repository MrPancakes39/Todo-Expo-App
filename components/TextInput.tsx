import { forwardRef, useState } from "react";
import { TextInput as RNTextInput, type TextInputProps } from "react-native";

import { cn } from "~/lib/cn";

export const TextInput = forwardRef<RNTextInput, TextInputProps>(({ ...props }, ref) => {
  const focusedStyle = "border-zinc-200";
  const [focused, setFocused] = useState("");

  return (
    <RNTextInput
      ref={ref}
      {...props}
      placeholderTextColor="#d1d5db"
      className={cn(
        "font-inter flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white",
        focused,
        props.className
      )}
      onFocus={(...args) => {
        setFocused(focusedStyle);
        props.onFocus?.(...args);
      }}
      onBlur={(...args) => {
        setFocused("");
        props.onBlur?.(...args);
      }}
    />
  );
});
