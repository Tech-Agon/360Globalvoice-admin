import React, { ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface userDialog {
  trigger: ReactNode;
  username: string;
  description: string;
  deletFunc: () => void;
  isLoading?: boolean;
}

const DeleteUser: React.FC<userDialog> = ({
  trigger,
  description,
  username,
  deletFunc,
  isLoading,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>{trigger}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{username} Data</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className=" grid grid-cols-2 gap-4">
          <button
            onClick={deletFunc}
            className=" px-6 py-2 text-white max-md:text-sm font-medium bg-[#fe2530]  active:bg-gray-900 rounded-lg duration-150"
          >
            {isLoading ? "Loading..." : "Delete"}
          </button>
          <DialogClose asChild>
            <button className=" px-6 py-2 text-white max-md:text-sm font-medium bg-[#8725FE]  active:bg-gray-900 rounded-lg duration-150">
              Close
            </button>
          </DialogClose>
        </div>
        <DialogFooter className="sm:justify-start">360Globalvoice</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
