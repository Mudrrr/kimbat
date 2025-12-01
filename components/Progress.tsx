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

const Progress: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'chart' | 'journal'>('chart');
    const [todaySymptom, setTodaySymptom] = useState(5);

    return (
        <div className="p-6 pb-24 space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Мой прогресс 📈</h1>

            {/* Toggle */}
            <div className="flex p-1 bg-gray-100 rounded-xl">
                <button 
                    onClick={() => setActiveTab('chart')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'chart' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
                >
                    График
                </button>
                <button 
                    onClick={() => setActiveTab('journal')}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'journal' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
                >
                    Дневник
                </button>
            </div>

            {activeTab === 'chart' && (
                <div className="animate-fade-in space-y-6">
                    <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 h-64">
                        <h3 className="text-sm font-bold text-gray-600 mb-4">Уровень дискомфорта</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="date" tick={{fontSize: 12, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                                <YAxis tick={{fontSize: 12, fill: '#94a3b8'}} axisLine={false} tickLine={false} domain={[0, 10]} />
                                <Tooltip 
                                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                />
                                <Line type="monotone" dataKey="discomfortLevel" stroke="#f43f5e" strokeWidth={3} dot={{r: 4, fill: '#f43f5e'}} activeDot={{r: 6}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-2">Статистика недели</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-primary-50 p-4 rounded-2xl">
                                <span className="text-primary-500 text-sm">Симптомы</span>
                                <p className="text-2xl font-bold text-gray-800">-40%</p>
                            </div>
                            <div className="bg-secondary-50 p-4 rounded-2xl">
                                <span className="text-secondary-500 text-sm">Настроение</span>
                                <p className="text-2xl font-bold text-gray-800">+25%</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'journal' && (
                <div className="animate-fade-in bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Запись на сегодня</h3>
                    
                    <div className="mb-6">
                        <label className="block text-sm text-gray-500 mb-2">Уровень дискомфорта (1-10)</label>
                        <input 
                            type="range" 
                            min="1" 
                            max="10" 
                            value={todaySymptom} 
                            onChange={(e) => setTodaySymptom(Number(e.target.value))}
                            className="w-full accent-primary-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-2">
                            <span>Нет боли</span>
                            <span className="font-bold text-primary-500 text-lg">{todaySymptom}</span>
                            <span>Сильная боль</span>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-2">Заметки</label>
                        <textarea 
                            className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-primary-300 h-32 text-sm"
                            placeholder="Как прошла тренировка? Какие ощущения?"
                        ></textarea>
                    </div>

                    <button className="w-full bg-secondary-600 text-white py-3 rounded-xl font-medium shadow-lg shadow-secondary-200 hover:bg-secondary-700 transition-all">
                        Сохранить в дневник
                    </button>
                </div>
            )}
        </div>
    );
};

export default Progress;