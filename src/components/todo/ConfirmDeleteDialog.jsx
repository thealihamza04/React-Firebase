import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/animate-ui/icons/loader.tsx";

const ConfirmDeleteDialog = ({
  open,
  onOpenChange,
  title,
  isDeleting,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card shadow-black/60 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <DialogHeader>
          <DialogTitle className="text-left">Delete this todo?</DialogTitle>
          <DialogDescription className="text-left">
            This action cannot be undone. This will permanently delete the todo "{title}".
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? <Loader animateOnView /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;

