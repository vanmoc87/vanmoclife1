import React from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  Send, 
  ArrowUpRight, 
  BookOpen, 
  MessageSquare, 
  Sliders, 
  BookMarked 
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

  // Fetch a daily card from the actual server API
  const handleDailyCardPull = async () => {
    setIsPullingCard(true);
    try {
      const res = await fetch("/api/cards/daily");
      if (res.ok) {
        const cards = await res.json();
        if (cards && cards.length > 0) {
          const randomIdx = Math.floor(Math.random() * cards.length);
          setDailyCard(cards[randomIdx]);
        }
      }
    } catch (err) {
      console.error("Error pulling daily card:", err);
    } finally {
      setIsPullingCard(false);
    }
  };

  return (
    <div className="font-sans text-charcoal bg-cream selection:bg-forest/10 selection:text-forest overflow-x-hidden">
      
      {/* ==========================================
          01 HERO: Cream + Editorial Mosaic (3 Images)
         ========================================== */}
      <section className="py-8 md:py-14 px-4 md:px-8 bg-cream-light" id="home">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch border border-stone-200/10 rounded-[22px] bg-cream overflow-hidden min-h-[620px]">
            
            {/* Copy Column */}
            <div className="lg:col-span-6 p-6 md:p-12 lg:p-14 flex flex-col justify-center text-left space-y-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-forest font-sans">
                Vân Mộc Life
              </span>

              <motion.h1 
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-serif text-[42px] md:text-[50px] lg:text-[76px] font-medium tracking-tighter text-charcoal leading-[1.0]"
              >
                Hiểu mình.<br />
                Phát triển mình.<br />
                Sống theo cách riêng.
              </motion.h1>

              <p className="font-sans text-xs md:text-sm text-text-soft max-w-lg leading-relaxed">
                Một hệ sinh thái về con người, tri thức, vẻ đẹp và phong cách sống — nơi mỗi hành trình bắt đầu từ việc hiểu sâu sắc bản thân để sống rực rỡ khí chất.
              </p>

              <div className="flex flex-wrap gap-3 pt-3">
                <a 
                  href="#ecosystem" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("ecosystem")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="min-h-[46px] px-6 rounded-full bg-forest hover:bg-forest-deep text-white font-semibold text-[11px] uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  Khám phá hệ sinh thái
                </a>
                <a 
                  href="#journey" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="min-h-[46px] px-6 rounded-full border border-forest/30 text-forest hover:bg-forest hover:text-white font-semibold text-[11px] uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  Bắt đầu từ đâu?
                </a>
              </div>
            </div>

            {/* Editorial Mosaic (3 Images) */}
            <div className="lg:col-span-6 p-4 md:p-6 grid grid-cols-12 gap-3 min-h-[480px]">
              
              {/* Photo 1 (Vườn: Nature Serene - Large) */}
              <div className="col-span-7 relative overflow-hidden rounded-[14px] bg-stone group">
                <img 
                  src="/images/vuon.jpg" 
                  alt="Vườn Vân Mộc - Thiên nhiên yên bình" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute left-4 bottom-4 text-left text-white">
                  <span className="text-[9px] uppercase tracking-widest text-champagne font-semibold block">01 / Vườn</span>
                  <strong className="font-serif text-lg font-medium">Inner World</strong>
                </div>
              </div>

              {/* Stack on Right */}
              <div className="col-span-5 grid grid-rows-2 gap-3">
                
                {/* Photo 2 (Mộc Bản: Workspace & Notebook) */}
                <div className="relative overflow-hidden rounded-[14px] bg-stone group">
                  <img 
                    src="/images/moc-ban.jpg" 
                    alt="Mộc Bản - Tri thức" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute left-3 bottom-3 text-left text-white">
                    <span className="text-[8px] uppercase tracking-widest text-stone font-semibold block">02 / Mộc Bản</span>
                    <strong className="font-serif text-sm font-medium">Knowledge</strong>
                  </div>
                </div>

                {/* Photo 3 (Jewelry: REAL Pearls & Gold detail - NO makeup) */}
                <div className="relative overflow-hidden rounded-[14px] bg-stone group">
                  <img 
                    src="/images/jewelry.jpg" 
                    alt="Vân Mộc Jewelry Japan - Ngọc trai thâm trầm" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute left-3 bottom-3 text-left text-white">
                    <span className="text-[8px] uppercase tracking-widest text-rose font-semibold block">03 / Jewelry</span>
                    <strong className="font-serif text-sm font-medium">Style &amp; Pearl</strong>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          02 ECOSYSTEM: 3 distinct visual cards
         ========================================== */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-cream" id="ecosystem">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end text-left">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-forest font-sans block">
                The Vân Mộc Ecosystem
              </span>
              <h2 className="font-serif font-medium text-[36px] md:text-[40px] lg:text-[52px] tracking-tight text-charcoal leading-tight">
                Ba không gian.<br />
                Một hành trình bản sắc.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-text-soft text-xs md:text-sm leading-relaxed max-w-xl">
                Mỗi không gian là một mảnh ghép thiêng liêng: nuôi dưỡng thế giới nội tâm tại Vườn, khai phóng tri thức tại Mộc Bản và tinh chọn vẻ đẹp phong thái cùng Jewelry Japan.
              </p>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Card 1: Vườn Vân Mộc (Visual Identity = Forest Green background) */}
            <article className="rounded-[16px] bg-forest text-white flex flex-col overflow-hidden min-h-[540px] hover:-translate-y-1 transition-all duration-300 border border-forest text-left">
              <div className="h-[210px] w-full overflow-hidden shrink-0">
                <img 
                  src="/images/vuon.jpg" 
                  alt="Vườn Vân Mộc - Bản nguyên xanh"
                  className="w-full h-full object-cover transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-7 flex flex-col flex-1 justify-between">
                <div className="space-y-3">
                  <span className="text-[12px] font-serif text-champagne block font-medium">
                    01 / Inner World
                  </span>
                  <h3 className="font-serif text-[28px] lg:text-[32px] font-medium leading-tight">
                    Vườn Vân Mộc
                  </h3>
                  <p className="text-xs text-stone/90 leading-relaxed font-sans">
                    Không gian chầm chậm quay về ôm ấp xúc cảm xáo động, giải mã khuôn mẫu cũ để thiết lập năng lực chuyển hóa sâu sắc bên trong linh hồn.
                  </p>
                </div>

                <a 
                  href="/vuon" 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("thu_vien_tri_thuc");
                  }}
                  className="text-[11px] font-semibold tracking-wider uppercase text-champagne hover:text-white transition-colors mt-8 font-sans border-t border-white/10 pt-4"
                >
                  Khám phá Vườn →
                </a>
              </div>
            </article>

            {/* Card 2: Mộc Bản (Visual Identity = Warm Stone background) */}
            <article className="rounded-[16px] bg-stone text-charcoal flex flex-col overflow-hidden min-h-[540px] hover:-translate-y-1 transition-all duration-300 border border-stone-300/30 text-left">
              <div className="h-[210px] w-full overflow-hidden shrink-0">
                <img 
                  src="/images/moc-ban.jpg" 
                  alt="Mộc Bản - Ghi chép và tri thức"
                  className="w-full h-full object-cover transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-7 flex flex-col flex-1 justify-between">
                <div className="space-y-3">
                  <span className="text-[12px] font-serif text-forest block font-medium">
                    02 / Knowledge
                  </span>
                  <h3 className="font-serif text-[28px] lg:text-[32px] font-medium leading-tight">
                    Mộc Bản
                  </h3>
                  <p className="text-xs text-text-soft leading-relaxed font-sans">
                    Nơi kiến tạo và đóng gói kỹ năng thực chiến: Trực quan hóa nội dung số, tối ưu trợ lý AI cá nhân, viết lách thong thả và xây dựng doanh nghiệp thăng hoa.
                  </p>
                </div>

                <a 
                  href="/moc-ban" 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("ho_so_phat_trien");
                    setHoSoActiveSubTab("dashboard");
                  }}
                  className="text-[11px] font-semibold tracking-wider uppercase text-forest hover:text-forest-deep transition-colors mt-8 font-sans border-t border-stone-400/20 pt-4"
                >
                  Khám phá Mộc Bản →
                </a>
              </div>
            </article>

            {/* Card 3: Vân Mộc Jewelry Japan (Visual Identity = Wine/Rose background) */}
            <article className="rounded-[16px] bg-[#E9D9D0] text-[#40322D] flex flex-col overflow-hidden min-h-[540px] hover:-translate-y-1 transition-all duration-300 border border-rose-300/10 text-left">
              <div className="h-[210px] w-full overflow-hidden shrink-0">
                <img 
                  src="/images/jewelry.jpg" 
                  alt="Vân Mộc Jewelry Japan - Đá quý mộc mạc"
                  className="w-full h-full object-cover transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-7 flex flex-col flex-1 justify-between">
                <div className="space-y-3">
                  <span className="text-[12px] font-serif text-wine block font-medium">
                    03 / Personal Style
                  </span>
                  <h3 className="font-serif text-[28px] lg:text-[32px] font-medium leading-tight">
                    Jewelry Japan
                  </h3>
                  <p className="text-xs text-wine/80 leading-relaxed font-sans">
                    Tuyển chọn trang sức Nhật Bản tinh xảo mang thần thái thâm trầm, ngọc trai nước ngọt và đá năng lượng để định hình phong cách quý phái lặng im.
                  </p>
                </div>

                <a 
                  href="/jewelry" 
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("store");
                    setProductFilter("jewelry");
                  }}
                  className="text-[11px] font-semibold tracking-wider uppercase text-wine hover:text-wine/80 transition-colors mt-8 font-sans border-t border-wine/10 pt-4"
                >
                  Khám phá Jewelry →
                </a>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* ==========================================
          03 PHILOSOPHY: Sand Beige Background + Quote (Max 51px)
         ========================================== */}
      <section className="py-20 px-4 md:px-8 bg-sand-light text-left" id="about">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-start">
          
          <div className="lg:col-span-4">
            <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-forest font-sans">
              The Philosophy
            </span>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-serif font-medium text-[28px] md:text-[34px] lg:text-[45px] text-ink leading-[1.15] tracking-tight max-w-[850px]">
              Một con người không chỉ được tạo nên bởi điều họ biết. Bản sắc còn nằm ở cách ta <span className="text-forest italic">hiểu mình, chăm sóc mình và lựa chọn cách sống.</span>
            </h2>
            <div className="w-14 h-[1px] bg-bronze my-4"></div>
            <p className="text-text-soft text-xs md:text-sm leading-relaxed max-w-2xl font-sans">
              Vân Mộc tin rằng mọi sự nở rộ bên ngoài đều bắt nguồn từ một hiên nhà tĩnh lặng bên trong. Khí chất tinh tế không cần ồn ào khẳng định, nó tự tỏa sáng qua từng quyết định tự tại và thấu triệt linh hồn mình.
            </p>
          </div>

        </div>
      </section>

      {/* ==========================================
          04 ACADEMY: Cream + Deep Ink + Rose
         ========================================== */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-cream border-t border-stone-200/15" id="academy">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="max-w-3xl text-left space-y-3">
            <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-forest font-sans">
              Vân Mộc Academy
            </span>
            <h2 className="font-serif font-medium text-[36px] md:text-[40px] lg:text-[50px] tracking-tight text-charcoal leading-tight">
              Học một điều mới.<br />
              Mở một khả năng mới.
            </h2>
            <p className="text-text-soft text-xs md:text-sm leading-relaxed max-w-xl">
              Nơi chắt lọc những chương trình đào tạo cốt lõi giúp rèn luyện phong thái rực rỡ khí sắc và nâng tầm nội lực doanh nghiệp cá nhân bền bỉ.
            </p>
          </div>

          {/* Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* MAKEUP FEATURED (Image 55% / Content 45% - Image: makeup.jpg beauty portrait) */}
            <div className="lg:col-span-8 rounded-[18px] bg-ink text-white overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[520px]">
              
              {/* Image 55% */}
              <div className="md:col-span-7 h-60 md:h-auto overflow-hidden relative">
                <img 
                  src="/images/makeup.jpg" 
                  alt="Vân Mộc Beauty Portrait - Khóa Makeup cá nhân" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content 45% */}
              <div className="md:col-span-5 p-7 md:p-9 flex flex-col justify-between text-left space-y-4">
                <div className="space-y-3">
                  <span className="text-champagne font-bold uppercase text-[9px] tracking-widest font-sans block">
                    Featured Program · Beauty
                  </span>
                  <h3 className="font-serif font-medium text-[28px] md:text-[32px] tracking-tight leading-tight text-stone-100">
                    The Art of<br />Makeup.
                  </h3>
                  <p className="text-[11px] md:text-xs text-stone-300 leading-relaxed font-sans">
                    Trang điểm không phải là chiếc mặt nạ để giấu đi bản thân. Đó là sự thấu hiểu đường nét độc bản, phối khí sắc tươi rạng để bạn tự tin nhìn ngắm chính mình rực rỡ nhất.
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  <a 
                    href="/academy/makeup" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("store");
                      setProductFilter("course");
                    }}
                    className="text-xs font-semibold text-champagne hover:text-white transition-colors flex justify-between items-center group font-sans"
                  >
                    <span>• Khóa Makeup Cá Nhân</span>
                    <span className="text-[10px] text-stone-400 group-hover:text-white">Chi tiết →</span>
                  </a>
                  <a 
                    href="/academy/skincare" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab("store");
                      setProductFilter("course");
                    }}
                    className="text-xs font-semibold text-champagne hover:text-white transition-colors flex justify-between items-center group font-sans"
                  >
                    <span>• Khóa Chăm Sóc Làn Da</span>
                    <span className="text-[10px] text-stone-400 group-hover:text-white">Chi tiết →</span>
                  </a>
                </div>

                <button 
                  onClick={() => {
                    setActiveTab("store");
                    setProductFilter("course");
                  }}
                  className="min-h-[42px] px-5 rounded-full border border-white/20 hover:border-white text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-ink font-sans w-full"
                >
                  Tìm hiểu khóa học
                </button>
              </div>

            </div>

            {/* Side columns: Digital (Warm Stone) & Self (Warm Rose) */}
            <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
              
              {/* Digital Business (Warm Stone bg) */}
              <article className="p-7 bg-stone border border-stone-300/30 rounded-[16px] flex-1 flex flex-col justify-between text-left">
                <div className="space-y-2">
                  <span className="text-forest text-[10px] font-bold tracking-[0.14em] uppercase block font-sans">
                    Digital Business
                  </span>
                  <h4 className="font-serif text-[22px] md:text-[25px] text-charcoal font-medium leading-tight">
                    Kiến tạo doanh nghiệp số
                  </h4>
                  <p className="text-text-soft text-xs leading-relaxed">
                    Đồng hành thiết kế cấu trúc vận hành tinh gọn, tích hợp AI viết content và tối ưu hóa hệ thống website kinh doanh thong thả của riêng bạn.
                  </p>
                </div>

                <a 
                  href="/academy/digital"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("ho_so_phat_trien");
                    setHoSoActiveSubTab("dashboard");
                  }}
                  className="font-semibold text-xs tracking-wider uppercase text-forest hover:text-forest-deep transition-colors mt-5 block border-t border-stone-400/20 pt-3 text-left font-sans"
                >
                  Khám phá chương trình →
                </a>
              </article>

              {/* Self Development (Warm Rose bg) */}
              <article className="p-7 bg-rose border border-stone-300/30 rounded-[16px] flex-1 flex flex-col justify-between text-left">
                <div className="space-y-2">
                  <span className="text-wine text-[10px] font-bold tracking-[0.14em] uppercase block font-sans">
                    Self Development
                  </span>
                  <h4 className="font-serif text-[22px] md:text-[25px] text-[#422C28] font-medium leading-tight">
                    Hiểu mình sâu hơn
                  </h4>
                  <p className="text-text-soft text-xs leading-relaxed">
                    Học cách đối diện chân thực với các nút thắt nội tâm, gieo nghi thức tỉnh thức ban mai hằng ngày và kiến tạo bản sắc tự tin.
                  </p>
                </div>

                <a 
                  href="/academy/self-development"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("thu_vien_tri_thuc");
                  }}
                  className="font-semibold text-xs tracking-wider uppercase text-wine hover:text-wine/85 transition-colors mt-5 block border-t border-[#65443C]/10 pt-3 text-left font-sans"
                >
                  Khám phá chương trình →
                </a>
              </article>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          05 PRODUCTS: Deep Forest Background
         ========================================== */}
      <section className="py-20 px-4 md:px-8 bg-forest-deep text-white border-y border-white/5" id="products">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 text-left">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-champagne font-sans block">
                Selected by Vân Mộc
              </span>
              <h2 className="font-serif font-medium text-[36px] md:text-[40px] lg:text-[52px] tracking-tight text-white leading-tight">
                Sản phẩm &amp;<br />trải nghiệm.
              </h2>
            </div>
            <p className="text-stone-300 text-xs md:text-sm max-w-md leading-relaxed">
              Những phương tiện chạm chạm dịu lành — mở đầu tinh khôi qua một trang sách khai tâm, một khóa học định hình thần thái, hay một viên đá thanh khiết đồng tần số.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            
            {/* Product 1 */}
            <article className="p-5 rounded-[12px] border border-white/10 bg-white/[0.035] hover:bg-white/[0.06] transition-all duration-350 flex flex-col justify-between min-h-[320px]">
              <div className="space-y-4">
                <span className="text-champagne text-[9px] font-bold tracking-[0.15em] uppercase block font-sans">
                  Ebook
                </span>
                <h3 className="font-serif text-[24px] lg:text-[27px] font-medium tracking-tight leading-snug text-white">
                  Hiểu Mình<br />Chữa Lành<br />Tỏa Sáng
                </h3>
                <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
                  Điểm chạm đầu tiên dịu dàng và nâng niu cho hành trình đối thoại và thấu hiểu chiều sâu linh hồn.
                </p>
              </div>

              <a 
                href="/ebook" 
                onClick={(e) => {
                  e.preventDefault();
                  setIsEbookReaderOpen(true);
                }}
                className="text-[10px] uppercase tracking-wider font-bold text-champagne hover:text-white transition-colors mt-6 block pt-3 border-t border-white/5 font-sans"
              >
                Xem ebook →
              </a>
            </article>

            {/* Product 2 */}
            <article className="p-5 rounded-[12px] border border-white/10 bg-white/[0.035] hover:bg-white/[0.06] transition-all duration-355 flex flex-col justify-between min-h-[320px]">
              <div className="space-y-4">
                <span className="text-champagne text-[9px] font-bold tracking-[0.15em] uppercase block font-sans">
                  Course
                </span>
                <h3 className="font-serif text-[24px] lg:text-[27px] font-medium tracking-tight leading-snug text-white">
                  Makeup<br />Cá Nhân
                </h3>
                <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
                  Học trực tuyến bài bản để làm hòa với đường nét cơ thể và rèn sắc thái tỏa sương mai rạng ngời.
                </p>
              </div>

              <a 
                href="/academy/makeup" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("store");
                  setProductFilter("course");
                }}
                className="text-[10px] uppercase tracking-wider font-bold text-champagne hover:text-white transition-colors mt-6 block pt-3 border-t border-white/5 font-sans"
              >
                Xem khóa học →
              </a>
            </article>

            {/* Product 3 */}
            <article className="p-5 rounded-[12px] border border-white/10 bg-white/[0.035] hover:bg-white/[0.06] transition-all duration-360 flex flex-col justify-between min-h-[320px]">
              <div className="space-y-4">
                <span className="text-champagne text-[9px] font-bold tracking-[0.15em] uppercase block font-sans">
                  Coaching
                </span>
                <h3 className="font-serif text-[24px] lg:text-[27px] font-medium tracking-tight leading-snug text-white">
                  Human<br />Profile
                </h3>
                <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
                  Hành trình soi chiếu và đo đạc trường sinh học, năng lượng luân xa để định vị nút thắt cuộc sống hằng ngày.
                </p>
              </div>

              <a 
                href="/vuon/human-profile" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("coaching");
                }}
                className="text-[10px] uppercase tracking-wider font-bold text-champagne hover:text-white transition-colors mt-6 block pt-3 border-t border-white/5 font-sans"
              >
                Tìm hiểu →
              </a>
            </article>

            {/* Product 4 */}
            <article className="p-5 rounded-[12px] border border-white/10 bg-white/[0.035] hover:bg-white/[0.06] transition-all duration-365 flex flex-col justify-between min-h-[320px]">
              <div className="space-y-4">
                <span className="text-champagne text-[9px] font-bold tracking-[0.15em] uppercase block font-sans">
                  Jewelry
                </span>
                <h3 className="font-serif text-[24px] lg:text-[27px] font-medium tracking-tight leading-snug text-white">
                  Vân Mộc<br />Collection
                </h3>
                <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
                  Trang sức ngọc trai nguyên bản từ Nhật Bản, bảo chứng của độ thanh khiết và trường tồn.
                </p>
              </div>

              <a 
                href="/jewelry" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("store");
                  setProductFilter("jewelry");
                }}
                className="text-[10px] uppercase tracking-wider font-bold text-champagne hover:text-white transition-colors mt-6 block pt-3 border-t border-white/5 font-sans"
              >
                Khám phá →
              </a>
            </article>

          </div>

        </div>
      </section>

      {/* ========================================================
          06 INTERACTIVE ENGAGEMENT: AI Diary, Daily Message (Quiet design)
         ======================================================== */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-cream-light border-b border-stone-200/20" id="goc-viet-nhat-ky">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest font-bold text-forest bg-forest/5 px-4 py-1.5 rounded-full inline-block font-sans">
              Chiêm nghiệm tương tác tinh tế
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-charcoal tracking-tight">
              Góc Nhật Ký &amp; Định Tâm AI
            </h2>
            <p className="text-text-soft text-xs leading-relaxed font-sans">
              Trút bớt gánh nặng tâm tư xáo động hằng ngày và đón nhận những lời soi chiếu thâm trầm, vỗ về nhẹ nhõm từ tri kỷ AI Vân Mộc.
            </p>
          </div>

          {/* Daily Card */}
          <div className="bg-stone/80 rounded-[18px] p-6 md:p-8 border border-stone-300/10 flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between max-w-4xl mx-auto text-left">
            <div className="space-y-2 flex-1">
              <span className="text-[9px] uppercase tracking-wider font-mono text-forest font-bold block">
                Nghi thức chánh niệm sớm mai
              </span>
              <h4 className="font-serif text-xl text-charcoal font-semibold">
                Thông điệp nuôi dưỡng tâm thức
              </h4>
              <p className="text-xs text-text-soft leading-relaxed max-w-sm font-sans">
                Chạm chuông chánh niệm để đón nhận ngẫu nhiên thông điệp lắng dịu, mở lối thong dong cho hành trình hôm nay.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0 flex flex-col gap-3 min-w-[280px]">
              {dailyCard ? (
                <div className="bg-paper border border-stone-200 p-4 rounded-[12px] space-y-1.5 text-left">
                  <span className="text-[8px] font-bold text-wine bg-[#EDE2DC] uppercase tracking-wide px-2 py-0.5 rounded font-sans inline-block">
                    {dailyCard.category}
                  </span>
                  <p className="font-serif italic text-stone-900 text-xs leading-relaxed">
                    “{dailyCard.quote}”
                  </p>
                  <p className="text-[9px] text-stone-500 leading-relaxed font-sans">
                    {dailyCard.interpretation}
                  </p>
                </div>
              ) : (
                <div className="bg-cream-light border border-dashed border-stone-300/50 p-4 rounded-[12px] text-stone-400 italic text-[11px] leading-relaxed text-center font-serif">
                  “Đằng sau mọi mệt mỏi bận rộn của cuộc sống là một hiên nhà tĩnh lặng vẫn luôn đợi bạn trở về.”
                </div>
              )}

              <button
                onClick={handleDailyCardPull}
                disabled={isPullingCard}
                className="w-full py-2.5 bg-forest hover:bg-forest-deep text-white rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 font-sans shadow-none"
              >
                {isPullingCard ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Đang lắng nghe...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-champagne" />
                    <span>Rút thông điệp định tâm</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Reflection fields */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-4xl mx-auto">
            
            {/* Write Form */}
            <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[18px] border border-stone-250/20 space-y-5 text-left">
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-wider text-text-soft font-bold font-sans">
                  1. Chọn cảm xúc lúc này
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {["Bình yên", "Bất an", "Tổn thương", "Lòng hoài nghi", "Mệt mỏi", "Hy vọng"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m)}
                      className={`px-3 py-1 rounded-full text-[11px] transition-all duration-300 cursor-pointer ${
                        mood === m
                          ? "bg-forest/10 text-forest font-semibold border border-forest/30"
                          : "bg-cream-light text-stone-600 border border-stone-200/50 hover:bg-stone-100/50"
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
                <label className="block text-[10px] uppercase tracking-wider text-text-soft font-bold font-sans">
                  2. Chọn chủ đề soi chiếu
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e: any) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs rounded-[8px] border border-stone-350 focus:outline-none focus:ring-1 focus:ring-forest bg-white text-stone-700 font-sans"
                >
                  <option value="hieu_minh">Hiểu Mình — Gốc rễ của tự do đích thực</option>
                  <option value="chua_lanh">Chữa Lành — Quay về nâng niu vết thương lòng</option>
                  <option value="toa_sang">Tỏa Sáng — Khí chất độc bản sâu sắc</option>
                  <option value="nhan_tam">Rèn Luyện Nhân Tâm — Bền bỉ nâng đỡ nhân phẩm</option>
                  <option value="moi_quan_he">Mối Quan Hệ — Tấm gương soi tỏ chính mình</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-wider text-text-soft font-bold font-sans">
                  3. Thổ lộ tâm sự
                </label>
                <textarea
                  rows={4}
                  placeholder="Ghi xuống những lời trăn trở thầm kín nhất của lòng bạn hôm nay... Bạn bế tắc điều gì? Hay hạnh phúc nhỏ bé nào vừa khẽ chạm?"
                  value={journalInput}
                  onChange={(e) => setJournalInput(e.target.value)}
                  className="w-full p-4 text-xs rounded-[8px] border border-stone-350 focus:outline-none focus:ring-1 focus:ring-forest bg-cream-light/30 placeholder-stone-400 font-sans leading-relaxed text-charcoal"
                />
              </div>

              <button
                onClick={() => submitJournalReflection()}
                disabled={isAiLoading || !journalInput.trim()}
                className="w-full py-2.5 bg-forest text-white hover:bg-forest-deep rounded-full text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50 font-sans shadow-none"
              >
                {isAiLoading ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Tri kỷ đang lắng nghe thâm trầm...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Gửi gắm để soi tỏ tâm tư
                  </>
                )}
              </button>
            </div>

            {/* AI Reply Output */}
            <div className="lg:col-span-5 flex flex-col gap-5 h-full text-left">
              <div className="bg-white p-6 md:p-7 rounded-[18px] border border-stone-250/20 flex-1 flex flex-col justify-between relative overflow-hidden min-h-[260px]">
                <div className="z-10 flex-1 flex flex-col">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 mb-3.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 font-sans">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span> Tri kỷ Vân Mộc AI
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center min-h-[140px]">
                    {aiResponse ? (
                      <p className="text-xs text-stone-700 leading-relaxed italic whitespace-pre-line font-serif">
                        “{aiResponse}”
                      </p>
                    ) : (
                      <div className="text-center py-4 text-stone-400 text-[11px] italic font-serif">
                        “Khi bạn sẵn sàng trút bớt những ưu tư nặng lòng xuống, Vân Mộc AI sẽ thầm thì lời vỗ về và phản chiếu êm dịu nhất dành riêng cho bạn.”
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Entries history */}
              {journalEntries.length > 0 && (
                <div className="bg-white p-4 rounded-[12px] border border-stone-200/50 max-h-[150px] overflow-y-auto space-y-2">
                  <div className="flex justify-between items-center mb-1.5 border-b border-stone-100 pb-1">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-stone-500">Nhật ký đã gieo ({journalEntries.length})</span>
                    <button
                      onClick={() => {
                        if (confirm("Xóa lịch sử tại thiết bị này?")) saveJournalEntries([]);
                      }}
                      className="text-[8px] text-stone-400 hover:text-red-500 uppercase transition-colors"
                    >
                      Dọn dẹp
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
                      className="p-2 bg-cream-light hover:bg-forest/5 rounded-[8px] border border-stone-100 transition-colors cursor-pointer"
                    >
                      <div className="flex justify-between text-[8px] text-stone-400 font-mono">
                        <span>{entry.mood}</span>
                        <span>{entry.date.split(",")[1] || entry.date}</span>
                      </div>
                      <p className="text-[10px] text-stone-700 font-sans line-clamp-1 mt-0.5 font-medium">{entry.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ==========================================
          07 EDITORIAL: Warm White Background
         ========================================== */}
      <section className="py-16 md:py-24 px-4 md:px-8 bg-paper" id="editorial">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end text-left">
            <div className="lg:col-span-6 space-y-2">
              <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-forest font-sans block">
                From Vân Mộc
              </span>
              <h2 className="font-serif font-medium text-[36px] md:text-[40px] lg:text-[50px] tracking-tight text-charcoal leading-tight">
                Những điều<br />đang được chia sẻ.
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-text-soft text-xs md:text-sm leading-relaxed max-w-lg">
                Những tản văn thâm trầm, kinh nghiệm thực chiến đúc kết và góc nhìn dịu dàng tinh chọn từ hiên nhà Vân Mộc.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Article 1: Vườn (article-vuon.jpg) */}
            <article className="group text-left border-b border-stone-200/40 pb-6">
              <div className="aspect-[4/3] rounded-[12px] overflow-hidden relative bg-stone shrink-0">
                <img 
                  src="/images/article-vuon.jpg" 
                  alt="Bài viết Vườn Vân Mộc - Chánh niệm" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="py-4 space-y-1.5">
                <span className="text-forest text-[9px] font-bold tracking-[0.12em] uppercase font-sans block">
                  Vườn Vân Mộc
                </span>
                <h3 className="font-serif text-[22px] font-medium text-charcoal leading-snug group-hover:text-forest transition-colors">
                  Hiểu mình không chỉ là biết mình thích gì
                </h3>
                <p className="text-xs text-text-soft leading-relaxed font-sans">
                  Sự đối diện sâu sắc vượt qua lớp vỏ bọc sở thích, chạm đến nhu cầu thầm kín nhất của linh hồn.
                </p>
              </div>
            </article>

            {/* Article 2: Mộc Bản (article-mocban.jpg) */}
            <article className="group text-left border-b border-stone-200/40 pb-6">
              <div className="aspect-[4/3] rounded-[12px] overflow-hidden relative bg-stone shrink-0">
                <img 
                  src="/images/article-mocban.jpg" 
                  alt="Bài viết Mộc Bản - Sách vở thong thong" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="py-4 space-y-1.5">
                <span className="text-forest text-[9px] font-bold tracking-[0.12em] uppercase font-sans block">
                  Mộc Bản
                </span>
                <h3 className="font-serif text-[22px] font-medium text-charcoal leading-snug group-hover:text-forest transition-colors">
                  Xây một doanh nghiệp số từ điều mình biết
                </h3>
                <p className="text-xs text-text-soft leading-relaxed font-sans">
                  Ghi chép thực tế về tiến trình đóng gói tri thức cá nhân thành hệ thống kinh doanh thong thả, thăng hoa.
                </p>
              </div>
            </article>

            {/* Article 3: Jewelry (article-jewelry.jpg) */}
            <article className="group text-left border-b border-stone-200/40 pb-6">
              <div className="aspect-[4/3] rounded-[12px] overflow-hidden relative bg-stone shrink-0">
                <img 
                  src="/images/article-jewelry.jpg" 
                  alt="Bài viết Jewelry - Chi tiết ngọc trai" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="py-4 space-y-1.5">
                <span className="text-wine text-[9px] font-bold tracking-[0.12em] uppercase font-sans block">
                  Vân Mộc Jewelry
                </span>
                <h3 className="font-serif text-[22px] font-medium text-charcoal leading-snug group-hover:text-forest transition-colors">
                  Trang sức đẹp bắt đầu từ việc hiểu chất liệu
                </h3>
                <p className="text-xs text-text-soft leading-relaxed font-sans">
                  Ngọc trai tự nhiên và nghệ thuật chế tác Nhật Bản mang trong mình tần số kiêu hãnh và bình an vô cực.
                </p>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* ==========================================
          08 FINAL CTA (JOURNEY): Forest to Wine Gradient
         ========================================== */}
      <section className="py-0 px-4 md:px-8 bg-paper" id="journey">
        <div className="max-w-7xl mx-auto pb-16">
          <div className="rounded-[20px] bg-gradient-to-br from-forest via-[#46503A] to-wine text-white p-8 md:p-14 text-center space-y-5 relative overflow-hidden shadow-none">
            
            <span className="text-champagne text-[11px] font-bold uppercase tracking-[0.18em] block">
              Start Your Journey
            </span>

            <h2 className="font-serif font-medium text-[34px] md:text-[38px] lg:text-[50px] leading-tight text-white tracking-tight">
              Bạn muốn bắt đầu<br />từ đâu?
            </h2>

            <p className="text-stone-300 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
              Hãy bước vào cánh cửa phù hợp nhất với giai đoạn hiện tại của cuộc sống bạn. Vân Mộc luôn đón chào bạn thong dong gieo bước.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-5 max-w-2xl mx-auto">
              <a 
                href="/vuon" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("thu_vien_tri_thuc");
                }}
                className="min-h-[44px] px-6 rounded-full border border-white/20 hover:border-white text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-forest"
              >
                Hiểu mình
              </a>
              <a 
                href="/moc-ban" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("ho_so_phat_trien");
                  setHoSoActiveSubTab("dashboard");
                }}
                className="min-h-[44px] px-6 rounded-full border border-white/20 hover:border-white text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-forest"
              >
                Xây năng lực
              </a>
              <a 
                href="/academy/makeup" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("store");
                  setProductFilter("course");
                }}
                className="min-h-[44px] px-6 rounded-full border border-white/20 hover:border-white text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-forest"
              >
                Làm đẹp
              </a>
              <a 
                href="/jewelry" 
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("store");
                  setProductFilter("jewelry");
                }}
                className="min-h-[44px] px-6 rounded-full border border-white/20 hover:border-white text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:bg-white hover:text-forest"
              >
                Trang sức &amp; Phong cách
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
