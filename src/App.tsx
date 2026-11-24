/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PhoneColorId } from './types.ts';
import { PHONE_COLORS } from './data/colors.ts';
import { Navbar } from './components/Navbar.tsx';
import { Phone3DStage } from './components/Phone3DStage.tsx';
import { ColorShowcase } from './components/ColorShowcase.tsx';
import { DuoOSSimulator } from './components/DuoOSSimulator.tsx';
import { BentoGrid } from './components/BentoGrid.tsx';
import { SpecsComparison } from './components/SpecsComparison.tsx';
import { PreOrderModal } from './components/PreOrderModal.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [selectedColor, setSelectedColor] = useState<PhoneColorId>('nightsky');
  const [preorderModalOpen, setPreorderModalOpen] = useState<boolean>(false);

  const activeColor = PHONE_COLORS[selectedColor];

  return (
    <div
      style={
        {
          '--theme-accent': activeColor.accent,
        } as React.CSSProperties
      }
      className="bg-black text-neutral-100 font-sans antialiased overflow-x-hidden selection:bg-sky-500 selection:text-white min-h-screen relative"
    >
      {/* Sticky Glass Header */}
      <Navbar
        activeColor={activeColor}
        onOpenPreorder={() => setPreorderModalOpen(true)}
      />

      {/* Main Content */}
      <main>
        {/* Flagship 3D Folding Stage with Real GLB Hardware Model */}
        <Phone3DStage
          activeColor={activeColor}
          onSelectColor={(colorId) => setSelectedColor(colorId)}
          onOpenPreorder={() => setPreorderModalOpen(true)}
        />

        {/* Dedicated Color Showcase (Night Sky & Star White Only) */}
        <ColorShowcase
          activeColor={activeColor}
          onSelectColor={(colorId) => setSelectedColor(colorId)}
        />

        {/* DuoOS Multitasking Simulator with Smooth Fluid Physics */}
        <DuoOSSimulator activeColor={activeColor} />

        {/* Hardware Innovation Bento Grid */}
        <BentoGrid activeColor={activeColor} />

        {/* Technical Specs Comparison Table */}
        <SpecsComparison activeColor={activeColor} />
      </main>

      {/* Quiet Footer */}
      <Footer
        activeColor={activeColor}
        onOpenPreorder={() => setPreorderModalOpen(true)}
      />

      {/* Pre-Order Modal */}
      <PreOrderModal
        isOpen={preorderModalOpen}
        onClose={() => setPreorderModalOpen(false)}
        activeColor={activeColor}
        onSelectColor={(colorId) => setSelectedColor(colorId)}
      />
    </div>
  );
}
