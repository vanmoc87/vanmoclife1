import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  BookOpen,
  Compass,
  ArrowRight,
  Heart,
  ChevronRight,
  Send,
  Plus,
  X,
  User,
  Phone,
  Clock,
  Check,
  Download,
  Info,
  Lock,
  RotateCcw,
  Sparkle,
  ChevronLeft,
  Map,
  Activity,
  Calendar,
  LineChart,
  ClipboardList,
  UserCheck,
  FileText,
  Unlock,
  Copy,
  Trash2,
  Award,
  Search,
  GraduationCap,
  Database,
  Wifi,
  WifiOff,
  Upload,
  Video,
  Play,
  Pause,
  Headphones,
  FolderOpen,
  ExternalLink
} from "lucide-react";
import { LibraryView } from "./LibraryView";

// Types for NavigationViews
interface NavigationViewsProps {
  setActiveTab: (tab: string) => void;
  handleOpenEbookCheckout: (amount?: number, name?: string) => void;
  onJoinZaloGroup: () => void;
  hoSoActiveSubTab?: string;
  setHoSoActiveSubTab?: (subTab: string) => void;
}

// -------------------------------------------------------------
// 1. VAN MOC METHOD VIEW ⭐
// -------------------------------------------------------------
export const VanMocMethodView: React.FC<NavigationViewsProps> = ({ setActiveTab, handleOpenEbookCheckout }) => {
  const [selectedStage, setSelectedStage] = useState<number>(0);

  const stages = [
    {
      id: 1,
      title: "Hiểu Bản Thân",
      subtitle: "Gốc rễ của mọi hành trình",
      description: "Nhận diện bản đồ năng lượng gốc, thấu suốt thiên hướng và tài năng bẩm sinh qua Thần số học & phản tư bản ngã. Đây là bước đầu tiên để bạn ngừng phán xét chính mình và bắt đầu ôm ấp những nét tính cách nguyên bản.",
      tools: ["Bản đồ Thần số học chuyên sâu", "Bài trắc nghiệm phản chiếu cá nhân", "Gốc năng lượng sinh học"],
      takeaway: "Công cụ thần số học chỉ là PHƯƠNG TIỆN giúp ta gọi tên các bài học cuộc đời, đích đến vẫn là sự tự nhận thức tĩnh lặng.",
      bgAccent: "bg-amber-50/50 border-amber-200"
    },
    {
      id: 2,
      title: "Khám Phá Bản Sắc",
      subtitle: "Định vị tiếng nói độc bản",
      description: "Định vị hệ thống giá trị cốt lõi, tìm ra tiếng nói độc bản và những gì thực sự nuôi dưỡng nguồn cảm hứng sống của bạn. Bạn sẽ biết điều gì khiến mình hạnh phúc đích thực, tách biệt khỏi kỳ vọng xã hội.",
      tools: ["Bộ thẻ phản tư giá trị sống", "Liệu trình thiết kế phong thái cá nhân", "Phân tích lăng kính nhân sinh"],
      takeaway: "Bản sắc không phải thứ cần tìm kiếm bên ngoài, nó là sự gột rửa những lớp định kiến để lộ ra viên ngọc nguyên sơ bên trong.",
      bgAccent: "bg-emerald-50/50 border-emerald-200"
    },
    {
      id: 3,
      title: "Chuyển Hóa Niềm Tin",
      subtitle: "Giải phóng tổn thương cũ",
      description: "Phát hiện các khối niềm tin giới hạn, những khuôn mẫu tổn thương cũ và giải phóng chúng bằng Coaching & Tâm lý học phản chiếu. Bạn học cách làm hòa với quá khứ, tháo gỡ các nút thắt cảm xúc từ thuở thơ ấu.",
      tools: ["Khai vấn phản chiếu niềm tin giới hạn", "Trị liệu viết dòng chảy tâm thức", "Tham vấn tâm lý học nhận thức hành vi (CBT)"],
      takeaway: "Niềm tin giới hạn giống như một thấu kính mờ đục. Khi lau sạch thấu kính, thế giới xung quanh bỗng chốc sáng rõ và rộng mở.",
      bgAccent: "bg-stone-50 border-stone-200"
    },
    {
      id: 4,
      title: "Cân Bằng Nội Tâm",
      subtitle: "Nuôi dưỡng sự bình an tầng sâu",
      description: "Nuôi dưỡng sự bình an, tiếp đất vững vàng và thanh tẩy năng lượng tầng sâu với Thạch anh & Reiki. Đây là lúc trường sinh học của bạn được nuôi dưỡng, tái tạo và bảo vệ khỏi những xáo động tiêu cực bên ngoài.",
      tools: ["Vòng đá tinh thể thiết kế riêng", "Trị liệu dòng chảy Reiki", "Thiền định tiếp đất (Grounding)"],
      takeaway: "Tinh thể thạch anh hay Reiki là phương tiện tiếp đất và ổn định sóng não, giúp tâm trí đủ lặng để tự chữa lành.",
      bgAccent: "bg-blue-50/40 border-blue-200"
    },
    {
      id: 5,
      title: "Kiến Tạo Khí Chất",
      subtitle: "Sống tỏa sáng từ cốt cách",
      description: "Định hình khí chất & nghệ thuật biểu đạt bản sắc sống, cách đối nhân xử thế và xây dựng trường năng lượng tự tin bên ngoài dựa trên nội lực thuần khiết bên trong. Khí chất đích thực không đến từ sự phô trương, mà là thần thái tự nhiên, điềm tĩnh.",
      tools: ["Bản đồ khí chất & nghệ thuật biểu đạt bản sắc nguyên bản", "Nghi thức rèn luyện tâm tính hằng ngày", "Nghệ thuật giao tiếp thấu cảm"],
      takeaway: "Khí chất là hương thơm tỏa ra từ một tâm hồn tự tại. Không cần cố gắng gây chú ý, bạn vẫn có sức hút riêng biệt.",
      bgAccent: "bg-rose-50/40 border-rose-200"
    },
    {
      id: 6,
      title: "Sống Đúng Bản Sắc",
      subtitle: "Kiến tạo cuộc sống tự chủ",
      description: "Làm chủ cuộc sống, tự tin đưa ra các quyết định sáng suốt và cống hiến giá trị đích thực cho cộng đồng. Bạn không còn chạy theo các tiêu chuẩn thành công của người khác mà tự tay vẽ nên lộ trình thịnh vượng của riêng mình.",
      tools: ["Hệ thống lập kế hoạch hành động trực giác", "Cộng đồng đồng hành trọn đời", "Khai vấn mục tiêu tối thượng"],
      takeaway: "Sống đúng bản sắc là đỉnh cao của sự tự do — khi suy nghĩ, lời nói, hành động và linh hồn của bạn hòa làm một.",
      bgAccent: "bg-purple-50/40 border-purple-200"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Intro Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-3 py-1 rounded-full">Trái tim của Vân Mộc</span>
        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
          Vân Mộc Method<span className="text-[#5A5A40]">.</span>
        </h2>
        <p className="text-xs font-semibold uppercase tracking-wider italic text-[#5A5A40]">
          (Phương pháp Vân Mộc)
        </p>
        <p className="text-stone-600 font-serif italic text-sm md:text-base leading-relaxed">
          “Vân Mộc Method là hệ thống phát triển con người được xây dựng nhằm giúp mỗi người hiểu rõ bản thân, chuyển hóa nội tâm và kiến tạo cuộc sống đúng với bản sắc riêng.”
        </p>
        <div className="h-[1px] w-24 bg-[#5A5A40]/30 mx-auto pt-2"></div>
      </div>

      {/* Grid: Interactive Interactive Timeline and Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        
        {/* Left column: Vertical timeline selector */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="text-xs uppercase tracking-widest font-bold text-stone-400 mb-2 pl-3">6 Giai đoạn phát triển</div>
          {stages.map((stg, idx) => (
            <button
              key={stg.id}
              onClick={() => setSelectedStage(idx)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                selectedStage === idx
                  ? "bg-[#5A5A40] text-white border-[#5A5A40] shadow-md translate-x-1"
                  : "bg-white text-stone-700 border-stone-200 hover:bg-[#5A5A40]/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold border ${
                  selectedStage === idx ? "bg-white/20 border-white/40 text-white" : "bg-stone-100 border-stone-200 text-stone-500"
                }`}>
                  0{stg.id}
                </span>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">{stg.title}</h4>
                  <p className={`text-[10px] mt-0.5 ${selectedStage === idx ? "text-white/80" : "text-stone-400"}`}>
                    {stg.subtitle}
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${selectedStage === idx ? "text-white" : "text-stone-400"}`} />
            </button>
          ))}
        </div>

        {/* Right column: Main detailed content showcase */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStage}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className={`p-8 rounded-3xl border ${stages[selectedStage].bgAccent} shadow-xs space-y-6 text-left relative overflow-hidden`}
            >
              {/* Decorative design corner block */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#5A5A40]/5 rounded-bl-full flex items-center justify-center pointer-events-none">
                <Sparkles className="w-10 h-10 text-[#5A5A40]/20 translate-x-3 -translate-y-3" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#5A5A40] font-bold">GIAI ĐOẠN 0{stages[selectedStage].id}</span>
                <h3 className="text-2xl md:text-3xl font-serif text-stone-900 mt-1 mb-2 font-semibold">
                  {stages[selectedStage].title}
                </h3>
                <p className="text-[#5A5A40] text-xs font-semibold uppercase tracking-wider italic">
                  {stages[selectedStage].subtitle}
                </p>
              </div>

              <p className="text-stone-700 leading-relaxed text-sm md:text-base font-sans">
                {stages[selectedStage].description}
              </p>

              {/* Tools list */}
              <div className="space-y-2 pt-2">
                <h5 className="text-[11px] uppercase font-bold tracking-widest text-stone-500">Các phương tiện thực hành tương ứng:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {stages[selectedStage].tools.map((tool, tIdx) => (
                    <div key={tIdx} className="flex items-center gap-2 text-xs text-stone-700 bg-white/70 p-2.5 rounded-xl border border-stone-200/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5A5A40]"></span>
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Core takeaway */}
              <div className="p-4 bg-[#5A5A40]/5 border-l-2 border-[#5A5A40] rounded-r-xl space-y-1">
                <div className="flex items-center gap-1.5 text-[9px] uppercase font-mono tracking-wider font-bold text-[#5A5A40]">
                  <Info className="w-3.5 h-3.5" />
                  <span>Điều cốt lõi của phương pháp</span>
                </div>
                <p className="text-xs text-stone-700 font-medium leading-relaxed">
                  {stages[selectedStage].takeaway}
                </p>
              </div>

              {/* Quick Call to Action */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab("ban_do_phat_trien")}
                  className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#484833] text-white rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <span>Xem Bản đồ Phát triển</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleOpenEbookCheckout}
                  className="px-5 py-2.5 border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer"
                >
                  Tải tài liệu chi tiết
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Quote Block */}
      <div className="p-8 md:p-12 rounded-3xl bg-stone-950 text-stone-200 text-center relative overflow-hidden mt-12 shadow-sm">
        <div className="absolute right-0 bottom-0 opacity-10">
          <Compass className="w-64 h-64 translate-x-12 translate-y-12" />
        </div>
        <div className="max-w-xl mx-auto z-10 relative space-y-4">
          <span className="text-[10px] uppercase tracking-widest font-mono text-amber-200 font-bold block">Tuyên ngôn triết lý</span>
          <h3 className="text-2xl md:text-3xl font-serif italic text-white font-normal leading-snug">
            “Chúng tôi không thay đổi con người bạn. Chúng tôi giúp bạn nhìn thấy chính mình.”
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed font-sans max-w-md mx-auto">
            Học thuyết Vân Mộc nhấn mạnh việc thấu suốt bản ngã hằng ngày thông qua các công cụ phản tư. Chúng tôi biến đá quý, Reiki, Coaching, và Thần số học thành những công cụ soi chiếu nội tâm kỳ diệu.
          </p>
        </div>
      </div>
    </div>
  );
};


// -------------------------------------------------------------
// 2. THU VIEN TRI THUC VIEW ⭐
// -------------------------------------------------------------
export const ThuVienTriThucView: React.FC<NavigationViewsProps> = () => {
  const [activeCategory, setActiveCategory] = useState<string>("concept");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedConcept, setSelectedConcept] = useState<any | null>(null);

  const categories = [
    { key: "concept", label: "Khái niệm chung" },
    { key: "self", label: "Hiểu bản thân" },
    { key: "psychology", label: "Tâm lý học" },
    { key: "coaching", label: "Coaching" },
    { key: "numerology", label: "Thần số học" },
    { key: "energy", label: "Năng lượng & Đá" },
    { key: "style", label: "Khí chất & Nghệ thuật Biểu đạt Bản sắc" },
    { key: "relationships", label: "Mối quan hệ" },
    { key: "career", label: "Sự nghiệp" }
  ];

  // 100 concepts under multiple categories (sample highly detailed curated list)
  const concepts = [
    {
      id: "niem_tin",
      title: "Niềm tin (Belief)",
      category: "psychology",
      summary: "Hệ thống thấu kính định hình cách chúng ta nhìn nhận bản thân, người khác và thế giới xung quanh.",
      psychology: "Theo Tâm lý học nhận thức hành vi (CBT), niềm tin cốt lõi (Core Beliefs) là những lăng kính sâu sắc nhất được hình thành từ trải nghiệm đầu đời. Chúng quyết định cách chúng ta giải thích sự việc diễn ra hằng ngày và điều chỉnh hành vi tự động.",
      coaching: "Trong Khai vấn (Coaching), niềm tin được phân loại thành Niềm tin Thúc đẩy (Empowering Beliefs) giúp khai phá tiềm năng, và Niềm tin Giới hạn (Limiting Beliefs) kiềm hãm sự phát triển. Khai vấn tập trung vào việc đặt câu hỏi để khách hàng tự nhận diện và tái cấu trúc niềm tin giới hạn.",
      numerology: "Trong Thần số học, niềm tin được phản ánh qua các chỉ số bài học đường đời và thái độ. Nó cho thấy cách một người tin vào tiềm năng linh hồn của mình dựa trên tần số rung động của các con số.",
      van_moc: "Vân Mộc tin rằng niềm tin giống như rễ cây. Nếu rễ cây bị nhiễm độc bởi các định kiến tổn thương cũ, bông hoa cuộc đời sẽ héo úa. Để thay đổi cuộc sống, phải quay về xới đất, làm lành vết thương ở rễ.",
      exercise: "1. Viết ra 3 điều bạn tin là đúng về bản thân (Ví dụ: 'Tôi không đủ giỏi').\n2. Tự vấn: 'Điều này có tuyệt đối đúng 100% không? Có bằng chứng ngược lại không?'\n3. Viết lại một niềm tin mới, mềm mại hơn: 'Tôi đang trên hành trình học tập và hoàn thiện mỗi ngày.'",
      tags: ["Niềm tin", "CBT", "Phản tư", "Lăng kính"]
    },
    {
      id: "tu_tin",
      title: "Sự Tự Tin Nguyên Bản (Authentic Confidence)",
      category: "self",
      summary: "Cảm giác an tâm tuyệt đối vào giá trị tồn tại của bản thân mà không cần so sánh hay phô trương bên ngoài.",
      psychology: "Tâm lý học tích cực xem sự tự tin là sự tự hiệu quả (Self-Efficacy) - lòng tin vào năng lực hành động để đạt kết quả. Tự tin lành mạnh đi kèm với sự chấp nhận bản thân vô điều kiện.",
      coaching: "Khai vấn nhìn nhận tự tin là một cơ bắp được rèn luyện qua việc dám hành động bất chấp nỗi sợ hãi, lấy các chiến thắng nhỏ hằng ngày làm điểm tựa.",
      numerology: "Gắn liền với chỉ số Ngày sinh và chỉ số Sức mạnh. Cho thấy cách thức cá nhân thể hiện năng lượng lãnh đạo bản thân khi đối mặt với thử thách.",
      van_moc: "Sự tự tin đích thực không có tiếng ồn. Nó là sự tĩnh lặng của một người biết rõ mình là ai, chấp nhận cả ánh sáng lẫn bóng tối trong mình.",
      exercise: "Mỗi tối, hãy viết xuống 3 hành động nhỏ bạn đã thực hiện đúng với giá trị của mình hôm nay, không mưu cầu sự công nhận từ bất kỳ ai.",
      tags: ["Tự tin", "Sức mạnh", "Nội lực"]
    },
    {
      id: "ton_thuong",
      title: "Tổn Thương Bản Ngã (Ego Wounds)",
      category: "psychology",
      summary: "Những vết rạn trong cấu trúc bản ngã xuất hiện khi nhu cầu yêu thương và công nhận bị từ chối.",
      psychology: "Tâm lý học chiều sâu chỉ ra tổn thương thường liên quan đến 'đứa trẻ bên trong' (Inner Child). Khi gặp biến cố ở hiện tại, bản ngã kích hoạt cơ chế phòng vệ tự động để tránh cảm giác đau đớn cũ.",
      coaching: "Khai vấn giúp khách hàng đứng ở vị trí 'người quan sát' để tách biệt cảm xúc hiện tại khỏi vết thương quá khứ, từ đó đưa ra lựa chọn hành động thông thái.",
      numerology: "Thể hiện qua các chỉ số Nợ Nghiệp (Karmic Debt) 13, 14, 16, 19, nhắc nhở về các bài học cần chuyển hóa trọn vẹn trong kiếp sống này.",
      van_moc: "Tổn thương không phải lỗi của bạn, nhưng chữa lành nó là trách nhiệm của bạn với cuộc đời mình. Tổn thương chính là vết nứt để ánh sáng thấu suốt đi vào.",
      exercise: "Khi cảm thấy tức giận hoặc tổn thương kích hoạt, dừng lại 3 nhịp thở. Tự hỏi: 'Cảm giác đau đớn này thực chất bắt nguồn từ sự việc lúc này, hay từ ký ức nào trong quá khứ?'",
      tags: ["Inner Child", "Vết thương", "Cơ chế phòng vệ"]
    },
    {
      id: "nang_luong_da",
      title: "Trường Năng Lượng Đá Tự Nhiên (Crystal Biofield)",
      category: "energy",
      summary: "Sự tương tác tần số rung động giữa tinh thể thạch anh và sinh học con người.",
      psychology: "Tâm lý học môi trường ghi nhận các vật liệu tự nhiên có tác dụng giảm căng thẳng, tăng sóng alpha trong não thông qua kích thích giác quan và hiệu ứng giả dược tích cực (placebo).",
      coaching: "Đá quý được sử dụng như một neo tâm trí (Anchor) giúp lưu giữ trạng thái bình yên, tỉnh thức trong các buổi khai vấn.",
      numerology: "Mỗi loại đá tương ứng với tần số của một con số (Ví dụ: Thạch anh tím tương ứng với số 7 hoặc số 9 hướng tâm linh).",
      van_moc: "Chúng tôi xem vòng đá như người bạn tiếp đất. Khi bạn đeo vòng đá, năng lượng tự nhiên của đất mẹ nhắc nhở bạn giữ sự điềm tĩnh và bảo vệ trường khí lành quanh mình.",
      exercise: "Dành 5 phút mỗi sáng cầm viên thạch anh trong tay, nhắm mắt tập trung vào nhịp thở và gieo một ý niệm bình an cho ngày mới.",
      tags: ["Tinh thể", "Trị liệu", "Tần số", "Reiki"]
    },
    {
      id: "ranh_gioi",
      title: "Ranh Giới Cá Nhân (Personal Boundaries)",
      category: "relationships",
      summary: "Đường giới hạn vô hình phân định rõ đâu là trách nhiệm, cảm xúc của mình và đâu là của người khác.",
      psychology: "Thiết lập ranh giới giúp ngăn chặn hội chứng đồng phụ thuộc (Codependency) và bảo vệ sức khỏe tâm thần khỏi sự thao túng cảm xúc.",
      coaching: "Khai vấn ranh giới tập trung vào việc rèn luyện dũng khí nói 'Không' một cách tử tế và xác định vùng an toàn cho năng lượng cá nhân.",
      numerology: "Bài học lớn của người có chỉ số đường đời số 2 (học cách thiết lập ranh giới thấu cảm) hoặc số 8 (học cách làm chủ không gian quyền lực cá nhân).",
      van_moc: "Ranh giới không phải là một bức tường để cô lập. Ranh giới là một cánh cửa có khóa, giúp bạn chủ động lựa chọn ai và năng lượng nào được phép bước vào cuộc đời bạn.",
      exercise: "Liệt kê 2 việc bạn đang làm hộ người khác khiến bạn kiệt sức. Lên kế hoạch trả lại trách nhiệm đó cho họ một cách chân thành và rõ ràng.",
      tags: ["Ranh giới", "Độc lập", "Mối quan hệ", "Thấu cảm"]
    },
    {
      id: "ban_sac_ca_nhan",
      title: "Bản sắc cá nhân (Personal Identity)",
      category: "style",
      summary: "Giá trị cốt lõi, niềm tin và những nét độc bản làm nên sự riêng biệt không thể nhầm lẫn của mỗi cá thể.",
      psychology: "Theo thuyết tâm lý học nhân văn, bản sắc cá nhân được hình thành khi con người đạt được sự tự hiện thực hóa (Self-Actualization), dung hợp giữa cái tôi lý tưởng và cái tôi thực tế.",
      coaching: "Khai vấn giúp cá nhân bóc tách các lớp kỳ vọng xã hội để khám phá ra những giá trị sống đích thực và đam mê sâu kín của chính mình.",
      numerology: "Được thể hiện rõ qua chỉ số Sứ mệnh và chỉ số Linh hồn - khát khao sâu kín nhất định hình nên động lực hành động thực sự của bạn.",
      van_moc: "Bản sắc cá nhân là dấu vân tay của linh hồn. Thay vì cố gắng trở thành một bản sao hoàn hảo của ai đó, hãy dũng cảm là bản chính nguyên bản và rực rỡ nhất.",
      exercise: "Viết ra 5 tính từ mô tả chân thực nhất về con người bạn khi ở một mình và không phải gồng gánh bất kỳ vai trò xã hội nào.",
      tags: ["Bản sắc", "Độc bản", "Self-Actualization"]
    },
    {
      id: "khi_chat_than_thai",
      title: "Khí chất & Thần thái (Aura & Charisma)",
      category: "style",
      summary: "Sức hút vô hình tỏa ra từ trạng thái năng lượng, sự tự tin tự tại bên trong và sự điềm tĩnh trong phong thái.",
      psychology: "Tâm lý học hành vi chỉ ra thần thái là kết quả của sự nhất quán giữa ngôn ngữ cơ thể, tư thế đứng/ngồi và nồng độ cortisol (căng thẳng) thấp thể hiện qua ánh mắt.",
      coaching: "Tập trung khai phá sự hiện diện tỉnh thức (Mindful Presence). Khi bạn hoàn toàn có mặt ở hiện tại, trường năng lượng của bạn sẽ tự động thu hút người xung quanh.",
      numerology: "Liên kết mạnh mẽ với chỉ số Nhân cách - cách bạn phản chiếu năng lượng ra thế giới bên ngoài và tạo ấn tượng đầu tiên.",
      van_moc: "Thần thái là hương thơm của tâm hồn. Nó không đến từ việc cố gắng gây chú ý, mà đến từ sự tĩnh lặng của một người biết rõ giá trị của mình.",
      exercise: "Thực hành đứng thẳng, thả lỏng vai, thở chậm bằng bụng và duy trì ánh mắt ấm áp khi giao tiếp với người đối diện.",
      tags: ["Khí chất", "Thần thái", "Aura", "Sức hút"]
    },
    {
      id: "makeup_lam_dep",
      title: "Makeup & Làm đẹp (Conscious Beauty & Makeup)",
      category: "style",
      summary: "Nghệ thuật tôn vinh và làm nổi bật những đường nét tự nhiên trên gương mặt như một nghi thức trân quý bản thân.",
      psychology: "Liệu pháp làm đẹp tỉnh thức giúp tăng cường hình ảnh bản thân (Self-Image) và giải phóng các dopamine tích cực khi chúng ta nâng niu cơ thể.",
      coaching: "Nhìn nhận makeup là công cụ để thể hiện cảm xúc và bản sắc trong ngày, biến thời gian trang điểm thành khoảnh khắc kết nối sâu sắc với chính mình.",
      numerology: "Sử dụng màu sắc và phong cách trang điểm cộng hưởng với năng lượng của con số Ngày sinh để kích hoạt sự tự tin bẩm sinh.",
      van_moc: "Trang điểm không phải là để che giấu khuyết điểm hay biến thành một người khác, mà là cách bạn vẽ lên bức tranh dung mạo thiêng liêng đất trời ban tặng.",
      exercise: "Mỗi sáng khi trang điểm hoặc chăm sóc da, hãy nhìn vào gương, mỉm cười và gửi một lời cảm ơn chân thành đến gương mặt mình.",
      tags: ["Makeup", "Làm đẹp", "Chăm sóc da", "Self-Love"]
    },
    {
      id: "phong_cach_thoi_trang",
      title: "Phong cách thời trang (Styling)",
      category: "style",
      summary: "Ngôn ngữ không lời mạnh mẽ nhất phản chiếu thế giới quan, tính cách và gu thẩm mỹ riêng biệt thông qua trang phục.",
      psychology: "Tâm lý học thời trang (Enclothed Cognition) chứng minh rằng trang phục ảnh hưởng trực tiếp đến trạng thái tâm lý, tư duy và hiệu suất làm việc của người mặc.",
      coaching: "Đồng hành giúp bạn định hình phong cách ăn mặc nhất quán với mục tiêu cuộc sống và giá trị cốt lõi, xóa bỏ sự hoang mang trước các xu hướng nhất thời.",
      numerology: "Sự tương thích giữa gu thời trang (tối giản, cổ điển, phá cách...) và các con số cốt lõi trong bản đồ thần số cá nhân.",
      van_moc: "Thời trang là nghệ thuật mặc lên mình câu chuyện của chính bạn. Hãy mặc những bộ trang phục khiến bạn cảm thấy tự do và được tôn nghiêm nhất.",
      exercise: "Chọn ra 3 bộ trang phục trong tủ đồ khiến bạn cảm thấy tự tin, thoải mái nhất và phân tích xem chúng có điểm chung gì về phom dáng, chất liệu.",
      tags: ["Thời trang", "Styling", "Gu thẩm mỹ", "Enclothed Cognition"]
    },
    {
      id: "trang_suc_phu_kien",
      title: "Trang sức & Phụ kiện (Accessories)",
      category: "style",
      summary: "Những điểm nhấn tinh tế hoàn thiện phong cách, đồng thời đóng vai trò là vật phẩm neo giữ năng lượng và sự tỉnh thức.",
      psychology: "Các phụ kiện mang tính kỷ niệm hoặc làm từ chất liệu tự nhiên giúp kích hoạt cơ chế tự trấn an và củng cố cảm giác an toàn.",
      coaching: "Sử dụng trang sức (đặc biệt là vòng đá tự nhiên) như một vật neo tâm trí (Anchor). Mỗi khi nhìn thấy hoặc chạm vào, bạn quay về với hiện tại.",
      numerology: "Lựa chọn phụ kiện và đá quý có tần số rung động tương thích để bổ trợ cho những năng lượng còn thiếu trong bản đồ số cá nhân.",
      van_moc: "Trang sức không dùng để khoe khoang phú quý. Trang sức của Vân Mộc là lời nhắc thầm lặng về sự tôn quý, bảo vệ trường năng lượng an lành quanh bạn.",
      exercise: "Chọn một món trang sức bạn yêu thích nhất, cầm trong tay và gieo cho nó một ý niệm tích cực (Ví dụ: Sự điềm tĩnh, Tình yêu thương) trước khi đeo.",
      tags: ["Trang sức", "Phụ kiện", "Vật neo tâm trí", "Đá quý"]
    },
    {
      id: "mau_sac_ca_nhan",
      title: "Màu sắc cá nhân (Personal Color)",
      category: "style",
      summary: "Khoa học về sự tương thích sắc độ màu da, tóc, mắt giúp tôn vinh diện mạo rạng rỡ và tràn đầy sinh khí.",
      psychology: "Liệu pháp màu sắc (Chromotherapy) chứng minh các bước sóng màu sắc tác động mạnh mẽ đến hệ thần kinh, cảm xúc và khả năng tương tác xã hội.",
      coaching: "Ứng dụng bảng màu cá nhân để tối ưu tủ đồ thông minh, giúp bạn luôn đưa ra lựa chọn trang phục nhanh chóng và đầy tự tin.",
      numerology: "Sự hòa hợp giữa sắc màu sinh học cá nhân và màu sắc đại diện cho tần số rung động của năm cá nhân hoặc con số chủ đạo.",
      van_moc: "Màu sắc cá nhân là bản giao hương ánh sáng của riêng bạn. Khi chọn đúng tần số màu sắc, bạn đang đồng điệu với năng lượng tự nhiên của chính mình.",
      exercise: "Đặt các tấm vải màu ấm (ấm áp, sắc vàng) và màu lạnh (mát mẻ, sắc xanh) dưới cằm dưới ánh sáng tự nhiên để quan sát sắc da mình sáng lên ở tông màu nào.",
      tags: ["Personal Color", "Màu sắc", "Năng lượng màu", "Sinh khí"]
    },
    {
      id: "ty_le_co_the",
      title: "Tỷ lệ cơ thể (Body Shape)",
      category: "style",
      summary: "Thấu hiểu phom dáng hình học của cơ thể để lựa chọn trang phục phù hợp, kết hợp với tinh thần trân trọng mọi dáng vẻ tự nhiên.",
      psychology: "Học thuyết Chấp nhận Cơ thể (Body Neutrality) hướng tới việc nhìn nhận cơ thể một cách khách quan, trân trọng chức năng sinh học hơn là áp đặt các khuôn mẫu thẩm mỹ khắt khe.",
      coaching: "Xây dựng tư duy thời trang tôn dáng: Không có cơ thể không hoàn hảo, chỉ có trang phục chưa được thiết kế đúng tỷ lệ để tôn vinh bạn.",
      numerology: "Liên kết với bài học về việc làm hòa với cơ thể vật lý ở thế giới vật chất (liên quan đến bài học của số 4 hoặc số 8).",
      van_moc: "Cơ thể bạn là ngôi đền thiêng liêng trú ngụ của linh hồn. Hãy thấu hiểu tỷ lệ của nó để bao bọc nó bằng sự vừa vặn, mềm mại và trân trọng nhất.",
      exercise: "Đứng trước gương toàn thân, gửi lời biết ơn đến đôi chân đã nâng đỡ bạn, đôi tay đã lao động và cơ thể đã bảo vệ bạn suốt năm tháng qua.",
      tags: ["Body Shape", "Body Acceptance", "Tỷ lệ cơ thể", "Tự trân quý"]
    },
    {
      id: "ngon_ngu_co_the",
      title: "Ngôn ngữ cơ thể (Body Language)",
      category: "style",
      summary: "Hệ thống giao tiếp không lời bao gồm tư thế, cử chỉ, nét mặt phản ánh trung thực nhất thế giới nội tâm của bạn.",
      psychology: "Theo nghiên cứu của GS. Albert Mehrabian, ngôn ngữ cơ thể chiếm đến 55% hiệu quả của một cuộc giao tiếp, thể hiện sự chân thành và mức độ tự tin.",
      coaching: "Rèn luyện các tư thế mở (Power Posing) để thay đổi nồng độ nội tiết tố trong cơ thể, giúp giảm lo âu trước những sự kiện quan trọng.",
      numerology: "Phản ánh phong thái hành động tự nhiên của con số thái độ và năng lượng biểu đạt của số Nhân cách.",
      van_moc: "Ngôn ngữ cơ thể không nói dối. Khi tâm trí bạn an yên và tự tại, từng bước đi, cái gật đầu hay cử chỉ tay của bạn sẽ tự động tỏa ra sự uy nghiêm, lịch thiệp.",
      exercise: "Mỗi khi bước đi, hãy tưởng tượng có một sợi chỉ vô hình kéo đỉnh đầu bạn hướng nhẹ lên trời, giữ cằm song song với mặt đất và vai thả lỏng.",
      tags: ["Ngôn ngữ cơ thể", "Thần thái", "Giao tiếp không lời", "Sự hiện diện"]
    },
    {
      id: "giao_tiep_giong_noi",
      title: "Giao tiếp & Giọng nói",
      category: "style",
      summary: "Nghệ thuật sử dụng âm điệu, tốc độ lời nói và phương pháp lắng nghe sâu sắc để kết nối trọn vẹn với người đối diện.",
      psychology: "Giao tiếp phi bạo lực (NVC) nhấn mạnh việc bày tỏ nhu cầu và cảm xúc cá nhân một cách trung thực mà không phán xét hay đổ lỗi.",
      coaching: "Khai phá sức mạnh của giọng nói từ luân xa cổ họng (Throat Chakra), rèn luyện ngữ điệu ấm áp, rõ ràng và có khoảng dừng thông thái.",
      numerology: "Thể hiện rõ ràng năng lượng biểu đạt qua chỉ số Ngày sinh, chỉ số Thái độ và chỉ số Sứ mệnh khi truyền đạt thông tin.",
      van_moc: "Lời nói ra cần đi qua 3 cổng gác: Điều này có thật không? Có tử tế không? Có cần thiết lúc này không? Giọng nói tĩnh lặng chứa đựng sức mạnh chuyển hóa vĩ đại.",
      exercise: "Tập thở bụng sâu trước khi nói. Khi nói, hãy giảm tốc độ xuống 10% so với bình thường và chú ý nhấn nhá vào những từ khóa quan trọng.",
      tags: ["Giao tiếp thấu cảm", "NVC", "Giọng nói", "Luân xa cổ họng"]
    },
    {
      id: "nghi_thuc_ung_xu",
      title: "Nghi thức ứng xử (Etiquette)",
      category: "style",
      summary: "Quy chuẩn ứng xử lịch thiệp, tôn trọng ranh giới và tạo sự dễ chịu, ấm áp cho mọi người xung quanh trong mọi bối cảnh.",
      psychology: "Nhi thức ứng xử là công cụ xây dựng sự an toàn xã hội (Social Safety), giúp giảm bớt các xung đột tiềm ẩn và củng cố sự gắn kết cộng đồng.",
      coaching: "Ứng xử thanh lịch là tấm danh thiếp vô hình. Khai vấn nghi thức tập trung vào việc thể hiện sự tôn trọng chân thành với bản thân và người khác.",
      numerology: "Liên quan sâu sắc đến bài học hòa hợp của số 2, số 6 (sự thấu cảm, yêu thương) và số 9 (tình nhân ái bao la).",
      van_moc: "Nghi thức ứng xử đích thực không phải là sự giả tạo xã giao, mà là tình yêu thương và sự thấu cảm tinh tế được cụ thể hóa bằng hành động lịch thiệp.",
      exercise: "Thực hành gửi lời chào và lời cảm ơn kèm theo một nụ cười ấm áp bằng ánh mắt với bất kỳ ai hỗ trợ bạn trong ngày hôm nay.",
      tags: ["Etiquette", "Thanh lịch", "Tử tế", "Ứng xử"]
    },
    {
      id: "lifestyle_nghe_thuat_song",
      title: "Lifestyle & Nghệ thuật sống",
      category: "style",
      summary: "Thiết kế không gian sống, thói quen sinh hoạt và các sở thích cá nhân thành một tác phẩm nghệ thuật nuôi dưỡng tinh thần.",
      psychology: "Tâm lý học môi trường khẳng định không gian sống ngăn nắp, thoáng đãng và có yếu tố tự nhiên giúp giảm 30% mức độ căng thẳng thần kinh.",
      coaching: "Hỗ trợ thiết kế một lối sống chậm (Slow Living) có chủ đích, cân bằng giữa công việc, gia đình và thời gian dành riêng cho sự phát triển cá nhân.",
      numerology: "Sự tương thích giữa phong cách sống và con số bài học đường đời của bạn (Ví dụ: Số 7 cần góc tĩnh lặng, số 5 cần sự xê dịch sáng tạo).",
      van_moc: "Mỗi góc nhỏ trong nhà, mỗi tách trà bạn pha, mỗi cuốn sách bạn đọc đều là tấm gương phản chiếu trật tự nội tâm của bạn. Hãy sống một cách chậm rãi và thấu đáo.",
      exercise: "Dọn dẹp và sắp xếp lại một góc nhỏ trong phòng làm việc hoặc phòng ngủ của bạn chỉ với những vật dụng thực sự mang lại niềm cảm hứng.",
      tags: ["Slow Living", "Lifestyle", "Nghệ thuật sống", "Không gian chữa lành"]
    },
    {
      id: "hinh_anh_thuong_hieu",
      title: "Hình ảnh & Thương hiệu cá nhân",
      category: "style",
      summary: "Sự đồng bộ hóa hoàn hảo giữa giá trị cốt lõi bên trong và cách thức thể hiện, truyền thông bản sắc ra thế giới bên ngoài.",
      psychology: "Lý thuyết quản lý ấn tượng (Impression Management) chỉ ra việc xây dựng hình ảnh cá nhân nhất quán giúp tăng mức độ tin cậy và mở rộng cơ hội thành công.",
      coaching: "Khai vấn thương hiệu cá nhân giúp bạn tìm ra điểm giao thoa giữa: Bạn là ai, Bạn làm tốt điều gì, và Thế giới cần gì ở bạn.",
      numerology: "Định hình phong thái dẫn dắt chuyên nghiệp dựa trên thế mạnh của chỉ số Ngày sinh, Sứ mệnh và số Chủ đạo.",
      van_moc: "Thương hiệu cá nhân bền vững nhất chính là sự chân thật không gồng gánh. Khi bạn là chính mình một cách trọn vẹn và cống hiến giá trị thực, thương hiệu tự khắc tỏa hương.",
      exercise: "Xác định 3 thông điệp hoặc giá trị cốt lõi mà bạn muốn mọi người nhớ đến đầu tiên khi nhắc về tên bạn.",
      tags: ["Personal Branding", "Thương hiệu cá nhân", "Sự nhất quán", "Chân thật"]
    },
    {
      id: "su_nghiep_su_menh",
      title: "Sự nghiệp & Sứ mệnh (Career & Mission)",
      category: "career",
      summary: "Sự nghiệp không chỉ là công việc mưu sinh, mà là một hành trình sứ mệnh thiêng liêng đòi hỏi con người bồi dưỡng, học tập và thăng tiến tâm thức từng ngày. Đây là một trong sáu đại mục tiêu lớn nhất của cuộc đời — bên cạnh Gia đình, Công danh, Tiền tài, Lý tưởng và Mối quan hệ — tạo nên sự dung hợp hoàn mỹ trong một kiếp nhân sinh toàn vẹn.",
      psychology: "Dưới lăng kính Tâm lý học sâu sắc, sự nghiệp chính là con đường hiện thực hóa bản thể độc bản (Self-Actualization). Công việc hằng ngày là chiếc gương phản chiếu chân thực nhất thế giới vô thức bên trong, giúp ta nhận diện và chuyển hóa các tổn thương bản ngã. Khi tâm lý được chữa lành và thiết lập một trục 'tiếp đất' (Grounding) vững chãi, sự nghiệp không còn là gánh nặng mưu sinh mệt mỏi, mà trở thành không gian chánh niệm và thực hành sự kiên cường tinh thần.",
      coaching: "Trong nghệ thuật Khai vấn (Coaching), sự nghiệp được định hình dựa trên triết lý Ikigai (Lẽ sống độc bản) — điểm giao thoa hoàn hảo giữa điều bạn yêu thích, năng lực vượt trội của bạn, nhu cầu thiết thực của xã hội và nguồn tài chính gieo duyên bền vững. Coaching giúp bạn chấm dứt tư duy đổ lỗi hoàn cảnh, dám chịu trách nhiệm 100% để thiết lập ranh giới lành mạnh và chủ động kiến tạo lộ trình công danh đi liền với bình an tự tại.",
      numerology: "Thần số học học thuật nhìn nhận sự nghiệp như một Bản đồ trường rung động sinh học tự nhiên (qua chỉ số Bài học đường đời, Sứ mệnh và Trưởng thành). Từ bỏ tư duy bói toán mê tín, chúng ta thấu hiểu các đỉnh cao năng lượng và vùng số thiếu như những bài tập rèn luyện tâm thức để từ đó thiết lập những nếp sống kỷ luật, liên tục rèn giũa thói quen tự chủ hằng ngày nhằm biến thử thách số mệnh thành trí tuệ vượt bậc.",
      van_moc: "Vân Mộc nhìn nhận Sự nghiệp là tiến trình tích hợp hài hòa của 'Bánh Xe Lục Đại' (Sự nghiệp - Gia đình - Công danh - Tiền tài - Lý tưởng - Mối quan hệ). Sự nghiệp chân thật không được đo lường bằng danh hiệu ảo vọng hay số dư tài khoản, mà bằng chiều sâu nhận thức, tính tôn nghiêm bản thân và giá trị nhân văn cao đẹp ta âm thầm cống hiến để nâng đỡ, thấu cảm và gieo duyên lành cho nhân sinh mỗi ngày.",
      exercise: "1. Tự vấn về sự cân bằng của 6 đại mục tiêu đời người: Bạn có đang hy sinh Gia đình hay Mối quan hệ cho Tiền tài, hay đang đánh mất Lý tưởng sống?\n2. Viết ra 3 giá trị nhân văn mà bạn muốn cống hiến thông qua chuyên môn của mình.\n3. Thiết lập 1 thói quen rèn luyện tự học 15 phút mỗi ngày để nâng cấp năng lực bản thân một cách bền bỉ.",
      tags: ["Sự nghiệp", "Sứ mệnh", "Ikigai", "6 Đại Mục Tiêu", "Kiến tạo bản thể"]
    },
    {
      id: "so_1_tien_phong",
      title: "Con số chủ đạo 1: Ý chí Khởi đầu & Bản lĩnh Tiên phong",
      category: "numerology",
      summary: "Đại diện cho xung lực đầu tiên khai mở vạn vật, tinh thần dũng cảm, khả năng độc lập tự quyết và phẩm chất của một người dẫn đường đầy bản lĩnh.",
      psychology: "Dưới lăng kính tâm lý học, số 1 gắn liền với tiến trình cá nhân hóa sâu sắc (Individuation). Năng lượng này thôi thúc một người bước ra khỏi sự đồng hóa vô thức với đám đông để tìm kiếm và định hình căn tính độc bản. Sức mạnh của số 1 giúp cá nhân vượt qua hội chứng sợ bị cô lập, dám bước đi trên hành trình riêng biệt bằng niềm tin tự tôn vững chãi.",
      coaching: "Trong khai vấn đồng hành, hành giả mang năng lượng số 1 cần học bài học chuyển dịch trọng tâm: từ 'lãnh đạo áp đặt' sang 'lãnh đạo thấu cảm'. Thách thức lớn nhất là thuần hóa cái tôi kiêu hãnh bản ngã, học cách gieo niềm tin và kiên nhẫn bồi dưỡng thế hệ kế cận thay vì gánh vác mọi việc một mình.",
      numerology: "Tần số rung động của số 1 là bước sóng thẳng đứng, dứt khoát và nhanh. Liên đới mật thiết với luân xa Gốc rễ (Root Chakra) - cội nguồn của sự sinh tồn vững chãi và năng lực tiếp đất. Mang biểu tượng Thái Dương (Mặt Trời) - nguồn năng lượng hướng tâm, tự phát sáng và ban rải sự sống.",
      van_moc: "Vân Mộc nhìn nhận Số 1 là hạt mầm quả cảm tự nứt vỏ trong lòng đất tối tăm để vươn thẳng lên đón ánh mặt trời. Bản lĩnh của số 1 không nằm ở sự cô độc ngạo nghễ, mà ở tinh thần trách nhiệm 100% với từng quyết định và khả năng bảo vệ ranh giới tôn nghiêm của bản thân trước mọi áp lực bên ngoài.",
      exercise: "1. Nhận diện sự phụ thuộc: Viết xuống một dự định bạn hằng mong muốn nhưng chưa dám làm vì sợ ý kiến của người khác. Lập kế hoạch hành động tự quyết trong tuần này.\n2. Thực hành thế đứng 'Ngọn núi vững chãi' (Mountain Pose) trong 3 phút mỗi sáng để củng cố trục năng lượng tự tin nguyên bản.",
      tags: ["Số 1", "Chủ đạo 1", "Tiên phong", "Ý chí", "Độc lập"]
    },
    {
      id: "so_2_thau_cam",
      title: "Con số chủ đạo 2: Dòng chảy Hòa hợp & Sự Thấu cảm sâu sắc",
      category: "numerology",
      summary: "Sức mạnh tĩnh lặng của khả năng lắng nghe tuyệt đối, sự nhạy bén cảm xúc, tinh thần hòa giải ngoại giao và năng lực kết nối tâm giao giữa người với người.",
      psychology: "Tâm lý học tương tác định nghĩa số 2 như hiện thân của sự gắn kết an toàn (Secure Attachment). Người có năng lượng số 2 sở hữu trí tuệ cảm xúc (EQ) vượt trội, có khả năng thấu suốt những chuyển động tinh tế trong nội tâm đối phương, xoa dịu các xung đột bằng sự hiện diện mềm mại và dung chứa.",
      coaching: "Bài học lớn nhất của số 2 trong tiến trình khai vấn là thiết lập ranh giới lành mạnh (Healthy Boundaries). Do quá nhạy cảm, số 2 dễ rơi vào hội chứng 'làm hài lòng người khác' (People-pleasing) và bị kiệt quệ năng lượng do gánh vác cảm xúc hộ người khác. Khai vấn giúp số 2 thấu hiểu rằng: yêu thương đích thực luôn cần đi kèm với sự tự chủ nghiêm cẩn.",
      numerology: "Bước sóng của số 2 uốn lượn nhịp nhàng, mát lành và mang tính đón nhận sâu sắc. Tương thích với năng lượng Thái Âm (Mặt Trăng) và luân xa Xương cùng (Sacral Chakra) - trung tâm của cảm xúc chân thật, năng lực trực giác nhạy bén và tính sáng tạo nghệ thuật mềm mại.",
      van_moc: "Vân Mộc xem Số 2 như dòng nước hiền hòa tự tìm đường luồn lách qua đá sỏi để nuôi dưỡng vạn vật mà không tranh giành cao thấp. Sự thấu cảm của Số 2 là liều thuốc chữa lành vô giá, nhưng dòng nước ấy cần được định hình bởi những ranh giới tôn nghiêm để không bị vẩn đục hay bốc hơi trước những năng lượng độc hại.",
      exercise: "1. Thực hành Lắng nghe Chân chính (Deep Listening): Trong hôm nay, khi trò chuyện với ai đó, hãy im lặng hoàn toàn tâm trí, lắng nghe bằng cả trái tim mà không chuẩn bị sẵn ý kiến phản hồi.\n2. Thực hành nói từ chối nhẹ nhàng nhưng dứt khoát với một yêu cầu đang làm vắt kiệt thời gian hoặc sức khỏe của bạn.",
      tags: ["Số 2", "Chủ đạo 2", "Thấu cảm", "Lắng nghe", "Hòa giải"]
    },
    {
      id: "so_3_bieu_dat",
      title: "Con số chủ đạo 3: Trí tuệ Biểu đạt & Sức lan tỏa Cảm hứng",
      category: "numerology",
      summary: "Năng lượng rực rỡ của ngôn từ khai sáng, tư duy nhanh nhạy, năng lực biểu đạt nghệ thuật phong phú và khả năng thắp sáng niềm vui sống cho cộng đồng.",
      psychology: "Tâm lý học sáng tạo nhìn nhận số 3 là đỉnh cao của sự giải phóng bản ngã qua nghệ thuật và giao tiếp (Self-Expression). Việc bộc lộ cảm xúc và ý tưởng một cách chân thật giúp giải tỏa các khối ức chế tâm lý bị dồn nén, tái thiết lập dòng chảy năng lượng tích cực bên trong.",
      coaching: "Trong coaching, hành giả số 3 cần rèn luyện tính tập trung và kỷ luật tự chủ để dòng chảy sáng tạo không bị phân tán vô tội vạ. Bài học cốt lõi là chuyển hóa ngôn từ và tài năng biểu diễn từ mục đích 'thu hút sự chú ý của bản ngã' sang mục tiêu 'lan tỏa giá trị nhân văn và đánh thức tâm thức người nghe'.",
      numerology: "Tần số của số 3 có tính giãn nở, tươi vui và hướng ngoại. Kết nối mật thiết với luân xa Búi mặt trời (Solar Plexus Chakra) - trung tâm của lòng nhiệt huyết, tự tin hành động và năng lực lan tỏa thông điệp mạnh mẽ ra thế giới khách quan.",
      van_moc: "Vân Mộc xem Số 3 là đóa hoa khoe sắc tỏa hương làm đẹp cho đời. Ngôn từ của số 3 có sức mạnh kiến tạo hoặc hủy diệt; do đó, hãy để lời nói của mình luôn đi qua ba cánh cổng gác nghiêm cẩn: Có chân thật không? Có tử tế không? Có mang lại giá trị nâng đỡ lúc này không?",
      exercise: "1. Viết tự do (Free Writing): Dành 10 phút viết ra giấy mọi suy nghĩ trào dâng mà không chỉnh sửa ngữ pháp hay phán xét cảm xúc.\n2. Thực hành khen ngợi chân thành: Gửi một lời động viên sâu sắc bằng lời nói hoặc tin nhắn đến một người đang nỗ lực xung quanh bạn.",
      tags: ["Số 3", "Chủ đạo 3", "Biểu đạt", "Sáng tạo", "Ngôn từ"]
    },
    {
      id: "so_4_vung_chai",
      title: "Con số chủ đạo 4: Nền tảng Vững chãi & Kỷ luật Thực tiễn",
      category: "numerology",
      summary: "Tần số của sự thực tế, tư duy logic hệ thống, sự trung thành tuyệt đối và năng lực hiện thực hóa các ý tưởng bay bổng thành các cấu trúc vật lý bền vững.",
      psychology: "Tâm lý học hành vi xem năng lượng số 4 là nhu cầu thiết lập trật tự và sự an toàn cốt lõi (Structure & Stability). Việc duy trì các thói quen lành mạnh và một không gian sống ngăn nắp giúp xoa dịu hệ thần kinh giao cảm, tạo ra một 'neo giữ' vững chãi trước những biến động bên ngoài.",
      coaching: "Trong hành trình khai vấn, thách thức lớn nhất của số 4 là vượt qua nỗi sợ mơ hồ và chủ nghĩa hoàn hảo cực đoan dẫn đến trì trệ hành động. Người mang số 4 cần học cách buông bỏ bớt sự kiểm soát cứng nhắc, rèn luyện tính linh hoạt để đón nhận những thay đổi bất ngờ của cuộc sống.",
      numerology: "Đại diện cho hình vuông cân bằng vững vàng nhất, tương thích với năng lượng của Đất (Earth Element) và luân xa Gốc rễ. Đây là tần số ghim giữ chắc chắn, kéo tinh thần tiếp đất để xử lý các công việc thực tế một cách chỉn chu, khoa học.",
      van_moc: "Vân Mộc trân quý Số 4 như gốc cổ thụ cắm sâu rễ vào lòng đất mẹ bao dung. Sự vững chãi, uy tín và tính cam kết bền bỉ của Số 4 chính là điểm tựa bình an cho gia đình và tổ chức, là tấm gương phản chiếu tinh thần làm việc nghiêm túc, tôn trọng sự thật.",
      exercise: "1. Thiết lập thói quen kỷ luật: Chọn một hành động nhỏ (như uống nước ấm sau khi thức dậy hoặc thiền 5 phút) và thực hiện liên tục không ngắt quãng trong 21 ngày.\n2. Sắp xếp ngăn nắp: Dành 15 phút dọn dẹp tủ tài liệu hoặc bàn làm việc để tái thiết lập trật tự tâm trí.",
      tags: ["Số 4", "Chủ đạo 4", "Kỷ luật", "Vững chãi", "Hệ thống"]
    },
    {
      id: "so_5_tu_do",
      title: "Con số chủ đạo 5: Tự do Nguyên bản & Thích thích Linh hoạt",
      category: "numerology",
      summary: "Tinh thần phiêu lưu không giới hạn, khát vọng tự do khám phá, năng lực thích ứng vượt trội trước đổi thay và tư duy đổi mới đầy tính đột phá.",
      psychology: "Tâm lý học nhân văn gắn liền số 5 với nhu cầu tự quyết cao độ (Autonomy) và khao khát tích lũy trải nghiệm phong phú. Sự xê dịch lành mạnh và tiếp xúc đa chiều kích hoạt tính dẻo dai của não bộ (Neuroplasticity), mở rộng biên giới nhận thức và bẻ gãy các định kiến lối mòn.",
      coaching: "Bài học lớn nhất của số 5 trong khai vấn là định nghĩa lại khái niệm 'tự do đích thực'. Tự do chân thật không phải là sự buông thả theo ham muốn bản năng hay trốn chạy các cam kết trách nhiệm, mà là năng lực tự chủ hoàn toàn trước những cám dỗ và lựa chọn sống có ý thức (Kỷ luật chính là tự do tối thượng).",
      numerology: "Nằm ở vị trí trung tâm của biểu đồ số học, kết nối đa chiều. Tương thích với năng lượng của Gió - tự do, biến chuyển, lan tỏa thông tin nhanh chóng. Liên kết trực tiếp với luân xa Cổ họng (Throat Chakra) và luân xa Tim (Heart Chakra).",
      van_moc: "Vân Mộc nhìn nhận Số 5 là cánh chim tự do sải cánh giữa bầu trời rộng lớn. Để cánh chim ấy bay cao mà không lạc lối giữa giông bão cuộc đời, số 5 cần một cái neo lý tưởng sống rõ ràng bên trong, biến mọi trải nghiệm xê dịch thành những bài học thấu cảm nhân sinh sâu sắc.",
      exercise: "1. Thử thách phá vỡ lối mòn: Chọn một cung đường hoàn toàn mới để đi làm, hoặc thử trò chuyện với một người xa lạ để kích hoạt khả năng thích ứng linh hoạt.\n2. Tự phản tư: Viết ra những điều bạn đang muốn trốn tránh dưới danh nghĩa 'muốn tự do'.",
      tags: ["Số 5", "Chủ đạo 5", "Tự do", "Thích ứng", "Trải nghiệm"]
    },
    {
      id: "so_6_yeu_thuong",
      title: "Con số chủ đạo 6: Yêu thương Vô điều kiện & Kiến tạo Tổ ấm",
      category: "numerology",
      summary: "Trái tim giàu lòng trắc ẩn, bản năng bảo bọc nuôi dưỡng, tinh thần gánh vác trách nhiệm gia đình cao cả và tài năng sáng tạo nghệ thuật hướng về tổ ấm bình an.",
      psychology: "Tâm lý học gia đình kết nối số 6 với thiên chức nuôi dưỡng lành mạnh và nhu cầu xây dựng môi trường an toàn cảm xúc. Sức mạnh của số 6 giúp chữa lành tổn thương đứa trẻ bên trong thông qua sự ôm ấp, bao dung vô điều kiện và cảm giác được thuộc về.",
      coaching: "Bài học cốt lõi trong tiến trình khai vấn của số 6 là học cách 'yêu thương trong tỉnh thức'. Người mang số 6 cần vượt qua hội chứng lo lắng thái quá, kiểm soát hoặc can thiệp sâu sắc vào tiến trình của người thân dưới danh nghĩa tình thương. Hãy học cách buông bỏ bớt kỳ vọng, để người thương tự chịu trách nhiệm với bài học cuộc đời của họ.",
      numerology: "Tần số của số 6 là bước sóng rung động ấm áp, dung chứa và có khả năng xoa dịu cao độ. Tương thích hoàn hảo với luân xa Tim (Heart Chakra) - trung tâm của lòng trắc ẩn, tình yêu thương nhân loại và khả năng tự chữa lành tự nhiên.",
      van_moc: "Vân Mộc xem Số 6 là ngọn lửa sưởi ấm căn bếp của mỗi ngôi nhà, là điểm tựa an lành nâng đỡ những tâm hồn mỏi mệt quay về. Tình yêu của Số 6 chỉ thực sự trọn vẹn khi nó đi kèm với sự thấu suốt và trí tuệ, yêu thương bằng sự tôn trọng tự do của đối phương.",
      exercise: "1. Thực hành nuôi dưỡng: Dành thời gian chăm sóc một nhành cây, nấu một bữa ăn lành ấm áp và gửi trọn sự chú tâm vào từng hành động.\n2. Thiền rải tâm từ (Metta Meditation): Nhắm mắt và thầm gửi những lời chúc bình an, hạnh phúc đến bản thân và những người bạn yêu thương trong 5 phút.",
      tags: ["Số 6", "Chủ đạo 6", "Yêu thương", "Nuôi dưỡng", "Gia đình"]
    },
    {
      id: "so_7_tri_tue",
      title: "Con số chủ đạo 7: Chiêm nghiệm Độc lập & Khai mở Tâm thức",
      category: "numerology",
      summary: "Hành trình của một nhà triết học chiêm nghiệm sâu sắc, khao khát tự học hỏi và thấu suốt chân lý cuộc đời thông qua trải nghiệm thực chứng tự thân.",
      psychology: "Tâm lý học chiều sâu đánh giá cao năng lực phản tư (Self-Reflection) và tư duy độc lập của số 7. Việc chủ động dành thời gian ở một mình giúp bộ não của số 7 sàng lọc thông tin rác, chuyển hóa các bài học đau thương trong quá khứ thành những kho tàng trí tuệ thông thái.",
      coaching: "Trong coaching, hành giả số 7 cần học cách vượt qua rào cản của sự hoài nghi quá mức, chủ nghĩa cô độc cực đoan hay tính phán xét lạnh lùng. Thách thức lớn là học cách đưa tri thức từ tầng lý thuyết cao siêu xuống ứng dụng thực tế đời sống, kết nối thấu cảm rộng mở với thế giới xung quanh.",
      numerology: "Tần số của số 7 tương ứng với bước sóng tĩnh lặng, hướng nội sâu sắc. Kết nối trực tiếp với luân xa Con mắt thứ ba (Third Eye Chakra) về trực giác sắc bén và luân xa Vương miện (Crown Chakra) về sự thấu suốt tâm thức vượt bậc.",
      van_moc: "Vân Mộc tôn quý Số 7 như ngọn nến sáng lặng lẽ ngự trị giữa màn đêm tĩnh lặng. Trí tuệ đích thực của Số 7 không đến từ sách vở lý thuyết suông, mà được kết tinh rực rỡ từ những biến cố, giông bão cuộc đời mà họ đã dũng cảm đối diện, tự chữa lành và vượt qua bằng nội lực tự chủ.",
      exercise: "1. Thực hành Tĩnh lặng: Mỗi ngày dành ra 15 phút ngắt kết nối hoàn toàn với các thiết bị điện tử, ngồi tĩnh tâm quan sát hơi thở hoặc đi bộ chánh niệm dưới bóng cây.\n2. Viết nhật ký bài học: Chọn một khó khăn bạn đang gặp phải, viết xuống 3 bài học sâu sắc nhất mà biến cố này đang cố gắng dạy cho bạn.",
      tags: ["Số 7", "Chủ đạo 7", "Chiêm nghiệm", "Trí tuệ", "Tự lực"]
    },
    {
      id: "so_8_quan_tri",
      title: "Con số chủ đạo 8: Quản trị Thịnh vượng & Cân bằng Nhân quả",
      category: "numerology",
      summary: "Ý chí kiên cường dời non lấp bể, năng lực điều hành hệ thống sắc bén, tư duy tài chính vượt trội và bài học cân bằng đỉnh cao giữa thế giới vật chất hữu hình và giá trị tâm linh vô hình.",
      psychology: "Tâm lý học hành vi nhận định số 8 là biểu tượng bền bỉ của lòng kiên định vượt khó (Grit) và sự tự hiệu quả (Self-Efficacy). Sức mạnh ý chí của số 8 giúp cá nhân nhìn nhận các thất bại như những nấc thang rèn luyện bắt buộc để vươn tới sự trưởng thành.",
      coaching: "Trong tiến trình khai vấn, thách thức lớn nhất của số 8 là học cách buông bỏ bớt sự ám ảnh về kiểm soát tài chính và quyền lực bản ngã. Số 8 cần rèn luyện lòng biết ơn sâu sắc, học cách kiến tạo dòng chảy tài chính thịnh vượng bền vững dựa trên mục tiêu phụng sự tử tế và nâng đỡ cộng đồng xung quanh.",
      numerology: "Biểu tượng của số 8 là chiếc vòng vô cực (Infinity) xoay dọc, biểu thị dòng năng lượng tuần hoàn không dứt giữa thế giới vật chất và tinh thần. Vận hành dưới sự giám sát nghiêm cẩn của Luật Nhân Quả (Karma) tuyệt đối.",
      van_moc: "Vân Mộc xem Số 8 là nhà quản trị thông tuệ biết cách hiện thực hóa các nguồn lực vũ trụ thành những giá trị vật chất vững chắc và an lành cho nhân sinh. Sự thịnh vượng đích thực của số 8 chỉ bền vững khi nó được xây dựng trên nền tảng đạo đức trong sạch, công tâm và hướng thiện.",
      exercise: "1. Thực hành gieo hạt tài chính: Trích một phần nhỏ thu nhập hằng tháng gửi vào các quỹ gieo duyên lành một cách âm thầm, không mưu cầu danh tiếng.\n2. Thực hành lòng biết ơn: Viết xuống 5 điều bạn cảm thấy biết ơn về sự đủ đầy của cuộc sống vật chất hiện tại trước khi đi ngủ.",
      tags: ["Số 8", "Chủ đạo 8", "Quản trị", "Nhân quả", "Thịnh vượng"]
    },
    {
      id: "so_9_phung_su",
      title: "Con số chủ đạo 9: Trái tim Nhân ái & Sứ mệnh Phụng sự",
      category: "numerology",
      summary: "Đỉnh cao tinh hoa của lòng vị tha vượt biên giới, lý tưởng sống vĩ mô, khát vọng cống hiến cho xã hội và sứ mệnh phụng sự nhân sinh bằng tình thương vô điều kiện.",
      psychology: "Tâm lý học xã hội coi số 9 là biểu hiện rực rỡ nhất của hành vi vị xã hội (Altruism). Khi một cá nhân đặt cuộc đời mình vào một lý tưởng lớn lao hơn bản ngã nhỏ bé, họ sẽ giải phóng hoàn toàn nỗi sợ hãi tồn tại, đạt đến trạng thái hạnh phúc tự tại đích thực.",
      coaching: "Bài học lớn nhất của số 9 trong khai vấn là học cách sống thực tế ('tiếp đất' - Grounding) và hoàn thành trọn vẹn những mục tiêu nhỏ trước mắt thay vì chìm đắm trong các lý tưởng vĩ cuồng xa vời. Hãy giúp đỡ một người cụ thể trước khi nghĩ đến việc giải cứu cả thế giới, và học cách tha thứ cho những khuyết điểm của bản thân.",
      numerology: "Là con số kết thúc chu kỳ đơn số, tích hợp toàn bộ bài học và năng lượng của các con số đứng trước nó. Tương thích trực tiếp với luân xa Vương miện (Crown Chakra) - hướng về sự thức tỉnh tâm thức toàn vẹn và lòng bác ái bao la.",
      van_moc: "Vân Mộc tôn quý Số 9 như ngọn hải đăng soi đường cho những mảnh đời lạc lối giữa đại dương giông bão tìm về bến đỗ bình an. Sứ mệnh tối hậu của Số 9 là sống cuộc đời phụng sự thầm lặng, lan tỏa hạt giống tử tế và lòng bao dung vô điều kiện đến mọi ngóc ngách của kiếp nhân sinh.",
      exercise: "1. Thực hành buông bỏ oán giận: Viết một bức thư tha thứ sâu sắc cho một người từng làm tổn thương bạn sâu sắc (viết để giải phóng năng lượng oán giận bị dồn nén, không cần gửi đi).\n2. Gieo duyên tử tế: Thực hiện một hành động tử tế vô điều kiện (như giúp đỡ một cụ già qua đường, ủng hộ sách cũ) mà không cần ai biết đến.",
      tags: ["Số 9", "Chủ đạo 9", "Nhân ái", "Phụng sự", "Tha thứ"]
    }
  ];

  // Auto filter
  const filteredConcepts = concepts.filter(concept => {
    const matchCategory = activeCategory === "concept" || concept.category === activeCategory;
    const matchSearch = concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        concept.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        concept.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-3 py-1 rounded-full">Kho tàng Thấu Suốt</span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
          Vân Mộc Knowledge Hub<span className="text-[#5A5A40]">.</span>
        </h2>
        <p className="text-xs font-semibold uppercase tracking-wider italic text-[#5A5A40] mt-1">
          (Thư viện Tri thức Vân Mộc)
        </p>
        <p className="text-xs md:text-sm text-stone-500 max-w-xl mx-auto">
          Tra cứu các khái niệm về tâm lý học, khai vấn, thần số học và triết lý sống nguyên bản. Được chuẩn hóa và hệ thống hóa khoa học bởi đội ngũ Vân Mộc.
        </p>
        <div className="h-[1.5px] w-16 bg-[#5A5A40]/25 mx-auto mt-4"></div>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="Tìm kiếm khái niệm, từ khóa (Ví dụ: Niềm tin, Tự tin...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-5 py-3 rounded-2xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white text-stone-800 text-xs md:text-sm shadow-xs"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="absolute right-4 top-3.5 text-stone-400 hover:text-stone-700">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 justify-center py-2 border-b border-stone-200/60">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              setSelectedConcept(null);
            }}
            className={`px-4 py-1.5 rounded-full text-[10px] md:text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
              activeCategory === cat.key
                ? "bg-[#5A5A40] text-white"
                : "bg-stone-100 text-stone-600 hover:bg-[#5A5A40]/10 hover:text-[#5A5A40]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Dynamic Dictionary view */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* Left concept list list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-2">
            Kết quả tra cứu ({filteredConcepts.length})
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
            {filteredConcepts.map((con) => (
              <button
                key={con.id}
                onClick={() => setSelectedConcept(con)}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  selectedConcept?.id === con.id
                    ? "bg-[#5A5A40]/10 border-[#5A5A40] shadow-xs"
                    : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-serif text-sm font-semibold text-stone-900">{con.title}</h4>
                  <span className="text-[9px] uppercase tracking-widest bg-stone-100 text-stone-500 px-2 py-0.5 rounded-sm">
                    {con.category}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                  {con.summary}
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {con.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[9px] text-[#5A5A40] bg-white px-2 py-0.5 rounded border border-stone-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
            {filteredConcepts.length === 0 && (
              <div className="text-center py-12 text-stone-400 italic text-xs">
                Không tìm thấy khái niệm tương thích. Hãy thử tìm kiếm từ khóa khác.
              </div>
            )}
          </div>
        </div>

        {/* Right content view */}
        <div className="lg:col-span-7">
          {selectedConcept ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6"
            >
              <div>
                <span className="text-[9px] uppercase font-mono tracking-widest text-[#5A5A40] bg-amber-50 px-2.5 py-1 rounded">
                  Tri thức chuẩn hóa
                </span>
                <h3 className="text-2xl font-serif text-stone-900 mt-3 font-semibold">
                  {selectedConcept.title}
                </h3>
                <p className="text-xs text-stone-500 mt-2 italic border-l-2 border-stone-300 pl-3">
                  {selectedConcept.summary}
                </p>
              </div>

              {/* Multi-angle explanations */}
              <div className="space-y-4">
                
                <div className="space-y-1">
                  <h5 className="text-[10px] uppercase font-bold tracking-widest text-emerald-700">📌 Theo Tâm Lý Học:</h5>
                  <p className="text-xs md:text-sm text-stone-700 leading-relaxed pl-3 border-l border-stone-150">
                    {selectedConcept.psychology}
                  </p>
                </div>

                <div className="space-y-1">
                  <h5 className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40]">⚡ Theo Coaching:</h5>
                  <p className="text-xs md:text-sm text-stone-700 leading-relaxed pl-3 border-l border-stone-150">
                    {selectedConcept.coaching}
                  </p>
                </div>

                <div className="space-y-1">
                  <h5 className="text-[10px] uppercase font-bold tracking-widest text-blue-700">🔮 Theo Thần Số Học:</h5>
                  <p className="text-xs md:text-sm text-stone-700 leading-relaxed pl-3 border-l border-stone-150">
                    {selectedConcept.numerology}
                  </p>
                </div>

                <div className="space-y-1">
                  <h5 className="text-[10px] uppercase font-bold tracking-widest text-amber-800">⭐ Quan điểm của Vân Mộc:</h5>
                  <p className="text-xs md:text-sm text-stone-700 leading-relaxed pl-3 border-l border-stone-150 font-serif italic">
                    “{selectedConcept.van_moc}”
                  </p>
                </div>

                <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-200/50 space-y-2">
                  <h5 className="text-[10px] uppercase font-bold tracking-widest text-amber-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bài tập tự phản tư hằng ngày:</span>
                  </h5>
                  <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-line font-mono pl-1">
                    {selectedConcept.exercise}
                  </p>
                </div>

              </div>
            </motion.div>
          ) : (
            <div className="bg-[#5A5A40]/5 border border-dashed border-[#5A5A40]/30 rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center space-y-4">
              <BookOpen className="w-10 h-10 text-[#5A5A40]/50 animate-bounce" />
              <h4 className="font-serif text-base font-semibold text-stone-800">Vui lòng chọn một khái niệm</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Nhấp chuột vào bất kỳ khái niệm nào bên trái để xem định nghĩa đa chiều chi tiết và bài tập thực hành chuyển hóa đi kèm.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};


// -------------------------------------------------------------
// 3. BAN DO PHAT TRIEN CON NGUOI ⭐
// -------------------------------------------------------------
export const BanDoPhatTrienView: React.FC<NavigationViewsProps> = ({ handleOpenEbookCheckout }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 1,
      name: "Hiểu Bản Thân",
      issue: "Mơ hồ về tương lai, không hiểu vì sao mình hay phản ứng tiêu cực hoặc nhạy cảm.",
      tools: "Bản đồ Thần số học chuyên sâu, Phản tư năng lực bẩm sinh.",
      outcome: "Có hệ quy chiếu ban đầu, ngừng phán xét bản thân và học cách chấp nhận xuất phát điểm.",
      takeaway: "Thần số học chỉ là PHƯƠNG TIỆN, không phải đích đến. Nó giúp bạn đọc tên các bài học cuộc đời."
    },
    {
      id: 2,
      name: "Nhận Diện Khuôn Mẫu",
      issue: "Lặp lại các sai lầm cũ trong quan hệ hoặc công việc mà không biết cách tháo gỡ.",
      tools: "Viết nhật ký phản tư, Trị liệu đứa trẻ bên trong (Inner Child).",
      outcome: "Nhận ra các cơ chế tự vệ phòng thủ cũ được kích hoạt từ những tổn thương trong quá khứ.",
      takeaway: "Vòng đá, trang sức phong thủy là PHƯƠNG TIỆN neo tâm trí, giúp bạn tỉnh thức khi khuôn mẫu cũ trỗi dậy."
    },
    {
      id: 3,
      name: "Chuyển Hóa Niềm Tin",
      issue: "Bị giới hạn bởi những tư duy cũ như 'Tôi không xứng đáng', 'Tôi không đủ tài giỏi'.",
      tools: "Coaching chuyên sâu 1-1, Tham vấn tâm lý học hành vi CBT.",
      outcome: "Lau sạch lăng kính, thiết lập các niềm tin thúc đẩy và mở ra trường lựa chọn mới.",
      takeaway: "Cuộc họp Khai vấn (Coaching) là PHƯƠNG TIỆN khai phóng dũng khí tự thân, không phải phép màu tức thì."
    },
    {
      id: 4,
      name: "Cân Bằng Nội Tâm",
      issue: "Dễ bị kiệt sức, hút cạn năng lượng trước những xáo động và mâu thuẫn bên ngoài.",
      tools: "Thiền định Grounding, Reiki phục hồi trường sinh học, Thạch anh tiếp đất.",
      outcome: "Thiết lập lại trạng thái bình yên, sạc đầy năng lượng tích cực tầng sâu.",
      takeaway: "Sức mạnh tự trị liệu nằm ở năng lực tập trung hơi thở. Reiki & thạch anh chỉ gieo duyên tần số rung động ban đầu."
    },
    {
      id: 5,
      name: "Kiến Tạo Khí Chất",
      issue: "Cảm thấy rụt rè, không dám thể hiện bản sắc độc bản, sợ bị phán xét.",
      tools: "Khám phá khí chất & nghệ thuật biểu đạt bản sắc cá nhân nguyên bản, Rèn luyện phong thái tự tin tĩnh lặng.",
      outcome: "Xây dựng hình ảnh bên ngoài hài hòa, nhất quán với giá trị nội tâm bên trong.",
      takeaway: "Trang sức bên ngoài chỉ là PHƯƠNG TIỆN tôn vinh phong thái tôn nghiêm, nội lực tự tại mới là cốt cách."
    },
    {
      id: 6,
      name: "Quan Hệ Lành Mạnh",
      issue: "Bị thao túng tâm lý, hy sinh ranh giới cá nhân hoặc dễ làm tổn thương người thương.",
      tools: "Tâm lý học giao tiếp thấu cảm, Thiết lập ranh giới năng lượng thiêng liêng.",
      outcome: "Xây dựng các kết nối tôn trọng ranh giới của nhau, đồng hành cùng nhau phát triển lành mạnh.",
      takeaway: "Mối quan hệ là PHƯƠNG TIỆN soi lại mình. Tránh né không giúp bạn bình yên, đối thoại tỉnh thức mới giúp thấu suốt."
    },
    {
      id: 7,
      name: "Sự Nghiệp & Tài Chính",
      issue: "Làm việc mệt mỏi trong một ngành nghề không thuộc về mình, kiếm tiền trong lo âu.",
      tools: "Khai vấn sự nghiệp theo Ikigai, Định hình mô hình trao giá trị thực tế.",
      outcome: "Kiến tạo công việc dựa trên tài năng tự nhiên, tự tin thăng hoa tài chính đúng bản sắc.",
      takeaway: "Tiền bạc là PHƯƠNG TIỆN phản hồi giá trị bạn cống hiến. Tập trung gieo nhân lành, quả ngọt tài chính sẽ tự đến."
    },
    {
      id: 8,
      name: "Sống Đúng Bản Sắc",
      issue: "Cảm thấy thiếu ý nghĩa sống dù có đầy đủ vật chất bên ngoài.",
      tools: "Hành trình cống hiến giá trị, Sống tự chủ toàn diện.",
      outcome: "Bình an, tự tại làm chủ mọi khoảnh khắc cuộc đời, dẫn dắt thế hệ tiếp nối.",
      takeaway: "Đây là ĐÍCH ĐẾN tối thượng — khi bạn và linh hồn hòa làm một, cống hiến cho đời bằng tình yêu thuần khiết."
    }
  ];

  return (
    <div className="space-y-12 text-left">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-3 py-1 rounded-full">Bản Quyền Tư Duy Vân Mộc</span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
          Bản Đồ Phát Triển Con Người 8 Giai Đoạn<span className="text-[#5A5A40]">.</span>
        </h2>
        <p className="text-xs md:text-sm text-stone-500 max-w-xl mx-auto">
          Nhìn nhận lộ trình phát triển bản thân dưới lăng kính hệ thống. Nhận thức rõ các vấn đề cốt lõi, công cụ giải quyết và thấu suốt bản chất phương tiện.
        </p>
        <div className="h-[1.5px] w-16 bg-[#5A5A40]/25 mx-auto mt-4"></div>
      </div>

      {/* Map visual layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Flowchart */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-2 pl-2">
            Hành trình xoắn ốc 8 Bước tiến hóa (Bấm để soi chiếu)
          </div>

          <div className="grid grid-cols-2 gap-3">
            {steps.map((st, sIdx) => (
              <button
                key={st.id}
                onClick={() => setActiveStep(sIdx)}
                className={`p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer relative group flex flex-col justify-between min-h-[110px] ${
                  activeStep === sIdx
                    ? "bg-[#5A5A40] text-white border-[#5A5A40] shadow-md -translate-y-1"
                    : "bg-white text-stone-700 border-stone-200 hover:border-[#5A5A40]/50"
                }`}
              >
                <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${activeStep === sIdx ? "text-amber-200" : "text-stone-400"}`}>
                  Giai đoạn 0{st.id}
                </span>
                <h4 className="font-serif text-sm font-semibold tracking-tight mt-1 mb-2 group-hover:text-[#5A5A40] group-hover:dark:text-white transition-colors duration-200">
                  {st.name}
                </h4>
                <div className="flex justify-end items-center">
                  <span className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-semibold font-mono border ${
                    activeStep === sIdx ? "bg-white/10 border-white/20 text-white" : "bg-stone-50 border-stone-150 text-stone-500"
                  }`}>
                    {st.id === 8 ? "Đích đến" : "Phương tiện"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-5"
            >
              <div className="flex justify-between items-start border-b border-stone-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#5A5A40]">HỆ TƯ DUY PHÁT TRIỂN</span>
                  <h3 className="text-xl md:text-2xl font-serif text-stone-900 font-semibold mt-0.5">
                    0{steps[activeStep].id}. {steps[activeStep].name}
                  </h3>
                </div>
                <span className="text-[10px] uppercase tracking-wider bg-amber-50 text-amber-800 px-3 py-1 rounded-full font-bold">
                  {steps[activeStep].id === 8 ? "Tối thượng" : "Tiến hóa"}
                </span>
              </div>

              {/* Step content items */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-red-600">⚠️ Vấn đề / Khó khăn thường gặp:</h5>
                  <p className="text-xs md:text-sm text-stone-700 leading-relaxed pl-3 border-l border-stone-200">
                    {steps[activeStep].issue}
                  </p>
                </div>

                <div className="space-y-1">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#5A5A40]">🛠️ Công cụ thực hành thấu suốt:</h5>
                  <p className="text-xs md:text-sm text-stone-700 leading-relaxed pl-3 border-l border-stone-200">
                    {steps[activeStep].tools}
                  </p>
                </div>

                <div className="space-y-1">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">✨ Kết quả nhận được sau chuyển hóa:</h5>
                  <p className="text-xs md:text-sm text-stone-700 leading-relaxed pl-3 border-l border-stone-200 font-medium">
                    {steps[activeStep].outcome}
                  </p>
                </div>

                {/* Conceptual boundary teaching block */}
                <div className="p-4 bg-stone-900 text-[#F7F5F0] rounded-2xl relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10">
                    <Lock className="w-24 h-24 translate-x-4 translate-y-4" />
                  </div>
                  <div className="space-y-1.5 z-10 relative">
                    <span className="text-[8px] uppercase tracking-wider font-mono text-amber-200 font-bold block">
                      Cảnh tỉnh từ chuyên gia Vân Mộc
                    </span>
                    <p className="text-xs italic leading-relaxed text-stone-300">
                      “{steps[activeStep].takeaway}”
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-4 flex justify-between items-center border-t border-stone-100">
                <span className="text-[10px] font-mono text-stone-400">© Vân Mộc Human Map</span>
                <button
                  onClick={handleOpenEbookCheckout}
                  className="px-4 py-2 bg-stone-100 hover:bg-[#5A5A40] hover:text-white rounded-xl text-[10px] uppercase tracking-wider font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải Bản đồ PDF</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};


// -------------------------------------------------------------
// 4. COACHING VIEW
// -------------------------------------------------------------
export const CoachingView: React.FC<NavigationViewsProps> = ({ onJoinZaloGroup }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("coaching_1on1");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // Auto trigger redirect link or sound if wanted
    }, 1500);
  };

  const steps = [
    { id: 1, title: "Làm rõ vấn đề", desc: "Lắng nghe trăn trở và xác định mục tiêu chuyển hóa của bạn." },
    { id: 2, title: "Hiểu khuôn mẫu", desc: "Nhận diện những niềm tin giới hạn và thói quen cũ lặp đi lặp lại." },
    { id: 3, title: "Nhìn lại bản thân", desc: "Đứng ở góc độ người quan sát để thấu suốt bản thể sâu xa." },
    { id: 4, title: "Thiết kế hành động", desc: "Cùng chuyên gia thiết lập các thói quen và hành động thực tế mỗi ngày." },
    { id: 5, title: "Theo dõi thay đổi", desc: "Đồng hành tích hợp các bài học tự chủ để kiến tạo cuộc sống bản sắc vững vàng." }
  ];

  return (
    <div className="space-y-12 text-left">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-3 py-1 rounded-full">Đồng Hành Chuyên Sâu</span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
          Coaching Program<span className="text-[#5A5A40]">.</span>
        </h2>
        <p className="text-xs font-semibold uppercase tracking-wider italic text-[#5A5A40] mt-1">
          (Đồng hành Khai vấn Sống Đúng Bản Sắc 1:1)
        </p>
        <p className="text-xs md:text-sm text-stone-500 max-w-xl mx-auto">
          Gỡ bỏ các rào cản nội tâm và định vị khí chất nguyên bản cùng Chuyên gia đồng hành của Vân Mộc. Quy trình 5 bước thấu suốt.
        </p>
        <div className="h-[1.5px] w-16 bg-[#5A5A40]/25 mx-auto mt-4"></div>
      </div>

      {/* Grid: 5-step process vs. Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: 5-step process explanation */}
        <div className="lg:col-span-6 space-y-6">
          <div className="text-xs uppercase tracking-wider font-bold text-stone-400 mb-2 pl-1">
            Quy trình Khai vấn 5 bước của Vân Mộc
          </div>

          <div className="space-y-4 relative pl-4 border-l border-[#5A5A40]/20">
            {steps.map((st) => (
              <div key={st.id} className="relative space-y-1">
                {/* Dot anchor */}
                <span className="absolute -left-[24.5px] top-1.5 w-4 h-4 rounded-full bg-[#5A5A40] border-2 border-white flex items-center justify-center font-mono text-[8px] text-white font-bold">
                  {st.id}
                </span>
                <h4 className="font-serif text-sm font-semibold text-stone-900">{st.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 italic text-xs text-stone-500 leading-relaxed">
            “Phiên họp khai vấn không đưa ra lời khuyên sáo rỗng. Chúng tôi đặt câu hỏi định hướng để bạn tự tìm ra câu trả lời sẵn có từ nội tâm.”
          </div>
        </div>

        {/* Right: Booking form */}
        <div className="lg:col-span-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-5 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center text-xl text-emerald-700">
                  ✓
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-stone-900">Đăng Ký Tư Vấn Thành Công!</h4>
                  <p className="text-xs text-stone-500 mt-2 max-w-xs mx-auto leading-relaxed">
                    Đội ngũ Vân Mộc sẽ phản hồi bạn qua hòm thư <strong className="text-[#5A5A40]">{email}</strong> hoặc Zalo <strong className="text-[#5A5A40]">{phone}</strong> trong vòng 24 giờ tới.
                  </p>
                </div>
                
                <div className="w-full max-w-xs p-4 bg-amber-50 rounded-xl text-[11px] text-[#5A5A40] leading-relaxed">
                  Để rút ngắn thời gian chuẩn bị và nhận thông điệp nhanh hơn, mời bạn gia nhập nhóm Zalo đồng hành của chúng tôi:
                </div>

                <a
                  href="https://zalo.me/g/sfo4yrnckqnqu2xzix8e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#0068FF] hover:bg-[#0055D0] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Gia nhập Zalo Group</span>
                </a>
                
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setName("");
                    setPhone("");
                    setEmail("");
                    setDescription("");
                  }}
                  className="text-[10px] text-stone-400 hover:text-stone-600 uppercase tracking-widest font-bold"
                >
                  Đăng ký ca mới
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <h4 className="font-serif text-lg font-semibold text-stone-850">Gửi thông tin đăng ký tư vấn</h4>
                  <p className="text-xs text-stone-400 mt-1">Đội ngũ chuyên gia sẽ liên hệ riêng tư cùng bạn.</p>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Thị Vân"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/30 text-stone-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Số điện thoại Zalo *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0912345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/30 text-stone-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Hòm thư Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="van@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/30 text-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Nhu cầu khai vấn *</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white text-stone-800"
                  >
                    <option value="coaching_1on1">Khai vấn 1-1 Chuyển hóa Bản sắc (60 phút)</option>
                    <option value="numerology_chart">Bản đồ Thần số học &amp; Định vị Năng lượng gốc</option>
                    <option value="reiki_healing">Ca phục hồi trường sinh học &amp; Reiki (Trực tiếp/Từ xa)</option>
                    <option value="spiritual_mentorship">Đồng hành tâm thức dài hạn (3 tháng)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Chia sẻ trăn trở cốt lõi của bạn (Tùy chọn)</label>
                  <textarea
                    rows={3}
                    placeholder="Những mối quan hệ bế tắc? Sự nghiệp mệt mỏi? Hay tổn thương nào đang muốn được thấu hiểu?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-4 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/30 text-stone-800 placeholder-stone-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#5A5A40] hover:bg-[#484833] disabled:bg-stone-300 text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Đang xử lý thông tin...</span>
                    </>
                  ) : (
                    <span>Gửi thông tin đăng ký tư vấn</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};


// -------------------------------------------------------------
// 5. WORKSHOP VIEW
// -------------------------------------------------------------
export const WorkshopView: React.FC<NavigationViewsProps> = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<any | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const workshops = [
    {
      id: "tro_ve_ban_the",
      title: "Workshop “Trở Về Bản Thể”",
      tag: "Trị liệu tự nhiên",
      date: "",
      location: "",
      fee: "250,000 đ",
      desc: "Đánh thức năng lượng tự nhiên, hướng dẫn các phương pháp viết nhật ký phản tư hằng ngày và gieo mầm bình an nội tâm.",
      curriculum: [
        "Phần 1: Thực hành thiền thở tiếp đất thăng bằng sóng não.",
        "Phần 2: Viết dòng chảy tự do giải phóng rác thải tâm lý.",
        "Phần 3: Soi chiếu năng lượng gốc qua bản đồ số học.",
        "Phần 4: Gieo duyên tinh thể thạch anh và nghi thức ôm ấp đứa trẻ bên trong."
      ]
    },
    {
      id: "kien_tao_khi_chat",
      title: "Workshop “Kiến Tạo Khí Chất”",
      tag: "Bản sắc phong thái",
      date: "",
      location: "",
      fee: "350,000 đ",
      desc: "Khơi dậy phong thái tự nhiên từ bên ngoài dựa trên nội lực thấu cảm sâu sắc bên trong. Thấu hiểu mối liên hệ mật thiết giữa năng lượng gốc và cách định hình khí chất & nghệ thuật biểu đạt bản sắc.",
      curriculum: [
        "Phần 1: Định hình hệ thống 5 giá trị sống cốt lõi.",
        "Phần 2: Giải mã mối quan hệ giữa các con số tâm hồn và phong thái thể hiện.",
        "Phần 3: Thiết kế lối sống tinh khiết, ăn lành thở sạch hằng ngày.",
        "Phần 4: Nghi thức thầm lặng khẳng định ranh giới cá nhân tôn nghiêm."
      ]
    },
    {
      id: "chua_lanh_cam_xuc",
      title: "Workshop “Chữa Lành Cảm Xúc”",
      tag: "Trị liệu chuyên sâu",
      date: "",
      location: "",
      fee: "450,000 đ",
      desc: "Học cách gọi tên tổn thương cảm xúc cũ, phát hiện các cơ chế phòng vệ bản ngã tự động và thiết lập ranh giới năng lượng lành mạnh.",
      curriculum: [
        "Phần 1: Nhận diện khuôn mẫu đau buồn từ thấu kính tâm lý học.",
        "Phần 2: Phương pháp thiền buông bỏ oán giận Ho'oponopono.",
        "Phần 3: Trị liệu trường khí Reiki giải tỏa bế tắc cơ thể vật lý.",
        "Phần 4: Gửi lời chúc bình an viết tay cho người đi cùng hành trình."
      ]
    }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedWorkshop(null);
      setName("");
      setPhone("");
    }, 4000);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-3 py-1 rounded-full">Không Gian Trực Tiếp</span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
          Transformational Workshop<span className="text-[#5A5A40]">.</span>
        </h2>
        <p className="text-xs font-semibold uppercase tracking-wider italic text-[#5A5A40] mt-1">
          (Workshop Đồng Hành Chuyển Hóa)
        </p>
        <p className="text-xs md:text-sm text-stone-500 max-w-xl mx-auto">
          Các không gian học tập trực tiếp tại phòng thiền hoặc trực tuyến qua Zoom. Giúp bạn trải nghiệm trực quan lý thuyết phát triển con người của Vân Mộc.
        </p>
        <div className="h-[1.5px] w-16 bg-[#5A5A40]/25 mx-auto mt-4"></div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {workshops.map((ws) => (
          <div key={ws.id} className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden flex flex-col justify-between">
            <div className="p-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9px] uppercase tracking-wider font-bold bg-[#5A5A40]/10 text-[#5A5A40] px-2 py-0.5 rounded">
                  {ws.tag}
                </span>
                <span className="text-xs font-mono font-bold text-[#5A5A40]">{ws.fee}</span>
              </div>
              <h3 className="font-serif text-base font-bold text-stone-900">
                {ws.title}
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                {ws.desc}
              </p>
              <div className="text-[10px] space-y-1.5 text-stone-500 pt-2 border-t border-stone-100">
                <div>📅 <strong>Thời gian:</strong> {ws.date || "Sẽ cập nhật sau"}</div>
                <div>📍 <strong>Địa điểm:</strong> {ws.location || "Sẽ cập nhật sau"}</div>
              </div>
            </div>
            
            <div className="p-6 bg-stone-50 border-t border-stone-150 flex gap-2">
              <button
                onClick={() => setSelectedWorkshop(ws)}
                className="w-full py-2 bg-[#5A5A40] text-white hover:bg-[#484833] rounded-xl text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer text-center"
              >
                Đăng ký vé gieo duyên
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Registration popup modal */}
      <AnimatePresence>
        {selectedWorkshop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setSelectedWorkshop(null)}></div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#F7F5F0] p-6 rounded-3xl border border-stone-250 w-full max-w-md relative z-10 space-y-4 shadow-2xl"
            >
              <button onClick={() => setSelectedWorkshop(null)} className="absolute top-4 right-4 p-1 rounded-full hover:bg-stone-200 text-stone-500">
                <X className="w-5 h-5" />
              </button>

              {isSuccess ? (
                <div className="text-center py-6 space-y-4 flex flex-col items-center">
                  <span className="text-3xl">🎉</span>
                  <h4 className="font-serif text-base font-bold text-[#5A5A40]">Đăng Ký Workshop Thành Công!</h4>
                  <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                    Bạn đã đăng ký thành công suất tham dự <strong>{selectedWorkshop.title}</strong>. Thư xác nhận hướng dẫn thanh toán gieo duyên đã được gửi tới số điện thoại của bạn.
                  </p>
                  <p className="text-[9px] text-stone-400">Tự động đóng sau vài giây...</p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-[#5A5A40]">ĐĂNG KÝ HOẠT ĐỘNG</span>
                    <h3 className="font-serif text-lg font-bold text-stone-900 mt-1">{selectedWorkshop.title}</h3>
                    <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                      Phí gieo duyên: <strong className="text-[#5A5A40] font-mono">{selectedWorkshop.fee}</strong>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-[9px] uppercase tracking-widest font-bold text-stone-400">Nội dung học chính:</h5>
                    <div className="space-y-1 text-stone-600 text-xs pl-2">
                      {selectedWorkshop.curriculum.map((cur: string, cIdx: number) => (
                        <div key={cIdx} className="flex items-start gap-1">
                          <span className="text-[#5A5A40] mr-1">•</span>
                          <span>{cur}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-stone-200">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Họ và tên *</label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Vân"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white text-stone-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Số điện thoại Zalo *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0912345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white text-stone-800"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#5A5A40] hover:bg-[#484833] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md"
                  >
                    Xác nhận thông tin &amp; Đặt vé
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


// -------------------------------------------------------------
// 6. LIBRARY VIEW
// -------------------------------------------------------------
export const AcademyView: React.FC<NavigationViewsProps> = ({ handleOpenEbookCheckout, onJoinZaloGroup }) => {
  return (
    <LibraryView
      handleOpenEbookCheckout={handleOpenEbookCheckout}
      onJoinZaloGroup={onJoinZaloGroup}
    />
  );
};


// -------------------------------------------------------------
// 7. RESEARCH VIEW
// -------------------------------------------------------------
export const ResearchView: React.FC<NavigationViewsProps> = () => {
  const [selectedResearch, setSelectedResearch] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Tất cả học thuật" },
    { id: "research", label: "Nghiên cứu khoa học" },
    { id: "framework", label: "Framework & Phương pháp" },
    { id: "article", label: "Bài viết chuyên sâu" },
    { id: "casestudy", label: "Case Study thực tế" },
    { id: "report", label: "Báo cáo xã hội học" }
  ];

  const researches = [
    {
      id: "labeling_effect",
      category: "research",
      title: "Ảnh hưởng của dán nhãn Thần số học đến tâm lý tự định vị",
      author: "Nhóm Nghiên cứu Hành vi Vân Mộc",
      date: "Tháng 05/2026",
      summary: "Khảo sát thực tiễn chỉ ra việc quá lạm dụng các con số dẫn đến xu hướng thoái lui trách nhiệm cá nhân, đổ lỗi cho hoàn cảnh số mệnh thay vì rèn luyện bản ngã.",
      content: "Nghiên cứu được thực hiện trên quy mô 500 người đã từng sử dụng dịch vụ Thần số học tại Việt Nam. Kết quả cho thấy 64% người tham gia có xu hướng đổ lỗi cho 'Chỉ số bài học đường đời' khi gặp thất bại trong công việc hoặc quan hệ, thay vì nhìn nhận sâu sắc các thói quen cũ. Từ đó, Vân Mộc đưa ra cảnh báo: Thần số học chỉ nên được xem là PHƯƠNG TIỆN chỉ đường ban đầu, sự rèn luyện tự chủ hằng ngày mới là nhân tố quyết định số phận.",
      recommendations: "1. Không lạm dụng việc phán đoán bói toán thần số học gây hoang mang.\n2. Coi chỉ số như bài tập học hỏi, không coi là định mệnh bất biến.\n3. Kết hợp viết nhật ký thấu suốt hằng ngày để chuyển hóa hành vi bản ngã."
    },
    {
      id: "childhood_trauma",
      category: "research",
      title: "Khuôn mẫu ứng xử phản ứng tự động ở người từng trải qua tổn thương thời thơ ấu",
      author: "Ban Nghiên cứu Tâm lý học Vân Mộc",
      date: "Tháng 03/2026",
      summary: "Phân tích các phản ứng của bản ngã như né tránh (Avoidant), lo âu (Anxious) trong quan hệ xã hội của người từng chịu vết thương bị khước từ lúc nhỏ.",
      content: "Thông qua 120 ca nghiên cứu lâm sàng tại phòng tham vấn Vân Mộc, ban nghiên cứu ghi nhận mối tương quan chặt chẽ giữa sự thiếu hụt an toàn thuở nhỏ và hội chứng giữ khoảng cách quá mức khi trưởng thành. Những người này lập nên một 'bức tường bảo vệ bản ngã' kiên cố để tránh đau buồn, nhưng đồng thời cũng cô lập chính mình khỏi tình yêu thương chân thực.",
      recommendations: "1. Thực hành bài tập thấu hiểu đứa trẻ bên trong hằng ngày.\n2. Thiết lập ranh giới an toàn cho bản thân một cách thấu cảm ôn hòa.\n3. Áp dụng trị liệu Reiki tiếp đất để xoa dịu hệ thần kinh giao cảm."
    },
    {
      id: "journal_therapy",
      category: "research",
      title: "Mối liên hệ giữa việc viết nhật ký phản tư hằng ngày và khả năng làm chủ lo âu",
      author: "Vân Mộc Mental Wellness Lab",
      date: "Tháng 01/2026",
      summary: "Đánh giá hiệu quả lâm sàng của liệu trình viết dòng chảy cảm xúc không phán xét trong việc giảm cortisol và ổn định nhịp tim.",
      content: "Thử nghiệm lâm sàng 30 ngày trên nhóm phụ nữ văn phòng tuổi 25-35 chỉ ra việc dành ra 10 phút viết nhật ký tự thấu cảm mỗi tối giúp làm giảm 28% chỉ số căng thẳng tự cảm nhận. Hành động viết giấy giúp các suy nghĩ hỗn loạn trong vỏ não trước trán được sắp xếp rõ ràng, tách biệt cảm xúc tiêu cực khỏi bản ngã khách quan.",
      recommendations: "1. Sử dụng tính năng Nhật Ký Đồng Hành của Vân Mộc AI mỗi ngày.\n2. Viết tự do không chỉnh sửa, không phán xét chính tả.\n3. Đọc lại bài viết dưới góc nhìn một người tri kỷ bao dung thầm lặng."
    },
    {
      id: "vm_hos_framework",
      category: "framework",
      title: "VM-HOS Framework: Hệ sinh thái 8 chiều kích phát triển con người toàn vẹn",
      author: "Viện Nghiên Cứu Nhân Tâm Vân Mộc Academy",
      date: "Tháng 06/2026",
      summary: "Hệ thống cấu trúc lý thuyết toàn diện định vị tiến trình tiến hóa của một con người đi từ gốc rễ Nền tảng tới Mục đích tối thượng.",
      content: "Hệ thống VM-HOS (Vân Mộc Human Orientation System) được đúc kết từ sự giao thoa giữa Thần số học hàn lâm, Reiki năng lượng sinh học và Tâm lý học phản phản tư. Framework chia đời sống một người thành 8 trục bánh xe thiết yếu, giúp người thực hành tự kiểm định, định vị giai đoạn bế tắc và sử dụng các nghi thức gieo tâm tương thích để cân bằng trường khí.",
      recommendations: "1. Thực hiện tự kiểm tra 8 chiều kích mỗi quý 1 lần qua hệ thống VM-HOS.\n2. Tập trung củng cố ranh giới Foundation & Identity vững chãi trước khi thăng hoa ở Purpose.\n3. Thiết kế nghi thức tiếp đất tương thích với trung tâm năng lượng gốc suy yếu."
    },
    {
      id: "pratipaksha_framework",
      category: "framework",
      title: "Mô hình Phản Phác 4 Giai đoạn: Giải mã & Tái thiết lập Ranh giới Bản ngã",
      author: "Hội Đồng Học Thuật Vân Mộc Lab",
      date: "Tháng 04/2026",
      summary: "Phương pháp tháo dỡ các cơ chế tự vệ vô thức phản ứng tự động hình thành từ vết thương cũ để quay về tự tính nguyên bản.",
      content: "Mô hình Phản Phác (Pratipaksha Method) gồm 4 chặng: Nhận diện cảm xúc (Aware) -> Chấp nhận bao dung (Accept) -> Phản tư tách biệt khỏi suy nghĩ (De-identify) -> Gieo nếp sống lành mạnh mới (Re-pattern). Phương pháp này giúp dập tắt phản xạ tự vệ mù quáng, bảo toàn năng lượng và thiết lập ranh giới giao tiếp tôn nghiêm.",
      recommendations: "1. Áp dụng kỹ thuật thở luân phiên 4-7-8 khi cảm nhận nhịp tim tăng quá độ.\n2. Viết tự xả ly cảm xúc thầm lặng không giấu giếm.\n3. Cúi đầu trân trọng cơ chế tự vệ cũ vì đã đồng hành vượt giông bão quá khứ."
    },
    {
      id: "defense_mechanism_ego",
      category: "article",
      title: "Cơ chế phòng vệ bản ngã: Khi chiếc khiên bảo vệ trở thành ngục tối cô độc",
      author: "ThS. Tâm lý học lâm sàng Nguyễn Hồng Vân",
      date: "Tháng 05/2026",
      summary: "Phân tích cách các phản ứng né tránh hay lo âu âm thầm bóp nghẹt những kết nối đồng điệu chân thực hằng ngày.",
      content: "Khi chúng ta trải qua tổn thương thuở nhỏ, bản ngã sẽ dựng lên các cơ chế tự vệ kiên cố. Trớ trêu thay, khi trưởng thành, chiếc khiên ấy biến thành bức tường giam cầm linh hồn, ngăn cản sự thấu cảm và đồng điệu lành mạnh. Bài viết chỉ ra lăng kính can đảm nhìn nhận vết thương cũ chính là chìa khóa mở tung cánh cửa ngục tối cô độc.",
      recommendations: "1. Nghiên cứu sâu Chương 3 Ebook 'Ranh Giới Tâm Hồn'.\n2. Thực hành gọi tên cơ chế né tránh khi bắt đầu có xu hướng đẩy người khác ra xa.\n3. Đeo vòng đá mắt hổ hoặc thạch anh xám để tăng cường sức mạnh vững chãi tiếp đất."
    },
    {
      id: "case_anxious_attachment",
      category: "casestudy",
      title: "Case Study: Chuyển hóa hội chứng lo âu & Kiểm soát của nữ quản lý 31 tuổi",
      author: "Hội đồng Khai vấn Vân Mộc Academy",
      date: "Tháng 02/2026",
      summary: "Hành trình tháo gỡ xu hướng kiểm soát cực đoan trong tình cảm bắt nguồn từ tổn thương thiếu hụt an toàn thuở nhỏ.",
      content: "Học viên N.T.M (31 tuổi, Giám đốc tài chính) tìm đến Vân Mộc trong trạng thái rối loạn lo âu nặng nề vì xu hướng ghen tuông, kiểm soát người bạn đồng hành. Qua 8 phiên khai vấn HDE cấu trúc kết hợp thực hành Reiki tiếp đất, chị M đã nhận thức sâu sắc vết thương bị khước từ lúc nhỏ khi bố mẹ ly dị, học cách tự ôm ấp bản thân và thiết lập ranh giới tự tôn.",
      recommendations: "1. Áp dụng nghiêm túc giáo án Workbook 30 Ngày đối thoại với đứa trẻ bên trong.\n2. Gieo duyên vòng thạch anh hồng để nuôi dưỡng sóng thấu cảm dịu lành.\n3. Tham gia nhóm Zalo Group để tìm kiếm sự nâng đỡ của cộng đồng thầm lặng."
    },
    {
      id: "vietnam_wellness_report",
      category: "report",
      title: "Báo cáo Sức khỏe Tinh thần và Xu hướng Chữa lành tại Việt Nam năm 2026",
      author: "Ban Nghiên cứu Xã hội học Vân Mộc",
      date: "Tháng 06/2026",
      summary: "Khảo sát thực nghiệm diện rộng chỉ ra xu hướng quay về với nếp sống chậm tỉnh thức, Reiki năng lượng và thực hành nhật trình tự thấu suốt.",
      content: "Báo cáo thực tế trên quy mô 2,000 trí thức trẻ đô thị cho thấy áp lực tài chính và quá tải công nghệ đang đẩy 74% người tham gia vào trạng thái căng thẳng mãn tính. Có sự dịch chuyển vượt bậc từ các dịch vụ bói toán ngắn hạn mê tín sang các giải trình rèn luyện nhân tâm nghiêm túc, khoa học hành vi và sử dụng đá thạch anh tự nhiên để bổ trợ tinh thần lành mạnh.",
      recommendations: "1. Đọc bản toàn văn PDF báo cáo tại website chính thức Vân Mộc.\n2. Tăng cường rèn luyện nếp sống tĩnh lặng hằng ngày thay vì chạy theo các lớp học cấp tốc.\n3. Đăng ký nhận bản tin định kỳ của Wellness Lab để cập nhật dữ liệu mới nhất."
    }
  ];

  const filteredResearches = activeCategory === "all"
    ? researches
    : researches.filter(res => res.category === activeCategory);

  // Auto-select first item when category changes
  useEffect(() => {
    if (filteredResearches.length > 0) {
      setSelectedResearch(filteredResearches[0]);
    } else {
      setSelectedResearch(null);
    }
  }, [activeCategory]);

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-3 py-1 rounded-full">Không Gian Nghiên Cứu Học Thuật</span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
          Nghiên Cứu &amp; Framework Bản Quyền<span className="text-[#5A5A40]">.</span>
        </h2>
        <p className="text-xs md:text-sm text-stone-500 max-w-xl mx-auto">
          Tại Vân Mộc, mọi lý thuyết phát triển con người đều được xây dựng dựa trên sự kết hợp chặt chẽ giữa khoa học tâm lý học lâm sàng, vật lý lượng tử năng lượng sinh học và khảo sát thực nghiệm xã hội học nghiêm túc.
        </p>
        <div className="h-[1.5px] w-16 bg-[#5A5A40]/25 mx-auto mt-4"></div>
      </div>

      {/* Category Tab Filter */}
      <div className="flex flex-wrap gap-1.5 border-b border-stone-200 pb-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer border ${
              activeCategory === cat.id
                ? "bg-[#5A5A40] text-white border-[#5A5A40]"
                : "bg-white text-stone-600 hover:bg-stone-100 border-stone-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left List of publications */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs uppercase tracking-wider font-bold text-stone-400 pl-1">
            Ấn phẩm học thuật ({filteredResearches.length})
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {filteredResearches.map((res) => (
              <button
                key={res.id}
                onClick={() => setSelectedResearch(res)}
                className={`w-full p-5 rounded-3xl border text-left transition-all duration-300 cursor-pointer ${
                  selectedResearch?.id === res.id
                    ? "bg-[#5A5A40]/10 border-[#5A5A40]"
                    : "bg-white text-stone-750 border-stone-200 hover:border-[#5A5A40]/40"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[9px] font-mono text-stone-400">{res.date}</span>
                  <span className="text-[9px] font-bold text-[#5A5A40] uppercase tracking-wider">
                    {res.category === "research" && "Nghiên cứu khoa học"}
                    {res.category === "framework" && "Framework"}
                    {res.category === "article" && "Bài viết chuyên sâu"}
                    {res.category === "casestudy" && "Case Study"}
                    {res.category === "report" && "Báo cáo xã hội"}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-stone-900 leading-snug">
                  {res.title}
                </h4>
                <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
                  {res.summary}
                </p>
                <span className="text-[10px] text-stone-400 block mt-3 font-medium">✍️ Đơn vị: {res.author}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Detail Screen */}
        <div className="lg:col-span-7">
          {selectedResearch ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 space-y-5 shadow-xs"
            >
              <div>
                <span className="text-[9px] uppercase tracking-wider font-mono text-stone-400">
                  Tác giả: {selectedResearch.author} • {selectedResearch.date}
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-stone-900 font-bold mt-2 leading-snug">
                  {selectedResearch.title}
                </h3>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl italic text-xs leading-relaxed text-stone-600 border-l-2 border-[#5A5A40]">
                “{selectedResearch.summary}”
              </div>

              <div className="space-y-2">
                <h5 className="text-[10px] uppercase font-bold tracking-widest text-[#5A5A40]">Khảo sát chi tiết &amp; Khám phá thực nghiệm:</h5>
                <p className="text-xs md:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                  {selectedResearch.content}
                </p>
              </div>

              <div className="p-5 bg-amber-50/40 border border-amber-200 rounded-2xl space-y-2">
                <h5 className="text-[10px] uppercase font-bold tracking-widest text-amber-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Giải pháp rèn luyện &amp; Đề xuất học thuật:</span>
                </h5>
                <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-line font-mono">
                  {selectedResearch.recommendations}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-[#5A5A40]/5 border border-dashed border-[#5A5A40]/30 rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center space-y-4 min-h-[400px]">
              <Compass className="w-10 h-10 text-[#5A5A40]/40" />
              <h4 className="font-serif text-base font-semibold text-stone-850">Chọn tài liệu học thuật</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Nhấp chọn ấn phẩm nghiên cứu hoặc bài viết học thuật bên trái để xem đầy đủ phát hiện khoa học hành vi, framework bản quyền và đề xuất rèn luyện đi kèm.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};


// -------------------------------------------------------------
// 8. ABOUT VIEW
// -------------------------------------------------------------
export const AboutView: React.FC<NavigationViewsProps> = () => {
  return (
    <div className="space-y-12 text-left">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-3 py-1 rounded-full">Câu Chuyện Sáng Lập</span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
          About Vân Mộc<span className="text-[#5A5A40]">.</span>
        </h2>
        <p className="text-xs font-semibold uppercase tracking-wider italic text-[#5A5A40] mt-1">
          (Về Vân Mộc)
        </p>
        <p className="text-xs md:text-sm text-stone-500 max-w-xl mx-auto">
          Hành trình chuyển hóa từ những vết thương sâu sắc nhất để tìm lại bản sắc nguyên bản tự tại.
        </p>
        <div className="h-[1.5px] w-16 bg-[#5A5A40]/25 mx-auto mt-4"></div>
      </div>

      {/* Grid Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Story copy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-bold text-[#5A5A40] font-serif italic">Khởi Nguồn Của Vân Mộc</span>
            <h3 className="text-2xl md:text-3xl font-serif text-stone-950 leading-snug font-normal">
              Có những hành trình không bắt đầu từ thành công, mà bắt đầu từ <span className="italic text-[#5A5A40]">những lần vụn vỡ.</span>
            </h3>
          </div>

          <div className="text-xs md:text-sm text-stone-700 leading-relaxed font-sans space-y-5">
            <p>
              Vân Mộc không ra đời từ một kế hoạch kinh doanh được tính toán chi li, cũng không được tạo dựng bởi một đội ngũ chuyên gia ngay từ vạch xuất phát. Vân Mộc được phôi thai và sinh ra từ chính hành trình trải nghiệm, vấp ngã và tự cứu lấy mình của người sáng lập.
            </p>
            <p>
              Đó là những năm tháng đi qua những vấp ngã sâu sắc trong tình cảm, những rạn nứt đau đớn trong các mối quan hệ, gánh nặng áp lực tài chính đè nặng, và cả những lần dốc lòng xây dựng để rồi chứng kiến mọi thứ đổ vỡ tan tành. Đã có những thời điểm mình hoàn toàn mất phương hướng, đánh mất niềm tin vào bản thân và cả cuộc sống này, chỉ biết ôm lấy bất lực và tự hỏi trong nước mắt: <em className="text-[#5A5A40] font-serif not-italic font-medium">"Vì sao mọi chuyện lại xảy ra với mình?"</em>
            </p>
            <p>
              Nhưng chính trong những khoảnh khắc cô độc ấy, khi càng đi tìm câu trả lời ở bên ngoài, mình càng nhận ra một sự thật rõ ràng: <strong className="text-stone-900">Gốc rễ của mọi vấn đề không nằm ở hoàn cảnh bên ngoài, mà nằm ở việc mình chưa thật sự thấu hiểu chính mình.</strong>
            </p>

            <div className="p-4 bg-[#5A5A40]/5 border-l-2 border-[#5A5A40] rounded-r-2xl italic font-serif text-stone-800 my-4 text-xs md:text-sm">
              Hành trình chuyển hóa thực sự chỉ bắt đầu khi ta can đảm quay về bên trong.
            </div>

            <p>
              Và mình bắt đầu học. Học để hiểu thấu suốt về con người, học để gọi tên từng rung động của cảm xúc, học để nhìn ra những khuôn mẫu tâm lý vô thức đang âm thầm kéo lùi cuộc sống của mình suốt bấy lâu. 
            </p>
            <p>
              Mình tìm đến <span className="text-[#5A5A40] font-semibold">Thần số học</span> như một chiếc gương soi chiếu để nhìn lại năng lượng cốt lõi của bản thân dưới một lăng kính mới bao dung hơn. Mình thực hành <span className="text-[#5A5A40] font-semibold">Reiki</span> để học cách lắng nghe, vỗ về và tự chăm sóc cho thân tâm mình. Mình đọc sâu về <span className="text-[#5A5A40] font-semibold">Tâm lý học</span>, phát triển bản thân và Khai vấn (Coaching) để thấu hiểu một chân lý sâu sắc: Mỗi trải nghiệm, dù đắng cay đến đâu, đều là một bài học thiêng liêng nếu ta biết nhìn nhận đúng cách.
            </p>
            <p>
              Điều thay đổi hoàn toàn cuộc đời mình không phải là một phương pháp kỳ diệu, xa vời nào cả. Mà là khoảnh khắc mình dần thấu hiểu bản thân, dám thay đổi tư duy từ gốc rễ, tự chữa lành những khoảng trống tổn thương bên trong và bắt đầu chịu trách nhiệm 100% cho số phận của chính mình.
            </p>
            <p>
              Vân Mộc được tạo dựng từ chính niềm tin nguyên bản ấy. Giống như đóa sen thanh khiết vươn lên từ bùn lầy nhưng không hề mang theo mùi bùn, mình tin tưởng sâu sắc rằng mỗi con người đều mang trong mình khả năng chuyển hóa những vết thương thành nguồn sức mạnh nội sinh vô hạn, nếu được trao gửi đúng góc nhìn và đúng phương pháp rèn luyện.
            </p>
            <p>
              Vân Mộc sẽ không hứa hẹn sẽ thay bạn giải quyết mọi vấn đề một cách thần tốc. Vân Mộc sinh ra để trở thành một người đồng hành thầm lặng, chân thành, giúp bạn thấu suốt bản thân, nhìn rõ những khuôn mẫu cũ đang lặp lại, nuôi dưỡng nội lực vững vàng để từng bước kiến tạo một cuộc sống tự chủ, đúng với giá trị đích thực của riêng mình.
            </p>
            
            <div className="pt-4 font-serif text-stone-900 border-t border-stone-200 mt-6 italic font-medium text-sm md:text-base text-center lg:text-left">
              “Khi một người thật sự hiểu mình, họ sẽ không còn đi tìm vận may ở bên ngoài, mà bắt đầu tự kiến tạo vận mệnh bằng những lựa chọn có ý thức mỗi ngày.”
            </div>
          </div>
        </div>

        {/* Visual card */}
        <div className="lg:col-span-5 lg:sticky lg:top-6">
          <div className="p-8 rounded-3xl bg-[#5A5A40] text-white space-y-4 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none"></div>
            <Sparkle className="w-8 h-8 text-amber-200 animate-pulse" />
            <h4 className="font-serif text-lg italic text-amber-100 leading-relaxed">
              “Vân Mộc ra đời để giúp bạn đứng vững trên đôi chân của mình, sống bằng cốt cách thanh cao và bản sắc nguyên bản nhất.”
            </h4>
            <div className="h-[1px] w-16 bg-white/20"></div>
            <p className="text-[11px] leading-relaxed opacity-90 font-mono">
              Nhà sáng lập Vân Mộc • Chữa lành từ gốc, Kiến tạo từ nội tâm.
            </p>
          </div>
        </div>

      </div>

      {/* Core values list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-stone-200">
        
        <div className="p-6 bg-white rounded-3xl border border-stone-200 space-y-2">
          <span className="text-xs font-bold text-[#5A5A40] uppercase">01. Điều Vân Mộc TIN</span>
          <p className="text-xs text-stone-600 leading-relaxed">
            Mỗi người sinh ra đã có một bản đồ năng lượng nguyên bản tuyệt hảo. Bạn không cần phải sửa chữa để trở thành ai khác, chỉ cần quay về thấu suốt chính mình.
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-stone-200 space-y-2">
          <span className="text-xs font-bold text-[#5A5A40] uppercase">02. Điều Vân Mộc LÀM</span>
          <p className="text-xs text-stone-600 leading-relaxed">
            Xây dựng các giáo trình đồng hành rèn luyện nhân tâm hằng ngày, thiết kế các phương tiện neo tâm trí tinh tế (Ebook, vòng đá quý tự nhiên thạch anh) chất lượng cao.
          </p>
        </div>

        <div className="p-6 bg-[#F7F5F0] rounded-3xl border border-stone-200 space-y-2">
          <span className="text-xs font-bold text-rose-800 uppercase">03. Điều Vân Mộc KHÔNG làm</span>
          <p className="text-xs text-stone-600 leading-relaxed">
            Chúng tôi tuyệt đối KHÔNG gieo rắc sự mê tín, bói toán gây hoang mang lo lắng, không bán các cam kết chữa lành siêu tốc thần kỳ không cần qua nỗ lực thực hành tự thân.
          </p>
        </div>

      </div>

      {/* Touch of Soul Quote (Đoạn Tâm Đắc Cuối Trang Về Vân Mộc) */}
      <div className="pt-12 border-t border-stone-200">
        <div className="max-w-2xl mx-auto text-center space-y-6 py-10 px-6 md:px-12 bg-[#5A5A40]/5 rounded-3xl border border-[#5A5A40]/10 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-[#5A5A40]/30"></div>
          
          <span className="text-[9px] uppercase tracking-widest font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-3 py-1 rounded-full">Thông Điệp Từ Trái Tim</span>
          
          <div className="space-y-4 font-serif text-stone-800 leading-relaxed text-sm md:text-base md:leading-loose max-w-xl mx-auto italic font-medium">
            <p>“Mình không ở đây vì chưa từng tổn thương.</p>
            <p>Mình ở đây vì đã từng đi qua những tổn thương ấy.</p>
            <p className="mt-4">Mình không ở đây để nói rằng cuộc sống sẽ không còn khó khăn.</p>
            <p>Mình ở đây để chia sẻ rằng, khi hiểu bản thân đủ sâu, mỗi biến cố đều có thể trở thành một cánh cửa mở ra phiên bản trưởng thành hơn của chính mình.”</p>
          </div>

          <div className="pt-4 border-t border-stone-200/40 max-w-xs mx-auto">
            <p className="text-xs font-sans font-bold text-[#5A5A40] tracking-widest uppercase">
              Đó là lý do Vân Mộc ra đời.
            </p>
            <div className="h-[2px] w-8 bg-[#5A5A40]/30 mx-auto mt-4"></div>
          </div>
        </div>
      </div>

    </div>
  );
};


// -------------------------------------------------------------
// 9. CONTACT VIEW
// -------------------------------------------------------------
export const ContactView: React.FC<NavigationViewsProps> = ({ onJoinZaloGroup }) => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setName("");
      setMsg("");
    }, 4000);
  };

  return (
    <div className="space-y-12 text-left">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-3 py-1 rounded-full">Kênh Trò Chuyện</span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
          Kết Nối Với Vân Mộc<span className="text-[#5A5A40]">.</span>
        </h2>
        <p className="text-xs md:text-sm text-stone-500 max-w-xl mx-auto">
          Mọi thắc mắc của bạn về lộ trình phát triển con người, rèn luyện nhân tâm hay nhu cầu tư vấn vòng đá thiết kế riêng đều được lắng nghe chu đáo.
        </p>
        <div className="h-[1.5px] w-16 bg-[#5A5A40]/25 mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column Contact Channels */}
        <div className="lg:col-span-5 space-y-5">
          <div className="text-xs uppercase tracking-wider font-bold text-stone-400 pl-1">
            Kênh liên lạc chính thức
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 space-y-4">
            
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-mono tracking-wider text-stone-400 block">Văn phòng chính</span>
              <p className="text-xs md:text-sm text-stone-800 font-serif font-bold">
                Yên Space, Số 18 Đường Sương Nguyệt Ánh, Quận 1, TP.HCM
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase font-mono tracking-wider text-stone-400 block">Thời gian tiếp khách</span>
              <p className="text-xs md:text-sm text-stone-800 font-sans font-semibold">
                Thứ Hai - Chủ Nhật: 08:30 - 21:00
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase font-mono tracking-wider text-stone-400 block">Email hỗ trợ học thuật</span>
              <p className="text-xs md:text-sm text-stone-800 font-mono">
                thucgiacanlanh@gmail.com
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <span className="text-[9px] uppercase font-mono tracking-wider text-stone-400 block mb-2">Không gian nhóm thầm lặng</span>
              <a
                href="https://zalo.me/g/sfo4yrnckqnqu2xzix8e"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0068FF] hover:bg-[#0055D0] text-white rounded-xl text-xs font-bold transition-all"
              >
                <span>Tham Gia Group Zalo 💬</span>
              </a>
            </div>

          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-xs">
            {isSent ? (
              <div className="text-center py-12 space-y-4 flex flex-col items-center">
                <span className="text-3xl">✉️</span>
                <h4 className="font-serif text-base font-bold text-[#5A5A40]">Tin Nhắn Đã Được Gửi Đi!</h4>
                <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                  Cảm ơn tâm tình của bạn gửi tới Vân Mộc. Chúng tôi đọc từng bức thư trong sự thầm lặng thấu thấu cảm, phản hồi sớm nhất qua số Zalo của bạn.
                </p>
                <p className="text-[9px] text-stone-400 italic">Tự động xóa tin nhắn sau vài giây...</p>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-4">
                <div className="text-left">
                  <h4 className="font-serif text-base font-bold text-stone-800">Gửi lời nhắn thầm lặng</h4>
                  <p className="text-xs text-stone-400 mt-1">Để lại tâm sự của bạn, không gian này tuyệt đối bảo mật.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Tên của bạn *</label>
                    <input
                      type="text"
                      required
                      placeholder="Người thương..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/30 text-stone-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Hòm thư / SĐT Zalo để nhận thư hồi âm *</label>
                    <input
                      type="text"
                      required
                      placeholder="Email hoặc số điện thoại..."
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/30 text-stone-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Lời nhắn gửi gắm *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Viết bất kỳ băn khoăn nào của bạn về lộ trình phát triển của Vân Mộc..."
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      className="w-full p-4 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/30 text-stone-800 placeholder-stone-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#5A5A40] hover:bg-[#484833] text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi tin nhắn gieo duyên</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};


// -------------------------------------------------------------
// 10. HỒ SƠ PHÁT TRIỂN CON NGƯỜI VIEW
// -------------------------------------------------------------
interface DimensionDetail {
  title: string;
  subtitle: string;
  questions: string[];
  icon: string;
  color: string;
}

const DIMENSION_METADATA: Record<string, DimensionDetail> = {
  foundation: {
    title: "Nền tảng (Foundation)",
    subtitle: "Giá trị cốt lõi & Gốc rễ tiếp đất",
    questions: [
      "Những giá trị cốt lõi nào bạn tuyệt đối không thỏa hiệp trong cuộc sống?",
      "Mối liên kết giữa bạn và nguồn cội (gia đình, tổ tiên, quê hương) đang như thế nào?",
      "Điều gì khiến bạn cảm thấy vững chãi nhất khi giông bão cuộc đời ập đến?"
    ],
    icon: "Compass",
    color: "amber"
  },
  identity: {
    title: "Bản sắc (Identity)",
    subtitle: "Định vị phong cách & Tiếng nói chân thật",
    questions: [
      "Nếu bỏ qua mọi danh xưng, bằng cấp, kỳ vọng xã hội, bạn tự định vị mình là ai?",
      "Đâu là điểm độc bản/khác biệt lớn nhất trong phong cách sống của bạn?",
      "Bạn có đang nói tiếng nói chân thật của mình, hay đang phản chiếu mong muốn người khác?"
    ],
    icon: "Sparkle",
    color: "emerald"
  },
  energy: {
    title: "Năng lượng (Energy)",
    subtitle: "Thể chất vững vàng & Sóng rung động lành mạnh",
    questions: [
      "Trạng thái cơ thể vật lý và tinh thần của bạn vào mỗi sáng thức dậy như thế nào?",
      "Những nguồn lực hoặc hoạt động nào giúp bạn tái tạo năng lượng nhanh nhất?",
      "Bạn có nhận biết được trường năng lượng (vibes) xung quanh mình và người khác không?"
    ],
    icon: "Activity",
    color: "blue"
  },
  mind: {
    title: "Tâm trí (Mind)",
    subtitle: "Giải phóng niềm tin giới hạn & Tĩnh lặng nội tâm",
    questions: [
      "Những suy nghĩ/nỗi sợ nào thường xuyên lặp đi lặp lại trong đầu bạn?",
      "Bạn đối phó thế nào với những niềm tin giới hạn ('mình không đủ giỏi', 'mình không xứng đáng')?",
      "Bạn dành bao nhiêu thời gian hằng ngày cho việc tĩnh lặng và quan sát tâm trí?"
    ],
    icon: "Brain",
    color: "stone"
  },
  emotion: {
    title: "Cảm xúc (Emotion)",
    subtitle: "Bao dung ôm ấp & Tự chữa lành tổn thương",
    questions: [
      "Khi một cảm xúc tiêu cực (giận dữ, buồn bã) ập đến, bạn thường phản ứng thế nào?",
      "Bạn có khả năng gọi tên chính xác và bao dung ôm ấp cảm xúc của mình không?",
      "Mức độ tự chữa lành cảm xúc của bạn hiện tại đạt bao nhiêu điểm?"
    ],
    icon: "Heart",
    color: "rose"
  },
  habit: {
    title: "Thói quen (Habit)",
    subtitle: "Nghi thức gieo tâm & Nếp sống chậm tỉnh thức",
    questions: [
      "Bạn có những nghi thức rèn luyện tâm tính nào hằng ngày không (thiền, viết nhật ký, hít thở)?",
      "Những thói quen vô thức nào bạn biết rõ đang kéo lùi sự phát triển của bạn?",
      "Bạn có đang sống chậm và trân trọng những khoảnh khắc hiện tại không?"
    ],
    icon: "Calendar",
    color: "purple"
  },
  relationship: {
    title: "Mối quan hệ (Relationship)",
    subtitle: "Ranh giới lành mạnh & Đồng điệu thấu thấu cảm",
    questions: [
      "Các mối quan hệ xung quanh bạn có đang nuôi dưỡng hay bào mòn năng lượng của bạn?",
      "Bạn có gặp khó khăn trong việc thiết lập ranh giới lành mạnh (nói 'Không') không?",
      "Bạn có xu hướng kiểm soát hay muốn thay đổi người khác trong các mối quan hệ không?"
    ],
    icon: "UserCheck",
    color: "orange"
  },
  purpose: {
    title: "Mục đích (Purpose)",
    subtitle: "Lý do hiện hữu Ikigai & Di sản để lại",
    questions: [
      "Điều gì thúc đẩy bạn thức dậy mỗi sáng với niềm đam mê?",
      "Bạn đã tìm ra Ikigai (lý do hiện hữu) của cuộc đời mình chưa?",
      "Bạn mong muốn để lại di sản hay giá trị gì cho thế hệ mai sau?"
    ],
    icon: "Target",
    color: "red"
  }
};

const SUB_TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "foundation", label: "Foundation" },
  { id: "identity", label: "Identity" },
  { id: "energy", label: "Energy" },
  { id: "mind", label: "Mind" },
  { id: "emotion", label: "Emotion" },
  { id: "habit", label: "Habit" },
  { id: "relationship", label: "Relationship" },
  { id: "purpose", label: "Purpose" },
  { id: "human_map", label: "Human Map" },
  { id: "ai_report", label: "AI Report" },
  { id: "timeline", label: "Timeline" }
];

export const HoSoPhatTrienView: React.FC<NavigationViewsProps> = ({
  onJoinZaloGroup,
  hoSoActiveSubTab,
  setHoSoActiveSubTab,
  handleOpenEbookCheckout
}) => {
  const [localActiveSubTab, setLocalActiveSubTab] = useState<string>("dashboard");
  const activeSubTab = hoSoActiveSubTab || localActiveSubTab;
  const setActiveSubTab = setHoSoActiveSubTab || setLocalActiveSubTab;

  // Profile fields
  const [profile, setProfile] = useState({ name: "", phone: "", email: "" });
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Backup & Fallback States
  const [sheetsStatus, setSheetsStatus] = useState<{ configured: boolean; mode: "cloud_sync" | "local_fallback" | "checking" }>({
    configured: false,
    mode: "checking"
  });
  const [showBackupPanel, setShowBackupPanel] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [importText, setImportText] = useState("");
  const [importStatus, setImportStatus] = useState<{ type: "success" | "error" | null; msg: string }>({ type: null, msg: "" });

  // Fetch Sheets configuration status
  useEffect(() => {
    const checkSheetsStatus = async () => {
      try {
        const res = await fetch("/api/sheets/status");
        if (res.ok) {
          const data = await res.json();
          setSheetsStatus({
            configured: data.configured,
            mode: data.mode
          });
        } else {
          setSheetsStatus({ configured: false, mode: "local_fallback" });
        }
      } catch (err) {
        console.warn("Failed to ping sheets status API, defaulting to local fallback mode:", err);
        setSheetsStatus({ configured: false, mode: "local_fallback" });
      }
    };
    checkSheetsStatus();
  }, []);

  const getBackupPayload = () => {
    return JSON.stringify({
      version: "1.0",
      app: "van_moc_hspf",
      timestamp: new Date().toISOString(),
      profile,
      answers,
      scores,
      isReportUnlocked,
      reportText
    }, null, 2);
  };

  const handleExportBackupFile = () => {
    try {
      const payload = getBackupPayload();
      const blob = new Blob([payload], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `van_moc_backup_hspf_${profile.phone || "unregistered"}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Không thể sinh file dự phòng: " + e);
    }
  };

  const handleCopyBackupText = () => {
    try {
      navigator.clipboard.writeText(getBackupPayload());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (e) {
      alert("Không thể copy tự động, vui lòng tự sao chép.");
    }
  };

  const handleImportBackup = (text: string) => {
    setImportStatus({ type: null, msg: "" });
    if (!text.trim()) {
      setImportStatus({ type: "error", msg: "Vui lòng nhập nội dung mã dự phòng." });
      return;
    }

    try {
      const parsed = JSON.parse(text);
      if (parsed.app !== "van_moc_hspf" || !parsed.profile || !parsed.answers) {
        setImportStatus({ type: "error", msg: "Định dạng mã dự phòng không hợp lệ hoặc thiếu dữ liệu của Vân Mộc." });
        return;
      }

      // Restore states
      setProfile(parsed.profile);
      setAnswers(parsed.answers);
      setScores(parsed.scores || {
        foundation: 5, identity: 5, energy: 5, mind: 5, emotion: 5, habit: 5, relationship: 5, purpose: 5
      });
      setIsReportUnlocked(!!parsed.isReportUnlocked);
      setReportText(parsed.reportText || "");
      setIsRegistered(true);

      // Restore localStorage
      localStorage.setItem("van_moc_hspf_profile", JSON.stringify(parsed.profile));
      localStorage.setItem("van_moc_hspf_answers", JSON.stringify(parsed.answers));
      localStorage.setItem("van_moc_hspf_scores", JSON.stringify(parsed.scores || {}));
      localStorage.setItem("van_moc_hspf_unlocked", parsed.isReportUnlocked ? "true" : "false");
      if (parsed.reportText) {
        localStorage.setItem("van_moc_hspf_report_text", parsed.reportText);
      } else {
        localStorage.removeItem("van_moc_hspf_report_text");
      }

      setImportStatus({ type: "success", msg: "Phục hồi dữ liệu từ file dự phòng thành công!" });
      setImportText("");
      setTimeout(() => {
        setImportStatus({ type: null, msg: "" });
      }, 4000);
    } catch (err: any) {
      setImportStatus({ type: "error", msg: "Lỗi định dạng dữ liệu: " + err.message });
    }
  };

  const handleClearAllLocalData = () => {
    if (confirm("Cảnh báo: Hành động này sẽ xóa toàn bộ tiến trình khảo sát cục bộ trên trình duyệt của bạn. Bạn chắc chắn muốn thực hiện chứ?")) {
      localStorage.removeItem("van_moc_hspf_profile");
      localStorage.removeItem("van_moc_hspf_answers");
      localStorage.removeItem("van_moc_hspf_scores");
      localStorage.removeItem("van_moc_hspf_unlocked");
      localStorage.removeItem("van_moc_hspf_report_text");

      setProfile({ name: "", phone: "", email: "" });
      setIsRegistered(false);
      setAnswers({});
      setScores({
        foundation: 5, identity: 5, energy: 5, mind: 5, emotion: 5, habit: 5, relationship: 5, purpose: 5
      });
      setIsReportUnlocked(false);
      setReportText("");
      setActiveSubTab("dashboard");
      alert("Đã xóa sạch tiến trình cục bộ thành công.");
    }
  };

  // Assessment Answers & Scores
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({
    foundation: 5,
    identity: 5,
    energy: 5,
    mind: 5,
    emotion: 5,
    habit: 5,
    relationship: 5,
    purpose: 5
  });

  // Report and Payment
  const [isReportUnlocked, setIsReportUnlocked] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportText, setReportText] = useState("");
  const [zaloJoined, setZaloJoined] = useState(false);
  const [showPaymentQr, setShowPaymentQr] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  // Load from local storage
  useEffect(() => {
    const savedAnswers = localStorage.getItem("van_moc_hspf_answers");
    if (savedAnswers) {
      try { setAnswers(JSON.parse(savedAnswers)); } catch (e) {}
    }

    const savedScores = localStorage.getItem("van_moc_hspf_scores");
    if (savedScores) {
      try { setScores(JSON.parse(savedScores)); } catch (e) {}
    }

    const savedProfile = localStorage.getItem("van_moc_hspf_profile");
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        setIsRegistered(true);
      } catch (e) {}
    }

    const savedUnlocked = localStorage.getItem("van_moc_hspf_unlocked");
    if (savedUnlocked === "true") {
      setIsReportUnlocked(true);
    }

    const savedReport = localStorage.getItem("van_moc_hspf_report_text");
    if (savedReport) {
      setReportText(savedReport);
    }
  }, []);

  const saveAnswers = (newAnswers: Record<string, string>) => {
    setAnswers(newAnswers);
    localStorage.setItem("van_moc_hspf_answers", JSON.stringify(newAnswers));
  };

  const saveScores = (newScores: Record<string, number>) => {
    setScores(newScores);
    localStorage.setItem("van_moc_hspf_scores", JSON.stringify(newScores));
  };

  const saveProfile = (newProfile: typeof profile) => {
    setProfile(newProfile);
    localStorage.setItem("van_moc_hspf_profile", JSON.stringify(newProfile));
  };

  // Register Profile to Sheets
  const handleRegisterProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim() || !profile.phone.trim() || !profile.email.trim()) {
      alert("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Email gieo duyên.");
      return;
    }

    setIsRegistering(true);

    // 1. Save locally and redirect instantly to keep the user experience completely lag-free
    setIsRegistered(true);
    saveProfile(profile);
    setActiveSubTab("foundation");

    // 2. Perform Sheet registration asynchronously in the background
    fetch("/api/sheets/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: profile.name.trim(),
        customerEmail: profile.email.trim(),
        customerPhone: profile.phone.trim()
      })
    })
    .then((response) => {
      if (!response.ok) {
        console.warn("Sheets API returned non-ok status, fallback to local storage successful.");
      }
    })
    .catch((err) => {
      console.error("Sheets registration sync failed, falling back to local storage:", err);
    })
    .finally(() => {
      setIsRegistering(false);
    });
  };

  // Join Zalo and Sync status
  const handleZaloClick = async () => {
    setZaloJoined(true);
    try {
      await fetch("/api/sheets/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerPhone: profile.phone,
          customerEmail: profile.email,
          status: "joined zalo"
        })
      });
    } catch (err) {
      console.error(err);
    }
    window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank");
  };

  // Payment simulated confirm
  const handleConfirmPayment = async () => {
    setIsPaying(true);
    try {
      const response = await fetch("/api/sheets/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerPhone: profile.phone,
          customerEmail: profile.email,
          status: "paid"
        })
      });

      if (response.ok) {
        setIsReportUnlocked(true);
        localStorage.setItem("van_moc_hspf_unlocked", "true");
        setShowPaymentQr(false);
        alert("Thanh toán thành công! Báo cáo thông tuệ đã được mở khóa.");
      } else {
        alert("Cập nhật trạng thái thất bại. Hãy chắc chắn thông tin ghi danh khớp với bảng tính.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsPaying(false);
    }
  };

  // Generate Report via server Gemini API
  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    setReportText("");
    try {
      const res = await fetch("/api/gemini/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          scores,
          answers
        })
      });

      const data = await res.json();
      if (res.ok) {
        setReportText(data.reportText);
        localStorage.setItem("van_moc_hspf_report_text", data.reportText);
      } else {
        alert(`Lỗi tạo báo cáo: ${data.error}`);
      }
    } catch (e) {
      console.error(e);
      alert("Kết nối tới AI Mộc gặp trục trặc, xin vui lòng thử lại.");
    } finally {
      setIsGeneratingReport(false);
    }
  };

  // Helper render Lucide icons in table
  const renderIcon = (name: string, colorClass: string) => {
    const cls = `w-5 h-5 ${colorClass}`;
    switch (name) {
      case "Compass": return <Compass className={cls} />;
      case "Sparkle": return <Sparkle className={cls} />;
      case "Activity": return <Activity className={cls} />;
      case "Heart": return <Heart className={cls} />;
      case "Calendar": return <Calendar className={cls} />;
      case "UserCheck": return <UserCheck className={cls} />;
      case "Brain": return <BookOpen className={cls} />;
      default: return <Sparkles className={cls} />;
    }
  };

  // Calculation for total completion
  const totalCompleted = Object.keys(answers).length;
  const progressPercent = Math.min(100, Math.round((totalCompleted / 24) * 100));

  // Circular / Radar Mandala Coordinates generator
  const getRadarCoordinates = () => {
    const keys = ["foundation", "identity", "energy", "mind", "emotion", "habit", "relationship", "purpose"];
    const points: string[] = [];
    keys.forEach((key, index) => {
      const angle = index * (2 * Math.PI / 8) - Math.PI / 2;
      const score = scores[key] || 0;
      const r = (score / 10) * 110; // Max radius 110
      const cx = 150 + r * Math.cos(angle);
      const cy = 150 + r * Math.sin(angle);
      points.push(`${cx},${cy}`);
    });
    return points.join(" ");
  };

  return (
    <div className="space-y-10 text-left">
      {/* Editorial Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-3 py-1 rounded-full">
          Hành Trình Gốc Rễ Độc Bản
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
          Human Development Profile<span className="text-[#5A5A40]">.</span>
        </h2>
        <p className="text-xs font-semibold uppercase tracking-wider italic text-[#5A5A40] mt-1">
          (Hồ sơ Phát triển Con người)
        </p>
        <p className="text-xs md:text-sm text-stone-500 max-w-xl mx-auto">
          Khám phá 8 khía cạnh cốt lõi của nội lực, xây dựng bản đồ khí chất và nhận lại Báo cáo khai phá tinh anh từ Vân Mộc AI.
        </p>
        <div className="h-[1.5px] w-16 bg-[#5A5A40]/25 mx-auto mt-4"></div>
      </div>

      {/* Profile Registration Banner if not yet registered */}
      {!isRegistered ? (
        <div className="space-y-6 max-w-xl mx-auto">
          {/* Unregistered Connection Status Hint */}
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 flex items-center gap-3 text-xs text-stone-600">
            <div className="p-2 rounded-xl bg-white border border-stone-150 shadow-xs">
              {sheetsStatus.mode === "cloud_sync" ? (
                <Wifi className="w-4 h-4 text-emerald-600 animate-pulse" />
              ) : sheetsStatus.mode === "checking" ? (
                <div className="w-4 h-4 border-2 border-stone-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <WifiOff className="w-4 h-4 text-amber-600" />
              )}
            </div>
            <div className="text-left">
              <p className="font-bold text-stone-800">
                {sheetsStatus.mode === "cloud_sync" ? "Kết nối Vân Mộc Cloud Sẵn Sàng" : "Dự phòng Ngoại tuyến Thông minh Hoạt động"}
              </p>
              <p className="text-[10px] text-stone-500 mt-0.5 font-normal">
                {sheetsStatus.mode === "cloud_sync" 
                  ? "Dữ liệu ghi danh và kết quả trắc nghiệm sẽ đồng bộ trực tiếp lên hệ thống Cloud."
                  : "Hệ thống tự động kích hoạt Lưu trữ nội bộ an toàn. Mọi câu trả lời được bảo toàn ngay cả khi không có kết nối mạng."}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6 text-left">
            <div className="text-center">
              <span className="text-3xl">📝</span>
              <h3 className="font-serif text-lg font-bold text-stone-850 mt-2">Ghi Danh Khởi Tạo Hồ Sơ</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1">
                Điền thông tin gieo duyên để khởi tạo và đồng bộ tự động dữ liệu lên Bảng tính Cloud của Vân Mộc.
              </p>
            </div>

            <form onSubmit={handleRegisterProfile} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Họ và tên của bạn *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/30 text-stone-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Email của bạn *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="mail@gmail.com"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/30 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Số điện thoại Zalo *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912345678"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/30 text-stone-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isRegistering}
                className="w-full py-3.5 bg-[#5A5A40] hover:bg-[#484833] disabled:bg-stone-300 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                {isRegistering ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Đang ghi danh dữ liệu...</span>
                  </>
                ) : (
                  <span>Ghi danh &amp; Bắt đầu Khảo sát</span>
                )}
              </button>
            </form>

            {/* Restore option inside Registration state */}
            <div className="border-t border-stone-150 pt-4 text-center space-y-3">
              <p className="text-[10px] text-stone-500">
                Bạn đã có file lưu trữ dữ liệu trước đó?
              </p>
              <button
                onClick={() => setShowBackupPanel(!showBackupPanel)}
                className="text-[10px] font-bold text-[#5A5A40] hover:underline cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Phục hồi dữ liệu từ mã sao lưu (.json)</span>
              </button>

              <AnimatePresence>
                {showBackupPanel && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden space-y-2 mt-2 text-left"
                  >
                    <textarea
                      rows={3}
                      placeholder="Dán mã sao lưu (.json) của bạn tại đây để phục hồi..."
                      value={importText}
                      onChange={(e) => setImportText(e.target.value)}
                      className="w-full p-3 text-[10px] font-mono rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-stone-50 text-stone-850"
                    />
                    {importStatus.msg && (
                      <div className={`p-2.5 rounded-lg text-[10px] leading-relaxed ${importStatus.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"}`}>
                        {importStatus.msg}
                      </div>
                    )}
                    <button
                      onClick={() => handleImportBackup(importText)}
                      className="w-full py-2 bg-[#5A5A40] hover:bg-[#484833] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Upload className="w-3 h-3" />
                      <span>Nạp &amp; Khôi phục Tiến trình</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        /* Full Layout with sub-tabs and content */
        <div className="space-y-6">
          {/* Smart Backup & Connection Status Bar */}
          <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5 text-left">
              <div className="p-1.5 rounded-lg bg-white border border-stone-150">
                {sheetsStatus.mode === "cloud_sync" ? (
                  <Wifi className="w-4 h-4 text-emerald-600 animate-pulse" />
                ) : sheetsStatus.mode === "checking" ? (
                  <div className="w-4 h-4 border-2 border-stone-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <WifiOff className="w-4 h-4 text-amber-600 animate-pulse" />
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-bold text-stone-800">Chế độ đồng hành:</span>
                  {sheetsStatus.mode === "cloud_sync" ? (
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-bold rounded-md text-[9px] uppercase tracking-wide">
                      Đồng bộ Vân Mộc Cloud Active
                    </span>
                  ) : sheetsStatus.mode === "checking" ? (
                    <span className="text-stone-500 font-mono text-[10px]">Đang kiểm tra kết nối...</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-800 font-bold rounded-md text-[9px] uppercase tracking-wide">
                      Dự Phòng Ngoại Tuyến An Toàn (Offline Safe)
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-stone-500 mt-0.5 font-normal">
                  {sheetsStatus.mode === "cloud_sync"
                    ? "Hồ sơ của bạn được đồng bộ tự động lên Google Sheets & Local Storage."
                    : "Đang gieo duyên cục bộ an toàn. Bạn có thể xuất file lưu trữ hoặc tiếp tục chiêm nghiệm bất kỳ lúc nào."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBackupPanel(!showBackupPanel)}
                className="px-3 py-1.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Database className="w-3.5 h-3.5 text-stone-500" />
                <span>Sao lưu &amp; Phục hồi</span>
              </button>
              
              <button
                onClick={handleClearAllLocalData}
                className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer animate-none"
                title="Xóa trắng dữ liệu khảo sát"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expandable Manual Backup/Restore Panel */}
          <AnimatePresence>
            {showBackupPanel && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden bg-white border border-stone-200 rounded-3xl p-6 space-y-4 shadow-xs text-stone-800"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-3 border-b border-stone-100 text-left">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-stone-850">Trung Tâm Sao Lưu &amp; Khôi Phục Dự Phòng</h4>
                    <p className="text-[10px] text-stone-400">Tự quản lý và bảo toàn dữ liệu gieo duyên của riêng bạn.</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleExportBackupFile}
                      className="px-3 py-1.5 bg-[#5A5A40] hover:bg-[#484833] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>Tải file dự phòng (.json)</span>
                    </button>
                    <button
                      onClick={handleCopyBackupText}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copySuccess ? "Đã sao chép!" : "Sao chép mã sao lưu"}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start text-left">
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-stone-700">Cách hoạt động:</label>
                    <ul className="text-[11px] text-stone-500 space-y-1.5 list-disc pl-4 leading-relaxed font-normal">
                      <li>Tải file <code className="bg-stone-50 px-1 py-0.5 rounded font-mono">.json</code> chứa toàn bộ tiến trình và 24 câu trả lời khảo sát của bạn để lưu trữ dự phòng.</li>
                      <li>Nếu bạn đổi thiết bị hoặc lỡ xóa lịch sử duyệt web, chỉ cần dán mã sao lưu vào ô bên phải để phục hồi tức thì tiến trình 8 chiều kích của mình.</li>
                    </ul>
                  </div>

                  <div className="space-y-3 col-span-1">
                    <label className="block text-[11px] font-bold text-stone-700">Khôi phục tiến trình từ mã sao lưu:</label>
                    <div className="space-y-2">
                      <textarea
                        rows={3}
                        placeholder="Dán nội dung mã sao lưu (.json) vào đây để khôi phục..."
                        value={importText}
                        onChange={(e) => setImportText(e.target.value)}
                        className="w-full p-3 text-[10px] font-mono rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-stone-50 text-stone-850"
                      />
                      {importStatus.msg && (
                        <div className={`p-3 rounded-lg text-[11px] leading-relaxed ${importStatus.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-800 border border-rose-200"}`}>
                          {importStatus.msg}
                        </div>
                      )}
                      <button
                        onClick={() => handleImportBackup(importText)}
                        className="w-full py-2 bg-stone-800 hover:bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Nạp dữ liệu &amp; Khôi phục</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Vertical Sub-Navigation */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 pb-3 lg:pb-0 border-b lg:border-b-0 border-stone-200">
            {SUB_TABS.map((tab) => {
              const isAssess = ["foundation", "identity", "energy", "mind", "emotion", "habit", "relationship", "purpose"].includes(tab.id);
              let activeClass = "bg-[#5A5A40] text-white";
              let inactiveClass = "text-stone-600 hover:bg-[#5A5A40]/10";
              const viLabel = {
                dashboard: "Bảng tổng quan",
                foundation: "Nền tảng vững vàng",
                identity: "Bản sắc cá nhân",
                energy: "Nguồn năng lượng",
                mind: "Tâm trí sáng suốt",
                emotion: "Cảm xúc cân bằng",
                habit: "Thói quen lành mạnh",
                relationship: "Mối quan hệ",
                purpose: "Mục đích",
                human_map: "Bản đồ sinh học",
                ai_report: "Báo cáo khai vấn",
                timeline: "Nhật ký tiến trình"
              }[tab.id] || "";

              if (activeSubTab === tab.id) {
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-left flex flex-col justify-center gap-0.5 ${activeClass}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      <span>{tab.label}</span>
                    </div>
                    {viLabel && <span className="text-[10px] font-normal italic opacity-90 pl-3.5">({viLabel})</span>}
                  </button>
                );
              }
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-medium transition-all text-left flex flex-col justify-center gap-0.5 ${inactiveClass}`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${isAssess ? "bg-stone-300" : "bg-[#5A5A40]/30"}`}></span>
                    <span>{tab.label}</span>
                  </div>
                  {viLabel && <span className="text-[10px] font-normal italic text-[#5A5A40] pl-3.5">({viLabel})</span>}
                </button>
              );
            })}
          </div>

          {/* Right Main sub-tab content display panel */}
          <div className="lg:col-span-9 bg-white p-6 md:p-8 rounded-3xl border border-stone-200 shadow-xs min-h-[420px]">
            
            {/* PROGRESS HEADER FOR USER MOTIVATION */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-4 border-b border-stone-100">
              <div className="text-xs">
                <span className="text-stone-400 font-semibold uppercase">Mã Hồ Sơ: </span>
                <strong className="text-stone-800 font-mono">HSPF_{profile.phone.slice(-4) || "0000"}</strong>
                <span className="mx-2 text-stone-300">•</span>
                <span className="text-stone-400 font-semibold">Ghi danh: </span>
                <strong className="text-[#5A5A40]">{profile.name}</strong>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-28 bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-[#5A5A40] h-full" style={{ width: `${progressPercent}%` }}></div>
                </div>
                <span className="text-[11px] font-bold text-stone-700">{progressPercent}% Hoàn thành</span>
              </div>
            </div>

            {/* SUBTAB 1: DASHBOARD OVERVIEW */}
            {activeSubTab === "dashboard" && (
              <div className="space-y-6">
                <div className="bg-[#5A5A40]/5 rounded-2xl p-6 border border-[#5A5A40]/10 flex flex-col md:flex-row items-center gap-6">
                  <div className="text-center md:text-left flex-1 space-y-2">
                    <span className="text-[9px] uppercase tracking-wider text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded-full">Trình tự đồng hành</span>
                    <h3 className="font-serif text-xl font-bold text-stone-900">Bản Thể Sống Hòa Hợp & Tự Tại</h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Để hoàn tất Hồ sơ Phát triển Con người, bạn sẽ đi qua 8 khía cạnh tâm lý phản tư. Mỗi giai đoạn gồm 3 câu hỏi chiêm nghiệm sâu sắc. Sau khi hoàn thành, bạn sẽ nhận được bản đồ cấu trúc nội lực độc bản.
                    </p>
                    <button
                      onClick={() => setActiveSubTab("foundation")}
                      className="mt-4 px-5 py-2.5 bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      Bắt đầu Khảo sát ➔
                    </button>
                  </div>
                  <div className="w-24 h-24 bg-white/80 border border-[#5A5A40]/20 rounded-full flex items-center justify-center text-4xl shadow-xs">
                    📜
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(DIMENSION_METADATA).map(([id, detail]) => {
                    const answeredCount = detail.questions.filter((_, qIdx) => !!answers[`${id}_${qIdx}`]).length;
                    return (
                      <div key={id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200/60 flex items-start gap-3">
                        <div className="p-2 bg-white rounded-xl border border-stone-100 shadow-xs">
                          {renderIcon(detail.icon, "text-[#5A5A40]")}
                        </div>
                        <div className="flex-1 text-left space-y-1">
                          <h4 className="text-xs font-bold text-stone-800">{detail.title}</h4>
                          <p className="text-[10px] text-stone-400 font-serif italic">{detail.subtitle}</p>
                          <div className="pt-2 flex justify-between items-center text-[10px]">
                            <span className="text-stone-500 font-semibold">{answeredCount}/3 Câu trả lời</span>
                            <span className="text-stone-700 font-mono">Điểm tự đánh giá: <strong>{scores[id] || 0}/10</strong></span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SUBTAB 2 - 9: ASSESSMENT QUESTIONS */}
            {SUB_TABS.map((tab, tabIndex) => {
              const isAssess = ["foundation", "identity", "energy", "mind", "emotion", "habit", "relationship", "purpose"].includes(tab.id);
              if (!isAssess || activeSubTab !== tab.id) return null;

              const metadata = DIMENSION_METADATA[tab.id];
              const scoreVal = scores[tab.id] || 5;

              return (
                <div key={tab.id} className="space-y-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#5A5A40]">Mô đun số 0{tabIndex}</span>
                    <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">{metadata.title}</h3>
                    <p className="text-xs text-stone-500 mt-0.5 italic">{metadata.subtitle}</p>
                  </div>

                  {/* Rating Selector */}
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-3">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600">
                      Tự nhận thức mức độ hài hòa hiện tại trên thang điểm 10:
                    </label>
                    <div className="flex justify-between gap-1.5 flex-wrap">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            const sc = { ...scores, [tab.id]: num };
                            saveScores(sc);
                          }}
                          className={`w-8 h-8 rounded-full border text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                            scoreVal === num
                              ? "bg-[#5A5A40] text-white border-[#5A5A40] scale-110 shadow-xs"
                              : "bg-white text-stone-600 border-stone-200 hover:bg-[#5A5A40]/10"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-stone-400 italic">
                      {scoreVal <= 3 && "🍃 (1-3): Giai đoạn chưa nhận biết, dễ gặp bất an hoặc tổn thương."}
                      {scoreVal > 3 && scoreVal <= 6 && "🌱 (4-6): Giai đoạn rèn luyện, bắt đầu nhận biết băn khoăn phản chiếu."}
                      {scoreVal > 6 && scoreVal <= 8 && "🌲 (7-8): Giai đoạn tương đối vững vàng, làm chủ tâm tính."}
                      {scoreVal > 8 && "🌸 (9-10): Trạng thái hoàn toàn hòa hợp, tự tại trong nội tại."}
                    </p>
                  </div>

                  {/* 3 Questions fields */}
                  <div className="space-y-4">
                    {metadata.questions.map((q, qIdx) => {
                      const ansKey = `${tab.id}_${qIdx}`;
                      const ansVal = answers[ansKey] || "";
                      return (
                        <div key={qIdx} className="space-y-1.5 text-left">
                          <label className="block text-xs font-bold text-stone-700 leading-relaxed">
                            {qIdx + 1}. {q}
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Để lại câu trả lời chiêm nghiệm chân thật của bạn tại đây..."
                            value={ansVal}
                            onChange={(e) => {
                              const ans = { ...answers, [ansKey]: e.target.value };
                              saveAnswers(ans);
                            }}
                            className="w-full p-3.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/30 text-stone-800 leading-relaxed placeholder-stone-400 font-sans"
                          />
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Controls */}
                  <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
                    <button
                      onClick={() => {
                        const prevTab = SUB_TABS[tabIndex - 1]?.id || "dashboard";
                        setActiveSubTab(prevTab);
                      }}
                      className="px-4 py-2 border border-stone-300 rounded-xl text-stone-600 hover:bg-stone-50 text-xs font-semibold"
                    >
                      Quay lại
                    </button>
                    <button
                      onClick={() => {
                        const nextTab = SUB_TABS[tabIndex + 1]?.id || "human_map";
                        setActiveSubTab(nextTab);
                      }}
                      className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
                    >
                      Tiếp tục ➔
                    </button>
                  </div>
                </div>
              );
            })}

            {/* SUBTAB 10: HUMAN MAP VISUALIZATION */}
            {activeSubTab === "human_map" && (
              <div className="space-y-6 text-center">
                <div className="max-w-md mx-auto text-center">
                  <h3 className="font-serif text-xl font-bold text-stone-900">Bản Đồ Năng Lượng Con Người</h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    Đồ thị phản ánh trạng thái tích hợp của 8 khía cạnh khí chất. Hình dáng mandala cân đối thể hiện sự hòa hợp bình yên.
                  </p>
                </div>

                {/* SVG Mandala Map */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 flex items-center justify-center relative max-w-sm mx-auto">
                  <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
                    {/* Ring guidelines */}
                    <circle cx="150" cy="150" r="110" fill="none" stroke="#E2E2D0" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="150" cy="150" r="82.5" fill="none" stroke="#E2E2D0" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="150" cy="150" r="55" fill="none" stroke="#E2E2D0" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="150" cy="150" r="27.5" fill="none" stroke="#E2E2D0" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Axial guidelines */}
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
                      const angle = idx * (2 * Math.PI / 8) - Math.PI / 2;
                      const ex = 150 + 110 * Math.cos(angle);
                      const ey = 150 + 110 * Math.sin(angle);
                      return (
                        <line key={idx} x1="150" y1="150" x2={ex} y2={ey} stroke="#E2E2D0" strokeWidth="1" />
                      );
                    })}

                    {/* Radar polygon shape */}
                    <polygon
                      points={getRadarCoordinates()}
                      fill="rgba(90, 90, 64, 0.18)"
                      stroke="#5A5A40"
                      strokeWidth="2.5"
                      className="transition-all duration-500"
                    />

                    {/* Individual dimension node anchors */}
                    {["foundation", "identity", "energy", "mind", "emotion", "habit", "relationship", "purpose"].map((key, index) => {
                      const angle = index * (2 * Math.PI / 8) - Math.PI / 2;
                      const score = scores[key] || 0;
                      const r = (score / 10) * 110;
                      const cx = 150 + r * Math.cos(angle);
                      const cy = 150 + r * Math.sin(angle);

                      // Text labels
                      const lx = 150 + 128 * Math.cos(angle);
                      const ly = 150 + 128 * Math.sin(angle);
                      const shortNames: Record<string, string> = {
                        foundation: "Nền tảng",
                        identity: "Bản sắc",
                        energy: "Năng lượng",
                        mind: "Tâm trí",
                        emotion: "Cảm xúc",
                        habit: "Thói quen",
                        relationship: "Mối q.hệ",
                        purpose: "Mục đích"
                      };

                      return (
                        <g key={key}>
                          <circle cx={cx} cy={cy} r="4.5" className="fill-[#5A5A40] stroke-white stroke-2 shadow-xs cursor-pointer hover:r-6 transition-all" />
                          <text
                            x={lx}
                            y={ly}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-[9px] font-bold uppercase tracking-wider text-stone-500"
                            fill="#6b6b55"
                          >
                            {shortNames[key]} ({score})
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={() => setActiveSubTab("purpose")}
                    className="px-4 py-2 border border-stone-300 rounded-xl text-stone-600 hover:bg-stone-50 text-xs font-semibold"
                  >
                    Quay lại Khảo sát
                  </button>
                  <button
                    onClick={() => setActiveSubTab("ai_report")}
                    className="px-5 py-2.5 bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    Mở khóa AI Report ➔
                  </button>
                </div>
              </div>
            )}

            {/* SUBTAB 11: AI DEVELOPMENT REPORT */}
            {activeSubTab === "ai_report" && (
              <div className="space-y-6">
                <div className="text-left border-b border-stone-100 pb-3">
                  <h3 className="font-serif text-xl font-bold text-stone-900">Báo Cáo Phản Chiếu Thông Tuệ Độc Bản</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Cẩm nang khai phá nội lực cá nhân hóa sâu sắc của bạn được cố vấn bởi trí tuệ nhân tạo Vân Mộc AI.
                  </p>
                </div>

                {/* If locked, display dynamic checkout VietQR */}
                {!isReportUnlocked ? (
                  <div className="max-w-md mx-auto text-center space-y-6 py-6">
                    <div className="w-16 h-16 rounded-full bg-[#5A5A40]/10 flex items-center justify-center mx-auto text-2xl text-[#5A5A40] border border-[#5A5A40]/25">
                      🔒
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-stone-850">Mở Khóa Báo Cáo Chuyên Sâu Trọn Đời</h4>
                      <p className="text-xs text-stone-500 max-w-xs mx-auto mt-1 leading-relaxed">
                        Hỗ trợ phí gieo duyên nhỏ <strong className="text-[#5A5A40] font-bold">99.000đ</strong> để mở khóa cuốn cẩm nang dày 10 trang phân tích chuyên sâu các thói quen rèn luyện hằng ngày.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          handleOpenEbookCheckout(99000, "Mở khóa Cẩm nang Thông tuệ Độc bản (Vân Mộc AI)");
                        }}
                        className="w-full py-3.5 bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                      >
                        <span>Đăng ký &amp; Gieo duyên 99.000đ 📿</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsReportUnlocked(true);
                          localStorage.setItem("van_moc_hspf_unlocked", "true");
                        }}
                        className="text-[10px] text-stone-400 hover:text-stone-600 block mx-auto underline font-semibold uppercase tracking-wider"
                      >
                        Trải nghiệm Demo (Kích hoạt miễn phí)
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Report Content Render */
                  <div className="space-y-6">
                    {reportText ? (
                      <div className="space-y-5 text-left">
                        <div className="p-6 md:p-8 bg-stone-50 border border-stone-200 rounded-2xl whitespace-pre-line font-serif leading-relaxed text-stone-850 text-xs md:text-sm">
                          {reportText}
                        </div>

                        <div className="flex justify-between items-center flex-wrap gap-4 pt-4 border-t border-stone-100">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(reportText);
                              alert("Đã sao chép cẩm nang vào khay nhớ tạm!");
                            }}
                            className="px-4 py-2 border border-[#5A5A40]/30 text-[#5A5A40] hover:bg-[#5A5A40]/5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Sao chép cẩm nang</span>
                          </button>
                          <button
                            onClick={handleGenerateReport}
                            disabled={isGeneratingReport}
                            className="px-4 py-2 bg-[#5A5A40] text-white hover:bg-[#484833] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Lập Báo Cáo Mới</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 space-y-4">
                        {isGeneratingReport ? (
                          <div className="space-y-4 max-w-sm mx-auto flex flex-col items-center">
                            <div className="w-10 h-10 border-3 border-[#5A5A40]/30 border-t-[#5A5A40] rounded-full animate-spin"></div>
                            <h4 className="font-serif text-base font-bold text-[#5A5A40] animate-pulse">Vân Mộc AI đang dệt cẩm nang...</h4>
                            <p className="text-xs text-stone-500 leading-relaxed italic font-serif">
                              “Vân Mộc đang kết nối tinh hoa khí chất, lắng nghe thấu cảm dòng chảy năng lượng riêng biệt từ linh hồn của bạn...”
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-4 max-w-xs mx-auto">
                            <p className="text-xs text-stone-500 leading-relaxed">
                              Bản đồ khí chất đã sẵn sàng! Bạn có muốn Vân Mộc AI khởi chạy phân tích và dệt tặng cuốn cẩm nang Khai phá bản thân ngay bây giờ không?
                            </p>
                            <button
                              onClick={handleGenerateReport}
                              className="w-full py-3 bg-[#5A5A40] hover:bg-[#484833] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                            >
                              <Sparkles className="w-4 h-4 text-amber-200" />
                              <span>Bắt đầu Lập Báo Cáo</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* SUBTAB 12: DEVELOPMENT TIMELINE */}
            {activeSubTab === "timeline" && (
              <div className="space-y-8 text-left">
                <div className="text-center max-w-md mx-auto">
                  <h3 className="font-serif text-lg font-bold text-stone-900">Tiến Trình Chuyển Hóa Của Tôi</h3>
                  <p className="text-xs text-stone-500 mt-1">Dòng thời gian ghi nhận các cột mốc hành trình rèn rũa và kết nối thầm lặng.</p>
                </div>

                <div className="relative border-l border-stone-200 ml-4 pl-8 space-y-8">
                  
                  {/* Milestone 1: Registration */}
                  <div className="relative">
                    <span className="absolute -left-[41px] top-0.5 bg-emerald-100 border-2 border-emerald-500 rounded-full w-5.5 h-5.5 flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-stone-850">Cột mốc 1: Ghi danh Hồ sơ Độc bản</h4>
                      <p className="text-xs text-stone-500">
                        Thông tin gieo duyên của <strong>{profile.name}</strong> đã được đồng bộ hóa thành công trên Google Sheets Cloud của hệ thống.
                      </p>
                      <span className="text-[9px] font-mono text-stone-400">Trạng thái: SUBMITTED</span>
                    </div>
                  </div>

                  {/* Milestone 2: Assessment completed */}
                  <div className="relative">
                    <span className={`absolute -left-[41px] top-0.5 rounded-full w-5.5 h-5.5 flex items-center justify-center text-[10px] ${
                      totalCompleted >= 8 ? "bg-emerald-100 border-2 border-emerald-500" : "bg-stone-100 border-2 border-stone-300 text-stone-400"
                    }`}>
                      {totalCompleted >= 8 ? "✓" : "2"}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-stone-850">Cột mốc 2: Phục dựng Bản đồ Năng lượng</h4>
                      <p className="text-xs text-stone-500">
                        Hoàn thành chiêm nghiệm 8 khía cạnh tâm hồn và vẽ đồ thị Mandala khí chất. ({totalCompleted}/24 câu trả lời).
                      </p>
                      <span className="text-[9px] font-mono text-stone-400">Trạng thái: {totalCompleted >= 8 ? "HOÀN THÀNH" : "ĐANG KHẢO SÁT"}</span>
                    </div>
                  </div>

                  {/* Milestone 3: Report unlocked */}
                  <div className="relative">
                    <span className={`absolute -left-[41px] top-0.5 rounded-full w-5.5 h-5.5 flex items-center justify-center text-[10px] ${
                      isReportUnlocked ? "bg-emerald-100 border-2 border-emerald-500" : "bg-stone-100 border-2 border-stone-300 text-stone-400"
                    }`}>
                      {isReportUnlocked ? "✓" : "3"}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-stone-850">Cột mốc 3: Kích hoạt Báo cáo thông tuệ AI Report</h4>
                      <p className="text-xs text-stone-500">
                        Dệt cẩm nang củng cố nội lực, hóa giải rào cản và thực hành thói quen rèn tâm tỉnh thức mỗi ngày.
                      </p>
                      <span className="text-[9px] font-mono text-stone-400">Trạng thái: {isReportUnlocked ? "PAID (ĐÃ MỞ KHÓA)" : "CHƯA KÍCH HOẠT"}</span>
                    </div>
                  </div>

                  {/* Milestone 4: Zalo group join */}
                  <div className="relative">
                    <span className={`absolute -left-[41px] top-0.5 rounded-full w-5.5 h-5.5 flex items-center justify-center text-[10px] ${
                      zaloJoined ? "bg-emerald-100 border-2 border-emerald-500" : "bg-stone-100 border-2 border-stone-300 text-stone-400"
                    }`}>
                      {zaloJoined ? "✓" : "4"}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-stone-850">Cột mốc 4: Tích hợp Cộng đồng Zalo Trầm lặng</h4>
                      <p className="text-xs text-stone-500">
                        Đồng hành cùng những tâm hồn tĩnh tại, gieo chánh niệm và hỗ trợ liệu liệu pháp hằng ngày.
                      </p>
                      {!zaloJoined ? (
                        <button
                          onClick={handleZaloClick}
                          className="mt-2 px-4 py-2 bg-[#0068FF] hover:bg-[#0055D0] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          Tham gia Nhóm Zalo 💬
                        </button>
                      ) : (
                        <span className="text-[9px] font-mono text-emerald-600 font-bold block">Trạng thái: JOINED ZALO</span>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      )}
    </div>
  );
};


// -------------------------------------------------------------
// 11. AI COACH COMPANION VIEW
// -------------------------------------------------------------
interface Message {
  id: string;
  sender: "user" | "coach";
  text: string;
  timestamp: string;
}

const COACH_TOPICS = [
  { id: "hieu_minh", title: "Thấu hiểu bản thân", desc: "Soi chiếu băn khoăn phản tư bản ngã và thiên hướng" },
  { id: "chua_lanh", title: "Chữa lành nỗi đau", desc: "Xoa dịu đứa trẻ tổn thương, buông bỏ áp lực cuộc đời" },
  { id: "toasang", title: "Định vị bản sắc", desc: "Bồi đắp khí chất nguyên bản tự chủ và lối sống" },
  { id: "quanhe", title: "Ranh giới mối quan hệ", desc: "Chuyển hóa mâu thuẫn, thiết lập kết nối an lành" }
];

export const AICoachView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "coach",
      text: "Vân Mộc đón chào người thương ghé hiên nhà. Nơi đây là góc tĩnh lặng tuyệt đối không phán xét, nơi bạn có thể trút bỏ bất kỳ lộn xộn nào đang có trong đầu để cùng Khai vấn nâng đỡ nội lực.\n\nHãy chọn một chủ đề gieo tâm bên dưới hoặc viết bất kỳ trăn trở nào của bạn nhé...",
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("hieu_minh");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const promptToSend = customPrompt || input;
    if (!promptToSend.trim()) return;

    if (!customPrompt) {
      setInput("");
    }

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/gemini/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptToSend,
          context: selectedTopic,
          journalHistory: messages.slice(-4).map(m => ({
            role: m.sender === "user" ? "user" : "model",
            content: m.text
          }))
        })
      });

      const data = await response.json();
      if (response.ok) {
        const coachMsg: Message = {
          id: `coach_${Date.now()}`,
          sender: "coach",
          text: data.text,
          timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
        };
        setMessages((prev) => [...prev, coachMsg]);
      } else {
        alert("Có chút tĩnh lặng gián đoạn khi kết nối AI, xin vui lòng gửi lại tin nhắn.");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-3 py-1 rounded-full">
          Góc Khai Vấn Độc Bản
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
          AI Coach Vân Mộc<span className="text-[#5A5A40]">.</span>
        </h2>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          Người đồng hành thông tuệ rèn luyện tâm tính, khai phóng bế tắc tâm lý qua tham vấn sâu sắc.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Topic Selector */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-start">
          <div className="text-xs uppercase tracking-wider font-bold text-stone-400 pl-1">
            Chủ đề gieo chánh niệm
          </div>
          <div className="space-y-2.5 flex-1">
            {COACH_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col gap-1 shadow-xs ${
                  selectedTopic === topic.id
                    ? "bg-[#5A5A40] text-white border-[#5A5A40] translate-x-1"
                    : "bg-white text-stone-700 border-stone-200 hover:bg-[#5A5A40]/5"
                }`}
              >
                <span className="text-xs font-bold uppercase tracking-wide">{topic.title}</span>
                <span className={`text-[10px] ${selectedTopic === topic.id ? "text-white/85" : "text-stone-400"}`}>
                  {topic.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Conversation Window */}
        <div className="lg:col-span-8 flex flex-col bg-white border border-stone-200 rounded-3xl overflow-hidden min-h-[460px] max-h-[550px]">
          
          {/* Active Coach Header */}
          <div className="bg-stone-50 border-b border-stone-150 px-5 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wide">Khai vấn cùng Vân Mộc AI</h4>
                <p className="text-[10px] text-stone-400">Trạng thái: Đang lắng nghe bên hiên nhà</p>
              </div>
            </div>
            <button
              onClick={() => {
                if (confirm("Người thương muốn khởi động lại cuộc hội thoại chánh niệm này?")) {
                  setMessages([
                    {
                      id: `init_${Date.now()}`,
                      sender: "coach",
                      text: "Vân Mộc đón chào người thương ghé hiên nhà. Nơi đây là góc tĩnh lặng tuyệt đối không phán xét, nơi bạn có thể trút bỏ bất kỳ lộn xộn nào đang có trong đầu để cùng Khai vấn nâng đỡ nội lực.\n\nHãy chọn một chủ đề gieo tâm bên dưới hoặc viết bất kỳ trăn trở nào của bạn nhé...",
                      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
                    }
                  ]);
                }
              }}
              className="p-1 rounded-lg hover:bg-stone-200/50 text-stone-400 hover:text-[#5A5A40] transition-colors"
              title="Đặt lại hội thoại"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#F7F5F0]/20">
            {messages.map((m) => {
              const isCoach = m.sender === "coach";
              return (
                <div
                  key={m.id}
                  className={`flex ${isCoach ? "justify-start" : "justify-end"} items-end gap-2`}
                >
                  {isCoach && (
                    <div className="w-6 h-6 rounded-full bg-[#5A5A40] text-white text-[10px] flex items-center justify-center font-serif font-bold">
                      VM
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl p-4 space-y-1 ${
                    isCoach
                      ? "bg-stone-100 text-stone-850 border border-stone-200 rounded-bl-none font-serif leading-relaxed text-xs md:text-sm whitespace-pre-line"
                      : "bg-[#5A5A40] text-white rounded-br-none text-xs md:text-sm font-sans leading-relaxed"
                  }`}>
                    <p>{m.text}</p>
                    <span className={`block text-[9px] text-right ${isCoach ? "text-stone-400" : "text-white/60"} font-mono`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start items-end gap-2">
                <div className="w-6 h-6 rounded-full bg-[#5A5A40] text-white text-[10px] flex items-center justify-center font-serif font-bold animate-pulse">
                  VM
                </div>
                <div className="bg-stone-100 border border-stone-200 rounded-2xl rounded-bl-none p-4 max-w-[200px] flex items-center justify-center">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-[#5A5A40]/60 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#5A5A40]/60 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></span>
                    <span className="w-1.5 h-1.5 bg-[#5A5A40]/60 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input control box */}
          <div className="p-4 bg-stone-50 border-t border-stone-150 flex gap-2">
            <input
              type="text"
              disabled={isLoading}
              placeholder="Gửi tâm sự, câu hỏi phản chiếu của bạn tại đây..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              className="flex-1 px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white text-xs md:text-sm text-stone-800"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="px-4 bg-[#5A5A40] hover:bg-[#484833] disabled:opacity-50 text-white rounded-xl transition-all flex items-center justify-center cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
