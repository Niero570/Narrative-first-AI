// ─── PROPHETS & FULFILLMENT ───────────────────────────────────────────────────
// Categories: prophecy (OT) | fulfillment (NT)
// Special edge type: "fulfillment" — dashed gold lines connecting OT prophecy
// to its specific NT fulfillment. Every pair is one-to-one.
// All cross-references vetted against TSK and standard study Bible marginals.

export const MAP_META = {
  id: "prophetsAndFulfillment",
  title: "Prophets & Fulfillment",
  subtitle: "What Was Written Before, Made Manifest in Christ",
  anchor: "Isaiah 7:14 → Matthew 1:23",
  verseCount: 24,
  description:
    "The prophets did not speak of vague spiritual ideals — they named specific events centuries before they occurred. The fulfillments in the New Testament are not coincidence or symbol: they are the proof that the God who wrote the ending of history wrote its beginning as well. All of it converges on Christ.",
  journey: [
    { nodeId: "p_virgin",       note: "Isaiah 7:14 — written 700 years before the birth" },
    { nodeId: "f_virgin",       note: "Matthew 1:22-23 — behold the virgin shall conceive, fulfilled exactly" },
    { nodeId: "p_bethlehem",    note: "Micah 5:2 — the specific town named 700 years prior" },
    { nodeId: "f_bethlehem",    note: "Matthew 2:5-6 — out of Bethlehem shall come the Ruler" },
    { nodeId: "p_triumphal",    note: "Zechariah 9:9 — thy King comes riding on a donkey" },
    { nodeId: "f_triumphal",    note: "John 12:14-15 — He found a young donkey and sat on it" },
    { nodeId: "p_betrayal",     note: "Zechariah 11:12-13 — thirty pieces of silver, thrown to the potter" },
    { nodeId: "f_betrayal",     note: "Matthew 27:3-10 — Judas returned the silver; it bought the potter's field" },
    { nodeId: "p_silence",      note: "Isaiah 53:7 — He opened not His mouth before His accusers" },
    { nodeId: "f_silence",      note: "Matthew 27:12-14 — He answered not one word, to the governor's amazement" },
    { nodeId: "p_lots",         note: "Psalm 22:18 — they part His garments and cast lots for His clothing" },
    { nodeId: "f_lots",         note: "John 19:23-24 — the soldiers cast lots, that the scripture might be fulfilled" },
    { nodeId: "p_resurrection", note: "Psalm 16:10 — thou wilt not leave my soul in sheol" },
    { nodeId: "f_resurrection", note: "Acts 2:31-32 — David spoke of the resurrection of Christ" },
    { nodeId: "cross",          note: "Luke 24:44 — all things must be fulfilled which were written in the Law, Prophets, and Psalms" },
  ],
};

// EDGE TYPES:
//   normal      — standard white glow connection
//   fulfillment — dashed gold line (OT prophecy → NT fulfillment)
// The `fulfillmentOf` field on NT nodes points to the matching OT node id.
// The `fulfilledBy` field on OT nodes points to the matching NT node id.

export const NODES = [
  // ── CROSS (CENTER) ────────────────────────────────────────────────────────────
  {
    id: "cross", category: "cross", redLetter: false, isCross: true,
    ref: "Luke 24:44",
    textKJV: "And he said unto them, These are the words which I spake unto you, while I was yet with you, that all things must be fulfilled, which were written in the law of Moses, and in the prophets, and in the psalms, concerning me.",
    textESV: "Then he said to them, 'These are my words that I spoke to you while I was still with you, that everything written about me in the Law of Moses and the Prophets and the Psalms must be fulfilled.'",
    textNKJV: "Then He said to them, 'These are the words which I spoke to you while I was still with you, that all things must be fulfilled which were written in the Law of Moses and the Prophets and the Psalms concerning Me.'",
    application: "Jesus Himself declared that every division of the Hebrew Scriptures — Law, Prophets, Writings (Psalms) — pointed to Him. The entire Old Testament is a portrait of Christ before His arrival. All the lines of prophecy converge on this one life.",
    strongsWords: [
      { word: "fulfilled", original: "πληρόω (plēroō)", strongs: "G4137", language: "Greek", phonetic: "play-RO-o", definition: "To fill to the brim, to complete, to bring to its intended conclusion. The prophets opened containers; Christ filled them to overflowing. Every prophecy was an unfinished sentence — He completed every one.", occurrences: "86x in NT, often in the Gospels as 'that it might be fulfilled'" }
    ],
    source: "TSK: cross-refs Matt 5:17, John 5:39, Acts 3:18",
    connections: ["p_birth", "p_virgin", "p_bethlehem", "p_priest", "p_triumphal", "p_betrayal", "p_silence", "p_lots", "p_thirst", "p_bones", "p_resurrection", "p_servant"],
    position: { x: 50, y: 50 },
  },

  // ── PAIR 1: Virgin Birth ───────────────────────────────────────────────────────
  {
    id: "p_virgin", category: "prophecy", redLetter: false,
    ref: "Isaiah 7:14",
    textKJV: "Therefore the Lord himself shall give you a sign; Behold, a virgin shall conceive, and bear a son, and shall call his name Immanuel.",
    textESV: "Therefore the Lord himself will give you a sign. Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel.",
    textNKJV: "Therefore the Lord Himself will give you a sign: Behold, the virgin shall conceive and bear a Son, and shall call His name Immanuel.",
    application: "Isaiah gave this sign ~700 years before it occurred. A virgin birth was not achievable by human engineering or religious tradition — it was God's chosen signature on His own arrival.",
    strongsWords: [
      { word: "virgin", original: "עַלְמָה (almah)", strongs: "H5959", language: "Hebrew", phonetic: "al-MAH", definition: "A young woman of marriageable age who has not known a man. The LXX (Greek OT) translated this as parthenos (virgin) — the word Matthew uses. The sign God chose was biologically impossible by any natural means.", occurrences: "7x in OT" }
    ],
    source: "TSK: cross-refs Matt 1:23, Luke 1:31, Mic 5:3",
    connections: ["cross", "p_birth"],
    fulfilledBy: "f_virgin",
    position: { x: 18, y: 18 },
  },
  {
    id: "f_virgin", category: "fulfillment", redLetter: false,
    ref: "Matthew 1:22-23",
    textKJV: "Now all this was done, that it might be fulfilled which was spoken of the Lord by the prophet, saying, Behold, a virgin shall be with child, and shall bring forth a son, and they shall call his name Emmanuel, which being interpreted is, God with us.",
    textESV: "All this took place to fulfill what the Lord had spoken by the prophet: 'Behold, the virgin shall conceive and bear a son, and they shall call his name Immanuel' (which means, God with us).",
    textNKJV: "So all this was done that it might be fulfilled which was spoken by the Lord through the prophet, saying: 'Behold, the virgin shall be with child, and bear a Son, and they shall call His name Immanuel,' which is translated, 'God with us.'",
    application: "Matthew quotes Isaiah directly and names the fulfillment: God with us. The virgin birth was not just a biological miracle — it was the moment God crossed into human space. Every promise that follows rests on this foundation.",
    strongsWords: [
      { word: "Emmanuel", original: "Ἐμμανουήλ (Emmanouel) / עִמָּנוּאֵל (Immanuel)", strongs: "G1694/H6005", language: "Hebrew/Greek", phonetic: "em-man-oo-AYL", definition: "God (El) with us (immanu). A compound name that is itself a theological statement: the eternal God, present with humanity. Not God watching from afar — God inhabiting the same space, breathing the same air.", occurrences: "Used 3x in OT (Isa 7:14, 8:8, 8:10) and 1x in NT" }
    ],
    source: "TSK: cross-refs Isa 7:14, Luke 1:35, John 1:14",
    fulfillmentOf: "p_virgin",
    connections: ["cross", "f_birth"],
    position: { x: 18, y: 28 },
  },

  // ── PAIR 2: Born in Bethlehem ─────────────────────────────────────────────────
  {
    id: "p_bethlehem", category: "prophecy", redLetter: false,
    ref: "Micah 5:2",
    textKJV: "But thou, Bethlehem Ephratah, though thou be little among the thousands of Judah, yet out of thee shall he come forth unto me that is to be ruler in Israel; whose goings forth have been from of old, from everlasting.",
    textESV: "But you, O Bethlehem Ephrathah, who are too little to be among the clans of Judah, from you shall come forth for me one who is to be ruler in Israel, whose coming forth is from of old, from ancient days.",
    textNKJV: "But you, Bethlehem Ephrathah, though you are little among the thousands of Judah, yet out of you shall come forth to Me the One to be Ruler in Israel, whose goings forth are from of old, from everlasting.",
    application: "Micah specifies a city — not a region, but Bethlehem Ephrathah (to distinguish it from another Bethlehem). He also specifies that this ruler's origins are 'from everlasting' — a declaration of pre-existence.",
    strongsWords: [
      { word: "everlasting", original: "עוֹלָם (olam)", strongs: "H5769", language: "Hebrew", phonetic: "o-LAWM", definition: "Eternity, the distant past or future, that which has no defined horizon. Used of God's existence before creation. Micah is not merely predicting a future king — he is predicting One who already existed before time began.", occurrences: "440x in OT" }
    ],
    source: "TSK: cross-refs Matt 2:6, John 7:42, Luke 2:4",
    connections: ["cross"],
    fulfilledBy: "f_bethlehem",
    position: { x: 30, y: 14 },
  },
  {
    id: "f_bethlehem", category: "fulfillment", redLetter: false,
    ref: "Matthew 2:5-6",
    textKJV: "And they said unto him, In Bethlehem of Judaea: for thus it is written by the prophet, And thou Bethlehem, in the land of Juda, art not the least among the princes of Juda: for out of thee shall come a Governor, that shall rule my people Israel.",
    textESV: "They told him, 'In Bethlehem of Judea, for so it is written by the prophet: And you, O Bethlehem, in the land of Judah, are by no means least among the rulers of Judah; for from you shall come a ruler who will shepherd my people Israel.'",
    textNKJV: "So they said to him, 'In Bethlehem of Judea, for thus it is written by the prophet: But you, Bethlehem, in the land of Judah, are not the least among the rulers of Judah; for out of you shall come a Ruler who will shepherd My people Israel.'",
    application: "The chief priests and scribes knew the answer immediately — they had been reading Micah for centuries. They knew where He would be born; what they missed was that He had already arrived.",
    strongsWords: [
      { word: "shepherd", original: "ποιμαίνω (poimainō)", strongs: "G4165", language: "Greek", phonetic: "poi-MY-no", definition: "To shepherd, to tend, to guard and feed. Matthew's quote changes 'ruler' (nagad) to 'shepherd' (poimainō) — not a translation error but a theological interpretation: the ruler God promised is a shepherd-king, not a conqueror.", occurrences: "11x in NT" }
    ],
    source: "TSK: cross-refs Mic 5:2, John 7:42, 2 Sam 5:2",
    fulfillmentOf: "p_bethlehem",
    connections: ["cross", "f_virgin"],
    position: { x: 30, y: 24 },
  },

  // ── PAIR 3: Triumphal Entry ────────────────────────────────────────────────────
  {
    id: "p_triumphal", category: "prophecy", redLetter: false,
    ref: "Zechariah 9:9",
    textKJV: "Rejoice greatly, O daughter of Zion; shout, O daughter of Jerusalem: behold, thy King cometh unto thee: he is just, and having salvation; lowly, and riding upon an ass, and upon a colt the foal of an ass.",
    textESV: "Rejoice greatly, O daughter of Zion! Shout aloud, O daughter of Jerusalem! Behold, your king is coming to you; righteous and having salvation is he, humble and mounted on a donkey, on a colt, the foal of a donkey.",
    textNKJV: "Rejoice greatly, O daughter of Zion! Shout, O daughter of Jerusalem! Behold, your King is coming to you; He is just and having salvation, lowly and riding on a donkey, a colt, the foal of a donkey.",
    application: "Zechariah specifies the animal, the city, the posture, and the character of the king. A warring king rode a horse; a peaceable king rode a donkey. Five centuries before Palm Sunday, this moment was written.",
    strongsWords: [
      { word: "lowly", original: "עָנִי (aniy)", strongs: "H6041", language: "Hebrew", phonetic: "aw-NEE", definition: "Poor, humble, afflicted, lowly. This word describes the king's posture — not a military display but an intentional demonstration of peaceful access. The King of kings chose the posture of the poor man to enter His city.", occurrences: "80x in OT" }
    ],
    source: "TSK: cross-refs Matt 21:5, John 12:15, Mark 11:7",
    connections: ["cross", "p_betrayal"],
    fulfilledBy: "f_triumphal",
    position: { x: 70, y: 14 },
  },
  {
    id: "f_triumphal", category: "fulfillment", redLetter: false,
    ref: "John 12:14-15",
    textKJV: "And Jesus, when he had found a young ass, sat thereon; as it is written, Fear not, daughter of Sion: behold, thy King cometh, sitting on an ass's colt.",
    textESV: "And Jesus found a young donkey and sat on it, just as it is written, 'Fear not, daughter of Zion; behold, your king is coming, sitting on a donkey's colt!'",
    textNKJV: "Then Jesus, when He had found a young donkey, sat on it; as it is written: 'Fear not, daughter of Zion; behold, your King is coming, sitting on a donkey's colt.'",
    application: "John notes that the disciples didn't understand this fulfillment until after the resurrection. The prophetic record is often only recognized in retrospect — and it is designed to be, so that the evidence cannot be manufactured.",
    strongsWords: [
      { word: "Fear not", original: "μὴ φοβοῦ (mē phobou)", strongs: "G5399", language: "Greek", phonetic: "may FOB-oo", definition: "Stop fearing, do not fear. The present imperative implies a command to cease an ongoing fear. The arrival of the King is the reason fear ends — not a command to white-knuckle courage, but a declaration that its cause is gone.", occurrences: "Present tense used for stopping an active state" }
    ],
    source: "TSK: cross-refs Zech 9:9, Matt 21:7, Luke 19:35",
    fulfillmentOf: "p_triumphal",
    connections: ["cross", "f_bethlehem"],
    position: { x: 70, y: 24 },
  },

  // ── PAIR 4: Betrayal for 30 Silver ───────────────────────────────────────────
  {
    id: "p_betrayal", category: "prophecy", redLetter: false,
    ref: "Zechariah 11:12-13",
    textKJV: "And I said unto them, If ye think good, give me my price; and if not, forbear. So they weighed for my price thirty pieces of silver. And the LORD said unto me, Cast it unto the potter: a goodly price that I was prised at of them. And I took the thirty pieces of silver, and cast them to the potter in the house of the LORD.",
    textESV: "Then I said to them, 'If it seems good to you, give me my wages; but if not, keep them.' And they weighed out as my wages thirty pieces of silver. Then the LORD said to me, 'Throw it to the potter' — the lordly price at which I was priced by them. So I took the thirty pieces of silver and threw them into the house of the LORD, to the potter.",
    textNKJV: "Then I said to them, 'If it is agreeable to you, give me my wages; and if not, refrain.' So they weighed out for my wages thirty pieces of silver. And the Lord said to me, 'Throw it to the potter' — that princely price they set on me. So I took the thirty pieces of silver and threw them into the house of the Lord for the potter.",
    application: "Thirty silver pieces — the price of a slave (Exodus 21:32). The exact amount. The exact destination (the house of the Lord, the potter). Written 500 years before Judas agreed to his price. No human could arrange this.",
    strongsWords: [
      { word: "thirty pieces of silver", original: "שְׁלֹשִׁים כֶּסֶף (sheloshim keseph)", strongs: "H7970/H3701", language: "Hebrew", phonetic: "sheh-lo-SHEEM KEH-sef", definition: "Thirty units of silver. Per Exodus 21:32, this was the legal compensation for a slave killed by an ox — the value of the lowest member of society. The price Judas set on the Son of God was the price of a slave. The irony is the point.", occurrences: "This exact valuation used in Exod 21:32 as the slave price" }
    ],
    source: "TSK: cross-refs Matt 26:15, Matt 27:3-10, Exod 21:32",
    connections: ["cross", "p_triumphal", "p_lots"],
    fulfilledBy: "f_betrayal",
    position: { x: 82, y: 30 },
  },
  {
    id: "f_betrayal", category: "fulfillment", redLetter: false,
    ref: "Matthew 27:3-10",
    textKJV: "Then Judas... repented himself, and brought again the thirty pieces of silver to the chief priests and elders... And they took counsel, and bought with them the potter's field.",
    textESV: "Then when Judas... changed his mind and brought back the thirty pieces of silver to the chief priests and the elders... And they took counsel and bought with them the potter's field.",
    textNKJV: "Then Judas... was remorseful and brought back the thirty pieces of silver to the chief priests and elders... And they consulted together and bought with them the potter's field.",
    application: "Every detail arrived: the amount, the return, the purchase of a potter's field. Matthew calls this a fulfillment of 'Jeremiah the prophet' — a composite quote from Jeremiah 19 and Zechariah 11, showing that the prophets together pointed to one moment.",
    strongsWords: [
      { word: "repented", original: "μεταμέλομαι (metamelomai)", strongs: "G3338", language: "Greek", phonetic: "me-ta-MEL-o-my", definition: "To change one's mind after the fact, to regret — but without the positive transformation of metanoia (true repentance). Judas felt sorrow for the outcome but did not turn to God. Regret without repentance is remorse without rescue.", occurrences: "6x in NT" }
    ],
    source: "TSK: cross-refs Zech 11:12-13, Jer 19:1, Acts 1:18",
    fulfillmentOf: "p_betrayal",
    connections: ["cross", "f_triumphal"],
    position: { x: 82, y: 40 },
  },

  // ── PAIR 5: Silent Before Accusers ────────────────────────────────────────────
  {
    id: "p_silence", category: "prophecy", redLetter: false,
    ref: "Isaiah 53:7",
    textKJV: "He was oppressed, and he was afflicted, yet he opened not his mouth: he is brought as a lamb to the slaughter, and as a sheep before her shearers is dumb, so he openeth not his mouth.",
    textESV: "He was oppressed, and he was afflicted, yet he opened not his mouth; like a lamb that is led to the slaughter, and like a sheep that before its shearers is silent, so he opened not his mouth.",
    textNKJV: "He was oppressed and He was afflicted, yet He opened not His mouth; He was led as a lamb to the slaughter, and as a sheep before its shearers is silent, so He opened not His mouth.",
    application: "Silence before accusers would have been incomprehensible to anyone with power to defend himself. Jesus said nothing — not because He had no answer, but because the trial was not the point. He was not defending Himself; He was fulfilling His mission.",
    strongsWords: [
      { word: "dumb", original: "אִלֵּם (illem)", strongs: "H483", language: "Hebrew", phonetic: "il-LEM", definition: "Mute, unable or unwilling to speak. The lamb does not understand what is happening at the shearing — Jesus understood exactly what was happening at His trial and chose silence anyway. His silence was not weakness; it was the most powerful statement possible.", occurrences: "6x in OT" }
    ],
    source: "TSK: cross-refs Matt 26:63, 1 Pet 2:23, Acts 8:32",
    connections: ["cross", "p_servant"],
    fulfilledBy: "f_silence",
    position: { x: 20, y: 68 },
  },
  {
    id: "f_silence", category: "fulfillment", redLetter: false,
    ref: "Matthew 27:12-14",
    textKJV: "And when he was accused of the chief priests and elders, he answered nothing. Then said Pilate unto him, Hearest thou not how many things they witness against thee? And he answered him to never a word; insomuch that the governor marvelled greatly.",
    textESV: "But when he was accused by the chief priests and elders, he gave no answer. Then Pilate said to him, 'Do you not hear how many things they testify against you?' But he gave him no answer, not even to a single charge, so that the governor was greatly amazed.",
    textNKJV: "And while He was being accused by the chief priests and elders, He answered nothing. Then Pilate said to Him, 'Do You not hear how many things they testify against You?' But He answered him not one word, so that the governor marveled greatly.",
    application: "Pilate marveled. A Roman governor had never seen a prisoner with that much self-possession. The silence was more powerful than any defense — it was the chosen posture of the one who had already decided what was more important than His own vindication.",
    strongsWords: [
      { word: "marvelled", original: "θαυμάζω (thaumazō)", strongs: "G2296", language: "Greek", phonetic: "thow-MAZ-o", definition: "To be astonished, to wonder, to marvel — a state of amazement at something outside normal expectation. Pilate had interrogated countless prisoners. He had never seen one like this. The silence was the most disruptive thing Jesus could have done.", occurrences: "43x in NT — often of the reaction to Jesus" }
    ],
    source: "TSK: cross-refs Isa 53:7, Mark 15:5, Luke 23:9",
    fulfillmentOf: "p_silence",
    connections: ["cross", "f_lots"],
    position: { x: 20, y: 78 },
  },

  // ── PAIR 6: Casting Lots for Garments ─────────────────────────────────────────
  {
    id: "p_lots", category: "prophecy", redLetter: false,
    ref: "Psalm 22:18",
    textKJV: "They part my garments among them, and cast lots upon my vesture.",
    textESV: "They divide my garments among them, and for my clothing they cast lots.",
    textNKJV: "They divide My garments among them, and for My clothing they cast lots.",
    application: "Psalm 22 was written by David ~1000 years before crucifixion existed as a form of execution. The details of verse 18 — dividing garments, casting lots — were written from inside a suffering David could only have received by revelation.",
    strongsWords: [
      { word: "lots", original: "גּוֹרָל (goral)", strongs: "H1486", language: "Hebrew", phonetic: "go-RAWL", definition: "A lot cast to determine God's will or to divide randomly — like dice or stones used to make decisions. At Calvary, Roman soldiers used this method to divide the spoils of an execution, unknowingly acting out a 1000-year-old script.", occurrences: "77x in OT" }
    ],
    source: "TSK: cross-refs Matt 27:35, John 19:24, Luke 23:34",
    connections: ["cross", "p_betrayal", "p_thirst"],
    fulfilledBy: "f_lots",
    position: { x: 36, y: 82 },
  },
  {
    id: "f_lots", category: "fulfillment", redLetter: false,
    ref: "John 19:23-24",
    textKJV: "Then the soldiers... took his garments, and made four parts... and also his coat: now the coat was without seam, woven from the top throughout. They said therefore among themselves, Let us not rend it, but cast lots for it, whose it shall be: that the scripture might be fulfilled.",
    textESV: "When the soldiers had crucified Jesus, they took his garments and divided them into four parts... But his tunic was seamless, woven in one piece from top to bottom, so they said to one another, 'Let us not tear it, but cast lots for it to see whose it shall be.' This was to fulfill the Scripture...",
    textNKJV: "Then the soldiers, when they had crucified Jesus, took His garments and made four parts... and also the tunic. Now the tunic was without seam, woven from the top in one piece. They therefore said among themselves, 'Let us not tear it, but cast lots for it, whose it shall be,' that the Scripture might be fulfilled.",
    application: "John is the only Gospel writer who was present at the Cross. He watched Roman soldiers unconsciously fulfill Psalm 22:18 in real time. He notes the fulfillment explicitly — the seamless robe preserved because they cast lots, not because anyone planned it.",
    strongsWords: [
      { word: "seamless", original: "ἄρραφος (arraphos)", strongs: "G729", language: "Greek", phonetic: "AR-ra-fos", definition: "Without seam — a single woven piece from top to bottom. This was the kind of garment worn by high priests (Josephus). John likely intends a priestly symbol: Jesus died as both sacrifice and priest, and His garment was preserved whole as the temple veil was about to be torn.", occurrences: "Only here in all Greek literature" }
    ],
    source: "TSK: cross-refs Ps 22:18, Matt 27:35, Luke 23:34",
    fulfillmentOf: "p_lots",
    connections: ["cross", "f_silence", "f_thirst"],
    position: { x: 36, y: 92 },
  },

  // ── PAIR 7: Offered Vinegar to Drink ─────────────────────────────────────────
  {
    id: "p_thirst", category: "prophecy", redLetter: false,
    ref: "Psalm 69:21",
    textKJV: "They gave me also gall for my meat; and in my thirst they gave me vinegar to drink.",
    textESV: "They gave me poison for food, and for my thirst they gave me sour wine to drink.",
    textNKJV: "They also gave me gall for my food, and for my thirst they gave me vinegar to drink.",
    application: "Psalm 69 is one of the most frequently cited psalms in the New Testament. David, under the Spirit, described not his own suffering but the suffering of the Coming One in specific physiological detail.",
    strongsWords: [
      { word: "gall", original: "רֹאשׁ (rosh)", strongs: "H7218", language: "Hebrew", phonetic: "ROSHE", definition: "A bitter, poisonous plant — sometimes translated 'hemlock' or 'gall.' In the crucifixion narrative it appears as a bitter substance mixed with wine, offered as a numbing agent. Jesus refused it — He chose to die fully conscious, fully present.", occurrences: "12x in OT, always in connection with bitterness and judgment" }
    ],
    source: "TSK: cross-refs Matt 27:34, Mark 15:23, John 19:29",
    connections: ["cross", "p_lots"],
    fulfilledBy: "f_thirst",
    position: { x: 62, y: 82 },
  },
  {
    id: "f_thirst", category: "fulfillment", redLetter: false,
    ref: "John 19:28-29",
    textKJV: "After this, Jesus knowing that all things were now accomplished, that the scripture might be fulfilled, saith, I thirst. Now there was set a vessel full of vinegar: and they filled a sponge with vinegar, and put it upon hyssop, and put it to his mouth.",
    textESV: "After this, Jesus, knowing that all was now finished, said (to fulfill the Scripture), 'I thirst.' A jar full of sour wine stood there, so they put a sponge full of the sour wine on a hyssop branch and held it to his mouth.",
    textNKJV: "After this, Jesus, knowing that all things were now accomplished, that the Scripture might be fulfilled, said, 'I thirst!' Now a vessel full of sour wine was sitting there; and they filled a sponge with sour wine, put it on hyssop, and put it to His mouth.",
    application: "John notes that Jesus said 'I thirst' specifically to fulfill the Scripture. This was a conscious, final act of fulfillment. At the moment of completion, He checked the list — and deliberately voiced what had been written a millennium before.",
    strongsWords: [
      { word: "hyssop", original: "ὕσσωπος (hyssōpos)", strongs: "G5301", language: "Greek", phonetic: "HUS-so-pos", definition: "A small aromatic plant used in Jewish purification rituals — notably in the Passover (Exod 12:22) to apply the blood of the lamb to the doorposts. Its appearance at the Cross is the Gospel writers' final Passover image: the blood of the true Lamb, applied by hyssop.", occurrences: "Used 3x in NT, always in sacrificial or purification contexts" }
    ],
    source: "TSK: cross-refs Ps 69:21, Exod 12:22, John 19:30",
    fulfillmentOf: "p_thirst",
    connections: ["cross", "f_lots"],
    position: { x: 62, y: 92 },
  },

  // ── PAIR 8: Not a Bone Broken ─────────────────────────────────────────────────
  {
    id: "p_bones", category: "prophecy", redLetter: false,
    ref: "Psalm 34:20",
    textKJV: "He keepeth all his bones: not one of them is broken.",
    textESV: "He keeps all his bones; not one of them is broken.",
    textNKJV: "He guards all his bones; not one of them is broken.",
    application: "A single verse hidden in a psalm of general deliverance. It becomes a prophetic guarantee preserved for a specific moment: when the soldiers came to break the legs of those crucified, and did not break His.",
    strongsWords: [
      { word: "keepeth", original: "שָׁמַר (shamar)", strongs: "H8104", language: "Hebrew", phonetic: "shaw-MAR", definition: "To keep, guard, preserve with vigilant care. The same word used of the cherubim guarding Eden (Gen 3:24) and of God keeping Israel (Ps 121:4). God stationed invisible guards over the specific detail of Christ's unbroken bones.", occurrences: "468x in OT" }
    ],
    source: "TSK: cross-refs John 19:36, Exod 12:46, Num 9:12",
    connections: ["cross"],
    fulfilledBy: "f_bones",
    position: { x: 78, y: 72 },
  },
  {
    id: "f_bones", category: "fulfillment", redLetter: false,
    ref: "John 19:33-36",
    textKJV: "But when they came to Jesus, and saw that he was dead already, they brake not his legs... For these things were done, that the scripture should be fulfilled, A bone of him shall not be broken.",
    textESV: "But when they came to Jesus and saw that he was already dead, they did not break his legs... For these things took place that the Scripture might be fulfilled: 'Not one of his bones will be broken.'",
    textNKJV: "But when they came to Jesus and saw that He was already dead, they did not break His legs... For these things were done that the Scripture should be fulfilled, 'Not one of His bones shall be broken.'",
    application: "The soldiers' decision not to break His legs was entirely pragmatic — they saw He was already dead. But John traces an unseen hand in that practical decision. The Passover lamb was not to have any bones broken (Exod 12:46). The true Lamb fulfilled the type exactly.",
    strongsWords: [
      { word: "already dead", original: "ἤδη τεθνηκότα (ēdē tethnēkota)", strongs: "G2348", language: "Greek", phonetic: "AY-day teth-nay-KO-ta", definition: "Already having died — the perfect tense indicates a completed action with permanent results. Death had already occurred and its results were standing. The soldiers' observation saved the fulfillment of a thousand-year-old verse about an unbroken bone.", occurrences: "Perfect participle — expressing completed, permanent death" }
    ],
    source: "TSK: cross-refs Ps 34:20, Exod 12:46, Num 9:12",
    fulfillmentOf: "p_bones",
    connections: ["cross", "f_thirst"],
    position: { x: 78, y: 82 },
  },

  // ── PAIR 9: Resurrection ──────────────────────────────────────────────────────
  {
    id: "p_resurrection", category: "prophecy", redLetter: false,
    ref: "Psalm 16:10",
    textKJV: "For thou wilt not leave my soul in hell; neither wilt thou suffer thine Holy One to see corruption.",
    textESV: "For you will not abandon my soul to Sheol, or let your holy one see corruption.",
    textNKJV: "For You will not leave my soul in Sheol, nor will You allow Your Holy One to see corruption.",
    application: "David wrote this. David died. David's body did decay. Peter used this verse in Acts 2:31 to prove that David was writing prophetically about someone else — the one whose body would not see decay: the Risen Christ.",
    strongsWords: [
      { word: "corruption", original: "שַׁחַת (shachath)", strongs: "H7845", language: "Hebrew", phonetic: "SHAH-khat", definition: "A pit, a ditch, corruption — the physical decay of a dead body. David's body did see this. Peter's argument in Acts 2 is decisive: David must have been writing about another whose body did not decompose, because he was a prophet who knew God had promised his descendant would be raised.", occurrences: "23x in OT" }
    ],
    source: "TSK: cross-refs Acts 2:27, Acts 13:35, Luke 24:6",
    connections: ["cross", "p_servant"],
    fulfilledBy: "f_resurrection",
    position: { x: 62, y: 16 },
  },
  {
    id: "f_resurrection", category: "fulfillment", redLetter: false,
    ref: "Acts 2:31-32",
    textKJV: "He seeing this before spake of the resurrection of Christ, that his soul was not left in hell, neither his flesh did see corruption. This Jesus hath God raised up, whereof we all are witnesses.",
    textESV: "He foresaw and spoke about the resurrection of the Christ, that he was not abandoned to Hades, nor did his flesh see corruption. This Jesus God raised up, and of that we all are witnesses.",
    textNKJV: "He, foreseeing this, spoke concerning the resurrection of the Christ, that His soul was not left in Hades, nor did His flesh see corruption. This Jesus God has raised up, of which we are all witnesses.",
    application: "Peter's entire Pentecost sermon is a prophetic argument: David wrote Psalm 16 about someone other than himself. That someone is Jesus. And fifty days after the crucifixion, Peter has 500+ living witnesses to the resurrection. The prophecy was not theoretical — it was a provable, witnessed event.",
    strongsWords: [
      { word: "witnesses", original: "μάρτυρες (martyres)", strongs: "G3144", language: "Greek", phonetic: "MAR-too-res", definition: "Witnesses — those who have seen firsthand and testify to what they saw. The root of our word 'martyr,' because many of these witnesses died rather than recant what they had seen. Their testimony was not mythological — it was forensic.", occurrences: "Used 35x in NT — the basis of the early church's proclamation" }
    ],
    source: "TSK: cross-refs Ps 16:10, Luke 24:46, 1 Cor 15:4",
    fulfillmentOf: "p_resurrection",
    connections: ["cross", "f_bethlehem", "f_virgin"],
    position: { x: 62, y: 26 },
  },

  // ── PAIR 10: Suffering Servant ────────────────────────────────────────────────
  {
    id: "p_servant", category: "prophecy", redLetter: false,
    ref: "Isaiah 52:14",
    textKJV: "As many were astonied at thee; his visage was so marred more than any man, and his form more than the sons of men.",
    textESV: "As many were astonished at you — his appearance was so marred, beyond human semblance, and his form beyond that of the children of mankind.",
    textNKJV: "Just as many were astonished at you, so His visage was marred more than any man, and His form more than the sons of men.",
    application: "Isaiah describes the physical disfigurement of the Suffering Servant — a level of violence that distorted the human form. This is the physical reality of the Cross: the Son of God submitted to this willingly so that the marring of humanity by sin could be reversed.",
    strongsWords: [
      { word: "marred", original: "מִשְׁחַת (mishchath)", strongs: "H4893", language: "Hebrew", phonetic: "meesh-KHAT", definition: "Disfigurement, corruption of appearance — from the same root as 'anoint' (mashach), creating a devastating irony: the Anointed One (Messiah) was so disfigured as to be unrecognizable. The one who came to anoint was himself beyond recognition.", occurrences: "2x in OT — both in this passage" }
    ],
    source: "TSK: cross-refs Isa 53:2-3, Mark 15:19, Luke 22:64",
    connections: ["cross", "p_silence", "p_resurrection"],
    fulfilledBy: "f_servant",
    position: { x: 38, y: 16 },
  },
  {
    id: "f_servant", category: "fulfillment", redLetter: false,
    ref: "Mark 15:16-20",
    textKJV: "And the soldiers led him away into the hall... And they clothed him with purple, and platted a crown of thorns, and put it about his head... And they smote him on the head with a reed, and did spit upon him.",
    textESV: "And the soldiers led him away inside the palace... And they clothed him in a purple cloak, and twisting together a crown of thorns, they put it on him... And they were striking his head with a reed and spitting on him.",
    textNKJV: "And the soldiers led Him away into the hall called Praetorium... And they clothed Him with purple; and they twisted a crown of thorns, put it on His head... and they struck Him on the head with a reed and spat on Him.",
    application: "The physical suffering of the Passion fulfills Isaiah 52:14 beat by beat. What the prophets received as vision, the soldiers inflicted in history. The cruelty was real. So is the redemption it purchased.",
    strongsWords: [
      { word: "spat upon", original: "ἐνέπτυσαν (eneptousan)", strongs: "G1716", language: "Greek", phonetic: "en-EP-too-san", definition: "To spit upon — an expression of supreme contempt in both Jewish (Num 12:14) and Roman cultures. The Creator of the universe received the rejection of the creature. He bore not only the physical violence but the social contempt — so that we would never have to bear condemnation before God.", occurrences: "3x in NT, all in the Passion narratives" }
    ],
    source: "TSK: cross-refs Isa 52:14, Isa 53:3, Luke 18:32",
    fulfillmentOf: "p_servant",
    connections: ["cross", "f_silence"],
    position: { x: 38, y: 26 },
  },
];

// ── BIRTH CLUSTER (secondary OT/NT pair) ──────────────────────────────────────
// These are simpler cross-refs referenced from the main pairs above
export const BIRTH_REFS = {
  p_birth: "Hosea 11:1",
  f_birth: "Matthew 2:15",
};
