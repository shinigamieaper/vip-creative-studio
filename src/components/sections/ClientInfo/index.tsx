"use client";

import React from "react";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Client } from "@/lib/resources/data";

export interface ClientInfoProps extends React.ComponentPropsWithoutRef<"div"> {
  client: Client;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ client, className, ...props }) => {
  return (
    <div className={cn("bg-card border border-standard rounded-2xl p-6", className)} {...props}>
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-full bg-accent-primary/10 flex items-center justify-center">
          <Building2 className="w-6 h-6 text-accent-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-black text-lg leading-tight text-primary mb-1">
            {client.name}
          </h3>
          {client.industry && (
            <p className="text-sm text-primary/60 mb-2">{client.industry}</p>
          )}
          {client.description && (
            <p className="text-sm text-primary/80 leading-relaxed">
              {client.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
