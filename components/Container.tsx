import { SafeAreaView } from "react-native";

import { cn } from "~/lib/cn";

export const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <SafeAreaView className={cn("flex flex-1 p-6", className)}>{children}</SafeAreaView>;
};
