# TagPro analytics findings

Results from analysing ranked TagPro: 10,564 ranked capture-the-flag replays with full player
positions (March 2025 to October 2026), about 135,000 ranked match records, and 2.48 million
public and ranked games from tagpro.eu (2015 to 2026).

Everything is in [FINDINGS.md](FINDINGS.md), in the order it was done, each with what was tested,
the result, and the caveats. Highlights:

- **Our own rating beats the ranked matchmaker.** Built from tagpro.eu history, it picks 58.7% of
  ranked winners against the matchmaker's 52.7%; when it sees a 100+ point gap the stronger team
  wins 70% (73% in low-rated games). Underrated players are a real, measurable effect.
- **Parking the bus hurts.** Leaders who pull players back win less (70% vs 85%), even after
  accounting for team strength and opponent pressure. Trailing teams that push up also lose more.
- **Powerups.** Tagpro is worth the most per pickup, rolling bomb close behind, juke juice about
  half. The team with more tagpros still loses about 4 games in 10.
- **Bomb luck.** Combine has the most bomb-caused "free past 4s" of any map; Basenji the fewest.
  Overall per-map luck (how reliably the better team wins) cannot be ranked reliably yet.

Data and code are kept separately and are not part of this repository.
