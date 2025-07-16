import React from "react";

export default function LayoutSwitcher({ view, onChange }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <button
        data-testid="list-button"
        onClick={() => onChange("list")}
        style={{ fontWeight: view === "list" ? "bold" : "normal", marginRight: 12 }}
      >
        List View
      </button>
      <button
        data-testid="grid-button"
        onClick={() => onChange("grid")}
        style={{ fontWeight: view === "grid" ? "bold" : "normal" }}
      >
        Grid View
      </button>
    </div>
  );
}
