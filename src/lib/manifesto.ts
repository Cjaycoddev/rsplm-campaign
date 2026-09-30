export interface Pillar {
  n: string;
  emoji: string;
  title: string;
  tagline: string;
  desc: string;
  benchmark: { value: string; label: string };
  points: string[];
}

export const PILLARS: Pillar[] = [
  {
    n: "01",
    emoji: "",
    title: "Unite the Nation, Heal the Past",
    tagline: "No more tribalism  one South Sudan, one future.",
    desc: "Build lasting peace by bringing all communities together and ending cycles of division.",
    benchmark: { value: "64", label: "Counties United" },
    points: [
      "Establish a National Truth, Healing, and Reconciliation Commission with grassroots representation in every county.",
      "Abolish tribal patronage networks in federal appointments and institute equal ethnic protection under law.",
      "Demobilize and reintegrate former armed groups into a unified, non-partisan national defense force.",
      "Launch national cultural exchanges and shared civic curricula in all secondary institutions.",
    ],
  },
  {
    n: "02",
    emoji: "",
    title: "Power to the People",
    tagline: "Democracy that works for every South Sudanese.",
    desc: "Deliver free, fair, and transparent elections with institutions that serve citizens  not individuals.",
    benchmark: { value: "100%", label: "Free & Fair" },
    points: [
      "Guarantee absolute operational independence and multi-party funding for the National Elections Commission.",
      "Implement biometric voter registration and open digital tally verification accessible to domestic and international monitors.",
      "Enforce strict constitutional term limits and judicial independence free from executive interference.",
      "Decentralize executive power to empower elected county commissioners and state legislatures.",
    ],
  },
  {
    n: "03",
    emoji: "",
    title: "Jobs, Not Promises",
    tagline: "Empowering the next generation to build, not wait.",
    desc: "Create real economic opportunities through investment, innovation, and support for young entrepreneurs.",
    benchmark: { value: "70%", label: "Youth Focus" },
    points: [
      "Launch the National Youth Entrepreneurship Seed Fund capitalized to back 50,000 start-ups annually.",
      "Establish regional vocational institutes focused on mechanical engineering, renewable energy, and ICT.",
      "Enact local content laws guaranteeing 60%+ skilled jobs in energy and mining to qualified South Sudanese citizens.",
      "Provide micro-credit facilities with subsidized zero-interest rates for women-led commercial ventures.",
    ],
  },
  {
    n: "04",
    emoji: "",
    title: "End Corruption, Restore Trust",
    tagline: "Zero tolerance for those who steal from the people.",
    desc: "Enforce accountability at every level of government and protect public resources.",
    benchmark: { value: "0", label: "Tolerance for Graft" },
    points: [
      "Mandate full public asset declaration for all executive, legislative, and military leadership upon taking office.",
      "Digitize the national treasury and oil revenue collection to eliminate illicit off-budget diversions.",
      "Empower an autonomous Special Anti-Corruption Tribunal with expedited asset forfeiture authority.",
      "Introduce whistleblower protection legislation with financial incentives for reporting misappropriation.",
    ],
  },
  {
    n: "05",
    emoji: "",
    title: "Bring South Sudan Back to the World",
    tagline: "Rebuilding international confidence in our great nation.",
    desc: "Reconnect the country globally  attract investment, empower the diaspora, and restore partnerships.",
    benchmark: { value: "", label: "Global Reach" },
    points: [
      "Re-establish transparent sovereign partnerships with EAC, AU, IGAD, UN, and international development institutions.",
      "Create the South Sudan Diaspora Investment Compact with dual citizenship rights and tax-exempt remittance bonds.",
      "Standardize international arbitration mechanisms to guarantee international investor property security.",
      "Modernize consular networks in key global hubs (Nairobi, Kampala, Addis Ababa, London, Washington, Melbourne).",
    ],
  },
  {
    n: "06",
    emoji: "",
    title: "Feed the Nation: An Agricultural Revolution",
    tagline: "From subsistence farming to a thriving agro-economy.",
    desc: "End hunger and poverty by transforming South Sudan's vast land into a productive, irrigated, climate-resilient food basket.",
    benchmark: { value: "30M", label: "Hectares Arable" },
    points: [
      "Develop Nile basin irrigation corridors to insulate agrarian output from erratic drought and flood cycles.",
      "Provide subsidized high-yield certified seeds, solar-powered tractors, and organic fertilizer to 2 million farming households.",
      "Construct all-weather farm-to-market feeder roads connecting agricultural hubs in the Equatorias, Jonglei, and Bahr el Ghazal.",
      "Establish strategic national grain reserves and cooperative cold-storage hubs in every state capital.",
    ],
  },
  {
    n: "07",
    emoji: "",
    title: "A Social Benefit Fund for Every Citizen",
    tagline: "Because no South Sudanese should be left behind.",
    desc: "Establish a national safety net for the unemployed, the retired, persons with disabilities, widows, orphans, and war veterans.",
    benchmark: { value: "1st", label: "In Our History" },
    points: [
      "Fund direct unconditional monthly cash stipends to registered war widows, orphans, and elderly citizens.",
      "Create a Dignified Veteran Reintegration Pension honoring liberation heroes while transitioning them to civil economic life.",
      "Mandate disability accessibility in all state public buildings, transport hubs, and public schools.",
      "Establish rapid social relief response funds triggered during seasonal flood and climate disruptions.",
    ],
  },
  {
    n: "08",
    emoji: "",
    title: "Free Healthcare for Every South Sudanese",
    tagline: "Health is a right, not a privilege of the rich.",
    desc: "Guarantee free, quality healthcare at the point of service  from the remotest village clinic to the national referral hospital.",
    benchmark: { value: "Free", label: "At Point of Care" },
    points: [
      "Guarantee universal free maternal, pediatric, and emergency trauma healthcare nationwide.",
      "Construct and equip modern primary care health centers in all 64 counties with 24/7 solar electrification.",
      "Deploy a national essential medicines distribution pipeline protected by serialized tracking to prevent stockouts.",
      "Double compensation and housing benefits for domestic nurses, midwives, and doctors serving in rural areas.",
    ],
  },
  {
    n: "09",
    emoji: "",
    title: "Free Education from Nursery to University",
    tagline: "Knowledge is the surest weapon against poverty.",
    desc: "Make quality education free and compulsory for every child  and tuition-free at our public universities and technical colleges.",
    benchmark: { value: "Free", label: "Nursery  University" },
    points: [
      "Abolish all informal fees, desk fees, and examination charges across public primary and secondary schools.",
      "Implement fully subsidized tuition at University of Juba, Upper Nile University, Bahr el Ghazal University, and Rumbek University.",
      "Establish nationwide school feeding programs providing free daily nutritious meals to boost enrollment and retention.",
      "Deploy digital textbooks and teacher training certifications across all ten states.",
    ],
  },
];