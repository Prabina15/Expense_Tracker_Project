"use client";

import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  updateProfile,
  type ChangePasswordData,
  type UpdateProfileData,
} from "@/lib/auth";

export function useUpdateProfile() {
  return useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfile(data),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => changePassword(data),
  });
}