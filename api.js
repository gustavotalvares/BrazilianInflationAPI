const inflationData = require('./inflacao.json');

const api = {
    // Get indices for a specific month/year
    getSpecificPeriod: (year, month) => {
        // Validate year format
        if (!/^\d{4}$/.test(year)) {
            return { error: 'Invalid year format' };
        }
        
        // Validate month format if provided
        if (month && !/^(0[1-9]|1[0-2])$/.test(month)) {
            return { error: 'Invalid month format' };
        }

        if (!inflationData[year]) {
            return { error: 'Year not found' };
        }
        
        if (month && !inflationData[year][month]) {
            return { error: 'Month not found' };
        }
        
        return month ? inflationData[year][month] : inflationData[year];
    },

    // Get indices between two dates
    getPeriodRange: (startYear, startMonth, endYear, endMonth) => {
        // Validate date formats
        if (!/^\d{4}$/.test(startYear) || !/^\d{4}$/.test(endYear)) {
            return { error: 'Invalid year format' };
        }
        if (!/^(0[1-9]|1[0-2])$/.test(startMonth) || !/^(0[1-9]|1[0-2])$/.test(endMonth)) {
            return { error: 'Invalid month format' };
        }

        // Validate date range
        const startDate = new Date(`${startYear}-${startMonth}-01`);
        const endDate = new Date(`${endYear}-${endMonth}-01`);
        if (startDate > endDate) {
            return { error: 'Start date must be before end date' };
        }

        const result = {};
        
        for (let year = startYear; year <= endYear; year++) {
            if (!inflationData[year]) continue;
            
            result[year] = {};
            const months = Object.keys(inflationData[year]).sort();
            
            for (let month of months) {
                if (
                    (year === startYear && month >= startMonth) ||
                    (year === endYear && month <= endMonth) ||
                    (year > startYear && year < endYear)
                ) {
                    result[year][month] = inflationData[year][month];
                }
            }
        }
        return result;
    },

    // Calculate variation between two periods
    calculateVariation: (startYear, startMonth, endYear, endMonth) => {
        // Validate date formats
        if (!/^\d{4}$/.test(startYear) || !/^\d{4}$/.test(endYear)) {
            return { error: 'Invalid year format' };
        }
        if (!/^(0[1-9]|1[0-2])$/.test(startMonth) || !/^(0[1-9]|1[0-2])$/.test(endMonth)) {
            return { error: 'Invalid month format' };
        }

        // Validate date range
        const startDate = new Date(`${startYear}-${startMonth}-01`);
        const endDate = new Date(`${endYear}-${endMonth}-01`);
        if (startDate > endDate) {
            return { error: 'Start date must be before end date' };
        }

        if (!inflationData[startYear]?.[startMonth] || !inflationData[endYear]?.[endMonth]) {
            return { error: 'Invalid period' };
        }

        const startIPCA = inflationData[startYear][startMonth]['IPCA'];
        const endIPCA = inflationData[endYear][endMonth]['IPCA'];
        const startIGPM = inflationData[startYear][startMonth]['IGP-M'];
        const endIGPM = inflationData[endYear][endMonth]['IGP-M'];

        return {
            'IPCA': {
                variation: ((endIPCA - startIPCA) / startIPCA * 100).toFixed(2),
                startValue: startIPCA,
                endValue: endIPCA
            },
            'IGP-M': {
                variation: ((endIGPM - startIGPM) / startIGPM * 100).toFixed(2),
                startValue: startIGPM,
                endValue: endIGPM
            }
        };
    },

    // Calculate accumulated inflation for a specific year
    getYearAccumulated: (year) => {
        // Validate year format
        if (!/^\d{4}$/.test(year)) {
            return { error: 'Invalid year format' };
        }

        if (!inflationData[year]) {
            return { error: 'Year not found' };
        }

        // Validate December data exists
        if (!inflationData[year]['12']) {
            return { error: 'December data not available for requested year' };
        }

        // Get December of previous year
        const prevYear = (parseInt(year) - 1).toString();
        if (!inflationData[prevYear] || !inflationData[prevYear]['12']) {
            return { error: 'Previous year data not found' };
        }

        const startIPCA = inflationData[prevYear]['12']['IPCA'];
        const endIPCA = inflationData[year]['12']['IPCA'];
        const startIGPM = inflationData[prevYear]['12']['IGP-M'];
        const endIGPM = inflationData[year]['12']['IGP-M'];

        return {
            year,
            'IPCA': {
                accumulated: ((endIPCA - startIPCA) / startIPCA * 100).toFixed(2),
                startValue: startIPCA,
                endValue: endIPCA,
                startPeriod: `${prevYear}/12`,
                endPeriod: `${year}/12`
            },
            'IGP-M': {
                accumulated: ((endIGPM - startIGPM) / startIGPM * 100).toFixed(2),
                startValue: startIGPM,
                endValue: endIGPM,
                startPeriod: `${prevYear}/12`,
                endPeriod: `${year}/12`
            }
        };
    },

    // Get latest available indices
    getLatest: () => {
        const years = Object.keys(inflationData).sort();
        const lastYear = years[years.length - 1];
        const months = Object.keys(inflationData[lastYear]).sort();
        const lastMonth = months[months.length - 1];

        return {
            year: lastYear,
            month: lastMonth,
            indices: inflationData[lastYear][lastMonth]
        };
    },

    // Get monthly variation
    getMonthlyVariation: (year, month) => {
        // Validate year and month format
        if (!/^\d{4}$/.test(year)) {
            return { error: 'Invalid year format' };
        }
        if (!/^(0[1-9]|1[0-2])$/.test(month)) {
            return { error: 'Invalid month format' };
        }

        if (!inflationData[year]?.[month]) {
            return { error: 'Period not found' };
        }

        // Get previous month's data
        let prevYear = year;
        let prevMonth = (parseInt(month) - 1).toString().padStart(2, '0');
        
        if (month === '01') {
            prevYear = (parseInt(year) - 1).toString();
            prevMonth = '12';
        }

        if (!inflationData[prevYear]?.[prevMonth]) {
            return { error: 'Previous period not found' };
        }

        const currentIPCA = inflationData[year][month]['IPCA'];
        const prevIPCA = inflationData[prevYear][prevMonth]['IPCA'];
        const currentIGPM = inflationData[year][month]['IGP-M'];
        const prevIGPM = inflationData[prevYear][prevMonth]['IGP-M'];

        return {
            year,
            month,
            'IPCA': {
                variation: ((currentIPCA - prevIPCA) / prevIPCA * 100).toFixed(2),
                currentValue: currentIPCA,
                previousValue: prevIPCA
            },
            'IGP-M': {
                variation: ((currentIGPM - prevIGPM) / prevIGPM * 100).toFixed(2),
                currentValue: currentIGPM,
                previousValue: prevIGPM
            }
        };
    },

    // Get average inflation for a period
    getAverageInflation: (startYear, startMonth, endYear, endMonth) => {
        // Validate date formats
        if (!/^\d{4}$/.test(startYear) || !/^\d{4}$/.test(endYear)) {
            return { error: 'Invalid year format' };
        }
        if (!/^(0[1-9]|1[0-2])$/.test(startMonth) || !/^(0[1-9]|1[0-2])$/.test(endMonth)) {
            return { error: 'Invalid month format' };
        }

        // Validate date range
        const startDate = new Date(`${startYear}-${startMonth}-01`);
        const endDate = new Date(`${endYear}-${endMonth}-01`);
        if (startDate > endDate) {
            return { error: 'Start date must be before end date' };
        }

        if (!inflationData[startYear]?.[startMonth] || !inflationData[endYear]?.[endMonth]) {
            return { error: 'Invalid period' };
        }

        let monthCount = 0;
        let ipcaSum = 0;
        let igpmSum = 0;
        let previousIPCA = inflationData[startYear][startMonth]['IPCA'];
        let previousIGPM = inflationData[startYear][startMonth]['IGP-M'];

        for (let year = parseInt(startYear); year <= parseInt(endYear); year++) {
            const yearStr = year.toString();
            if (!inflationData[yearStr]) continue;

            const months = Object.keys(inflationData[yearStr]).sort();
            for (let month of months) {
                if (
                    (year === parseInt(startYear) && month >= startMonth) ||
                    (year === parseInt(endYear) && month <= endMonth) ||
                    (year > parseInt(startYear) && year < parseInt(endYear))
                ) {
                    const currentIPCA = inflationData[yearStr][month]['IPCA'];
                    const currentIGPM = inflationData[yearStr][month]['IGP-M'];
                    
                    ipcaSum += ((currentIPCA - previousIPCA) / previousIPCA * 100);
                    igpmSum += ((currentIGPM - previousIGPM) / previousIGPM * 100);
                    
                    previousIPCA = currentIPCA;
                    previousIGPM = currentIGPM;
                    monthCount++;
                }
            }
        }

        return {
            period: {
                start: `${startYear}/${startMonth}`,
                end: `${endYear}/${endMonth}`,
                months: monthCount
            },
            'IPCA': {
                averageMonthly: (ipcaSum / monthCount).toFixed(2),
                averageAnnual: ((ipcaSum / monthCount) * 12).toFixed(2)
            },
            'IGP-M': {
                averageMonthly: (igpmSum / monthCount).toFixed(2),
                averageAnnual: ((igpmSum / monthCount) * 12).toFixed(2)
            }
        };
    },

    // Get highest and lowest inflation periods
    getInflationExtremes: (year) => {
        // Validate year format
        if (!/^\d{4}$/.test(year)) {
            return { error: 'Invalid year format' };
        }

        if (!inflationData[year]) {
            return { error: 'Year not found' };
        }

        const months = Object.keys(inflationData[year]).sort();
        if (months.length < 2) {
            return { error: 'Insufficient data for analysis' };
        }

        let ipcaHighest = { variation: -Infinity, month: '' };
        let ipcaLowest = { variation: Infinity, month: '' };
        let igpmHighest = { variation: -Infinity, month: '' };
        let igpmLowest = { variation: Infinity, month: '' };

        for (let i = 1; i < months.length; i++) {
            const currentMonth = months[i];
            const prevMonth = months[i - 1];
            
            const currentIPCA = inflationData[year][currentMonth]['IPCA'];
            const prevIPCA = inflationData[year][prevMonth]['IPCA'];
            const currentIGPM = inflationData[year][currentMonth]['IGP-M'];
            const prevIGPM = inflationData[year][prevMonth]['IGP-M'];

            const ipcaVariation = ((currentIPCA - prevIPCA) / prevIPCA * 100);
            const igpmVariation = ((currentIGPM - prevIGPM) / prevIGPM * 100);

            if (ipcaVariation > ipcaHighest.variation) {
                ipcaHighest = { variation: ipcaVariation, month: currentMonth };
            }
            if (ipcaVariation < ipcaLowest.variation) {
                ipcaLowest = { variation: ipcaVariation, month: currentMonth };
            }
            if (igpmVariation > igpmHighest.variation) {
                igpmHighest = { variation: igpmVariation, month: currentMonth };
            }
            if (igpmVariation < igpmLowest.variation) {
                igpmLowest = { variation: igpmVariation, month: currentMonth };
            }
        }

        return {
            year,
            'IPCA': {
                highest: {
                    month: ipcaHighest.month,
                    variation: ipcaHighest.variation.toFixed(2)
                },
                lowest: {
                    month: ipcaLowest.month,
                    variation: ipcaLowest.variation.toFixed(2)
                }
            },
            'IGP-M': {
                highest: {
                    month: igpmHighest.month,
                    variation: igpmHighest.variation.toFixed(2)
                },
                lowest: {
                    month: igpmLowest.month,
                    variation: igpmLowest.variation.toFixed(2)
                }
            }
        };
    }
};

module.exports = api;
