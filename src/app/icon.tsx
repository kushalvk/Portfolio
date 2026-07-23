import { ImageResponse } from "next/og";

// The Node runtime of @vercel/og has a broken file-URL resolution on Windows;
// the edge runtime bundle works everywhere (locally and on Vercel).
export const runtime = "edge";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon: the site's </> mark on the dark terminal background,
// wrapped in the aurora gradient ring.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #22d3ee)",
          borderRadius: 16,
          padding: 3,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0d1022",
            borderRadius: 13,
          }}
        >
          {/* < */}
          <div
            style={{
              width: 14,
              height: 14,
              borderLeft: "5px solid #818cf8",
              borderBottom: "5px solid #818cf8",
              transform: "rotate(45deg)",
              marginRight: 3,
            }}
          />
          {/* / */}
          <div
            style={{
              width: 5,
              height: 26,
              background: "linear-gradient(180deg, #a78bfa, #22d3ee)",
              borderRadius: 3,
              transform: "rotate(18deg)",
              marginLeft: 2,
              marginRight: 2,
            }}
          />
          {/* > */}
          <div
            style={{
              width: 14,
              height: 14,
              borderTop: "5px solid #22d3ee",
              borderRight: "5px solid #22d3ee",
              transform: "rotate(45deg)",
              marginLeft: 3,
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
