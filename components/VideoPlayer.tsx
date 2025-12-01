import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../types';
import { ArrowLeft, Play, Pause, RotateCcw, FastForward, Clock } from 'lucide-react';

interface VideoPlayerProps {
    onBack: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ onBack }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [timerActive, setTimerActive] = useState(false);
    const [timerCount, setTimerCount] = useState(10);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Mock video functionality
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const changeSpeed = () => {
        const newSpeed = speed === 1 ? 0.75 : speed === 0.75 ? 0.5 : 1;
        setSpeed(newSpeed);
        if (videoRef.current) videoRef.current.playbackRate = newSpeed;
    };

    const activateTimer = () => {
        setTimerActive(true);
        setTimerCount(10);
    };

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (timerActive && timerCount > 0) {
            interval = setInterval(() => setTimerCount(c => c - 1), 1000);
        } else if (timerCount === 0) {
            setTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [timerActive, timerCount]);

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 bg-gradient-to-b from-black/60 to-transparent">
                <button onClick={onBack} className="text-white p-2 rounded-full hover:bg-white/20 transition-all">
                    <ArrowLeft size={24} />
                </button>
                <span className="text-white font-medium">Урок 4: Глубокое дыхание</span>
                <div className="w-8"></div>
            </div>

            {/* Video Area */}
            <div className="flex-1 relative flex items-center justify-center bg-gray-900">
                <video 
                    ref={videoRef}
                    className="w-full max-h-full"
                    poster="https://picsum.photos/600/800"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" 
                    onTimeUpdate={(e) => setProgress((e.currentTarget.currentTime / e.currentTarget.duration) * 100)}
                    onEnded={() => setIsPlaying(false)}
                    playsInline
                />
                
                {/* Custom Overlay Controls for Exercise */}
                {timerActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
                        <div className="text-center">
                            <p className="text-primary-300 font-bold text-xl mb-2">Напряжение</p>
                            <div className="text-7xl font-bold text-white tabular-nums">{timerCount}</div>
                            <p className="text-white/70 text-sm mt-2">Держите мышцы в тонусе</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="bg-gray-900 p-6 space-y-4 pb-12 rounded-t-3xl">
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>

                <div className="flex items-center justify-between">
                    <button 
                        onClick={changeSpeed}
                        className="text-white/80 text-xs font-bold bg-white/10 px-3 py-1.5 rounded-lg w-12 text-center"
                    >
                        {speed}x
                    </button>

                    <div className="flex items-center gap-6">
                        <button onClick={() => { if(videoRef.current) videoRef.current.currentTime -= 10; }} className="text-white/70 hover:text-white">
                            <RotateCcw size={24} />
                        </button>
                        
                        <button 
                            onClick={togglePlay}
                            className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-500/30 hover:scale-105 transition-all"
                        >
                            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                        </button>

                        <button onClick={() => { if(videoRef.current) videoRef.current.currentTime += 10; }} className="text-white/70 hover:text-white">
                            <FastForward size={24} />
                        </button>
                    </div>

                    <button 
                        onClick={activateTimer}
                        className={`p-2 rounded-full transition-all ${timerActive ? 'text-primary-400 bg-primary-900/30' : 'text-white/80 hover:bg-white/10'}`}
                    >
                        <Clock size={24} />
                    </button>
                </div>
                
                <p className="text-center text-gray-500 text-xs mt-4">
                    Не задерживайте дыхание во время выполнения
                </p>
            </div>
        </div>
    );
};

export default VideoPlayer;