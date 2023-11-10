export type Autocomplete = {
  x: number;
  y: number;
  pharse: string;
  type: "user" | "tag";
  index: number;
  tab?: { id: string; name: string }[];
} | null;
