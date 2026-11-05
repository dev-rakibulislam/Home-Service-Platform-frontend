import { Spinner } from "../ui/spinner";

export function Loading(){
  return (
    <div className="flex items-center justify-center gap-4 min-h-screen">
      <Spinner className="size-7" />
    </div>
  );
}
