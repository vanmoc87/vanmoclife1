import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  FileText,
  ClipboardList,
  Headphones,
  Video,
  FolderOpen,
  Play,
  Pause,
  X,
  Download,
  Send,
  Sparkles,
  Copy,
  ExternalLink
} from "lucide-react";

interface LibraryViewProps {
  setActiveTab?: (tab: string) => void;
  handleOpenEbookCheckout: (amount?: number, name?: string) => void;
  onJoinZaloGroup: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ handleOpenEbookCheckout, onJoinZaloGroup }) => {
  const [libraryTab, setLibraryTab] = useState<"articles" | "ebooks" | "worksheets" | "checklists" | "audio" | "videos" | "resources">("articles");

  // State Management
  const [articleCategory, setArticleCategory] = useState<string>("all");
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [activeChecklist, setActiveChecklist] = useState<"khichat" | "phattrien" | "nangluong" | "thuonghieu">("khichat");
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});
  const [activeWorksheet, setActiveWorksheet] = useState<"coaching" | "phanchieu" | "phattrien" | "journal">("coaching");
  const [worksheetAnswers, setWorksheetAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeAudio, setActiveAudio] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

  // Real Audio Playback States and Refs
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = React.useRef<HTMLIFrameElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleTimeUpdate = () => {
    if (audioRef.current && !audioList[activeAudio]?.youtubeId) {
      setCurrentTime(audioRef.current.currentTime);
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(isNaN(progress) ? 0 : progress);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && !audioList[activeAudio]?.youtubeId) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setAudioProgress(0);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickRatio = clickX / width;

    const activeTrack = audioList[activeAudio];
    if (activeTrack?.youtubeId) {
      const parts = activeTrack.duration.split(":");
      const trackDurationSec = parts.length === 2 
        ? parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)
        : 600;
      
      const newTime = clickRatio * trackDurationSec;
      setCurrentTime(newTime);
      setAudioProgress(clickRatio * 100);

      // Seek the hidden YouTube iframe via postMessage
      try {
        ytPlayerRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "seekTo", args: [newTime, true] }),
          "*"
        );
      } catch (err) {
        console.warn("YouTube iframe seek postMessage error:", err);
      }
    } else if (audioRef.current && duration) {
      const newTime = clickRatio * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setAudioProgress(clickRatio * 100);
    }
  };

  // Synchronize Play/Pause for standard audio and hidden YouTube player
  useEffect(() => {
    const activeTrack = audioList[activeAudio];
    if (activeTrack?.youtubeId) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      try {
        const command = isPlaying ? "playVideo" : "pauseVideo";
        ytPlayerRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: command, args: "" }),
          "*"
        );
      } catch (err) {
        console.warn("YouTube iframe play/pause postMessage error:", err);
      }
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.warn("Audio playback failed:", err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, activeAudio]);

  // Track progress and durations for standard audio vs simulated timers for YouTube
  useEffect(() => {
    let interval: any;
    const activeTrack = audioList[activeAudio];

    if (activeTrack?.youtubeId) {
      const parts = activeTrack.duration.split(":");
      const trackDurationSec = parts.length === 2 
        ? parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)
        : 600;
      setDuration(trackDurationSec);

      if (isPlaying) {
        interval = setInterval(() => {
          setCurrentTime(prevTime => {
            const nextTime = prevTime + 1;
            if (nextTime >= trackDurationSec) {
              setIsPlaying(false);
              setAudioProgress(0);
              return 0;
            }
            setAudioProgress((nextTime / trackDurationSec) * 100);
            return nextTime;
          });
        }, 1000);
      }
    } else {
      if (audioRef.current) {
        setDuration(audioRef.current.duration || 0);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, activeAudio]);

  const toggleChecklist = (id: string) => {
    setChecklistState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getChecklistPercent = (prefix: string, total: number) => {
    const completed = Array.from({ length: total }, (_, i) => `${prefix}-${i + 1}`).filter(id => checklistState[id]).length;
    return Math.round((completed / total) * 100);
  };

  const handleWorksheetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedback("Cảm ơn người thương đã hoàn thành phiếu rà soát tự phản tư hằng ngày. Ban Thấu Cảm Vân Mộc ghi nhận tiến trình rèn luyện chân thật của bạn. Hãy tiếp tục duy trì tâm thế tự chủ tinh thần.");
    }, 1200);
  };

  // 1. Articles Data
  const articles = [
    {
      id: "art-1",
      cat: "tamly",
      label: "Tâm lý học",
      title: "Cơ chế phòng ngự bản ngã và con đường tiếp đất",
      time: "6 phút đọc",
      summary: "Phân tích cơ chế phủ nhận, phóng chiếu vô thức dựng lên rào chắn bản ngã, và phương pháp viết nhật ký xả ly hỗ trợ tiếp đất ổn định hệ thần kinh hằng ngày.",
      content: "Khi gặp khủng hoảng hoặc lo âu, bản ngã thường dựng lên các cơ chế phòng vệ vô thức như dán nhãn, phóng chiếu tội lỗi lên người khác hoặc trốn tránh thực tại.\n\nCon đường tiếp đất (Grounding) chính là neo giữ nhận thức ở giây phút hiện tại, thở sâu và đối diện trực tiếp không phán xét. Viết nhật ký là cách thức đơn giản bóc tách lớp mặt nạ bản ngã mệt mỏi hằng ngày."
    },
    {
      id: "art-2",
      cat: "khichat",
      label: "Khí chất",
      title: "Khí chất độc bản: Khi sự tôn nghiêm được bồi đắp tự thân",
      time: "8 phút đọc",
      summary: "Khí chất không phải vẻ ngoài hào nhoáng. Nó toát ra từ năng lượng tự chủ vững vàng, tiếng nói điềm đạm sâu sắc từ cơ hoành và khả năng thiết lập ranh giới.",
      content: "Khí chất chân thật bộc lộ từ nội lực tĩnh lặng bên trong.\n\nNgười sở hữu khí chất độc bản có ranh giới cá nhân lành mạnh, lịch thiệp từ chối các yêu cầu độc hại mà không có cảm giác tội lỗi. Dáng điềm tĩnh tiếp đất, giọng nói trầm ổn sâu sắc là tấm rào chắn năng lượng tự nhiên bảo vệ thân tâm khỏi các biến động hằng ngày."
    },
    {
      id: "art-3",
      cat: "thansohoc",
      label: "Thần số học",
      title: "Thần số học học thuật: Tiếp cận dưới góc độ khoa học tần số",
      time: "7 phút đọc",
      summary: "Tháo bỏ tư duy mê tín dán nhãn số mệnh. Hướng dẫn xem các chỉ số như bản đồ rung động ban đầu để nhận diện những khuyết thiếu bản ngã cần tự rèn luyện.",
      content: "Dưới góc độ học thuật chính quy, Thần số học là công cụ thống kê các mẫu năng lượng sinh học.\n\nThay vì coi các con số là số mệnh bất biến gây hoang mang, hãy coi chúng như các bài tập rèn luyện. Số thiếu hoặc số bài học đường đời nhắc nhở vùng bản ngã yếu kém cần được nỗ lực bồi đắp bằng thói quen tự chủ, kiên nhẫn hằng ngày."
    },
    {
      id: "art-4",
      cat: "coaching",
      label: "Coaching",
      title: "Tâm lý học hành vi trong tiến trình khai vấn đồng hành",
      time: "9 phút đọc",
      summary: "Nghệ thuật lắng nghe sâu sắc thầm lặng và cách ứng dụng bộ câu hỏi cấu trúc giúp người thương tự nhận diện điểm mù tư duy và chịu trách nhiệm hành vi hằng ngày.",
      content: "Khai vấn đồng hành không phải là ban phát lời khuyên chủ quan, mà là tạo lập khoảng trống an toàn để người thương tự soi chiếu.\n\nBằng cách lắng nghe thầm lặng không phán xét và đặt câu hỏi phản tư Socrates thông thái, người khai vấn hỗ trợ đối phương tự nhận thức tổn thương cũ và vững bước trên hành trình chuyển hóa."
    },
    {
      id: "art-5",
      cat: "phattrien",
      label: "Phát triển con người",
      title: "Hành trình 8 Giai đoạn rèn luyện phát triển bền vững",
      time: "11 phút đọc",
      summary: "Từ bước ổn định sinh học ban đầu, giải phóng tổn thương đứa trẻ bên trong, đến khi đạt năng lực tự chủ tôn nghiêm và phục vụ cộng đồng vô điều kiện.",
      content: "Phương pháp phát triển con người Vân Mộc chia hành trình tự chủ thành 8 bậc liên tục: Tiếp đất sinh học ổn định; Giải phóng ách tắc cảm xúc; Định vị bản thể độc bản; Xác lập ranh giới tôn nghiêm; Thấu cảm bao dung kết nối; Khơi mở trực giác sáng tạo; Tự chủ thông tuệ và Phụng sự cộng đồng tử tế."
    }
  ];

  // 2. Ebooks Data
  const ebooks = [
    { id: "eb-1", title: "Hiểu Bản Thân", desc: "Giúp nhận diện tiếng ồn tâm trí, giải phẫu bản ngã và thiết lập nếp sống chậm tự chủ.", status: "Miễn phí", pages: "90 trang", format: "PDF chuẩn" },
    { id: "eb-2", title: "Khí Chất Phụ Nữ Độc Bản", desc: "Bồi đắp phong thái tôn nghiêm, rèn trường khí điềm đạm và thiết lập ranh giới lành mạnh.", status: "99.000đ", pages: "140 trang", format: "PDF + Audio" },
    { id: "eb-3", title: "Nhật Ký Phát Triển Con Người", desc: "Hệ thống các bài tập tự phản chiếu phản tư ngày và theo dõi tiến trình chuyển hóa thói quen.", status: "120.000đ", pages: "165 trang", format: "PDF tương tác" }
  ];

  // 3. Worksheets Data
  const worksheets = {
    coaching: {
      title: "Worksheet Coaching Tự Khai Vấn",
      desc: "Rà soát các mảng khuyết thiếu giúp bạn định vị hành động cải thiện tức thì.",
      q1: "1. Nhìn nhận 3 khía cạnh đang mất cân bằng hoặc tắc nghẽn năng lượng nhất hiện nay là gì?",
      q2: "2. Hành động nhỏ nhất bạn có thể thực hiện ngày mai để cải thiện khía cạnh đó?"
    },
    phanchieu: {
      title: "Bài Tập Tự Phản Chiếu Khách Quan",
      desc: "Quy trình loại bỏ lăng kính cảm xúc cá nhân phán xét để nhìn nhận sự thật khách quan.",
      q1: "1. Mô tả sự việc gần đây khiến bạn tổn thương nhất (Chỉ viết sự thật khách quan, không dùng từ phán xét).",
      q2: "2. Những ý nghĩ dán nhãn phán xét ngầm nào đã nảy sinh bên trong bạn lúc đó?"
    },
    phattrien: {
      title: "Bài Tập Phát Triển Bản Thân & Ranh Giới",
      desc: "Thiết lập ranh giới tôn nghiêm bảo vệ thời gian và năng lượng hằng ngày.",
      q1: "1. Mối quan hệ hay thói quen nào đang vắt kiệt ranh giới năng lượng của bạn nhiều nhất?",
      q2: "2. Viết ra câu từ chối lịch thiệp phản ánh đúng ranh giới của bạn gửi đến họ."
    },
    journal: {
      title: "Daily Flow Journal (Nhật Ký Dòng Chảy Xả Ly)",
      desc: "Cho phép mọi cảm xúc tắc nghẽn được gọi tên và giải tỏa ra khỏi trường khí hằng ngày.",
      q1: "1. Hiện tại, những cảm xúc ách tắc nào đang trú ngụ trong cơ thể bạn? (Gọi tên chân thực: lo âu, giận dữ...)",
      q2: "2. Viết lời xả ly gửi tới cảm xúc đó để giải phóng trường khí của chính mình."
    }
  };

  // 4. Checklists Data
  const checklists = {
    khichat: {
      title: "Checklist Xây Dựng Khí Chất Độc Bản",
      desc: "Các hành động rèn luyện phong thái điềm tĩnh và ranh giới lành mạnh.",
      items: [
        { id: "kc-1", label: "Thiết lập ranh giới lành mạnh, từ chối lịch thiệp các yêu cầu độc hại." },
        { id: "kc-2", label: "Rèn luyện ngôn từ dứt khoát, điềm đạm, không vội vàng giải thích." },
        { id: "kc-3", label: "Duy trì dáng đứng thẳng tiếp đất vững chãi bằng hai lòng bàn chân." },
        { id: "kc-4", label: "Kiểm soát phản ứng tự động vô thức hằng ngày, dừng 3 giây thở sâu." }
      ]
    },
    phattrien: {
      title: "Checklist Phát Triển Bản Thân Bền Vững",
      desc: "Theo dõi thói quen tự học hằng ngày và bồi đắp tư duy thấu suốt.",
      items: [
        { id: "pt-1", label: "Dành 30 phút tự học nghiêm túc hoặc đọc sách tri thức tinh hoa." },
        { id: "pt-2", label: "Viết nhật trình phản tư cuối ngày soi chiếu công tâm hành vi ứng xử." },
        { id: "pt-3", label: "Thực hành tư duy phản biện khách quan, hạn chế tin giật gân MXH." },
        { id: "pt-4", label: "Thực hành lắng nghe thấu cảm, không vội dán nhãn người thương." }
      ]
    },
    nangluong: {
      title: "Checklist Chăm Sóc Năng Lượng & Trường Khí",
      desc: "Ổn định nhịp sinh học và giải phóng năng lượng tắc nghẽn.",
      items: [
        { id: "nl-1", label: "Tiếp đất (Grounding) chân trần tiếp xúc thảm cỏ ấm hoặc đất đá 5-10 phút." },
        { id: "nl-2", label: "Hít thở luân phiên Nadi Shodhana 5 chu kỳ ổn định hệ thần kinh." },
        { id: "nl-3", label: "Thanh tẩy trường khí bằng khói trầm tự nhiên hoặc âm thanh chuông xoay." },
        { id: "nl-4", label: "Uống nước ấm tỉnh thức đầu ngày chánh niệm, không lướt điện thoại 30 phút." }
      ]
    },
    thuonghieu: {
      title: "Checklist Xây Thương Hiệu Cá Nhân Chân Thật",
      desc: "Định vị bản thể nhất quán dựa trên sự tử tế và nhất quán hành vi.",
      items: [
        { id: "th-1", label: "Nhất quán giữa giá trị cốt lõi cá nhân sâu sắc bên trong và bên ngoài." },
        { id: "th-2", label: "Viết lách chia sẻ tri thức tử tế, giải quyết nỗi đau của con người hằng ngày." },
        { id: "th-3", label: "Ứng xử lịch thiệp, tôn trọng ranh giới kỹ thuật số của người khác." },
        { id: "th-4", label: "Truyền đạt thông điệp chân thật, tuyệt đối không dùng chiêu trò cường điệu." }
      ]
    }
  };

  // 5. Audio Data
  const audioList: Array<{ title: string; duration: string; type: string; youtubeId?: string; src?: string }> = [
    {
      title: "Nhạc Tần Số 432Hz: Làm Sạch Năng Lượng Tiêu Cực, Tăng Năng Lượng Tích Cực & Giải Phóng Căng Thẳng",
      duration: "15:00",
      type: "Frequency Tuning",
      youtubeId: "O1aRo-xGxbM"
    },
    {
      title: "Nhạc Reiki trị liệu: khơi thông dòng chảy năng lượng & giúp tập trung học tập, công việc",
      duration: "20:00",
      type: "Energy Tuning",
      youtubeId: "RYKKq7_PGoU"
    },
    {
      title: "Khẳng định tích cực bồi đắp nội lực",
      duration: "10:00",
      type: "Affirmations",
      youtubeId: "56M0UcllB1U"
    },
    {
      title: "Nếp sống chậm: Hướng dẫn phản tư",
      duration: "12:30",
      type: "Audio Guide",
      youtubeId: "3S-p7rA81-w"
    }
  ];

  // 6. Video Data
  const videos: any[] = [];

  // 7. Resources Data
  const resourcesData = {
    books: [
      { title: "Đi Tìm Lẽ Sống", author: "Viktor Frankl", note: "Tìm ra ý nghĩa cuộc sống hằng ngày qua mọi hoàn cảnh." },
      { title: "Hiểu Về Trái Tim", author: "Thích Minh Niệm", note: "Nhận diện sâu sắc tâm lý học ứng dụng chánh niệm thuần Việt." },
      { title: "Sức Mạnh Của Hiện Tại", author: "Eckhart Tolle", note: "Neo giữ trường năng lượng vững vàng trong phút giây hiện tại." }
    ],
    tools: [
      { name: "Vân Mộc AI Coach Chat Prompt", type: "Mẫu prompt", desc: "Biến ChatGPT/Gemini thành chuyên gia khai vấn đối thoại sâu sắc." },
      { name: "Notion Reflection Journal", type: "Mẫu quản lý số", desc: "Mẫu trang Notion theo dõi thói quen rèn luyện hằng ngày." }
    ],
    links: [
      { name: "Excel Theo Dõi Rèn Luyện 66 Ngày", desc: "Đo lường tính kiên trì và nhất quán hình thành phản xạ mới." },
      { name: "Thư Viện Sóng Não Binaural Beats", desc: "Các tần số sóng Theta và Alpha hỗ trợ tối đa thiền định ngủ ngon." }
    ]
  };

  return (
    <div className="space-y-12 text-left">
      {/* Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-4 py-1.5 rounded-full inline-block">Thư Viện Tri Thức &amp; Tài Liệu Tự Học</span>
        <h2 className="text-3xl md:text-4.5xl font-serif text-stone-900 leading-tight font-black">Thư Viện Vân Mộc<span className="text-[#5A5A40]">.</span></h2>
        <p className="text-xs text-stone-500 max-w-xl mx-auto leading-relaxed italic">(Sắp xếp khoa học các tài liệu, ấn phẩm thực hành, thanh âm tỉnh thức và tài nguyên phát triển con người)</p>
        <div className="h-[1.5px] w-12 bg-[#5A5A40]/20 mx-auto mt-3"></div>
      </div>

      {/* Symmetrical 7-Tab Navigation bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-1.5 p-1 bg-stone-100 border border-stone-200/60 rounded-2xl">
        {[
          { id: "articles", label: "Articles", sub: "Bài viết", icon: BookOpen },
          { id: "ebooks", label: "Ebooks", sub: "Ebooks", icon: BookOpen },
          { id: "worksheets", label: "Worksheets", sub: "Thực hành", icon: FileText },
          { id: "checklists", label: "Checklists", sub: "Theo dõi hằng ngày", icon: ClipboardList },
          { id: "audio", label: "Audio", sub: "Thanh âm thiền", icon: Headphones },
          { id: "videos", label: "Videos", sub: "Bài giảng video", icon: Video },
          { id: "resources", label: "Resources", sub: "Kho tài nguyên", icon: FolderOpen }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = libraryTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setLibraryTab(tab.id as any); setFeedback(null); }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl text-center transition-all duration-200 cursor-pointer ${
                isActive ? "bg-[#5A5A40] text-white shadow-xs" : "text-stone-600 hover:text-stone-900 hover:bg-[#5A5A40]/5"
              }`}
            >
              <Icon className={`w-4 h-4 mb-1 ${isActive ? "text-amber-200" : "text-stone-400"}`} />
              <span className="text-[10px] font-bold uppercase tracking-wider block">{tab.label}</span>
              <span className={`text-[7px] block mt-0.5 ${isActive ? "text-amber-100/80" : "text-stone-400"}`}>{tab.sub}</span>
            </button>
          );
        })}
      </div>

      <div className="pt-2">
        {/* 1. ARTICLES TAB */}
        {libraryTab === "articles" && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-1.5 border-b border-stone-100 pb-3">
              {[{ id: "all", label: "Tất cả" }, { id: "phattrien", label: "Phát triển con người" }, { id: "tamly", label: "Tâm lý học" }, { id: "coaching", label: "Coaching" }, { id: "khichat", label: "Khí chất" }, { id: "thansohoc", label: "Thần số học" }].map(c => (
                <button key={c.id} onClick={() => setArticleCategory(c.id)} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${articleCategory === c.id ? "bg-[#5A5A40]/15 text-[#5A5A40] font-bold" : "text-stone-500 hover:text-stone-800"}`}>{c.label}</button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {articles.filter(a => articleCategory === "all" || a.cat === articleCategory).map(art => (
                <div key={art.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-stone-400 font-mono">
                      <span className="uppercase font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-1.5 py-0.2 rounded">{art.label}</span>
                      <span>{art.time}</span>
                    </div>
                    <h3 className="text-sm font-serif font-bold text-stone-900 leading-snug">{art.title}</h3>
                    <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">{art.summary}</p>
                  </div>
                  <button onClick={() => setSelectedArticle(art)} className="text-[10px] font-bold uppercase tracking-wider text-[#5A5A40] hover:underline mt-4 flex items-center gap-1 cursor-pointer justify-end">Đọc chi tiết →</button>
                </div>
              ))}
            </div>

            {selectedArticle && (
              <div className="fixed inset-0 bg-stone-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
                <div className="bg-[#F7F5F0] rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col border border-stone-300 shadow-2xl text-left">
                  <div className="p-5 md:p-6 border-b border-stone-200 flex justify-between bg-stone-150">
                    <div>
                      <span className="text-[9px] uppercase font-bold bg-[#5A5A40] text-white px-2 py-0.5 rounded">{selectedArticle.label}</span>
                      <h3 className="font-serif text-base font-bold text-stone-900 mt-1">{selectedArticle.title}</h3>
                    </div>
                    <button onClick={() => setSelectedArticle(null)} className="p-1 rounded-full hover:bg-stone-250 text-stone-500 cursor-pointer"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="p-6 overflow-y-auto space-y-4 text-xs md:text-sm text-stone-700 leading-relaxed whitespace-pre-line">{selectedArticle.content}</div>
                  <div className="p-4 bg-stone-150 border-t border-stone-200 flex justify-end"><button onClick={() => setSelectedArticle(null)} className="px-4 py-1.5 bg-stone-850 text-white rounded-xl text-xs font-bold cursor-pointer hover:bg-stone-900">Đóng lại</button></div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. EBOOKS TAB */}
        {libraryTab === "ebooks" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ebooks.map(eb => (
              <div key={eb.id} className="bg-white rounded-2xl border border-stone-200 flex flex-col justify-between overflow-hidden shadow-xs">
                <div className="p-5 bg-stone-50/80 border-b border-stone-150 relative h-28 flex flex-col justify-end">
                  <div className="absolute top-3 right-4 text-[8px] font-mono text-stone-400 uppercase">Vân Mộc Press</div>
                  <BookOpen className="w-6 h-6 text-[#5A5A40]/70 mb-1" />
                  <h5 className="font-serif text-xs font-bold text-stone-900">{eb.title}</h5>
                </div>
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-stone-600 leading-relaxed min-h-[50px]">{eb.desc}</p>
                  <div className="text-[10px] space-y-0.5 font-mono text-stone-500 pt-2.5 border-t border-stone-100">
                    <div>📖 Quy cách: <strong>{eb.pages}</strong></div>
                    <div>💿 Định dạng: <strong>{eb.format}</strong></div>
                    <div className="mt-2 inline-block text-[9px] px-2 py-0.5 rounded-full font-sans font-bold bg-[#5A5A40]/10 text-[#5A5A40]">{eb.status}</div>
                  </div>
                  <button onClick={handleOpenEbookCheckout} className="w-full py-2 bg-[#5A5A40] text-white hover:bg-[#484833] rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all mt-3 flex items-center justify-center gap-1 cursor-pointer"><Download className="w-3.5 h-3.5" /> Tải xuống ấn phẩm</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. WORKSHEETS TAB */}
        {libraryTab === "worksheets" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 flex flex-col gap-1.5 bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
              {[
                { id: "coaching", label: "Worksheet Coaching", sub: "Khai vấn đồng hành" },
                { id: "phanchieu", label: "Tự phản chiếu", sub: "Bài tập rũ bỏ dán nhãn" },
                { id: "phattrien", label: "Phát triển bản thân", sub: "Xác lập ranh giới tôn nghiêm" },
                { id: "journal", label: "Daily Journal", sub: "Nhật ký dòng chảy xả ly" }
              ].map(ws => (
                <button key={ws.id} onClick={() => { setActiveWorksheet(ws.id as any); setFeedback(null); }} className={`text-left p-3 rounded-xl transition-all border cursor-pointer ${activeWorksheet === ws.id ? "bg-[#5A5A40] border-[#5A5A40] text-[#F7F5F0] shadow-xs" : "bg-white text-stone-600 hover:bg-[#5A5A40]/5 border-stone-200"}`}>
                  <div className="text-xs font-bold uppercase tracking-wider">{ws.label}</div>
                  <div className="text-[9px] opacity-75 mt-0.5">{ws.sub}</div>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-white p-5 md:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
              <div className="border-b border-stone-100 pb-2.5">
                <h5 className="font-serif text-sm font-bold text-stone-900">{worksheets[activeWorksheet].title}</h5>
                <p className="text-[10px] text-stone-400 italic">{worksheets[activeWorksheet].desc}</p>
              </div>

              {feedback ? (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-250 text-xs md:text-sm text-stone-700 leading-relaxed whitespace-pre-line font-serif">{feedback}</div>
              ) : (
                <form onSubmit={handleWorksheetSubmit} className="space-y-4 text-left">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">{worksheets[activeWorksheet].q1}</label>
                      <textarea required value={worksheetAnswers[`${activeWorksheet}-1`] || ""} onChange={e => setWorksheetAnswers({ ...worksheetAnswers, [`${activeWorksheet}-1`]: e.target.value })} placeholder="Nhập câu trả lời phản tư khách quan..." className="w-full p-3 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-stone-50/50" rows={2} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 mb-1">{worksheets[activeWorksheet].q2}</label>
                      <textarea required value={worksheetAnswers[`${activeWorksheet}-2`] || ""} onChange={e => setWorksheetAnswers({ ...worksheetAnswers, [`${activeWorksheet}-2`]: e.target.value })} placeholder="Nhập câu trả lời phản tư khách quan..." className="w-full p-3 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-stone-50/50" rows={2} />
                    </div>
                  </div>
                  <div className="flex justify-end pt-1"><button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-[#5A5A40] text-white hover:bg-[#484833] rounded-xl text-[10px] font-bold uppercase tracking-wider disabled:opacity-50 flex items-center gap-1.5 cursor-pointer">{isSubmitting ? "Đang tiếp thấu cảm..." : "Gửi Nhật Trình"}</button></div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* 4. CHECKLISTS TAB */}
        {libraryTab === "checklists" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-4 flex flex-col gap-1.5">
              {[
                { id: "khichat", label: "Checklist Khí Chất" },
                { id: "phattrien", label: "Checklist Phát Triển" },
                { id: "nangluong", label: "Checklist Năng Lượng" },
                { id: "thuonghieu", label: "Checklist Thương Hiệu" }
              ].map(cl => (
                <button key={cl.id} onClick={() => setActiveChecklist(cl.id as any)} className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${activeChecklist === cl.id ? "bg-[#5A5A40] border-[#5A5A40] text-[#F7F5F0]" : "bg-white text-stone-600 hover:bg-[#5A5A40]/5 border-stone-200"}`}>
                  <span className="text-xs font-bold">{cl.label}</span>
                  <span className={`text-[9px] font-mono font-bold px-1 rounded ${activeChecklist === cl.id ? "bg-amber-100/20 text-amber-200" : "bg-stone-100 text-[#5A5A40]"}`}>{getChecklistPercent(cl.id === "khichat" ? "kc" : cl.id === "phattrien" ? "pt" : cl.id === "nangluong" ? "nl" : "th", 4)}%</span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-white p-5 md:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4 text-left">
              <div className="flex justify-between items-center border-b border-stone-100 pb-2.5">
                <div>
                  <h5 className="font-serif text-sm font-bold text-stone-900">{checklists[activeChecklist].title}</h5>
                  <p className="text-[10px] text-stone-400 mt-0.5">{checklists[activeChecklist].desc}</p>
                </div>
                <button onClick={handleOpenEbookCheckout} className="px-2 py-1 border border-stone-250 rounded text-[9px] font-bold text-stone-500 hover:bg-[#5A5A40]/5 flex items-center gap-1 cursor-pointer"><Download className="w-3 h-3" /> Tải PDF</button>
              </div>

              <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#5A5A40] h-full transition-all duration-300" style={{ width: `${getChecklistPercent(activeChecklist === "khichat" ? "kc" : activeChecklist === "phattrien" ? "pt" : activeChecklist === "nangluong" ? "nl" : "th", 4)}%` }}></div>
              </div>

              <div className="space-y-2 pt-1">
                {checklists[activeChecklist].items.map(item => {
                  const isChecked = checklistState[item.id] || false;
                  return (
                    <label key={item.id} onClick={() => toggleChecklist(item.id)} className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${isChecked ? "bg-[#5A5A40]/5 border-[#5A5A40]/30 text-stone-850" : "bg-white border-stone-150 text-stone-600"}`}>
                      <input type="checkbox" checked={isChecked} readOnly className="mt-0.5 rounded border-stone-300 text-[#5A5A40] focus:ring-[#5A5A40]" />
                      <span className="text-xs leading-relaxed">{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 5. AUDIO TAB */}
        {libraryTab === "audio" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <audio
              ref={audioRef}
              src={audioList[activeAudio]?.src || ""}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleAudioEnded}
            />

            {/* Hidden YouTube background audio player */}
            {audioList[activeAudio]?.youtubeId && (
              <div className="w-0 h-0 opacity-0 absolute pointer-events-none overflow-hidden" aria-hidden="true">
                <iframe
                  key={activeAudio}
                  ref={ytPlayerRef}
                  width="1"
                  height="1"
                  src={`https://www.youtube.com/embed/${audioList[activeAudio].youtubeId}?enablejsapi=1&autoplay=${isPlaying ? 1 : 0}&controls=0&rel=0`}
                  title={audioList[activeAudio].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            )}

            <div className="lg:col-span-5 bg-stone-900 text-[#F7F5F0] rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[260px]">
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-mono tracking-widest uppercase bg-[#5A5A40] text-amber-200 px-1.5 py-0.2 rounded">
                  Vân Mộc Soundscape
                </span>
                <span className="text-[9px] text-stone-400 font-mono">PLAYER</span>
              </div>
              <div className="flex items-center gap-3 py-1">
                <div className={`w-12 h-12 rounded-full bg-[#5A5A40] flex items-center justify-center border border-amber-200/20 ${isPlaying ? "animate-spin" : ""}`} style={{ animationDuration: "10s" }}>
                  <Headphones className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[8px] font-mono text-amber-200 uppercase">{audioList[activeAudio]?.type}</div>
                  <h5 className="font-serif text-xs font-bold text-white leading-tight line-clamp-2" title={audioList[activeAudio]?.title}>{audioList[activeAudio]?.title}</h5>
                  <p className="text-[9px] text-stone-400 font-mono">Thời lượng: {audioList[activeAudio]?.duration}</p>
                </div>
              </div>
              <div className="space-y-1">
                <div onClick={handleProgressClick} className="w-full bg-stone-800 h-2 rounded-full overflow-hidden cursor-pointer relative hover:h-2.5 transition-all">
                  <div className="bg-[#5A5A40] h-full rounded-full transition-all duration-105" style={{ width: `${audioProgress}%` }}></div>
                </div>
                <div className="flex justify-between text-[8px] font-mono text-stone-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{audioList[activeAudio]?.duration}</span>
                </div>
              </div>
              <div className="flex justify-center gap-3">
                <button onClick={() => setIsPlaying(!isPlaying)} className="w-9 h-9 rounded-full bg-[#5A5A40] text-white flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform">
                  {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
                </button>
                <button onClick={() => { setIsPlaying(false); setAudioProgress(0); setCurrentTime(0); if (audioRef.current) audioRef.current.currentTime = 0; }} className="p-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer text-[10px] uppercase font-bold tracking-wider">
                  Reset
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-2">
              {audioList.map((track, idx) => (
                <div key={idx} onClick={() => { setActiveAudio(idx); setAudioProgress(0); setCurrentTime(0); setIsPlaying(true); }} className={`p-3 rounded-xl border text-left cursor-pointer flex justify-between items-center transition-all ${activeAudio === idx ? "bg-[#5A5A40]/10 border-[#5A5A40]/30 font-bold" : "bg-white border-stone-200 hover:bg-stone-50"}`}>
                  <div className="flex-1 pr-3 min-w-0">
                    <span className="text-[8px] font-mono uppercase bg-stone-100 text-stone-500 px-1 py-0.2 rounded">{track.type}</span>
                    <h5 className="font-serif text-xs font-bold text-stone-800 leading-tight mt-0.5 line-clamp-1" title={track.title}>{track.title}</h5>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 shrink-0">{track.duration}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. VIDEOS TAB */}
        {libraryTab === "videos" && (
          <div className="w-full">
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {videos.map(vid => (
                  <div key={vid.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between shadow-xs">
                    <div className={`p-4 ${vid.color} h-32 flex flex-col justify-between relative`}>
                      <div className="flex justify-between items-center text-[9px] text-white/80 font-mono"><span className="bg-white/20 px-1.5 py-0.2 rounded uppercase">{vid.subject}</span><span>{vid.dur}</span></div>
                      <button onClick={() => setSelectedVideo(vid)} className="w-8 h-8 rounded-full bg-white/95 text-stone-900 flex items-center justify-center mx-auto cursor-pointer shadow"><Play className="w-3.5 h-3.5 ml-0.5 text-stone-900" /></button>
                      <div className="text-[8px] text-white/50 text-right font-mono">{vid.views}</div>
                    </div>
                    <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h5 className="font-serif text-xs font-bold text-stone-900 leading-snug line-clamp-2">{vid.title}</h5>
                        <p className="text-[10px] text-stone-500 leading-relaxed mt-1 line-clamp-2">Khóa bài giảng đúc kết tri thức thấu cảm và tự định vị bản thể độc bản Vân Mộc.</p>
                      </div>
                      <button onClick={() => setSelectedVideo(vid)} className="w-full py-2 border border-stone-250 text-stone-600 hover:bg-[#5A5A40]/5 rounded-xl text-[9px] font-bold uppercase tracking-wider mt-3 cursor-pointer">Xem bài giảng</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full py-16 text-center border border-dashed border-stone-200 rounded-2xl bg-white/40 space-y-3">
                <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                  <Video className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-bold text-stone-800">Hệ Thống Video Bài Giảng Đang Cập Nhật</h4>
                  <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">Nội dung video bài giảng học thuật của Vân Mộc đang được ghi hình chỉn chu và sẽ sớm hiển thị tại đây.</p>
                </div>
              </div>
            )}

            {selectedVideo && (
              <div className="fixed inset-0 bg-stone-900/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
                <div className="bg-black rounded-3xl max-w-2xl w-full overflow-hidden flex flex-col border border-stone-800 shadow-2xl">
                  <div className="p-4 bg-stone-900 text-white flex justify-between items-center">
                    <div>
                      <span className="text-[8px] uppercase font-bold bg-[#5A5A40] text-amber-200 px-1.5 py-0.2 rounded">{selectedVideo.subject}</span>
                      <h3 className="font-serif text-xs md:text-sm font-bold mt-1">{selectedVideo.title}</h3>
                    </div>
                    <button onClick={() => setSelectedVideo(null)} className="p-1 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
                  </div>
                  <div className="aspect-video bg-stone-950 flex items-center justify-center relative"><iframe className="w-full h-full" src={selectedVideo.url} title={selectedVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
                  <div className="p-3 bg-stone-900 text-stone-500 text-[9px] text-center font-mono">Hệ thống truyền thông học thuật Vân Mộc</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 7. RESOURCES TAB */}
        {libraryTab === "resources" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {/* Category 1 */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
              <h5 className="font-serif text-xs font-bold text-[#5A5A40] border-b border-stone-100 pb-2 flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-[#5A5A40]" /> <span>Sách Tinh Hoa Khuyên Đọc</span></h5>
              <div className="space-y-3">
                {resourcesData.books.map((bk, i) => (
                  <div key={i} className="space-y-0.5">
                    <h6 className="text-[11px] font-bold text-stone-900 leading-tight">{bk.title}</h6>
                    <div className="text-[9px] text-stone-400 font-mono">Tác giả: {bk.author}</div>
                    <p className="text-[9px] text-stone-500 leading-relaxed">{bk.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
              <h5 className="font-serif text-xs font-bold text-[#5A5A40] border-b border-stone-100 pb-2 flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#5A5A40]" /> <span>Công Cụ AI &amp; Mẫu Số</span></h5>
              <div className="space-y-3">
                {resourcesData.tools.map((tl, i) => (
                  <div key={i} className="space-y-1">
                    <h6 className="text-[11px] font-bold text-stone-900 leading-tight">{tl.name}</h6>
                    <div className="text-[8px] text-amber-800 bg-amber-50 border border-amber-200 px-1 rounded font-mono inline-block">{tl.type}</div>
                    <p className="text-[9px] text-stone-500 leading-relaxed pt-0.5">{tl.desc}</p>
                    <button onClick={() => { navigator.clipboard.writeText(`Hãy đóng vai một chuyên gia khai vấn đồng hành thông thái...`); alert("Đã sao chép prompt mẫu thành công!"); }} className="text-[8px] font-bold text-[#5A5A40] hover:underline cursor-pointer flex items-center gap-1"><Copy className="w-2.5 h-2.5" /> Sao chép Prompt</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3 shadow-xs">
              <h5 className="font-serif text-xs font-bold text-[#5A5A40] border-b border-stone-100 pb-2 flex items-center gap-1.5"><FolderOpen className="w-4 h-4 text-[#5A5A40]" /> <span>Biểu Mẫu &amp; Sóng Âm</span></h5>
              <div className="space-y-3">
                {resourcesData.links.map((ln, i) => (
                  <div key={i} className="space-y-1 flex flex-col justify-between">
                    <div>
                      <h6 className="text-[11px] font-bold text-stone-900 leading-tight">{ln.name}</h6>
                      <p className="text-[9px] text-stone-500 leading-relaxed">{ln.desc}</p>
                    </div>
                    <button onClick={handleOpenEbookCheckout} className="text-[8px] font-bold text-[#5A5A40] hover:underline cursor-pointer flex items-center gap-1 mt-1.5"><ExternalLink className="w-2.5 h-2.5" /> Truy cập tài nguyên</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
