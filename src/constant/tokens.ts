import type { InjectionKey } from "vue";

export const USER_KEY = Symbol("user") as InjectionKey<{
  id: string;
  name: string;
  age: number;
}>;
export const USER_KEY2 = Symbol("user") as InjectionKey<{
  id2: string;
  name2: string;
  age2: number;
}>;
