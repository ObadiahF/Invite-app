import React, { useEffect, useState } from "react";
import { CalendarIcon, MapPinIcon, Users, CircleOffIcon } from "lucide-react";
import { Button } from "./ui/button";
import GuestCard from "./GuestCard";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import GoingDialog from "./GoingModal";
import CantAttendDialog from "./CantAttendDialog";
import ParticipantsModal from "./participantsModal";
import { useLoading } from "./top-loader/LoadingContext";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function HomePage() {
  const apiUrl = import.meta.env.VITE_API_URL;

  type modeType = "undecided" | "going" | "not going";
  interface Participant {
    name: string;
    extras: string[];
  }

  interface Not {
    name: string;
    message: string;
  }

  const { toast } = useToast();
  const { startLoading, stopLoading } = useLoading();
  const { eventId, uid } = useParams();

  const [username, setUsername] = useState("Guest");
  const [createdBy, setCreatedBy] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [not, setNot] = useState<Not[]>([]);
  const [guest, setGuest] = useState("");
  const [guests, setGuests] = useState<string[]>([]);
  const [mode, setMode] = useState<modeType>("undecided");
  const [evName, setEvName] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [shortName, setShortName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    startLoading();
    getEventData();
  }, []);

  useEffect(() => {
    // set mode
    if (participants.find((val) => val.name === username)) {
      setMode("going");
    } else if (not.find((val) => val.name === username)) {
      setMode("not going");
    } else {
      setMode("undecided");
    }
  }, [username]);

  const getEventData = async () => {
    try {
      const [eventResult, userResult] = await Promise.allSettled([
        axios.get(`${apiUrl}/event/${eventId}`),
        axios.get(`${apiUrl}/user/${uid}`)
      ]);

      if (eventResult.status === "fulfilled") {
        const eventData = eventResult.value.data;
        setEvName(eventData.name);
        setDate(eventData.date_and_time);
        setAddress(eventData.location);
        setShortName(eventData.short_name);
        setDesc(eventData.description);
        setCreatedBy(eventData.creator);
        setParticipants(eventData.going);
        setNot(eventData.not_going);
      } else {
        throw new Error("Failed to fetch event data");
      }

      if (userResult.status === "fulfilled") {
        const userData = userResult.value.data;
        setUsername(userData.name);
      } else {
        setUsername(`Guest ${Math.floor(Math.random() * 10_000)}`);
      }
    } catch (e) {
      console.log(e);
      window.location.href = "/event-not-found";
    } finally {
      stopLoading();
    }
  };

  const addGuest = (e: React.MouseEvent) => {
    if (!guest) {
      e.preventDefault();
      return;
    }

    setGuests([...guests, guest]);
    setGuest("");
  };

  const removeGuest = (n: string) => {
    setGuests((prevGuests) => prevGuests.filter((guest) => guest !== n));
  };

  const submitYes = async () => {
    const res = axios.post(`http://localhost:8080/edit/event/${eventId}`, {
      uid: uid,
      mode: "going",
      guests: guests,
      message: ""
    });

    if ((await res).status === 200) {
      setMode("going");
      toast({
        title: "Success!",
        description: `You have reserved a spot! You can change this later.`,
        variant: "success"
      });

      setParticipants([...participants, { name: username, extras: guests }]);
      setNot(not.filter((val) => val.name !== username));
    } else {
      toast({
        title: "Error!",
        description: `Server Error, please try again later...`,
        variant: "destructive"
      });
    }
  };

  const submitNo = async (message: string) => {
    const res = axios.post(`http://localhost:8080/edit/event/${eventId}`, {
      uid: uid,
      mode: "not going",
      message
    });

    if ((await res).status === 200) {
      setMode("not going");
      toast({
        title: "Success!",
        description: `You have replied with not attending! You can change this later.`,
        variant: "success"
      });

      setNot([...not, { name: username, message }]);
      setParticipants(participants.filter((val) => val.name !== username));
    } else {
      toast({
        title: "Error!",
        description: `Server Error, please try again later...`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <div className="w-full max-w-4xl bg-gray-900 shadow-md rounded-lg p-8">
        <header className="bg-gray-800 text-white p-4 rounded-t-lg">
          <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-lg sm:text-2xl mb-2 sm:mb-0">Created by: {createdBy}</h1>
            <span className="text-base sm:text-lg">Welcome, {username}</span>
          </div>
        </header>
        <section className="bg-gray-700 py-6 px-4 rounded-b-lg text-center">
          <h1 className="text-4xl font-bold text-gray-50">{evName}</h1>
          {desc && <p className="text-gray-50">{desc}</p>}
        </section>
        <div className="flex flex-col gap-6 mt-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-6 w-6 text-gray-500" />
              <label className="text-lg font-semibold">Location</label>
            </div>
            <p className="text-gray-500">{address} {shortName && `(${shortName})`}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-gray-500" />
              <label className="text-lg font-semibold">Date &amp; Time</label>
            </div>
            <p className="text-gray-500">{date}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-gray-500" />
              <label className="text-lg font-semibold">Going</label>
            </div>
            <ul className="flex flex-col space-y-1">
              {participants.length === 0 ? (
                <li className="text-gray-500">No participants yet.</li>
              ) : (
                participants.map((p) => (
                  <li key={p.name} className="text-gray-500">
                    {p.name}
                    {p.extras.length > 0 && (
                      <ParticipantsModal guests={p.extras} btnTxt={`  +${p.extras.length}`} host={p.name} />
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CircleOffIcon className="h-6 w-6 text-gray-500" />
              <label className="text-lg font-semibold">Not Going</label>
            </div>
            <ul className="flex flex-col space-y-1">
              {not.length === 0 ? (
                <li className="text-gray-500">No declines yet.</li>
              ) : (
                not.map((p) => (
                  <li key={p.name} className="text-gray-500">
                    {p.name}
                    {p.message !== "" && ` - ${p.message}`}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          {mode === "undecided" ? (
            <>
              <GoingDialog
                guest={guest}
                guests={guests}
                setGuest={setGuest}
                addGuest={addGuest}
                removeGuest={removeGuest}
                submitYes={submitYes}
                btnTxt={"I'm Going"}
              />
              <CantAttendDialog submitNo={submitNo} btnTxt={"Can't Attend"} />
            </>
          ) : mode === "going" ? (
            <CantAttendDialog submitNo={submitNo} btnTxt={"Currently attending, change status."} />
          ) : (
            <GoingDialog
              guest={guest}
              guests={guests}
              setGuest={setGuest}
              addGuest={addGuest}
              removeGuest={removeGuest}
              submitYes={submitYes}
              btnTxt={"Currently not attending, change status."}
            />
          )}
        </div>
      </div>
    </div>
  );
}
