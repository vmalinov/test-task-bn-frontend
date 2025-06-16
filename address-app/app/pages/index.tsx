
'use client';

import React, { useEffect, useState } from 'react';
import { fetchStats } from '../services/apiService';

const StatisticsPage = () => {
    const [stats, setStats] = useState<{ totalAddresses: number }>({ totalAddresses: 0 });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await fetchStats();
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        loadStats();
    }, []);

    return (
        <div>
            <h1>Статистика</h1>
            <p>Общее количество адресов: {stats.totalAddresses}</p>
        </div>
    );
};

export default StatisticsPage;
