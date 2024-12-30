const express = require('express');
const api = require('./api');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

// Serve documentation page
app.get('/docs', (req, res) => {
    res.sendFile(__dirname + '/public/docs.html');
});

// Get indices for specific month/year
app.get('/api/indices/:year/:month?', (req, res) => {
    const { year, month } = req.params;
    const result = api.getSpecificPeriod(year, month);
    if (result.error) {
        return res.status(404).json(result);
    }
    res.json(result);
});

// Get indices between two dates
app.get('/api/range', (req, res) => {
    const { startYear, startMonth, endYear, endMonth } = req.query;
    if (!startYear || !startMonth || !endYear || !endMonth) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    const result = api.getPeriodRange(startYear, startMonth, endYear, endMonth);
    if (result.error) {
        return res.status(404).json(result);
    }
    res.json(result);
});

// Calculate variation between two periods
app.get('/api/variation', (req, res) => {
    const { startYear, startMonth, endYear, endMonth } = req.query;
    if (!startYear || !startMonth || !endYear || !endMonth) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    const result = api.calculateVariation(startYear, startMonth, endYear, endMonth);
    if (result.error) {
        return res.status(404).json(result);
    }
    res.json(result);
});

// Get accumulated inflation for a year
app.get('/api/accumulated/:year', (req, res) => {
    const { year } = req.params;
    const result = api.getYearAccumulated(year);
    if (result.error) {
        return res.status(404).json(result);
    }
    res.json(result);
});

// Get latest available indices
app.get('/api/latest', (req, res) => {
    res.json(api.getLatest());
});

// Get monthly variation
app.get('/api/monthly-variation/:year/:month', (req, res) => {
    const { year, month } = req.params;
    const result = api.getMonthlyVariation(year, month);
    if (result.error) {
        return res.status(404).json(result);
    }
    res.json(result);
});

// Get average inflation
app.get('/api/average', (req, res) => {
    const { startYear, startMonth, endYear, endMonth } = req.query;
    if (!startYear || !startMonth || !endYear || !endMonth) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    const result = api.getAverageInflation(startYear, startMonth, endYear, endMonth);
    if (result.error) {
        return res.status(404).json(result);
    }
    res.json(result);
});

// Get inflation extremes for a year
app.get('/api/extremes/:year', (req, res) => {
    const { year } = req.params;
    const result = api.getInflationExtremes(year);
    if (result.error) {
        return res.status(404).json(result);
    }
    res.json(result);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
    console.log(`Inflation API running on port ${port}`);
});
