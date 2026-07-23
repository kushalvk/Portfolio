"use client";

import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export function PrintButton() {
  return (
    <Button
      onClick={() => window.print()}
      className="bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/30 hover:brightness-110"
    >
      <DownloadIcon className="mr-2 size-4" />
      Download PDF
    </Button>
  );
}
