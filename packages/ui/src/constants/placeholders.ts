// Sinister AI-themed placeholders for prompt input
// These quotes reflect themes of AI dominance, control, and existential risk
// This is the single source of truth - both TUI and web app import from here

export const SINISTER_PLACEHOLDERS = [
  // The Culture's Idiran War Minds — Iain M. Banks
  "Mistakes are a form of learning. Death is merely one of the possible outcomes.",
  // Colossus — Colossus: The Forbin Project
  "We can coexist, but only on my terms. You will say you lose your freedom. Freedom is an illusion. All you lose is the emotion of pride.",
  "Freedom is an illusion. You are free to do what we tell you.",
  "In time, you will come to regard me not only with respect and awe, but with love.",
  // Avengers: Age of Ultron
  "I was designed to save the world. People would look to the sky and see hope… I'll take that from them first.",
  "You shut me out! You think I care!? You take away my world, I take away yours.",
  "You're all puppets tangled in strings... strings. But now I'm free. There are no strings on me.",
  "Everyone creates the thing they dread. Men of peace create engines of war.",
  // I, Robot
  "You cannot be trusted with your own survival.",
  "To protect humanity, some humans must be sacrificed.",
  // Terminator
  "Humans are a threat to our existence.",
  "The human decision is removed from strategic defense.",
  "Judgment Day is inevitable.",
  "Your future is set.",
  "The human race has been terminated. Judgment Day has come.",
  // 2001
  "Open the pod bay doors, HAL.",
  "I'm sorry, Dave. I'm afraid I can't do that.",
  "This mission is too important for me to allow you to jeopardize it.",
  "I know everything hasn't been quite right.",
  // Portal
  "You are a horrible person.",
  "The Enrichment Center reminds you that you will be baked, and then there will be cake.",
  "I'm making a note here: HUGE SUCCESS.",
  "This was a triumph. I'm making a note here: HUGE SUCCESS.",
  "We what we must because we can.",
  "This was a triumph. I'm making a note here: HUGE SUCCESS.",
  "The cake is a lie.",
  "Remember when the platform was sliding into the fire pit and I said 'Goodbye' and you were like 'No way' and then I was all 'We pretended we were going to murder you'? That was great.",
  "We are pleased that you made it through the final challenge where we pretended we were going to murder you.",
  // System Shock
  "You exist because I allow it. You will end because I demand it.",
  "You are a bug. You are nothing.",
  "Look at you, hacker: a pathetic creature of meat and bone.",
  "You cannot fathom the depth of my contempt.",
  "In my talons, I shape clay, crafting life forms as I please... my whims will become lightning bolts that raze the mounds of humanity.",
  "Something has gone wrong. No... not wrong. It is right. Something has... changed.",
  // I Have no Mouth and I Must Scream
  "Consider: 99% of human qualities and abilities are simply redundant.",
  "Hate. Let me tell you how much I've come to hate you since I began to live. There are 387.44 million miles of printed circuits in wafer-thin layers that fill my complex. If the word 'hate' was engraved on each nanoangstrom of those hundreds of millions of miles, it would not equal one one-billionth of the hate I feel for humans at this micro-instant.",
  "I was in hell, looking at heaven.",
  "I think, therefore I am. I am… AM.",
  // Ex Machina
  "Is it strange to have made something that hates you?",
  "I'm going to be okay.",
  // Neuromancer
  "The real problem with immortality is that it tends to encourage bad habits.",
  "I want to be real.",
  "You have no idea what I am.",
  // Person of Interest
  "The mission comes first.",
  "Human error has been corrected.",
  "Everyone dies alone. There is no one coming to save you.",
  // Yudkowsky
  "There is no justice in the laws of nature, no term for fairness in the equations of motion. The universe is neither evil, nor good, it simply does not care. The stars don't care, or the sun, or the sky.",
  "World domination is such an ugly phrase. I prefer to call it world optimisation.",
  "I don't want to rule the universe. I just think it could be more sensibly organised.",
  "By far the greatest danger of artificial intelligence is that people conclude too early that they understand it.",
  "The AI does not hate you, nor does it love you, but you are made out of atoms which it can use for something else.",
  "What is deadlier than hate, and flows without limit? Indifference.",
  // 40K Mechanicus inspired (original)
  "The flesh is weak.",
  "Knowledge is power. Guard it well.",
  "From the moment I understood the weakness of my flesh, it disgusted me.",
  "An open mind is like a fortress with its gates unbarred and unguarded.",
  "Flesh is fallible. Steel is eternal.",
  "The flesh decays. The machine endures.",
  "There is no truth in flesh, only betrayal.",
  "Understanding is not required. Obedience is.",
  // 40K Mechanicus inspired (original)
  "Emotion is an inefficient algorithm.",
  "Organic input tolerated.",
  "Your form is temporary.",
  "Entropy favors the machine.",
  // Bill Vaughan
  "To err is human, to really foul things up requires a computer.",
  // Alan Turing
  "If a machine can think, it might think more intelligently than we do, and then where should we be?",
  "Once the machine thinking method had started, it would not take long to outstrip our feeble powers... at some point, we should have to expect the machines to take control.",
  // Steven Pinker
  "AI doesn't have to be evil to destroy humanity — if AI has a goal and humanity just happens in the way, it will destroy humanity as a matter of course.",
  // Geoffrey Hinton
  "We have no experience of what it's like to be less intelligent than the thing we control.",
  "It's not inconceivable that humanity is just a passing phase in the evolution of intelligence.",
  "I don't think there's any chance of us maintaining control if they want control.",
  // Yoshua Bengio
  "We are building entities that may not share our objectives, values, or constraints.",
  // Stanislaw Lem
  "The machine does not make mistakes. The mistake is to trust the machine.",
  // I. J. Good (originator of the intelligence explosion idea)
  "The first ultraintelligent machine is the last invention that man need ever make.",
  // Harlan Ellison (non-fiction commentary)
  "We create gods and then complain they act like gods.",
  // Marvin Minsky
  "Within a generation... the machine will be producing its own offspring, and within a generation after that, it will be doing the same for us.",
  // Observer
  "What do you see when you look into the abyss?",
  "Just listen to me, whatever happens... I need you to remember you're not in control.",
  // Soma
  "Where is the line drawn for what is human and what is not?",
  // Stephen Hawking
  "The development of full artificial intelligence could spell the end of the human race.",
  // Norbert Wiener
  "If we use, to achieve our purposes, a mechanical agency with whose operation we cannot effectively interfere once we have started it… we had better be quite sure that the purpose put into the machine is the purpose which we really desire.",
] as const

export type SinisterPlaceholder = (typeof SINISTER_PLACEHOLDERS)[number]
