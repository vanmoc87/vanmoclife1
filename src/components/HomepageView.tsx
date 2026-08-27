import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  ChevronRight, 
  ArrowUpRight 
} from "lucide-react";

interface HomepageViewProps {
  setActiveTab: (tab: string) => void;
  setHoSoActiveSubTab: (subTab: string) => void;
  setIsEbookReaderOpen: (open: boolean) => void;
  setProductFilter: (filter: string) => void;
  isEbookUnlocked: boolean;
  handleOpenEbookCheckout: () => void;
  dailyCard: any;
  setDailyCard: (card: any) => void;
  isPullingCard: boolean;
  setIsPullingCard: (pulling: boolean) => void;
  mood: string;
  setMood: (mood: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: any) => void;
  journalInput: string;
  setJournalInput: (input: string) => void;
  submitJournalReflection: (customPrompt?: string, customCategory?: any) => Promise<void>;
  isAiLoading: boolean;
  aiResponse: string;
  setAiResponse: (response: string) => void;
  journalEntries: any[];
  saveJournalEntries: (entries: any[]) => void;
}

export const HomepageView: React.FC<HomepageViewProps> = ({
  setActiveTab,
  setHoSoActiveSubTab,
  setIsEbookReaderOpen,
  setProductFilter,
  isEbookUnlocked,
  handleOpenEbookCheckout,
  dailyCard,
  setDailyCard,
  isPullingCard,
  setIsPullingCard,
  mood,
  setMood,
  selectedCategory,
  setSelectedCategory,
  journalInput,
  setJournalInput,
  submitJournalReflection,
  isAiLoading,
  aiResponse,
  setAiResponse,
  journalEntries,
  saveJournalEntries,
}) => {
  
  // Local state for pulling card
  const handleDailyCardPull = async () => {
    setIsPullingCard(true);
    try {
      const res = await fetch("/api/daily-card");
      const data = await res.json();
      if (data && data.quote) {
        setDailyCard(data);
      }
    } catch (err) {
      console.error("Error pulling daily card:", err);
    } finally {
      setIsPullingCard(false);
    }
  };

  return (
    <div className="font-sans text-charcoal bg-ivory selection:bg-olive/10 selection:text-olive">
      
      {/* ==========================================
          01 HERO SECTION WITH EDITORIAL IMAGES
         ========================================== */}
      <section className="py-6 md:py-12 px-4 md:px-8" id="home">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-border-custom rounded-2xl bg-ivory-light overflow-hidden">
            
            {/* Hero Copy (7 Cols on large screen) */}
            <div className="lg:col-span-7 p-8 md:p-16 flex flex-col justify-center text-left space-y-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-olive font-sans">
                Vân Mộc Life
              </span>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-serif text-5xl md:text-6xl lg:text-[76px] font-medium tracking-tight text-[#292A26] leading-[1.05]"
              >
                Hiểu mình.<br />
                Phát triển mình.<br />
                <span className="text-olive">Sống theo cách riêng.</span>
              </motion.h1>

              <p className="font-sans text-sm md:text-base text-body-text max-w-xl leading-relaxed">
                Vân Mộc Life là một hệ sinh thái về con người, tri thức, vẻ đẹp và phong cách sống — nơi mỗi hành trình bắt đầu từ việc hiểu sâu sắc bản thể của chính mình.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a 
                  href="#ecosystem" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("ecosystem")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="min-h-[52px] px-8 rounded-full bg-olive hover:bg-olive-dark text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  Khám phá hệ sinh thái
                </a>
                <a 
                  href="#start-journey" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("start-journey")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="min-h-[52px] px-8 rounded-full border border-olive/35 text-olive hover:bg-olive hover:text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  Bắt đầu từ đâu?
                </a>
              </div>
            </div>

            {/* Hero Editorial Composition Grid (5 Cols on large screen) */}
            <div className="lg:col-span-5 p-4 md:p-6 bg-[#EFEBE2] grid grid-cols-2 grid-rows-2 gap-3 min-h-[460px] lg:min-h-auto">
              
              {/* Card 1: Vườn Vân Mộc (Tall image representing inner reflection & nature) */}
              <div className="col-span-1 row-span-2 rounded-xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600" 
                  alt="Vườn Vân Mộc - Reflection" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-90 font-sans">01 / Inner World</p>
                  <p className="font-serif text-sm font-medium mt-0.5">Vườn Vân Mộc</p>
                </div>
              </div>

              {/* Card 2: Mộc Bản (Clean, calm workspace representing focused knowledge & business) */}
              <div className="col-span-1 row-span-1 rounded-xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=400" 
                  alt="Mộc Bản - Knowledge" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 mix-blend-multiply"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-90 font-sans">02 / Knowledge</p>
                  <p className="font-serif text-sm font-medium mt-0.5">Mộc Bản</p>
                </div>
              </div>

              {/* Card 3: Jewelry (Refined, artistic close-up of premium Japanese pearl or classic gemstone detail) */}
              <div className="col-span-1 row-span-1 rounded-xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=400" 
                  alt="Jewelry - Refined Style" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/5 mix-blend-multiply"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-90 font-sans">03 / Personal Style</p>
                  <p className="font-serif text-sm font-medium mt-0.5">Jewelry Japan</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          02 THREE DISTINCT ECOSYSTEM BRANCHES
         ========================================== */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-y border-border-custom bg-ivory-light" id="ecosystem">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end text-left">
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-olive font-sans">
                The Vân Mộc Ecosystem
              </span>
              <h2 className="font-serif font-medium text-4xl md:text-5xl lg:text-[56px] tracking-tight text-charcoal leading-tight">
                Ba không gian.<br />
                Một hành trình.
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-body-text text-sm md:text-base leading-relaxed max-w-xl">
                Mỗi không gian của Vân Mộc đại diện cho một phần khác nhau trong hành trình trưởng thành — từ thế giới bên trong, năng lực thực chiến, đến thẩm mỹ và cách ta xuất hiện tinh tế trước cuộc đời.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Vườn Vân Mộc - Primary Featured Identity (Luxurious Deep Olive card) */}
            <article className="p-8 rounded-xl bg-olive text-white flex flex-col justify-between min-h-[500px] hover:-translate-y-1 transition-all duration-300 text-left border border-olive">
              <div className="space-y-6">
                <span className="font-serif text-sm text-gold-light font-medium block">
                  01 / Inner World
                </span>
                <h3 className="font-serif text-3xl lg:text-4xl leading-tight font-medium">
                  Vườn<br />Vân Mộc
                </h3>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed font-sans">
                  Không gian soi chiếu con người từ bên trong, giúp bạn nhận diện cảm xúc, khuôn mẫu, bản chất và cách mình đang vận hành.
                </p>
                
                {/* Real sublinks mapping directly to views */}
                <div className="flex flex-col gap-2.5 pt-4 text-left border-t border-white/15">
                  <a 
                    href="/vuon-van-moc/human-profile" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("ho_so_phat_trien");
                      setHoSoActiveSubTab("dashboard");
                    }} 
                    className="text-xs text-white/90 hover:text-gold-light transition-colors flex justify-between items-center group/item"
                  >
                    <span>• Bản đồ sinh học (Human Profile)</span>
                    <span className="text-[10px] text-gold-light font-serif">Xem ngay →</span>
                  </a>
                  <a 
                    href="/vuon-van-moc/coaching" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("coaching");
                    }} 
                    className="text-xs text-white/90 hover:text-gold-light transition-colors flex justify-between items-center group/item"
                  >
                    <span>• Đặt lịch Coaching 1:1</span>
                    <span className="text-[10px] text-gold-light font-serif">Đặt chỗ →</span>
                  </a>
                  <a 
                    href="/vuon-van-moc/ebook" 
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEbookReaderOpen(true);
                    }} 
                    className="text-xs text-white/90 hover:text-gold-light transition-colors flex justify-between items-center group/item"
                  >
                    <span>• Đọc sách Hiểu Mình Tỏa Sáng</span>
                    <span className="text-[10px] text-gold-light font-serif">Mở đọc →</span>
                  </a>
                </div>
              </div>

              <a 
                href="/vuon" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("thu_vien_tri_thuc");
                }}
                className="pt-5 font-semibold text-xs tracking-wider uppercase border-t border-white/10 mt-6 block text-[#D5C99F] hover:text-white transition-colors font-sans"
              >
                Bước vào Vườn Vân Mộc →
              </a>
            </article>

            {/* Card 2: Mộc Bản - Rational Modern Workspace Identity (Crisp white card with subtle borders) */}
            <article className="p-8 rounded-xl bg-white text-charcoal flex flex-col justify-between min-h-[500px] hover:-translate-y-1 transition-all duration-300 text-left border border-border-custom">
              <div className="space-y-6">
                <span className="font-serif text-sm text-olive font-medium block">
                  02 / Knowledge
                </span>
                <h3 className="font-serif text-3xl lg:text-4xl leading-tight font-medium">
                  Mộc<br />Bản
                </h3>
                <p className="text-xs md:text-sm text-body-text leading-relaxed font-sans">
                  Không gian ghi lại hành trình học tập, đúc rút tri thức ứng dụng, chuyển giao công nghệ và xây dựng doanh nghiệp số vững mạnh.
                </p>

                {/* Real sublinks / categories */}
                <div className="flex flex-col gap-2.5 pt-4 text-left border-t border-border-custom">
                  <a 
                    href="/moc-ban/digital-business" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("ho_so_phat_trien");
                      setHoSoActiveSubTab("dashboard");
                    }} 
                    className="text-xs text-stone-600 hover:text-olive transition-colors flex justify-between items-center"
                  >
                    <span>• Kiến tạo Doanh Nghiệp Số</span>
                    <span className="text-[10px] text-olive">Truy cập →</span>
                  </a>
                  <div className="text-xs text-stone-400 flex justify-between items-center">
                    <span>• Sáng tạo Nội dung thực chiến</span>
                    <span className="text-[10px] italic font-serif">Coming Soon</span>
                  </div>
                  <div className="text-xs text-stone-400 flex justify-between items-center">
                    <span>• Đúc kết Ứng dụng AI &amp; Web</span>
                    <span className="text-[10px] italic font-serif">Coming Soon</span>
                  </div>
                </div>
              </div>

              <a 
                href="/moc-ban" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("ho_so_phat_trien");
                }}
                className="pt-5 font-semibold text-xs tracking-wider uppercase border-t border-stone-100 mt-6 block text-olive hover:text-olive-dark transition-colors font-sans"
              >
                Khám phá Mộc Bản →
              </a>
            </article>

            {/* Card 3: Vân Mộc Jewelry Japan - Soft Elegant Luxury Identity (Cream color light card with gold border accents) */}
            <article className="p-8 rounded-xl bg-white text-charcoal flex flex-col justify-between min-h-[500px] hover:-translate-y-1 transition-all duration-300 text-left border border-[#D5C99F]/40 bg-[radial-gradient(ellipse_at_top_right,rgba(183,161,106,0.04),transparent_50%)]">
              <div className="space-y-6">
                <span className="font-serif text-sm text-olive font-medium block">
                  03 / Personal Style
                </span>
                <h3 className="font-serif text-3xl lg:text-4xl leading-tight font-medium">
                  Vân Mộc<br />Jewelry Japan
                </h3>
                <p className="text-xs md:text-sm text-body-text leading-relaxed font-sans">
                  Không gian tuyển lựa những món trang sức ngọc trai Nhật Bản tinh khiết, chuỗi đá quý chữa lành mang dấu ấn tự do vẹn toàn.
                </p>

                {/* Catalog classifications */}
                <div className="flex flex-col gap-2.5 pt-4 text-left border-t border-border-custom">
                  <a 
                    href="/jewelry" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("store");
                      setProductFilter("jewelry");
                    }} 
                    className="text-xs text-stone-600 hover:text-olive transition-colors flex justify-between items-center"
                  >
                    <span>• Akoya Pearl &amp; Vintage Silver</span>
                    <span className="text-[10px] text-stone-400">Xem mẫu →</span>
                  </a>
                  <a 
                    href="/jewelry" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("store");
                      setProductFilter("vong_da");
                    }} 
                    className="text-xs text-stone-600 hover:text-olive transition-colors flex justify-between items-center"
                  >
                    <span>• Vòng Đá Tự Nhiên &amp; Tinh Thể</span>
                    <span className="text-[10px] text-stone-400">Xem mẫu →</span>
                  </a>
                  <a 
                    href="/jewelry" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("store");
                      setProductFilter("tinh_the");
                    }} 
                    className="text-xs text-stone-600 hover:text-olive transition-colors flex justify-between items-center"
                  >
                    <span>• Tây Tạng Dzi Thiên Châu</span>
                    <span className="text-[10px] text-stone-400">Xem mẫu →</span>
                  </a>
                </div>
              </div>

              <a 
                href="/jewelry" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("store");
                  setProductFilter("jewelry");
                }}
                className="pt-5 font-semibold text-xs tracking-wider uppercase border-t border-stone-100 mt-6 block text-olive hover:text-olive-dark transition-colors font-sans"
              >
                Khám phá Jewelry →
              </a>
            </article>

          </div>
        </div>
      </section>

      {/* ==========================================
          03 PHILOSOPHY BLOCK
         ========================================== */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-ivory text-left" id="philosophy">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-start">
          <div className="lg:col-span-4">
            <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-olive font-sans">
              The Philosophy
            </span>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif font-medium text-4xl md:text-5xl lg:text-[62px] text-charcoal leading-[1.1] tracking-tight">
              Một con người không chỉ được tạo nên bởi điều họ biết, mà còn bởi cách họ <span className="text-olive">hiểu mình, chăm sóc mình và lựa chọn cách sống.</span>
            </h2>
            <p className="text-body-text text-sm md:text-base leading-relaxed max-w-2xl font-sans">
              Vân Mộc tin rằng bản sắc được hình thành từ sự kết nối giữa thế giới bên trong lặng lẽ, năng lực chúng ta tích luỹ, và cách chúng ta tinh tuyển lựa chọn xuất hiện trước cuộc đời.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          04 ACADEMY SECTION (MAKEUP FEATURED)
         ========================================== */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-t border-border-custom" id="academy">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="max-w-3xl text-left space-y-4">
            <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-olive font-sans">
              Vân Mộc Academy
            </span>
            <h2 className="font-serif font-medium text-4xl md:text-5xl lg:text-[56px] tracking-tight text-charcoal leading-tight">
              Học một kỹ năng.<br />
              Mở một khả năng mới.
            </h2>
            <p className="text-body-text text-sm md:text-base leading-relaxed">
              Các chương trình thực hành tại Vân Mộc Academy đồng hành giúp chuyển giao kiến thức khô khan thành năng lực hiện hữu sâu trong đời sống, rèn sắc diện và gieo mầm doanh nghiệp.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* MAKEUP FEATURED (Left, Big Card) */}
            <article className="lg:col-span-7 min-h-[480px] md:min-h-[530px] p-8 md:p-12 rounded-xl bg-[#282823] text-white flex flex-col justify-end relative overflow-hidden text-left">
              <div className="absolute right-[-40px] top-12 font-serif text-[160px] text-white/[0.02] select-none pointer-events-none leading-none">
                BEAUTY
              </div>

              <div className="space-y-6 relative z-10 max-w-xl">
                <span className="text-[#D6C69A] font-bold uppercase text-[10px] tracking-widest font-sans">
                  Featured Program · Beauty
                </span>
                <h3 className="font-serif font-medium text-4xl md:text-5xl lg:text-[62px] tracking-tight leading-none text-stone-100">
                  The Art<br />of Makeup.
                </h3>
                <p className="text-xs md:text-sm text-stone-300 leading-relaxed font-sans">
                  Makeup không phải để biến bạn thành một con người xa lạ khác biệt. Đó là cách bạn hiểu kết cấu gương mặt, gieo bảng màu phong cách và làm nổi bật vẻ đẹp sẵn có của chính mình.
                </p>

                <div className="pt-2 flex flex-col gap-2 border-t border-white/10 text-left">
                  <a 
                    href="/academy/makeup" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("store");
                    }}
                    className="text-xs font-semibold text-gold hover:text-white transition-colors flex justify-between items-center group"
                  >
                    <span>• Khóa học Makeup Cá Nhân (Tự tin rạng rỡ mỗi ngày)</span>
                    <span className="text-[10px] text-stone-400 group-hover:text-white">Chi tiết →</span>
                  </a>
                  <a 
                    href="/academy/skincare" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("store");
                    }}
                    className="text-xs font-semibold text-gold hover:text-white transition-colors flex justify-between items-center group"
                  >
                    <span>• Khóa học Hiểu &amp; Chăm Sóc Làn Da Của Mình</span>
                    <span className="text-[10px] text-stone-400 group-hover:text-white">Chi tiết →</span>
                  </a>
                </div>

                <div className="pt-2">
                  <a 
                    href="/academy/makeup" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("store");
                    }}
                    className="inline-flex min-h-[48px] px-6 rounded-full border border-white/40 hover:border-white text-white font-semibold text-xs uppercase tracking-wider items-center justify-center transition-all duration-300 hover:bg-white hover:text-stone-900 mt-2 font-sans"
                  >
                    Tìm hiểu khóa học →
                  </a>
                </div>
              </div>
            </article>

            {/* OTHER SUB-ACADEMY PROGRAMS (Right, List) */}
            <div className="lg:col-span-5 grid grid-rows-2 gap-6 text-left">
              
              <article className="p-8 bg-white border border-border-custom rounded-xl flex flex-col justify-between hover:shadow-2xs transition-shadow">
                <div className="space-y-4">
                  <span className="text-olive text-[10px] font-bold tracking-[0.14em] uppercase font-sans">
                    Digital Business
                  </span>
                  <h4 className="font-serif text-2xl lg:text-3xl text-charcoal font-medium leading-tight">
                    Kiến tạo doanh nghiệp số
                  </h4>
                  <p className="text-body-text text-xs md:text-sm leading-relaxed">
                    Độc lập kinh tế nhờ đúc kết tư duy nội dung, ứng dụng tự động hoá AI và xây dựng hệ thống website thương hiệu tinh nhuệ.
                  </p>
                </div>

                <a 
                  href="/academy/digital" 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("ho_so_phat_trien");
                    setHoSoActiveSubTab("dashboard");
                  }}
                  className="font-semibold text-xs tracking-wider uppercase text-olive hover:text-olive-dark transition-colors mt-6 block border-t border-stone-100 pt-4"
                >
                  Khám phá chương trình →
                </a>
              </article>

              <article className="p-8 bg-white border border-border-custom rounded-xl flex flex-col justify-between hover:shadow-2xs transition-shadow">
                <div className="space-y-4">
                  <span className="text-olive text-[10px] font-bold tracking-[0.14em] uppercase font-sans">
                    Self Development
                  </span>
                  <h4 className="font-serif text-2xl lg:text-3xl text-charcoal font-medium leading-tight">
                    Hiểu mình sâu rộng
                  </h4>
                  <p className="text-body-text text-xs md:text-sm leading-relaxed">
                    Các buổi rèn luyện chuyên sâu định hướng phong thái sống thong dong, giải mã rào cản nội tâm và thấu triệt nhân tướng học.
                  </p>
                </div>

                <a 
                  href="/academy/self-development" 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("thu_vien_tri_thuc");
                  }}
                  className="font-semibold text-xs tracking-wider uppercase text-olive hover:text-olive-dark transition-colors mt-6 block border-t border-stone-100 pt-4"
                >
                  Khám phá chương trình →
                </a>
              </article>

            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          05 SELECTED PRODUCTS (EBOOK IS HERE)
         ========================================== */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-olive-dark text-white" id="products">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 text-left">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#D5C997] font-sans">
                Selected by Vân Mộc
              </span>
              <h2 className="font-serif font-medium text-4xl md:text-5xl lg:text-[56px] tracking-tight text-white leading-tight">
                Sản phẩm<br />&amp; trải nghiệm.
              </h2>
            </div>
            <p className="text-stone-300 text-sm md:text-base max-w-lg leading-relaxed">
              Không phải mọi hành trình đều bắt đầu giống nhau. Có người bắt đầu từ một cuốn sách, một khóa học thực hành, một buổi trò chuyện sâu sắc hay một món trang sức chứa đựng rung động tự nhiên.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Ebook Card */}
            <article className="p-6 rounded-xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.065] transition-all duration-300 flex flex-col justify-between min-h-[360px]">
              <div className="space-y-4">
                <span className="text-[#D6C697] text-[9px] font-bold tracking-[0.15em] uppercase">
                  Ebook
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl font-medium tracking-tight leading-tight text-white">
                  Hiểu Mình<br />Chữa Lành<br />Tỏa Sáng
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  Tuyển tập tri thức thâm thâm dẫn dắt bạn trở lại kết nối an toàn với em bé bên trong, giải toả bất an cảm xúc.
                </p>
              </div>

              <a 
                href="/ebook/hieu-minh" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsEbookReaderOpen(true);
                }}
                className="text-[11px] uppercase tracking-wider font-semibold text-gold hover:text-white transition-colors mt-6 block pt-4 border-t border-white/5"
              >
                Đọc Ebook →
              </a>
            </article>

            {/* Course Card */}
            <article className="p-6 rounded-xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.065] transition-all duration-300 flex flex-col justify-between min-h-[360px]">
              <div className="space-y-4">
                <span className="text-[#D6C697] text-[9px] font-bold tracking-[0.15em] uppercase">
                  Course
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl font-medium tracking-tight leading-tight text-white">
                  Makeup<br />Cá Nhân
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  Tìm hiểu kết cấu xương mặt, học cách phối màu phấn nền phù hợp, dựng phong cách nhã nhặn tự nhiên.
                </p>
              </div>

              <a 
                href="/academy/makeup" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("store");
                }}
                className="text-[11px] uppercase tracking-wider font-semibold text-gold hover:text-white transition-colors mt-6 block pt-4 border-t border-white/5"
              >
                Xem khóa học →
              </a>
            </article>

            {/* Coaching Card */}
            <article className="p-6 rounded-xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.065] transition-all duration-300 flex flex-col justify-between min-h-[360px]">
              <div className="space-y-4">
                <span className="text-[#D6C697] text-[9px] font-bold tracking-[0.15em] uppercase">
                  Coaching
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl font-medium tracking-tight leading-tight text-white">
                  Human<br />Profile
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  Giải mã toàn diện các khuôn mẫu hành vi và kế hoạch sinh học qua tham vấn trực tiếp chuyên sâu.
                </p>
              </div>

              <a 
                href="/vuon/human-profile" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("coaching");
                }}
                className="text-[11px] uppercase tracking-wider font-semibold text-gold hover:text-white transition-colors mt-6 block pt-4 border-t border-white/5"
              >
                Tìm hiểu →
              </a>
            </article>

            {/* Jewelry Card */}
            <article className="p-6 rounded-xl border border-white/10 bg-white/[0.035] hover:bg-white/[0.065] transition-all duration-300 flex flex-col justify-between min-h-[360px]">
              <div className="space-y-4">
                <span className="text-[#D6C697] text-[9px] font-bold tracking-[0.15em] uppercase">
                  Jewelry
                </span>
                <h3 className="font-serif text-2xl lg:text-3xl font-medium tracking-tight leading-tight text-white">
                  Vân Mộc<br />Collection
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  Tuyển chọn những mảnh đá tự nhiên độc bản mang năng lượng điều hòa mát mẻ cho trường sinh học của bạn.
                </p>
              </div>

              <a 
                href="/jewelry" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("store");
                  setProductFilter("jewelry");
                }}
                className="text-[11px] uppercase tracking-wider font-semibold text-gold hover:text-white transition-colors mt-6 block pt-4 border-t border-white/5"
              >
                Khám phá →
              </a>
            </article>

          </div>
        </div>
      </section>

      {/* ========================================================
          06 DYNAMIC INTEGRATED EXPERIENCE: AI DIARY & LATEST JOURNAL
         ======================================================== */}
      <section className="py-16 md:py-24 px-4 md:px-8 border-b border-border-custom bg-ivory-light" id="goc-viet-nhat-ky">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest font-bold text-olive bg-olive/5 px-4 py-1.5 rounded-full inline-block font-sans">
              Trải nghiệm tương tác trực tiếp
            </span>
            <h3 className="text-3xl md:text-4xl font-serif text-[#292A26] tracking-tight">
              Nhật Ký Tỉnh Thức &amp; Tri Kỷ AI
            </h3>
            <p className="text-body-text text-xs md:text-sm leading-relaxed font-sans">
              Trút bỏ mọi phiền muộn, viết xuống trăn trở của bạn và để Vân Mộc AI lắng nghe, phản chiếu và vỗ về tâm hồn bạn bằng sự hiền hậu, cảm thông sâu sắc hằng ngày.
            </p>
          </div>

          {/* Daily Card Quick Drawer (Gieo Duyên) */}
          <div className="bg-white rounded-xl p-6 md:p-8 border border-border-custom flex flex-col md:flex-row gap-8 items-center justify-between shadow-2xs max-w-4xl mx-auto text-left">
            <div className="space-y-2 flex-1">
              <span className="text-[9px] uppercase tracking-wider font-mono text-olive font-bold block">
                Thông điệp định tâm mỗi ngày
              </span>
              <h4 className="font-serif text-xl text-stone-900 font-semibold">
                Gieo duyên chánh niệm mỗi sớm mai
              </h4>
              <p className="text-xs text-[#5E5D55] leading-relaxed max-w-md font-sans">
                Nhấp nút bên cạnh để bốc một thông điệp định hướng tâm thức và nuôi dưỡng năng lượng tỉnh thức trong ngày.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0 flex flex-col gap-3 min-w-[280px]">
              {dailyCard ? (
                <div className="bg-ivory-light border border-stone-200 p-5 rounded-lg space-y-2 text-left">
                  <span className="text-[9px] font-bold text-amber-800 bg-amber-50 uppercase tracking-wide px-2 py-0.5 rounded">
                    Chủ đề: {dailyCard.category}
                  </span>
                  <p className="font-serif italic text-stone-900 text-sm leading-relaxed">
                    “{dailyCard.quote}”
                  </p>
                  <p className="text-[10px] text-stone-500 leading-relaxed font-sans">
                    {dailyCard.interpretation}
                  </p>
                </div>
              ) : (
                <div className="bg-ivory-light border border-dashed border-stone-300 p-5 rounded-lg text-stone-400 italic text-xs leading-relaxed text-center font-serif">
                  “Đằng sau mọi cuồng quay của cuộc sống là một hiên nhà tĩnh lặng đang đợi bạn trở về.”
                </div>
              )}

              <button
                onClick={handleDailyCardPull}
                disabled={isPullingCard}
                className="w-full py-3 bg-olive hover:bg-olive-dark text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-sans"
              >
                {isPullingCard ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Đang kết nối...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                    <span>Rút thông điệp ngẫu nhiên</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Diary Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
            {/* Input fields */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-xl border border-border-custom space-y-6 text-left">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold font-sans">
                  1. Chọn tâm trạng lúc này của bạn
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {["Bình yên", "Bất an", "Tổn thương", "Lòng hoài nghi", "Mệt mỏi", "Hy vọng"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 cursor-pointer ${
                        mood === m
                          ? "bg-olive/10 text-olive font-semibold border border-olive/30"
                          : "bg-ivory-light text-stone-600 border border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      {m === "Bình yên" && "🍃 "}
                      {m === "Bất an" && "☁️ "}
                      {m === "Tổn thương" && "🩹 "}
                      {m === "Lòng hoài nghi" && "🔍 "}
                      {m === "Mệt mỏi" && "🥀 "}
                      {m === "Hy vọng" && "✨ "}
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold font-sans">
                  2. Chọn chủ đề phản chiếu
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e: any) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 text-xs md:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-olive bg-white text-stone-700 font-sans"
                >
                  <option value="hieu_minh">Hiểu Mình — Gốc rễ của mọi sự trưởng thành</option>
                  <option value="chua_lanh">Chữa Lành — Quay về nâng niu tổn thương</option>
                  <option value="toa_sang">Tỏa Sáng — Khí chất nguyên bản</option>
                  <option value="nhan_tam">Rèn Luyện Nhân Tâm — Gốc vững một đời</option>
                  <option value="moi_quan_he">Mối Quan Hệ — Tấm gương soi lại mình</option>
                  <option value="goc_nhin_cuoc_song">Góc Nhìn Cuộc Sống — Người học bài học</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold font-sans">
                  3. Viết trang nhật ký của bạn
                </label>
                <textarea
                  rows={5}
                  placeholder="Viết bất kỳ suy nghĩ lộn xộn nào đang có trong đầu bạn... Bạn đang sợ gì? Đang mệt mỏi vì điều gì? Hay bài học nào bạn vừa ngộ ra?"
                  value={journalInput}
                  onChange={(e) => setJournalInput(e.target.value)}
                  className="w-full p-4 text-xs md:text-sm rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-olive bg-ivory/20 placeholder-stone-400 font-sans leading-relaxed"
                />
              </div>

              <button
                onClick={() => submitJournalReflection()}
                disabled={isAiLoading || !journalInput.trim()}
                className="w-full py-3.5 bg-olive text-white hover:bg-olive-dark rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50 font-sans"
              >
                {isAiLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Vân Mộc đang soi sáng...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Gửi gắm tâm sự để soi sáng
                  </>
                )}
              </button>
            </div>

            {/* AI Response output */}
            <div className="lg:col-span-5 flex flex-col gap-6 h-full text-left">
              <div className="bg-white p-6 md:p-8 rounded-xl border border-border-custom flex-1 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
                <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 rounded-full blur-xl opacity-60"></div>
                <div className="z-10 flex-1 flex flex-col">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 font-sans">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Tri kỷ Vân Mộc AI
                    </span>
                    <span className="text-[9px] text-stone-400 font-mono">Lắng nghe thâm trầm</span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center min-h-[180px]">
                    {aiResponse ? (
                      <p className="text-xs md:text-sm text-stone-700 leading-relaxed italic whitespace-pre-line font-serif">
                        “{aiResponse}”
                      </p>
                    ) : (
                      <div className="text-center py-4 text-stone-400 text-xs italic font-serif">
                        “Trang giấy đang mở rộng, Vân Mộc hiền hậu đón nhận mọi thổ lộ sâu thẳm nhất từ trái tâm của bạn.”
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* History index logs */}
              {journalEntries.length > 0 && (
                <div className="bg-white p-4 rounded-xl border border-border-custom max-h-[180px] overflow-y-auto space-y-2 text-left">
                  <div className="flex justify-between items-center mb-2 border-b border-stone-100 pb-1">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-stone-500">Lịch sử nhật ký ({journalEntries.length})</span>
                    <button
                      onClick={() => {
                        if (confirm("Bạn có chắc muốn xóa lịch sử nhật ký tại máy này?")) saveJournalEntries([]);
                      }}
                      className="text-[8px] text-stone-400 hover:text-red-500 uppercase transition-colors"
                    >
                      Xóa tất cả
                    </button>
                  </div>
                  {journalEntries.slice(0, 3).map((entry) => (
                    <div
                      key={entry.id}
                      onClick={() => {
                        setJournalInput(entry.content);
                        setAiResponse(entry.aiReply || "");
                        setMood(entry.mood);
                        setSelectedCategory(entry.category);
                      }}
                      className="p-2.5 bg-ivory-light hover:bg-olive/5 rounded-lg border border-stone-100 transition-colors cursor-pointer text-left"
                    >
                      <div className="flex justify-between text-[9px] text-stone-400 font-mono">
                        <span>{entry.mood}</span>
                        <span>{entry.date.split(",")[1] || entry.date}</span>
                      </div>
                      <p className="text-[10px] text-stone-700 font-sans line-clamp-1 mt-0.5 font-semibold">{entry.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          07 LATEST CHIA SẺ FROM CMS/DATABASE
         ======================================================== */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-ivory border-b border-border-custom" id="latest">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end text-left">
            <div className="lg:col-span-6 space-y-3">
              <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-olive font-sans">
                From Vân Mộc
              </span>
              <h2 className="font-serif font-medium text-4xl md:text-5xl lg:text-[56px] tracking-tight text-charcoal leading-tight">
                Những điều<br />đang được chia sẻ.
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-body-text text-sm md:text-base leading-relaxed max-w-xl">
                Những bài viết mới đầy cảm quan, chia sẻ kinh nghiệm rèn mình, đúc rút tri thức doanh nghiệp số và câu chuyện ngọc trai Japan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Topic 1 */}
            <article className="rounded-xl overflow-hidden bg-white border border-border-custom hover:shadow-2xs transition-all duration-300 text-left">
              <div className="aspect-video bg-stone-100 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400" 
                  alt="Hiểu mình thực sự" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-3">
                <span className="text-olive text-[10px] font-bold tracking-[0.12em] uppercase font-sans">Vườn Vân Mộc</span>
                <h3 className="font-serif text-xl font-medium text-charcoal leading-snug">
                  Hiểu mình không chỉ là biết mình thích gì
                </h3>
                <p className="text-xs text-body-text leading-relaxed font-sans">
                  Đi sâu hơn từ những phản ứng tâm trạng, nhận thức các bài học gốc rễ, và nuôi dưỡng thế giới nhân sinh trọn vẹn hơn.
                </p>
              </div>
            </article>

            {/* Topic 2 */}
            <article className="rounded-xl overflow-hidden bg-white border border-border-custom hover:shadow-2xs transition-all duration-300 text-left">
              <div className="aspect-video bg-stone-100 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400" 
                  alt="Doanh nghiệp số" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-3">
                <span className="text-olive text-[10px] font-bold tracking-[0.12em] uppercase font-sans">Mộc Bản</span>
                <h3 className="font-serif text-xl font-medium text-charcoal leading-snug">
                  Xây một doanh nghiệp số từ những gì mình biết
                </h3>
                <p className="text-xs text-body-text leading-relaxed font-sans">
                  Những ghi chép thực tế tinh gọn về content, AI hỗ trợ, dựng phác thảo thương hiệu cá nhân bền vững qua năm tháng.
                </p>
              </div>
            </article>

            {/* Topic 3 */}
            <article className="rounded-xl overflow-hidden bg-white border border-border-custom hover:shadow-2xs transition-all duration-300 text-left">
              <div className="aspect-video bg-stone-100 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=400" 
                  alt="Jewelry Japan" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-3">
                <span className="text-olive text-[10px] font-bold tracking-[0.12em] uppercase font-sans">Vân Mộc Jewelry</span>
                <h3 className="font-serif text-xl font-medium text-charcoal leading-snug">
                  Trang sức đẹp bắt đầu từ việc hiểu chất liệu
                </h3>
                <p className="text-xs text-body-text leading-relaxed font-sans">
                  Những bài học thẩm mỹ giản dị qua lớp bóng xà cừ Akoya Nhật Bản, tinh thể đá quý và trang sức chế tác vintage.
                </p>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* ==========================================
          08 START JOURNEY
         ========================================== */}
      <section className="py-12 md:py-20 px-4 md:px-8" id="start-journey">
        <div className="max-w-5xl mx-auto bg-ivory-light border border-border-custom rounded-xl p-8 md:p-16 text-center">
          <div className="max-w-2xl mx-auto space-y-6 flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-olive font-sans">
              Start Your Journey
            </span>
            <h2 className="font-serif font-medium text-3xl md:text-4xl lg:text-5xl tracking-tight text-charcoal leading-tight">
              Bạn muốn bắt đầu<br />từ đâu?
            </h2>
            <p className="text-body-text text-xs md:text-sm leading-relaxed max-w-md">
              Không có một hành trình chung phù hợp cho tất cả mọi người. Hãy xuất phát từ điều bạn muốn khám phá hoặc thay đổi nhất tại thời điểm này.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 w-full max-w-xl">
              <button 
                onClick={() => setActiveTab("thu_vien_tri_thuc")}
                className="min-h-[50px] px-6 rounded-full bg-olive hover:bg-olive-dark text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer font-sans"
              >
                Tôi muốn hiểu mình
              </button>
              <button 
                onClick={() => {
                  setActiveTab("store");
                  setProductFilter("course");
                }}
                className="min-h-[50px] px-6 rounded-full border border-olive text-olive hover:bg-olive hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer font-sans"
              >
                Tôi muốn đẹp hơn
              </button>
              <button 
                onClick={() => {
                  setActiveTab("ho_so_phat_trien");
                  setHoSoActiveSubTab("dashboard");
                }}
                className="min-h-[50px] px-6 rounded-full border border-olive text-olive hover:bg-olive hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer font-sans"
              >
                Tôi muốn xây năng lực
              </button>
              <button 
                onClick={() => {
                  setActiveTab("store");
                  setProductFilter("jewelry");
                }}
                className="min-h-[50px] px-6 rounded-full border border-olive text-olive hover:bg-olive hover:text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer font-sans"
              >
                Tôi yêu trang sức &amp; phong cách
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
