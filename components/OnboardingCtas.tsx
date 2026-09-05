"use client";

import { GoldenButton, PrimaryButton } from "@/components/ui";

export function OnboardingCtas() {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <PrimaryButton onPress={() => (window.location.href = "/login")}>
        Go to Employee Login
      </PrimaryButton>
      <GoldenButton onPress={() => (window.location.href = "/")}>
        Back to Company Portal
      </GoldenButton>
    </div>
  );
}
