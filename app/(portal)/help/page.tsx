import { Accordion } from "@heroui/react";
import { Card, PageHeader } from "@/components/ui-server";
import { requireUser } from "@/lib/portal";
export const metadata = { title: "Help" };

const FAQS = [
  {
    q: "I forgot my password",
    a: "Contact helpdesk@acme-corp.com from your corporate mailbox. For your first login, check the IT Onboarding Guide under Documents — it contains the starter account details.",
  },
  {
    q: "Where are the nightly backups?",
    a: "The on-call engineer publishes environment backups to /backup after the 03:00 run. If you need a service token for an internal resource, that is the first place to look.",
  },
  {
    q: "How do I request restricted access?",
    a: "File a ticket with the access tag. Workspace provisioning for the analytics area is handled by Security Operations.",
  },
  {
    q: "How are restricted memos released?",
    a: "Under procedure VAULT-2026-04, Legal releases disclosure memos through the Compliance Vault with two-custodian authorization. The released memo explains how to confirm receipt with the auditors.",
  },
];

export default async function HelpPage() {
  await requireUser();

  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Help"
        subtitle="Frequently asked questions about the portal."
      />
      <Card>
        <Accordion variant="surface">
          {FAQS.map((f, i) => (
            <Accordion.Item key={f.q} id={`faq-${i}`}>
              <Accordion.Heading>
                <Accordion.Trigger className="text-[15px] font-semibold text-[#27251F]">
                  {f.q}
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="text-sm leading-relaxed text-[#6F665C]">
                  {f.a}
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card>
    </>
  );
}
