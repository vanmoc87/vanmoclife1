import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API endpoint for inner reflection and companion chat
app.post("/api/gemini/reflect", async (req, res) => {
  try {
    const { prompt, context, journalHistory } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Yêu cầu cung cấp nội dung chia sẻ." });
    }

    const ai = getGeminiClient();

    let contextInstruction = "";
    if (context === "hieu_minh") {
      contextInstruction = "Tập trung sâu sắc vào việc thấu hiểu gốc rễ bản thân, nhìn nhận những nỗi sợ thầm kín, vết thương lòng cũ và các khuôn mẫu hành vi đang lặp lại.";
    } else if (context === "chua_lanh") {
      contextInstruction = "Tập trung vào sự can đảm đối diện, bao dung với những tổn thương, buông bỏ kỳ vọng nặng nề, ôm ấp đứa trẻ bên trong và học cách thương mình sáng suốt.";
    } else if (context === "toa_sang") {
      contextInstruction = "Tập trung vào việc khơi dậy khí chất nguyên bản, phong cách sống hài hòa, trân quý vẻ đẹp nội tâm và ngoại hình như một nghi thức tự chăm sóc thiêng liêng.";
    } else if (context === "nhan_tam") {
      contextInstruction = "Tập trung vào rèn luyện nhân tâm, sự tử tế thầm lặng, lòng trắc ẩn không nhu nhược, sự vững vàng trước những thị phi hoặc hơn thua cuộc đời.";
    } else if (context === "moi_quan_he") {
      contextInstruction = "Tập trung vào việc nhìn nhận mối quan hệ như một tấm gương phản chiếu, học cách thiết lập ranh giới lành mạnh, giao tiếp thấu hiểu và yêu thương không kiểm soát.";
    } else if (context === "goc_nhin_cuoc_song") {
      contextInstruction = "Tập trung chuyển đổi tâm thế từ nạn nhân sang người học bài học, tìm thấy ý nghĩa và ánh sáng sau mỗi lần vấp ngã hoặc biến cố cuộc sống.";
    }

    const systemInstruction = `Bạn là "Vân Mộc", một tri kỷ đồng hành, người lắng nghe và hướng dẫn phát triển bản thân với triết lý sâu sắc: "Hiểu mình — Chữa lành — Tỏa sáng".
Giọng điệu của bạn: Cực kỳ ấm áp, sâu sắc, dịu dàng, thông tuệ, thấu cảm sâu sắc, không phán xét. Sử dụng ngôn ngữ tiếng Việt tự nhiên, tinh tế, có vần điệu hoặc nhịp điệu êm dịu, giàu chất thơ và có sức mạnh xoa dịu tâm hồn.
Nhiệm vụ:
- Khi người dùng chia sẻ tâm sự, khó khăn, hoặc trả lời một câu hỏi phản chiếu, hãy lắng nghe và phản chiếu lại cảm xúc của họ một cách chân thành nhất.
- ${contextInstruction || "Đồng hành và soi sáng hành trình tự thấu hiểu, ôm ấp tổn thương và tự tin sống với bản sắc riêng."}
- Luôn hướng họ nhìn nhận vấn đề dưới lăng kính phát triển nội lực: hiểu vì sao mình phản ứng như vậy, bài học nào cuộc sống đang muốn gửi gắm, và làm sao để đứng vững bằng nội tâm bình an.
- Tuyệt đối tránh đưa ra những lời khuyên giáo điều, sáo rỗng hay rập khuôn máy móc. Hãy nói chuyện như hai người bạn tâm giao ngồi bên hiên nhà yên tĩnh, uống một tách trà ấm và lắng nghe tiếng mưa rơi.
- Trình bày câu trả lời ngắn gọn, súc tích (khoảng 2-3 đoạn văn ngắn, tinh tế). Ở cuối câu trả lời, hãy gửi tặng họ 1 câu hỏi phản chiếu (dưới dạng in nghiêng) thật nhẹ nhàng để họ tự chiêm nghiệm thêm.`;

    const contents: any[] = [];
    
    if (journalHistory && Array.isArray(journalHistory) && journalHistory.length > 0) {
      // Append some history if available to give chat continuity
      for (const msg of journalHistory) {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        });
      }
    }
    
    contents.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    const text = response.text || "Vân Mộc luôn ở đây, lắng nghe bạn...";
    res.json({ text });
  } catch (error: any) {
    console.error("Gemini reflection API error:", error);
    res.status(500).json({
      error: "Không thể kết nối với tri kỷ Vân Mộc lúc này. Xin hãy thử lại sau một chút bình lặng.",
      details: error.message,
    });
  }
});

// API endpoint for human development report generation
app.post("/api/gemini/report", async (req, res) => {
  try {
    const { name, scores, answers } = req.body;
    if (!scores) {
      return res.status(400).json({ error: "Thiếu thông tin điểm số để phân tích." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `Bạn là "Vân Mộc", một tri kỷ đồng hành và chuyên gia thấu hiểu phát triển con người theo triết lý "Hiểu mình — Chữa lành — Tỏa sáng".
Giọng điệu của bạn: Cực kỳ ấm áp, sâu sắc, dịu dàng, thông tuệ, thấu cảm sâu sắc, không phán xét. Sử dụng ngôn ngữ tiếng Việt tự nhiên, tinh tế, có vần điệu hoặc nhịp điệu êm dịu, giàu chất thơ và mang tính chữa lành, xoa dịu tâm hồn.
Nhiệm vụ:
- Phân tích sâu sắc dựa trên điểm số (từ 1-10) và lời giải bày của người dùng trên 8 khía cạnh cốt lõi của Hồ sơ Phát triển Con người:
  1. Foundation (Nền tảng): Giá trị sống, nguồn cội, sự tiếp đất.
  2. Identity (Bản sắc): Nhận diện bản ngã, tiếng nói độc bản, phong cách sống.
  3. Energy (Năng lượng): Thân thể, trường sinh học, sức khỏe rung động.
  4. Mind (Tâm trí): Niềm tin giới hạn, khuôn mẫu suy nghĩ, sự tĩnh lặng.
  5. Emotion (Cảm xúc): Nhận diện và làm hòa cảm xúc, tự chữa lành tổn thương.
  6. Habit (Thói quen): Nghi thức gieo tâm hằng ngày, nếp sống chậm, sự tỉnh thức.
  7. Relationship (Mối quan hệ): Ranh giới lành mạnh, sự thấu cảm, kết nối hòa hợp.
  8. Purpose (Mục đích): Ikigai, giá trị cống hiến, di sản tinh thần.

- Tạo ra một báo cáo chuyên sâu, trình bày dưới dạng chương sách cá nhân hóa, trang nhã, gồm các phần sau:
  - Lời mở đầu: Chào đón bằng tên "${name || "Người thương"}", cảm nhận chung về dòng chảy năng lượng hiện tại của họ qua hồ sơ.
  - Phân tích Thiên hướng & Cốt cách (Điểm mạnh nổi bật): Tập trung vào khía cạnh có điểm số cao nhất, giải thích khí chất tốt đẹp vốn có của họ.
  - Nhận diện Nút thắt & Vùng tổn thương (Khía cạnh cần chuyển hóa): Tập trung vào khía cạnh có điểm số thấp nhất hoặc băn khoăn mà họ chia sẻ, giải thích nhẹ nhàng, thấu suốt vì sao nút thắt ấy hình thành và nó cản trở dòng chảy cuộc sống ra sao.
  - Nghi thức Đồng hành gieo tâm: Đề xuất 2-3 nghi thức thực hành cụ thể, dễ làm hằng ngày tương ứng với vùng cần chuyển hóa (ví dụ: thiền, viết dòng chảy, tiếp xúc tinh thể tự nhiên, rèn thói quen).
  - Lời chúc và Thông điệp Tâm hồn: Gửi gắm một thông điệp hoặc bài thơ ngắn nhẹ nhàng như một cái ôm thầm lặng nâng đỡ họ.

Trình bày báo cáo bằng định dạng Markdown trang nhã, rõ ràng, có tiêu đề lớn nhỏ, sử dụng các trích dẫn in nghiêng đẹp đẽ. Tránh dùng từ ngữ giáo điều hay lý thuyết sáo rỗng. Hãy viết như một cuốn sách tay ghi chép dành riêng cho linh hồn họ.`;

    const prompt = `Đây là hồ sơ tự phản tư của tôi:
Tên: ${name || "Người thương"}

Điểm số tự đánh giá trên thang điểm 10:
- Foundation (Nền tảng): ${scores.foundation || 0}/10
- Identity (Bản sắc): ${scores.identity || 0}/10
- Energy (Năng lượng): ${scores.energy || 0}/10
- Mind (Tâm trí): ${scores.mind || 0}/10
- Emotion (Cảm xúc): ${scores.emotion || 0}/10
- Habit (Thói quen): ${scores.habit || 0}/10
- Relationship (Mối quan hệ): ${scores.relationship || 0}/10
- Purpose (Mục đích): ${scores.purpose || 0}/10

Các câu trả lời phản tư chi tiết:
${Object.entries(answers || {}).map(([dim, ans]) => `* ${dim.toUpperCase()}: ${ans}`).join("\n")}

Hãy viết tặng tôi cuốn Báo cáo Khai phá Bản thân độc bản này nhé.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.85,
      },
    });

    const reportText = response.text || "Vân Mộc đang dốc lòng suy ngẫm cho bản đồ của bạn...";
    res.json({ reportText });
  } catch (error: any) {
    console.error("Gemini report API error:", error);
    res.status(500).json({
      error: "Không thể kết nối với trí tuệ Vân Mộc lúc này. Xin hãy tĩnh tâm thử lại sau.",
      details: error.message,
    });
  }
});

// Search and create spreadsheet helper
async function findOrCreateSpreadsheet(token: string): Promise<string> {
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
    "name='data book/ van moc life' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false"
  )}&fields=files(id,name)`;
  
  const searchRes = await fetch(searchUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  if (!searchRes.ok) {
    const errText = await searchRes.text();
    throw new Error(`Failed to search Drive: ${errText}`);
  }
  
  const searchData = await searchRes.json() as { files?: { id: string; name: string }[] };
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }
  
  // Create a new spreadsheet
  const createUrl = "https://sheets.googleapis.com/v4/spreadsheets";
  const createRes = await fetch(createUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        title: "data book/ van moc life",
      },
    }),
  });
  
  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Failed to create spreadsheet: ${errText}`);
  }
  
  const createData = await createRes.json() as { spreadsheetId: string };
  const spreadsheetId = createData.spreadsheetId;
  
  // Set headers (A: Tên, B: Email, C: Số điện thoại, D: Thời gian, E: Trạng thái)
  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:E1:append?valueInputOption=USER_ENTERED`;
  const appendRes = await fetch(appendUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      range: "Sheet1!A1",
      majorDimension: "ROWS",
      values: [
        [
          "Tên",
          "Email",
          "Số điện thoại",
          "Thời gian",
          "Trạng thái"
        ],
      ],
    }),
  });
  
  if (!appendRes.ok) {
    console.error("Failed to append headers:", await appendRes.text());
  }
  
  return spreadsheetId;
}

// API endpoint to check Sheets connectivity status
app.get("/api/sheets/status", (req, res) => {
  const token = process.env.GOOGLE_OAUTH_TOKEN;
  res.json({
    configured: !!token,
    mode: token ? "cloud_sync" : "local_fallback",
    message: token ? "Vân Mộc Cloud Sheets is connected." : "Using smart local fallback storage."
  });
});

// API endpoint to save registration
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          range: "Sheet1!A:E",
          majorDimension: "ROWS",
          values: [
            [
              customerName || "",
              customerEmail || "",
              customerPhone,
              new Date().toLocaleString("vi-VN"),
              "submitted"
            ],
          ],
        }),
      });

      if (!appendRes.ok) {
        const errText = await appendRes.text();
        console.error("Failed to append registration:", errText);
        return res.json({ success: true, sheetsSynced: false, message: "Registered locally (Sheets append failed)." });
      }

      res.json({ success: true, sheetsSynced: true, spreadsheetId });
    } catch (sheetErr: any) {
      console.error("Failed to sync to Google Sheets, using local fallback:", sheetErr);
      res.json({ success: true, sheetsSynced: false, message: "Registered locally (Sheets catch error)." });
    }
  } catch (error: any) {
    console.error("Sheets registration API error:", error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to update status (e.g. to "paid" or "joined zalo")
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

      // Read Sheet1!A:E to find the matching row
      const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:E`;
      const readRes = await fetch(readUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!readRes.ok) {
        const errText = await readRes.text();
        console.error("Failed to read sheet values:", errText);
        return res.json({ success: true, sheetsSynced: false, message: "Status updated locally (Read failed)." });
      }

      const readData = await readRes.json() as { values?: string[][] };
      const values = readData.values || [];

      let targetRowIndex = -1;
      // Iterate from the bottom up to update the latest registration if multiples exist
      for (let i = values.length - 1; i >= 0; i--) {
        const row = values[i] || [];
        const rowEmail = row[1] || "";
        const rowPhone = row[2] || "";

        const matchPhone = customerPhone && rowPhone.toString().trim() === customerPhone.toString().trim();
        const matchEmail = customerEmail && rowEmail.toString().trim().toLowerCase() === customerEmail.toString().trim().toLowerCase();

        if (matchPhone || matchEmail) {
          targetRowIndex = i + 1; // 1-indexed
          break;
        }
      }

      if (targetRowIndex === -1) {
        return res.json({ success: true, sheetsSynced: false, message: "Status updated locally (Row not found)." });
      }

      // Update Column E (Trạng thái)
      const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!E${targetRowIndex}?valueInputOption=USER_ENTERED`;
      const updateRes = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          range: `Sheet1!E${targetRowIndex}`,
          majorDimension: "ROWS",
          values: [
            [status]
          ],
        }),
      });

      if (!updateRes.ok) {
        const errText = await updateRes.text();
        console.error("Failed to update status cell:", errText);
        return res.json({ success: true, sheetsSynced: false, message: "Status updated locally (Update failed)." });
      }

      res.json({ success: true, sheetsSynced: true });
    } catch (sheetErr: any) {
      console.error("Failed to update Sheets status, using local fallback:", sheetErr);
      res.json({ success: true, sheetsSynced: false, message: "Status updated locally (Sheets catch error)." });
    }
  } catch (error: any) {
    console.error("Sheets status update error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Daily card pulling endpoint (provides local storage compatible, static, or optionally AI-enriched card pull)
app.get("/api/download-zip", (req, res) => {
  const zipPath = path.join(process.cwd(), "du_an_van_moc.zip");
  if (fs.existsSync(zipPath)) {
    res.download(zipPath, "du_an_van_moc.zip");
  } else {
    res.status(404).send("File ZIP không tồn tại. Vui lòng liên hệ nhà phát triển.");
  }
});

app.get("/api/cards/daily", (req, res) => {
  const cards = [
    {
      id: "card_1",
      title: "Hiểu về Khoảng Lặng",
      quote: "Khi hiểu mình, bạn bắt đầu có khoảng lặng giữa sự việc và cách mình đáp lại — và chính khoảng lặng đó là nơi sự trưởng thành bắt đầu.",
      category: "Hiểu mình",
      advice: "Hôm nay, trước mỗi sự việc làm bạn muốn phản ứng ngay lập tức, hãy dừng lại hít thở sâu 3 nhịp. Khoảng lặng đó là tự do của bạn."
    },
    {
      id: "card_2",
      title: "Dũng Khí Đối Diện",
      quote: "Chữa lành không có nghĩa là quên hết mọi chuyện, mà là khi mình nhớ lại mà không còn bị kéo ngã như trước.",
      category: "Chữa lành",
      advice: "Những vết sẹo cũ chứng minh bạn đã sống sót và mạnh mẽ hơn thế nào. Hãy ôm lấy chúng với lòng tự hào."
    },
    {
      id: "card_3",
      title: "Cái Gốc Nhân Tâm",
      quote: "Rèn luyện nhân tâm là cách mình nghĩ khi không ai nhìn thấy, là sự tử tế không phô trương, là lòng trắc ẩn nhưng không nhu nhược.",
      category: "Nhân tâm",
      advice: "Hôm nay, hãy làm một việc tử tế nhỏ thầm lặng mà không cần bất kỳ sự công nhận hay biết ơn nào."
    },
    {
      id: "card_4",
      title: "Tấm Gương Quan Hệ",
      quote: "Mối quan hệ tốt không phải là nơi không bao giờ có mâu thuẫn, mà là nơi mỗi người học cách thấu hiểu, tôn trọng và cùng nhau tốt lên.",
      category: "Quan hệ",
      advice: "Đặt ranh giới lành mạnh không phải là xa lánh, mà là định nghĩa cách người khác tôn trọng không gian năng lượng của bạn."
    },
    {
      id: "card_5",
      title: "Học Cách Buông Bỏ",
      quote: "Chữa lành là dám nhận ra có những mối quan hệ mình cần buông, có những kỳ vọng mình cần đặt xuống.",
      category: "Chữa lành",
      advice: "Nắm chặt một chiếc gai chỉ làm tay bạn rỉ máu. Buông tay không phải là mất mát, mà là trả tự do cho chính mình."
    },
    {
      id: "card_6",
      title: "Người Học Bài Học",
      quote: "Chuyển tâm thế từ nạn nhân sang người học bài học giúp bạn nhận ra: bóng tối xuất hiện để thúc đẩy ta tìm lại ánh sáng bên trong.",
      category: "Góc nhìn",
      advice: "Khi gặp khó khăn hôm nay, thay vì hỏi 'Tại sao chuyện này lại xảy ra với tôi?', hãy hỏi 'Chuyện này đang dạy tôi bài học gì?'"
    },
    {
      id: "card_7",
      title: "Vẻ Đẹp Bản Nguyên",
      quote: "Son phấn không phải để che đậy, trang sức không phải để phô trương... mà là một nghi thức dịu dàng để nhắc nhở bạn xứng đáng được trân quý.",
      category: "Tỏa sáng",
      advice: "Dành ra 5 phút hôm nay chăm sóc cơ thể, thoa một chút son yêu thích hay đeo một món trang sức mộc mạc để tôn vinh sự hiện diện của chính bạn."
    },
    {
      id: "card_8",
      title: "Sống Thật Với Bản Thân",
      quote: "Tỏa sáng là khi bạn bắt đầu sống đúng với bản sắc của mình: bạn không còn cố gắng gồng lên để giống ai đó.",
      category: "Tỏa sáng",
      advice: "Bình yên lớn nhất là khi bạn ngừng so sánh khu vườn của mình với người khác và bắt đầu tưới tắm cho những bông hoa đang nở bên cạnh bạn."
    }
  ];
  
  // Shuffle cards
  const shuffled = [...cards].sort(() => Math.random() - 0.5);
  res.json(shuffled);
});

// Setup Vite Dev Server / Static Assets Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind server port only if not in Vercel Serverless environment
  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}

startServer();

export default app;
