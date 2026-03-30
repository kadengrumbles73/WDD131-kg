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

const homeHTML = `
    <section class="hero">
        <div class="hero-content">
            <h2>Quick NFL Stats</h2>
            <p>Welcome to the NFL Data Center. I provide quick simple stats for the league's quarterbacks. Get a quick summary of who is passing the best.</p>
            <button id="cta-stats-btn" class="stat-btn">VIEW STATS</button>
        </div>
        <div class="features-grid">
            <div class="card">
                <h3>Simple Stat Tracking</h3>
                <p>Simple yardage and TD-to-INT ratios for the starting QBs.</p>
            </div>
            <div class="card">
                <h3>Performance Tiers</h3>
                <p>Our proprietary logic categorizes players from "Starter" to "MVP Caliber" based on seasonal yardage.</p>
            </div>
        </div>
    </section>
`;

function showStats() {
    const filteredQBs = NFL_QBs.filter(player => 
        player.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
        player.team.toLowerCase().includes(currentSearchTerm.toLowerCase())
    );

    const playerRows = filteredQBs.map(player => {
        let performanceTier;
        if (player.yards >= 4200) {
            performanceTier = "MVP Caliber";
        } else if (player.yards >= 3700) {
            performanceTier = "Elite";
        } else {
            performanceTier = "Starter";
        }

        return `
            <tr>
                <td><img src="${player.picture}" alt="${player.name}" class="player-photo" style="width:40px; height:40px; border-radius:50%; border: 1px solid var(--secondary-color);"></td>
                <td>${player.name}</td>
                <td>${player.team}</td>
                <td>${player.yards}</td>
                <td>${player.tds}</td>
                <td>${player.ints}</td>
                <td>${performanceTier}</td>
            </tr>
        `;
    }).join('');

    const statsTableHTML = `
        <section class="stats-container">
            <h2>2026 PASSING LEADERS</h2>
            <div class="search-bar">
                <input type="text" id="player-search" placeholder="Search by name or team..." value="${currentSearchTerm}">
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Player</th>
                        <th>Team</th>
                        <th>Yards</th>
                        <th>TDs</th>
                        <th>INTs</th>
                        <th>Status</th>
                    </tr>
                </thead> 
                <tbody>
                    ${playerRows.length > 0 ? playerRows : '<tr><td colspan="7" style="text-align:center;">No players found</td></tr>'}
                </tbody>
            </table>
        </section>
    `;
    
    renderPage(statsTableHTML);

    const searchInput = document.getElementById('player-search');
    if (searchInput) {
        searchInput.focus();
        searchInput.setSelectionRange(currentSearchTerm.length, currentSearchTerm.length);
        searchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value;
            showStats();
        });
    }
}

function renderPage(content) {
    mainContent.innerHTML = content;
    const ctaBtn = document.getElementById('cta-stats-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            currentSearchTerm = "";
            showStats();
        });
    }
}

homeBtn.addEventListener('click', () => {
    currentSearchTerm = "";
    renderPage(homeHTML);
});

statsBtn.addEventListener('click', () => {
    showStats();
});

renderPage(homeHTML);