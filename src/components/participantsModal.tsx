import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import GuestCard from "./GuestCard";

interface PropsT {
    guests: string[];
    btnTxt: string;
    host: string;
}

const ParticipantsModal: React.FC<PropsT> = ({ guests, btnTxt, host }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <a className="cursor-pointer text-blue-900">{btnTxt}</a>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-4xl">{host}&apos;s bringing {guests.length} guest{guests.length > 1 && "s"}.</DialogTitle>
                    <DialogDescription className="text-base flex flex-col gap-2">
                        <div className="max-h-40 overflow-auto flex flex-col gap-2 mt-5">
                            {guests.map((g) => (
                                <GuestCard key={g} name={g}/>
                            ))}
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-3">
                    <DialogClose asChild>
                        <Button variant={"secondary"}>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ParticipantsModal;
