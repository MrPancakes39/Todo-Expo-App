import { Text, View, type TextInputProps } from "react-native";

import { TextInput } from "~/components/TextInput";
import { cn } from "~/lib/cn";

type FieldInputProps = {
  label: string;
  placeholder: string;
  className?: string;
  isRequired?: boolean;
} & TextInputProps;

export function FieldInput({
  label,
  placeholder,
  className,
  isRequired,
  ...inputProps
}: FieldInputProps) {
  return (
    <View className={cn("flex flex-col", className)}>
      <View className="flex flex-row items-center justify-between">
        <Text className="font-inter text-base font-bold text-white">{label}</Text>
        {isRequired && <Text className="text-red-500">*</Text>}
      </View>
      <TextInput placeholder={placeholder} {...inputProps} />
    </View>
  );
}
