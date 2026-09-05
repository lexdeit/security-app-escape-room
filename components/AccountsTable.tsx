"use client";

import { Chip, Table } from "@heroui/react";
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
                <Chip
                  size="sm"
                  variant="soft"
                  color={u.role === "admin" ? "danger" : u.role === "analyst" ? "warning" : "default"}
                >
                  {u.role}
                </Chip>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Content>
    </Table>
  );
}
