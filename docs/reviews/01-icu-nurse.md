# Peer Review 01 — ICU Registered Nurse / Clinical Educator
**App reviewed:** `/workspace/icu-quickref/` (v1.0.0-draft, content date 2026-10-04) — `data.js` (all 25 conditions + Quick Tools), `app.js` (rendering/timer/checklists), `index.html` (also skimmed `sw.js`, `manifest.json`, README)
**Reviewer role:** veteran adult ICU RN, CCRN, clinical educator, ACLS/PALS instructor
**Date of review:** 2026-10-04 (America/Chicago)
**Files modified in the app:** none (read-only review)

---

## 0. How to read this review

### Severity key
| Level | Meaning |
|---|---|
| **CRITICAL** | Plausible route to patient harm if a stressed nurse follows/misreads it. Fix before any clinical use. |
| **MAJOR** | Factually outdated/incorrect, or implies out-of-scope/no-order action, or a significant omission. Fix before release. |
| **MINOR** | Imprecise, inconsistent, or incomplete, but unlikely to cause harm alone. |
| **SUGGESTION** | Improvement to usability, brevity, or coverage. |

### Guideline editions I compared against (and how sure I am)
The app's own `sources` list is **behind the current literature as of today (2026-10-04)**. I checked the following current sources on the web while writing this review; everything else is from my own clinical knowledge and is marked **[UNSURE]** where I could not confirm.

| Topic | App cites | Current edition I compared against | Verified how |
|---|---|---|---|
| Cardiac arrest / ALS | AHA ACLS + "2023 focused update" | **AHA 2025 Guidelines for CPR & ECC** (Part 9 Adult ALS; Part 11 Post-Cardiac Arrest Care), published Oct 2025 | Read AHA Part 9 page and summaries of Part 11 — confirmed items are marked **[AHA-2025 ✔]** |
| Sepsis | SSC 2021 | **Surviving Sepsis Campaign 2026** (published 2026-03-23; 129 statements) | Read the SCCM recommendation list — **[SSC-2026 ✔]** |
| Stroke | AHA/ASA 2019 (+updates) | **2026 AHA/ASA Early Management of Acute Ischemic Stroke Guideline** (published online 2026-01-26) | Read AHA/ASA summary/abstract pages — **[AIS-2026 ✔]** (I did not read every recommendation) |
| DKA/HHS | "2024 consensus" | ADA/EASD/JBDS/AACE/DTS **2024 Hyperglycemic Crises Consensus** | Read via PMC/summary — **[ADA-2024 ✔]**. *The app cites this document but its content follows the older (2009-era) thresholds* |
| Anticoagulant reversal | andexanet listed | FDA safety communication / AstraZeneca withdrawal of Andexxa from US market, effective 2025-12-22 | Confirmed on FDA + AABB + Medscape |
| ARDS | ARDSNet, ATS/ESICM/SCCM 2017, PROSEVA | ARDSNet (ARMA) + SSC 2026 ventilation statements; ROSE trial (NEJM 2019) from memory | SSC 2026 ✔; ROSE **[from memory — confident on direction]** |
| ICH / SAH | AHA/ASA ICH 2022 | Same (still current as far as I know) | Memory — **[UNSURE on any 2025–26 update]** |
| ACS | ACC/AHA Chest Pain 2021 | Same; I am aware an ACC/AHA **2025 ACS guideline** exists but I did **not** read it | **[UNSURE]** — flagged where it matters (β-blocker, LBBB/OMI) |
| Status epilepticus | NCS 2012 / AES 2016 | Same (AES 2016 is still the one most protocols follow) | Memory — **[UNSURE on newer updates]** |
| AHA 2025 energy for narrow/wide regular tachycardia, atropine dose, post-ROSC SpO₂ target | — | I only confirmed **AF/flutter ≥200 J** and several drug-safety statements in 2025 | Everything else marked **[UNVERIFIED vs 2025]** |

> **Honest limitation:** I did not re-derive every dose from primary text. Where I say "✔ consistent", it means consistent with my working knowledge of the guideline named; where I say "verify," I mean I could not confirm it.

### Scope-of-practice shorthand used in suggested wording
- **[RN]** = nurse may do independently within usual hospital policy/standing protocol (assess, position, call, monitor, glucose check, O₂, suction, BVM, pads on, start CPR, apply nurse-driven protocols).
- **[ORDER]** = needs a provider order **or** an active standing order/protocol (drugs, fluids, labs in most settings, Foley, central access, vent changes).
- **[PROVIDER]** = performed by a physician/APP/credentialed clinician (needle/finger decompression, chest tube insertion, pericardiocentesis, intubation, lysis decision, thoracotomy/resternotomy, balloon tamponade placement).
- Scope varies by state/facility; the app should say this once on the About page **and** tag the steps.

---

## 1. Executive summary (read this first)

**Overall:** The content is a well-organized, genuinely useful *draft*. Structure ("First things first → Recognize → Actions → Monitor → Meds → Escalate") fits how ICU nurses think, most doses match what I teach, and many cards contain strong safety pearls (e.g., check K⁺ before insulin, don't give adenosine for irregular/polymorphic rhythms, salicylate-intubation caution, analgesia-first sedation, hold-insulin/add-dextrose in DKA when K⁺ is low or glucose falls, etc.).

**But it is not safe to release as an emergency, on-the-job tool yet.** The issues that worry me most:

1. **App behavior (CRITICAL):** ticked checklist steps are saved in localStorage and **persist between patients/events** until someone presses Reset. The next nurse opening "Anaphylaxis" or "Cardiac arrest" can see steps pre-ticked and a progress bar partly full → false reassurance → omitted steps.
2. **Look-alike drug/concentration hazards not called out (CRITICAL):** anaphylaxis IM epinephrine "1 mg/mL" with no warning against the 0.1 mg/mL code-cart syringe; **nimodipine** with no "ORAL/ENTERAL ONLY — NEVER IV"; inconsistent/oversized norepinephrine range (0.01–3 mcg/kg/min) and mixed weight-based/non-weight-based units; KCl "20–30 mEq/h" with no concentration/central-line/monitor/pump/order-verification safeguards (DK-2); succinylcholine contraindications missing (RF-1); amiodarone not excluded in pre-excited AF (AF-2).
3. **Out-of-date vs current guidelines (MAJOR):** post-ROSC temperature control "≥24 h" (AHA 2025: ≥36 h); ETCO₂ "rise ≥40"; AF cardioversion "120–200 J" (2025: ≥200 J); pre-excited AF omits **amiodarone** as harmful (2025 COR 3: Harm); adenosine "caution asthma" (2025 text: contraindicated); qSOFA-based sepsis recognition (SSC 2026 recommends against qSOFA as single tool); DKA K⁺ threshold 3.3/bicarb <6.9/fluids (ADA-2024: 3.5/7.0/500–1000 mL/h); **andexanet** still recommended (withdrawn from the US market 12/2025).
4. **Scope of practice (MAJOR):** many steps are written as bare imperatives that read as nurse-independent (aspirin + nitroglycerin, IM benzodiazepine, sedation for cardioversion, naloxone, hyperosmolar therapy "NOW", IV insulin/KCl, antibiotics, thrombolytic-related actions). Nothing visually distinguishes **[RN] / [ORDER] / [PROVIDER]**. Several provider-only procedures (finger thoracostomy, chest tube, pericardiocentesis, balloon tamponade) sit in the same numbered list as nurse tasks.
5. **Prioritization (MAJOR):** only 4 of 25 conditions are tagged "Emergency" (arrest, anaphylaxis, tension PTX, status epilepticus). Unstable tachycardia, symptomatic bradycardia, hyperkalemia with ECG changes, hypoglycemia, herniation/ICH, acute stroke, hemorrhagic shock, tamponade, massive PE, vent emergencies are all time-critical and equally "emergency" to a bedside nurse. Also the **code timer is on the Tools tab, not on the Cardiac Arrest card** (the tab bar is hidden on condition pages), and it can be stopped/restarted with one tap that **silently wipes epinephrine/shock counts**.
6. **Content gaps (MAJOR):** very common ICU emergencies are absent (acute pulmonary edema/hypertensive emergency, asthma/COPD with auto-PEEP, trach/airway emergencies, post-cardiac-surgery arrest/resternotomy, severe Na⁺/electrolyte emergencies, aortic dissection, transfusion reaction, HHS, hyperthermia syndromes, etc.).

**Verdict: DO NOT release for clinical use in current form.** With the CRITICAL/MAJOR items corrected and a formal sign-off by your educator + medical director + pharmacy (the app itself says "NOT YET CLINICALLY REVIEWED"), this could be a good tool. See §9 verdict and §10 top-10.

**Finding count:** 178 individually numbered findings — **6 CRITICAL** (G-1, AN-1, AF-2, RF-1, IC-1, DK-2), **54 MAJOR**, **92 MINOR**, **26 SUGGESTION**. (Prefixes: G = cross-cutting, QT = Quick Tools, APP = app/timer/index/sw, two-letter condition codes = cards.)

---

## 2. Cross-cutting findings (apply to many/all cards)

**G-1 · CRITICAL · App — checklist ticks persist across patients (app.js)**
- Quote: `var chk = store.get('chk.' + id, { a: [], m: [] });` … `store.set('chk.' + id, chk);` (ticks saved per condition in localStorage until the user taps **↺ Reset**); progress bar `prog-a` shows e.g. "7/12".
- Why: Ticks are meant as a *within-event* aid, but they survive app close, shift change, and the next patient. Opening "Anaphylaxis" tomorrow can show steps 1–5 already ticked and a partly-filled bar. A stressed nurse will assume those steps are done. This is a classic "false completion" hazard.
- Fix: (a) auto-expire ticks after a short time (e.g., 2–4 h) **and** whenever the app is re-opened after >30 min; (b) show "Ticked at HH:MM — tap to clear" banner at top of the card; (c) never persist ticks for the 4–5 emergency cards (arrest, anaphylaxis, tension PTX, seizure, tachy/brady) — or at least require explicit "Start new event" before ticking.

**G-2 · MAJOR · About/`sources` — references are behind current editions**
- Quote: `"AHA Advanced Cardiovascular Life Support (ACLS) Guidelines & 2023 focused update…"`, `"Surviving Sepsis Campaign International Guidelines 2021 (and Hour-1 bundle)"`, `"AHA/ASA Guidelines for Early Management of Acute Ischemic Stroke (2019 + updates)…"`
- Why: As of 2026-10-04 there is an **AHA 2025 CPR/ECC guideline set**, **SSC 2026**, and an **AHA/ASA 2026 AIS guideline**. Listing old editions while teaching old numbers invites mismatches with what the hospital now teaches (several concrete mismatches are listed below).
- Fix: Update the source list to the exact editions after the content is revised; add "Last verified against" date per card; keep "Facility protocol supersedes".

**G-3 · MAJOR · All action lists — no visible scope/order tagging**
- Quote (examples): "Aspirin 162–325 mg chewed…", "Nitroglycerin 0.4 mg SL q5 min ×3…", "At 5 min — FIRST-LINE benzodiazepine (one of): IV lorazepam…", "UNSTABLE: sedate if conscious…", "Herniation / ICP >22: hyperosmolar therapy — 23.4% saline 30 mL…", "Epinephrine 1 mg IV/IO every 3–5 min."
- Why: These read as nurse-independent. In most hospitals they are *protocol/standing-order* or *per-order* actions. Telling a nurse to "give" a drug with no order marker either (a) encourages out-of-scope practice, or (b) makes the nurse hesitate during a code because it is unclear what is allowed. Both are bad in an emergency.
- Fix: Add a 3-icon tag at line start (`RN` / `ORDER` / `MD`), e.g. `[ORDER] Epinephrine 1 mg IV/IO q3–5 min (code leader/ACLS protocol; read back).` Add a one-line legend at top of each card and explain on About that tags are *typical* and facility policy governs. Convert imperative drug lines to "**Anticipate / give per order:**".

**G-4 · MAJOR · High-alert drugs — no high-alert flagging, inconsistent units/ranges**
- Quote: "Norepinephrine 0.01–3 mcg/kg/min (titrate to MAP) — often first-line" (cardiogenic shock) vs "Norepinephrine 0.05–0.5+ mcg/kg/min…" (sepsis) vs "Epinephrine 2–10 mcg/min" (bradycardia) vs "…give 20–30 mEq/h KCl…" (DKA) vs "23.4% saline 30 mL via central line over 10–20 min" (ICH).
- Why: Weight-based (mcg/kg/min) vs flat (mcg/min or mg/h) units and a 300-fold range are exactly how pump-programming errors happen. Concentrated KCl, 23.4% NaCl, insulin, heparin, vasopressors, push-dose pressors, epinephrine concentrations are ISMP high-alert.
- Fix: Add a **HIGH-ALERT** pill on those lines + "Use pump drug library / independent double-check / pharmacy-standard concentration." Normalize ranges across cards ("Norepinephrine: start ~0.05 mcg/kg/min (≈2–4 mcg/min); typical 0.05–0.5; > ~1 mcg/kg/min refractory — call"), and note "match your pump library units."

**G-5 · MAJOR · Home/Emergency grid — too few conditions flagged `emergency:true`**
- Quote: `emergency: true` appears only on `cardiac-arrest`, `anaphylaxis`, `tension-pneumothorax`, `status-epilepticus`.
- Why: Home groups only these 4 in the red "Emergency" grid. In a real ICU, the nurse also needs 1-tap access to: unstable tachycardia, symptomatic bradycardia, hyperkalemia with ECG changes, severe hypoglycemia, acute stroke/code stroke, ICH/herniation, hemorrhagic shock, tamponade, massive PE, vent/airway emergencies (DOPE), septic shock.
- Fix: Flag ≥12 cards `emergency:true` (list in §8) and order the grid by "seconds-to-minutes" time criticality (arrest → airway/vent → tachy/brady → anaphylaxis → tension PTX → herniation/stroke → seizure → hypoglycemia → hyperK → hemorrhage/tamponade/PE/sepsis).

**G-6 · MINOR · "Call rapid response" wording in an ICU setting**
- Quote: "!Call rapid response / provider STAT." (many cards)
- Why: ICU patients are usually already under an in-house intensivist/APP; many ICUs don't use an RRT, and in some hospitals the RRT is *for ward patients*. A nurse may waste seconds working out who to call.
- Fix: Configurable wording: "Call code / RRT / ICU provider per unit" using `facilityNote` to inject the right phrase and numbers.

**G-7 · MINOR · Numbered, tick-able "steps" mix parallel, alternative, and conditional actions**
- Quote (Cardiac arrest steps 5–6): "SHOCKABLE (VF / pulseless VT): shock once…" / "NON-SHOCKABLE (PEA / asystole): resume CPR; give epinephrine as soon as IV/IO access obtained." followed by step 7 "Establish IV/IO access (do not interrupt CPR)."
- Why: (a) Steps 5 & 6 are *alternatives* but get ticked like a sequence; (b) step 6 needs IV/IO that is established only in step 7; (c) the list isn't time-bucketed. Under stress, numbering implies strict order.
- Fix: Group as **"0–1 min", "1–5 min", "Then"** with parallel items marked "(at same time)", and render "IF A / IF B" branches as separate sub-blocks that are not ticked as if all must be done.

**G-8 · SUGGESTION · Brevity: too many long, dose-laden lines for a stressed reader**
- Why: Many cards have 10–12 "Immediate actions" with 25–45-word lines and dose strings. In the first 1–5 min the nurse needs ≤6–7 short imperatives. The "First things first" box is good — keep it; make the Actions list *time-staged* and move dose strings to the Meds panel.
- Fix (example for Anaphylaxis, see §3 AN):
  `0–1 min: STOP trigger · CALL · EPI IM 0.3–0.5 mg (1 mg/mL!) thigh [per anaphylaxis order/protocol] · supine, legs up · O₂ 10–15 L NRB`
  `1–5 min: monitor q1–5 min · 2 large IVs · 1–2 L crystalloid · repeat epi q5–15 min`

**G-9 · MINOR · Inconsistent thresholds between cards**
- Examples: hypoglycemia treat threshold "<60" (stroke) vs "<70" (seizure/hypoglycemia); hyperK "K >5.0–5.2 → no K" vs "K >5.5" (DKA escalate); pulse-check "≤10 s" fine. Consider one "defined thresholds" glossary for glucose, K⁺, MAP, SpO₂.

**G-10 · SUGGESTION · Adult-only, non-pregnant default is not stated; pregnancy/obesity/renal modifiers absent**
- Fix: Banner "Adult dosing. Pregnancy, renal/hepatic failure, obesity, transplant — check with pharmacy." Add pregnancy modifiers where they matter (arrest: manual left uterine displacement + early OB/neonatal call; seizure: eclampsia/Mg; anaphylaxis: left-lateral).

**G-11 · MINOR · Facility numbers blank and not tappable (data.js `facilityNote: ""`; index.html `format-detection telephone=no`)**
- Why: Rapid response/pharmacy/poison numbers appear only on the About page, only if filled in; Poison Control `1-800-222-1222` isn't a tap-to-call link and iOS auto-linking is explicitly disabled.
- Fix: Put a persistent top-bar "Call" shortcut (RRT/Code/Pharmacy/Poison) and render phone numbers as `tel:` links.

**G-12 · SUGGESTION · Offline/cache-first service worker may serve stale clinical content**
- Why: `sw.js` is cache-first with background refresh; a corrected dose will not display until the *next* launch after a version bump. README acknowledges it.
- Fix: Show "Content version/last reviewed" on every card header (not only footer) and display a visible "Update available — reload" banner when a new SW installs (currently a 1.8 s toast).

---

## 3. Condition-by-condition review (all 25)

Format: **ID · SEVERITY · topic** → quoted text → why → suggested wording. "✔" lines at the end of a condition list things I checked and found consistent with guidelines, so you know they were reviewed, not skipped.

---

### 3.1 Cardiac arrest (ACLS overview) — `cardiac-arrest`  *(compared to AHA 2020 and AHA 2025)*

**CA-1 · MAJOR · Post-ROSC temperature control duration is outdated**
- Quote: "Comatose after ROSC (not following commands): targeted temperature management 32–37.5 °C ≥24 h; prevent fever"
- Why: [AHA-2025 ✔] "It is reasonable that temperature control be maintained for **at least 36 hours** in adults who remain unresponsive to verbal commands after ROSC" (hypothermic 32–34 °C *or* normothermic/fever-prevention 36–37.5 °C are both acceptable).
- Fix: "Not following commands after ROSC: active temperature control (32–37.5 °C) **for ≥36 h** per provider/protocol; no fever."

**CA-2 · MAJOR · ETCO₂ numbers are misleading**
- Quote: "Check ETCO₂ (goal ideally >10–20 mmHg; sudden rise ≥40 may signal ROSC)"
- Why: [AHA-2025 ✔] ETCO₂ ≥10, ideally ≥20 mmHg suggests adequate compressions; an **abrupt sustained increase (commonly >10 mmHg)** may indicate ROSC — there is no "≥40" threshold, and ROSC can occur with a smaller rise. 2025 also says a specific ETCO₂ cutoff should **not** be used alone to stop resuscitation in non-intubated patients.
- Fix: "ETCO₂: aim ≥10 (ideally ≥20) mmHg during CPR. Abrupt sustained jump (>10 mmHg) = possible ROSC → pulse/rhythm check at next pause. Never stop a code on ETCO₂ alone."

**CA-3 · MAJOR · Code-status verification is buried at the bottom and phrased ambiguously**
- Quote (escalate, last-but-one bullet): "Confirm code status / POLST / goals of care — if DNR documented, do not start; notify provider"
- Why: The first thing every ICU nurse checks/knows is code status; here it appears *after* debrief-level items. "Do not start" is correct only for a **valid, current DNR order**; the nurse must not hunt for status while a patient is pulseless without one.
- Fix: Put in "First things first": "No valid DNR order = start CPR now. Verify code status **in parallel** (chart/armband/provider). Valid DNR = do not start; notify provider; comfort care." Remove from Escalate.

**CA-4 · MAJOR · ACLS drugs read as nurse-independent**
- Quote: "Epinephrine 1 mg IV/IO every 3–5 min. (Shockable: after 2nd shock.) Record each dose time." / "Refractory VF/pVT (after 3rd shock): amiodarone 300 mg IV/IO, then 150 mg once (or lidocaine 1–1.5 mg/kg, then 0.5–0.75 mg/kg)."
- Why: In a code the nurse gives ACLS drugs **on the code leader's verbal order / ACLS protocol with read-back**. Also timing: [AHA-2025 ✔] epinephrine "as soon as feasible" for non-shockable; for shockable "after initial defibrillation attempts have failed" (the "after 2nd shock" detail is the 2020/2023 algorithm and is a reasonable implementation; **[UNVERIFIED vs 2025 figure]**). Antiarrhythmics are COR 2b "may be considered" for VF/pVT unresponsive to defibrillation (the "after 3rd shock" timing is the 2020 algorithm; **[UNVERIFIED vs 2025 figure]**).
- Fix: "[ORDER] Give epinephrine 1 mg IV/IO q3–5 min on code-leader order (about every 2nd CPR cycle); read back; log time." / "VF/pVT persisting after shocks: amiodarone 300 mg then 150 mg, or lidocaine 1–1.5 mg/kg then 0.5–0.75 mg/kg — on order."

**CA-5 · MINOR · Sequence: epi before access; airway before pads; monitored ICU patient**
- Quote: step 6 "NON-SHOCKABLE (PEA / asystole): resume CPR; give epinephrine as soon as IV/IO access obtained." precedes step 7 "Establish IV/IO access (do not interrupt CPR)." Also step 3 "Ventilate: 30:2 with BVM…" precedes step 4 "Attach pads/monitor."
- Why: In a *monitored* ICU patient, pads/monitor and rhythm identification are the quickest route to defibrillation (the first shock is the highest-yield action for VF/pVT). Many ICU patients already have IV/art line/central line — "obtain access" is often "use existing line."
- Fix: "1 Call code + start compressions. 2 Pads on/monitor → rhythm (shock immediately if VF/pVT). 3 Existing IV/central line or IO. 4 BVM 100% O₂ (30:2) → advanced airway later."

**CA-6 · MINOR · Defibrillation energy and single-shock wording**
- Quote: "shock once at device-recommended energy (biphasic 120–200 J)"
- Why: [AHA-2025 ✔] single-shock strategy ✔; energy per **manufacturer**; if unknown, **use the device maximum**. "120–200" is a range some nurses will pick from arbitrarily.
- Fix: "Shock once at the device's labeled biphasic energy (if unknown: maximum). Resume compressions immediately."

**CA-7 · MAJOR · No post-cardiac-surgery arrest pathway on the arrest card**
- Quote: (only appears in Tamponade) "!Cardiac arrest/PEA post-cardiac surgery → follow CALS (emergency resternotomy) per facility"
- Why: Many ICUs are CT/cardiac ICUs. Post-cardiac-surgery arrest is different (surgeon at bedside, early resternotomy, pacing wires, avoid epinephrine boluses, consider up to 3 stacked shocks before CPR). Your nurses will open "Cardiac arrest" first. [AHA-2025] notes unknown benefit of stacked vs single shock in monitored in-hospital/cardiac-surgery arrest; **STS CALS specifics [UNSURE – verify with your CT surgeons]**.
- Fix: Add a red box on the arrest card: "Post-cardiac-surgery pt (≤10 days)? → Call CT surgeon + follow unit CALS protocol (stacked shocks/pacing, early resternotomy). See Tamponade."

**CA-8 · MINOR · Defibrillation safety not stated**
- Quote: (absent from steps 3–5)
- Why: "Clear: hands off, O₂ off/away, no one touching bed/patient" is a core ACLS safety call; also remove nitro patch/ remove pads from pacemaker site (≥1 in away) — these cause burns/failed shocks.
- Fix: Add to the shock step: "Call 'CLEAR' — hands off, O₂ away. Pads ≥1 in from pacemaker/ICD; remove medication patches."

**CA-9 · MINOR · Calcium / bicarbonate / magnesium "reflex" use**
- Quote: "Reversible-cause therapy: calcium/bicarb/insulin-dextrose (hyperK), fluids/blood, needle decompression, thrombolytic (PE), naloxone (opioid), etc."
- Why: [AHA-2025 ✔] **Routine** calcium, bicarbonate, and magnesium are *not* recommended in arrest (COR 3: No Benefit); calcium/bicarb are for specific causes (hyperK, toxins). The line is correct but could be read as "give these".
- Fix: Add "**Not routine** — only for suspected hyperK, CCB/β-blocker toxicity, TCA/Na-channel toxicity (bicarb), torsades (Mg)."

**CA-10 · MINOR · Post-ROSC oxygen/BP targets**
- Quote: "Target SBP ≥90 and MAP ≥65; SpO₂ 92–98% (avoid hyperoxia, avoid hypoxia); PaCO₂ 35–45"
- Why: [AHA-2025 ✔] "avoid hypotension, **MAP ≥65**"; the "SBP ≥90" is a 2020-era target and is fine but redundant. SpO₂ 92–98% matches 2020; **[UNVERIFIED vs 2025 Part 11 SpO₂ wording]** — please confirm.
- Fix: "MAP ≥65 (avoid hypotension)… SpO₂ per provider (titrate to avoid hypoxia and hyperoxia)."

**CA-11 · SUGGESTION · Pregnancy**
- Fix: "Pregnant (visible ≥20 wk)? Manual left uterine displacement, call OB/neonatal early, prepare for resuscitative hysterotomy by ~4–5 min [verify with facility policy]."

✔ Checked and consistent: CPR rate 100–120, depth 2–2.4 in, full recoil, rotate q2 min; ventilation 30:2 / 1 breath q6 s with advanced airway; check pulse ≤10 s; epinephrine 1 mg q3–5 min; amiodarone 300 → 150 mg; lidocaine 1–1.5 → 0.5–0.75 mg/kg; Mg only for torsades; IV first/IO alternative; waveform capnography for tube confirmation; "do not delay CPR to be sure"; neuroprognostication delayed ≥72 h and multimodal.

---

### 3.2 Anaphylaxis — `anaphylaxis`

**AN-1 · CRITICAL · Epinephrine concentration hazard (1 mg/mL IM vs 0.1 mg/mL cart syringe)**
- Quote: "EPINEPHRINE IM 0.3–0.5 mg (1 mg/mL) lateral thigh NOW — repeat q5–15 min" and "EPINEPHRINE IM 0.3–0.5 mg (0.01 mg/kg, max 0.5 mg) of 1 mg/mL (1:1000) into anterolateral mid-thigh."
- Why: The code cart holds epinephrine **0.1 mg/mL (1:10,000)** 10 mL syringes. Drawing 0.3–0.5 mg from the wrong product gives 3–5 mL of 0.1 mg/mL (volume-wrong, delay) or, worse, giving **1 mg/mL IV push** is a 10-fold overdose → VT/VF, MI, ICH. The number is present, but no warning.
- Fix: Add a red hazard line: "**1 mg/mL (1:1000) = IM only (0.3–0.5 mg = 0.3–0.5 mL). Do NOT push 1 mg/mL IV. Code-cart 0.1 mg/mL syringe is for IV arrest dosing.**"

**AN-2 · MAJOR · Nurse-initiated epinephrine without stating order/protocol**
- Quote: "EPINEPHRINE IM… Do not delay for IV access." (action 3; glance line 2 "NOW")
- Why: Best practice and most standing orders let the nurse give IM epi immediately for anaphylaxis, but that depends on the hospital. The card currently implies it is always independent.
- Fix: "[ORDER/PROTOCOL] Give IM epinephrine per anaphylaxis standing order. **If you have no standing order, get a verbal order immediately (call/RRT) — do not wait for provider arrival.**"

**AN-3 · MINOR · Adjuncts have weak evidence and can mislead**
- Quote: "Adjuncts AFTER epinephrine: H1 blocker (diphenhydramine 25–50 mg IV), H2 blocker (famotidine 20 mg IV), corticosteroid (e.g., methylprednisolone 1–2 mg/kg) — do not replace epinephrine."
- Why: Wording is appropriately cautious, but the three drugs are listed as an action step in a *numbered* list, which invites ticking them off. Rapid IV diphenhydramine can cause hypotension and sedation that masks airway deterioration; steroid benefit for prevention of biphasic reaction is unproven (AAAAI/ACAAI practice parameter **[from memory — confident]**).
- Fix: Move to Meds as "optional, never before epi"; add "give IV diphenhydramine slowly; sedation can mask airway swelling."

**AN-4 · MINOR · Epinephrine infusion line is ambiguous**
- Quote: "Epinephrine infusion (refractory): typically 0.05–0.1 mcg/kg/min titrated (e.g., 1–10 mcg/min)"
- Why: Two unit systems in one line; 0.1 mcg/kg/min in a 70 kg adult ≈ 7 mcg/min. Infusions need a standard concentration/pump library and continuous BP.
- Fix: "[ORDER · HIGH-ALERT] Epinephrine infusion per pharmacy-standard concentration (typical start ~0.05–0.1 mcg/kg/min ≈ 3.5–7 mcg/min in 70 kg), titrate to MAP; arterial line if available."

**AN-5 · MINOR · Transfusion-reaction line is incomplete**
- Quote: "Transfusion reaction: stop transfusion, keep line open with saline, notify blood bank"
- Why: Missing "**change tubing** and don't restart", recheck patient/product IDs, send bag + tubing, and obtain required post-reaction labs/urine. Also not every transfusion reaction is anaphylaxis (hemolytic, TACO, TRALI, febrile).
- Fix: "Transfusion reaction: STOP → change tubing, run NS → recheck patient/product ID at bedside → call provider + blood bank → send bag/tubing/samples per policy. Do not restart."

**AN-6 · SUGGESTION · ICU-specific triggers missing**
- Fix: Add to "Recognize"/keywords: neuromuscular blockers and **sugammadex**, chlorhexidine, latex, antibiotics (β-lactams), contrast, blood products, protamine; patients on β-blockers (resistant) and ACE-i.

**AN-7 · MINOR · "Escalate" wording for ICU**
- Quote: "Persistent hypotension after 2–3 IM epinephrine doses + fluids → ICU/infusion, add pressor"
- Why: Nurse is already in the ICU; "ICU/infusion" is confusing.
- Fix: "No response after 2 IM doses + fluids → start epinephrine infusion per order; prepare airway/pressors; call intensivist."

✔ Checked and consistent: IM epinephrine 0.01 mg/kg (0.3–0.5 mg adult, max 0.5 mg) into anterolateral thigh, repeat q5–15 min; supine/legs up; high-flow O₂; 1–2 L crystalloid; glucagon for β-blocker patients; biphasic reaction counseling; tryptase timing; criteria for diagnosing anaphylaxis (WAO/NIAID).

---

### 3.3 Tension pneumothorax — `tension-pneumothorax`

**TP-1 · MAJOR · Provider-only procedures listed as steps in a nurse action list**
- Quote: "Alternative if trained/available: finger (simple) thoracostomy 4th–5th ICS, then chest tube." and "Chest tube placement (definitive) — assist; connect to water seal/suction per order."
- Why: Needle decompression is described "per provider/protocol", which is good, but finger thoracostomy is presented as an alternative a nurse might do. In nearly all US hospitals, needle/finger decompression and chest tubes are **provider (or specifically credentialed RT/ICU RN-practitioner) procedures**.
- Fix: Tag `[PROVIDER]` on needle decompression, finger thoracostomy, chest tube insertion. Nurse role: recognize → call → O₂/bag → *set up* the equipment → *assist* → reassess.

**TP-2 · MINOR · Imaging language might delay a decompression in a stable-looking but deteriorating patient**
- Quote: "Portable CXR after decompression (not before)."
- Why: For an *unstable* patient this is correct; for a stable ventilated patient with new PTX on ultrasound, CXR/US confirmation is appropriate. The phrase can be generalized incorrectly.
- Fix: "Unstable? Do **not** wait for CXR. Stable? Bedside US/CXR per provider."

**TP-3 · MINOR · Irrelevant line**
- Quote: "Hold nitrous oxide; minimize PEEP/pressures as directed by provider"
- Why: Nitrous oxide is rarely used in ICU; noise in an emergency card.
- Fix: Delete "Hold nitrous oxide"; keep "PEEP/pressure changes only as directed by provider/RT."

**TP-4 · MAJOR · Chest tube safety omissions**
- Quote: (Monitor) "Chest tube: bubbling (air leak), output amount/color, tidaling, system upright and below chest"
- Why: Missing the three highest-yield chest-tube safety rules: **never clamp** a chest tube with an air leak (can create a tension PTX); tube disconnected → reconnect/place end in sterile water per policy and call; tube dislodged → cover site with occlusive dressing per policy and call. Also **don't strip/milk** routinely (see TM-1).
- Fix: Add a red box: "Do NOT clamp a tube with air leak. Keep drainage system below chest. Disconnected/dislodged → cover/reconnect per policy, call, reassess for tension."

**TP-5 · MINOR · Hemothorax numbers lack time window**
- Quote: "Large persistent air leak, or hemothorax output >1,500 mL initial or >200 mL/h → surgery"
- Why: ATLS-style criterion is >1,500 mL initially **or >200 mL/h for 2–4 h**. Nurse should also call for *sudden* increase with hypotension regardless of volume.
- Fix: "…or >200 mL/h for 2–4 h, or any sudden jump in output with hypotension → call surgeon now."

✔ Checked and consistent: clinical diagnosis, don't wait for imaging when unstable; DOPE; late tracheal deviation; 14 G ≥8 cm catheter (note: may be too short in obese ICU patients — add that); 5th ICS anterior-/mid-axillary (alt 2nd ICS MCL) just above the rib; bilateral decompression in PEA.

---

### 3.4 Status epilepticus / seizure — `status-epilepticus`  *(AES 2016 / NCS 2012)*

**SE-1 · MAJOR · "At ~20 min" can be read as "wait until 20 minutes"**
- Quote: "!At ~20 min if still seizing — SECOND-LINE (one): levetiracetam 60 mg/kg IV…"
- Why: AES/NCS describe *time windows* (initial 5–20 min, second-line 20–40 min). In practice the nurse should have the second-line agent **ready and request it as soon as the seizure persists after the benzodiazepine**, so that it is *running* by ~20 min. A literal reading delays treatment.
- Fix: "Still seizing 5 min after benzodiazepine (or seizure recurs)? **Request second-line now** (levetiracetam / fosphenytoin / valproate) — goal: infusing by 20 min from onset."

**SE-2 · MAJOR · Benzodiazepine step not marked per order/protocol**
- Quote: "!At 5 min — FIRST-LINE benzodiazepine (one of): IV lorazepam 0.1 mg/kg (max 4 mg/dose, may repeat once at 5 min); IM midazolam 10 mg (>40 kg), 5 mg (13–40 kg); IV diazepam 0.15–0.2 mg/kg (max 10 mg/dose)."
- Why: Doses ✔ match AES 2016. But administering is **[ORDER/protocol]**; many ICUs have a seizure PRN/standing order, many don't. Also IM midazolam is **single dose** per AES (no repeat); the repeat once applies to IV lorazepam/diazepam.
- Fix: "[ORDER] At 5 min give benzodiazepine per seizure order set (lorazepam IV, or midazolam IM if no IV). No order? **Ask for a verbal order at the 5-min call.** Repeat dose: IV lorazepam/diazepam once; IM midazolam is single-dose."

**SE-3 · MAJOR · Eclampsia missing**
- Quote: "New focal deficit, head trauma, fever/neck stiffness, pregnancy, anticoagulated pt → provider now"
- Why: Pregnancy/postpartum seizure is eclampsia until proven otherwise; first-line therapy is **magnesium sulfate** (e.g., 4–6 g IV load then 1–2 g/h per OB protocol), not a benzodiazepine-first pathway. Pregnancy is listed only as "call provider".
- Fix: Add to Recognize and Meds: "Pregnant/≤6 wk postpartum + seizure = eclampsia → magnesium sulfate per OB protocol (monitor reflexes/RR); left-lateral; call OB + RRT."

**SE-4 · MINOR · Fosphenytoin/phenytoin dose-expression error potential**
- Quote: "fosphenytoin 20 mg PE/kg (max 1,500 mg PE) at ≤150 mg PE/min"
- Why: PE vs mg confusion between fosphenytoin and phenytoin (max rates 150 mg PE/min vs 50 mg/min) is a well-known error.
- Fix: Add "fosphenytoin is dosed in PE; **phenytoin** max 50 mg/min (HIGH-ALERT; hypotension/arrhythmia; purple-glove/extravasation with phenytoin)."

**SE-5 · MINOR · Dextrose threshold and reference**
- Quote: "POINT-OF-CARE GLUCOSE. If <70 mg/dL (or unknown & seizing): dextrose per order; give thiamine first/with it if alcohol use or malnutrition."
- Why: ✔ reasonable; cross-reference to the Hypoglycemia card (dose) is missing.
- Fix: "…dextrose per order (see Hypoglycemia)."

**SE-6 · SUGGESTION · ICU patients on sedation/paralytics**
- Fix: Add "Paralytic or deep sedation can mask seizure — suspect NCSE with unexplained pupil change/tachycardia/BP spikes/autonomic swings; ask for cEEG." (Partly present under "Recognize".)

✔ Checked and consistent: time-the-seizure, protect airway/side-lying/nothing in mouth, glucose, 5-min threshold, doses/maximums for lorazepam/IM midazolam/diazepam/levetiracetam 60 mg/kg max 4,500/fosphenytoin 20 mg PE/kg max 1,500/valproate 40 mg/kg max 3,000, ≤150 mg PE/min, thiamine with dextrose, pyridoxine in INH toxicity, refractory = intubation + continuous infusion + cEEG.

---

### 3.5 Acute MI / ACS — `acs-mi`  *(ACC/AHA 2021 Chest Pain; STEMI guidance; I did not read the 2025 ACC/AHA ACS guideline — [UNSURE] where flagged)*

**AC-1 · MAJOR · "New LBBB" is no longer a STEMI equivalent on its own**
- Quote: "ECG: ST elevation ≥1 mm in ≥2 contiguous leads (…), new LBBB with symptoms, ST depression/T inversion, posterior (ST↓ V1–V3) → get V7–V9"
- Why: Current ACC/AHA teaching: new or presumed-new LBBB alone should not trigger cath-lab activation; use **Sgarbossa/modified Sgarbossa** criteria and clinical judgment; paced rhythm/LBBB/hyperacute T/aVR elevation with diffuse ST depression need provider review (OMI concept). **[UNSURE on exact 2025 wording]** but the "new LBBB = STEMI" shorthand is outdated.
- Fix: "ST elevation per criteria. **LBBB or paced rhythm + ischemic symptoms → show the ECG to the provider immediately (Sgarbossa) — don't wait for a 'perfect' STEMI.** Posterior MI: ST↓ V1–V3 → V7–V9."

**AC-2 · MAJOR · Aspirin and nitroglycerin presented as nurse-independent; missing contraindication screen for ICU patients**
- Quote: "Aspirin 162–325 mg chewed (non-enteric) unless allergy/already given/active major bleed." and "Nitroglycerin 0.4 mg SL q5 min ×3 for ongoing pain IF SBP ≥90–100 and no RV infarct, no PDE-5 inhibitor…"
- Why: Typical chest-pain standing orders allow both, but not universally. ICU patients are frequently intubated/NPO (can't chew), post-op, on anticoagulants, with GI bleeding, or have suspected dissection. Nitro: contraindicated also with SBP <90 **or ≥30 mmHg below baseline**, HR <50 or >100, RV infarct (get V4R first in inferior MI).
- Fix: "[PROTOCOL/ORDER] Aspirin 162–325 mg chewed (or PR 300 mg / via tube if can't swallow) **after screening: allergy, active bleeding, recent ICH/surgery, suspected dissection.** Nitroglycerin SL only if SBP ≥100 (or not >30 below baseline), HR 50–100, no RV infarct (V4R), no PDE-5 inhibitor (sildenafil/vardenafil 24 h; tadalafil 48 h)."

**AC-3 · MAJOR · Aortic dissection not mentioned**
- Quote: "Red flags: hypotension, pulmonary edema, new murmur, VT/VF, bradyarrhythmia/heart block"
- Why: Anticoagulants, antiplatelets, and lytics given for presumed ACS in a patient with unrecognized aortic dissection are lethal. Red flags: tearing/ripping pain to back, pulse/BP differential between arms, neuro deficit, widened mediastinum, new AR murmur.
- Fix: Add to Recognize: "**Tearing/back pain, arm BP difference, pulse deficit, neuro deficit → suspect aortic dissection: tell provider BEFORE anticoagulant/antiplatelet/lytic.**"

**AC-4 · MINOR · Type 2 (demand) MI in the ICU not addressed**
- Fix: "Troponin rise with sepsis/tachyarrhythmia/anemia/hypotension and no ST elevation = likely supply-demand → treat the cause; call provider before heparin/DAPT."

**AC-5 · MINOR · β-blocker bullet may be outdated [UNSURE]**
- Quote: "Opioid (fentanyl/morphine) cautiously · β-blocker PO within 24 h if stable"
- Why: Early-oral-β-blocker recommendations in post-MI patients with preserved EF have been narrowed by recent trials, and I believe the 2025 ACC/AHA ACS guideline reflects that. **[UNSURE — verify with cardiology]**. Also morphine delays P2Y12 absorption (prefer fentanyl) **[from memory]**.
- Fix: "β-blocker, opioid, antithrombotics: per cardiology order."

**AC-6 · MINOR · Door-to-balloon wording for an in-house patient**
- Quote: "STEMI = cath lab activation NOW (door-to-balloon goal ≤90 min)"
- Why: ICU patient didn't "arrive at the door." Use "time from first ECG/first medical contact to device ≤90 min (≤120 if transfer)".
- Fix: "…first-ECG-to-device goal ≤90 min."

✔ Checked and consistent: 12-lead within 10 min; STE thresholds (V2–V3 sex-specific) **(note: men <40 y use ≥2.5 mm)**; right-sided and posterior leads; aspirin 162–325 mg chewed; O₂ only if SpO₂ <90%; nitro contraindications ✔; avoid IV β-blocker in HF/shock; DOAC/antiplatelet history; fibrinolytic if PCI not within ~120 min; K ≥4, Mg ≥2.

---

### 3.6 Cardiogenic shock — `cardiogenic-shock`  *(SCAI staging cited but not used)*

**CS-1 · MAJOR · Norepinephrine range and units**
- Quote: "Norepinephrine 0.01–3 mcg/kg/min (titrate to MAP) — often first-line"
- Why: 3 mcg/kg/min ≈ 200+ mcg/min in a 70-kg adult; this is not a bedside-useful range and conflicts with the sepsis card (0.05–0.5+). Many hospitals program norepinephrine in mcg/min (flat), not mcg/kg/min.
- Fix: "[ORDER · HIGH-ALERT] Norepinephrine per order/pump library (usual ~0.05–0.5 mcg/kg/min); call provider if escalating beyond the ordered max or needing a second pressor."

**CS-2 · MINOR · Orders not specified for several steps**
- Quote: "Place Foley; strict I&O. Hold antihypertensives, β-blockers, ACE-i/ARB, and nephrotoxins as directed." / "Judicious fluid challenge (e.g., 250 mL) ONLY if clearly dry/no congestion"
- Why: Some are RN-initiated per protocol (I&O) and some require an order (fluids, holding meds). Tag them.

**CS-3 · MINOR · Milrinone detail**
- Quote: "milrinone if on β-blocker/need vasodilation"
- Why: Milrinone causes vasodilation/hypotension and accumulates in renal failure; avoid bolus loading dose if SBP low. Mentioned "renal dosing" in Meds but not in the action line.
- Fix: "Milrinone: hypotension and renal accumulation; no bolus if SBP low (per order)."

**CS-4 · SUGGESTION · MCS nursing detail (IABP/Impella/ECMO)**
- Fix: Add key nurse rules: keep leg straight on femoral devices; check distal pulses/color/temp hourly; Impella purge pressure alarms/position alarms — call; never turn off/reposition; ECMO line chatter, no suction; bleeding/hemolysis (dark urine, ↑LDH) — call.

✔ Checked and consistent: recognition criteria, avoidance of large fluid boluses when congested, caution with positive pressure, norepinephrine first-line vs dopamine, dobutamine 2–20 mcg/kg/min, diuretic once perfusion adequate, lactate trending, early cardiology/shock-team activation.

---

### 3.7 Atrial fibrillation with RVR — `afib-rvr`  *(AHA 2025 ALS Part 9: AF/flutter, WCT)*

**AF-1 · MAJOR · Cardioversion energy is outdated**
- Quote: "prepare synchronized cardioversion (biphasic 120–200 J per device/protocol)"
- Why: [AHA-2025 ✔] "initial energy setting of **at least 200 J** is reasonable [for AF] and incremented in the event of shock failure" (flutter: 200 J may be reasonable). Starting low increases repeat shocks/sedation time.
- Fix: "Synchronized cardioversion, start **200 J** biphasic (or device-labeled maximum for AF); sedation per provider; re-arm SYNC after each shock."

**AF-2 · CRITICAL · Pre-excited AF: amiodarone also contraindicated**
- Quote: "Do NOT give AV-nodal blockers (diltiazem, β-blocker, digoxin, adenosine) in suspected pre-excited AF (WPW) — call provider; procainamide or cardioversion." (and preceding step) "Hypotension, decompensated HF or reduced EF: avoid diltiazem/β-blocker; amiodarone 150 mg IV over 10 min…"
- Why: [AHA-2025 ✔] in **preexcited** AF/flutter, digoxin, non-DHP CCBs, β-blockers **and IV amiodarone** "should not be administered" (COR 3: Harm). The card correctly warns about AV-nodal blockers but omits amiodarone and recommends amiodarone one step earlier without a "not if wide/irregular/pre-excited" caveat. Wide irregular fast rhythm is also in the *Unstable tachycardia* card.
- Fix: "**Wide, irregular, varying QRS (possible WPW-AF): NO diltiazem, β-blocker, digoxin, adenosine, or amiodarone.** Call provider: cardioversion or procainamide." Add the same caveat on the amiodarone line.

**AF-3 · MAJOR · Rate-control drugs in septic/hypovolemic ICU patients**
- Quote: "STABLE, preserved EF: rate control per order — diltiazem 0.25 mg/kg IV over 2 min (≈15–20 mg), repeat 0.35 mg/kg in 15 min if needed, then infusion 5–15 mg/h; OR metoprolol 2.5–5 mg IV over 2 min q5 min up to ~15 mg."
- Why: ICU RVR is very often **compensatory** (sepsis, hypovolemia, bleeding, pain, withdrawal). Bolusing diltiazem/metoprolol into a borderline-BP septic patient is a classic ICU harm. [AHA-2025 ✔] also stresses deciding whether the arrhythmia is causative or secondary before treating it as the problem.
- Fix: Add before the drug step: "**Is the rate compensatory?** (sepsis, bleeding, hypovolemia, pain, hypoxia, PE, on pressors/inotropes, HR <150). Treat cause first. Hold/ask before diltiazem or β-blocker if SBP <100, on vasopressors, EF unknown/low, or acute HF."

**AF-4 · MINOR · Anticoagulation / conversion risk wording**
- Quote: "Ask about anticoagulation and duration of AF (>48 h/unknown → stroke risk with conversion)."
- Why: ✔ concept right, but it also applies to **chemical conversion (amiodarone)** and doesn't mean "delay cardioversion in unstable patients."
- Fix: "Unstable: cardiovert without delay. Stable & AF >48 h/unknown & not anticoagulated: conversion (including amiodarone) raises stroke risk — tell provider."

**AF-5 · MINOR · Digoxin dosing**
- Quote: "Digoxin 0.25 mg IV q2 h (max ~1–1.5 mg total loading) in HF"
- Why: Typical, but renal function/age/amiodarone interaction/digoxin level are not mentioned; K⁺ low increases toxicity.
- Fix: "[ORDER] Digoxin load per provider/pharmacy (renal function, K⁺, other levels)."

**AF-6 · SUGGESTION · Atrial flutter 2:1 (regular ~150) missing**
- Fix: "Regular narrow tachycardia fixed ≈150 = flutter 2:1 until proven otherwise; adenosine unmasks flutter waves (provider)."

✔ Checked and consistent: unstable features → cardiovert; K ≥4/Mg ≥2; HR <110 resting goal (lenient); diltiazem 0.25 → 0.35 mg/kg and infusion 5–15 mg/h; metoprolol 2.5–5 mg; amiodarone 150 mg → 1 mg/min ×6 h → 0.5 mg/min; avoiding negative inotropes in decompensated HF/LV dysfunction [AHA-2025 ✔].

---

### 3.8 Unstable tachycardia (with a pulse) — `unstable-tachy`

**UT-1 · MAJOR · Energies [UNVERIFIED vs 2025 except AF]**
- Quote: "Initial energy (biphasic): narrow regular 50–100 J; narrow irregular (AF) 120–200 J; wide regular (VT) 100 J. Increase stepwise if no response. Per device/protocol."
- Why: [AHA-2025 ✔] AF/flutter ≥200 J. The remaining numbers are 2015/2020-era; I could not confirm the 2025 algorithm figure — **[UNVERIFIED vs 2025]**.
- Fix: "AF/flutter: start 200 J. Narrow regular, wide regular: per device/protocol (2020 ranges 50–100 J / 100 J — confirm against your current ACLS cards). If shock fails: increase energy, check pads/SYNC."

**UT-2 · MAJOR · SYNC must be re-armed after each shock**
- Quote: "UNSTABLE: sedate if conscious (don't delay if crashing), SYNCHRONIZED cardioversion — verify 'SYNC' marker on R waves."
- Why: Most defibrillators **revert to unsynchronized mode after each shock**; a second cardioversion in unsynced mode can deliver a shock on the T wave → VF. Also, if sync markers don't appear or are on T waves, adjust lead/gain.
- Fix: "Verify SYNC markers on R waves **before every shock** (re-select SYNC after each shock). No reliable markers/polymorphic → call, defibrillate unsynchronized per provider."

**UT-3 · MAJOR · RN-delivered sedation not specified as per order**
- Quote: "UNSTABLE: sedate if conscious (don't delay if crashing)"
- Why: Procedural sedation (etomidate/midazolam/ketamine) is an order and requires airway-capable provider presence in nearly all hospitals.
- Fix: "[ORDER] Provider-directed sedation/analgesia if conscious (do not delay shock if crashing). Airway equipment at bedside."

**UT-4 · MAJOR · Torsades wording implies a "stable" torsades**
- Quote: "Torsades (polymorphic VT with long QT): magnesium 1–2 g IV; unstable → defibrillate."
- Why: [AHA-2025 ✔] Polymorphic VT is "**always unstable**" and needs immediate **unsynchronized shock**; magnesium follows to prevent recurrence. The card already says "Wide irregular / polymorphic VT: defibrillate (unsynchronized)" two lines earlier — the torsades line contradicts it.
- Fix: "Sustained polymorphic VT/torsades = defibrillate NOW (unsynchronized, max energy). Then magnesium 1–2 g IV for long-QT torsades; correct K⁺, stop QT drugs; pacing/isoproterenol per expert."

**UT-5 · MAJOR · Diltiazem/verapamil in wide-complex tachycardia not mentioned**
- Quote: "Adenosine is for REGULAR monomorphic rhythms only — never for irregular or polymorphic rhythms."
- Why: [AHA-2025 ✔] **verapamil and diltiazem should not be administered in wide-complex tachycardia (COR 3: Harm)**. In ICUs diltiazem is a go-to "SVT/AF" drug and is easy to push on a wide rhythm labelled "SVT with aberrancy."
- Fix: "**Wide QRS or unsure → NO diltiazem, verapamil.** Adenosine only for regular monomorphic (provider decision)."

**UT-6 · MAJOR · Adenosine cautions understated**
- Quote: "Adenosine 6 mg rapid IV push, then 12 mg (↓ to 3 mg via central line/heart transplant; caution asthma)"
- Why: [AHA-2025 ✔ text] adenosine "can cause severe bronchospasm in patients with asthma, and thus, is contraindicated." The 2025 text also says "**1 mg IV may be adequate**" with central lines/post-transplant (2020 teaching was 3 mg). **[UNSURE which dose your pharmacy uses — verify.]**
- Fix: "Adenosine 6 mg rapid IV push + 20 mL flush (proximal vein, 3-way stopcock); 12 mg ×1–2 if no conversion. **Avoid in asthma/active bronchospasm.** Central line/heart transplant: reduced dose per pharmacy (1–3 mg). Interactions: carbamazepine ↑, dipyridamole ↑, theophylline/caffeine ↓."

**UT-7 · MINOR · Sinus tachycardia/compensatory tachycardia**
- Quote: "HR usually ≥150 causing symptoms."
- Why: [AHA-2025 ✔] stresses identifying causes vs consequences; in ICU, sinus tach 120–150 with septic shock is not cardioverted.
- Fix: "HR <150 is rarely the cause of instability; sinus tachycardia with fever/pain/bleeding = treat the cause, do not cardiovert."

**UT-8 · MINOR · "Stable regular narrow: vagal maneuver" suited to ICU?**
- Quote: "STABLE regular narrow (SVT): vagal maneuver (modified Valsalva), then adenosine…"
- Why: ✔ ok; but carotid massage should be excluded (bruit/age). Modified Valsalva in an intubated/sedated patient isn't possible.
- Fix: "Vagal maneuver (modified Valsalva) if awake/cooperative; **no carotid massage**."

✔ Checked and consistent: instability criteria; "pulse absent = CODE"; wide-complex = VT until proven otherwise; adenosine only for regular monomorphic; procainamide 20–50 mg/min to max 17 mg/kg; amiodarone 150 mg/10 min; K/Mg correction.

---

### 3.9 Symptomatic bradycardia — `unstable-brady`

**BR-1 · MAJOR · Two atropine doses in one line**
- Quote: "Atropine 0.5–1 mg IV rapid push (ACLS: 1 mg), repeat q3–5 min, max total 3 mg. Doses <0.5 mg can worsen bradycardia."
- Why: Glance says "Atropine 1 mg IV q3–5 min (max 3 mg)". ACLS 2020 = 1 mg. **[UNVERIFIED vs 2025 bradycardia figure]**. The "<0.5 mg paradoxical bradycardia" caution is an older teaching with little modern clinical relevance and conflicts with "0.5–1 mg".
- Fix: "Atropine **1 mg** IV rapid push; repeat q3–5 min to max 3 mg [ORDER/ACLS protocol]. Ineffective in transplanted heart and often in Mobitz II/3° block (go straight to pacing)."

**BR-2 · MAJOR · Transcutaneous pacing initiation presented as a nurse step without competency/order marker**
- Quote: "TRANSCUTANEOUS PACING: pads front/back (or anterior-lateral), rate ~60–80, increase mA until electrical capture… AND mechanical capture… Give analgesia/sedation as ordered."
- Why: In many ICUs RNs with pacing competency start TCP per ACLS/standing order; in others it's provider-directed. Analgesia/sedation is correctly "as ordered."
- Fix: "[PROTOCOL/MD] Start TCP per ACLS protocol if RN-competent; otherwise provider. Pads on **before** needed."

**BR-3 · MINOR · How to confirm mechanical capture**
- Quote: "…mechanical capture (palpable pulse/SpO₂ waveform)"
- Why: Skeletal-muscle twitching during pacing can mimic carotid pulses. Use **femoral pulse, arterial line waveform or SpO₂ pleth**, not carotid.
- Fix: "Confirm capture with femoral pulse/art-line/pleth (not carotid); muscle jerks ≠ perfusion."

**BR-4 · MINOR · "Glucagon… HIE" abbreviation**
- Quote: "β-blocker/CCB overdose → glucagon/calcium/HIE (see Overdose)"
- Why: "HIE" (high-dose insulin euglycemia) is not universally known; and the Overdose card spells it out.
- Fix: "high-dose insulin (toxicology/Poison Control)."

✔ Checked and consistent: definition of unstable features; look for causes (inferior MI, drugs, ↑ICP, hypothermia, hyperK); atropine max 3 mg; dopamine 5–20 mcg/kg/min and epinephrine 2–10 mcg/min; pads before atropine; don't delay pacing for atropine in high-grade block.

---

### 3.10 Acute respiratory failure: intubation & vent basics — `resp-failure-intubation`

**RF-1 · CRITICAL · Succinylcholine contraindications incomplete for ICU**
- Quote: "succinylcholine 1–1.5 mg/kg (avoid: hyperK, burns/crush >24–72 h, neuromuscular disease, malignant hyperthermia history)"
- Why: ICU-specific contraindications are missing: **prolonged immobilization/ICU stay (days), critical-illness myopathy/neuropathy, spinal cord injury/stroke with denervation after ~days, rhabdomyolysis, prolonged sepsis** → life-threatening hyperkalemia/arrest.
- Fix: Add "…ICU stay > a few days / prolonged immobility, critical illness neuromyopathy, SCI/stroke > 3–5 days, rhabdo → use rocuronium."

**RF-2 · MAJOR · Paralytic given without prompt sedation/analgesia**
- Quote: "Start analgesia-first sedation (fentanyl) ± propofol/dexmedetomidine per orders. Target RASS 0 to −2." (step 10 of 12, after ABG-related steps)
- Why: Rocuronium lasts ~30–60+ min; if induction agent is short-acting (etomidate/ketamine/propofol bolus) and sedation is not started promptly, the patient can be **paralyzed and awake**.
- Fix: Move up: "**After tube confirmed & BP allows: start analgesia + sedation now (paralyzed ≠ sedated).** Request orders before induction so they are ready."

**RF-3 · MAJOR · Vent setting steps read as RN-set**
- Quote: "Initial vent: Assist-control volume (or PRVC), VT 6–8 mL/kg PBW, RR 14–20, PEEP 5, FiO₂ 100% then titrate to SpO₂ 92–96% (88–95% in ARDS)."
- Why: Vent changes are RT/provider orders; in many ICUs nurses titrate FiO₂ per protocol only.
- Fix: "[RT/ORDER] Provider/RT sets initial vent. Nurse: confirm PBW-based VT is entered (height, sex), alarms on, SpO₂/ETCO₂ goals."

**RF-4 · MINOR · Tube confirmation language**
- Quote: "After tube passes cords: inflate cuff, attach ETCO₂ — need sustained waveform. Auscultate epigastrium/lungs bilaterally…"
- Why: [AHA-2025 ✔] continuous waveform capnography is the most reliable confirmation. Missing the key safety rule: "**No waveform = not in the trachea until proven otherwise (except in low-flow arrest).**" Don't rely on fogging/auscultation.
- Fix: "Flat/absent ETCO₂ waveform after 6 breaths = esophageal until proven otherwise — pull/re-look; do not accept 'it sounds right.'"

**RF-5 · MINOR · NIV vs HFNC**
- Quote: "Try NIV (BiPAP/CPAP) if appropriate: awake, protecting airway, COPD/CHF; reassess in 30–60 min."
- Why: [SSC-2026 ✔] suggests **HFNC over NIV as initial therapy** in sepsis with acute hypoxemic respiratory failure (conditional). NIV contraindications (vomiting, AMS, facial trauma, hemodynamic instability) are not listed.
- Fix: "HFNC or NIV per provider; NIV not for vomiting, GCS ↓, shock, facial trauma. Reassess in 30–60 min; low threshold to intubate."

**RF-6 · MINOR · Push-dose pressor error potential**
- Quote: "Push-dose pressor: phenylephrine 50–100 mcg or epinephrine 5–20 mcg IV"
- Why: Push-dose epinephrine involves a diluted syringe (10 mcg/mL); wrong-concentration errors are common. Prefer pharmacy-prepared syringes.
- Fix: "[ORDER · HIGH-ALERT] Push-dose pressor: use pharmacy-prepared or standardized syringe; label concentration."

**RF-7 · MINOR · Code-status/DNI check absent**
- Fix: Add as first line: "Confirm code status/DNI and goals before intubation (unless emergent per policy)."

✔ Checked and consistent: preoxygenate/resuscitate before intubating; ramped HOB; RSI doses (etomidate 0.3, ketamine 1–2, propofol 1–2, roc 1–1.2 mg/kg); ETT depth ≈21/23 cm at teeth; cuff 20–30 cmH₂O; CXR tip 2–5 cm above carina; PADIS "analgesia-first"; RASS 0 to −2 goal; unplanned extubation: don't blindly re-insert.

---

### 3.11 Ventilator alarms troubleshooting — `vent-alarms`

**VA-1 · MINOR · Mnemonic inconsistency (DOPE vs DOPES)**
- Quote: glance "D-Displaced tube · O-Obstruction · P-Pneumothorax · E-Equipment / stacked breaths" vs action "S — Stacked breaths/auto-PEEP".
- Fix: Use one: DOPES (S = Stacked breaths/auto-PEEP, plus Sedation/Stomach as optional).

**VA-2 · MINOR · "Minimal-leak" cuff technique is outdated/hazardous**
- Quote: "LOW VOLUME / LEAK: check connections, cuff (add air to minimal-leak)…"
- Why: Titrating to "minimal leak" by ear risks over/under-inflation; use a manometer to maintain 20–30 cmH₂O (the same card states this in another line).
- Fix: "Cuff leak: check cuff pressure with manometer (20–30 cmH₂O); if cuff won't hold → call RT/provider (tube may need exchange)."

**VA-3 · MINOR · Obstruction: what if the suction catheter will not pass**
- Quote: "O — Obstruction: suction ETT (closed suction first), pass suction catheter; check for kinks/bite (bite block)…"
- Fix: "Suction catheter will not pass = blocked tube → bag, call for airway help, prepare to replace ETT."

**VA-4 · MINOR · Naloxone for "opioid-induced apnea" in an intubated patient**
- Quote: "Naloxone for opioid-induced apnea (low dose, titrate)"
- Why: In an intubated patient on a ventilator, "apnea alarm" means the patient isn't triggering — the vent backup rate ventilates. Reversing opioid analgesia/sedation in an intubated patient is rarely appropriate and can cause agitation, extubation, and withdrawal. It also needs an order.
- Fix: Replace with "Apnea alarm in vented patient: confirm backup ventilation active, check sedation level; call provider before reversing any sedation/opioid."

**VA-5 · MINOR · BVM with PEEP valve for ARDS/PEEP-dependent patients**
- Fix: "Bagging a high-PEEP patient: use PEEP valve; avoid prolonged disconnects (derecruitment); clamp ETT if circuit change is needed."

**VA-6 · SUGGESTION · Tracheostomy emergencies missing**
- Fix: add separate card (see §8).

✔ Checked and consistent: "look at the patient first"; "disconnect and hand-bag if unstable/unsure"; peak vs plateau differential; plateau ≤30, driving pressure <15; auto-PEEP management; "never silence an alarm without identifying the cause"; sodium chloride lavage not routine.

---

### 3.12 ARDS — `ards`  *(ARDSNet, SSC 2026)*

**AR-1 · MAJOR · Neuromuscular blockade recommendation overstated**
- Quote: "consider neuromuscular blocker (e.g., cisatracurium) for severe/ persistent dyssynchrony or P/F <150 — per intensivist."
- Why: The ROSE trial (2019) found **no benefit of early continuous NMB** vs light sedation in moderate–severe ARDS **[from memory — confident]**; [SSC-2026 ✔] "suggest using **intermittent NMBA boluses over continuous** NMBA infusion" in moderate–severe ARDS. The "P/F <150" trigger is ACURASYS-era and can lead to routine paralysis.
- Fix: "NMB only on intensivist order for refractory dyssynchrony / plateau >30 / during proning — **intermittent boluses preferred**. If paralyzed: deep sedation + analgesia first, eye care, TOF, awareness risk."

**AR-2 · MINOR · Vent changes written as nurse imperatives**
- Quote: "Set VT 6 mL/kg PBW (range 4–8); initial RR up to 35 to hold minute ventilation." / "Oxygen targets: SpO₂ 88–95% (PaO₂ 55–80). Set PEEP/FiO₂ per ARDSNet table…"
- Fix: Tag RT/ORDER; nurse role = verify PBW/VT, plateau pressure q4h, call for plateau >30.

**AR-3 · MINOR · pH rescue wording**
- Quote: "pH goal 7.30–7.45; permissive hypercapnia is acceptable (avoid pH <7.20 — consider ↑RR / VT up to 8 mL/kg if plateau allows)."
- Why: ARDSNet algorithm: pH 7.15–7.30 → raise RR (to 35); pH <7.15 → raise RR to 35, may increase VT, bicarbonate per provider. "avoid <7.20" is not the ARDSNet cut.
- Fix: "pH 7.30–7.45 goal; if <7.30 → RT/provider adjust RR (max 35); if <7.15 → call now."

**AR-4 · MINOR · Corticosteroid line may be read as standard of care**
- Quote: "Corticosteroids (e.g., dexamethasone 20 mg/day→10) may be considered per provider/protocol"
- Why: Evidence (DEXA-ARDS) is single-trial; recommendations differ by society. **[UNSURE]**. Keep, but label "per intensivist; not routine."

**AR-5 · SUGGESTION · Proning safety for nurses**
- Fix: add: "Proning needs 4–5 staff, ETT/line/drain checks, pressure injury offloading; **cardiac arrest in prone patient → supine CPR per unit policy**; eyes/face/chest-tube/foley protection."

✔ Checked and consistent: Berlin categories; VT 6 mL/kg PBW (4–8); plateau ≤30; driving pressure <15; SpO₂ 88–95%; lower-PEEP/FiO₂ table values; proning ≥12–16 h/day for P/F <150 with FiO₂ ≥0.6 (PROSEVA; SSC 2026: >12 h ✔); conservative fluids once stable; ECMO referral concept.

---

### 3.13 Pulmonary embolism — `pe`  *(ESC 2019 / AHA)*

**PE-1 · MINOR · Nurse "stop infusion" on bleeding**
- Quote: "!Bleeding on anticoagulation or lysis → stop infusion, call provider"
- Why: Stopping heparin or a lytic infusion for suspected major bleeding or new neuro change is a common **protocol** nurse action; but minor oozing shouldn't trigger it. Needs "per protocol" qualifier.
- Fix: "Major bleeding, new headache/neuro change after lysis → STOP infusion per protocol, call provider, stat CT head if neuro."

**PE-2 · MINOR · Arrest dosing [UNVERIFIED vs 2025]**
- Quote: "alteplase 100 mg over 2 h; 50 mg IV bolus in arrest per protocol"
- Why: ✔ consistent with common practice; I did not verify against AHA 2025 Part 10 (special circumstances).
- Fix: Keep "per protocol" and "[UNVERIFIED vs 2025]" until checked.

**PE-3 · MINOR · Vented patients**
- Fix: Add to Recognize: "Ventilated pt: sudden ↓ETCO₂ + hypoxia + hypotension = PE until proven otherwise."

**PE-4 · MINOR · Heparin high-alert**
- Quote: "UFH IV (80 units/kg bolus then 18 units/kg/h, per nomogram)"
- Fix: tag HIGH-ALERT: "Weight-based; independent double check; hold if active bleeding; baseline aPTT/CBC."

**PE-5 · SUGGESTION · Pre-lysis procedures**
- Fix: "Before lysis: minimize arterial/central punctures and IM injections; keep IV sites compressible."

✔ Checked and consistent: unstable PE definition (SBP <90 ≥15 min or pressors); UFH preferred when lysis possible; avoid intubation if possible; cautious fluid ≤500 mL; norepinephrine first; post-lysis neuro checks; HIT suspicion; IVC filter only if anticoagulation impossible.

---

### 3.14 Sepsis / septic shock — `sepsis`  *(app cites SSC 2021; compared against SSC 2021 and SSC 2026)*

**SP-1 · MAJOR · Recognition relies on qSOFA, which SSC 2026 recommends against as a single screen**
- Quote: "Suspected/confirmed infection + acute organ dysfunction (SOFA ↑ ≥2): AMS, RR ≥22, SBP ≤100 (qSOFA), oliguria, ↑creatinine/bilirubin, ↓platelets, hypoxemia"
- Why: [SSC-2026 ✔] "For acutely ill patients in hospital, we recommend using NEWS, NEWS2, MEWS, or SIRS **over qSOFA** as a single tool to screen for sepsis" (strong). 2021 also advised against qSOFA alone. The same logic applies to Quick Tools ("RR >22 = concern; qSOFA").
- Fix: "Sepsis screen: use your unit's NEWS2/MEWS/SIRS alert **and** clinical judgment. Organ dysfunction = new AMS, SBP <100/MAP <65, RR ≥22, SpO₂ ↓, oliguria, creatinine/bilirubin ↑, platelets ↓, lactate ↑. Normal vitals don't exclude sepsis (elderly, β-blocked, immunosuppressed, cirrhosis)."

**SP-2 · MAJOR · Allergy/antibiotic-delay line can be read as "give anyway"**
- Quote: "Allergy concern or antibiotic delay >1 h → pharmacy/provider NOW (don't withhold first dose without guidance)"
- Why: Intent is "don't let an unverified allergy label silently delay antibiotics" — but a stressed nurse could read it as pressure to give a drug the patient has a documented severe reaction to.
- Fix: "Allergy listed? **Do not give the drug until pharmacy/provider clears it or picks an alternative — but call NOW so the first dose is not delayed.** Most 'penicillin allergy' labels are not true IgE reactions; the provider decides."

**SP-3 · MAJOR · Bundle actions have no order/protocol marker**
- Quote: "Measure lactate (venous OK)…", "Blood cultures ×2…", "Broad-spectrum IV antibiotics within 1 h…", "balanced crystalloid… 30 mL/kg", "Arterial line…Foley…"
- Why: Many hospitals have **nurse-driven sepsis protocols** (lactate, cultures, fluid bolus start), but antibiotics, pressors, arterial/central lines and Foley are orders/provider procedures.
- Fix: Tag `[PROTOCOL]` for lactate, cultures, IV access, initial bolus; `[ORDER]` for antibiotics, vasopressors; `[MD]` for arterial/central lines.

**SP-4 · MINOR · Fluid dosing details differ from SSC 2026**
- Quote: "For hypotension or lactate ≥4: balanced crystalloid (LR/Plasma-Lyte) 30 mL/kg IV within first 3 h; bolus & reassess."
- Why: ✔ [SSC-2026 ✔] "at least 30 mL/kg in the first 3 h" (conditional); weight-based volume should use actual weight, or adjusted/ideal body weight if BMI >30; in unstable shock **concurrent vasopressors** may be needed. Missing HF/ESRD caution.
- Fix: "30 mL/kg (actual wt; use ideal/adjusted if BMI >30) crystalloid over ≤3 h in boluses with reassessment after each. Start norepinephrine early (even peripheral) if MAP <65 and unstable. HF/ESRD → smaller boluses, call provider."

**SP-5 · MINOR · Source control timing**
- Quote: "Source control ASAP (drain abscess, remove infected line/device, surgical consult) — ideally within 6–12 h."
- Why: [SSC-2026 ✔] "ideally within 6 h of diagnosis" (conditional); 2021 said "as soon as medically and logistically practical."
- Fix: "ideally within 6 h."

**SP-6 · MINOR · MAP target nuance**
- Quote: "norepinephrine if MAP <65"
- Why: [SSC-2026 ✔] MAP 65 (strong); in patients ≥65 y with septic shock, **initial MAP 60–65** suggested (conditional). Chronic HTN patients and others may need individualization by the provider.
- Fix: "MAP target per provider (usually ≥65; 60–65 in age ≥65 per SSC 2026)."

**SP-7 · MINOR · Peripheral vasopressor nursing detail missing**
- Quote: "don't wait for all fluids (peripheral OK short-term, then central)"
- Why: [SSC-2026 ✔] suggests starting peripherally rather than waiting for central access. Nurses need the safety rules.
- Fix: "Peripheral pressor: large proximal vein (antecubital or larger, ≥20 G), check site/pulses q1h, stop & call at first sign of infiltration/extravasation (pharmacy: phentolamine per policy); move to central ASAP."

**SP-8 · SUGGESTION · Antibiotic administration pearl for nurses**
- Fix: "Give first dose as a rapid loading dose; **extended infusion of β-lactams is for maintenance** (SSC 2026 strong). Don't hold first dose for ‘extended infusion’ pump."

**SP-9 · SUGGESTION · Bicarbonate/lactate**
- Fix: "No bicarbonate for lactic acidosis to improve hemodynamics; consider only for pH ≤7.2 with AKI per provider (SSC 2026 conditional)."

✔ Checked and consistent: cultures before antibiotics if no substantial delay; antibiotics ideally within 1 h for shock/probable sepsis (SSC 2026 strong); lactate remeasure; norepinephrine first-line; vasopressin add-on (0.03 U/min); hydrocortisone 200 mg/day for ongoing pressors; arterial line for escalating pressors; glucose; VTE prophylaxis; crystalloid preferred (balanced over NS); starch/gelatin not recommended.

---

### 3.15 Hypovolemic / hemorrhagic shock — `hemorrhagic-shock`

**HS-1 · MAJOR · Andexanet alfa is no longer available in the US**
- Quote: "Reverse anticoagulants: warfarin → 4-factor PCC + vitamin K; dabigatran → idarucizumab; Xa inhibitors → andexanet/PCC; heparin → protamine (per provider)." and Meds: "Reversal agents (PCC, vitamin K, protamine, idarucizumab, andexanet)"
- Why: FDA safety communication: AstraZeneca ended US sales of Andexxa effective **2025-12-22** after post-marketing data (ANNEXA-I) showed increased thrombotic events/death. The same text appears in **ICH/ICP**.
- Fix: "Xa inhibitor reversal: **4F-PCC** per hospital protocol (andexanet no longer available in the US — pharmacy to confirm). Always: provider orders reversal; nurse readies product."

**HS-2 · MAJOR · "Permissive hypotension" is a provider target, trauma-specific**
- Quote: "Permissive hypotension (SBP ~80–90 / MAP 50–60) until bleeding controlled in trauma WITHOUT head injury; keep MAP higher with TBI/spinal injury."
- Why: A nurse seeing an SBP of 85 may, on reading this card, accept hypotension in a GI-bleed, post-op, elderly, or CAD patient. It applies to selected trauma patients **by provider decision**, not to ICU hemorrhage in general.
- Fix: "BP target = provider order. **Do not let SBP drift low on your own** — call. (Permissive hypotension is used only in selected trauma pts without TBI, per surgeon.)"

**HS-3 · MAJOR · TXA indication is ambiguous**
- Quote: "Tranexamic acid (TXA) 1 g IV over 10 min, then 1 g over 8 h if within 3 h of injury / major bleed (per provider)."
- Why: TXA is supported for **trauma ≤3 h** (CRASH-2) and postpartum hemorrhage; **not for GI bleed** (HALT-IT) — the GI card correctly says "TXA is NOT routinely recommended"; this card says "major bleed," which contradicts it.
- Fix: "TXA (per provider): trauma within 3 h of injury; postpartum hemorrhage. **Not routine for GI bleeding.**"

**HS-4 · MINOR · MTP activation and blood-product handling scope**
- Quote: "!Call rapid response/provider/surgery now. Activate massive transfusion protocol (MTP) if >~4 U pRBC/h expected or unstable."
- Why: Who may activate MTP varies. Missing: two-person verification, emergency-release (uncrossmatched) rules, warmer/rapid infuser use.
- Fix: "[PROTOCOL] Activate MTP per policy (provider or RN). Verify products with 2 RNs; use blood warmer/rapid infuser; continuous VS."

**HS-5 · MINOR · Post-procedure/post-op bleeding mentions**
- Fix: Add "post-cath/groin or retroperitoneal bleed: hold manual pressure above puncture site, lie flat, call; surgical-site: pressure + surgeon; CT-surgery: chest tube output ≥200 mL/h → call."

**HS-6 · SUGGESTION · Beta-blocked/elderly may not tachycardic**
- Fix: Add to Recognize: "No tachycardia does not rule out shock (β-blockers, pacemaker, elderly)."

✔ Checked and consistent: blood > crystalloid; 1:1:1 per PROPPR-type resuscitation; limit crystalloid; calcium with transfusion; lethal triad; TXA dose; Hgb lag; MTP concept; ATLS hemorrhage classes; shock index.

---

### 3.16 Acute ischemic stroke — `ischemic-stroke`  *(compared to AHA/ASA 2019 and 2026)*

**IS-1 · MAJOR · Update to AHA/ASA 2026 AIS guideline (content mostly consistent)**
- Quote: sources: "AHA/ASA Guidelines for Early Management of Acute Ischemic Stroke (2019 + updates)"
- Why: [AIS-2026 ✔] The 2026 guideline: tenecteplase **0.25 mg/kg (max 25 mg)** *or* alteplase **0.9 mg/kg (max 90 mg)** both COR 1 within 4.5 h; **IVT for disabling deficits regardless of NIHSS without advanced imaging**; extended-window selected patients; broader EVT eligibility; **post-IVT intensive SBP <140 mmHg not recommended** (the <180/105 target stands). The app's dosing and BP targets are consistent with this.
- Fix: Update the reference; add "disabling deficit = treat regardless of NIHSS."

**IS-2 · MAJOR · Angioedema after alteplase: recognition but no action**
- Quote: "Angioedema (tongue/lip swelling) during/after alteplase, esp. on ACE-i"
- Why: This is an airway emergency in ICU. No action listed.
- Fix: "Tongue/lip/throat swelling during/after lytic = **stop infusion, call airway/RRT now**, prepare airway equipment; treatment (epinephrine, antihistamine/steroid) per provider."

**IS-3 · MINOR · "Treat if <60 mg/dL" inconsistent with other cards**
- Quote: "POINT-OF-CARE GLUCOSE (treat if <60 mg/dL)."
- Fix: Standardize to 'treat <70 mg/dL per hypoglycemia protocol.'

**IS-4 · MINOR · In-hospital/ICU stroke detection**
- Quote: "In ICU/post-op: new deficit in any pt = stroke until proven otherwise"
- Why: ✔ appropriate; add: "LKW = last time the patient was *known normal* (e.g., last neuro check/sedation holiday), not time you noticed." Intubated/sedated patients: new pupil asymmetry or motor asymmetry on neuro check.
- Fix: Add the LKW definition and "sedated pts: hold sedation if safe for exam per provider."

**IS-5 · MINOR · BP titration wording**
- Quote: "BP management: if lysis candidate keep BP <185/110 before and <180/105 for 24 h after. If NOT receiving lysis, permissive HTN: treat only if >220/120 (lower ≈15% in first 24 h) unless other indication."
- Why: ✔ correct (2019, retained in 2026). Add "titrate by order; labetalol/nicardipine/clevidipine; hold if HR <60 for labetalol…".
- Fix: tag [ORDER]; add 'call if BP outside ordered range ×2 checks'.

**IS-6 · SUGGESTION · Pre-lysis nurse checklist**
- Fix: Add "Gather before CT returns: weight, LKW, DOAC/warfarin/heparin last dose, recent surgery/GI bleed, glucose, BP, IV ×2, ECG."

✔ Checked and consistent: BE-FAST; door-to-CT ≤25 min, DTN ≤60; NPO until swallow screen; O₂ only if SpO₂ <94%; lysis dosing; post-lysis monitoring schedule (q15 ×2 h, q30 ×6 h, q1h ×16 h); "stop infusion & CT for headache/N/V/neuro decline/hypertension/bleeding"; avoid arterial punctures/NG/Foley/IM for 24 h; antithrombotics after repeat CT; malignant edema.

---

### 3.17 Intracranial hemorrhage / increased ICP — `ich-icp`  *(AHA/ASA ICH 2022; BTF; NCS)*

**IC-1 · CRITICAL · Nimodipine: oral/enteral only — never IV**
- Quote: "SAH: secure aneurysm; nimodipine 60 mg q4h PO/NG (hold/split if hypotension); BP control before securing; avoid hypovolemia." and Meds: "Nimodipine 60 mg q4h (SAH)"
- Why: Drawing up nimodipine liquid from capsules and injecting IV has caused fatal collapse (FDA labeling carries a boxed warning not to give nimodipine intravenously or parenterally) **[from memory — confident]**. This is the highest-risk drug error in neuro-ICU.
- Fix: "**Nimodipine = ORAL/ENTERAL ONLY — NEVER IV.** 60 mg q4h PO/NG, or 30 mg q2h if hypotension (per order). Check BP before each dose; hold/split per provider."

**IC-2 · MAJOR · Andexanet** — see HS-1. Quote: "Xa inhibitors → andexanet/PCC" and "Reversal: 4F-PCC, vitamin K 10 mg IV, idarucizumab 5 g, andexanet alfa, protamine". Fix as HS-1.

**IC-3 · MAJOR · Hyperosmolar therapy phrased as an immediate nurse action, high-alert details missing**
- Quote: glance "Herniation signs (blown pupil, Cushing's, posturing) → hyperosmolar therapy NOW + neurosurgery" and "Herniation / ICP >22: hyperosmolar therapy — 23.4% saline 30 mL via central line over 10–20 min (or 3% saline 250 mL bolus), or mannitol 0.25–1 g/kg IV over 15–20 min."
- Why: Standing herniation orders exist in some neuro-ICUs; elsewhere this requires a provider order. 23.4% NaCl is high-alert, **central line only**, needs independent double check, and cardiac/respiratory risk.
- Fix: "Herniation signs → **CALL neurosurgery/ICU provider STAT, HOB 30°, hyperventilate if intubated (bridge, per provider), have 23.4% (central) / 3% / mannitol ready — give per order.** 23.4% NaCl: central line only, independent double-check."

**IC-4 · MINOR · SAH BP number missing**
- Quote: "BP control before securing"
- Fix: "[ORDER] SAH BP target per neurosurgery (commonly SBP <140–160 before aneurysm secured); avoid hypotension."

**IC-5 · MINOR · Cervical collar/ETT ties**
- Quote: "loosen tight cervical collar/ETT ties (avoid jugular compression)"
- Why: Trauma patients with unstable spine should not have collar loosened by the nurse.
- Fix: "Avoid neck compression: adjust ETT ties; **cervical collar changes only per provider/spine precautions.**"

**IC-6 · MINOR · EVD safety**
- Quote: "EVD/ICP monitor: level at tragus (external auditory meatus) at ordered height; clamp when moving; hourly drain output."
- Why: ✔ Right concept. Missing: **re-open and re-level after moves** (a forgotten clamp → ICP crisis), never irrigate/flush, over-drainage risk (SDH/herniation), alarm ICP >20–22.
- Fix: "Clamp for transport/HOB change per order, then **re-level, re-open, document**. Never flush EVD. No drainage/leak/air → check clamp/level/tubing, call."

**IC-7 · SUGGESTION · Split ICH vs SAH vs TBI/ICP crisis**
- Why: BP targets, reversal, nimodipine, and ICP thresholds differ. A combined card forces the nurse to read to find the right branch.
- Fix: Three short cards (ICH, SAH, ICP/herniation crisis).

✔ Checked and consistent: GCS ≤8 airway threshold concept; HOB 30°; avoid hypoxia/hypotension; ICH SBP target ~140 (130–150) and avoid <130 (AHA 2022 [memory]); CPP 60–70; ICP threshold 20–22; hyperosmolar doses/ranges; brief hyperventilation only for impending herniation; Na/osm monitoring; vasospasm day 3–14; mannitol hold if osm >320; platelet transfusion not routine for antiplatelet ICH [AHA 2022 memory].

---

### 3.18 Diabetic ketoacidosis — `dka`  *(app cites ADA/EASD 2024 but follows older thresholds)*

**DK-1 · MAJOR · Potassium threshold to hold insulin is outdated**
- Quote: glance "Check K+ BEFORE insulin: K <3.3 → hold insulin and replace K first" and action 3 "K <3.3 → HOLD insulin; give 20–30 mEq/h KCl until K ≥3.3."
- Why: [ADA-2024 ✔] If K⁺ **<3.5** mmol/L: replace potassium (**10 mmol/h**) and **delay insulin until >3.5**. The older threshold was 3.3.
- Fix: "K⁺ <3.5 → HOLD insulin; replace K⁺ (10 mEq/h per order) until >3.5, then start insulin."

**DK-2 · CRITICAL · KCl rate is high-alert/risky**
- Quote: "give 20–30 mEq/h KCl until K ≥3.3" / Meds: "KCl 20–30 mEq per liter / 20–30 mEq/h for K <3.3"
- Why: 20–30 mEq/h exceeds typical peripheral limits (≈10 mEq/h) and many central-line limits (≈20 mEq/h with continuous ECG). [ADA-2024 ✔] says 10 mmol/h. 20–30 mmol **per liter** of fluid is for K⁺ 3.5–5.0.
- Fix: "KCl: per order only; **max rates per policy (typically ≤10 mEq/h peripheral, ≤20 mEq/h central with continuous ECG).** K⁺ 3.5–5.0: 20–30 mEq per liter of IV fluid."

**DK-3 · MINOR · Fluid rates**
- Quote: "Fluids: isotonic crystalloid (balanced or 0.9% NaCl) 15–20 mL/kg (≈1–1.5 L) in first hour; then 250–500 mL/h guided by hydration, Na, UOP."
- Why: [ADA-2024 ✔] "500–1,000 mL/h during the first 2–4 h" (without cardiac/renal compromise), then individualize. The app's numbers are 2009-era and may under-resuscitate a severely dehydrated adult.
- Fix: "Isotonic fluid 500–1,000 mL/h for the first 2–4 h (less if HF/CKD), then 250–500 mL/h per provider."

**DK-4 · MINOR · Bicarbonate threshold**
- Quote: "Bicarbonate only if pH <6.9 (per provider)."
- Why: [ADA-2024 ✔] consider if pH **<7.0**.
- Fix: "Bicarbonate only for pH <7.0, per provider (100 mmol/400 mL sterile water over 2 h)."

**DK-5 · MINOR · Insulin dosing language**
- Quote: "regular insulin IV infusion 0.1 unit/kg/h (± 0.1 unit/kg bolus) or 0.14 unit/kg/h without bolus."
- Why: ✔ close to the consensus; keep as "per order set." [ADA-2024 ✔] is fixed-rate 0.1 U/kg/h; bolus optional/omitted. **Weight-based high-alert** — add double check.
- Fix: "[ORDER · HIGH-ALERT] Insulin infusion per DKA order set; independent double-check of weight and rate."

**DK-6 · MINOR · HHS is absent although in keywords**
- Why: Hyperosmolar hyperglycemic state differs: glucose often >600, osmolality >320, minimal ketones, more fluid, delay insulin until fluids/K⁺ addressed; thrombosis risk. See §8.

**DK-7 · MINOR · Escalate thresholds inconsistent**
- Quote: "K <3.3 or >5.5 · pH <7.0 · AMS/GCS drop…" vs action "K >5.0–5.2 → no K"
- Fix: unify (K⁺ <3.5 or >5.3 call).

✔ Checked and consistent: fluids first, continue insulin and add dextrose when glucose falls <250; hourly glucose; don't stop insulin until gap closes; cerebral edema signs; euglycemic DKA with SGLT2i; corrected Na formula; phosphate <1.0 mg/dL; basal insulin overlap 1–2 h before stopping infusion.

---

### 3.19 Severe hypoglycemia — `hypoglycemia`

**HY-1 · MAJOR · "or has IV access" wording**
- Quote: "NOT able to take PO or has IV access: dextrose 50% 25 g (50 mL) IV push — or dextrose 10% 125–250 mL IV bolus (12.5–25 g) per protocol."
- Why: Read literally, "or has IV access" means anyone with an IV gets D50. The intent is "cannot take PO **and** has IV."
- Fix: "Cannot safely take PO **AND** has IV/IO: D50 25 g slow IV push (or D10 125–250 mL) per hypoglycemia protocol. No IV: glucagon 1 mg IM/SC."

**HY-2 · MINOR · D50 vs D10 and extravasation**
- Why: D50 is hypertonic and a vesicant; many protocols prefer D10 for adults, and ICU central lines make this safer.
- Fix: "Prefer D10 if available; D50 via good large vein (central if available); flush; watch site."

**HY-3 · MINOR · Orders**
- Quote: "Stop/pause insulin infusion; stay with pt." (✔ independent per protocol) vs "Octreotide 50 mcg SC/IV q6h per provider" (✔ ordered).
- Fix: Add `[PROTOCOL]` to dextrose/glucagon, `[ORDER]` to octreotide/hydrocortisone.

**HY-4 · SUGGESTION · POC meter accuracy in ICU**
- Quote: "Check glucose (POC; confirm on blood sample if unexpected)."
- Why: ✔ excellent. Add reasons (shock, vasopressors, edema, anemia, cold extremities → falsely abnormal capillary glucose; use arterial/venous sample).

✔ Checked and consistent: <70 treat, <54 clinically significant; 15–20 g carbs & recheck 15 min; D50 25 g; glucagon 1 mg IM/SC (3 mg IN); thiamine with alcohol/malnutrition; sulfonylurea octreotide; rebound hyperglycemia; look for cause.

---

### 3.20 Hyperkalemia — `hyperkalemia`

**HK-1 · MAJOR · Calcium chloride vs gluconate, line, and incompatibility**
- Quote: "calcium gluconate 10% 1–3 g (10–30 mL) IV over 5–10 min (or calcium chloride 1 g via central/good IV)" and "Sodium bicarbonate 50–150 mEq IV if acidotic"
- Why: Calcium chloride extravasation causes severe tissue necrosis; "good IV" is vague. Calcium and **sodium bicarbonate precipitate** if run in the same line.
- Fix: "Calcium gluconate 3 g (30 mL) IV over 5–10 min preferred peripherally; calcium chloride only via central line (or very secure large vein per policy). **Flush between calcium and bicarbonate; do not co-infuse.**"

**HK-2 · MAJOR · SPS (sodium polystyrene) risk in ICU patients**
- Quote: "REMOVE K: loop diuretic… sodium zirconium cyclosilicate 10 g PO or patiromer; sodium polystyrene as alternative."
- Why: SPS has been associated with intestinal necrosis, especially in post-op, ileus, bowel obstruction, opioids, and critical illness; slow onset; and NG/PO route may not be usable. Prefer SZC/patiromer; do not give SPS in ileus/bowel injury.
- Fix: "Binders per provider: SZC 10 g (onset ~1 h). **Avoid SPS in ileus, bowel obstruction, post-GI surgery.**"

**HK-3 · MINOR · Insulin dextrose caution**
- Quote: "regular insulin 10 units IV + dextrose 25 g (D50 50 mL). Use 5 units (or more dextrose) if renal failure/low baseline glucose."
- Fix: Add "If glucose ≥250 mg/dL, provider may omit dextrose. Check glucose hourly ×6 h (hypoglycemia is the most common complication)." (Part is already in the card: q30–60 min ×4–6 h ✔.)

**HK-4 · MINOR · RN-held meds**
- Quote: "STOP K-containing fluids/supplements/meds (K-sparing diuretics, ACE-i/ARB, NSAIDs, TMP-SMX, heparin)."
- Why: Nurse can hold K⁺ infusions/supplements per protocol; other med holds are provider decisions.
- Fix: "[RN] Hold K⁺ supplements, K⁺ IV fluids, K⁺-containing tube feeds/transfusions now; ask provider about other meds."

**HK-5 · SUGGESTION · Digoxin toxicity**
- Fix: Add one line: "On digoxin with hyperK? tell provider (DigiFab considered; calcium use per toxicology)."

✔ Checked and consistent: calcium first when ECG changes; shift (insulin/dextrose, albuterol 10–20 mg); remove (diuretic, binder, dialysis); recheck K in 1–2 h; rebound at 2–4 h; ECG progression; pseudohyperK; K cutoffs (UK RA 2020 style) **mild 5.5–5.9, moderate 6.0–6.4, severe ≥6.5**.

---

### 3.21 AKI — `aki`

**AK-1 · MINOR · "Hold IV contrast" may delay emergent imaging**
- Quote: "Hold/avoid nephrotoxins: NSAIDs, IV contrast, aminoglycosides, vanco trough, ACE-i/ARB, diuretics; renally dose all meds (pharmacy)."
- Why: A nurse may refuse/delay an emergent CTA (stroke, PE, dissection, bleeding) because of AKI.
- Fix: "Contrast: tell the ordering provider about AKI; **do not delay emergent imaging** — the provider decides."

**AK-2 · MINOR · "vanco trough" is outdated**
- Fix: "vancomycin: AUC- or trough-guided per pharmacy (2020 ASHP/IDSA)."

**AK-3 · MINOR · Orders vs RN actions**
- Quote: "Bladder scan; flush/replace Foley if blocked…" ✔ RN per policy; "Hypovolemic → balanced crystalloid bolus 250–500 mL and reassess" ← [ORDER].
- Fix: Tag.

**AK-4 · SUGGESTION · Rhabdomyolysis, abdominal compartment syndrome**
- Fix: Add "dark/tea urine + high CK = rhabdo (call); distended tense abdomen + low UOP → bladder pressure (IAH/ACS)."

✔ Checked and consistent: KDIGO criteria and staging; prerenal/intrinsic/postrenal; AEIOU dialysis indications; loop diuretics don't treat AKI; strict I&O; CRRT monitoring.

---

### 3.22 GI bleed (upper/lower) — `gi-bleed`

**GB-1 · MINOR · Balloon tamponade — provider-placed; safety details**
- Quote: "Refractory variceal bleed: balloon tamponade (Blakemore) – keep scissors at bedside; TIPS/surgery."
- Why: ✔ keep scissors (cut tube if airway obstruction from balloon migration). Missing: **airway secured before placement**, gastric balloon position confirmed by X-ray before inflating, traction/pressure per policy, time limit (usually ≤24 h). Placement is [PROVIDER].
- Fix: Tag [PROVIDER] and add these rules.

**GB-2 · MINOR · INR correction in cirrhosis**
- Quote: "Correct platelets <50 and INR as ordered."
- Why: Routine FFP to "correct INR" in cirrhosis is not recommended (volume ↑ portal pressure). **[from memory — confident]**.
- Fix: "Platelet/INR correction per provider/hepatology (avoid routine FFP to 'fix' INR in cirrhosis)."

**GB-3 · MINOR · Hold sedatives/lactulose**
- Fix: "Suspected hepatic encephalopathy: avoid benzodiazepines/opioids where possible; lactulose per order."

**GB-4 · MINOR · Pantoprazole regimens**
- Quote: "pantoprazole 80 mg IV bolus then infusion 8 mg/h or 40 mg IV q12h per protocol"
- Why: ✔ plausible; protocols vary. Fine with "per protocol".

✔ Checked and consistent: two large-bore IVs, restrictive transfusion Hgb ~7 (8 if CAD), airway protection, octreotide 50 mcg bolus → 50 mcg/h, ceftriaxone 1 g daily in cirrhosis, erythromycin pre-endoscopy, endoscopy within 24 h (12 h for variceal), TXA not routine (HALT-IT), avoid over-transfusion, initial Hgb lags.

---

### 3.23 Cardiac tamponade — `tamponade`

**TM-1 · MAJOR · "milk/strip chest tubes" is not universally endorsed**
- Quote: "Post-cardiac surgery with chest tubes: milk/strip per protocol and notify surgeon; do not assume tubes are working."
- Why: Routine stripping/milking generates high negative pressure and is discouraged or prohibited by many policies/professional guidance **[from memory — confident that routine stripping is not recommended; exact policy varies]**. Also the phrase could delay the surgeon call.
- Fix: "Sudden drop in chest-tube output + hypotension/↑CVP = **call surgeon NOW**. Clear tubes **only per unit policy** (many ban stripping); don't delay the call. Do not assume tubes are working."

**TM-2 · MINOR · "consent" in emergency**
- Quote: "Prepare for pericardiocentesis (echo-guided): tray, 18G needle/catheter, drainage bag, ECG lead, sterile prep, consent, coags status."
- Fix: "…emergency-consent per policy; do not delay for coags in unstable patient."

**TM-3 · MINOR · "needle pericardiocentesis per ACLS"**
- Quote: "Traumatic or arrest due to tamponade: emergent thoracotomy/needle pericardiocentesis per ACLS/ATLS."
- Why: ACLS does not teach pericardiocentesis; thoracotomy/needle is [PROVIDER]. Post-cardiac surgery → resternotomy per CALS.
- Fix: "[PROVIDER] Emergency thoracotomy / resternotomy / pericardiocentesis."

**TM-4 · MINOR · Localized postoperative tamponade**
- Fix: Add "Post-op tamponade can be **localized**; echo may miss; low-output with high CVP + falling UOP + falling drain output = call surgeon even if echo 'negative' (TEE)."

**TM-5 · SUGGESTION · Emergency tag**
- Fix: Flag `emergency:true` — see G-5.

✔ Checked and consistent: Beck's triad (often incomplete), pulsus paradoxus >10 mmHg, electrical alternans, preload support with small bolus, avoid diuretics/vasodilators and positive-pressure ventilation, pressors as bridge, drain output meaning.

---

### 3.24 Alcohol withdrawal / delirium tremens — `alcohol-withdrawal`  *(ASAM 2020)*

**AW-1 · MAJOR · CIWA-Ar is not valid in intubated/sedated/delirious ICU patients**
- Quote: "Score CIWA-Ar q1h (or per protocol). Symptom-triggered benzodiazepine: lorazepam 1–4 mg IV (or diazepam 5–20 mg IV) q5–15 min…"
- Why: CIWA-Ar requires a communicative patient. In DTs/intubation it is unreliable; many ICUs use RASS-based or objective-sign protocols (MINDS, Riker SAS, etc.). Using CIWA in an intubated pt leads to under- or over-dosing.
- Fix: "CIWA-Ar only if patient can communicate. Delirious/intubated: dose by RASS/objective signs per ICU protocol (target RASS 0 to −1)."

**AW-2 · MAJOR · Thiamine dosing and Wernicke**
- Quote: "THIAMINE 100 mg IV/IM (or higher per provider) BEFORE or with dextrose" and "Assess for… Wernicke (confusion, ataxia, ophthalmoplegia)."
- Why: If Wernicke is suspected, standard 100 mg is subtherapeutic; high-dose IV thiamine (e.g., several hundred mg, multiple times daily) is typically ordered. **[from memory — confident; exact regimen per pharmacy]**
- Fix: "Wernicke suspected (confusion + ataxia + eye signs): tell provider **now** — high-dose IV thiamine is given before dextrose."

**AW-3 · MINOR · Seizure timing**
- Quote: "12–48 h: withdrawal seizures"
- Why: Typical window 6–48 h. Fix.

**AW-4 · MINOR · Restraints**
- Quote: "Avoid restraints if possible (pull-out lines, rhabdo risk)."
- Why: ✔ but staff/patient safety and restraint policy/order should be stated.
- Fix: "Last resort; per restraint policy/order, least restrictive, frequent reassessment."

**AW-5 · MINOR · Front-loading benzodiazepine = order**
- Quote: "Severe/DTs: front-load benzodiazepines; escalate promptly rather than low repeated doses."
- Fix: "Request front-loading/ICU escalation from provider; monitor airway q5–15 min."

**AW-6 · SUGGESTION · Resistant withdrawal triggers**
- Fix: define: ">~50 mg diazepam-equivalent in 1 h or ≥ 200 mg total with poor control → call for phenobarbital/dexmedetomidine adjunct/ICU airway plan." (confirm with pharmacy/ASAM).

✔ Checked and consistent: benzodiazepines first-line; phenobarbital adjunct; dexmedetomidine adjunct only; haloperidol only adjunct; electrolyte replacement; thiamine/folate; DT timing 48–96 h; rule out other causes.

---

### 3.25 Overdose / poisoning basics — `overdose`

**OD-1 · MAJOR · Naloxone — order/protocol and airway first**
- Quote: glance "Naloxone if slow breathing/pinpoint pupils — titrate to breathing" and action "Opioid toxidrome with hypoventilation: naloxone 0.04–0.4 mg IV (titrate q2–3 min…; up to 2 mg total, IM/IN 2–4 mg). Support ventilation first."
- Why: ✔ "support ventilation first" is excellent. Many hospitals allow RN naloxone via protocol; not universal. Naloxone can precipitate acute withdrawal (agitation, vomiting/aspiration, pulmonary edema).
- Fix: "[PROTOCOL/ORDER] BVM first. Naloxone by protocol; titrate to RR ≥10–12, not to full alertness. Re-sedation can occur (20–90 min) — monitor ≥2 h."

**OD-2 · MINOR · Charcoal timing inconsistent**
- Quote: glance "within ~1 h" vs action "within 1–2 h".
- Fix: "Activated charcoal: provider/Poison Control decision only; airway protected; no ileus/obstruction/caustics/hydrocarbons/metals/alcohols."

**OD-3 · SUGGESTION · Toxic alcohol, serotonin syndrome, NMS, anticholinergic (physostigmine), digoxin, CO/cyanide**
- Why: Several drugs are in Meds, but there is no toxidrome or hyperthermia content. See §8.

**OD-4 · MINOR · Poison Control link**
- Fix: tel: link; "Call early—don't wait for levels."

✔ Checked and consistent: ABCs/glucose/ECG; don't induce vomiting; acetaminophen ≥4 h level & NAC; TCA bicarbonate 1–2 mEq/kg to QRS narrowing/pH 7.45–7.55; avoid routine flumazenil; salicylate intubation caution; β-blocker/CCB toxicology guidance; 1:1 observation for suicide risk.

---

## 4. Quick Tools content review (`data.js → tools`)

**QT-1 · MAJOR · COPD SpO₂ target is wrong/unsafe**
- Quote: `["SpO₂", "≥94% (92–96% typical COPD; 88–95% ARDS)"]`
- Why: For patients at risk of hypercapnic respiratory failure (COPD etc.), the usual target is **88–92%** (BTS/GOLD-type teaching; **[from memory — confident]**). Teaching "92–96% typical COPD" risks CO₂ narcosis from over-oxygenation. ARDS 88–95% ✔ (ARDSNet).
- Fix: "SpO₂ ≥94% most pts · **88–92% if hypercapnic/COPD (per provider)** · 88–95% ARDS · post-arrest/ACS/stroke per card."

**QT-2 · MINOR · "qSOFA" in RR row**
- Quote: `["RR", "12–20 /min (>22 = concern; qSOFA)"]`
- Why: qSOFA uses RR **≥22**; SSC 2026 recommends *against* using qSOFA alone (see SP-1).
- Fix: "RR 12–20; ≥22 = concerning (NEWS2/MEWS trigger)."

**QT-3 · MINOR · GCS tool does not support "T" (intubated) and may mislabel**
- Quote: GCS note "≤8 = severe; consider airway protection. Intubated: Verbal = 'T' (score 1T)." (app.js GCS calculator offers V 1–5 only; total ≤8 → red "SEVERE")
- Why: Intubated patients will always be scored V1 and flagged "SEVERE", which is misleading; sedation/paralytics also confound GCS.
- Fix: Add a **T** option for Verbal (total shown as e.g. "E4 VT M6 = 10T"), a "sedated/paralyzed — GCS unreliable" warning, and a pupil-reactivity input.

**QT-4 · MINOR · Anion gap and labs**
- Quote: `["Anion gap", "Na − (Cl + HCO₃): ~8–12"]`
- Why: ✔ formula; in ICU hypoalbuminemia lowers the "normal" gap (correct for albumin). Panic values missing.
- Fix: "Albumin-corrected AG = AG + 2.5 × (4 − albumin)." Add a **critical-values** list (K⁺ <3.0 or >6.0, Na⁺ <120 or >160, glucose <50 or >500, Ca/iCa, lactate ≥4, pH <7.2, Hgb <7, platelets <20, INR >4, troponin) "use your lab's".

**QT-5 · MINOR · Rapid response triggers**
- Quote: "HR <40 or >130 · SBP <90 · RR <8 or >28 · SpO₂ <90% despite O₂"
- Why: Typical ward thresholds; for ICU the question is "when to call the intensivist/code." Mixed usage again (see G-6).
- Fix: Retitle "When to escalate urgently (ward-style triggers; ICU nurses: call provider earlier)".

**QT-6 · MINOR · Reminders content**
- ABCDE: ✔; add "**Bleeding first (cABCDE)** for hemorrhage."
- H's & T's: ✔; add hypoglycemia as a common ICU contributor.
- Safe handoff checklist: ✔ title says "Safe handoff" but content is pre-call prep; fix label.

**QT-7 · SUGGESTION · PBW in cm**
- Quote: "Male: 50 + 2.3 × (height in inches − 60) kg"
- Fix: Add cm version: "50 + 0.91 × (cm − 152.4) (male); 45.5 + 0.91 × (cm − 152.4) (female)." (Formulas ✔.)

**QT-8 · SUGGESTION · High-value tools missing**
1. Infusion calculators: mcg/kg/min ↔ mL/h; common drip concentrations (norepi/epi/vaso/insulin/heparin/KCl max rates).
2. Vasopressor ladder / "what to add when" (norepi → vaso → epi/hydrocortisone) with dose ranges.
3. ABG interpretation + Winter's formula; anion gap/delta-delta.
4. Sedation/analgesia ladder (fentanyl/propofol/dex) with RASS targets.
5. Electrolyte replacement safety table (max rates, line).
6. 12-lead quick tools: STEMI criteria, Sgarbossa, hyperK, QTc.
7. "Pressors by line type" (peripheral limits) and extravasation first-aid.

✔ Checked and consistent: RASS table and goals (PADIS 0 to −2); GCS items; vitals/labs ranges (approx. adult; "use your lab's" disclaimer present); PBW formulas; SBAR content; H's & T's list.

---

## 5. App rendering, timer, `index.html`, `sw.js` — clinical-safety observations

**APP-1 · MAJOR · Code timer is not reachable from the Cardiac Arrest card**
- Evidence: `renderCondition()` sets `$('#tabbar').hidden = true` and shows an action bar with only Back/Save/Reset/↑; the code timer lives on the Tools tab.
- Why: During a code, a nurse on the arrest card needs one tap to start the timer/epi/shock log; today it is Back → Tools tab.
- Fix: Add a prominent "⏱ Start code timer" button at the top of the Cardiac Arrest card (and a floating chip when running — chip exists but only appears after start).

**APP-2 · MAJOR · Timer "Stop/Restart" and "Reset" can wipe epinephrine/shock counts with one tap**
- Evidence (app.js): `tstart` when running → stops; when stopped → `timer = { run:true, start:Date.now(), last:0, epi:[], shock:[], log:[] }` (new object, wipes counts and log); `treset` has no confirmation.
- Why: A stray tap mid-code can lose the epi count and elapsed time. Under stress this leads to repeat/omitted epinephrine.
- Fix: Require long-press or confirm for Stop/Restart/Reset; never clear the epi/shock log without confirmation; add "Undo last" for Epi/Shock taps.

**APP-3 · MAJOR · Stale timer state persists**
- Evidence: Timer is stored in localStorage; the Tools page builds "Epinephrine ×N · last <time> ago — DUE" from a prior event even when stopped.
- Why: A new nurse can see ‘Epinephrine ×3 last 47:12 ago — DUE’ from yesterday's code. This is misleading.
- Fix: Auto-clear when stopped >30–60 min or on app launch; banner "Previous code log from 17:42 — Clear?"

**APP-4 · MINOR · Timer limited to epinephrine and shocks; no ROSC/amiodarone/airway/events**
- Fix: Add one-tap log buttons: Amiodarone (300/150 mg), Lidocaine, ROSC, Airway placed, Rhythm shockable/non-shockable; export copy-to-clipboard for the code record. (App note correctly says it's not the legal record.)

**APP-5 · MINOR · Epi reminder is generic**
- Evidence: `since >= 180 ? ' — due now (3–5 min)'`; `since >= 300 ? ' — DUE'`.
- Why: Shockable rhythms: epi after initial shocks fail, not on a pure clock; reminders can cause premature epi.
- Fix: Add rhythm toggle; remind "give epi" only after the first shock for shockable.

**APP-6 · MINOR · 2-minute beep may be silent**
- Evidence: Timer note says it "Beeps/vibrates every 2 min" and requires an unmuted phone; app.js uses navigator.vibrate, which is not supported on iOS Safari [UNSURE — verify on device], and browser audio often needs a user gesture to unlock.
- Fix: Visual full-screen flash at 2:00 and 10 s warning; test on iPhone/Android before release.

**APP-7 · MINOR · `facilityNote` blank; tel links**
- See G-11.

**APP-8 · MINOR · Service worker cache-first**
- See G-12. Also show "Content last verified: date" on each card header.

**APP-9 · SUGGESTION · `!` highlighting inside "Monitor" checklists**
- Evidence: Stroke `monitor` begins with "!STOP lysis infusion & stat CT if…" which renders as a tick-able "CALL" step in a monitoring checklist.
- Why: A rule ("stop infusion if…") is not a task to tick. Ticking it may look like "done."
- Fix: Render conditional rules as non-tick-able red callouts; reserve ticking for tasks.

**APP-10 · MINOR · Search and glance reading order**
- Evidence: Search ranks name/keywords; typing drug names works but no synonyms like "Narcan", "epi", "RRT" in all places (some in keywords).
- Fix: Add common brand/abbreviation synonyms (Narcan, Ativan, Keppra, Cardizem, tPA/TNK, NS, LR, HIE, DOPE).

**APP-11 · SUGGESTION · `index.html`**
- ✔ Viewport allows zoom (good), theme default dark (good for ICU). `format-detection telephone=no` prevents tap-to-call (see G-11). Consider a persistent "Reference only — verify with orders" ribbon on emergency cards (currently only in footer).

✔ Checked: `esc()` is used on all content (no HTML injection from `data.js`); offline cache list includes all assets; disclaimer and review status visible on About; footers on each card state "pending clinical review" — keep that until sign-off.

---

## 6. Order of actions, prioritization, and brevity (what to do in the first 1–5 minutes)

General: most cards begin well ("First things first"), but Actions mix the first 60 seconds with next-hour tasks. Suggest rebuilding Actions as **0–1 min / 1–5 min / then** lists with 5–7 items max each.

| Card | Issue | Corrected first-5-minute order (suggested) |
|---|---|---|
| Cardiac arrest | See CA-3, CA-5 | Call code, start compressions, **pads/monitor → shock if VF/pVT**, existing line/IO, BVM, epi per leader; verify code status in parallel |
| Anaphylaxis | Good; ensure epi is step 1 or 2 | Stop trigger + Call + **IM epi** + supine/legs up + O₂ + 2 IV + fluids |
| Tension PTX | Good | Call + 100% O₂ + disconnect/bag + equipment + assist decompression |
| Seizure | Good, but 20-min wording (SE-1) | Time, protect, airway/O₂, glucose, **benzo at 5 min**, second-line ready |
| ACS | ECG first ✔ | ECG ≤10 min → provider; screen for dissection/bleed before ASA/anticoag |
| Unstable tachy | Sync re-arm (UT-2) | Pulse? → pads → call → sedation order → sync check → shock |
| Bradycardia | ✔ | Pads on before atropine; atropine 1 mg; pace if no response/high-grade block |
| Hemorrhagic shock | Starts with call ✔; add direct pressure first | Pressure/tourniquet → call → 2 large IV → blood/MTP → warmth → calcium/TXA per order |
| Sepsis | ✔ except SP-3 | IV access → cultures/lactate → antibiotics → fluids/pressor → call |
| Hyperkalemia | Calcium first ✔ | Monitor/ECG → call → calcium → insulin/dextrose → albuterol → recheck K |
| Hypoglycemia | ✔ treat first | Glucose → treat (PO or IV/IM) → recheck 15 min |
| Stroke | LKW/glucose/CT ✔ | LKW + glucose + code stroke + IV + NPO + CT |
| ICH/ICP | CALL first ✔ | Call → airway/HOB 30° → neuro checks → CT → BP target → hyperosmolar when ordered |

Wording clarity: avoid stacking 3–4 dose regimens in one line (e.g., Cardiac arrest antiarrhythmic line, Status epilepticus second-line). Prefer "Options (pick one per order):" as sub-bullets.

---

## 7. Scope-of-practice matrix (typical US ICU; **always defer to facility policy and state Nurse Practice Act**)

| Action in app | Typical status | Comment |
|---|---|---|
| Start CPR, call code, apply pads, BVM, 100% O₂, defibrillate (AED/manual per competency/policy) | **RN** (BLS/ACLS competency) | CPR may be withheld only per a valid DNR order |
| Give ACLS drugs (epi, amio) | **ORDER** (code leader/ACLS protocol) | Read-back |
| IM epinephrine in anaphylaxis | **PROTOCOL/ORDER** | Often standing order; else verbal order |
| Aspirin/nitroglycerin for chest pain | **PROTOCOL/ORDER** | Screen contraindications |
| 12-lead ECG, POC glucose, SpO₂, ETCO₂ | **RN** | |
| Hypoglycemia treatment (PO carbs, D50/D10, glucagon) | **PROTOCOL** (nurse-driven in most hospitals) | Hold/pause insulin per protocol |
| IV fluids/boluses, vasopressor titration | **ORDER** | Titration parameters in order |
| Antibiotics, sedatives, paralytics, RSI drugs | **ORDER/PROVIDER** | |
| Naloxone | **PROTOCOL/ORDER** | |
| Synchronized cardioversion / procedural sedation | **PROVIDER** (RN assists, monitors) | |
| Transcutaneous pacing | **PROTOCOL/MD** (RN competency required) | |
| Needle/finger decompression, chest tube insertion, pericardiocentesis, thoracotomy, balloon tamponade, intubation | **PROVIDER** | RN prepares and assists |
| Thrombolysis decision | **PROVIDER** | RN stops infusion for bleeding/neuro change per protocol |
| Insulin/KCl/hypertonic saline/heparin infusions | **ORDER · HIGH-ALERT** | Independent double check |
| Vent setting changes | **RT/ORDER** | Nurse may titrate FiO₂ per protocol only |
| Foley, central lines, arterial lines | **ORDER/PROVIDER** | |
| Restraints | **ORDER/POLICY** | |

---

## 8. Missing ICU conditions — recommended additions (ranked)

Ranking = (frequency in adult medical/surgical/cardiac ICU) × (time-criticality) × (how often nurses are first responders).

| Rank | Add this card | Why it matters / key nurse content |
|---|---|---|
| 1 | **Acute pulmonary edema / acute decompensated HF + hypertensive emergency** | Extremely common night-time ICU crisis. Sit up, NIV/HFNC, IV nitroglycerin (if BP allows), loop diuretic, BP targets; when *not* to lower BP (stroke/ICH); nicardipine/clevidipine/esmolol infusion safety. |
| 2 | **Severe asthma / COPD exacerbation & auto-PEEP on the vent** | Hypotension + high pressures on vent = auto-PEEP: **disconnect and let chest decompress**; bronchodilators, Mg, epinephrine; low RR/long expiratory time; permissive hypercapnia; target SpO₂ 88–92% for COPD. |
| 3 | **Airway emergencies: unplanned extubation, ETT/tracheostomy obstruction or displacement, failed airway** | Trach emergencies (inner cannula removal, suction, bag via mouth *and* stoma, fresh vs old tract) are frequent and fatal when mis-managed; bedside airway cart contents; call for help; cric kit. |
| 4 | **Post-cardiac-surgery emergencies / CALS (resternotomy), pacing-wire basics** | Required in any CT-ICU; also covers chest-tube output triggers and tamponade. |
| 5 | **Severe hyponatremia / hypernatremia and electrolyte emergencies (K⁺, Mg²⁺, Ca²⁺, PO₄³⁻)** | Symptomatic hyponatremia: 3% saline boluses (100–150 mL) and **limit correction** (osmotic demyelination); hypokalemia replacement rates/lines; hypocalcemia with citrate/CRRT; hypomagnesemia/torsades. |
| 6 | **Aortic dissection / acute aortic syndrome** | Anticoag/antiplatelet/lytic danger; BP/HR control (esmolol + vasodilator) per provider; pulse/BP differentials; time-critical surgery. (Add also to ACS recognize list.) |
| 7 | **Transfusion reactions (hemolytic, TACO, TRALI, septic, anaphylactic)** | Common; clear stepwise nurse actions; currently only a single line in Anaphylaxis. |
| 8 | **Hyperthermia syndromes: malignant hyperthermia, NMS, serotonin syndrome, heat stroke; also hypothermia** | Different treatments (dantrolene, cooling, stop agent, benzodiazepines). Nurses recognize first (temp, rigidity, clonus, ETCO₂ rise). |
| 9 | **HHS + adrenal crisis + thyroid storm/myxedema** | Endocrine emergencies seen in medical ICUs; HHS is in the DKA keywords but no content. |
| 10 | **Acute liver failure / hepatic encephalopathy / hyperammonemia / ICP in ALF** | Neuro-checks, glucose, lactulose, bleeding risk; avoid sedatives. |
| 11 | **Line & device emergencies: central-line air embolism, accidental disconnection/hemorrhage, vasopressor extravasation, arterial line bleed, dialysis catheter disconnect, CRRT/ECMO/IABP/Impella/LVAD alarms** | Very frequent nurse-first events; clear "clamp/left-lateral/Trendelenburg/pressure" actions. |
| 12 | **Massive hemoptysis / airway bleeding** | Position bleeding lung down, protect airway, call; differences with ICU intubated pts. |
| 13 | **Myasthenic crisis / Guillain-Barré (bedside NIF/VC monitoring)** | Neuromuscular respiratory failure; know triggers for intubation; avoid certain drugs. |
| 14 | **Delirium/agitation, self-extubation prevention, safe restraints (PADIS/ABCDEF)** | Daily bedside reality; ties RASS/CAM-ICU to actions. |
| 15 | **Spinal cord injury, autonomic dysreflexia, neurogenic shock** | Distinct hemodynamics; bladder/bowel triggers; BP crisis in SCI. |
| 16 | **Abdominal compartment syndrome / acute abdomen / necrotizing infection** | Bladder pressure, rising peak pressures, oliguria; surgeon call. |
| 17 | **Eclampsia / peripartum emergencies (when ICU admits obstetric pts)** | Magnesium, BP control, OB call; left uterine displacement in arrest. |
| 18 | **Severe pancreatitis; DIC/HIT; rhabdomyolysis** | Common ICU consults; nurse monitoring clues. |
| 19 | **Burns & inhalation injury/CO/cyanide** | Where applicable (burn ICU). |
| 20 | **End-of-life care / withdrawal of life-sustaining therapy / brain death protocol** | Nursing-led comfort measures, opioid/benzodiazepine titration, family communication, code status clarity. |

**Also recommended: flag these as `emergency:true` on Home:** `unstable-tachy`, `unstable-brady`, `hyperkalemia`, `hypoglycemia`, `ischemic-stroke`, `ich-icp`, `hemorrhagic-shock`, `tamponade`, `pe` (massive), `vent-alarms`, `sepsis` (septic shock), `resp-failure-intubation`. (Keep the original 4.)

---

## 9. Overall verdict

**Not ready for clinical use as is. "Promising draft — major revision required before release."**

*Strengths*
- Structure and mental model are excellent for bedside use (glance → recognize → actions → monitor → meds → escalate). Search, offline use, dark theme, one-handed UI, and an honest "NOT YET CLINICALLY REVIEWED" banner are all appropriate.
- A large fraction of the content (CPR basics, epinephrine/amiodarone/lidocaine dosing, AES seizure doses, tPA/TNK dosing and BP targets, hyperK sequence, DKA sequence of fluids → K → insulin → dextrose, vent alarm DOPE logic, hypoglycemia treatment, GCS/RASS tables, PBW formulas) is correct and consistent with what I teach.
- Several safety pearls are genuinely good: "supports ventilation first" for naloxone, "do not give adenosine for irregular/polymorphic rhythms," "check K before insulin," "salicylate—avoid intubation without ventilator planning," "scissors at bedside for balloon tamponade," "confirm POC glucose on blood sample."

*Weaknesses (themes)*
1. App design hazards that could cause false completion (persisted ticks) and loss of code data (timer wipes).
2. Missing high-alert-drug warnings (epinephrine concentration, nimodipine route, KCl/hypertonic saline rates, norepinephrine units).
3. Content behind current guidelines (AHA 2025, SSC 2026, AHA/ASA 2026, ADA 2024, andexanet withdrawal).
4. Unclear scope-of-practice: provider procedures and drug orders written as nurse imperatives.
5. Important emergency presentations under-prioritized and key ICU emergencies missing.

*Release recommendation:* Do not release for live patient care until (a) all **CRITICAL** and **MAJOR** items are corrected, (b) a clinical educator, ICU medical director, and pharmacist sign off (and `reviewedBy` is filled in), and (c) the app is clearly labelled as a *reference* that does not replace orders/protocol. After fixes, a second peer review is advisable (ideally by an intensivist and a clinical pharmacist, since I'm a nursing reviewer).

---

## 10. Top-10 priority fixes

1. **Fix checklist persistence (G-1)** — auto-expire/clear ticks per event; never display stale progress on emergency cards.
2. **Eliminate look-alike/high-alert drug hazards:** epinephrine **1 mg/mL IM-only vs 0.1 mg/mL cart syringe (AN-1)**; nimodipine **ORAL/ENTERAL ONLY (IC-1)**; normalize norepinephrine ranges/units (CS-1, G-4); KCl max rates (DK-2); 23.4% NaCl central-only/double check (IC-3).
3. **Add scope/order tags to every action and meds line (G-3)**; tag procedures as provider-only (TP-1, TM-3, GB-1, UT-3) and drug actions as protocol/order (CA-4, AN-2, AC-2, SE-2, OD-1).
4. **Bring content to current guidelines:** AHA 2025 (TTM ≥36 h CA-1, ETCO₂ CA-2, AF ≥200 J AF-1/UT-1, pre-excited AF drugs AF-2, WCT diltiazem UT-5, adenosine/asthma UT-6, polymorphic VT UT-4), SSC 2026 (qSOFA SP-1, source control SP-5), AHA/ASA 2026 AIS (IS-1), ADA 2024 DKA (K⁺ <3.5, bicarb pH <7.0, fluids; DK-1/2/3/4). Update the `sources` list.
5. **Remove andexanet** (HS-1, IC-2) — withdrawn from the US market 12/2025; replace with 4F-PCC per protocol.
6. **Cardioversion/defibrillation safety:** re-arm SYNC after every shock, "clear" call, RN sedation only per order (UT-2, UT-3, CA-8).
7. **Status epilepticus timing and eclampsia:** second-line ready/requested when seizure persists after benzo (SE-1); add magnesium for eclampsia (SE-3); order language for benzodiazepine (SE-2).
8. **Make the code timer usable and safe (APP-1/2/3):** start timer from the arrest card; confirmation for stop/restart/reset; clear stale logs.
9. **Intubation/ICU safety omissions:** succinylcholine contraindications in ICU (RF-1), "paralyzed ≠ sedated" (RF-2), waveform-capnography rule (RF-4), permissive hypotension is provider-directed (HS-2), TXA indication (HS-3), CIWA invalid in intubated pts (AW-1), COPD SpO₂ 88–92% (QT-1), milk/strip chest tubes (TM-1).
10. **Re-prioritize and expand:** flag ≥12 emergency cards (G-5) and add the top-5 missing conditions (pulmonary edema/hypertensive emergency, asthma/COPD with auto-PEEP, airway/trach emergencies, post-cardiac-surgery/CALS, severe Na⁺/electrolyte emergencies) before release.

---

## Appendix A — What I verified on the web (and where I stopped)

- **AHA 2025 Adult ALS (Part 9)** — cpr.heart.org Part 9 page: epinephrine timing/dosing; vasopressin no benefit; routine calcium/bicarb/magnesium not recommended; single-shock strategy; manufacturer-based energy (use max if unknown); IV first, IO second; ETCO₂ (≥10, ideally ≥20; abrupt increase >10 mmHg may indicate ROSC; no isolated cutoff to stop in non-intubated pts); WCT: synchronized cardioversion, avoid diltiazem/verapamil, adenosine not for unstable/irregular/polymorphic; polymorphic VT = defibrillate; AF/flutter cardioversion ≥200 J; pre-excited AF: avoid digoxin, non-DHP CCB, β-blocker, IV amiodarone; adenosine "contraindicated" in asthma (supportive text).
- **AHA 2025 Post-cardiac arrest (Part 11) / Highlights** — temperature control ≥36 h (32–34 °C or 36–37.5 °C); MAP ≥65; neuroprognostication updates. *Not verified:* 2025 post-ROSC SpO₂/PaCO₂ target wording.
- **SSC 2026 (SCCM, 2026-03-23)** — NEWS/NEWS2/MEWS/SIRS preferred over qSOFA; blood cultures before antibiotics; lactate; at least 30 mL/kg crystalloid in first 3 h; peripheral vasopressors; MAP 65 (60–65 for ≥65 y); antibiotics immediately/ideally within 1 h for shock or probable sepsis; source control ideally within 6 h; HFNC over NIV initially; low VT 6 mL/kg, plateau ≤30; prone >12 h/day; intermittent NMB boluses over continuous; IV corticosteroids for septic shock; bicarbonate only for pH ≤7.2 with AKI; prolonged β-lactam infusion for maintenance.
- **AHA/ASA 2026 AIS** — TNK 0.25 mg/kg (max 25 mg) or alteplase 0.9 mg/kg (max 90 mg) COR 1; intensive SBP <140 after IVT not recommended; IVT for disabling deficits regardless of NIHSS without advanced imaging. *Not verified:* every other recommendation.
- **ADA/EASD/JBDS/AACE/DTS 2024 Hyperglycemic Crises Consensus** — fluids 500–1000 mL/h for first 2–4 h; K⁺ <3.5 → replace at 10 mmol/h and delay insulin until >3.5; routine bicarbonate not recommended; consider if pH <7.0; K⁺ monitoring at 2 h after insulin start and q4h.
- **Andexxa** — FDA safety communication: US sales ended 2025-12-22.

**Not verified (relied on my clinical knowledge; flagged [UNSURE]/[from memory] above):** ARDSNet/ROSE details; AES 2016 specifics; ICH 2022 BP numbers; ACS 2021/2025 nuances (LBBB/β-blocker); nimodipine boxed warning language; CALS/STS specifics; AACN chest tube stripping guidance; ASAM thiamine regimens; atropine/bradycardia 2025 wording; adenosine dosing via central line in 2025.

*No citations in this document are invented; where I cite a guideline I name it only because I read it or I am sure of its existence, and unverified specifics are labelled.*
