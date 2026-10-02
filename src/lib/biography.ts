export interface QuickFact {
  icon: string;
  label: string;
  value: string;
}

export const QUICK_FACTS: QuickFact[] = [
  { icon: "", label: "Birthplace", value: "Payom, Kongor Area" },
  { icon: "", label: "Movement",   value: "R-SPLM/F Chairman" },
  { icon: "", label: "Faith Role",  value: "East Africa Religious Council" },
  { icon: "", label: "Award",      value: "Peace Award 2025" },
];

export const CREDENTIALS = [
  "Chairman, R-SPLM/F",
  "Chairman, East Africa Religious Council",
  "Ordained Anglican Priest",
  "International Peace Award Laureate 2025",
  "Presidential Candidate, 2026 South Sudan General Elections",
];

export const STORY_PARAGRAPHS = [
  "Nathaniel Garang Aduot was born in Payom, Kongor Area, into a South Sudan shaped by decades of conflict, displacement, and fragile governance. Growing up witnessing the impact of instability on families and communities, he developed an unshakeable conviction: the people of South Sudan deserve better.",
  "An ordained Anglican priest with a Master's in Divinity from Jerusalem International University (Zambia) and a Master's in Christian Leadership from Bible University (Germany & USA), Hon. Garang built a reputation that bridges religious authority with political reform. He served as Chairperson of a prominent Faith-Based Organization in South Sudan before rising to lead the East Africa Religious Council, working with faith leaders across eight countries to promote reconciliation and interfaith cooperation.",
  "His political journey crystallized with the founding of the Real Sudan People's Liberation Movement Forward (R-SPLM/F)  a reform-driven platform built on a simple but radical principle: leadership must be elected, not appointed. His 'People First' Agenda envisions a South Sudan where governance is driven by the direct will of the people, where refugees can return home through the 'Bring Our Citizens Back Home Initiative', and where economic transparency replaces personality-driven politics.",
  "In December 2025, Hon. Garang's leadership was internationally recognized when the International College of Peace Studies (ICOPS)  a partner of the UN-mandated University for Peace  conferred upon him the International Peace Award 2025 at a ceremony in Karen, Nairobi. The formal citation honored his outstanding efforts and unwavering commitment to improving lives through faith-based leadership and non-violent conflict resolution.",
  "That same month, following the brutal assassination of opposition MP Luka Mathen Toupiny Luk in Juba, Hon. Garang emerged as the most vocal voice demanding accountability, calling on IGAD, the African Union, and the United Nations to investigate what he termed the regime's autocratic actions designed to destabilize the electoral process. In February 2026, he endorsed the AU's firm C5 resolutions demanding ceasefire, release of political detainees, and no further election delays.",
  "In March 2026, as Chairman of R-SPLM/F, he formally condemned the killing of 21 unarmed civilians in Ayod County, Jonglei State  calling it a barbaric act  and petitioned UNMISS, the AU, and IGAD to launch an immediate investigation. He has consistently urged South Sudanese youth to exercise restraint while demanding justice through international channels.",
  "Today, as a declared presidential candidate for the December 2026 general elections, Nathaniel Garang Aduot carries the hopes of millions who believe that South Sudan's future belongs to its people  built on unity, driven by reform, and powered by a new generation ready to lead.",
];

export const AWARD = {
  title: "International Peace Award 2025",
  subtitle: "For Inter-Faith Leadership",
  conferredBy: "International College of Peace Studies (ICOPS)",
  affiliatedWith: "Partner of the UN-mandated University for Peace",
  date: "December 18, 2025",
  location: "Stedmak Garden, Karen, Nairobi",
  host: "His Eminence Dr. Kennedy Waningu, Provost of ICOPS",
  paragraphs: [
    "On December 18, 2025, Hon. Nathaniel Garang Aduot was formally conferred with the International Peace Award 2025 for Inter-Faith Leadership by the International College of Peace Studies (ICOPS), a global institution partnered with the UN-mandated University for Peace.",
    "The ceremony, held at the Stedmak Garden in Karen, Nairobi, was hosted by His Eminence Dr. Kennedy Waningu, Provost of ICOPS. The award recognized Hon. Garang's outstanding efforts and unwavering commitment to improving the lives of others through faith-based leadership and non-violent conflict resolution.",
    "ICOPS emphasized that recognizing such leaders is vital in a world facing record global crises. For South Sudan  the world's youngest country  this award serves as a testament to the international community's interest in leaders who prioritize harmony as the foundation for national development.",
  ],
  quote: "His ethical witness of faith and divine guidance has become increasingly vital to the cause of peace, freedom, and reconciliation.",
  quoteSource: "On the appointment of mediator Uhuru Kenyatta  February 2026",
};

export interface TimelineEvent {
  date: string;
  title: string;
  body: string;
  icon: string;
}

export const TIMELINE: TimelineEvent[] = [
  { date: "Early Life", title: "Born in Payom, Kongor Area", body: "Born and raised in Payom, Kongor Area, South Sudan, Nathaniel Garang Aduot's life was shaped by first-hand experience with conflict and the resilience of his community. These formative experiences drove him to transition into peace advocacy and governance reform.", icon: "Home" },
  { date: "Education", title: "Academic Excellence & Spiritual Service", body: "An ordained Anglican priest, Hon. Garang earned a Master's Degree in Divinity from Jerusalem International University in Zambia and a Master's Degree in Christian Leadership from Bible University (Germany & United States), building a deep foundation in both spiritual leadership and governance.", icon: "GraduationCap" },
  { date: "Faith Leadership", title: "Chairman, East Africa Religious Council", body: "Appointed Chairman of the East Africa Religious Council, working directly with faith leaders across eight countries to promote reconciliation, interfaith cooperation, and non-violent conflict resolution throughout the region.", icon: "Church" },
  { date: "Diaspora Engagement", title: "Building Global Networks", body: "Through active engagement with the South Sudanese diaspora, Nathaniel built bridges between communities abroad and those at home  championing the 'Bring Our Citizens Back Home Initiative' to create conditions for refugees to return to a peaceful homeland.", icon: "Globe" },
  { date: "R-SPLM/F", title: "Founding the Reform Movement", body: "Established and leads the Real Sudan People's Liberation Movement Forward (R-SPLM/F)  a reform-driven political platform built on democratic institutions, economic opportunity, anti-corruption, and the 'People First' Agenda where leadership must be elected, not appointed.", icon: "Flag" },
  { date: "Dec 2025", title: "Demands Justice for MP Mathen", body: "Following the assassination of opposition MP Luka Mathen Toupiny Luk in Juba, Hon. Garang condemned the act as brutal and inhuman, and called on IGAD, the African Union, and the UN to investigate what he termed the regime's autocratic actions threatening the 2026 elections.", icon: "Gavel" },
  { date: "Dec 2025", title: "International Peace Award 2025", body: "Conferred with the International Peace Award 2025 by the International College of Peace Studies (ICOPS)  a partner of the UN-mandated University for Peace  at a ceremony in Karen, Nairobi. The award recognized his outstanding efforts and unwavering commitment to interfaith leadership and peacebuilding.", icon: "Trophy" },
  { date: "Feb 2026", title: "Endorses AU Resolutions for South Sudan", body: "Endorsed the African Union's C5 Committee resolutions demanding immediate ceasefire, release of political detainees, and no further election delays. Welcomed the appointment of former Kenyan President Uhuru Kenyatta as mediator between government and opposition.", icon: "Landmark" },
  { date: "Mar 2026", title: "Condemns Ayod County Massacre", body: "As Chairman of R-SPLM/F, formally condemned the killing of 21 unarmed civilians (10 women, 6 children, 5 elderly men) in Pankhor village, Ayod County, calling it a barbaric act. Petitioned UNMISS, the AU, and IGAD to launch an immediate investigation.", icon: "ShieldAlert" },
  { date: "2026", title: "Presidential Candidacy", body: "Declared candidacy for the December 2026 South Sudanese general elections on a platform of electoral integrity, youth-centered development, economic transparency, peace and unity, and modern education reform integrating digital technology and AI.", icon: "Star" },
];

export interface PressArticle {
  source: string;
  date: string;
  title: string;
  url?: string;
}

export const PRESS: PressArticle[] = [
  {
    source: "EthioInsight",
    date: "December 20, 2025",
    title: "Presidential Candidate Hon. Nathaniel Garang Wins International Peace Award 2025",
    url: "https://ethioinsight.org/presidential-candidate-hon-nathaniel-garang-wins-international-peace-award-2025/",
  },
  {
    source: "EthioInsight",
    date: "December 14, 2025",
    title: "Presidential Candidate Nathaniel Garang Urges IGAD, AU, and UN to Address Autocratic Mathen Assassination",
    url: "https://ethioinsight.org/presidential-candidate-nathaniel-garang-urges-igad-au-and-un-to-address-autocratic-mathen-assassination-in-south-sudan/",
  },
  {
    source: "EthioInsight",
    date: "February 17, 2026",
    title: "AU Sets Firm Deadlines for South Sudan Transition; R-SPLM/F Candidate Nathaniel Garang Endorses Resolutions",
    url: "https://ethioinsight.org/au-sets-firm-deadlines-for-south-sudan-transition-r-splm-f-candidate-nathaniel-garang-Aduot-endorses-resolutions/",
  },
  {
    source: "EthioInsight",
    date: "March 21, 2026",
    title: "Opposition Leader Condemns Barbaric Killing of 21 Unarmed Civilians in Jonglei State",
    url: "https://ethioinsight.org/opposition-leader-condemns-barbaric-killing-of-21-unarmed-civilians-in-jonglei-state/",
  },
];