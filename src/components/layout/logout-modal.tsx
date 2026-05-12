"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LogoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LogoutModal({ open, onOpenChange }: LogoutModalProps) {
  function handleLogout() {
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Leaving already?</DialogTitle>
          <DialogDescription>
            You can log back in anytime to continue your meetings with Hintro.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
