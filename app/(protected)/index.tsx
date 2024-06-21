import Feather from "@expo/vector-icons/Feather";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { TextInput } from "~/components/TextInput";
import { useAuth } from "~/lib/auth/useAuth";
import type { Database } from "~/lib/supabase/database.types";
import { useSupabase } from "~/lib/supabase/useSupabase";

type Todo = Database["public"]["Tables"]["todos"]["Row"];

export default function Page() {
  const [todoInput, setTodoInput] = useState("");

  const { user } = useAuth();
  const supabase = useSupabase();
  const queryClient = useQueryClient();

  // Get List of Todos
  const todoQuery = useQuery({
    queryKey: ["todo-list"],
    queryFn: async () => {
      if (!user) {
        throw new Error("User not logged in");
      }
      const { data, error } = await supabase.from("todos").select("*").eq("user_id", user.id);
      if (error) {
        throw error;
      }
      return data;
    },
  });

  // Add Todo
  const todoAddMutation = useMutation({
    mutationKey: ["todo-add"],
    mutationFn: async (task: string) => {
      console.log("Adding Todo", task);
      if (!user) throw new Error("User not logged in");
      const { error } = await supabase.from("todos").insert({
        task,
        user_id: user.id,
        is_complete: false,
      });
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo-list"],
      });
      setTodoInput("");
    },
  });

  // Delete Todo
  const todoDeleteMutation = useMutation({
    mutationKey: ["todo-delete"],
    mutationFn: async (id: number) => {
      console.log("Deleting Todo", id);
      if (!user) throw new Error("User not logged in");
      const { error } = await supabase.from("todos").delete().eq("id", id);
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo-list"],
      });
    },
  });

  function handleAddTodo() {
    if (todoInput.length === 0) {
      Alert.alert("Error", "Please enter a task");
      return;
    }
    todoAddMutation.mutate(todoInput);
  }

  const isLoading = todoQuery.isLoading || todoAddMutation.isPending;
  const errorMsg = todoQuery.isError
    ? "Error Getting Todos :("
    : todoAddMutation.isError
      ? "Error Adding Todo :("
      : false;

  return (
    <Container className="bg-black pt-10">
      <Text className="mb-4 text-center text-2xl font-bold text-white">List of Todos</Text>
      <View className="mb-4 flex flex-row gap-2">
        <TextInput
          placeholder="Add a todo"
          className="flex-1"
          value={todoInput}
          onChangeText={(text) => setTodoInput(text)}
        />
        <Button
          onPress={handleAddTodo}
          className="p-1"
          btnStyle={{
            bg: ["bg-zinc-900", "bg-zinc-700"],
            border: ["border-zinc-700", "border-zinc-700"],
          }}>
          <Feather name="plus" size={24} color="white" />
        </Button>
      </View>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : errorMsg ? (
          <Text className="text-center text-xl text-white">{errorMsg}</Text>
        ) : todoQuery.data && todoQuery.data.length > 0 ? (
          <FlashList
            data={todoQuery.data ?? []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                onEdit={() => {
                  console.log("edit");
                }}
                onDelete={() => todoDeleteMutation.mutate(item.id)}
              />
            )}
            estimatedItemSize={50}
          />
        ) : null}
      </ScrollView>
    </Container>
  );
}

type TodoItemProps = {
  item: Todo;
  onEdit: () => void;
  onDelete: () => void;
};

function TodoItem({ item, onEdit, onDelete }: TodoItemProps) {
  return (
    <View className="mb-2 flex flex-row items-center pl-1">
      <Text className="text-md flex-1 text-white">{item.task}</Text>
      <Button
        onPress={onEdit}
        className="p-1"
        btnStyle={{
          bg: ["bg-transparent", "bg-zinc-800"],
          border: ["border-transparent", "border-transparent"],
        }}>
        <Feather name="edit" size={24} color="#71717a" />
      </Button>
      <Button
        onPress={onDelete}
        className="p-1"
        btnStyle={{
          bg: ["bg-transparent", "bg-zinc-800"],
          border: ["border-transparent", "border-transparent"],
        }}>
        <Feather name="trash" size={24} color="#dc2626" />
      </Button>
    </View>
  );
}
