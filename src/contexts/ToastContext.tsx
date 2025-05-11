
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';

interface ToastContextProps {
  children: ReactNode;
}

const ToastContext = createContext<null>(null);

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }: ToastContextProps) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
