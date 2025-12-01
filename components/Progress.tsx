import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SymptomLog } from '../types';

// Mock data
const mockData: SymptomLog[] = [
    { date: 'Пн', discomfortLevel: 7, mood: 4, notes: '' },
    { date: 'Вт', discomfortLevel: 6, mood: 5, notes: '' },
    { date: 'Ср', discomfortLevel: 5, mood: 6, notes: '' },
    { date: 'Чт', discomfortLevel: 5, mood: 5, notes: '' },
    { date: 'Пт', discomfortLevel: 3, mood: 8, notes: '' },
    { date: 'Сб', discomfortLevel: 2, mood: 9, notes: '' },
    { date: 'Вс', discomfortLevel: 2, mood: 8, notes: '' },
];

interface ProgressProps {
    isDark?: boolean;
}

const Progress: React.FC<ProgressProps> = ({ isDark = false }) => {
    const [activeTab, setActiveTab] = useState<'chart' | 'journal'>('chart');
    const [todaySymptom, setTodaySymptom] = useState(5);

    const chartTextColor = isDark ? '#94a3b8' : '#94a3b8';
    const chartGridColor = isDark ? '#334155' : '#f1f5f9';
    const tooltipBgColor = isDark ? '#1e293b' : '#ffffff';
    const tooltipTextColor = isDark ? '#f1f5f9' : '#1e293b';

    return (
        <div className="p-6 pb-24 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors">Мой прогресс 📈</h1>

            {/* Toggle */}
            <div className="flex p-1 bg-gray-100 dark:bg-neutral-800 rounded-xl transition-colors">
                <button 
                    onClick={() => setActiveTab('chart')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'chart' ? 'bg-white dark:bg-neutral-700 text-gray-800 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                >
                    График
                </button>
                <button 
                    onClick={() => setActiveTab('journal')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'journal' ? 'bg-white dark:bg-neutral-700 text-gray-800 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
                >
                    Дневник
                </button>
            </div>

            {activeTab === 'chart' && (
                <div className="animate-fade-in space-y-6">
                    <div className="bg-white dark:bg-neutral-800 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-neutral-700 h-64 transition-colors">
                        <h3 className="text-sm font-bold text-gray-600 dark:text-gray-300 mb-4 transition-colors">Уровень дискомфорта</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartGridColor} />
                                <XAxis dataKey="date" tick={{fontSize: 12, fill: chartTextColor}} axisLine={false} tickLine={false} />
                                <YAxis tick={{fontSize: 12, fill: chartTextColor}} axisLine={false} tickLine={false} domain={[0, 10]} />
                                <Tooltip 
                                    contentStyle={{backgroundColor: tooltipBgColor, borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: tooltipTextColor}}
                                    itemStyle={{color: tooltipTextColor}}
                                />
                                <Line type="monotone" dataKey="discomfortLevel" stroke="#f43f5e" strokeWidth={3} dot={{r: 4, fill: '#f43f5e'}} activeDot={{r: 6}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white dark:bg-neutral-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-neutral-700 transition-colors">
                        <h3 className="font-bold text-gray-800 dark:text-white mb-2 transition-colors">Статистика недели</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-2xl transition-colors">
                                <span className="text-primary-500 dark:text-primary-400 text-sm">Симптомы</span>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">-40%</p>
                            </div>
                            <div className="bg-secondary-50 dark:bg-secondary-900/20 p-4 rounded-2xl transition-colors">
                                <span className="text-secondary-500 dark:text-secondary-400 text-sm">Настроение</span>
                                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">+25%</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'journal' && (
                <div className="animate-fade-in bg-white dark:bg-neutral-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-neutral-700 transition-colors">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4 transition-colors">Запись на сегодня</h3>
                    
                    <div className="mb-6">
                        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2 transition-colors">Уровень дискомфорта (1-10)</label>
                        <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            value={todaySymptom} 
                            onChange={(e) => setTodaySymptom(Number(e.target.value))}
                            className="w-full accent-primary-500 h-2 bg-gray-200 dark:bg-neutral-600 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>Нет боли</span>
                            <span className="font-bold text-primary-500 text-lg">{todaySymptom}</span>
                            <span>Сильная боль</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2 transition-colors">Заметки</label>
                        <textarea 
                            className="w-full p-3 bg-gray-50 dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-600 focus:outline-none focus:border-primary-300 dark:text-white h-32 text-sm transition-colors"
                            placeholder="Как прошла тренировка? Какие ощущения?"
                        ></textarea>
                    </div>

                    <button className="w-full bg-secondary-600 hover:bg-secondary-700 text-white py-3 rounded-xl font-medium shadow-lg shadow-secondary-200 dark:shadow-none transition-all">
                        Сохранить в дневник
                    </button>
                </div>
            )}
        </div>
    );
};

export default Progress;