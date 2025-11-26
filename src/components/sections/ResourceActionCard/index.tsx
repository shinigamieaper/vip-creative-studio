"use client";

import React, { useState } from "react";
import { Video, Download, Play, FileSpreadsheet, Check, Users, BookOpen } from "lucide-react";
import { ResourceLeadModal, PrimaryCtaButton } from "@/components";

interface Speaker {
  name: string;
  role: string;
  avatar?: string;
}

interface WebinarData {
  date: string;
  time: string;
  duration: number;
  registrationUrl?: string;
  recordingUrl?: string;
  speakers?: Speaker[];
  isLive?: boolean;
}

interface DownloadableData {
  format: string;
  fileSize?: string;
  downloadUrl: string;
  previewImages?: string[];
  features?: string[];
}

export interface ResourceActionCardProps {
  resourceType: "Webinar" | "Template" | "Tool" | "Ebook";
  resourceTitle: string;
  webinar?: WebinarData;
  downloadable?: DownloadableData;
}

export function ResourceActionCard({
  resourceType,
  resourceTitle,
  webinar,
  downloadable
}: ResourceActionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isWebinar = resourceType === "Webinar";
  const isTemplate = resourceType === "Template";
  const isTool = resourceType === "Tool";
  const isEbook = resourceType === "Ebook";
  const isDownloadType = isTemplate || isTool || isEbook;

  // Icon based on type
  const TypeIcon = isWebinar ? Video : isEbook ? BookOpen : isTemplate ? FileSpreadsheet : Download;

  // Format label for downloads
  const formatLabel = downloadable?.format || (isEbook ? "PDF" : isTemplate ? "Spreadsheet" : "File");

  const handleSubmit = (data: { email: string; companyName: string }) => {
    // Log lead data - backend integration will handle actual email sending
    console.log("Lead captured:", data, {
      resourceType,
      resourceTitle,
      downloadUrl: downloadable?.downloadUrl,
      webinarUrl: webinar?.registrationUrl || webinar?.recordingUrl
    });
    
    // TODO: Send to backend API to:
    // 1. Save lead to database/CRM
    // 2. Add to newsletter
    // 3. Send email with download link or webinar confirmation
    
    // Modal will show success state with confetti - don't close it here
  };

  return (
    <>
      {/* Webinar Action Card - Always show for webinars */}
      {isWebinar && (
        <div className="bg-primary rounded-2xl p-6 sm:p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent-secondary/20 flex items-center justify-center">
              <Video className="w-6 h-6 text-accent-secondary" />
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase tracking-wider">
                {webinar?.isLive ? "Upcoming Webinar" : "On-Demand Recording"}
              </p>
              <p className="font-heading font-bold text-lg">
                {webinar?.isLive ? webinar.date : "Watch Now"}
              </p>
            </div>
          </div>

          {webinar?.isLive && webinar.date && (
            <div className="bg-white/10 rounded-xl p-4 mb-5">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-white/70">Date</span>
                <span className="font-medium">{webinar.date}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-white/70">Time</span>
                <span className="font-medium">{webinar.time}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70">Duration</span>
                <span className="font-medium">{webinar.duration} minutes</span>
              </div>
            </div>
          )}

          <PrimaryCtaButton
            type="button"
            variant="whiteTeal"
            withArrow
            onClick={() => setIsModalOpen(true)}
            className="w-full justify-center gap-2"
          >
            <span>{webinar?.isLive ? "Save My Seat" : "Watch Recording"}</span>
          </PrimaryCtaButton>

          <p className="text-white/50 text-xs text-center mt-3">
            {webinar?.isLive
              ? "Free registration • Calendar invite included"
              : "Free to watch • Get recording link via email"}
          </p>
        </div>
      )}

      {/* Template/Tool/Ebook Download Card - Always show for download types */}
      {isDownloadType && (
        <div className="bg-card rounded-2xl p-6 sm:p-8 border border-standard shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-accent-secondary/10 flex items-center justify-center">
              <TypeIcon className="w-6 h-6 text-accent-secondary" />
            </div>
            <div>
              <p className="text-primary/50 text-xs uppercase tracking-wider">Free Download</p>
              <p className="font-heading font-bold text-primary">{formatLabel}</p>
            </div>
          </div>

          {downloadable?.features && downloadable.features.length > 0 && (
            <div className="mb-5">
              <p className="text-[11px] text-primary/50 uppercase tracking-[0.18em] mb-3">
                What's included
              </p>
              <ul className="space-y-2">
                {downloadable.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-primary/75">
                    <Check className="w-4 h-4 text-accent-secondary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <PrimaryCtaButton
            type="button"
            variant="primary"
            withArrow={false}
            onClick={() => setIsModalOpen(true)}
            className="w-full justify-center gap-2"
          >
            <Download className="w-5 h-5 mr-2" />
            <span>Get Free Download</span>
          </PrimaryCtaButton>

          {downloadable?.fileSize && (
            <p className="text-primary/40 text-xs text-center mt-3">
              {downloadable.format} • {downloadable.fileSize}
            </p>
          )}
        </div>
      )}

      {/* Lead Capture Modal */}
      <ResourceLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        resourceTitle={resourceTitle}
        resourceType={isWebinar ? "webinar" : "download"}
        downloadFormat={formatLabel}
      />
    </>
  );
}

export default ResourceActionCard;
