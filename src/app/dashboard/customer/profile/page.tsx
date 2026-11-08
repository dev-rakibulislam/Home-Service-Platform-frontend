"use client";

import { useGetMe } from "@/hooks";
import { Loading } from "@/components/shared/loading";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  const { data, isLoading } = useGetMe();

  const user = data?.data;

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          My Profile
        </h1>

        <p className="text-sm text-muted-foreground">
          View your account information.
        </p>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>

          <CardDescription>
            Your personal account information.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-5 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>

            <Input
              value={user.name ?? ""}
              placeholder="Not provided"
              readOnly
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label>Email</Label>

            <Input
              value={user.email ?? ""}
              placeholder="Not provided"
              readOnly
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Phone Number</Label>

            <Input
              value={user.phoneNumber ?? ""}
              placeholder="Not provided"
              readOnly
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label>Address</Label>

            <Input
              value={user.address ?? ""}
              placeholder="Not provided"
              readOnly
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label>Role</Label>

            <div>
              <Badge variant="secondary">
                {user.role}
              </Badge>
            </div>
          </div>

          {/* Account Status */}
          <div className="space-y-2">
            <Label>Account Status</Label>

            <div>
              <Badge
                variant={
                  user.status === "UNBAN"
                    ? "default"
                    : "destructive"
                }
              >
                {user.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
