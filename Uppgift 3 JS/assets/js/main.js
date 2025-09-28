import { getData } from './api.js';

/**
 * Körs när DOM är färdigladdad.
 * Hämtar stryktipsdata och fyller tabellen.
 */
document.addEventListener('DOMContentLoaded', async () => {
    const table = document.getElementById('table');

    try {
        const data = await getData();
        populateTable(table, data.playedGames);
    } catch (error) {
        console.error('Kunde inte hämta data:', error);
    }
});

/**
 * Fyller HTML-tabellen med matchdata.
 * @param {HTMLTableElement} table - Tabell där rader ska läggas till
 * @param {Array} matches - Array med matchobjekt
 */
function populateTable(table, matches) {
    matches.forEach((match, index) => {
        const row = document.createElement('tr');

        // Radnummer
        const numberCell = document.createElement('td');
        numberCell.textContent = index + 1;
        row.appendChild(numberCell);

        // Laglänkar
        const teamCell = document.createElement('td');
        const team1Link = createTeamLink(match.teams[0]);
        const vsText = document.createTextNode(' vs ');
        const team2Link = createTeamLink(match.teams[1]);

        teamCell.appendChild(team1Link);
        teamCell.appendChild(vsText);
        teamCell.appendChild(team2Link);
        row.appendChild(teamCell);

        // Resultatkolumner (1, X, 2)
        ['1', 'X', '2'].forEach(result => {
            const outcomeCell = document.createElement('td');
            if (match.outcome === result) {
                outcomeCell.appendChild(createCheckmark());
            }
            row.appendChild(outcomeCell);
        });

        table.appendChild(row);
    });
}

/**
 * Skapar en HTML-länk till ett lag.
 * @param {Object} team - Lagobjekt med `teamName` och `homepage`
 * @returns {HTMLAnchorElement} - En länk till lagets hemsida
 */
function createTeamLink(team) {
    const link = document.createElement('a');
    link.href = team.homepage;
    link.textContent = team.teamName;
    link.target = '_blank'; // Öppnar i ny flik
    return link;
}

/**
 * Skapar ett "checkmark"-element.
 * @returns {HTMLDivElement} - Ett div-element med två span-delar för bock
 */
function createCheckmark() {
    const checkmark = document.createElement('div');
    checkmark.classList.add('checkmark');

    const stem = document.createElement('span');
    stem.classList.add('stem');

    const kick = document.createElement('span');
    kick.classList.add('kick');

    checkmark.appendChild(stem);
    checkmark.appendChild(kick);

    return checkmark;
}
