import incomeModel from "../models/incomeModels.js";
import expenseModel from "../models/expenseModel.js";

function monthKey(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key) {
    const [year, month] = key.split("-").map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
    });
}

export async function getAnalyticsOverview(req, res) {
    const userId = req.user._id;
    const months = Math.min(24, Math.max(1, parseInt(req.query.months) || 6));

    const now = new Date();
    // Start at the 1st of the month, (months - 1) months back, so "6 months" includes the current month.
    const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);

    try {
        const [incomes, expenses] = await Promise.all([
            incomeModel.find({ userId, date: { $gte: start, $lte: now } }).lean(),
            expenseModel.find({ userId, date: { $gte: start, $lte: now } }).lean(),
        ]);

        // Build the ordered list of month keys so months with zero activity still appear.
        const monthKeys = [];
        for (let i = 0; i < months; i++) {
            const d = new Date(now.getFullYear(), now.getMonth() - (months - 1) + i, 1);
            monthKeys.push(monthKey(d));
        }

        const incomeByMonth = {};
        for (const inc of incomes) {
            const key = monthKey(inc.date);
            incomeByMonth[key] = (incomeByMonth[key] || 0) + Number(inc.amount || 0);
        }

        const expenseByMonth = {};
        for (const exp of expenses) {
            const key = monthKey(exp.date);
            expenseByMonth[key] = (expenseByMonth[key] || 0) + Number(exp.amount || 0);
        }

        const trend = monthKeys.map((key) => {
            const monthIncome = incomeByMonth[key] || 0;
            const monthExpense = expenseByMonth[key] || 0;
            return {
                month: key,
                label: monthLabel(key),
                income: monthIncome,
                expense: monthExpense,
                savings: monthIncome - monthExpense,
            };
        });

        const totalIncome = incomes.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);
        const totalExpense = expenses.reduce((acc, cur) => acc + Number(cur.amount || 0), 0);
        const totalSavings = totalIncome - totalExpense;
        const avgMonthlyIncome = totalIncome / months;
        const avgMonthlyExpense = totalExpense / months;
        const savingsRate = totalIncome === 0 ? 0 : Math.round((totalSavings / totalIncome) * 100);

        function buildDistribution(records, total) {
            const byCategory = {};
            for (const rec of records) {
                const cat = rec.category || "Other";
                byCategory[cat] = (byCategory[cat] || 0) + Number(rec.amount || 0);
            }
            return Object.entries(byCategory)
                .map(([category, amount]) => ({
                    category,
                    amount,
                    percent: total === 0 ? 0 : Math.round((amount / total) * 100),
                }))
                .sort((a, b) => b.amount - a.amount);
        }

        const expenseDistribution = buildDistribution(expenses, totalExpense);
        const incomeDistribution = buildDistribution(incomes, totalIncome);

        return res.status(200).json({
            success: true,
            data: {
                months,
                trend,
                totalIncome,
                totalExpense,
                totalSavings,
                avgMonthlyIncome,
                avgMonthlyExpense,
                savingsRate,
                expenseDistribution,
                incomeDistribution,
            },
        });
    } catch (error) {
        console.error("GetAnalyticsOverview", error);
        return res.status(500).json({
            success: false,
            message: "Analytics Fetch Failed",
        });
    }
}