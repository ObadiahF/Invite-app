import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import GuestCard from "./GuestCard";

interface GoingDialogProps {
    guest: string;
    guests: string[];
    setGuest: React.Dispatch<React.SetStateAction<string>>;
    addGuest: (e: React.MouseEvent) => void;
    removeGuest: (name: string) => void;
    submitYes: (e: React.MouseEvent) => void;
    btnTxt: string;
}

const GoingDialog: React.FC<GoingDialogProps> = ({ guest, guests, setGuest, addGuest, removeGuest, submitYes, btnTxt }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>{btnTxt}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-4xl">Are you sure you&apos;re going?</DialogTitle>
                    <DialogDescription className="text-base flex flex-col gap-2">
                        You can change this later.
                        <label htmlFor="" className="mt-4">
                            Add Guest
                        </label>
                        <div className="flex gap-3">
                            <input
                                type="text"
                                className="px-2"
                                placeholder="Guest name"
                                value={guest}
                                onChange={(e) => setGuest(e.target.value)}
                            />
                            <Button variant={"outline"} className="px-6" onClick={addGuest}>
                                Add
                            </Button>
                        </div>
                        <div className="max-h-40 overflow-auto flex flex-col gap-2 mt-5">
                            {guests.length > 0 && <h2>Guests</h2>}
                            {guests.map((g) => (
                                <GuestCard key={g} name={g} onButtonClick={() => removeGuest(g)} />
                            ))}
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-3">
                    <Button type="submit" onClick={submitYes}>
                        Yes
                    </Button>
                    <DialogClose asChild>
                        <Button variant={"secondary"}>No</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default GoingDialog;
