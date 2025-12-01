import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ChevronRight, Heart, Check } from 'lucide-react';

interface OnboardingProps {
    onComplete: (profile: Partial<UserProfile>) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [goals, setGoals] = useState<string[]>([]);
    const [hasDiagnosis, setHasDiagnosis] = useState<boolean | null>(null);

    const toggleGoal = (goal: string) => {
        setGoals(prev => 
            prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
        );
    };

    const handleFinish = () => {
        onComplete({
            name,
            goals,
            hasDiagnosis: hasDiagnosis || false,
            streak: 0,
            level: 'Beginner'
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-primary-50 dark:bg-neutral-900 p-6 transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-neutral-800 rounded-3xl shadow-xl dark:shadow-none dark:border dark:border-neutral-700 p-8 transition-colors duration-300">
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 dark:bg-neutral-700 h-2 rounded-full mb-8">
                    <div 
                        className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>

                {step === 1 && (
                    <div className="animate-fade-in">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors">Давайте знакомиться!</h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 transition-colors">Как к Вам обращаться?</p>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ваше имя"
                            className="w-full p-4 rounded-xl border border-gray-200 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 outline-none transition-all mb-6"
                        />
                        <button
                            disabled={!name.trim()}
                            onClick={() => setStep(2)}
                            className="w-full bg-primary-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-primary-200 dark:shadow-none hover:bg-primary-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            Продолжить <ChevronRight size={20} />
                        </button>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-fade-in">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors">Ваша цель?</h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 transition-colors">Выберите всё, что подходит</p>
                        
                        <div className="space-y-3 mb-8">
                            {[
                                'Восстановление после родов',
                                'Укрепление мышц (профилактика)',
                                'Улучшение интимной жизни',
                                'Лечение недержания',
                                'Подготовка к беременности'
                            ].map((goal) => (
                                <button
                                    key={goal}
                                    onClick={() => toggleGoal(goal)}
                                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                                        goals.includes(goal)
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                            : 'border-gray-200 dark:border-neutral-600 hover:border-primary-200 dark:hover:border-primary-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    {goal}
                                    {goals.includes(goal) && <Check size={18} className="text-primary-500" />}
                                </button>
                            ))}
                        </div>

                        <button
                            disabled={goals.length === 0}
                            onClick={() => setStep(3)}
                            className="w-full bg-primary-500 text-white py-4 rounded-xl font-semibold shadow-lg shadow-primary-200 dark:shadow-none hover:bg-primary-600 transition-all disabled:opacity-50"
                        >
                            Продолжить
                        </button>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-fade-in">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 transition-colors">Есть ли диагноз?</h1>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 transition-colors">Опущение органов малого таза (пролапс)</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <button
                                onClick={() => setHasDiagnosis(true)}
                                className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                                    hasDiagnosis === true
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                                        : 'border-gray-200 dark:border-neutral-600 text-gray-600 dark:text-gray-400'
                                }`}
                            >
                                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-700 flex items-center justify-center shadow-sm">⚠️</div>
                                <span className="font-medium">Да, есть</span>
                            </button>
                            
                            <button
                                onClick={() => setHasDiagnosis(false)}
                                className={`p-6 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${
                                    hasDiagnosis === false
                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                        : 'border-gray-200 dark:border-neutral-600 text-gray-600 dark:text-gray-400'
                                }`}
                            >
                                <div className="w-10 h-10 rounded-full bg-white dark:bg-neutral-700 flex items-center justify-center shadow-sm">🌿</div>
                                <span className="font-medium">Нет / Не знаю</span>
                            </button>
                        </div>

                        <button
                            disabled={hasDiagnosis === null}
                            onClick={handleFinish}
                            className="w-full bg-gradient-to-r from-primary-500 to-rose-400 text-white py-4 rounded-xl font-semibold shadow-lg shadow-primary-200 dark:shadow-none hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                           <Heart size={20} fill="currentColor" /> Начать путь к здоровью
                        </button>
                        <p className="text-xs text-center text-gray-400 mt-4">
                            Нажимая кнопку, вы соглашаетесь с Политикой конфиденциальности.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Onboarding;