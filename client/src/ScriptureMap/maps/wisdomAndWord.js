// ─── WISDOM & THE WORD ────────────────────────────────────────────────────────
// Categories: wisdom | instruction | meditation | praise
// All cross-references vetted against TSK and Nave's Topical Bible.
// All paths trace to the Cross within 2 hops.

export const MAP_META = {
  id: "wisdomAndWord",
  title: "Wisdom & The Word",
  subtitle: "The Fear of the Lord and the Life It Produces",
  anchor: "Proverbs 3:5-6",
  verseCount: 22,
  description:
    "Biblical wisdom is not intelligence — it is alignment with God's revealed order. The Word of God is its foundation, the fear of the Lord is its beginning, and Christ Himself is its fullness. 'In whom are hidden all the treasures of wisdom and knowledge' (Colossians 2:3).",
  journey: [
    { nodeId: "w1",   note: "Trust in the Lord — not your own analysis. This is wisdom's first posture." },
    { nodeId: "w4",   note: "The fear of the Lord is the beginning — everything else builds on this foundation" },
    { nodeId: "w2",   note: "Knowledge of the Holy One is understanding — knowing Him is the curriculum" },
    { nodeId: "i1",   note: "All scripture is profitable — this is not ancient history, it is living instruction" },
    { nodeId: "i2",   note: "A lamp to your feet — it does not illuminate the whole road, just the next step" },
    { nodeId: "m1",   note: "Meditate on it day and night — the Word transforms when you dwell in it" },
    { nodeId: "m2",   note: "Like a tree planted by rivers — the one who meditates is rooted and fruitful" },
    { nodeId: "p1",   note: "God inhabits the praises of His people — praise opens the atmosphere" },
    { nodeId: "p3",   note: "Bless the Lord at all times — praise is not mood-dependent" },
    { nodeId: "cross", note: "In Christ are hidden all the treasures of wisdom — He is the destination" },
  ],
};

export const NODES = [
  // ── CROSS (CENTER) ────────────────────────────────────────────────────────────
  {
    id: "cross", category: "cross", redLetter: false, isCross: true,
    ref: "Colossians 2:3",
    textKJV: "In whom are hid all the treasures of wisdom and knowledge.",
    textESV: "In whom are hidden all the treasures of wisdom and knowledge.",
    textNKJV: "In whom are hidden all the treasures of wisdom and knowledge.",
    application: "The Cross reveals what was hidden: that Christ Himself is the source and sum of all wisdom. Every verse in this map is a facet of the wisdom that is fully found in Him.",
    strongsWords: [
      { word: "hid", original: "ἀπόκρυφος (apokryphos)", strongs: "G614", language: "Greek", phonetic: "a-POK-roo-fos", definition: "Hidden away, stored as a treasure — not concealed to deny access but preserved for those who seek. The root of 'apocrypha.' In Christ, the full wisdom of God is stored and made available to the believer.", occurrences: "3x in NT" }
    ],
    source: "TSK: cross-refs Prov 2:4, 1 Cor 1:24, Isa 45:3",
    connections: ["w1", "w2", "w3", "i1", "i2", "m1", "p1"],
    position: { x: 50, y: 50 },
  },

  // ── WISDOM ────────────────────────────────────────────────────────────────────
  {
    id: "w1", category: "wisdom", redLetter: false,
    ref: "Proverbs 3:5-6",
    textKJV: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    textESV: "Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
    textNKJV: "Trust in the Lord with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.",
    application: "The first movement of wisdom is surrender. Wisdom is not self-reliance refined — it is the complete transfer of navigation to God. Your paths become straight when you acknowledge Him in all of them, not just the hard ones.",
    strongsWords: [
      { word: "acknowledge", original: "יָדַע (yada)", strongs: "H3045", language: "Hebrew", phonetic: "yaw-DAH", definition: "To know intimately, to recognize, to experience. Not intellectual acknowledgment but relational knowing — the same word used of Adam 'knowing' Eve (Gen 4:1). Wisdom comes from an intimate knowing of God in every area of life.", occurrences: "944x in OT — one of the most significant verbs in Hebrew" }
    ],
    source: "TSK: cross-refs Ps 37:5, Isa 30:21, Jer 17:7",
    connections: ["cross", "w2", "w3", "i1"],
    position: { x: 22, y: 28 },
  },
  {
    id: "w2", category: "wisdom", redLetter: false,
    ref: "Proverbs 9:10",
    textKJV: "The fear of the LORD is the beginning of wisdom: and the knowledge of the holy is understanding.",
    textESV: "The fear of the LORD is the beginning of wisdom, and knowledge of the Holy One is understanding.",
    textNKJV: "The fear of the Lord is the beginning of wisdom, and the knowledge of the Holy One is understanding.",
    application: "Wisdom does not begin with education, experience, or intelligence — it begins with the fear of the Lord. This is the proper posture of a creature before its Creator: reverence, awe, and total dependence.",
    strongsWords: [
      { word: "fear", original: "יִרְאָה (yirah)", strongs: "H3374", language: "Hebrew", phonetic: "yir-AW", definition: "Reverential awe — not terror but profound reverence that causes a right orientation toward God. The same root as the verb 'to see' — to fear God is to truly see Him as He is. When you see Him rightly, you are wise.", occurrences: "45x in OT in this form" }
    ],
    source: "TSK: cross-refs Ps 111:10, Job 28:28, Prov 1:7",
    connections: ["cross", "w1", "w3", "w4"],
    position: { x: 22, y: 45 },
  },
  {
    id: "w3", category: "wisdom", redLetter: false,
    ref: "James 1:5",
    textKJV: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.",
    textESV: "If any of you lacks wisdom, let him ask God, who gives generously to all without reproach, and it will be given him.",
    textNKJV: "If any of you lacks wisdom, let him ask of God, who gives to all liberally and without reproach, and it will be given to him.",
    application: "God does not guard wisdom reluctantly. He gives it liberally — the Greek is 'with generosity.' And He does not scold you for not knowing. Ask. This promise is unconditional on your unworthiness.",
    strongsWords: [
      { word: "liberally", original: "ἁπλῶς (haplōs)", strongs: "G574", language: "Greek", phonetic: "hap-LOCE", definition: "With singleness of purpose, with generosity, without reservation. Used in early Greek of giving that holds nothing back. When God gives wisdom, He doesn't give a portion — He gives fully and without second thoughts.", occurrences: "1x in NT — unique emphasis on the completeness of God's giving" }
    ],
    source: "TSK: cross-refs Matt 7:7, Luke 11:13, 1 Cor 1:5",
    connections: ["cross", "w1", "w4", "i1"],
    position: { x: 22, y: 62 },
  },
  {
    id: "w4", category: "wisdom", redLetter: false,
    ref: "Proverbs 1:7",
    textKJV: "The fear of the LORD is the beginning of knowledge: but fools despise wisdom and instruction.",
    textESV: "The fear of the LORD is the beginning of knowledge; fools despise wisdom and instruction.",
    textNKJV: "The fear of the Lord is the beginning of knowledge, but fools despise wisdom and instruction.",
    application: "Knowledge and wisdom both start in the same place: the fear of the Lord. Every field of true knowledge is held together by this — including medicine, law, and science. There is no wisdom that contradicts its own Author.",
    strongsWords: [
      { word: "beginning", original: "רֵאשִׁית (reshit)", strongs: "H7225", language: "Hebrew", phonetic: "ray-SHEET", definition: "First in order, the chief part, the choicest portion. The same word used in Genesis 1:1 ('In the beginning'). The fear of the Lord is not the introduction to wisdom — it is its very foundation and first principle.", occurrences: "51x in OT, including the opening word of the Bible" }
    ],
    source: "TSK: cross-refs Ps 111:10, Job 28:28, Eccl 12:13",
    connections: ["w2", "w3", "w5", "cross"],
    position: { x: 30, y: 76 },
  },
  {
    id: "w5", category: "wisdom", redLetter: true,
    ref: "Matthew 7:24",
    textKJV: "Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock.",
    textESV: "Everyone then who hears these words of mine and does them will be like a wise man who built his house on the rock.",
    textNKJV: "Therefore whoever hears these sayings of Mine, and does them, I will liken him to a wise man who built his house on the rock.",
    application: "Jesus defines wisdom simply: hear and do. Not hear and analyze. Not hear and agree in principle. The test of wisdom is not what you know but what you build on what you know. Obedience is wisdom made visible.",
    strongsWords: [
      { word: "doeth", original: "ποιέω (poieō)", strongs: "G4160", language: "Greek", phonetic: "poi-EH-o", definition: "To do, to make, to produce, to perform. An active, completed-action word. The wise man does not delay his obedience until circumstances are ideal — he acts on what he hears and builds continuously.", occurrences: "568x in NT — the most common Greek verb for doing" }
    ],
    source: "TSK: cross-refs Luke 6:47, Prov 14:1, Ezek 13:11",
    connections: ["cross", "w1", "i1", "i3"],
    position: { x: 40, y: 82 },
  },
  {
    id: "w6", category: "wisdom", redLetter: false,
    ref: "Ecclesiastes 12:13",
    textKJV: "Fear God, and keep his commandments: for this is the whole duty of man.",
    textESV: "Fear God and keep his commandments, for this is the whole duty of man.",
    textNKJV: "Fear God and keep His commandments, for this is man's all.",
    application: "After exploring every human pursuit — wealth, pleasure, labor, philosophy — Solomon's conclusion is the same as Proverbs 1:7. Every road leads back to this: reverence for God and obedience to His Word is the entire purpose of a human life.",
    strongsWords: [
      { word: "whole duty", original: "כֹּל (kol)", strongs: "H3605", language: "Hebrew", phonetic: "KOLE", definition: "The all, the whole, everything — the entirety without remainder. The Hebrew is simply 'this is the all of man.' Not one part, not the most important part — the whole of what a human being is and does.", occurrences: "5415x in OT — the comprehensive word for totality" }
    ],
    source: "TSK: cross-refs Deut 10:12, Mic 6:8, Matt 22:37",
    connections: ["w2", "w4", "i1", "cross"],
    position: { x: 20, y: 72 },
  },

  // ── INSTRUCTION ───────────────────────────────────────────────────────────────
  {
    id: "i1", category: "instruction", redLetter: false,
    ref: "2 Timothy 3:16-17",
    textKJV: "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: that the man of God may be perfect, throughly furnished unto all good works.",
    textESV: "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness, that the man of God may be complete, equipped for every good work.",
    textNKJV: "All Scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness, that the man of God may be complete, thoroughly equipped for every good work.",
    application: "Scripture covers every angle of human formation: what to believe (doctrine), where you're wrong (reproof), how to get right (correction), and how to stay right (instruction). The Word is a complete curriculum for becoming fully human.",
    strongsWords: [
      { word: "inspiration", original: "θεόπνευστος (theopneustos)", strongs: "G2315", language: "Greek", phonetic: "theh-OP-noo-stos", definition: "God-breathed — composed of theos (God) and pneustos (breathed). Scripture is not a human record of spiritual insights; it is the breath of God exhaled into written form. The living God spoke, and every word carries His life.", occurrences: "Only here in all of Scripture — a word Paul may have coined for this statement" }
    ],
    source: "TSK: cross-refs 2 Pet 1:21, Ps 119:105, Heb 4:12",
    connections: ["cross", "w1", "w3", "i2", "i3", "m1"],
    position: { x: 72, y: 28 },
  },
  {
    id: "i2", category: "instruction", redLetter: false,
    ref: "Psalm 119:105",
    textKJV: "Thy word is a lamp unto my feet, and a light unto my path.",
    textESV: "Your word is a lamp to my feet and a light to my path.",
    textNKJV: "Your word is a lamp to my feet and a light to my path.",
    application: "A lamp illumines the next step; light shows the path ahead. The Word functions at both scales — immediate guidance for the decision in front of you, and long-range direction for the trajectory of your life.",
    strongsWords: [
      { word: "lamp", original: "נֵר (ner)", strongs: "H5216", language: "Hebrew", phonetic: "NARE", definition: "A lamp — typically an oil lamp that gives limited, close-range light. Significantly different from 'light' (or) which floods a larger area. This pair is intentional: the Word is both close-range (ner) and horizon-level (or) guidance simultaneously.", occurrences: "45x in OT" }
    ],
    source: "TSK: cross-refs Prov 6:23, Ps 43:3, 2 Pet 1:19",
    connections: ["i1", "i3", "m1", "cross"],
    position: { x: 78, y: 42 },
  },
  {
    id: "i3", category: "instruction", redLetter: false,
    ref: "Proverbs 6:23",
    textKJV: "For the commandment is a lamp; and the law is light; and reproofs of instruction are the way of life.",
    textESV: "For the commandment is a lamp and the teaching a light, and the reproofs of instruction are the way of life.",
    textNKJV: "For the commandment is a lamp, and the law a light; reproofs of instruction are the way of life.",
    application: "Correction is not punishment — it is the road back to life. The same light that shows you the path ahead also shows you when you've veered off it. Both functions are gifts from a God who wants you to arrive.",
    strongsWords: [
      { word: "reproofs", original: "תּוֹכַחַת (tokachath)", strongs: "H8433", language: "Hebrew", phonetic: "to-KA-khat", definition: "Correction, rebuke, reasoning together. Used in Prov 15:31 of 'life-giving correction.' It implies a reasoned confrontation by someone who cares about the outcome. God's correction is not harsh dismissal — it is reasoned love.", occurrences: "24x in OT" }
    ],
    source: "TSK: cross-refs Ps 19:8, Deut 17:19, Ps 119:105",
    connections: ["i1", "i2", "w5", "cross"],
    position: { x: 80, y: 58 },
  },
  {
    id: "i4", category: "instruction", redLetter: false,
    ref: "Romans 12:2",
    textKJV: "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.",
    textESV: "Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect.",
    textNKJV: "And do not be conformed to this world, but be transformed by the renewing of your mind, that you may prove what is that good and acceptable and perfect will of God.",
    application: "Wisdom is not downloaded into a passive mind — it requires transformation of the mind through the Word. The renewing is ongoing (present tense in Greek); it is a daily practice of replacing the world's framing with God's revealed truth.",
    strongsWords: [
      { word: "transformed", original: "μεταμορφόω (metamorphoō)", strongs: "G3339", language: "Greek", phonetic: "me-ta-mor-FO-o", definition: "To transform from the inside out — the root of our word 'metamorphosis.' Significantly different from the world's 'conform' (syschēmatizō — an external mold). God's renewal is internal and permanent; worldly conformity is external and temporary.", occurrences: "4x in NT, including the Transfiguration of Jesus" }
    ],
    source: "TSK: cross-refs Eph 4:23, Col 3:10, 1 Cor 2:16",
    connections: ["i1", "m1", "m2", "w1", "cross"],
    position: { x: 72, y: 72 },
  },

  // ── MEDITATION ────────────────────────────────────────────────────────────────
  {
    id: "m1", category: "meditation", redLetter: false,
    ref: "Joshua 1:8",
    textKJV: "This book of the law shall not depart out of thy mouth; but thou shalt meditate therein day and night, that thou mayest observe to do according to all that is written therein: for then thou shalt make thy way prosperous, and then thou shalt have good success.",
    textESV: "This Book of the Law shall not depart from your mouth, but you shall meditate on it day and night, so that you may be careful to do according to all that is written in it. For then you will make your way prosperous, and then you will have good success.",
    textNKJV: "This Book of the Law shall not depart from your mouth, but you shall meditate in it day and night, that you may observe to do according to all that is written in it. For then you will make your way prosperous, and then you will have good success.",
    application: "God's promise of success to Joshua was not attached to strategy, talent, or leadership skill — it was attached to meditation on the Word. The pattern is the same today: Word → obedience → prosperity and success, in that order.",
    strongsWords: [
      { word: "meditate", original: "הָגָה (hagah)", strongs: "H1897", language: "Hebrew", phonetic: "haw-GAH", definition: "To mutter, to muse, to ponder by speaking softly to oneself. Biblical meditation is not emptying the mind — it is filling the mouth with the Word and speaking it quietly, repeatedly, until it saturates the heart. Very different from Eastern meditation.", occurrences: "25x in OT — often translated 'mutter' or 'utter'" }
    ],
    source: "TSK: cross-refs Ps 1:2, Deut 17:19, Ps 119:97",
    connections: ["cross", "i1", "i4", "m2", "m3"],
    position: { x: 62, y: 72 },
  },
  {
    id: "m2", category: "meditation", redLetter: false,
    ref: "Psalm 1:1-3",
    textKJV: "Blessed is the man that walketh not in the counsel of the ungodly... but his delight is in the law of the LORD; and in his law doth he meditate day and night. And he shall be like a tree planted by the rivers of water.",
    textESV: "Blessed is the man who walks not in the counsel of the wicked... but his delight is in the law of the LORD, and on his law he meditates day and night. He is like a tree planted by streams of water.",
    textNKJV: "Blessed is the man who walks not in the counsel of the ungodly... but his delight is in the law of the Lord, and in His law he meditates day and night. He shall be like a tree planted by the rivers of water.",
    application: "A tree planted by water doesn't strain to grow — it thrives because of its source. The Word-meditating believer is not striving; they are rooted. Fruitfulness is automatic when your roots are in the right place.",
    strongsWords: [
      { word: "planted", original: "שָׁתַל (shathal)", strongs: "H8362", language: "Hebrew", phonetic: "shaw-THAL", definition: "To transplant, to place deliberately in a chosen location. Used of royal trees replanted in optimal conditions. The Word-meditating believer is not a wild growth — they have been deliberately placed where they will thrive.", occurrences: "10x in OT" }
    ],
    source: "TSK: cross-refs Jer 17:8, Ezek 47:12, Ps 92:13",
    connections: ["m1", "m3", "i4", "cross"],
    position: { x: 62, y: 82 },
  },
  {
    id: "m3", category: "meditation", redLetter: false,
    ref: "Psalm 119:97",
    textKJV: "O how love I thy law! it is my meditation all the day.",
    textESV: "Oh how I love your law! It is my meditation all the day.",
    textNKJV: "Oh, how I love Your law! It is my meditation all the day.",
    application: "The psalmist's meditation was not discipline — it was delight. When you love the Word, meditation is effortless. The goal is to get to the place where turning the Word over in your mind throughout the day is as natural as breathing.",
    strongsWords: [
      { word: "meditation", original: "שִׂיחָה (sikhah)", strongs: "H7881", language: "Hebrew", phonetic: "see-KHAW", definition: "A musing, a going over in thought — a mental rehearsal. Related to the word for a garden walk (Gen 24:63). It has the quality of unhurried, pleasurable reflection, not anxious analysis.", occurrences: "3x in OT" }
    ],
    source: "TSK: cross-refs Ps 1:2, Josh 1:8, Ps 119:99",
    connections: ["m1", "m2", "i2", "cross"],
    position: { x: 72, y: 85 },
  },

  // ── PRAISE ────────────────────────────────────────────────────────────────────
  {
    id: "p1", category: "praise", redLetter: false,
    ref: "Psalm 22:3",
    textKJV: "But thou art holy, O thou that inhabitest the praises of Israel.",
    textESV: "Yet you are holy, enthroned on the praises of Israel.",
    textNKJV: "But You are holy, enthroned in the praises of Israel.",
    application: "Praise creates an environment where God is enthroned. When you praise, you are not earning God's presence — you are making room for it. The throne He occupies is built by the praise of His people.",
    strongsWords: [
      { word: "inhabitest", original: "יָשַׁב (yashab)", strongs: "H3427", language: "Hebrew", phonetic: "yaw-SHAB", definition: "To sit, to dwell, to be enthroned — with the implication of permanence. God doesn't briefly visit praise; He takes up residence in it. The Hebrew throne imagery means: where praise is, there His kingly authority rests.", occurrences: "1090x in OT — the most common word for 'dwell'" }
    ],
    source: "TSK: cross-refs 2 Chr 6:41, Ps 113:5, Rev 4:2",
    connections: ["cross", "p2", "p3", "m1"],
    position: { x: 78, y: 18 },
  },
  {
    id: "p2", category: "praise", redLetter: false,
    ref: "Hebrews 13:15",
    textKJV: "By him therefore let us offer the sacrifice of praise to God continually, that is, the fruit of our lips giving thanks to his name.",
    textESV: "Through him then let us continually offer up a sacrifice of praise to God, that is, the fruit of lips that acknowledge his name.",
    textNKJV: "Therefore by Him let us continually offer the sacrifice of praise to God, that is, the fruit of our lips, giving thanks to His name.",
    application: "Praise is called a sacrifice — meaning it costs something. You bring praise when you feel like it and when you don't. The lips that praise under pressure are the lips God calls fruit-bearing. Through Christ, every act of praise is acceptable.",
    strongsWords: [
      { word: "sacrifice of praise", original: "θυσία αἰνέσεως (thysia aineseōs)", strongs: "G2378/G133", language: "Greek", phonetic: "THOO-see-a eye-NEH-se-oce", definition: "A sacrifice of praise — drawn from the Hebrew 'zebah todah' (thanksgiving offering). The early church would have recognized this as the New Covenant version of the thank offering. It is offered through Christ, which makes it acceptable before God.", occurrences: "The phrase draws from Lev 7:12-13 LXX" }
    ],
    source: "TSK: cross-refs Lev 7:12, Ps 50:23, 1 Pet 2:5",
    connections: ["p1", "p3", "cross"],
    position: { x: 80, y: 30 },
  },
  {
    id: "p3", category: "praise", redLetter: false,
    ref: "Psalm 34:1",
    textKJV: "I will bless the LORD at all times: his praise shall continually be in my mouth.",
    textESV: "I will bless the LORD at all times; his praise shall continually be in my mouth.",
    textNKJV: "I will bless the Lord at all times; His praise shall continually be in my mouth.",
    application: "David wrote Psalm 34 while pretending to be insane to escape a king who wanted to kill him. 'At all times' includes the moments that make no sense. Continual praise is not a response to circumstances — it is a discipline that transcends them.",
    strongsWords: [
      { word: "bless", original: "בָּרַךְ (barak)", strongs: "H1288", language: "Hebrew", phonetic: "baw-RAK", definition: "To kneel, to bless — used both of God blessing man and man blessing God. When humans bless God, it is the act of attributing worth to Him regardless of our current situation. It is an act of theological confession: 'You are good, even now.'", occurrences: "330x in OT" }
    ],
    source: "TSK: cross-refs Ps 145:2, Eph 5:20, 1 Thess 5:18",
    connections: ["p1", "p2", "m3", "cross"],
    position: { x: 80, y: 42 },
  },
  {
    id: "p4", category: "praise", redLetter: false,
    ref: "Isaiah 61:3",
    textKJV: "To give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness; that they might be called trees of righteousness, the planting of the LORD, that he might be glorified.",
    textESV: "To give them a beautiful headdress instead of ashes, the oil of gladness instead of mourning, the garment of praise instead of a faint spirit; that they may be called oaks of righteousness, the planting of the LORD, that he may be glorified.",
    textNKJV: "To give them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness; that they may be called trees of righteousness, the planting of the Lord, that He may be glorified.",
    application: "Praise is a garment — you put it on. It is a deliberate, chosen covering for a heavy spirit. The exchange is divine: you bring the ashes, He gives beauty; you bring mourning, He gives oil; you bring heaviness, He gives praise that transforms.",
    strongsWords: [
      { word: "garment of praise", original: "מַעֲטֵה תְהִלָּה (ma'ateh tehillah)", strongs: "H4594/H8416", language: "Hebrew", phonetic: "mah-ah-TEH teh-hil-LAW", definition: "A cloak or mantle of praise — an outer garment that changes your appearance and covering. Tehillah is used for the specific praise that comes from God's character (the root of Psalm — Tehillim). Putting on praise means clothing yourself in the truth of who God is.", occurrences: "Unique combination — a poetic image unique to this passage" }
    ],
    source: "TSK: cross-refs Luke 4:18, Isa 60:21, Ps 92:13",
    connections: ["p1", "p3", "cross"],
    position: { x: 78, y: 62 },
  },
];
