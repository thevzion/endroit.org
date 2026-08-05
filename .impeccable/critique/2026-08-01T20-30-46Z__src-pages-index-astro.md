---
target: landing publique Endroit
total_score: 20
max_score: 28
na_heuristics: 5,7,9
p0_count: 0
p1_count: 3
timestamp: 2026-08-01T20-30-46Z
slug: src-pages-index-astro
---
Method: dual-agent (A: /root/impeccable_endroit/endroit_design_review · B: /root/impeccable_open_workplace/assessment_a_design)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 3/4 | L’inspecteur expose l’onglet, `Home ready`, l’outcome et une région live. |
| 2 | Match System / Real World | 2/4 | La métaphore du lieu est cohérente, mais `L1 Projection-qualified`, Occupant, Equipment, Material, Route et Site arrivent très tôt. |
| 3 | User Control and Freedom | 3/4 | Navigation et tabs sont réversibles, sans piège; le clavier est pris en charge sur l’axe horizontal. |
| 4 | Consistency and Standards | 4/4 | Terminologie, palette, typographie, diagrammes et interaction forment un système cohérent. |
| 5 | Error Prevention | n/a | Aucun formulaire ni effet mutable sur cette surface Persuade. |
| 6 | Recognition Rather Than Recall | 2/4 | Les relations sont visibles, mais le visiteur doit retenir une ontologie importante entre des sections éloignées. |
| 7 | Flexibility and Efficiency | n/a | Non applicable à cette landing Persuade. |
| 8 | Aesthetic and Minimalist Design | 3/4 | Hiérarchie et craft solides; répétitions conceptuelles et microcopy dense empêchent un 4. |
| 9 | Error Recovery | n/a | Aucun workflow utilisateur susceptible de produire une erreur. |
| 10 | Help and Documentation | 3/4 | Install, schémas, roadmap, source et référence sont accessibles; les définitions restent peu contextuelles. |
| **Total** |  | **20/28** | **Good — 71%** |

Heuristics `5`, `7` et `9` sont `n/a`; maximum applicable : 28.

## Design Specificity Verdict

### LLM assessment

**Distinctive, mais pas encore inimitable.** La marque-maison, la palette papier/cuivre/nocturne, le Home Inspector, le floor plan et les flux d’ownership appartiennent réellement à Endroit. En revanche, la grammaire de page — hero centré surdimensionné, capsule de statut, grand panneau sombre et cartes arrondies répétées — reste familière des landings developer-tool. Le contenu porte aujourd’hui plus de spécificité que la composition.

### Deterministic scan

Le détecteur a été exécuté exactement une fois sur `src/pages/index.astro` et a retourné le code `0` avec le JSON `[]`: 0 finding, donc aucun emplacement, sévérité ou faux positif. Ce résultat propre ne couvre pas les problèmes situés dans `global.css`, le composant React importé, l’ordre post-rendu ou la charge cognitive; il complète donc l’évaluation humaine sans la contredire.

### Visual overlays

Aucun navigateur n’était disponible. Les deux assessments ont reçu `No browser is available`, puis une liste de navigateurs vide. Aucune injection mutable, aucun onglet `[Human]`, aucun overlay et aucun message console `impeccable` ne sont revendiqués.

## Overall Impression

La landing a une identité crédible et une preuve produit forte, mais elle demande au visiteur d’apprendre presque tout Endroit avant de lui faire choisir clairement la prochaine action. La plus grande opportunité est de transformer le Home Inspector en preuve centrale d’une promesse simple, puis de révéler l’ontologie progressivement.

## Cognitive Load

**Charge élevée : 5 échecs sur 8.**

- Échecs : single focus, chunking, minimal choices, working memory, progressive disclosure.
- Réussites : grouping, visual hierarchy, one thing at a time à l’intérieur de chaque diagramme.
- Décisions au-delà de quatre options : navigation desktop (5 liens), familles de gestes (5 pairs), footer (7 liens).

La page persuade, enseigne l’ontologie, démontre l’implémentation, documente l’installation et qualifie les limites alpha dans un seul parcours. Home, Room, Material, Meeting, Equipment, Site, Route, Occupant et projections doivent être retenus entre des sections éloignées.

## Emotional Journey

L’ouverture promet la continuité avec confiance. Le Home Inspector est le pic émotionnel : la preuve inspectable remplace les claims abstraits. Le milieu devient une vallée quand adoption, floor plan, exécution, ownership, Core/Equipment et souveraineté répètent l’effort pédagogique. Les limites alpha rassurent fortement, mais la fin devient défensive et procédurale au lieu de renouveler l’élan vers `Create a Home`.

## What’s Working

- **La métaphore devient un artefact.** Floor plan et ownership maps rendent le modèle inspectable au lieu de le déclarer seulement.
- **La confiance est conçue.** Snapshot sanitized, limites alpha, Sites souverains et Routes approuvées évitent toute promesse magique sur les agents.
- **Le socle accessibilité est réel.** Skip link, focus visible, reduced motion, cibles 44px, tabs sémantiques, navigation clavier et région live sont présents.

## Priority Issues

### [P1] L’ontologie arrive avant que la valeur soit assimilée

- **Why it matters:** un premier visiteur doit traduire plusieurs termes capitalisés avant de savoir pourquoi agir.
- **Fix:** préserver chaque phrase canonique, mais ordonner le premier parcours `promesse → Home Inspector → Create a Home`; déplacer l’ontologie profonde après cette preuve et utiliser la divulgation progressive.
- **Suggested command:** `$impeccable distill`

### [P1] Le texte critique des diagrammes est trop petit et trop faible

- **Why it matters:** les labels descendent à `0.52rem` et plusieurs explications utilisent environ 40–46% de papier sur fond nocturne. La preuve la plus persuasive devient le contenu le plus difficile à lire.
- **Fix:** porter tout texte porteur de sens à 12–14px minimum et au contraste WCAG AA; réserver l’atténuation aux indices décoratifs. Quand les tabs sont empilés sur mobile, supporter également haut/bas ou maintenir une orientation horizontale cohérente.
- **Suggested command:** `$impeccable audit`

### [P1] La conversion principale du hero est sous-pondérée

- **Why it matters:** `Create a Home` et `Inspect the source` sont deux liens inline de même poids; le seul vrai bouton primaire vit dans le header sticky.
- **Fix:** rendre le libellé canonique `Create a Home` dominant dans le hero, garder `Inspect the source` secondaire, puis répéter l’action primaire après les limites alpha.
- **Suggested command:** `$impeccable bolder`

### [P2] L’ordre voulu dépend du déplacement client par titres anglais

- **Why it matters:** `textContent` et les sélecteurs de fratrie lient la composition à la copy visible. Avec JavaScript désactivé, contenu source, remplacements visuels, SSR React et fallback `<noscript>` peuvent répéter les mêmes idées.
- **Fix:** composer l’ordre au build quand l’autorité de projection le permet; au minimum, supprimer toute recherche par texte visible au profit des IDs stables déjà produits et garantir une seule représentation no-JS. Mesurer ensuite si `client:load` est nécessaire ou si une hydratation plus tardive suffit.
- **Suggested command:** `$impeccable harden`

### [P2] Le milieu répète la même cadence visuelle trop longtemps

- **Why it matters:** les diagrammes sont bons isolément, mais leur succession de cartes arrondies transforme le parcours Persuade en documentation uniforme et affaiblit le peak-end rhythm.
- **Fix:** conserver le Home Inspector comme artefact dominant, relier les contenus suivants dans une narration continue Home/floor-plan et réduire les shells répétés ainsi que les titres tous également monumentaux. Vérifier le header, les flows et les blocs code à 390px et 768px.
- **Suggested command:** `$impeccable layout`

## Persona Red Flags

**Jordan — First-Timer:** `New session. Same workplace.` attire immédiatement, puis `owned Home`, Room, Material, Site et `L1 Projection-qualified` créent une barrière avant la preuve. Les deux actions inline ne désignent pas clairement le pas le plus sûr.

**Riley — Stress Tester:** le placement et le masquage client créent une expérience no-JS divergente et potentiellement dupliquée. L’inspecteur ne montre que des états heureux; la résilience reste décrite plutôt que démontrée.

**Casey — Distracted Mobile User:** le header se simplifie bien et les tabs deviennent pleine largeur, mais la page reste exceptionnellement longue. Les labels minuscules, le floor plan horizontalement scrollable et les flows empilés augmentent fortement la fatigue de lecture à une main.

## Minor Observations

- `Inter` est déclaré mais jamais chargé; le rendu dépend donc de la plateforme. Choisir explicitement pile native ou fonte chargée, sans ajouter de dépendance inutile.
- Les indicateurs de liens externes ne sont pas uniformes entre hero, corps et footer.
- L’inspecteur façon terminal peut évoquer une application hébergée malgré le label explicite `no hosted session invoked`.
- Les flèches mobiles pivotent, mais restent visuellement accolées aux cartes plutôt que clairement placées entre les étapes.
- Les limites alpha sont une excellente matière de confiance; elles ne doivent pas nécessairement rester dix bullets de poids égal.

## Questions to Consider

- Un premier visiteur peut-il expliquer Endroit après le hero sans connaître sa grammaire?
- Si un seul artefact doit prouver `same workplace across sessions`, quelque chose doit-il précéder le Home Inspector?
- L’engagement primaire est-il `Create a Home` ou `Inspect the source`?
- La copy exacte des limites alpha peut-elle rester disponible tout en terminant le parcours par confiance et action?
