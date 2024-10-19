import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";

  interface popUpProp {
    trigger: React.ReactNode;
    title: React.ReactNode;
    content: React.ReactNode;
    description?: React.ReactNode;

  }

const DialogProp:React.FC<popUpProp> = ({trigger, title, content, description}) => {
  return (
    <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent className="sm:max-w-[425px] md:max-w-[590px]">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold sm:text-3xl">
          {title}
        </DialogTitle>
        <DialogDescription>
          {description}
        </DialogDescription>
      </DialogHeader>

       {content}
      
    
    </DialogContent>
  </Dialog>
  )
}

export default DialogProp