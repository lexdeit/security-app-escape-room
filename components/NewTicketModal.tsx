"use client";

import { BrandModal, PrimaryButton, IconPlus } from "@/components/ui";
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
