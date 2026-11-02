import { Button } from "../ui/button";

export function CustomButton(payload: {
  text: string;
  type: "outline" | "destructive" | "link" | "ghost" | "secondary";
}) {
  return <Button variant={payload.type}>{payload.text}</Button>;
}
