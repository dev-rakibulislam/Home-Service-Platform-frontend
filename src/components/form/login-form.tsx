"use client";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import siteDetails from "../../config/publicSiteData";
import Link from "next/link";
import { useLogin } from "@/hooks";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { userLoginSchema } from "@/validation";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending: loginPending } = useLogin();
  const queryClient = useQueryClient();

  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: { onSubmit: userLoginSchema },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };
      login(loginData, {
        onSuccess: (result) => {
          toast.success(result.message, {
            description: "Welcome back",
          });

          queryClient.refetchQueries({
            queryKey: ["user"],
          });

          router.push("/");
        },
        onError: () => {
          toast.success(" Authorization failure", {
            description: "Something went wrong. Please try again",
          });
        },
      });
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  <span>Login to your </span>
                  <span>
                    <Link
                      href={"/"}
                      className="cursor-pointer hover:underline text-[#007596]"
                    >
                      {siteDetails.name}
                    </Link>
                    <span> account</span>
                  </span>
                </p>
              </div>

              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        type={field.name}
                        name={field.name}
                        placeholder="m@example.com"
                        aria-invalid={isInvalid}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />{" "}
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showPassword ? "text" : "password"}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          value={field.state.value}
                          autoComplete="off"
                          aria-invalid={isInvalid}
                        />
                        <button
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <EyeClosed className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <Button disabled={loginPending} type="submit">
                {loginPending ? (
                  <>
                    <Spinner /> submitting
                  </>
                ) : (
                  "Submit"
                )}
              </Button>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="flex items-center justify-center bg-muted">
            {/* biome-ignore lint/performance/noImgElement: image rendering */}
            <img
              src="/ogimg.jfif"
              alt="FixItNow"
              className="h-full w-full object-center"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="/">Terms of Service</a>{" "}
        and <a href="/">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
