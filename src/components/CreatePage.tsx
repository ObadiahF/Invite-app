import React, { useState, useEffect } from "react";
import axios from "axios"
import { CalendarIcon, Map, MapPinIcon, Monitor, Pen, Tag } from "lucide-react";
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

export default function CreatePage() {
    const apiUrl = import.meta.env.VITE_API_URL;
    interface location {
        name: string,
        address: string,
    }

    const { toast } = useToast();
    const { startLoading, stopLoading } = useLoading();
    const [evName, setEvName] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [shortName, setShortName] = useState("");
    const [token, setToken] = useState("");
    const [desc, setDesc] = useState("");
    const [selectedBtn, setSelectedBtn] = useState("");
    const common = [
        { name: "Itech", address: "16100 NE 50th Ave, Vancouver, WA 98686"},
        { name: "Kiwanis Park", address: "422 SW 2nd Ave, Battle Ground, WA 98604"}
    ]

    useEffect(() => {
        const t = localStorage.getItem("token");
        if (t) {
            setToken(t);
        }
    }, []);

    useEffect(() => {
        const selected = common.find((e) => e.name === selectedBtn)
        if (selected?.name !== shortName || selected?.address !== address) {
            setSelectedBtn("");
        }

    }, [address, shortName])

    const checkValues = (e: React.MouseEvent) => {
        localStorage.setItem("token", token);
        if (!evName || !date || !address || !token) {
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
        axios.post(`${apiUrl}/create`, {
            name: evName,
            description: desc,
            location: address,
            short_name: shortName,
            date_and_time: date,
            going: [],
            not_going: [],
            access_token: token
        }).then((r) => {
            const link = r.data.link
            const url = `${import.meta.env.VITE_CLIENT_URL}/event/${link}`
            toast({
                title: "Success!",
                description: `Event Created! Redirecting...`,
                variant: "success"
            });
            window.location.href = url;
        })
        .catch((e) => {
            event.preventDefault();
            const errorMsg = e.response?.data?.error;
            console.log(e)
            if (errorMsg) {
                toast({
                    title: "Unable to Create Event!",
                    description: errorMsg,
                    variant: "destructive"
                });
            } else {
                toast({
                    title: "Server Error!",
                    description: "A server error has occurred, please try again later...",
                    variant: "destructive"
                });
            }
        }).finally(() => {
            stopLoading() //stop top spinner
        })
    };

    const setLocation = (e: React.MouseEvent, location: location) => {
        e.preventDefault()
        const { name, address } = location;

        setShortName(name);
        setAddress(address);
        setSelectedBtn(name);
    }

    return (
        <div className="flex flex-col items-center p-4">
            <div className="w-full max-w-2xl shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Create Event</h1>
                <form className="space-y-4">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <Tag className="h-6 w-6 text-gray-500" />
                            <label className="text-lg font-semibold">Event Name</label>
                        </div>
                        <input
                            type="text"
                            className="px-4 py-2 border rounded-md"
                            placeholder="Event Name"
                            value={evName}
                            onChange={(e) => setEvName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <Map className="h-6 w-6 text-gray-500" />
                            <label className="text-lg font-semibold">Location</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                className="px-4 py-2 border rounded-md w-full"
                                placeholder="16100 NE 50th Ave, Vancouver, WA 98686"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="text-l font-bold">Common Locations</h1>
                            <div className="flex gap-3">
                                {common.map((l) => {
                                    return <Button 
                                        variant={selectedBtn === l.name ? "default" : "secondary"}
                                        onClick={(e) => setLocation(e, l)}
                                        key={l.name}
                                    >
                                    {l.name}
                                    </Button>
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="h-6 w-6 text-gray-500" />
                            <label className="text-lg font-semibold">Short Name (Optional)</label>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <input
                                type="text"
                                className="px-4 py-2 border rounded-md w-full"
                                placeholder="Itech"
                                value={shortName}
                                onChange={(e) => setShortName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-6 w-6 text-gray-500" />
                            <label className="text-lg font-semibold">Date &amp; Time</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                className="px-4 py-2 border rounded-md w-full"
                                placeholder="Friday, June 12, 7-9pm"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <Monitor className="h-6 w-6 text-gray-500" />
                            <label className="text-lg font-semibold">Access Token</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                className="px-4 py-2 border rounded-md w-full"
                                placeholder="Access Token"
                                value={token}
                                onChange={(e) => setToken(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <Pen className="h-6 w-6 text-gray-500" />
                            <label className="text-lg font-semibold">Description</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <textarea
                                className="px-4 py-2 border rounded-md w-full"
                                placeholder="A fun party."
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="px-6 py-2 text-lg font-semibold bg-blue-500 text-white rounded-md w-64 hover:bg-blue-400" onClick={checkValues}>
                                    Create
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-2xl">Create Event?</DialogTitle>
                                    <DialogDescription className="text-base">
                                        {`Are you sure you want to create an event called ${evName}?`}
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
