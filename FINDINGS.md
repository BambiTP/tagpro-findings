# Findings log

Working notes from the analytics project. Each entry: what was tested, data, result, caveats.

## Step 1 (2026-10-03): ranked CTF, 10,548 matches with OpenSkill pre-game win probability

Data: `~/nte/data/tagpro.db`, ranked CTF matches that carry a pre-game win probability
(`match_ranked_data`), not voided. Scripts: `step1_load.py`, `step1_analyze.py`.

### Ranked matchmaking is extremely balanced
- The pre-game favourite is predicted to win only 52.2% on average; 80% of games are
  predicted between 50% and 55%. Favourites actually won 52.5%.
- The ratings are slightly underconfident: calibration slope 1.33 (favourites win a bit
  more than predicted once the gap exceeds 55%: predicted 57.4%, actual 60.1%).

### A. Luck by map: inconclusive
- Because nearly every game is a coin flip by rating, there is almost no skill gap to measure
  upsets against. Per-map skill slopes have standard errors around 0.5, so no map can be
  told apart from any other.
- Pooled test of "more bombs means more luck": each extra bomb changes the skill slope by
  -0.09 (standard error 0.11, p = 0.42). Pointing the expected way, but no evidence.
- Needs a different luck measure that does not rely on rating gaps (ideas: how well the
  first half of a game predicts the second; how consistent the same players' results are
  across repeated games on a map).

### B. Powerups and winning, beyond team skill
Logistic regression of the result on pre-game skill plus each team's pickup difference:

| Powerup | Effect of one extra pickup (log odds) | About, in win chance | Team with more wins |
|---|---|---|---|
| Tagpro | 0.179 (se 0.010) | +4.5 points | 60.5% |
| Rolling bomb | 0.155 (se 0.010) | +3.9 points | 59.1% |
| Juke juice | 0.101 (se 0.010) | +2.5 points | 55.7% |

(Skill predicted about 50% for the team with more of each.)

- Tagpro is the most valuable powerup, but only slightly more than rolling bomb. Juke juice is
  worth roughly half as much, consistent with "not useless, just not as good."
- "Whoever wins the tagpros wins" is overstated: the team with more tagpros still loses about
  4 games in 10.
- Caveat: this is association, not cause. A team that is controlling the game probably
  collects more powerups because it is controlling, so these numbers are upper bounds on
  what the powerups themselves are worth.

## Underrated players and our own rating (2026-10-03)

### First try: future ranked rating (weak, abandoned)
- "Real level" = the player's ranked rating later on. With 20 to 60 games ahead, teams with hidden
  skill won 61.5% of games the matchmaker called even. The user pointed out ratings climb too slowly
  for that horizon; using end-of-record rating instead made the signal weaker (the median player
  looks 62 points worse at the end), which suggests ranked ratings drift or reset between seasons.
  Ranked rating over time is not a reliable yardstick. Script: `underrated.py`.

### Our own rating from tagpro.eu (the user's suggestion) works much better
- Team Elo built from 2.48 million finished public and ranked CTF matches on tagpro.eu,
  2015-05-25 to 2026-09-16, registered players only, ratings taken from before each game.
  Group games left out (they mix comp, minigames and other things). Script: `own_rating.py`.
- Tested on 6,421 ranked CTF games that tagpro.eu links to a ranked record:

| Predictor | Picks the winner | Log loss (lower is better; coin flip 0.6931) |
|---|---|---|
| Ranked matchmaker (OpenSkill) | 52.7% | 0.6876 |
| Our rating | 58.7% | 0.6680 |

- In the 1,127 games where our rating saw a gap of 100+ points, the stronger team won 70.3%;
  the matchmaker expected 52.1%. In the lowest-rated quarter of games: 73.0% (matchmaker 50.0%).
- So the matchmaker misses a lot of real skill, especially in low-rated games, which fits the
  user's point about underrated players turning up there.

### Luck by map, using our rating
- How strongly skill decides the winner, per 100 rating points (log odds): highest on Basenji
  (0.97) and Audacity 2 (0.77); lowest on Poppy (0.19, small sample) and Combine (0.45).
- Combine is the second least skill-decided map, which matches the user's view that it is the
  most luck-based. But the gap from the other maps is not statistically solid yet
  (difference -0.08, standard error 0.14, p = 0.58). Direction agrees; evidence is weak.

## Replay-based results (2026-10-03): 10,564 ranked CTF replays with full positions

Scripts: `replay_state.py` (positions every 0.25 s), `concepts.py`, `analyze_states.py`, `step3_results.py`.

### Bomb luck by map
- Measure: a bomb went off within 3 tiles of the flag carrier in the 3 seconds before a cap or return.
- Overall 3.4% of caps and 5.5% of returns. Highest for caps: Centenaria 6.8%, Shake 6.3%,
  A Flaccid Type Map 5.0%. Combine 3.7%, middle of the pack, despite having the most bomb
  explosions per game of the common maps (67).
- So if Combine is luck-heavy, it is not mainly through bombs deciding caps by this measure.
  Caveat: crude measure (distance and time window chosen by hand; bomb knockbacks that move
  chasers, not carriers, are not counted).

### Parking the bus
- 13,959 stretches where a team led, with positioning measured only while both flags were home
  (so it reflects choice, not chasing). "Extra back" = how many more of the leader's players sat in
  their own half than that same team did while tied.
- Every extra player pulled back lowered the leader's chance of winning: -0.93 log odds per player
  (standard error 0.05), controlling for time left, lead size and pre-game win probability.
  Win rate by fifth of extra-back: 85% (pushed up most) down to 70% (pulled back most).
- Last 3 minutes only: same direction, -0.85 per player (standard error 0.19).
- Supports the user's view that changing play to protect a lead does not help, and suggests it hurts.
- Caveat: teams may get pushed back because the opponent is pressing, not by choice; skill control
  here is only the matchmaker's probability (should be redone with our own rating).

### Known bug
- Past N above 4 appears (about 9% of caps): replays give a rejoining player a new slot, so an
  enemy can be counted twice. To fix: count only enemies present at that moment.

### Bomb luck, user's definition (bombs displace players who cannot react)
- "Bomb gift": a bomb goes off near a carrier's enemies and the carrier's past N jumps within a second
  because one of those enemies is displaced. "Bomb death": a player near a bomb dies within 1.5 s.
  Script: `bomb_luck.py` (after fixing the past N double count from rejoined players).
- All maps: 3.5 bomb gifts and 0.62 free past 4s per game; 7.5% of caps come within 10 s of a bomb
  gift; 3.4 bomb deaths per game, half of them carriers (returns).
- Combine has the MOST bomb gifts (5.3 per game) and the most free past 4s (1.05 per game, with Poppy),
  and 10.5% of its caps follow a gift (3rd highest). Basenji is the least bomb-affected (4.2% of caps),
  which matches it being the most skill-decided map by our rating.
- A bomb gift that reaches past 4 turns into a cap within 10 s 28% of the time.

## Map luck without looking at causes (2026-10-03)

Measure: how strongly our own pre-game rating gap predicts the winner on each map ("skill slope").
Lower = the better team wins less reliably = more luck. Scripts: `map_luck.py` and the split run
saved to `data/map_luck_split_2024_2026.csv`.

- Across all eras, newer maps looked luckier and older maps more skill-based, but that mixes in
  changes in the player pool. Comparing only 2024-2026 games removes that.
- Within 2024-2026, maps played mostly in ranked looked luckier than public-heavy maps. That is a
  measurement effect (ranked teams are balanced, so a rating gap there is more often our rating's
  own error), so public and ranked have to be measured separately.
- Measured separately, the public and ranked rankings of maps barely agree (correlation 0.21 over
  14 maps). At these sample sizes (500-3,000 games per map) the overall luck ranking is mostly noise.
- Consistently on the luckier side in both: Willow 2 and Thicket 2.
- Combine: 4th luckiest of 15 in ranked, middle of the pack in public. Not statistically different
  from other maps in either (ranked difference -0.06, standard error 0.06; public +0.02, se 0.04).
- Honest bottom line: the cause-free measure cannot yet single out Combine. The cause-specific
  bomb-gift measure does (most bomb gifts and free past 4s per game). Both can be true: bombs may
  decide moments on Combine without that showing up clearly in who wins whole games.

## Detector checks against the real client (2026-10-03)
- Loaded replays into the user's tagpro-local viewer (the real TagPro client) headlessly and compared
  screenshots and client positions with our data. Our positions are right: across 1,036 caps the
  carrier touches the flag exactly when the score changes; the viewer draws about 0.75 s ahead of its
  own clock and falls behind further when it renders under ~55 frames per second.
- Fixed after visual checks: OD now requires the enemy flag home; powerup respawns are only the
  final tile value (6.1/6.2/6.3; 6.x01-6.x12 is a 3-second warning countdown, which had inflated
  "powerup fights" tenfold); stalemates need real grab attempts.
- Small-sample verdicts (2-4 each): regrab, anti regrab, 4OD, break-off grab and bomb gift all looked
  right after the fixes.

### Parking the bus, redone (our rating + opponent push)
- 8,553 lead stretches in games with our rating. Effect of each extra player the leader pulls back
  (log odds of winning): -0.92 with the original controls; -0.92 adding our rating gap; -0.87 adding
  how far the trailing team pushed up. Barely moves, so better teams or opponent pressure do not
  explain it.
- Choice test: only stretches where the trailing team did NOT push up (so the leader's retreat was
  its own choice): -0.42 (standard error 0.18), smaller but still clearly negative (977 stretches).
- Side finding: when the trailing team pushes players up beyond how it played while tied, the LEADER
  wins more: +0.66 log odds per extra player pushed up (standard error 0.07). Changing shape because
  of the score hurts whichever team does it, leading or trailing, which fits the user's "flow game"
  view that adjusting to the score does not help.
- Caveat: the trailing team's push can also be a symptom (teams push when they are losing badly),
  so the side finding is suggestive, not proven.
