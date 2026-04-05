"use client";

import { ChevronRight } from "lucide-react";

const BackToTop = () => {
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center shadow-xl z-50 hover:scale-110 transition-transform"
    >
      <ChevronRight className="-rotate-90" />
    </button>
  );
};

export default BackToTop;
