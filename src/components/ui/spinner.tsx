import { cn } from "cn";
import { LoaderIcon } from "lucide-react";
function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-6  animate-spinner-scale", className)}
      {...props}
    />
  );
}

export { Spinner };
