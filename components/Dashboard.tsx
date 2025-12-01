import React from 'react';
import { UserProfile, ViewState } from '../types';
import { Flame, Play, Calendar, Bell } from 'lucide-react';

interface DashboardProps {
    user: UserProfile;
    onChangeView: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onChangeView }) => {
    return (
        <div className="p-6 space-y-6 pb-24">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="pr-12"> {/* Padding right to avoid overlap with theme toggle */}
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">Привет, {user.name}! 🌸</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors">Время уделить внимание себе.</p>
                </div>
                {/* Bell icon removed or moved if needed, but keeping layout simple. The theme toggle is now in Layout at top right. */}
                {/* <button className="p-2 bg-white rounded-full shadow-sm text-gray-600 relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-primary-500 rounded-full"></span>
                </button> */}
            </div>

            {/* Streak Card */}
            <div className="bg-gradient-to-r from-secondary-500 to-primary-400 dark:from-secondary-600 dark:to-primary-600 rounded-3xl p-6 text-white shadow-lg shadow-primary-200/50 dark:shadow-none flex items-center justify-between transition-colors">
                <div>
                    <p className="text-primary-100 text-sm font-medium mb-1">Ваша серия</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold">{user.streak}</span>
                        <span className="text-lg opacity-90">дней</span>
                    </div>
                    <p className="text-xs text-primary-50 mt-2 opacity-80">Вы умница! Так держать!</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Flame size={32} className="text-yellow-300" fill="currentColor" />
                </div>
            </div>

            {/* Today's Workout */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white transition-colors">Тренировка на сегодня</h2>
                    <span className="text-xs font-semibold text-primary-500 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-300 px-3 py-1 rounded-full transition-colors">15 мин</span>
                </div>
                
                <div className="bg-white dark:bg-neutral-800 rounded-3xl p-4 shadow-sm border border-gray-100 dark:border-neutral-700 transition-colors">
                    <div 
                        className="h-40 rounded-2xl bg-gray-200 dark:bg-neutral-700 mb-4 bg-cover bg-center relative overflow-hidden group cursor-pointer"
                        style={{ backgroundImage: 'url("https://picsum.photos/800/400?grayscale")' }}
                        onClick={() => onChangeView(ViewState.WORKOUT_PLAYER)}
                    >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-md">
                                <Play size={20} className="text-primary-500 ml-1" fill="currentColor" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-gray-100 transition-colors">Базовое укрепление</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">День 4 • Начинающий уровень</p>
                        </div>
                        <button 
                            onClick={() => onChangeView(ViewState.WORKOUT_PLAYER)}
                            className="bg-primary-500 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md shadow-primary-200 dark:shadow-none hover:bg-primary-600 transition-all"
                        >
                            Начать
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats / Navigation Tiles */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                    onClick={() => onChangeView(ViewState.PROGRESS)}
                    className="bg-white dark:bg-neutral-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-neutral-700 flex flex-col gap-3 items-start hover:border-primary-200 dark:hover:border-primary-700 transition-all"
                >
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl text-blue-500 dark:text-blue-400">
                        <Calendar size={20} />
                    </div>
                    <div className="text-left">
                        <span className="block font-bold text-gray-800 dark:text-gray-100 transition-colors">Дневник</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 transition-colors">Трекер симптомов</span>
                    </div>
                </button>
                <div className="bg-white dark:bg-neutral-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-neutral-700 flex flex-col gap-3 items-start transition-colors">
                    <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-xl text-green-500 dark:text-green-400">
                        <span className="font-bold text-sm">%</span>
                    </div>
                    <div className="text-left">
                        <span className="block font-bold text-gray-800 dark:text-gray-100 transition-colors">Прогресс</span>
                        <span className="text-xs text-gray-400 dark:text-gray-500 transition-colors">Курс пройден на 12%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;