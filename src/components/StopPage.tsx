import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios"
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

export default function StopPage() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { toast } = useToast();
    const { startLoading, stopLoading } = useLoading();
    const [phoneNumber, setPhoneNumber] = useState("");

    const checkValue = async (event: React.MouseEvent) => {
        if (!phoneNumber) {
            event.preventDefault()
            toast({
                title: "Instagram handle needed!",
                description: "In order to delete account details we need a phone number!",
                variant: "destructive"
            });
            return;
        }
    }


    const submitPage = async () => {
        startLoading();
       
        await axios.post(`${apiUrl}/delete-user`, {
            number: phoneNumber
        }).then(() => {
            setPhoneNumber("")
            toast({
                title: "Success!",
                description: `Your details have successfully been deleted!`,
                variant: "success"
            });
        }).catch((e) => {
            console.log(e);
            toast({
                title: "Server Error",
                description: "Unable to delete user data. Is the number correct?",
                variant: "destructive"
            });
        }).finally(() => {
            stopLoading()
        })
    };

    return (
        <div className="flex flex-col items-center p-4">
            <div className="w-full max-w-2xl shadow-md rounded-lg p-6 flex flex-col gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-6 text-center">Stop Receiving Messages</h1>
                    <p className="text-base">
                        Doing this will delete your user records including your name and phone number.
                        If you change your mind you must fill out the invite form again. You can do that
                        <Link to={'/'} className="text-blue-900"> here</Link>.
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xl">Phone Number</label>
                    <input 
                        type="text"
                        placeholder="3600000000"
                        className="p-1 w-full text-base"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        maxLength={100}
                    />
                </div>
                <div className="flex justify-center mt-6">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button 
                            className="px-6 py-2 text-lg font-semibold bg-blue-500 text-white rounded-md w-64 hover:bg-blue-400"
                            onClick={checkValue}
                            >
                                Delete my records
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-2xl">Are you sure</DialogTitle>
                                <DialogDescription className="text-base">
                                    Are you sure you want to stop receiving messages?
                                    This cannot be undone.
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
            </div>
        </div>
    );
}