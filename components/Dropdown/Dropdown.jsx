"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function Dropdown({
  heading,
  items = [],
  selectedItem,
  onChange = (v) => {},
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          style={{
            padding: "8px 16px",
            background: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {selectedItem ?? heading ?? "Options"}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        sideOffset={5}
        style={{
          background: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          padding: "8px",
        }}
      >
        {items?.map((ele) => (
          <DropdownMenu.Item
            key={ele.id}
            onSelect={() => onChange(ele)}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              backgroundColor: selectedItem?.id === ele.id ? "#eee" : "white",
            }}
          >
            {ele.name}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
