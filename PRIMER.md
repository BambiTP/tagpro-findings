# How TagPro works: a primer

How competitive TagPro actually plays, as explained by Bambi (October 2026) and written down while
building the analysis in this repository. It covers what happens in a game and the terms players use.
Bambi's own theories, which are not established meta, are marked as such and collected near the end.
Anything marked "unconfirmed" is an inference that Bambi has not checked.

See [GLOSSARY.md](GLOSSARY.md) for screenshots and [WRITEUP.md](WRITEUP.md) for clips of most of these.

## Core loop
- Each player is a ball. Red team against blue team. Standard games are four against four.
- Each team has a flag in its base. You grab the enemy flag by rolling over it, carry it to your base, and touch your own flag to capture ("cap").
- You can only cap if your own flag is at home. If both flags are out, neither team can score until one carrier is popped.
- Touching an enemy flag carrier pops them and the flag returns to its base instantly ("return").
- Touching an enemy who does not hold a flag does nothing (unless you have the Tagpro powerup).

## Game length and format
- Typical scores: something like 6-5 or 2-3; usually more than 3 caps total in a game.
- Ranked games: 8 minutes.
- Competitive games: 10 minutes.
- Comp regular season: a 5-game series; each game win gives points, and a win or loss in overtime gives fewer points than a regulation result. Playoffs: best of 7. Overtime is sudden death: the next cap wins.

## Respawning elements
Timings confirmed by Bambi.
- Players: a popped player respawns in base after about 3 seconds.
- Powerups: respawn 60 seconds AFTER THEY ARE COLLECTED, not on a fixed every-60-seconds schedule. Different pups on the same map can drift onto different timers, so keeping track of each pup's time is a big skill. There are three:
  - Juke juice: makes you accelerate faster (better grip and handling). Normally used for chasing. Not useless, just weaker than the other pups; some players take it mainly to deny it to the other team.
  - Rolling bomb (current version): a shield that absorbs one pop. It breaks only on something that would actually pop you: an enemy tagpro touching you, an enemy touching you while you hold the flag, spikes, or a popping gate. When it breaks it explodes and knocks nearby balls away instead of you popping. A plain enemy touch that would not pop you does not break it (it used to, but no longer). You can also set off the explosion yourself at any time with the spacebar. Older rolling bombs worked differently but are no longer used, so ignore them.
    - Used on offense because of the extra life: usually the player with rolling bomb wants to be the one to grab.
  - Tagpro: lets you pop any enemy by touching them, not just flag carriers.
    - Dominant use: whoever gets it goes to offense regardless of their starting role, uses it to generate a grab (popping defenders), then escorts the carrier home. Bambi has no strong opinion but thinks there can be better uses depending on the situation.
  - "Top speed" does NOT exist (corrected by Bambi).
- Boosts: pads that launch you, respawn about 10 seconds after being used. Some are team-colored.
- Bombs: explode on contact, knocking nearby balls away; respawn about 30 seconds after being used.
- Respawn quirk: powerups, boosts and bombs are NOT collected or triggered if they respawn while a ball is already sitting on the tile. You must leave the tile and then move onto the active tile to collect or trigger it. So camping on a powerup tile does not win it.

## Maps
- The map pool changes every season. A few "juggernaut" maps have lasted for years. New maps are rare and most are not well liked.
- Bomb luck (Bambi's definition): bombs displace players who cannot react, so a team can get a free past 4 "for essentially no reason". The luck is in defenders/chasers being thrown out of position, not in the carrier being launched.
- "Juggernaut" maps are the most sought-after thing for a map maker. Nobody really knows what makes a map one. Some players think maps are "perfected" and no new juggernauts can appear; Bambi is unsure.

## Game types
- Three different contexts that should not be treated as the same: casual (public pub games), ranked, and group matches (private groups, which include competitive games). Bambi warns there is a real difference between them.

## Ranked matchmaking
- Ranked teams are formed using OpenSkill (a Bayesian team rating system, similar in spirit to TrueSkill).

## Map features
- Spikes: pop you on contact.
- Gates: colored areas toggled by buttons; can block, allow or pop players depending on color. Gate "stick" timer: how long a gate stays in its changed state after a player leaves the button, before flipping back. Set per map by the map makers.
- Portals: teleport, with a cooldown. The cooldown differs from map to map and portal to portal; map makers set it.
- Neutral flag maps (NF): one yellow flag in the middle, taken to the other team's end zone. A different mode; out of scope for now.

## Terminology
- "Pup": powerup.
- "Hold": at its most basic, carrying the flag. Can mean holding for some duration, or holding just long enough for your regrab to get into position.
- "Regrab" / regrab chain: the usual offensive goal. One offense player carries the flag while their offense partner stands on the empty enemy flag tile. When the carrier is popped, the flag returns instantly to that tile and the partner grabs it right away, then holds. The players swap roles and repeat, so the team keeps possession across pops.
  - After a pop, the popped player respawns in their own base (about 3 seconds) and has to travel all the way back to the enemy flag tile to become the next regrab. The holder tries to survive long enough for that.
  - Alternative: if the 3-second respawn is too slow, one of the team's defenders can go to regrab instead, and the popped player takes over defense when they respawn.
  - In practice the current meta is that defense stays home no matter what, even when swapping would be slightly better in the moment. Reasons: it keeps the team solid, switching creates confusion, offense players are usually not good at defense, and defense partners build chemistry together. So roles are mostly fixed in real play, especially for defense.
- "Anti regrab": a defensive option against a regrab chain. Instead of chasing the carrier or playing OD to stop the cap, a player blocks the enemy regrab (the player waiting on your flag tile), so when the carrier is popped the flag returns home and nobody is there to grab it again. This breaks the chain.
- "Kiss": two flag carriers (one from each team) touching. Old rule: they popped each other. "No kiss" rule (introduced about 2-3 years before 2026, so roughly 2023-2024): they just bounce off each other like normal balls.
  - The no kiss rule applies ONLY in competitive play. Ranked still uses kissing (carriers pop each other). So ranked and comp play under different rules whenever both flags are out, and older comp data (before the change) also used kissing. Any analysis that learns from ranked and applies to comp has to account for this.
  - Bambi calls kissing and anti regrab the most confusing part of the game.
  - With kissing (ranked, and comp before the change): kissing the enemy carrier was surprisingly easy (Bambi is not sure why). A common OD pattern was "grab then kiss": the OD player grabs the enemy flag and immediately kisses the enemy carrier, popping both and returning both flags. No kiss removed this option in comp.
  - Bambi's opinion (not established meta): after you die, it is always good to play anti regrab for at least a few seconds. Under no kiss this is riskier. It also depends on whether your death already broke the enemy regrab chain, among many other factors.
- "Handoff": like a regrab chain, but the carrier dies quickly instead of after a long hold, and the regrab picks it up. A "cheese" regrab chain.
- "Swipe": a failed return attempt: a defender commits to tagging the carrier, misses, and ends up behind them, so the carrier is suddenly past that defender.
- "Flaccid": a grab that is returned within about 3-4 seconds (exact cutoff unknown to Bambi).
- "Prevent" (game stat): seconds where your flag is home, you are in your base, and an enemy is in your base too (Bambi thinks within about a 5-tile radius; exact definition unconfirmed).
- "Tag" (stat): you popped an enemy. Ways to tag: with tagpro, with gates (popping enemies via a gate), and returns (popping the enemy carrier). A return also counts as a tag. "Pop" (stat): you got popped.
- "Stalemate": neither team can get a grab and hold it (grabs either do not happen or the carrier is popped quickly). Both flags stay at or keep returning to base.
- "Past N": how many enemies the flag carrier has gotten past. Past 4 (all four enemies beaten) should be a cap unless the carrier messes up. So past 2 means two enemies are beaten and two are still in play against the carrier.
  - "Past" an enemy means the carrier is effectively closer to the carrier's own flag (where they cap) than that enemy is, counting element use. It is about who gets there first, not straight-line position: if the carrier is ahead of an enemy but that enemy has a boost that gets them back in front, the carrier is NOT past them. For measurement, this is closer to comparing travel time to the cap (with boosts, portals and so on) than raw distance.
  - Why it works: every ball has the same top speed, so with no obstacles a carrier who is closer to their own flag than an enemy will always get there first. A lead is permanent unless an element (boost, bomb, etc.) lets the enemy close it.
  - Example: you use a boost to grab, and you are now closer to your own flag than the two enemy defenders, who have no boost or bomb to catch up. That is a past 2.

## Pup fights
- Normally the whole game pauses for pups: when powerups are about to respawn, play shifts to fighting over them.
- Who goes and how it plays out depends heavily on the situation: the map, which pups are spawning, and where the flags are.
- Pup fights are short: they resolve within a few seconds.
- Map layout matters: on some maps the pups sit on the path to the flag, so defenders can fight for the pup and still easily break off to stop a cap. On those maps cap pressure creates much less of a dilemma.
- A really big part of pup timing: holding the flag during pups AND pressuring a cap, so the enemy cannot leave to fight for the pups. Just holding is not enough; the carrier must be a real cap threat, or the enemy can ignore them and go fight. If the enemy leaves, you cap. (Unconfirmed inference: if they stay, your team gets the pups with less contest.)

## How caps usually happen
- The normal path to a cap: the carrier gets past 2 (beats both enemy defenders) at the same time the enemy offense is out of position, so nobody can get back in front.
- The pup-fight path: when powerups respawn (60 seconds after last collected) players converge to fight over them. A player breaks off from the pup fight, grabs, and boosts past everyone while they are distracted. Sometimes called "cheese," but it is really a normal part of the game. Bambi believes this is statistically the best time to get caps. Partly measured on Bambi's [tagpro-research](https://bambitp.github.io/tagpro-research/) site: grabs 3-4 seconds after a powerup respawn convert to a cap within 60 seconds about 38.9% of the time vs a 35.0% average, an edge of about 4 percentage points; grabs 8-10 seconds before a respawn are clearly worse (unexplained asymmetry).
- The harder path: cap against OD. The carrier gets to their own flag even though enemies are guarding it, by outmaneuvering or outblocking them (movement, blocks, and elements like bombs and boosts that knock guards out of the way or launch the carrier in).

## Bringing your own carrier home
- The carrier's own defenders mostly just block: get in the way of chasers and OD players. Normally they stay near their own flag so the enemy cannot simply grab it, but not always.
- Blocking correctly and setting up routes for the carrier is huge. Example: "backwall" (important on many maps): the carrier uses a boost from off screen, hits the wall behind their own flag, and bounces in to cap. Setting it up is a mix of the carrier's route and teammates clearing the way; it happens too fast and fluidly to split cleanly.

## Score and time
- Teams try to play differently when winning or losing. "Parking the bus" in TagPro means spending MORE time on the OPPONENT's side (NOT the soccer meaning of retreating; Bambi corrected this). Retreating to your own side when ahead is considered bad and risky, especially with 3+ players on your own side.
- Bambi's opinion: changing play based on score does not help, because TagPro is a flow game, not a game of individual battles.

## How pops happen
- Mostly containment: chasers cut off the carrier's escape routes and close in.
- A "solo" is a carrier dying to a single enemy. Bambi's view: it should never happen; carriers should only die when contained by 2 or more enemies, so a solo is an unforced error by the carrier. (Bots can solo with 100% accuracy.)

## Offense between grabs
- The offense waits for boosts to respawn and tries rub grabs. Long stretches of this with no successful grab and hold are a stalemate.

## Communication
- Comp teams use voice chat. Ranked players generally do not have that coordination.

## Both flags out
- Each team tries to kill the other team's carrier. Often one carrier dies and it becomes a regrab-chain battle (each side trying to keep its own chain alive and break the other's) plus a rush for a "reset".
- "Reset": your own flag is back home AND both of your defenders are back in position on it. Not just the flag returning; the defense has to be set again.
- Positioning matters a lot on a macro scale here, for example which side of the map each carrier is on (red half or blue half, i.e. near which base).
  - A carrier on their own half is close to capping the moment their flag returns; a carrier on the enemy half is far from scoring and surrounded by chasers.
  - "Hugging" (the no-kiss-era word for two carriers touching/pressed together, since they no longer pop): when carriers hug, the team whose half it happens on has an easier time resetting, without needing anyone on anti regrab.

## OD
- "OD" = offense defense: when your own flag is out of your base (an enemy is carrying it), instead of chasing that carrier, players guard the enemy flag in the enemy base so the enemy carrier cannot come home and cap. Bambi describes it as "puppy guarding": staying on and guarding one small goal (the enemy flag spot) rather than playing the rest of the game. Usually the offense does it, but it can be any players, not only offense.
- "4OD": all four players play OD. Used as a strategy to stall time (e.g. to run out the clock). While it holds, neither team can cap: the OD team's flag is out, and the carrier's team cannot reach their own flag.
- How OD / 4OD breaks:
  - Powerups: pups disrupt the guards (e.g. a tagpro or rolling bomb).
  - Undisciplined guards leaving their post to try to grab.
  - It does not guarantee no cap: the carrier's team can still cap against it with bomb and boost blocks and outmaneuvering (the "harder path" above).

## Contact physics
- Whoever initiates contact usually wins it, because they carry the momentum advantage. When two balls push on each other, the one with less momentum gets pushed back. This applies throughout the whole game.

## Grabbing
Grab strategy is much less contested than defense. Most players agree:
- Standard grab: use boosts and bombs to get to the flag and out past the defense.
- Rub grab: no elements. After grabbing there is about 0.25 seconds of invincibility; the grabber uses it to bounce off an enemy and run away while grabbing at the same moment.
- Backboard: the grabber's offense partner stands behind the enemy defender, sandwiching them. The grabber boosts into the defender, the defender is pinned against the backboard, and like a Newton's cradle the grabber bounces back off the defender and runs away. Without a backboard, the defender would be pushed backward and the grabber would follow them deeper into the defense instead of bouncing off. It also keeps the defender close to the flag, so the grabber touches the flag and bounces out within the 0.25 seconds of invincibility. Bambi sees people die using it and thinks it mostly helps the defense.
- There is no real community strategy for where to position or when to boost.
- Bambi's own grabbing idea: make the defense move in ways they did not intend as much as possible, i.e. displace them.
- "Stealth" grab (Bambi also calls it "plague offense"): Bambi's own invented technique, which nobody else uses. Avoid the defense like the plague: never let them push you or get SOLID contact (grazing is fine, and the margins are minuscule, a few pixels), keep moving around them so they can't get a solid hit, until an opening appears, then go for the grab. It is about the approach, not avoiding contact forever. "Solid contact" feels like the defender blocking you. Nobody else really plays this way. The opportunity is usually the defense suddenly getting out of position (then a rub grab), or Bambi's offense partner blocking a defender to gain the momentum advantage.
  - How it connects to displacement: stealth displaces without contact. Never giving the defense a chance to initiate contact (and win it with momentum) means they have to keep repositioning to track the threat, until one adjusts wrong and an opening appears.

## Defender roles
- The two defenders usually do not split into fixed sub-roles; a defender is just a defender, though teams can split if they want.
- In novice play, weak players basically never leave base and only play anti regrab and defense. That style is seen as reserved for the worst players.

## Defense styles (highly contested)
Grab strategies and defense strategies are both highly contested. The active/inactive framing below is Bambi's own observation, not a known community concept; Bambi thinks they may be the only one who notices it. The two main defense styles:
- Active defense: defenders get up close to the offense around contested boosts and bombs and give the offense no real leeway. They try to stop the offense from using those elements at all.
- Inactive defense: defenders stay near the flag and deal with boosts and bombs as they come (deflecting or absorbing the offense's element use) rather than preventing it.
- Bambi is a strong advocate of inactive defense and gets called dumb for it by other players.
  - How inactive defense handles the contact-momentum problem: defenders can usually see the offense coming, so they build their own momentum before contact. They use their defense partner as leverage (something to push against) when they get pushed back. And an offense player arriving on a boost or bomb bounces off the defender rather than starting to push them.
  - Bambi's reasoning: inactive defense is much more controlled. Active defense raises everyone's speed (balls colliding and boosting at full pace), so things can go wrong easily. Active defense tries to stop the boost in its tracks; inactive defense controls where the boost goes instead.

## Bambi's theories (not established meta)
- Flow, not battles: TagPro is a flow game, not a series of individual battles. Letting the other team get a result that looks "good" can be better for your team.
- Controlled past 2 in a stalemate: deliberately letting the enemy grab and get past 2, in a controlled way, creates an asymmetry in the flow. It lets your defense help your offense for a moment.
  - Origin: mostly theory drawn from accidental past 2s, not a practiced strategy.
  - More precisely it is "ahead of 2" than a true past 2: the carrier is ahead of both defenders, but the defenders follow close behind, close enough that the carrier cannot turn back (any turn lets them catch up, since all balls have the same top speed). The carrier is effectively herded forward, toward your offense in the enemy half.
  - Letting them past 2 with a direct, open shot to their own flag is bad, unless your offense has been told beforehand so they can set up (e.g. OD / containment).
  - The enemy regrab left on your flag tile is the accepted cost.
  - Full sequence as Bambi describes it: the enemy defense loosens to come out and block for their carrier. Your team now effectively has 4 OD on their flag, so it is 4 against 2 at their flag, and the carrier gets popped. Their regrab picks up your flag, but the popped carrier is still about 3 seconds from respawning, so their chain has no next regrab yet. Your players walk back and close in on the new carrier before the chain can get going. Meanwhile their defense is out of position, so your team has a good chance to get its own grab going.
  - The point is the flow and the asymmetry: for a few seconds your team has numbers where it matters and theirs is spread out.

## Open questions
- Which elements matter most in play: partly answered. Some say the game has devolved into "whoever wins the tagpros wins"; Bambi disagrees. On some maps bombs are too powerful, which makes those maps luck-based.
- Why no kiss made anti less useful (unknown even to the community; a candidate question for the data).
