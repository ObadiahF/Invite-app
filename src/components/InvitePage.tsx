import React, { useState } from "react";
import axios from "axios"
import { Phone, User } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLoading } from './top-loader/LoadingContext';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";

export default function InvitePage() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { toast } = useToast();
    const { startLoading, stopLoading } = useLoading();
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    const checkValues = (e: React.MouseEvent) => {
        if (!name || !phoneNumber) {
            e.preventDefault();
            toast({
                title: "Incomplete!",
                description: "All fields must be filled in order to create event.",
                variant: "destructive"
            });
        }
    };

    const submitPage = async (event: React.MouseEvent) => {
        startLoading(); //start top spinner
        
        axios.post(`${apiUrl}/invite`, {
            name,
            number: phoneNumber
        }).then(() => {
            toast({
                title: "Success!",
                description: `${name} has been added! They'll be notified of the next event.`,
                variant: "success"
            });
            setName("");
            setPhoneNumber("");
        })
            .catch(() => {
                event.preventDefault();
                    toast({
                        title: "Server Error!",
                        description: "A server error has occurred, please try again later...",
                        variant: "destructive"
                    });
            }).finally(() => {
                stopLoading() //stop top spinner
            })
    };

    return (
        <div className="flex flex-col items-center p-4">
            <div className="w-full max-w-2xl shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Invite Friend</h1>
                <form className="space-y-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <User className="h-6 w-6 text-gray-500" />
                            <label className="text-lg font-semibold">Name</label>
                        </div>
                        <input
                            type="text"
                            className="px-4 py-2 border rounded-md"
                            placeholder="Obadiah"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <Phone className="h-6 w-6 text-gray-500" />
                            <label className="text-lg font-semibold">Phone Number</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="tel"
                                className="px-4 py-2 border rounded-md w-full"
                                placeholder="3600000000"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                maxLength={10}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="px-6 py-2 text-lg font-semibold bg-blue-500 text-white rounded-md w-64 hover:bg-blue-400" onClick={checkValues}>
                                    Invite Friend
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-2xl">Invite Friend?</DialogTitle>
                                    <DialogDescription className="text-base">
                                        {`Are you sure you want to invite ${name}?`}
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="flex gap-3">
                                    <DialogClose asChild>
                                        <Button type="submit" onClick={submitPage}>
                                            Yes
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button variant={"secondary"}>No</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </form>
            </div>
        </div>
    );
}
