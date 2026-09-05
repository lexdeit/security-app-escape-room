"use client";

import { Table } from "@heroui/react";
import { RoleChip } from "@/components/ui";
import type { PortalUser } from "@/lib/users";

export function AccountsTable({ users }: { users: PortalUser[] }) {
  return (
    <Table aria-label="Portal accounts">
      <Table.Content>
        <Table.Header>
          <Table.Column>Name</Table.Column>
          <Table.Column>Email</Table.Column>
          <Table.Column>Department</Table.Column>
          <Table.Column>Role</Table.Column>
        </Table.Header>
        <Table.Body items={users}>
          {(u) => (
            <Table.Row key={u.id}>
              <Table.Cell>
                <span className="font-medium">{u.name}</span>
              </Table.Cell>
              <Table.Cell>
                <span className="text-slate-500">{u.email}</span>
              </Table.Cell>
              <Table.Cell>
                <span className="text-slate-500">{u.department}</span>
              </Table.Cell>
            <Table.Cell>
              <RoleChip role={u.role} />
            </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Content>
    </Table>
  );
}
