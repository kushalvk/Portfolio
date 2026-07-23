import { ImageResponse } from "next/og";

// The Node runtime of @vercel/og has a broken file-URL resolution on Windows;
// the edge runtime bundle works everywhere (locally and on Vercel).
export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon: same </> mark, scaled up with more padding
// (iOS applies its own rounded mask).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6, #22d3ee)",
          padding: 8,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0d1022",
            borderRadius: 32,
          }}
        >
          {/* < */}
          <div
            style={{
              width: 38,
              height: 38,
              borderLeft: "13px solid #818cf8",
              borderBottom: "13px solid #818cf8",
              transform: "rotate(45deg)",
              marginRight: 9,
            }}
          />
          {/* / */}
          <div
            style={{
              width: 13,
              height: 72,
              background: "linear-gradient(180deg, #a78bfa, #22d3ee)",
              borderRadius: 7,
              transform: "rotate(18deg)",
              marginLeft: 6,
              marginRight: 6,
            }}
          />
          {/* > */}
          <div
            style={{
              width: 38,
              height: 38,
              borderTop: "13px solid #22d3ee",
              borderRight: "13px solid #22d3ee",
              transform: "rotate(45deg)",
              marginLeft: 9,
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
