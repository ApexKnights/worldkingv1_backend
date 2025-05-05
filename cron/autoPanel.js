// cron/autoPanelCron.js
import cron from 'node-cron';
import moment from 'moment';
import { Panel } from '../models/Panel.js';


export const startAutoPanelCron = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log("⏳ Running auto panel update...");

        try {
            const allGames = await Panel.find();

            for (const game of allGames) {
                const panels = game.panel;
                if (!panels || panels.length === 0) continue;

                const lastPanel = panels[panels.length - 1];
                const [, endDateStr] = lastPanel.date.split(" To ");
                const endDate = moment(endDateStr, "DD.MM.YYYY");
                const today = moment();

                if (today.isAfter(endDate)) {
                    const nextStart = endDate.clone().add(1, 'days');
                    const nextEnd = nextStart.clone().add(6, 'days');
                    const nextPanelDate = `${nextStart.format("DD.MM.YYYY")} To ${nextEnd.format("DD.MM.YYYY")}`;

                    const nextPanelId = "pnl" + (Math.floor(Math.random() * (90000 - 10000 + 1)) + 10000).toString();
                    const nextPanelData = {
                        id: nextPanelId,
                        date: nextPanelDate,
                        monday: "",
                        tuesday: "",
                        wednesday: "",
                        thursday: "",
                        friday: "",
                        saturday: "",
                        sunday: "",
                    };

                    await Panel.findOneAndUpdate(
                        { gameId: game.gameId },
                        { $push: { panel: nextPanelData } },
                        { new: true }
                    );

                    console.log(`✅ Auto panel initiated for gameId ${game.gameId} with date ${nextPanelDate}`);
                }
            }
        } catch (err) {
            console.error("❌ Cron job error:", err);
        }
    });
};
