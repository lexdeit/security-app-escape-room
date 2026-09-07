"use client";

import { BrandModal, PrimaryButton } from "@/components/ui";
import { IconPlus } from "@/components/icons";
import { NewTicketForm } from "@/components/TicketForms";

export function NewTicketModal() {
  return (
    <BrandModal
      trigger={
        <PrimaryButton>
          <span className="inline-flex items-center gap-2">
            <IconPlus className="h-4 w-4" />
            New ticket
          </span>
        </PrimaryButton>
      }
      title="New ticket"
      subtitle="IT, facilities and compliance requests land in the shared queue."
    >
      <NewTicketForm />
    </BrandModal>
  );
}
