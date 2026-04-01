const mainContent = document.getElementById('main-content');
const homeBtn = document.getElementById('home-btn');
const statsBtn = document.getElementById('stats-btn');

let currentSearchTerm = "";

const NFL_QBs = [
    {name: "Matthew Stafford", team: "LAR", yards: 4707, tds: 46, ints: 8, picture: "images/matthewstafford.png"},
    {name: "Jared Goff", team: "DET", yards: 4564, tds: 34, ints: 8, picture: "images/jaredgoff.png"},
    {name: "Dak Prescott", team: "DAL", yards: 4552, tds: 30, ints: 10, picture: "images/dakprescott.png"},
    {name: "Drake Maye", team: "NE", yards: 4394, tds: 31, ints: 8, picture: "images/drakemaye.png"},
    {name: "Sam Darnold", team: "SEA", yards: 4048, tds: 25, ints: 14, picture: "images/samdarnold.png"},
    {name: "Trevor Lawrence", team: "JAX", yards: 4007, tds: 29, ints: 12, picture: "images/trevorlawrence.png"},
    {name: "Caleb Williams", team: "CHI", yards: 3942, tds: 27, ints: 7, picture: "images/calebwilliams.png"},
    {name: "Bo Nix", team: "DEN", yards: 3931, tds: 25, ints: 11, picture: "images/bonix.png"},
    {name: "Justin Herbert", team: "LAC", yards: 3727, tds: 26, ints: 13, picture: "images/justinherbert.png"},
    {name: "Baker Mayfield", team: "TB", yards: 3693, tds: 26, ints: 11, picture: "images/bakermayfield.png"},
    {name: "Josh Allen", team: "BUF", yards: 3668, tds: 25, ints: 10, picture: "images/joshallen.png"},
    {name: "Patrick Mahomes", team: "KC", yards: 3587, tds: 22, ints: 11, picture: "images/patrickmahomes.png"},
    {name: "Jordan Love", team: "GB", yards: 3381, tds: 23, ints: 6, picture: "images/jordanlove.png"},
    {name: "Jacoby Brissett", team: "ARI", yards: 3366, tds: 23, ints: 8, picture: "images/jacobybrissett.png"},
    {name: "Aaron Rodgers", team: "PIT", yards: 3322, tds: 24, ints: 7, picture: "images/aaronrodgers.png"}
];

function renderHome() {
    mainContent.replaceChildren();

    const section = document.createElement('section');
    section.className = 'hero';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'hero-content';

    const h2 = document.createElement('h2');
    h2.textContent = 'Quick NFL Stats';
    
    const p = document.createElement('p');
    p.textContent = "Welcome to the NFL Data Center. I provide quick simple stats for the league's quarterbacks. Get a quick summary of who is passing the best.";

    const btn = document.createElement('button');
    btn.id = 'cta-stats-btn';
    btn.className = 'stat-btn';
    btn.textContent = 'VIEW STATS';
    btn.onclick = () => {
        currentSearchTerm = "";
        showStats();
    };

    contentDiv.append(h2, p, btn);

    const grid = document.createElement('div');
    grid.className = 'features-grid';

    const cardData = [
        {h: "Simple Stat Tracking", p: "Simple yardage and TD-to-INT ratios for the starting QBs."},
        {h: "Performance Tiers", p: "Our proprietary logic categorizes players from 'Starter' to 'MVP Caliber' based on seasonal yardage."}
    ];

    cardData.forEach(data => {
        const card = document.createElement('div');
        card.className = 'card';
        const ch3 = document.createElement('h3');
        ch3.textContent = data.h;
        const cp = document.createElement('p');
        cp.textContent = data.p;
        card.append(ch3, cp);
        grid.appendChild(card);
    });

    section.append(contentDiv, grid);
    mainContent.appendChild(section);
}

function showStats() {
    mainContent.replaceChildren();

    const filteredQBs = NFL_QBs.filter(player => 
        player.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        player.team.toLowerCase().includes(currentSearchTerm.toLowerCase())
    );

    const section = document.createElement('section');
    section.className = 'stats-container';

    const h2 = document.createElement('h2');
    h2.textContent = '2026 PASSING LEADERS';

    const searchDiv = document.createElement('div');
    searchDiv.className = 'search-bar';
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'player-search';
    input.placeholder = 'Search by name or team...';
    input.value = currentSearchTerm;
    input.oninput = (e) => {
        currentSearchTerm = e.target.value;
        showStats();
        const refocused = document.getElementById('player-search');
        if (refocused) {
            refocused.focus();
            refocused.setSelectionRange(currentSearchTerm.length, currentSearchTerm.length);
        }
    };
    searchDiv.appendChild(input);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['Photo', 'Player', 'Team', 'Yards', 'TDs', 'INTs', 'Status'].forEach(text => {
        const th = document.createElement('th');
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    const tbody = document.createElement('tbody');

    if (filteredQBs.length === 0) {
        const row = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 7;
        td.style.textAlign = 'center';
        td.textContent = 'No players found';
        row.appendChild(td);
        tbody.appendChild(row);
    } else {
        filteredQBs.forEach(player => {
            const row = document.createElement('tr');

            const tdPhoto = document.createElement('td');
            const img = document.createElement('img');
            img.src = player.picture;
            img.alt = player.name;
            img.className = 'player-photo';
            img.style.width = '40px';
            img.style.height = '40px';
            img.style.borderRadius = '50%';
            tdPhoto.appendChild(img);

            let tier = "Starter";
            if (player.yards >= 4200) tier = "MVP Caliber";
            else if (player.yards >= 3700) tier = "Elite";

            row.appendChild(tdPhoto);
            [player.name, player.team, player.yards, player.tds, player.ints, tier].forEach(val => {
                const td = document.createElement('td');
                td.textContent = val;
                row.appendChild(td);
            });

            tbody.appendChild(row);
        });
    }

    table.append(thead, tbody);
    section.append(h2, searchDiv, table);
    mainContent.appendChild(section);
}

homeBtn.addEventListener('click', () => {
    currentSearchTerm = "";
    renderHome();
});

statsBtn.addEventListener('click', () => {
    showStats();
});

renderHome();