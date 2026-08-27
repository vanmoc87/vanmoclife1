import React, { useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Type, Moon, Sun, Award, Coffee, Eye, Heart, Sparkles, Check, Download } from "lucide-react";

interface EbookReaderProps {
  isOpen: boolean;
  onClose: () => void;
  isUnlocked: boolean; // If paid, fully unlocked. If not, only preview of Chapter 1 is available.
  onCheckout: () => void;
}

export const EbookReader: React.FC<EbookReaderProps> = ({ isOpen, onClose, isUnlocked, onCheckout }) => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("base");
  const [readingTheme, setReadingTheme] = useState<"light" | "sepia" | "dark">("sepia");
  const [userReflections, setUserReflections] = useState<Record<string, string>>({});
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const chapters = [
    {
      title: "Lời mở đầu: Tiếng gọi quay về",
      subtitle: "Tại sao chúng ta đi tìm chính mình?",
      quote: "Hành trình vạn dặm khởi đầu từ khoảnh khắc bạn dũng cảm cúi xuống nhìn thẳng vào chiếc bóng của mình.",
      content: [
        "Chào bạn, người bạn đồng hành thân mến của Vân Mộc.",
        "Cuốn sách nhỏ này không mang tham vọng thay đổi cuộc đời bạn trong một đêm. Nó được viết ra như một lát trà ấm đặt trên hiên nhà tĩnh lặng, đợi bạn ngồi xuống, thở chậm lại và bắt đầu nhìn sâu vào bên trong chính mình.",
        "Xã hội hiện đại thúc đẩy chúng ta tiến về phía trước với một tốc độ chóng mặt. Chúng ta mải miết xây dựng những chiếc mặt nạ hoàn hảo: sự thành đạt, sự bận rộn, sự tự tin giả tạo... để rồi khi đêm xuống, đối diện với bốn bức tường, ta cảm thấy một sự trống rỗng mơ hồ không thể lấp đầy.",
        "Đó không phải là thất bại của bạn. Đó là tiếng gọi thiêng liêng từ bản thể nguyên bản, nhắc nhở bạn rằng đã đến lúc quay về dọn dẹp tâm trí, ôm ấp lấy những tổn thương cũ để chuẩn bị cho một hành trình sống chân thực, tự do và tỏa sáng rực rỡ nhất.",
        "Vân Mộc mong rằng, qua từng trang sách này, bạn sẽ tìm thấy những điểm neo năng lượng lành mạnh, những nghi thức thiết thực để kết nối lại với chính mình hằng ngày."
      ],
      exercise: {
        id: "intro_reflection",
        question: "Hãy viết ra 3 điều khiến bạn cảm thấy mệt mỏi hoặc mất kết nối nhiều nhất trong thời gian gần đây:",
        placeholder: "Ví dụ: Sự phán xét của người khác, áp lực công việc, thói quen trì hoãn..."
      }
    },
    {
      title: "Chương I: Hiểu Mình — Đối thoại với những tầng sâu ẩn giấu",
      subtitle: "Nhận diện chiếc mặt nạ xã hội & kết nối luân xa tim",
      quote: "Khi bạn thấu hiểu được chiếc bóng của mình, bạn không còn sợ bóng tối nữa.",
      content: [
        "Hiểu mình là bước đi đầu tiên và cũng là nền tảng vững chắc nhất của mọi sự chuyển hóa. Nếu không biết mình là ai, ta sẽ mãi sống theo kỳ vọng của người khác, giống như một chiếc lá khô bị gió cuốn đi vô định.",
        "Trong tâm lý học phân tích của Carl Jung, mỗi người đều sở hữu một 'Persona' (Mặt nạ xã hội) và một 'Shadow' (Phần tối/Chiếc bóng). Persona là những gì chúng ta trưng trổ ra cho thế giới thấy để được chấp nhận và yêu thương. Shadow là những khao khát, cảm xúc tiêu cực, đố kỵ hoặc tổn thương bị ta chối bỏ và đẩy sâu vào vô thức.",
        "Việc cố gắng chôn vùi Shadow chỉ khiến nó tích tụ năng lượng và bộc phát dưới dạng những cơn giận dữ vô cớ, sự trầm cảm hoặc nỗi lo âu triền miên. Ngược lại, Hiểu mình thực sự là dũng khí tháo bỏ chiếc mặt nạ Persona, đối thoại trực tiếp với Shadow với lòng trắc ẩn không phán xét.",
        "Dưới góc nhìn năng lượng, việc từ chối bản thân sẽ làm nghẽn Luân xa Tim (Anahata Chakra) - trung tâm của tình yêu thương và sự thấu cảm. Khi luân xa này tắc nghẽn, bạn sẽ cảm thấy cô đơn, khó đặt lòng tin vào người khác và luôn có cảm giác phòng vệ trước mọi mối quan hệ.",
        "Cách đơn giản nhất để mở khóa luân xa tim là thực hành 'Đối thoại trung thực hằng ngày'. Mỗi ngày hãy dành ra 10 phút tĩnh lặng, tự hỏi bản thân: 'Hôm nay tôi thực sự cảm thấy thế nào? Tôi đang cố gắng che giấu cảm xúc gì?' và viết nó ra mà không kèm theo bất kỳ sự phán xét nào."
      ],
      exercise: {
        id: "ch1_reflection",
        question: "Nếu không phải gồng mình để làm hài lòng bất kỳ ai, bạn muốn dành ngày hôm nay để làm gì cho riêng mình?",
        placeholder: "Viết ra khao khát chân thật nhất của bạn..."
      }
    },
    {
      title: "Chương II: Chữa Lành — Ôm ấp những thương tổn ngủ yên",
      subtitle: "Liệu pháp tiếp đất bằng năng lượng thạch anh tự nhiên",
      quote: "Vết sẹo không phải là bằng chứng của sự yếu đuối, mà là dấu ấn kiên cường rằng bạn đã vượt qua giông bão.",
      content: [
        "Chữa lành không phải là xóa bỏ hoàn toàn quá khứ hay cố biến mình thành một phiên bản hoàn hảo không tì vết. Chữa lành là học cách chung sống hòa bình với những vết sẹo cũ, ôm ấp lấy đứa trẻ tổn thương bên trong với sự dịu dàng và kiên nhẫn nhất.",
        "Khi đối mặt với biến cố, hệ thần kinh của chúng ta thường ghi nhớ nỗi đau bằng các cơ chế phòng vệ tự động: trốn chạy, chiến đấu hoặc đóng băng. Những cảm xúc nghẽn lại này tích tụ trong cơ thể thể lý, gây ra những cơn đau vai gáy, mệt mỏi kinh niên hoặc chứng mất ngủ.",
        "Vân Mộc khuyến nghị liệu pháp Tiếp đất (Grounding) kết hợp cùng năng lượng tinh thể tự nhiên. Tinh thể thạch anh khói hoặc thạch anh tóc vàng tự nhiên mang tần số rung động cực kỳ ổn định của lòng đất mẹ sâu thẳm. Khi bạn chạm vào hoặc đeo vòng đá, năng lượng này giúp ổn định sinh học cơ thể, kéo tâm trí đang bay bổng, lo lắng trở về với hiện tại tại hiên nhà.",
        "Nghi thức 'Thanh tẩy trường khí lành hằng ngày': Bạn cầm một viên thạch anh tự nhiên trong lòng bàn tay, nhắm mắt lại, tưởng tượng một luồng ánh sáng vàng dịu từ viên đá lan tỏa khắp cơ thể, cuốn trôi mọi lo âu, mệt mỏi đi xuống lòng đất. Hãy duy trì hít thở chậm trong 5 phút.",
        "Khi thực hành đều đặn, bạn sẽ nhận thấy cơ thể trở nên nhẹ nhõm, nhịp tim ổn định và dũng khí tự thân trỗi dậy một cách tự nhiên."
      ],
      exercise: {
        id: "ch2_reflection",
        question: "Nghĩ về một biến cố cũ khiến bạn đau lòng. Bạn có thể gửi lời cảm ơn nào đến bản thân vì đã mạnh mẽ vượt qua nó không?",
        placeholder: "Lời nhắn gửi chân thành nhất đến chính mình..."
      }
    },
    {
      title: "Chương III: Tỏa Sáng — Khơi dậy khí chất độc bản",
      subtitle: "Nuôi dưỡng nội lực thong dong & khí chất tự thân",
      quote: "Bông hoa không cần so sánh mình với những bông hoa khác. Nó chỉ đơn giản là nở rực rỡ với tất cả bản sắc vốn có.",
      content: [
        "Tỏa sáng theo học thuyết Vân Mộc không phải là cố gắng đứng trên bục vinh quang để vạn người tung hô. Tỏa sáng thực sự là khí chất thong dong, tự tại phát ra từ một nội tâm đã được nuôi dưỡng sâu sắc.",
        "Mỗi chúng ta sinh ra đều mang một bộ mã số năng lượng độc bản (được biểu hiện qua Thần số học Đường đời 2, 7, 9 hay các chỉ số khác). Có người sinh ra mang sứ mệnh kết nối và chữa lành thấu cảm (Số 2), có người mang sứ mệnh đi tìm tri thức tâm linh sâu sắc (Số 7), và có người mang sứ mệnh phụng sự xã hội bằng lòng trắc ẩn bao la (Số 9).",
        "Khi bạn hiểu và chấp nhận tần số năng lượng của mình, bạn sẽ không còn rơi vào cái bẫy so sánh xã hội. Bạn thấu suốt rằng phong cách sống, cách biểu đạt hay trang sức bạn đeo không nhằm mục đích phô trương, mà là phương tiện thiêng liêng để tôn vinh cốt cách độc bản bên trong.",
        "Nuôi dưỡng khí chất tự tôn không ồn ào bằng cách: Xác lập ranh giới cá nhân rõ ràng; biết nói 'Không' một cách tử tế với những nguồn năng lượng độc hại; dành thời gian chất lượng để kết nối với thiên nhiên và sách cổ; và luôn giữ sự điềm tĩnh, ấm áp trong giọng nói và cử chỉ hằng ngày.",
        "Đó chính là lúc bạn tỏa sáng một cách bền bỉ nhất - thứ ánh sáng dịu lành, không chói lòa nhưng đủ sức sưởi ấm cho chính bạn và những người xung quanh."
      ],
      exercise: {
        id: "ch3_reflection",
        question: "3 giá trị cốt lõi hoặc phẩm chất tốt đẹp nhất mà bạn cảm thấy tự hào về bản thân là gì?",
        placeholder: "Viết ra 3 điều bạn trân quý nhất ở cốt cách của mình..."
      }
    }
  ];

  const handleSaveReflection = (reflectionId: string) => {
    const content = userReflections[reflectionId];
    if (!content || !content.trim()) return;

    // Simulate saving reflection to local journal entries automatically!
    const savedEntries = localStorage.getItem("van_moc_journal_entries");
    let entries = [];
    if (savedEntries) {
      try { entries = JSON.parse(savedEntries); } catch (e) { console.error(e); }
    }

    const matchedChapter = chapters.find(ch => ch.exercise.id === reflectionId);

    const newEntry = {
      id: `ebook_reflection_${Date.now()}`,
      date: new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      title: `Phản tư Ebook: ${matchedChapter?.title || "Suy ngẫm"}`,
      content: `Câu hỏi phản tư: ${matchedChapter?.exercise.question}\n\nTrả lời của tôi: ${content}`,
      mood: "Bình yên",
      category: "hieu_minh",
      aiReply: "Vân Mộc ghi nhận sự dũng cảm đối diện và phản tư chân thành của bạn. Mỗi câu chữ viết xuống là một bước đưa bạn gần hơn với bản thể nguyên bản an yên hằng mong ước.",
      createdAt: Date.now()
    };

    const updated = [newEntry, ...entries];
    localStorage.setItem("van_moc_journal_entries", JSON.stringify(updated));
    
    // Also save in state status
    setSavedStatus(prev => ({ ...prev, [reflectionId]: true }));
    setTimeout(() => {
      setSavedStatus(prev => ({ ...prev, [reflectionId]: false }));
    }, 3000);

    // Trigger local storage storage event to reload journal entries in main App component
    window.dispatchEvent(new Event("storage"));
    alert("Câu trả lời phản tư của bạn đã được chuyển hóa và lưu tự động vào mục Trang nhật ký đã lưu trên Trang chủ thành công!");
  };

  const currentChapter = chapters[activeChapter];
  const isChapterLocked = !isUnlocked && activeChapter > 0;

  const fontSizes = {
    sm: "text-xs md:text-sm leading-relaxed",
    base: "text-sm md:text-base leading-relaxed",
    lg: "text-base md:text-lg leading-relaxed",
    xl: "text-lg md:text-xl leading-relaxed"
  };

  const themes = {
    light: "bg-[#FDFDFD] text-[#2C2C2C] border-stone-200",
    sepia: "bg-[#F4EFE6] text-[#3E3424] border-[#E6DCC8]",
    dark: "bg-stone-900 text-stone-200 border-stone-800"
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-0 md:p-6 lg:p-12">
      {/* Dark blurry backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose}></div>

      {/* Main Reader Box */}
      <div className={`w-full h-full md:max-w-4xl md:h-[90vh] md:rounded-3xl shadow-2xl border flex flex-col overflow-hidden relative z-10 transition-colors duration-300 ${themes[readingTheme]}`}>
        
        {/* Top Header of Reader */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-black/5">
          <button 
            onClick={onClose} 
            className="flex items-center gap-1.5 text-xs font-semibold hover:opacity-80 transition-opacity cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Thoát trình đọc</span>
          </button>
          
          <div className="text-center hidden sm:block">
            <span className="text-[10px] uppercase tracking-widest font-mono opacity-60">Ebook Vân Mộc độc bản</span>
            <h5 className="font-serif text-xs italic font-semibold truncate max-w-xs">{currentChapter.title}</h5>
          </div>

          {/* Quick Settings: Theme and FontSize */}
          <div className="flex items-center gap-4">
            {/* Font size switcher */}
            <div className="flex items-center gap-1 border rounded-lg p-1 bg-white/10">
              <button 
                onClick={() => setFontSize("sm")} 
                className={`p-1.5 rounded text-[10px] font-bold uppercase cursor-pointer ${fontSize === "sm" ? "bg-white/20" : "opacity-60"}`}
                title="Cỡ chữ Nhỏ"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize("base")} 
                className={`p-1.5 rounded text-xs font-bold uppercase cursor-pointer ${fontSize === "base" ? "bg-white/20" : "opacity-60"}`}
                title="Cỡ chữ Vừa"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize("lg")} 
                className={`p-1.5 rounded text-sm font-bold uppercase cursor-pointer ${fontSize === "lg" ? "bg-white/20" : "opacity-60"}`}
                title="Cỡ chữ Lớn"
              >
                A+
              </button>
            </div>

            {/* Reading theme switcher */}
            <div className="flex items-center gap-1 border rounded-lg p-1 bg-white/10">
              <button 
                onClick={() => setReadingTheme("light")} 
                className={`p-1.5 rounded cursor-pointer ${readingTheme === "light" ? "bg-white/20" : "opacity-60"}`}
                title="Chế độ Sáng"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setReadingTheme("sepia")} 
                className={`p-1.5 rounded cursor-pointer ${readingTheme === "sepia" ? "bg-white/20" : "opacity-60"}`}
                title="Chế độ Trà Ấm"
              >
                <Coffee className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setReadingTheme("dark")} 
                className={`p-1.5 rounded cursor-pointer ${readingTheme === "dark" ? "bg-white/20" : "opacity-60"}`}
                title="Chế độ Đêm"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Reader Layout: Left Sidebar Table of Contents (hidden on mobile) and Right Reading Pane */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Sidebar: Chapters list */}
          <div className="w-1/4 border-r bg-black/5 hidden md:block p-4 overflow-y-auto space-y-2.5">
            <div className="text-[10px] uppercase tracking-wider font-mono opacity-50 font-bold px-2 mb-3">Mục lục sách</div>
            {chapters.map((ch, idx) => {
              const isLocked = !isUnlocked && idx > 0;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveChapter(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1 relative ${
                    activeChapter === idx ? "bg-white/15 font-semibold" : "hover:bg-white/5 opacity-75"
                  }`}
                >
                  <span className="text-[9px] uppercase tracking-wide font-mono opacity-60">Chương 0{idx}</span>
                  <span className="text-xs font-serif leading-tight">{ch.title.split(":")[1] || ch.title}</span>
                  {isLocked && (
                    <span className="absolute top-2 right-2 text-[8px] uppercase tracking-widest font-bold text-amber-500 bg-amber-500/10 px-1 py-0.5 rounded">
                      Đọc thử
                    </span>
                  )}
                </button>
              );
            })}

            {!isUnlocked && (
              <div className="mt-8 p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10 text-center space-y-3">
                <p className="text-[11px] leading-relaxed text-amber-600 italic">
                  Bạn đang ở chế độ <strong>Đọc Thử</strong> lời mở đầu. Hãy mở khóa toàn bộ cuốn sách để thấu suốt 4 chương sâu sắc nhất!
                </p>
                <button 
                  onClick={onCheckout}
                  className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Mở khóa chỉ 99k
                </button>
              </div>
            )}
          </div>

          {/* Right Reading Pane */}
          <div className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col justify-between scrollbar-thin">
            
            {/* If chapter is locked, show beautiful Paywall Card overlay */}
            {isChapterLocked ? (
              <div className="my-auto py-12 text-center max-w-md mx-auto space-y-6">
                <div className="w-16 h-16 bg-amber-500/10 rounded-full border border-amber-500 flex items-center justify-center text-3xl mx-auto text-amber-500 animate-pulse">
                  🔒
                </div>
                
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-amber-500">Nội dung độc quyền dành cho bạn</span>
                  <h3 className="font-serif text-xl font-bold">Chương sách chưa được mở khóa</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Chương sách này chứa đựng những phương pháp thực hành thiền định chi tiết, cách nhận biết luân xa và lộ trình rèn luyện 21 ngày sâu thẳm nhất từ học thuyết Vân Mộc.
                  </p>
                </div>

                <div className="bg-black/5 rounded-xl p-4 text-xs italic text-left space-y-1">
                  <strong>Nội dung độc quyền bên trong chương:</strong>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] not-italic text-stone-600">
                    <li>Nhận diện điểm nghẽn luân xa và cách thanh tẩy</li>
                    <li>Các nghi thức dọn dẹp và tiếp đất cơ thể vật lý</li>
                    <li>Nghệ thuật tự tôn, thấu suốt tần số Thần số học</li>
                    <li>Sổ tay 21 ngày thực hành rèn luyện hằng sáng</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onCheckout}
                    className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-md transition-colors cursor-pointer"
                  >
                    Gieo duyên mở khóa trọn bộ (99.000đ)
                  </button>
                  <span className="text-[9px] text-stone-400 block mt-2">Hỗ trợ nhận sách tức thì trực tiếp trên trình duyệt web này</span>
                </div>
              </div>
            ) : (
              /* Actual Chapter reading content */
              <article className="max-w-2xl mx-auto space-y-8">
                
                {/* Chapter Title / Subtitle */}
                <div className="border-b pb-6 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-amber-500 font-bold block">Chương 0{activeChapter}</span>
                  <h2 className="font-serif text-2xl md:text-3.5xl font-normal leading-tight">
                    {currentChapter.title}
                  </h2>
                  <p className="text-xs md:text-sm font-sans italic opacity-70">
                    {currentChapter.subtitle}
                  </p>
                </div>

                {/* Pull Quote style */}
                <div className="p-4 bg-black/5 border-l-2 border-amber-500 italic font-serif text-xs md:text-sm leading-relaxed rounded-r-xl">
                  “ {currentChapter.quote} ”
                </div>

                {/* Chapter Content blocks */}
                <div className={`space-y-5 font-serif font-light text-justify ${fontSizes[fontSize]}`}>
                  {currentChapter.content.map((para, pIdx) => (
                    <p key={pIdx} className="indent-4 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Interactive Reflection Question Box */}
                <div className="mt-12 p-6 rounded-2xl bg-black/5 border border-amber-500/10 space-y-4">
                  <div className="flex items-center gap-2 text-[#5A5A40]">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-xs uppercase tracking-wider font-bold">Góc suy ngẫm thực hành</span>
                  </div>

                  <p className="text-xs font-serif font-medium leading-relaxed">
                    {currentChapter.exercise.question}
                  </p>

                  <textarea
                    rows={4}
                    placeholder={currentChapter.exercise.placeholder}
                    value={userReflections[currentChapter.exercise.id] || ""}
                    onChange={(e) => setUserReflections({ ...userReflections, [currentChapter.exercise.id]: e.target.value })}
                    className={`w-full p-3 rounded-xl border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans leading-relaxed ${
                      readingTheme === "dark" ? "bg-stone-850 border-stone-700 text-white placeholder-stone-500" : "bg-white border-stone-200 text-stone-800 placeholder-stone-400"
                    }`}
                  />

                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-stone-400 italic font-sans">Câu trả lời sẽ được lưu trữ mật thiết vào Nhật ký phản tư hằng ngày của bạn.</span>
                    <button
                      onClick={() => handleSaveReflection(currentChapter.exercise.id)}
                      disabled={!userReflections[currentChapter.exercise.id]?.trim()}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {savedStatus[currentChapter.exercise.id] ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Đã lưu thành công!
                        </>
                      ) : (
                        "Khắc ghi phản tư"
                      )}
                    </button>
                  </div>
                </div>

              </article>
            )}

            {/* Navigation buttons at bottom of reading pane */}
            <div className="mt-16 pt-6 border-t flex justify-between items-center max-w-2xl mx-auto">
              <button
                disabled={activeChapter === 0}
                onClick={() => setActiveChapter(activeChapter - 1)}
                className="px-4 py-2 hover:bg-black/5 rounded-lg text-xs font-bold uppercase flex items-center gap-1 transition-colors disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Chương trước
              </button>

              <span className="text-[10px] font-mono opacity-50">
                Trang {activeChapter + 1} / {chapters.length}
              </span>

              <button
                disabled={activeChapter === chapters.length - 1}
                onClick={() => {
                  if (!isUnlocked && activeChapter === 0) {
                    onCheckout();
                  } else {
                    setActiveChapter(activeChapter + 1);
                  }
                }}
                className="px-4 py-2 hover:bg-black/5 rounded-lg text-xs font-bold uppercase flex items-center gap-1 transition-colors disabled:opacity-30 cursor-pointer"
              >
                Chương tiếp theo <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
