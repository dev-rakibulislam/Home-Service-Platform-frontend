
"use client";

import { useEffect, useState } from "react";
import { useGetMe, useUpdateTechnicianProfile } from "@/hooks";
import { Loading } from "@/components/shared/loading";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { toast } from "sonner";

export function TechnicianProfile() {
  const { data, isLoading } = useGetMe();
  const updateProfile = useUpdateTechnicianProfile();

  const user = data?.data;
  const technician = user?.technicianProfile;

  const [bio, setBio] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [skills, setSkills] = useState("");

  // Initialize form values from API
  useEffect(() => {
    if (!technician) return;

    setBio(technician.bio ?? "");
    setExperienceYears(String(technician.experienceYears ?? ""));
    setHourlyRate(String(technician.hourlyRate ?? ""));
    setSkills(technician.skills?.join(", ") ?? "");
  }, [technician]);

  if (isLoading) {
    return <Loading />;
  }

  if (!user || !technician) {
    return null;
  }

  // Update only changed fields
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: {
      bio?: string;
      experienceYears?: number;
      hourlyRate?: string;
      skills?: string[];
    } = {};

    if (bio !== (technician.bio ?? "")) {
      payload.bio = bio;
    }

    if (Number(experienceYears) !== technician.experienceYears) {
      payload.experienceYears = Number(experienceYears);
    }

    if (hourlyRate !== String(technician.hourlyRate ?? "")) {
      payload.hourlyRate = hourlyRate;
    }

    const updatedSkills = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const currentSkills = technician.skills ?? [];

    if (JSON.stringify(updatedSkills) !== JSON.stringify(currentSkills)) {
      payload.skills = updatedSkills;
    }

    // No changes
    if (Object.keys(payload).length === 0) {
      toast.info("No changes detected.");
      return;
    }

    updateProfile.mutate(payload, {
      onSuccess: () => {
        toast.success("Profile updated successfully.");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error?.data?.errorDetails[0]?.message
            : "Failed to update profile.",
        );
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">My Profile</h1>

        <p className="text-sm text-muted-foreground">
          Manage your technician profile information.
        </p>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>

          <CardDescription>Your basic account information.</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={user.name ?? ""} readOnly />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user.email ?? ""} readOnly />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              value={user.phoneNumber ?? ""}
              placeholder="Not provided"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              value={user.address ?? ""}
              placeholder="Not provided"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label>Role</Label>

            <div>
              <Badge variant="secondary">{user.role}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Account Status</Label>

            <div>
              <Badge
                variant={user.status === "UNBAN" ? "default" : "destructive"}
              >
                {user.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technician Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Technician Profile</CardTitle>

          <CardDescription>
            Update the information customers see on your technician profile.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="userName">Technician Username</Label>

              <Input id="userName" value={technician.userName ?? ""} readOnly />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>

              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell customers about yourself..."
                rows={5}
              />
            </div>

            {/* Experience and Hourly Rate */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="experienceYears">Experience (Years)</Label>

                <Input
                  id="experienceYears"
                  type="number"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  min={0}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate</Label>

                <Input
                  id="hourlyRate"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  min={0}
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>

              <Input
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Plumbing, Electrical, AC Repair"
              />

              <p className="text-xs text-muted-foreground">
                Separate multiple skills with commas.
              </p>
            </div>

            {/* Current Skills */}
            {technician.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {technician.skills.map((skill: string) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}

            {/* Status */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Availability</Label>

                <div>
                  <Badge
                    variant={technician.isAvailable ? "default" : "secondary"}
                  >
                    {technician.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Average Rating</Label>

                <p className="text-sm font-medium">
                  {technician.avgRating ?? "No ratings yet"}
                </p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" disabled={updateProfile.isPending}>
                {updateProfile.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
