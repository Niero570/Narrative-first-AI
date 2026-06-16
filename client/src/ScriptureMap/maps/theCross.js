// ─── THE CROSS: CENTER OF ALL THINGS ─────────────────────────────────────────
// All cross-references vetted against Treasury of Scripture Knowledge (TSK)
// and Nave's Topical Bible. Categories: atonement | sacrifice | resurrection |
// justification | redemption. The Cross node is the absolute center.

export const MAP_META = {
  id: "theCross",
  title: "The Cross: Center of All Things",
  subtitle: "Atonement, Sacrifice & the Resurrection",
  anchor: "John 3:16",
  verseCount: 25,
  description:
    "The Cross is not one doctrine among many — it is the axis on which all of Scripture turns. Everything before it pointed to it. Everything after it flows from it. Here are the scriptures that define what happened at Calvary and why it changes everything.",
};

export const NODES = [
  // ── CROSS (CENTER) ────────────────────────────────────────────────────────────
  {
    id: "cross", category: "cross", redLetter: false, isCross: true,
    ref: "John 19:30",
    textKJV: "When Jesus therefore had received the vinegar, he said, It is finished: and he bowed his head, and gave up the ghost.",
    textESV: "When Jesus had received the sour wine, he said, 'It is finished,' and he bowed his head and gave up his spirit.",
    textNKJV: "So when Jesus had received the sour wine, He said, 'It is finished!' And bowing His head, He gave up His spirit.",
    application: "'It is finished' — tetelestai. The Greek word used to stamp a debt receipt: PAID IN FULL. Sin, the curse, the enemy's claim over your body and soul — all of it cancelled at this moment.",
    strongsWords: [
      { word: "finished", original: "τετέλεσται (tetelestai)", strongs: "G5055", language: "Greek", phonetic: "te-TEL-es-tie", definition: "To bring to completion, to pay in full. The word written on paid tax receipts in the ancient world. When Jesus said it, He was declaring every spiritual debt cancelled.", occurrences: "Used as a commercial receipt term in ancient papyri — a legal declaration of payment complete." }
    ],
    source: "TSK: cross-refs Isa 53:5, Heb 9:12, Col 2:14",
    connections: ["a1", "a2", "s1", "r1", "j_1", "red1", "cross2"],
    position: { x: 50, y: 50 },
  },

  // ── ATONEMENT ─────────────────────────────────────────────────────────────────
  {
    id: "a1", category: "atonement", redLetter: false,
    ref: "Romans 5:8",
    textKJV: "But God commendeth his love toward us, in that, while we were yet sinners, Christ died for us.",
    textESV: "But God shows his love for us in that while we were still sinners, Christ died for us.",
    textNKJV: "But God demonstrates His own love toward us, in that while we were still sinners, Christ died for us.",
    application: "The Cross was not God's reaction to our goodness — it was His initiative toward our failure. He didn't wait for us to deserve it. He came when we were at our worst.",
    strongsWords: [
      { word: "commendeth", original: "συνίστημι (sunistēmi)", strongs: "G4921", language: "Greek", phonetic: "soon-IS-tay-mee", definition: "To demonstrate, to prove, to establish beyond doubt. God didn't whisper His love — He proved it on the Cross in the most undeniable way possible.", occurrences: "Used 16x in NT, often for formal demonstration of evidence." }
    ],
    source: "TSK: cross-refs John 3:16, 1 John 4:9, Isa 53:5",
    connections: ["cross", "a2", "a3", "j_1"],
    position: { x: 30, y: 28 },
  },
  {
    id: "a2", category: "atonement", redLetter: false,
    ref: "Colossians 2:14",
    textKJV: "Blotting out the handwriting of ordinances that was against us, which was contrary to us, and took it out of the way, nailing it to his cross.",
    textESV: "By canceling the record of debt that stood against us with its legal demands. This he set aside, nailing it to the cross.",
    textNKJV: "Having wiped out the handwriting of requirements that was against us, which was contrary to us. And He has taken it out of the way, having nailed it to the cross.",
    application: "The 'handwriting against us' was the legal record of every law broken, every debt owed. Christ took the entire document and nailed it to the Cross — it is legally annulled. You owe nothing.",
    strongsWords: [
      { word: "blotting out", original: "ἐξαλείφω (exaleiphō)", strongs: "G1813", language: "Greek", phonetic: "ex-al-I-fo", definition: "To wipe out completely, to erase so that no trace remains. Used of erasing writing from a wax tablet. The record of your sin was not filed away — it was completely erased.", occurrences: "5x in NT — always in the sense of total obliteration" }
    ],
    source: "TSK: cross-refs Eph 2:15, Gal 3:13, Acts 3:19",
    connections: ["cross", "a1", "a3", "j_1", "red1"],
    position: { x: 22, y: 44 },
  },
  {
    id: "a3", category: "atonement", redLetter: false,
    ref: "2 Corinthians 5:21",
    textKJV: "For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him.",
    textESV: "For our sake he made him to be sin who knew no sin, so that in him we might become the righteousness of God.",
    textNKJV: "For He made Him who knew no sin to be sin for us, that we might become the righteousness of God in Him.",
    application: "The great exchange: Christ took our sin; we receive His righteousness. This is the core transaction of the Cross. You do not stand before God in your own record — you stand in His.",
    strongsWords: [
      { word: "righteousness", original: "δικαιοσύνη (dikaiosynē)", strongs: "G1343", language: "Greek", phonetic: "dee-kai-o-SOO-nay", definition: "The state of being right with God — not earned, but imputed. The same word used of Abraham in Gen 15:6. At the Cross, Christ's perfect record became the believer's legal standing before God.", occurrences: "92x in NT, the central term of Pauline theology" }
    ],
    source: "TSK: cross-refs Isa 53:6, Rom 8:3, Gal 3:13",
    connections: ["cross", "a1", "a2", "j_1", "j_2"],
    position: { x: 18, y: 62 },
  },
  {
    id: "a4", category: "atonement", redLetter: false,
    ref: "Hebrews 9:22",
    textKJV: "And almost all things are by the law purged with blood; and without shedding of blood is no remission.",
    textESV: "Indeed, under the law almost everything is purified with blood, and without the shedding of blood there is no forgiveness of sins.",
    textNKJV: "And according to the law almost all things are purified with blood, and without shedding of blood there is no remission.",
    application: "Blood sacrifice is not archaic ritual — it is the universe's rule for the forgiveness of sin. Christ's blood was not a last resort; it was the only solution that could actually satisfy the law.",
    strongsWords: [
      { word: "remission", original: "ἄφεσις (aphesis)", strongs: "G859", language: "Greek", phonetic: "AF-eh-sis", definition: "Release from bondage, complete dismissal of charges, cancellation of debt. The same word used by Jesus in Luke 4:18 for 'liberty to the captives.' Forgiveness is release — not probation.", occurrences: "17x in NT" }
    ],
    source: "TSK: cross-refs Lev 17:11, Exod 24:8, Heb 10:4",
    connections: ["a1", "s1", "s2", "cross"],
    position: { x: 30, y: 72 },
  },

  // ── SACRIFICE ─────────────────────────────────────────────────────────────────
  {
    id: "s1", category: "sacrifice", redLetter: false,
    ref: "Hebrews 10:10-12",
    textKJV: "By the which will we are sanctified through the offering of the body of Jesus Christ once for all. And every priest standeth daily ministering and offering oftentimes the same sacrifices, which can never take away sins: But this man, after he had offered one sacrifice for sins for ever, sat down on the right hand of God.",
    textESV: "And by that will we have been sanctified through the offering of the body of Jesus Christ once for all. And every priest stands daily at his service, offering repeatedly the same sacrifices, which can never take away sins. But when Christ had offered for all time a single sacrifice for sins, he sat down at the right hand of God.",
    textNKJV: "By that will we have been sanctified through the offering of the body of Jesus Christ once for all. And every priest stands ministering daily and offering repeatedly the same sacrifices, which can never take away sins. But this Man, after He had offered one sacrifice for sins forever, sat down at the right hand of God.",
    application: "The Old Testament priests never sat down — the work was never finished. Jesus sat down. The sacrifice was complete, final, sufficient, unrepeatable. It is finished and will never need to be done again.",
    strongsWords: [
      { word: "once for all", original: "ἐφάπαξ (ephapax)", strongs: "G2178", language: "Greek", phonetic: "ef-AP-ax", definition: "Once and for all time — a single, definitive act that permanently settles the matter. The emphasis is on finality. Not once per person, not once per generation — once, for all of them, forever.", occurrences: "5x in NT, always in the context of Christ's sacrifice" }
    ],
    source: "TSK: cross-refs Heb 7:27, Heb 9:26, John 19:30",
    connections: ["cross", "a4", "s2", "j_1"],
    position: { x: 50, y: 28 },
  },
  {
    id: "s2", category: "sacrifice", redLetter: false,
    ref: "Isaiah 53:4-6",
    textKJV: "Surely he hath borne our griefs, and carried our sorrows... he was wounded for our transgressions, he was bruised for our iniquities... and the LORD hath laid on him the iniquity of us all.",
    textESV: "Surely he has borne our griefs and carried our sorrows... he was pierced for our transgressions; he was crushed for our iniquities... and the LORD has laid on him the iniquity of us all.",
    textNKJV: "Surely He has borne our griefs and carried our sorrows... He was wounded for our transgressions, He was bruised for our iniquities... and the Lord has laid on Him the iniquity of us all.",
    application: "The scope of what Christ bore is total: griefs, sorrows, transgressions, iniquities — and ALL of ours, not some. The suffering of the Cross was not incidental — it was substitutionary. He took your place.",
    strongsWords: [
      { word: "borne", original: "נָשָׂא (nasa)", strongs: "H5375", language: "Hebrew", phonetic: "naw-SAH", definition: "To lift up, carry, take away. The same word used in Lev 16:22 for the scapegoat carrying Israel's sins into the wilderness. Christ is the final Scapegoat — our sin was placed on Him and carried away permanently.", occurrences: "654x in OT — one of the most common Hebrew verbs" }
    ],
    source: "TSK: cross-refs Matt 8:17, 1 Pet 2:24, Lev 16:21",
    connections: ["cross", "s1", "s3", "a3", "a4"],
    position: { x: 65, y: 28 },
  },
  {
    id: "s3", category: "sacrifice", redLetter: false,
    ref: "Leviticus 17:11",
    textKJV: "For the life of the flesh is in the blood: and I have given it to you upon the altar to make an atonement for your souls: for it is the blood that maketh an atonement for the soul.",
    textESV: "For the life of the flesh is in the blood, and I have given it for you on the altar to make atonement for your souls, for it is the blood that makes atonement by the life.",
    textNKJV: "For the life of the flesh is in the blood, and I have given it to you upon the altar to make atonement for your souls; for it is the blood that makes atonement for the soul.",
    application: "The principle that blood is required for atonement is not New Testament innovation — God established it in the Law. Every Old Testament sacrifice pointed forward to this truth: the blood of Christ.",
    strongsWords: [
      { word: "atonement", original: "כָּפַר (kaphar)", strongs: "H3722", language: "Hebrew", phonetic: "kaw-FAR", definition: "To cover, to make propitiation, to appease. The root of Yom Kippur (Day of Atonement). The OT sacrifices covered sin year by year — Christ's blood removed it permanently.", occurrences: "102x in OT" }
    ],
    source: "TSK: cross-refs Heb 9:22, Gen 4:4, Exod 30:10",
    connections: ["s2", "s1", "a4"],
    position: { x: 72, y: 38 },
  },
  {
    id: "s4", category: "sacrifice", redLetter: true,
    ref: "John 10:17-18",
    textKJV: "Therefore doth my Father love me, because I lay down my life, that I might take it again. No man taketh it from me, but I lay it down of myself.",
    textESV: "For this reason the Father loves me, because I lay down my life that I may take it up again. No one takes it from me, but I lay it down of my own accord.",
    textNKJV: "Therefore My Father loves Me, because I lay down My life that I may take it again. No one takes it from Me, but I lay it down of Myself.",
    application: "The Cross was not a tragedy that happened to Jesus — it was a decision He made. He chose to go. The sacrifice was entirely voluntary, which is why it is entirely sufficient. No coercion; pure love.",
    strongsWords: [
      { word: "lay down", original: "τίθημι (tithēmi)", strongs: "G5087", language: "Greek", phonetic: "TI-thay-mee", definition: "To place, to set down deliberately, to commit. The deliberate act of putting something in a specific place by choice. Jesus placed His life on the altar of the Cross by His own sovereign will.", occurrences: "100x in NT" }
    ],
    source: "TSK: cross-refs Isa 53:12, Luke 23:46, Heb 9:14",
    connections: ["cross", "s1", "s2", "a1"],
    position: { x: 78, y: 50 },
  },

  // ── RESURRECTION ──────────────────────────────────────────────────────────────
  {
    id: "r1", category: "resurrection", redLetter: false,
    ref: "1 Corinthians 15:20",
    textKJV: "But now is Christ risen from the dead, and become the firstfruits of them that slept.",
    textESV: "But in fact Christ has been raised from the dead, the firstfruits of those who have fallen asleep.",
    textNKJV: "But now Christ is risen from the dead, and has become the firstfruits of those who have fallen asleep.",
    application: "'Firstfruits' was the first portion of the harvest — the guarantee that the rest was coming. Christ's resurrection is not just His personal victory; it is the legal guarantee of yours.",
    strongsWords: [
      { word: "firstfruits", original: "ἀπαρχή (aparchē)", strongs: "G536", language: "Greek", phonetic: "ap-ar-KHAY", definition: "The first part offered to God as a pledge of the whole. In Jewish law, presenting the firstfruits guaranteed the entire harvest. Christ's resurrection is God's pledge to the believer: more is coming.", occurrences: "8x in NT — always connoting the first of a guaranteed whole" }
    ],
    source: "TSK: cross-refs Acts 26:23, Rom 8:23, 1 Thess 4:14",
    connections: ["cross", "r2", "r3", "j_2"],
    position: { x: 50, y: 72 },
  },
  {
    id: "r2", category: "resurrection", redLetter: false,
    ref: "Romans 6:4-5",
    textKJV: "Therefore we are buried with him by baptism into death: that like as Christ was raised up from the dead by the glory of the Father, even so we also should walk in newness of life. For if we have been planted together in the likeness of his death, we shall be also in the likeness of his resurrection.",
    textESV: "We were buried therefore with him by baptism into death, in order that, just as Christ was raised from the dead by the glory of the Father, we too might walk in newness of life. For if we have been united with him in a death like his, we shall certainly be united with him in a resurrection like his.",
    textNKJV: "Therefore we were buried with Him through baptism into death, that just as Christ was raised from the dead by the glory of the Father, even so we also should walk in newness of life. For if we have been united together in the likeness of His death, certainly we also shall be in the likeness of His resurrection.",
    application: "The believer is not merely an observer of the resurrection — you are united with it. The same resurrection power that raised Christ from the tomb lives in you and is available to you now.",
    strongsWords: [
      { word: "united", original: "σύμφυτος (symphytos)", strongs: "G4854", language: "Greek", phonetic: "SUM-few-tos", definition: "Grown together, organically joined — like two branches that have been grafted together so completely they share the same sap. Your life and Christ's resurrection life are organically one.", occurrences: "Only here in NT — a uniquely powerful botanical metaphor" }
    ],
    source: "TSK: cross-refs Col 2:12, Gal 2:20, Rom 8:11",
    connections: ["r1", "r3", "j_2", "cross"],
    position: { x: 35, y: 82 },
  },
  {
    id: "r3", category: "resurrection", redLetter: false,
    ref: "Romans 8:11",
    textKJV: "But if the Spirit of him that raised up Jesus from the dead dwell in you, he that raised up Christ from the dead shall also quicken your mortal bodies by his Spirit that dwelleth in you.",
    textESV: "If the Spirit of him who raised Jesus from the dead dwells in you, he who raised Christ Jesus from the dead will also give life to your mortal bodies through his Spirit who dwells in you.",
    textNKJV: "But if the Spirit of Him who raised Jesus from the dead dwells in you, He who raised Christ from the dead will also give life to your mortal bodies through His Spirit who dwells in you.",
    application: "The power that raised Jesus from physical death is inside you right now, if the Holy Spirit dwells in you. Paul says this Spirit gives life to your mortal body. Resurrection power touches physical reality.",
    strongsWords: [
      { word: "quicken", original: "ζῳοποιέω (zōopoieō)", strongs: "G2227", language: "Greek", phonetic: "zo-o-poi-EH-o", definition: "To make alive, to cause to live, to infuse with life. The same word used in John 5:21 of the Father giving life to the dead. This is active, present-tense divine life being administered to a physical body.", occurrences: "11x in NT — always of supernatural divine life being imparted" }
    ],
    source: "TSK: cross-refs Ezek 37:14, John 6:63, 1 Cor 15:45",
    connections: ["r1", "r2", "j_2", "cross"],
    position: { x: 65, y: 82 },
  },
  {
    id: "r4", category: "resurrection", redLetter: true,
    ref: "John 11:25-26",
    textKJV: "Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live: and whosoever liveth and believeth in me shall never die.",
    textESV: "Jesus said to her, 'I am the resurrection and the life. Whoever believes in me, though he die, yet shall he live, and everyone who lives and believes in me shall never die.'",
    textNKJV: "Jesus said to her, 'I am the resurrection and the life. He who believes in Me, though he may die, yet shall he live. And whoever lives and believes in Me shall never die.'",
    application: "Jesus does not merely bring resurrection — He IS resurrection. He is not administering a power external to Himself; He is the source. To be in Him is to have resurrection life as your permanent possession.",
    strongsWords: [
      { word: "resurrection", original: "ἀνάστασις (anastasis)", strongs: "G386", language: "Greek", phonetic: "an-AS-ta-sis", definition: "A standing up again, a rising. Composed of ana (again, up) and histēmi (to stand). Not resuscitation — a transformation into a permanent new state of life that cannot be ended by death.", occurrences: "42x in NT" }
    ],
    source: "TSK: cross-refs John 5:21, John 6:40, John 14:6",
    connections: ["r1", "r2", "j_2", "cross"],
    position: { x: 50, y: 85 },
  },

  // ── JUSTIFICATION ─────────────────────────────────────────────────────────────
  {
    id: "j_1", category: "justification", redLetter: false,
    ref: "Romans 5:1",
    textKJV: "Therefore being justified by faith, we have peace with God through our Lord Jesus Christ.",
    textESV: "Therefore, since we have been justified by faith, we have peace with God through our Lord Jesus Christ.",
    textNKJV: "Therefore, having been justified by faith, we have peace with God through our Lord Jesus Christ.",
    application: "Justification means God has declared you righteous — not just forgiven, but legally right before Him. The peace that follows is not emotional peace first; it is a legal reality: the war between you and God is over.",
    strongsWords: [
      { word: "justified", original: "δικαιόω (dikaioō)", strongs: "G1344", language: "Greek", phonetic: "dee-kai-O-o", definition: "To declare righteous, to acquit, to pronounce just in a legal sense. It is a forensic (courtroom) term. God is not overlooking your guilt — He is declaring your case legally settled by the blood of Christ.", occurrences: "39x in NT, especially in Romans and Galatians" }
    ],
    source: "TSK: cross-refs Acts 13:39, Gal 2:16, Titus 3:7",
    connections: ["cross", "a3", "j_2", "j_3", "red1"],
    position: { x: 22, y: 62 },
  },
  {
    id: "j_2", category: "justification", redLetter: false,
    ref: "Romans 8:1",
    textKJV: "There is therefore now no condemnation to them which are in Christ Jesus.",
    textESV: "There is therefore now no condemnation for those who are in Christ Jesus.",
    textNKJV: "There is therefore now no condemnation to those who are in Christ Jesus.",
    application: "'No condemnation' is not a goal to reach — it is a present-tense legal reality for those in Christ. This is not comfort language; this is a verdict delivered by the highest court.",
    strongsWords: [
      { word: "condemnation", original: "κατάκριμα (katakrima)", strongs: "G2631", language: "Greek", phonetic: "ka-TA-kree-ma", definition: "The punishment following a guilty verdict — the sentence, not merely the verdict. Paul says there is no punishment, no sentence, no penalty outstanding against those in Christ. It was all absorbed at the Cross.", occurrences: "3x in NT, all in Romans 5-8 — Paul's great legal argument" }
    ],
    source: "TSK: cross-refs John 3:18, Rom 5:16, Gal 3:13",
    connections: ["j_1", "j_3", "a3", "r2", "cross"],
    position: { x: 28, y: 50 },
  },
  {
    id: "j_3", category: "justification", redLetter: false,
    ref: "Romans 3:24",
    textKJV: "Being justified freely by his grace through the redemption that is in Christ Jesus.",
    textESV: "And are justified by his grace as a gift, through the redemption that is in Christ Jesus.",
    textNKJV: "Being justified freely by His grace through the redemption that is in Christ Jesus.",
    application: "'Freely' — without cost to us, because the full cost was paid by Christ. Grace is not permission to be somewhat less bad; it is the total cancellation of the debt we could never pay.",
    strongsWords: [
      { word: "freely", original: "δωρεάν (dōrean)", strongs: "G1432", language: "Greek", phonetic: "do-reh-AN", definition: "As a gift, gratis, without cause, without payment. Used in John 15:25 of 'hating without reason.' Our justification is just as 'without reason' on our side — we provided no merit. It is pure gift.", occurrences: "9x in NT" }
    ],
    source: "TSK: cross-refs Isa 55:1, Eph 2:8, Titus 3:7",
    connections: ["j_1", "j_2", "red1", "cross"],
    position: { x: 35, y: 40 },
  },

  // ── REDEMPTION ────────────────────────────────────────────────────────────────
  {
    id: "red1", category: "redemption", redLetter: false,
    ref: "Ephesians 1:7",
    textKJV: "In whom we have redemption through his blood, the forgiveness of sins, according to the riches of his grace.",
    textESV: "In him we have redemption through his blood, the forgiveness of our trespasses, according to the riches of his grace.",
    textNKJV: "In Him we have redemption through His blood, the forgiveness of sins, according to the riches of His grace.",
    application: "Redemption is not just release from sin — it is a purchase. You were bought. You now belong to Christ not by obligation but by purchase price. His blood is what He paid. That is the measure of your worth to Him.",
    strongsWords: [
      { word: "redemption", original: "ἀπολύτρωσις (apolytrōsis)", strongs: "G629", language: "Greek", phonetic: "a-po-LOO-tro-sis", definition: "Release procured by the payment of a ransom. Used in the Greek world for the purchase of a slave's freedom. The redeemed person was not merely freed — they were bought to belong to a new owner. Christ bought you.", occurrences: "10x in NT — always connected to Christ's blood" }
    ],
    source: "TSK: cross-refs Col 1:14, Heb 9:15, Titus 2:14",
    connections: ["cross", "a3", "j_1", "j_3", "red2", "red3"],
    position: { x: 72, y: 62 },
  },
  {
    id: "red2", category: "redemption", redLetter: false,
    ref: "1 Corinthians 6:20",
    textKJV: "For ye are bought with a price: therefore glorify God in your body, and in your spirit, which are God's.",
    textESV: "For you were bought with a price. So glorify God in your body.",
    textNKJV: "For you were bought at a price; therefore glorify God in your body and in your spirit, which are God's.",
    application: "Your body is included in the purchase. Paul uses this to say your body belongs to God and should honor Him. It is also the ground for expecting God to care for the body He owns — it is His property, and He maintains what He owns.",
    strongsWords: [
      { word: "bought", original: "ἀγοράζω (agorazō)", strongs: "G59", language: "Greek", phonetic: "a-gor-AZ-o", definition: "To purchase in the marketplace (agora). A commercial transaction is complete — payment given, ownership transferred. Your body is not leased by God; it was purchased outright by the blood of Christ.", occurrences: "31x in NT" }
    ],
    source: "TSK: cross-refs 1 Cor 7:23, Acts 20:28, Rev 5:9",
    connections: ["red1", "red3", "a4", "cross"],
    position: { x: 78, y: 70 },
  },
  {
    id: "red3", category: "redemption", redLetter: false,
    ref: "Galatians 3:13",
    textKJV: "Christ hath redeemed us from the curse of the law, being made a curse for us: for it is written, Cursed is every one that hangeth on a tree.",
    textESV: "Christ redeemed us from the curse of the law by becoming a curse for us — for it is written, 'Cursed is everyone who is hanged on a tree.'",
    textNKJV: "Christ has redeemed us from the curse of the law, having become a curse for us (for it is written, 'Cursed is everyone who hangs on a tree').",
    application: "Every curse itemized in Deuteronomy 28 — sickness, poverty, defeat, fear — Christ became all of it so you don't have to live under any of it. The Cross was the legal transfer of every curse from you to Him.",
    strongsWords: [
      { word: "redeemed", original: "ἐξαγοράζω (exagorazō)", strongs: "G1805", language: "Greek", phonetic: "ex-a-gor-AZ-o", definition: "To buy out of — the ex prefix intensifies it. Not merely purchased but bought out of bondage entirely, removed from the marketplace and placed beyond reach of re-enslavement. The curse cannot reclaim what Christ bought out of it.", occurrences: "4x in NT — twice in Galatians, always regarding freedom from law's curse" }
    ],
    source: "TSK: cross-refs Deut 21:23, Deut 28:15, Gal 4:5",
    connections: ["red1", "red2", "a3", "s2", "cross"],
    position: { x: 72, y: 74 },
  },
  {
    id: "cross2", category: "atonement", redLetter: false,
    ref: "John 3:16",
    textKJV: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    textESV: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
    textNKJV: "For God so loved the world that He gave His only begotten Son, that whoever believes in Him should not perish but have everlasting life.",
    application: "The most well-known verse in Scripture — and the simplest statement of the Cross. God gave. We receive. The Cross begins and ends in love. Nothing we did earned it; nothing we do can cancel it.",
    strongsWords: [
      { word: "so loved", original: "οὕτως ἠγάπησεν (houtōs ēgapēsen)", strongs: "G3779/G25", language: "Greek", phonetic: "HOO-tos ay-GA-pay-sen", definition: "Houtōs means 'in this way, to this degree' — not merely 'so much' but 'in such a manner.' The Cross is how the love was demonstrated. Agapēsen (aorist of agapaō) — a deliberate, self-giving love, not emotion but action.", occurrences: "Agapaō used 143x in NT — the defining word for divine love" }
    ],
    source: "TSK: cross-refs 1 John 4:9, Rom 5:8, Isa 53:10",
    connections: ["cross", "a1", "j_1", "red1"],
    position: { x: 50, y: 16 },
  },
];
