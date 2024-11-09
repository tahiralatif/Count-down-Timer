"use client";   //iska mtlab h hamara componenet browser pr chale ga

import{ useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Countdown(){
    const [duration, setDuration] = useState<number | string>(""); 
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const handleSetDuration = (): void => {
        if(typeof duration === "number" && duration > 0){
            setTimeLeft(duration);
            setIsActive(false);
            setIsPaused(false);
            if(timerRef. current){
                clearInterval(timerRef.current);
            }
        }
    };
    const handleStart = (): void =>{
        if(timeLeft > 0){
            setIsActive(true);
            setIsPaused(false)
        }
    };

    const handlePause = (): void => {
        if(isActive){
            setIsPaused(true);
            setIsActive(false);
            if(timerRef.current){
                clearInterval(timerRef.current);
            }
        }
    };

    const handleReset = (): void => {
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number"? duration : 0);
        if(timerRef.current){
            clearInterval(timerRef.current);
        }
    };

    useEffect(() => {
        if(isActive && !isPaused){
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if(prevTime <= 1){
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prevTime -1;
                });
            }, 1000);
        };

        return () => { if(timerRef.current){
            clearInterval(timerRef.current)}  
        };
    } ,[isActive , isPaused]);
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time/60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2 , "0")}: ${String(seconds).padStart(2 , "0")} `
    };

    const handleDurationChange = (e: ChangeEvent <HTMLInputElement>):void => {
        setDuration(Number(e.target.value) || ""); 
    };

    return (
        // Container div for cebtering the content

        <div className=" flex flex-col items-center justify-center h-screen bg-gray-900 dark:bg-gray-950">
            {/* timer box container */}
            <div className=" bg-gray-200 dark:bg-gray-950 shadow-lg rounded-lg p-8 w-full h-[70%] max-w-md">
                {/* tittle of countdown timer */}
                <h1 className="text-2xl font-bold mb-4 text-gray-950 dark:text-gray-200 text-center ">
                    Countdown Timer
                </h1>
                {/* Input and set button container */}
                <div className="flex item-centre mb-6">
                <Input type="number" 
                id="duration" 
                placeholder="Enter duration in seconds"
                 value={duration}
                 onChange={handleDurationChange}
                 className="flex-1 mr-4 rounded-md border-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                 />
                 <Button onClick={handleSetDuration}
                  variant= "outline"               
                 className="text-gray-900 dark:text-gray-300"
                 >
                    Set
                 </Button>
                 </div>
                 {/* Display the formated time left */}
                 <div className="text-6xl font-bold text-gray-900 dark:text-gray-300 mb-8 text-center">
                    {formatTime(timeLeft)}
                 </div>
                 {/* buttons to start pause , reset the timer */}
                 <div className="flex justify-center gap-4">
                    <Button onClick={handleStart}
                    variant="outline"
                    className="text-gray-900 dark:text-gray-300">
                        {isPaused ? "Resume" : "Start"}
                    </Button>
                    <Button onClick={handlePause}
                    variant="outline"
                    className="text-gray-900 dark:300">Pause</Button>
                    <Button onClick={handleReset}
                    variant="outline"
                    className="text-gray-900 dark:bg-gray-300">Reset
                    </Button>
                 </div>
            </div>
        </div>
    )

}
