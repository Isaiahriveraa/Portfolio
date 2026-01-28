"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, X, Expand, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

// Standard US Letter size in pixels (at 72 DPI)
const PDF_WIDTH = 612;
const PDF_HEIGHT = 792;

/**
 * Resume Preview Card with Click-to-Expand Modal.
 * Thumbnail scales PDF to fit container completely.
 */
export function ResumePreview() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [thumbnailScale, setThumbnailScale] = useState(0.5);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 1));
  const handleResetZoom = () => setZoomLevel(1);

  const handleClose = useCallback(() => {
    setIsExpanded(false);
    setZoomLevel(1);
  }, []);

  const handleOpen = useCallback(() => {
    setIsExpanded(true);
    // Focus modal after it opens for keyboard events
    setTimeout(() => {
      modalRef.current?.focus();
    }, 100);
  }, []);

  // Calculate thumbnail scale based on container size
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const containerWidth = container.offsetWidth;
      if (containerWidth > 0) {
        const scale = containerWidth / PDF_WIDTH;
        setThumbnailScale(scale);
      }
    };

    // Initial calculation
    updateScale();

    // Use ResizeObserver for reliable resize detection
    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  // Handle Escape key & Lock Body Scroll
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isExpanded) {
        handleClose();
      }
    };

    // Listen on document for escape regardless of focus
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isExpanded, handleClose]);

  return (
    <>
      {/* Resume Card (Thumbnail) */}
      <div className="relative z-10 flex justify-center">
        <div
          ref={containerRef}
          className="relative aspect-[8.5/11] w-full max-w-xs sm:max-w-sm"
        >
          <motion.div
            role="button"
            tabIndex={0}
            onClick={handleOpen}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleOpen();
              }
            }}
            whileTap={{ scale: 0.98 }}
            className="relative h-full w-full cursor-pointer overflow-hidden rounded-xl border border-border bg-white shadow-2xl"
          >
            {/* Resume PDF - rendered at full size then scaled down */}
            <div
              className="absolute top-0 left-0 origin-top-left"
              style={{
                width: `${PDF_WIDTH}px`,
                height: `${PDF_HEIGHT}px`,
                transform: `scale(${thumbnailScale})`,
              }}
            >
              <iframe
                src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                title="Resume Thumbnail"
                className="pointer-events-none h-full w-full border-none bg-white"
                tabIndex={-1}
              />
            </div>

            {/* Click to expand hint - INSIDE the card */}
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
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
      </div>

      {/* Full Screen Modal */}
      {isExpanded && (
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          className="fixed inset-0 z-50 outline-none"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop - blur only */}
          <div className="absolute inset-0 backdrop-blur-lg" />

          {/* Modal Content */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.15, delay: 0.05 }}
              className="relative aspect-[8.5/11] max-h-[85vh] w-full max-w-[min(90vw,calc(85vh*8.5/11))] overflow-hidden rounded-lg bg-white"
              style={{
                boxShadow:
                  "0 0 60px 20px rgba(16, 185, 129, 0.3), 0 0 100px 40px rgba(16, 185, 129, 0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* PDF Area */}
              <div className={`h-full w-full ${zoomLevel > 1 ? "overflow-auto" : "overflow-hidden"}`}>
                <div
                  className="h-full w-full transition-transform duration-200 ease-out"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "top left",
                  }}
                >
                  <iframe
                    src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=Fit"
                    title="Resume Full"
                    className="h-full w-full border-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* Floating Action Bar - Outside modal content for better touch targets */}
            <div
              className="absolute bottom-4 sm:bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-1 sm:gap-2 rounded-full bg-surface-elevated p-1.5 sm:p-2 shadow-xl border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Zoom Controls - Hidden on mobile */}
              <div className="hidden sm:flex items-center gap-1 border-r border-border pr-2 mr-1">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="rounded-full p-2 text-text-muted hover:bg-surface hover:text-foreground disabled:opacity-50 transition-colors"
                  title="Zoom Out"
                  type="button"
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  onClick={handleResetZoom}
                  disabled={zoomLevel === 1}
                  className="rounded-full p-2 text-text-muted hover:bg-surface hover:text-foreground disabled:opacity-50 transition-colors"
                  title="Reset Zoom"
                  type="button"
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
                  type="button"
                >
                  <ZoomIn size={18} />
                </button>
              </div>

              {/* Main Actions */}
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-background hover:bg-primary-hover transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Download size={16} />
                Download
              </a>

              <button
                onClick={handleClose}
                className="rounded-full p-2 text-text-muted hover:bg-surface hover:text-foreground transition-colors"
                title="Close (Esc)"
                type="button"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
