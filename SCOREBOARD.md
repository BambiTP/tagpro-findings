# The scoreboard: what the order actually tells you

**Short answer:** in a single game, the scoreboard order barely shows who played best. The top of the
board is mostly the team that won, and the bottom of a team is that team's lowest-rated player only
about one time in three (one in four would be pure chance). Over many games the score means more, but
how often someone finishes at the bottom depends more on whether they play offence than on how good
they are.

Everything below comes from 11,237 clean ranked capture-the-flag games (March 2025 to October 2026)
in which all eight players finished. "Clean" means no uneven teams for more than 30 seconds and no
player idle for more than 10% of the game.

## Caveats first

- **"Better" means the ranked rating.** Each player's skill is the ranked system's own rating from
  before the game. It is an estimate, not the truth, but it is the best neutral yardstick available.
- **Lobbies are already balanced.** Matchmaking puts players of similar rating together, so the skill
  gap inside any one game is small and hard to see.
- **"Contribution" is hard to measure.** The comparison used here is the event-value model: how much
  each grab, cap, return, tag and pop changed the team's chance of capturing next. Like the scoreboard,
  it cannot see blocking, positioning or anti-regrab.
- **Role is judged from the scoreboard itself.** A player counts as "offence-leaning" in a game when
  their offence number is higher than their defence number. That partly reuses the thing being tested,
  so the role result is suggestive, not proven. Measuring role from where players actually were (time
  on the enemy half) would be the cleaner check.

## How the score is calculated

The scoreboard sorts top to bottom by each player's score, and players who quit go to the bottom. It
is **not** the old points system (100 for a cap, 5 for a grab, 1 per second of hold, and so on). The
current client calls its score "IPMv1.1", and the scores in real replays match it, not the old formula.

Every stat is turned into a per-minute rate and then compared **only with the other players in that
same game** (how many standard deviations above or below the game's average). The comparisons are
weighted and added up:

| Side | What counts (weight) |
|---|---|
| Offence | captures per minute (20), flag hold per minute (38), captures per grab (42) |
| Defence | tags per pop (18), returns per minute (34), prevent per minute (40), tags that were not returns, per minute (8) |
| Total | two thirds of your better side plus one third of your weaker side |

Finally all three numbers are rescaled so the game averages 50, with about 20 points of spread. You
only get a score if you played at least 15% of the game and at least half a minute.

What follows from that:

- **A score of 70 means "well above this lobby", not "good".** The same play earns a different score
  in a different game.
- **Failed grabs cost offence players.** "Captures per grab" is the biggest offence weight. Every grab
  that does not become a cap lowers it, so an offence player who keeps generating grabs for the team
  can score below one who rarely grabs.
- **Caps go to the winning team.** Captures per minute and captures per grab are mostly earned by the
  team that scores, so the winners fill the top of the board.
- **A lot of the game counts for nothing.** Blocking for your carrier, regrabbing, anti-regrab,
  powerups and making space never touch the score.
- **Specialists are rewarded.** Being great at one side and poor at the other scores higher than being
  average at both.

## One game: the whole board

| Scoreboard slot | 1 (top) | 2 | 3 | 4 | 5 | 6 | 7 | 8 (bottom) |
|---|---|---|---|---|---|---|---|---|
| On the winning team | 83% | 76% | 66% | 55% | 40% | 32% | 27% | 21% |
| Average rating | 854 | 842 | 836 | 832 | 831 | 825 | 816 | 803 |
| Is the highest-rated in the lobby (chance 12.5%) | 18% | 15% | 14% | 13% | 12% | 12% | 9% | 7% |
| Is the lowest-rated in the lobby (chance 12.5%) | 8% | 10% | 11% | 12% | 12% | 14% | 16% | 19% |

- The strongest pattern by far is winning: the top slot is on the winning team 83% of the time.
- The rank correlation between board order and rating is 0.16 (0 means no relationship, 1 means the
  same order).
- The lowest-rated player in the lobby still finishes **top** of the board 8% of the time, and the
  highest-rated player finishes **bottom** 7% of the time.

## One game: within a team

Comparing teammates removes the "who won" effect, because both teams have a top and a bottom.

| Place on their team | Winning team: average rating | Losing team: average rating | Is the team's highest-rated (chance 25%) | Is the team's lowest-rated (chance 25%) |
|---|---|---|---|---|
| 1st (top) | 852 | 851 | 33% | 18% |
| 2nd | 838 | 838 | 28% | 22% |
| 3rd | 823 | 823 | 22% | 27% |
| 4th (bottom) | 808 | 806 | 17% | 34% |

- **The bottom of a team is its lowest-rated player only 34% of the time.** It is the team's
  highest-rated player 18% of the time.
- **The gap is small.** On average the bottom player is rated 30 points below their three teammates,
  when ratings inside a team normally spread by about 73. In 39% of games the bottom player is rated
  above their teammates' average.
- **Contribution barely matches either.** Within a team, board order agrees only weakly with the
  event-value model (rank correlation 0.11). The bottom player has the team's lowest event value 26% of
  the time, about chance. The event-value model itself only correlates 0.09 with rating, so neither is
  a clean measure of contribution.

## Many games

467 players with at least 50 clean games each:

- **A player's average score does mean something.** It correlates 0.41 with their rating and 0.50
  with their win rate (rating alone correlates 0.31 with win rate). Part of the win-rate link is
  circular, because winning raises your score.
- **Finishing at the bottom is a habit.** The same player's odd-numbered and even-numbered games agree
  closely (correlation 0.78). The typical player is bottom of their team in 24% of games; the range
  from the 10th to the 90th percentile of players is 12% to 39%.
- **The players most often at the bottom are lower rated, but not by as much as people assume:**

| How often they finish bottom of their team | Players | Bottom of their team | Average rating | Win rate |
|---|---|---|---|---|
| Least often (quarter) | 117 | 12% | 874 | 52% |
| Second quarter | 117 | 21% | 824 | 51% |
| Third quarter | 116 | 28% | 832 | 50% |
| Most often (quarter) | 117 | 39% | 708 | 49% |

## Offence players sink

Bottom finishes correlate 0.53 with how often a player plays offence-leaning, against -0.37 with their
rating. Fitting both at once: one standard deviation more offence adds 5.8 percentage points of
bottom finishes; one standard deviation more rating removes 4.1. Role moves you more than skill does.

| Share of games at the bottom of their team | Lower-rated half | Higher-rated half |
|---|---|---|
| Mostly defence (59 and 63 players) | 20% | 13% |
| Mixed (105 and 103) | 29% | 24% |
| Mostly offence (70 and 67) | 35% | 26% |

A higher-rated offence player finishes at the bottom more often than a lower-rated defender.

## Who scores best over many games

The players with the highest average scores, split into offence and defence boards so the two roles
are never compared with each other, are in [SCOREBOARD_PLAYERS.md](SCOREBOARD_PLAYERS.md).

## So how should you read the scoreboard?

- **In one game:** the top tells you mostly who won and who held or capped the flag; the bottom is the
  team's weakest player about one time in three. It is not evidence that someone "was the problem".
- **Bottom on the winning team:** still more likely to be a role effect (an offence player whose grabs
  did not convert, or someone doing work the score cannot see) than a sign of a bad player.
- **Over dozens of games:** a consistently low average score is a moderate sign of a lower-rated
  player, but check what role they play first. An offence player will sit lower than a defender of
  the same skill.

## Method

- Final scores and stats are read from every finished, non-voided ranked capture-the-flag replay
  (`score`, offence score and defence score per player, as the server sent them).
- Ratings are the ranked system's pre-game ratings. Event values come from the next-capture probability
  model.
- Games are kept only if all eight players finished, had a rating and were given a score, and the game
  is clean.
- Scripts: `scoreboard_extract.py` and `scoreboard.py` (kept with the rest of the analysis code, not in
  this repository).
