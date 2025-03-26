import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface WhitelistDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (whitelist: boolean, notes: string) => void;
  userName: string;
}

const WhitelistDialog: React.FC<WhitelistDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  userName,
}) => {
  const [whitelist, setWhitelist] = useState(false);
  const [notes, setNotes] = useState("");

  const handleConfirm = () => {
    onConfirm(whitelist, notes);
    setWhitelist(false);
    setNotes("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Clear Risk Flag</DialogTitle>
          <DialogDescription>
            Are you sure you want to clear the risk flag for {userName}?
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="whitelist"
              checked={whitelist}
              onCheckedChange={(checked) => setWhitelist(checked as boolean)}
            />
            <Label htmlFor="whitelist">
              Whitelist user for future risk checks
            </Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any notes about why this user was cleared..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Clear Risk Flag
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WhitelistDialog; 