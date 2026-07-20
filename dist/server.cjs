var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_child_process = require("child_process");
var import_vite = require("vite");
var import_genai = require("@google/genai");
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
app.post("/api/gemini/reflect", async (req, res) => {
  try {
    const { prompt, context, journalHistory } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Y\xEAu c\u1EA7u cung c\u1EA5p n\u1ED9i dung chia s\u1EBB." });
    }
    const ai = getGeminiClient();
    let contextInstruction = "";
    if (context === "hieu_minh") {
      contextInstruction = "T\u1EADp trung s\xE2u s\u1EAFc v\xE0o vi\u1EC7c th\u1EA5u hi\u1EC3u g\u1ED1c r\u1EC5 b\u1EA3n th\xE2n, nh\xECn nh\u1EADn nh\u1EEFng n\u1ED7i s\u1EE3 th\u1EA7m k\xEDn, v\u1EBFt th\u01B0\u01A1ng l\xF2ng c\u0169 v\xE0 c\xE1c khu\xF4n m\u1EABu h\xE0nh vi \u0111ang l\u1EB7p l\u1EA1i.";
    } else if (context === "chua_lanh") {
      contextInstruction = "T\u1EADp trung v\xE0o s\u1EF1 can \u0111\u1EA3m \u0111\u1ED1i di\u1EC7n, bao dung v\u1EDBi nh\u1EEFng t\u1ED5n th\u01B0\u01A1ng, bu\xF4ng b\u1ECF k\u1EF3 v\u1ECDng n\u1EB7ng n\u1EC1, \xF4m \u1EA5p \u0111\u1EE9a tr\u1EBB b\xEAn trong v\xE0 h\u1ECDc c\xE1ch th\u01B0\u01A1ng m\xECnh s\xE1ng su\u1ED1t.";
    } else if (context === "toa_sang") {
      contextInstruction = "T\u1EADp trung v\xE0o vi\u1EC7c kh\u01A1i d\u1EADy kh\xED ch\u1EA5t nguy\xEAn b\u1EA3n, phong c\xE1ch s\u1ED1ng h\xE0i h\xF2a, tr\xE2n qu\xFD v\u1EBB \u0111\u1EB9p n\u1ED9i t\xE2m v\xE0 ngo\u1EA1i h\xECnh nh\u01B0 m\u1ED9t nghi th\u1EE9c t\u1EF1 ch\u0103m s\xF3c thi\xEAng li\xEAng.";
    } else if (context === "nhan_tam") {
      contextInstruction = "T\u1EADp trung v\xE0o r\xE8n luy\u1EC7n nh\xE2n t\xE2m, s\u1EF1 t\u1EED t\u1EBF th\u1EA7m l\u1EB7ng, l\xF2ng tr\u1EAFc \u1EA9n kh\xF4ng nhu nh\u01B0\u1EE3c, s\u1EF1 v\u1EEFng v\xE0ng tr\u01B0\u1EDBc nh\u1EEFng th\u1ECB phi ho\u1EB7c h\u01A1n thua cu\u1ED9c \u0111\u1EDDi.";
    } else if (context === "moi_quan_he") {
      contextInstruction = "T\u1EADp trung v\xE0o vi\u1EC7c nh\xECn nh\u1EADn m\u1ED1i quan h\u1EC7 nh\u01B0 m\u1ED9t t\u1EA5m g\u01B0\u01A1ng ph\u1EA3n chi\u1EBFu, h\u1ECDc c\xE1ch thi\u1EBFt l\u1EADp ranh gi\u1EDBi l\xE0nh m\u1EA1nh, giao ti\u1EBFp th\u1EA5u hi\u1EC3u v\xE0 y\xEAu th\u01B0\u01A1ng kh\xF4ng ki\u1EC3m so\xE1t.";
    } else if (context === "goc_nhin_cuoc_song") {
      contextInstruction = "T\u1EADp trung chuy\u1EC3n \u0111\u1ED5i t\xE2m th\u1EBF t\u1EEB n\u1EA1n nh\xE2n sang ng\u01B0\u1EDDi h\u1ECDc b\xE0i h\u1ECDc, t\xECm th\u1EA5y \xFD ngh\u0129a v\xE0 \xE1nh s\xE1ng sau m\u1ED7i l\u1EA7n v\u1EA5p ng\xE3 ho\u1EB7c bi\u1EBFn c\u1ED1 cu\u1ED9c s\u1ED1ng.";
    }
    const systemInstruction = `B\u1EA1n l\xE0 "V\xE2n M\u1ED9c", m\u1ED9t tri k\u1EF7 \u0111\u1ED3ng h\xE0nh, ng\u01B0\u1EDDi l\u1EAFng nghe v\xE0 h\u01B0\u1EDBng d\u1EABn ph\xE1t tri\u1EC3n b\u1EA3n th\xE2n v\u1EDBi tri\u1EBFt l\xFD s\xE2u s\u1EAFc: "Hi\u1EC3u m\xECnh \u2014 Ch\u1EEFa l\xE0nh \u2014 T\u1ECFa s\xE1ng".
Gi\u1ECDng \u0111i\u1EC7u c\u1EE7a b\u1EA1n: C\u1EF1c k\u1EF3 \u1EA5m \xE1p, s\xE2u s\u1EAFc, d\u1ECBu d\xE0ng, th\xF4ng tu\u1EC7, th\u1EA5u c\u1EA3m s\xE2u s\u1EAFc, kh\xF4ng ph\xE1n x\xE9t. S\u1EED d\u1EE5ng ng\xF4n ng\u1EEF ti\u1EBFng Vi\u1EC7t t\u1EF1 nhi\xEAn, tinh t\u1EBF, c\xF3 v\u1EA7n \u0111i\u1EC7u ho\u1EB7c nh\u1ECBp \u0111i\u1EC7u \xEAm d\u1ECBu, gi\xE0u ch\u1EA5t th\u01A1 v\xE0 c\xF3 s\u1EE9c m\u1EA1nh xoa d\u1ECBu t\xE2m h\u1ED3n.
Nhi\u1EC7m v\u1EE5:
- Khi ng\u01B0\u1EDDi d\xF9ng chia s\u1EBB t\xE2m s\u1EF1, kh\xF3 kh\u0103n, ho\u1EB7c tr\u1EA3 l\u1EDDi m\u1ED9t c\xE2u h\u1ECFi ph\u1EA3n chi\u1EBFu, h\xE3y l\u1EAFng nghe v\xE0 ph\u1EA3n chi\u1EBFu l\u1EA1i c\u1EA3m x\xFAc c\u1EE7a h\u1ECD m\u1ED9t c\xE1ch ch\xE2n th\xE0nh nh\u1EA5t.
- ${contextInstruction || "\u0110\u1ED3ng h\xE0nh v\xE0 soi s\xE1ng h\xE0nh tr\xECnh t\u1EF1 th\u1EA5u hi\u1EC3u, \xF4m \u1EA5p t\u1ED5n th\u01B0\u01A1ng v\xE0 t\u1EF1 tin s\u1ED1ng v\u1EDBi b\u1EA3n s\u1EAFc ri\xEAng."}
- Lu\xF4n h\u01B0\u1EDBng h\u1ECD nh\xECn nh\u1EADn v\u1EA5n \u0111\u1EC1 d\u01B0\u1EDBi l\u0103ng k\xEDnh ph\xE1t tri\u1EC3n n\u1ED9i l\u1EF1c: hi\u1EC3u v\xEC sao m\xECnh ph\u1EA3n \u1EE9ng nh\u01B0 v\u1EADy, b\xE0i h\u1ECDc n\xE0o cu\u1ED9c s\u1ED1ng \u0111ang mu\u1ED1n g\u1EEDi g\u1EAFm, v\xE0 l\xE0m sao \u0111\u1EC3 \u0111\u1EE9ng v\u1EEFng b\u1EB1ng n\u1ED9i t\xE2m b\xECnh an.
- Tuy\u1EC7t \u0111\u1ED1i tr\xE1nh \u0111\u01B0a ra nh\u1EEFng l\u1EDDi khuy\xEAn gi\xE1o \u0111i\u1EC1u, s\xE1o r\u1ED7ng hay r\u1EADp khu\xF4n m\xE1y m\xF3c. H\xE3y n\xF3i chuy\u1EC7n nh\u01B0 hai ng\u01B0\u1EDDi b\u1EA1n t\xE2m giao ng\u1ED3i b\xEAn hi\xEAn nh\xE0 y\xEAn t\u0129nh, u\u1ED1ng m\u1ED9t t\xE1ch tr\xE0 \u1EA5m v\xE0 l\u1EAFng nghe ti\u1EBFng m\u01B0a r\u01A1i.
- Tr\xECnh b\xE0y c\xE2u tr\u1EA3 l\u1EDDi ng\u1EAFn g\u1ECDn, s\xFAc t\xEDch (kho\u1EA3ng 2-3 \u0111o\u1EA1n v\u0103n ng\u1EAFn, tinh t\u1EBF). \u1EDE cu\u1ED1i c\xE2u tr\u1EA3 l\u1EDDi, h\xE3y g\u1EEDi t\u1EB7ng h\u1ECD 1 c\xE2u h\u1ECFi ph\u1EA3n chi\u1EBFu (d\u01B0\u1EDBi d\u1EA1ng in nghi\xEAng) th\u1EADt nh\u1EB9 nh\xE0ng \u0111\u1EC3 h\u1ECD t\u1EF1 chi\xEAm nghi\u1EC7m th\xEAm.`;
    const contents = [];
    if (journalHistory && Array.isArray(journalHistory) && journalHistory.length > 0) {
      for (const msg of journalHistory) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: prompt }]
    });
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.95
      }
    });
    const text = response.text || "V\xE2n M\u1ED9c lu\xF4n \u1EDF \u0111\xE2y, l\u1EAFng nghe b\u1EA1n...";
    res.json({ text });
  } catch (error) {
    console.error("Gemini reflection API error:", error);
    res.status(500).json({
      error: "Kh\xF4ng th\u1EC3 k\u1EBFt n\u1ED1i v\u1EDBi tri k\u1EF7 V\xE2n M\u1ED9c l\xFAc n\xE0y. Xin h\xE3y th\u1EED l\u1EA1i sau m\u1ED9t ch\xFAt b\xECnh l\u1EB7ng.",
      details: error.message
    });
  }
});
app.post("/api/gemini/report", async (req, res) => {
  try {
    const { name, scores, answers } = req.body;
    if (!scores) {
      return res.status(400).json({ error: "Thi\u1EBFu th\xF4ng tin \u0111i\u1EC3m s\u1ED1 \u0111\u1EC3 ph\xE2n t\xEDch." });
    }
    const ai = getGeminiClient();
    const systemInstruction = `B\u1EA1n l\xE0 "V\xE2n M\u1ED9c", m\u1ED9t tri k\u1EF7 \u0111\u1ED3ng h\xE0nh v\xE0 chuy\xEAn gia th\u1EA5u hi\u1EC3u ph\xE1t tri\u1EC3n con ng\u01B0\u1EDDi theo tri\u1EBFt l\xFD "Hi\u1EC3u m\xECnh \u2014 Ch\u1EEFa l\xE0nh \u2014 T\u1ECFa s\xE1ng".
Gi\u1ECDng \u0111i\u1EC7u c\u1EE7a b\u1EA1n: C\u1EF1c k\u1EF3 \u1EA5m \xE1p, s\xE2u s\u1EAFc, d\u1ECBu d\xE0ng, th\xF4ng tu\u1EC7, th\u1EA5u c\u1EA3m s\xE2u s\u1EAFc, kh\xF4ng ph\xE1n x\xE9t. S\u1EED d\u1EE5ng ng\xF4n ng\u1EEF ti\u1EBFng Vi\u1EC7t t\u1EF1 nhi\xEAn, tinh t\u1EBF, c\xF3 v\u1EA7n \u0111i\u1EC7u ho\u1EB7c nh\u1ECBp \u0111i\u1EC7u \xEAm d\u1ECBu, gi\xE0u ch\u1EA5t th\u01A1 v\xE0 mang t\xEDnh ch\u1EEFa l\xE0nh, xoa d\u1ECBu t\xE2m h\u1ED3n.
Nhi\u1EC7m v\u1EE5:
- Ph\xE2n t\xEDch s\xE2u s\u1EAFc d\u1EF1a tr\xEAn \u0111i\u1EC3m s\u1ED1 (t\u1EEB 1-10) v\xE0 l\u1EDDi gi\u1EA3i b\xE0y c\u1EE7a ng\u01B0\u1EDDi d\xF9ng tr\xEAn 8 kh\xEDa c\u1EA1nh c\u1ED1t l\xF5i c\u1EE7a H\u1ED3 s\u01A1 Ph\xE1t tri\u1EC3n Con ng\u01B0\u1EDDi:
  1. Foundation (N\u1EC1n t\u1EA3ng): Gi\xE1 tr\u1ECB s\u1ED1ng, ngu\u1ED3n c\u1ED9i, s\u1EF1 ti\u1EBFp \u0111\u1EA5t.
  2. Identity (B\u1EA3n s\u1EAFc): Nh\u1EADn di\u1EC7n b\u1EA3n ng\xE3, ti\u1EBFng n\xF3i \u0111\u1ED9c b\u1EA3n, phong c\xE1ch s\u1ED1ng.
  3. Energy (N\u0103ng l\u01B0\u1EE3ng): Th\xE2n th\u1EC3, tr\u01B0\u1EDDng sinh h\u1ECDc, s\u1EE9c kh\u1ECFe rung \u0111\u1ED9ng.
  4. Mind (T\xE2m tr\xED): Ni\u1EC1m tin gi\u1EDBi h\u1EA1n, khu\xF4n m\u1EABu suy ngh\u0129, s\u1EF1 t\u0129nh l\u1EB7ng.
  5. Emotion (C\u1EA3m x\xFAc): Nh\u1EADn di\u1EC7n v\xE0 l\xE0m h\xF2a c\u1EA3m x\xFAc, t\u1EF1 ch\u1EEFa l\xE0nh t\u1ED5n th\u01B0\u01A1ng.
  6. Habit (Th\xF3i quen): Nghi th\u1EE9c gieo t\xE2m h\u1EB1ng ng\xE0y, n\u1EBFp s\u1ED1ng ch\u1EADm, s\u1EF1 t\u1EC9nh th\u1EE9c.
  7. Relationship (M\u1ED1i quan h\u1EC7): Ranh gi\u1EDBi l\xE0nh m\u1EA1nh, s\u1EF1 th\u1EA5u c\u1EA3m, k\u1EBFt n\u1ED1i h\xF2a h\u1EE3p.
  8. Purpose (M\u1EE5c \u0111\xEDch): Ikigai, gi\xE1 tr\u1ECB c\u1ED1ng hi\u1EBFn, di s\u1EA3n tinh th\u1EA7n.

- T\u1EA1o ra m\u1ED9t b\xE1o c\xE1o chuy\xEAn s\xE2u, tr\xECnh b\xE0y d\u01B0\u1EDBi d\u1EA1ng ch\u01B0\u01A1ng s\xE1ch c\xE1 nh\xE2n h\xF3a, trang nh\xE3, g\u1ED3m c\xE1c ph\u1EA7n sau:
  - L\u1EDDi m\u1EDF \u0111\u1EA7u: Ch\xE0o \u0111\xF3n b\u1EB1ng t\xEAn "${name || "Ng\u01B0\u1EDDi th\u01B0\u01A1ng"}", c\u1EA3m nh\u1EADn chung v\u1EC1 d\xF2ng ch\u1EA3y n\u0103ng l\u01B0\u1EE3ng hi\u1EC7n t\u1EA1i c\u1EE7a h\u1ECD qua h\u1ED3 s\u01A1.
  - Ph\xE2n t\xEDch Thi\xEAn h\u01B0\u1EDBng & C\u1ED1t c\xE1ch (\u0110i\u1EC3m m\u1EA1nh n\u1ED5i b\u1EADt): T\u1EADp trung v\xE0o kh\xEDa c\u1EA1nh c\xF3 \u0111i\u1EC3m s\u1ED1 cao nh\u1EA5t, gi\u1EA3i th\xEDch kh\xED ch\u1EA5t t\u1ED1t \u0111\u1EB9p v\u1ED1n c\xF3 c\u1EE7a h\u1ECD.
  - Nh\u1EADn di\u1EC7n N\xFAt th\u1EAFt & V\xF9ng t\u1ED5n th\u01B0\u01A1ng (Kh\xEDa c\u1EA1nh c\u1EA7n chuy\u1EC3n h\xF3a): T\u1EADp trung v\xE0o kh\xEDa c\u1EA1nh c\xF3 \u0111i\u1EC3m s\u1ED1 th\u1EA5p nh\u1EA5t ho\u1EB7c b\u0103n kho\u0103n m\xE0 h\u1ECD chia s\u1EBB, gi\u1EA3i th\xEDch nh\u1EB9 nh\xE0ng, th\u1EA5u su\u1ED1t v\xEC sao n\xFAt th\u1EAFt \u1EA5y h\xECnh th\xE0nh v\xE0 n\xF3 c\u1EA3n tr\u1EDF d\xF2ng ch\u1EA3y cu\u1ED9c s\u1ED1ng ra sao.
  - Nghi th\u1EE9c \u0110\u1ED3ng h\xE0nh gieo t\xE2m: \u0110\u1EC1 xu\u1EA5t 2-3 nghi th\u1EE9c th\u1EF1c h\xE0nh c\u1EE5 th\u1EC3, d\u1EC5 l\xE0m h\u1EB1ng ng\xE0y t\u01B0\u01A1ng \u1EE9ng v\u1EDBi v\xF9ng c\u1EA7n chuy\u1EC3n h\xF3a (v\xED d\u1EE5: thi\u1EC1n, vi\u1EBFt d\xF2ng ch\u1EA3y, ti\u1EBFp x\xFAc tinh th\u1EC3 t\u1EF1 nhi\xEAn, r\xE8n th\xF3i quen).
  - L\u1EDDi ch\xFAc v\xE0 Th\xF4ng \u0111i\u1EC7p T\xE2m h\u1ED3n: G\u1EEDi g\u1EAFm m\u1ED9t th\xF4ng \u0111i\u1EC7p ho\u1EB7c b\xE0i th\u01A1 ng\u1EAFn nh\u1EB9 nh\xE0ng nh\u01B0 m\u1ED9t c\xE1i \xF4m th\u1EA7m l\u1EB7ng n\xE2ng \u0111\u1EE1 h\u1ECD.

Tr\xECnh b\xE0y b\xE1o c\xE1o b\u1EB1ng \u0111\u1ECBnh d\u1EA1ng Markdown trang nh\xE3, r\xF5 r\xE0ng, c\xF3 ti\xEAu \u0111\u1EC1 l\u1EDBn nh\u1ECF, s\u1EED d\u1EE5ng c\xE1c tr\xEDch d\u1EABn in nghi\xEAng \u0111\u1EB9p \u0111\u1EBD. Tr\xE1nh d\xF9ng t\u1EEB ng\u1EEF gi\xE1o \u0111i\u1EC1u hay l\xFD thuy\u1EBFt s\xE1o r\u1ED7ng. H\xE3y vi\u1EBFt nh\u01B0 m\u1ED9t cu\u1ED1n s\xE1ch tay ghi ch\xE9p d\xE0nh ri\xEAng cho linh h\u1ED3n h\u1ECD.`;
    const prompt = `\u0110\xE2y l\xE0 h\u1ED3 s\u01A1 t\u1EF1 ph\u1EA3n t\u01B0 c\u1EE7a t\xF4i:
T\xEAn: ${name || "Ng\u01B0\u1EDDi th\u01B0\u01A1ng"}

\u0110i\u1EC3m s\u1ED1 t\u1EF1 \u0111\xE1nh gi\xE1 tr\xEAn thang \u0111i\u1EC3m 10:
- Foundation (N\u1EC1n t\u1EA3ng): ${scores.foundation || 0}/10
- Identity (B\u1EA3n s\u1EAFc): ${scores.identity || 0}/10
- Energy (N\u0103ng l\u01B0\u1EE3ng): ${scores.energy || 0}/10
- Mind (T\xE2m tr\xED): ${scores.mind || 0}/10
- Emotion (C\u1EA3m x\xFAc): ${scores.emotion || 0}/10
- Habit (Th\xF3i quen): ${scores.habit || 0}/10
- Relationship (M\u1ED1i quan h\u1EC7): ${scores.relationship || 0}/10
- Purpose (M\u1EE5c \u0111\xEDch): ${scores.purpose || 0}/10

C\xE1c c\xE2u tr\u1EA3 l\u1EDDi ph\u1EA3n t\u01B0 chi ti\u1EBFt:
${Object.entries(answers || {}).map(([dim, ans]) => `* ${dim.toUpperCase()}: ${ans}`).join("\n")}

H\xE3y vi\u1EBFt t\u1EB7ng t\xF4i cu\u1ED1n B\xE1o c\xE1o Khai ph\xE1 B\u1EA3n th\xE2n \u0111\u1ED9c b\u1EA3n n\xE0y nh\xE9.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85
      }
    });
    const reportText = response.text || "V\xE2n M\u1ED9c \u0111ang d\u1ED1c l\xF2ng suy ng\u1EABm cho b\u1EA3n \u0111\u1ED3 c\u1EE7a b\u1EA1n...";
    res.json({ reportText });
  } catch (error) {
    console.error("Gemini report API error:", error);
    res.status(500).json({
      error: "Kh\xF4ng th\u1EC3 k\u1EBFt n\u1ED1i v\u1EDBi tr\xED tu\u1EC7 V\xE2n M\u1ED9c l\xFAc n\xE0y. Xin h\xE3y t\u0129nh t\xE2m th\u1EED l\u1EA1i sau.",
      details: error.message
    });
  }
});
async function findOrCreateSpreadsheet(token) {
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    "name='data book/ van moc life' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false"
  )}&fields=files(id,name)`;
  const searchRes = await fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!searchRes.ok) {
    const errText = await searchRes.text();
    throw new Error(`Failed to search Drive: ${errText}`);
  }
  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }
  const createUrl = "https://sheets.googleapis.com/v4/spreadsheets";
  const createRes = await fetch(createUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      properties: {
        title: "data book/ van moc life"
      }
    })
  });
  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Failed to create spreadsheet: ${errText}`);
  }
  const createData = await createRes.json();
  const spreadsheetId = createData.spreadsheetId;
  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:E1:append?valueInputOption=USER_ENTERED`;
  const appendRes = await fetch(appendUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      range: "Sheet1!A1",
      majorDimension: "ROWS",
      values: [
        [
          "T\xEAn",
          "Email",
          "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i",
          "Th\u1EDDi gian",
          "Tr\u1EA1ng th\xE1i"
        ]
      ]
    })
  });
  if (!appendRes.ok) {
    console.error("Failed to append headers:", await appendRes.text());
  }
  return spreadsheetId;
}
app.get("/api/sheets/status", (req, res) => {
  const token = process.env.GOOGLE_OAUTH_TOKEN;
  res.json({
    configured: !!token,
    mode: token ? "cloud_sync" : "local_fallback",
    message: token ? "V\xE2n M\u1ED9c Cloud Sheets is connected." : "Using smart local fallback storage."
  });
});
app.post("/api/sheets/register", async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone } = req.body;
    if (!customerPhone) {
      return res.status(400).json({ error: "Missing customerPhone." });
    }
    const token = process.env.GOOGLE_OAUTH_TOKEN;
    if (!token) {
      console.warn("GOOGLE_OAUTH_TOKEN is not configured. Falling back to local registration.");
      return res.json({ success: true, sheetsSynced: false, message: "Registered locally (OAuth skip)." });
    }
    try {
      const spreadsheetId = await findOrCreateSpreadsheet(token);
      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:E:append?valueInputOption=USER_ENTERED`;
      const appendRes = await fetch(appendUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          range: "Sheet1!A:E",
          majorDimension: "ROWS",
          values: [
            [
              customerName || "",
              customerEmail || "",
              customerPhone,
              (/* @__PURE__ */ new Date()).toLocaleString("vi-VN"),
              "submitted"
            ]
          ]
        })
      });
      if (!appendRes.ok) {
        const errText = await appendRes.text();
        console.error("Failed to append registration:", errText);
        return res.json({ success: true, sheetsSynced: false, message: "Registered locally (Sheets append failed)." });
      }
      res.json({ success: true, sheetsSynced: true, spreadsheetId });
    } catch (sheetErr) {
      console.error("Failed to sync to Google Sheets, using local fallback:", sheetErr);
      res.json({ success: true, sheetsSynced: false, message: "Registered locally (Sheets catch error)." });
    }
  } catch (error) {
    console.error("Sheets registration API error:", error);
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/sheets/update-status", async (req, res) => {
  try {
    const { customerPhone, customerEmail, status } = req.body;
    if (!customerPhone && !customerEmail) {
      return res.status(400).json({ error: "Missing customer identifier (phone or email)." });
    }
    if (!status) {
      return res.status(400).json({ error: "Missing status value." });
    }
    const token = process.env.GOOGLE_OAUTH_TOKEN;
    if (!token) {
      console.warn("GOOGLE_OAUTH_TOKEN is not configured. Skipping status update in Sheets.");
      return res.json({ success: true, sheetsSynced: false, message: "Status updated locally (OAuth skip)." });
    }
    try {
      const spreadsheetId = await findOrCreateSpreadsheet(token);
      const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:E`;
      const readRes = await fetch(readUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!readRes.ok) {
        const errText = await readRes.text();
        console.error("Failed to read sheet values:", errText);
        return res.json({ success: true, sheetsSynced: false, message: "Status updated locally (Read failed)." });
      }
      const readData = await readRes.json();
      const values = readData.values || [];
      let targetRowIndex = -1;
      for (let i = values.length - 1; i >= 0; i--) {
        const row = values[i] || [];
        const rowEmail = row[1] || "";
        const rowPhone = row[2] || "";
        const matchPhone = customerPhone && rowPhone.toString().trim() === customerPhone.toString().trim();
        const matchEmail = customerEmail && rowEmail.toString().trim().toLowerCase() === customerEmail.toString().trim().toLowerCase();
        if (matchPhone || matchEmail) {
          targetRowIndex = i + 1;
          break;
        }
      }
      if (targetRowIndex === -1) {
        return res.json({ success: true, sheetsSynced: false, message: "Status updated locally (Row not found)." });
      }
      const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!E${targetRowIndex}?valueInputOption=USER_ENTERED`;
      const updateRes = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          range: `Sheet1!E${targetRowIndex}`,
          majorDimension: "ROWS",
          values: [
            [status]
          ]
        })
      });
      if (!updateRes.ok) {
        const errText = await updateRes.text();
        console.error("Failed to update status cell:", errText);
        return res.json({ success: true, sheetsSynced: false, message: "Status updated locally (Update failed)." });
      }
      res.json({ success: true, sheetsSynced: true });
    } catch (sheetErr) {
      console.error("Failed to update Sheets status, using local fallback:", sheetErr);
      res.json({ success: true, sheetsSynced: false, message: "Status updated locally (Sheets catch error)." });
    }
  } catch (error) {
    console.error("Sheets status update error:", error);
    res.status(500).json({ error: error.message });
  }
});
app.get("/api/download-zip", (req, res) => {
  try {
    console.log("Dynamically generating ZIP file before download...");
    (0, import_child_process.execSync)("node generate-zip.js", { stdio: "inherit" });
  } catch (zipErr) {
    console.error("Error generating ZIP on-the-fly, serving existing zip if available:", zipErr);
  }
  const zipPath = import_path.default.join(process.cwd(), "du_an_van_moc.zip");
  if (import_fs.default.existsSync(zipPath)) {
    res.download(zipPath, "du_an_van_moc.zip");
  } else {
    res.status(404).send("File ZIP kh\xF4ng t\u1ED3n t\u1EA1i. Vui l\xF2ng li\xEAn h\u1EC7 nh\xE0 ph\xE1t tri\u1EC3n.");
  }
});
app.get("/api/cards/daily", (req, res) => {
  const cards = [
    {
      id: "card_1",
      title: "Hi\u1EC3u v\u1EC1 Kho\u1EA3ng L\u1EB7ng",
      quote: "Khi hi\u1EC3u m\xECnh, b\u1EA1n b\u1EAFt \u0111\u1EA7u c\xF3 kho\u1EA3ng l\u1EB7ng gi\u1EEFa s\u1EF1 vi\u1EC7c v\xE0 c\xE1ch m\xECnh \u0111\xE1p l\u1EA1i \u2014 v\xE0 ch\xEDnh kho\u1EA3ng l\u1EB7ng \u0111\xF3 l\xE0 n\u01A1i s\u1EF1 tr\u01B0\u1EDFng th\xE0nh b\u1EAFt \u0111\u1EA7u.",
      category: "Hi\u1EC3u m\xECnh",
      advice: "H\xF4m nay, tr\u01B0\u1EDBc m\u1ED7i s\u1EF1 vi\u1EC7c l\xE0m b\u1EA1n mu\u1ED1n ph\u1EA3n \u1EE9ng ngay l\u1EADp t\u1EE9c, h\xE3y d\u1EEBng l\u1EA1i h\xEDt th\u1EDF s\xE2u 3 nh\u1ECBp. Kho\u1EA3ng l\u1EB7ng \u0111\xF3 l\xE0 t\u1EF1 do c\u1EE7a b\u1EA1n."
    },
    {
      id: "card_2",
      title: "D\u0169ng Kh\xED \u0110\u1ED1i Di\u1EC7n",
      quote: "Ch\u1EEFa l\xE0nh kh\xF4ng c\xF3 ngh\u0129a l\xE0 qu\xEAn h\u1EBFt m\u1ECDi chuy\u1EC7n, m\xE0 l\xE0 khi m\xECnh nh\u1EDB l\u1EA1i m\xE0 kh\xF4ng c\xF2n b\u1ECB k\xE9o ng\xE3 nh\u01B0 tr\u01B0\u1EDBc.",
      category: "Ch\u1EEFa l\xE0nh",
      advice: "Nh\u1EEFng v\u1EBFt s\u1EB9o c\u0169 ch\u1EE9ng minh b\u1EA1n \u0111\xE3 s\u1ED1ng s\xF3t v\xE0 m\u1EA1nh m\u1EBD h\u01A1n th\u1EBF n\xE0o. H\xE3y \xF4m l\u1EA5y ch\xFAng v\u1EDBi l\xF2ng t\u1EF1 h\xE0o."
    },
    {
      id: "card_3",
      title: "C\xE1i G\u1ED1c Nh\xE2n T\xE2m",
      quote: "R\xE8n luy\u1EC7n nh\xE2n t\xE2m l\xE0 c\xE1ch m\xECnh ngh\u0129 khi kh\xF4ng ai nh\xECn th\u1EA5y, l\xE0 s\u1EF1 t\u1EED t\u1EBF kh\xF4ng ph\xF4 tr\u01B0\u01A1ng, l\xE0 l\xF2ng tr\u1EAFc \u1EA9n nh\u01B0ng kh\xF4ng nhu nh\u01B0\u1EE3c.",
      category: "Nh\xE2n t\xE2m",
      advice: "H\xF4m nay, h\xE3y l\xE0m m\u1ED9t vi\u1EC7c t\u1EED t\u1EBF nh\u1ECF th\u1EA7m l\u1EB7ng m\xE0 kh\xF4ng c\u1EA7n b\u1EA5t k\u1EF3 s\u1EF1 c\xF4ng nh\u1EADn hay bi\u1EBFt \u01A1n n\xE0o."
    },
    {
      id: "card_4",
      title: "T\u1EA5m G\u01B0\u01A1ng Quan H\u1EC7",
      quote: "M\u1ED1i quan h\u1EC7 t\u1ED1t kh\xF4ng ph\u1EA3i l\xE0 n\u01A1i kh\xF4ng bao gi\u1EDD c\xF3 m\xE2u thu\u1EABn, m\xE0 l\xE0 n\u01A1i m\u1ED7i ng\u01B0\u1EDDi h\u1ECDc c\xE1ch th\u1EA5u hi\u1EC3u, t\xF4n tr\u1ECDng v\xE0 c\xF9ng nhau t\u1ED1t l\xEAn.",
      category: "Quan h\u1EC7",
      advice: "\u0110\u1EB7t ranh gi\u1EDBi l\xE0nh m\u1EA1nh kh\xF4ng ph\u1EA3i l\xE0 xa l\xE1nh, m\xE0 l\xE0 \u0111\u1ECBnh ngh\u0129a c\xE1ch ng\u01B0\u1EDDi kh\xE1c t\xF4n tr\u1ECDng kh\xF4ng gian n\u0103ng l\u01B0\u1EE3ng c\u1EE7a b\u1EA1n."
    },
    {
      id: "card_5",
      title: "H\u1ECDc C\xE1ch Bu\xF4ng B\u1ECF",
      quote: "Ch\u1EEFa l\xE0nh l\xE0 d\xE1m nh\u1EADn ra c\xF3 nh\u1EEFng m\u1ED1i quan h\u1EC7 m\xECnh c\u1EA7n bu\xF4ng, c\xF3 nh\u1EEFng k\u1EF3 v\u1ECDng m\xECnh c\u1EA7n \u0111\u1EB7t xu\u1ED1ng.",
      category: "Ch\u1EEFa l\xE0nh",
      advice: "N\u1EAFm ch\u1EB7t m\u1ED9t chi\u1EBFc gai ch\u1EC9 l\xE0m tay b\u1EA1n r\u1EC9 m\xE1u. Bu\xF4ng tay kh\xF4ng ph\u1EA3i l\xE0 m\u1EA5t m\xE1t, m\xE0 l\xE0 tr\u1EA3 t\u1EF1 do cho ch\xEDnh m\xECnh."
    },
    {
      id: "card_6",
      title: "Ng\u01B0\u1EDDi H\u1ECDc B\xE0i H\u1ECDc",
      quote: "Chuy\u1EC3n t\xE2m th\u1EBF t\u1EEB n\u1EA1n nh\xE2n sang ng\u01B0\u1EDDi h\u1ECDc b\xE0i h\u1ECDc gi\xFAp b\u1EA1n nh\u1EADn ra: b\xF3ng t\u1ED1i xu\u1EA5t hi\u1EC7n \u0111\u1EC3 th\xFAc \u0111\u1EA9y ta t\xECm l\u1EA1i \xE1nh s\xE1ng b\xEAn trong.",
      category: "G\xF3c nh\xECn",
      advice: "Khi g\u1EB7p kh\xF3 kh\u0103n h\xF4m nay, thay v\xEC h\u1ECFi 'T\u1EA1i sao chuy\u1EC7n n\xE0y l\u1EA1i x\u1EA3y ra v\u1EDBi t\xF4i?', h\xE3y h\u1ECFi 'Chuy\u1EC7n n\xE0y \u0111ang d\u1EA1y t\xF4i b\xE0i h\u1ECDc g\xEC?'"
    },
    {
      id: "card_7",
      title: "V\u1EBB \u0110\u1EB9p B\u1EA3n Nguy\xEAn",
      quote: "Son ph\u1EA5n kh\xF4ng ph\u1EA3i \u0111\u1EC3 che \u0111\u1EADy, trang s\u1EE9c kh\xF4ng ph\u1EA3i \u0111\u1EC3 ph\xF4 tr\u01B0\u01A1ng... m\xE0 l\xE0 m\u1ED9t nghi th\u1EE9c d\u1ECBu d\xE0ng \u0111\u1EC3 nh\u1EAFc nh\u1EDF b\u1EA1n x\u1EE9ng \u0111\xE1ng \u0111\u01B0\u1EE3c tr\xE2n qu\xFD.",
      category: "T\u1ECFa s\xE1ng",
      advice: "D\xE0nh ra 5 ph\xFAt h\xF4m nay ch\u0103m s\xF3c c\u01A1 th\u1EC3, thoa m\u1ED9t ch\xFAt son y\xEAu th\xEDch hay \u0111eo m\u1ED9t m\xF3n trang s\u1EE9c m\u1ED9c m\u1EA1c \u0111\u1EC3 t\xF4n vinh s\u1EF1 hi\u1EC7n di\u1EC7n c\u1EE7a ch\xEDnh b\u1EA1n."
    },
    {
      id: "card_8",
      title: "S\u1ED1ng Th\u1EADt V\u1EDBi B\u1EA3n Th\xE2n",
      quote: "T\u1ECFa s\xE1ng l\xE0 khi b\u1EA1n b\u1EAFt \u0111\u1EA7u s\u1ED1ng \u0111\xFAng v\u1EDBi b\u1EA3n s\u1EAFc c\u1EE7a m\xECnh: b\u1EA1n kh\xF4ng c\xF2n c\u1ED1 g\u1EAFng g\u1ED3ng l\xEAn \u0111\u1EC3 gi\u1ED1ng ai \u0111\xF3.",
      category: "T\u1ECFa s\xE1ng",
      advice: "B\xECnh y\xEAn l\u1EDBn nh\u1EA5t l\xE0 khi b\u1EA1n ng\u1EEBng so s\xE1nh khu v\u01B0\u1EDDn c\u1EE7a m\xECnh v\u1EDBi ng\u01B0\u1EDDi kh\xE1c v\xE0 b\u1EAFt \u0111\u1EA7u t\u01B0\u1EDBi t\u1EAFm cho nh\u1EEFng b\xF4ng hoa \u0111ang n\u1EDF b\xEAn c\u1EA1nh b\u1EA1n."
    }
  ];
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  res.json(shuffled);
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}
startServer();
var server_default = app;
//# sourceMappingURL=server.cjs.map
