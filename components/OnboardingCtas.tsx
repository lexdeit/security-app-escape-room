"use client";

import { Button } from "@heroui/react";

export function OnboardingCtas() {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <Button variant="primary" onPress={() => (window.location.href = "/login")}>
        Go to Employee Login
      </Button>
      <Button variant="secondary" onPress={() => (window.location.href = "/")}>
        Back to Company Portal
      </Button>
    </div>
  );
}
