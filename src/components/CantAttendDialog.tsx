import React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "./ui/button";

interface CantAttendDialogProps {
    submitNo: (m: string) => void;
    btnTxt: string;
}

const CantAttendDialog: React.FC<CantAttendDialogProps> = ({ submitNo, btnTxt }) => {
    const [message, setMessage] = useState("");
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">{btnTxt}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-4xl">
                        Are you sure you can&apos;t attend?
                    </DialogTitle>
                    <DialogDescription className="text-base flex flex-col gap-3">
                        You can change this later.
                        <div className="flex flex-col gap-2">
                            <label htmlFor="">Message (Optional)</label>
                            <input 
                                type="text" 
                                maxLength={100}
                                placeholder="I don't like to have fun"
                                className="px-3 py-1"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-3">
                    <Button type="submit" onClick={() => submitNo(message)}>Yes</Button>
                    <DialogClose asChild>
                        <Button variant={"secondary"}>No</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CantAttendDialog;
