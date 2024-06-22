import { forwardRef, useState } from "react";
import { TextInput as RNTextInput, type TextInputProps as RNTextInputProps } from "react-native";

import { cn } from "~/lib/cn";

export type TextInputProps = RNTextInputProps & {
  isDisabled?: boolean;
};

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ isDisabled = false, ...props }, ref) => {
    const focusedStyle = "border-zinc-200";
    const [focused, setFocused] = useState("");

    const disabledProps = isDisabled
      ? {
          editable: false,
          selectTextOnFocus: false,
          contextMenuHidden: true,
        }
      : {};

    return (
      <RNTextInput
        ref={ref}
        {...props}
        {...disabledProps}
        placeholderTextColor="#d1d5db"
        className={cn(
          "flex h-10 w-full rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 font-inter text-sm text-white",
          focused,
          {
            "border-zinc-800 text-zinc-600": isDisabled,
          },
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
  }
);
