# TagPro analytics findings

Results from analysing ranked TagPro: 10,564 ranked capture-the-flag replays with full player
positions (March 2025 to October 2026), about 135,000 ranked match records, and 2.48 million
public and ranked games from tagpro.eu (2015 to 2026).

- **[WRITEUP.md](WRITEUP.md): start here.** The full story, with GIFs of every concept.
- [PRIMER.md](PRIMER.md): how TagPro actually plays: caps, past N, regrabs, anti, OD, kissing, defense styles, and Bambi's own theories.
- [FINDINGS.md](FINDINGS.md): every result with its full data tables and how confident it is.
- [GLOSSARY.md](GLOSSARY.md): what every term means, with real screenshots from ranked games.
- [MAPS.md](MAPS.md): one big table, every map with every number.
- [PLAYERS.md](PLAYERS.md): rating leaderboard of the top 150 active players with record and defensive style.
- **[userscript/](userscript/): replay overlay** showing each team's live chance to cap and each player's contribution, with sharp drops flagged.
- [RESEARCH_LOG.md](RESEARCH_LOG.md): the order the work was done in, including dead ends and corrections.

Highlights:

- **Our own rating beats the ranked matchmaker.** Built from tagpro.eu history, it picks 58.7% of
  ranked winners against the matchmaker's 52.7%; when it sees a 100+ point gap the stronger team
  wins 70% (73% in low-rated games). Underrated players are a real, measurable effect.
- **Parking the bus hurts.** Leaders who pull players back win less (70% vs 85%), even after
  accounting for team strength and opponent pressure. Trailing teams that push up also lose more.
- **Powerups.** Tagpro is worth the most per pickup, rolling bomb close behind, juke juice about
  half. The team with more tagpros still loses about 4 games in 10.
- **Bomb luck.** Combine has the most bomb-caused "free past 4s" of any map; Basenji and Oak the
  fewest. Overall per-map luck (how reliably the better team wins) cannot be ranked reliably yet.
- **No map specialists.** Players' success on particular maps is luck; skill carries across maps.
- **Active vs inactive defense.** The style is clearly measurable (it picks out known active and
  inactive defenders), but in ranked it does not predict winning either way yet.

Data and code are kept separately and are not part of this repository.
