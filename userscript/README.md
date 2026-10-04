# TagPro Expected Caps — replay overlay

Shows, while you watch any replay on tagpro.koalabeast.com (or a local tagpro-local replay):

- **Team view:** a strip right under the seek bar with each team's chance of capping in the next
  30 seconds (red and blue lines), drawn as the replay plays.
- **Player view:** a panel listing each player's live **net** contribution, split into offense / denial:
  how much they raise their team's chance to cap, plus how much they lower the enemy's, compared with
  the same moment without them (green = helping, red = hurting). Denial is what credits regrabs, anti
  regrab and defenders, who mostly stop the enemy rather than create caps.
- **Sharp drops:** yellow ticks on the strip, and a "Recent sharp drops" list, when one player's
  contribution falls 12+ points within about 1.5 seconds *and* their team's chance falls 8+ points.
  These are candidate mistakes, not verdicts; watch the moment and judge.

## Install
1. Install a userscript manager: [Tampermonkey](https://www.tampermonkey.net/) or
   [Violentmonkey](https://violentmonkey.github.io/).
2. Open [tagpro-xcaps.user.js](tagpro-xcaps.user.js), click **Raw**, and confirm the install. (While
   this repository is private, the Raw link only works when you're logged in to GitHub; if your userscript
   manager can't open it, create a new script in it and paste the file's contents instead.)
3. Open any replay (`https://tagpro.koalabeast.com/game?replay=...`) and press play.

## How it works
The model is embedded in the script (about 0.6 MB) and everything runs in your browser; nothing is
sent anywhere. Every 0.25 s it reads the board from the replay viewer: flags, each carrier's past N
and walking distance to cap, how many players each team has alive, on its own side and near each flag,
regrabs, powerups held and on the map, score and time left.

It was trained on 8,451 ranked replays and tested on the newest 2,113, which it never saw:

| Model | Log loss (lower is better) | AUC (0.5 = guessing) |
|---|---|---|
| Constant guess | 0.504 | 0.500 |
| Flag status only | 0.484 | 0.631 |
| This model | 0.467 | 0.663 |

It is well calibrated (when it says 24%, teams capped 23.4% of the time; at 89%, 88.1%), but "who caps
in the next 30 seconds" is a noisy thing to predict, so treat swings as signals, not certainties.

## Known limits
- The strip fills in as you watch; seeking back clears it.
- Player contribution is "the board with vs without this player", which mostly reflects position and
  role at that moment; it does not see jukes, contact, or intent.
- The 12-point and 8-point thresholds for sharp drops are first guesses; change `MISTAKE_DROP` and
  `TEAM_DROP` at the top of the script.
