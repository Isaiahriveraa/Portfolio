"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, X, Expand, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

/**
 * Resume Preview Card with Click-to-Expand Modal.
 * Modal is always rendered (hidden) so PDF is pre-loaded for instant display.
 */
export function ResumePreview() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  const handleResetZoom = () => setZoomLevel(1);

  const handleClose = () => {
    setIsExpanded(false);
    setZoomLevel(1);
  };

  // Close on Escape & Lock Body Scroll
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  return (
    <>
      {/* Resume Card (Thumbnail) */}
      <div className="relative z-10 flex justify-center">
        <motion.div
          onClick={() => setIsExpanded(true)}
          whileTap={{ scale: 0.98 }}
          className="group relative cursor-pointer aspect-[8.5/11] w-full max-w-sm overflow-hidden rounded-xl border border-border bg-white shadow-2xl"
        >
          {/* Resume PDF */}
          <iframe
            src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
            title="Resume Thumbnail"
            className="pointer-events-none h-full w-full scale-[1.02] border-none"
            tabIndex={-1}
          />

          {/* Click to expand hint */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40"
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.span
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-background shadow-lg backdrop-blur-md rounded-full"
              style={{
                background: "rgba(16, 185, 129, 0.9)",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Expand size={14} />
              Click to View Full
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Full Screen Modal - Always rendered, visibility controlled by CSS */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isExpanded
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isExpanded}
      >
        {/* Backdrop - blur only */}
        <div
          className="absolute inset-0 backdrop-blur-lg"
          onClick={handleClose}
        />

        {/* Modal Content */}
        <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
          <div
            className={`relative aspect-[8.5/11] h-[90vh] overflow-hidden rounded-lg pointer-events-auto transition-transform duration-300 ease-out ${
              isExpanded ? "translate-y-0" : "translate-y-full"
            }`}
            style={{
              boxShadow:
                "0 0 60px 20px rgba(16, 185, 129, 0.3), 0 0 100px 40px rgba(16, 185, 129, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrollable PDF Area */}
            <div className="h-full w-full overflow-auto">
              <div
                className="h-full w-full transition-transform duration-200 ease-out"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "top left",
                }}
              >
                <iframe
                  src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitV"
                  title="Resume Full"
                  className="h-full w-full border-none"
                />
              </div>
            </div>

            {/* Floating Action Bar */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-surface-elevated/90 p-2 shadow-xl backdrop-blur-md border border-border z-50">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 border-r border-border pr-2 mr-1">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="rounded-full p-2 text-text-muted hover:bg-surface hover:text-foreground disabled:opacity-50 transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  onClick={handleResetZoom}
                  disabled={zoomLevel === 1}
                  className="rounded-full p-2 text-text-muted hover:bg-surface hover:text-foreground disabled:opacity-50 transition-colors"
                  title="Reset Zoom"
                >
                  <RotateCcw size={16} />
                </button>
                <span className="min-w-12 text-center text-xs font-medium text-text-muted">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2.5}
                  className="rounded-full p-2 text-text-muted hover:bg-surface hover:text-foreground disabled:opacity-50 transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn size={18} />
                </button>
              </div>

              {/* Divider */}
              <div className="h-4 w-px bg-border mx-1" />

              {/* Main Actions */}
              <a
                href="/resume.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-background hover:bg-primary-hover transition-colors"
              >
                <Download size={16} />
                Download
              </a>

              <button
                onClick={handleClose}
                className="rounded-full p-2 text-text-muted hover:bg-surface hover:text-foreground transition-colors"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
