export const STATES: Record<string, string[]> = {
  "Central Equatoria": ["Juba", "Kajo Keji", "Lainya", "Morobo", "Terekeka", "Yei"],
  "Eastern Equatoria": ["Torit", "Budi", "Ikotos", "Kapoeta East", "Kapoeta North", "Kapoeta South", "Lafon", "Magwi"],
  "Jonglei": ["Bor", "Akobo", "Ayod", "Duk", "Fangak", "Nyirol", "Pibor", "Pochalla", "Twic East", "Uror"],
  "Lakes": ["Rumbek Central", "Rumbek East", "Rumbek North", "Awerial", "Cueibet", "Wulu", "Yirol East", "Yirol West"],
  "Northern Bahr el Ghazal": ["Aweil Centre", "Aweil East", "Aweil North", "Aweil South", "Aweil West"],
  "Unity": ["Bentiu", "Guit", "Koch", "Leer", "Mayendit", "Mayom", "Panyijiar", "Rubkona"],
  "Upper Nile": ["Malakal", "Baliet", "Fashoda", "Longochuk", "Maiwut", "Maban", "Manyo", "Melut", "Nasir", "Panyikang", "Renk", "Ulang"],
  "Warrap": ["Kuajok", "Gogrial East", "Gogrial West", "Tonj East", "Tonj North", "Tonj South", "Twic"],
  "Western Bahr el Ghazal": ["Wau", "Jur River", "Raga"],
  "Western Equatoria": ["Yambio", "Ezo", "Ibba", "Maridi", "Mundri East", "Mundri West", "Mvolo", "Nzara", "Tambura"],
};

export const STATE_LIST = Object.keys(STATES);

export const ROLES = [
  { id: "SUPPORTER", label: "Supporter", desc: "Card-carrying movement member" },
  { id: "VOLUNTEER", label: "Volunteer", desc: "Active canvasser and rally marshal" },
  { id: "CAMPAIGN_AGENT", label: "Campaign Agent", desc: "Official precinct and county representative" },
  { id: "DONOR", label: "Donor", desc: "Financial contributor and sponsor" },
] as const;

export type Role = typeof ROLES[number]["id"];