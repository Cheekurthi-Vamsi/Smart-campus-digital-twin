import React from 'react';
import { ContainerScroll } from './ui/container-scroll-animation';

interface ScrollShowcaseProps {
  title: string;
  highlight: string;
  children: React.ReactNode;
}

/**
 * A reusable wrapper that places a ContainerScroll animation
 * between landing page sections. Each instance has a unique
 * title + gradient-highlighted text and wraps a dashboard/mockup
 * as its scroll-reveal content.
 */
export default function ScrollShowcase({ title, highlight, children }: ScrollShowcaseProps) {
  return (
    <section className="relative bg-dark-900">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-4xl font-semibold text-white mb-2">
                {title}
                <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none gradient-text">
                  {highlight}
                </span>
              </h2>
            </>
          }
        >
          <div className="h-full w-full bg-dark-900 rounded-2xl overflow-hidden relative">
            {/* Browser chrome header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Live</span>
              </div>
            </div>
            {/* Content */}
            <div className="p-4 md:p-6 h-[calc(100%-44px)] overflow-hidden">
              {children}
            </div>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
}
