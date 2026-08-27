import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Eye,
  Heart,
  Sparkles,
  BookOpen,
  ChevronRight,
  ChevronDown,
  Send,
  Sparkle,
  ShoppingBag,
  HelpCircle,
  Clock,
  RotateCcw,
  Plus,
  Minus,
  Check,
  X,
  MessageCircle,
  Compass,
  Menu,
  Download,
  QrCode,
  Settings,
  CreditCard,
  Copy,
  Info,
  Lock,
  Trash2,
  User,
  Phone,
  MapPin,
  FileText,
  Mail
} from "lucide-react";
import { JournalEntry, CompanionMessage, DailyCard, JourneyStepId } from "./types";
import JourneyTab from "./components/JourneyTab";
import { EbookReader } from "./components/EbookReader";
import { HomepageView } from "./components/HomepageView";
import {
  VanMocMethodView,
  ThuVienTriThucView,
  BanDoPhatTrienView,
  CoachingView,
  WorkshopView,
  AcademyView,
  ResearchView,
  AboutView,
  ContactView,
  HoSoPhatTrienView,
  AICoachView
} from "./components/NavigationViews";

export default function App() {
  // Global states
  const [activeTab, setActiveTab] = useState<
    | "home"
    | "van_moc_method"
    | "thu_vien_tri_thuc"
    | "ban_do_phat_trien"
    | "coaching"
    | "workshop"
    | "academy"
    | "store"
    | "research"
    | "about"
    | "contact"
    | "ho_so_phat_trien"
    | "ai_coach"
  >("home");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [dailyCard, setDailyCard] = useState<DailyCard | null>(null);
  const [isPullingCard, setIsPullingCard] = useState(false);
  const [cart, setCart] = useState<{ id: string; name: string; price: number; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // AI Chat and Journal state
  const [journalInput, setJournalInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"hieu_minh" | "chua_lanh" | "toa_sang" | "nhan_tam" | "moi_quan_he" | "goc_nhin_cuoc_song" | "chung">("hieu_minh");
  const [mood, setMood] = useState("Bình yên");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [hoSoActiveSubTab, setHoSoActiveSubTab] = useState<string>("dashboard");
  
  // Interactive Product states
  const [selectedProductForAffirmation, setSelectedProductForAffirmation] = useState<any | null>(null);
  const [userMoodForAffirmation, setUserMoodForAffirmation] = useState("");
  const [generatedAffirmation, setGeneratedAffirmation] = useState("");
  const [isGeneratingAffirmation, setIsGeneratingAffirmation] = useState(false);
  const [productFilter, setProductFilter] = useState<"all" | "vong_da" | "tinh_the" | "ngoc_trai" | "jewelry">("all");

  // Checkout, QR Payment & Order States
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [partnerCode, setPartnerCode] = useState("Đăng ký trực tiếp (Không có Partner)");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"details" | "payment">("details");
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [isEbookCheckout, setIsEbookCheckout] = useState(false);
  const [ebookPrice, setEbookPrice] = useState(99000);
  const [isEbookReaderOpen, setIsEbookReaderOpen] = useState(false);
  const [isEbookUnlocked, setIsEbookUnlocked] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState("");

  // Payment configuration (customizable by owner, stored in localStorage)
  const [paymentConfig, setPaymentConfig] = useState({
    bankId: "mbbank",
    bankAccountNo: "0938123456",
    bankAccountName: "NGUYEN THI MY LINH",
  });

  // Saved Orders state for owner's admin dashboard (accessible in footer)
  const [orders, setOrders] = useState<any[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminSavedPassword, setAdminSavedPassword] = useState("vanmoc2026");
  const [newAdminPasswordInput, setNewAdminPasswordInput] = useState("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [editPaymentConfig, setEditPaymentConfig] = useState({
    bankId: "mbbank",
    bankAccountNo: "0938123456",
    bankAccountName: "NGUYEN THI MY LINH",
  });

  // Bottom Payment Registration Form States
  const [bottomRegName, setBottomRegName] = useState("");
  const [bottomRegEmail, setBottomRegEmail] = useState("");
  const [bottomRegPhone, setBottomRegPhone] = useState("");
  const [bottomRegAmount, setBottomRegAmount] = useState("99000"); // Default gieo duyên 99K
  const [bottomRegItemName, setBottomRegItemName] = useState("Sách Vân Mộc - Thức Tỉnh Nội Tâm");
  const [bottomRegNote, setBottomRegNote] = useState("");
  const [bottomRegShowQr, setBottomRegShowQr] = useState(false);
  const [bottomRegIsSubmitting, setBottomRegIsSubmitting] = useState(false);
  const [bottomRegSuccess, setBottomRegSuccess] = useState(false);
  const [bottomRegCreatedOrderId, setBottomRegCreatedOrderId] = useState("");
  const [bottomRegShowSuccessScreen, setBottomRegShowSuccessScreen] = useState(false);
  const [isBottomRegOpen, setIsBottomRegOpen] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  const handleDownloadZip = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isDownloadingZip) return;
    setIsDownloadingZip(true);
    
    try {
      const response = await fetch('/api/download-zip');
      if (!response.ok) {
        throw new Error('Không thể tạo hoặc tải file ZIP từ máy chủ');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'du_an_van_moc.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Lỗi khi tải file ZIP:', error);
      alert('Không thể tải file ZIP trực tiếp. Hãy thử mở ứng dụng trong một tab mới hoặc liên hệ quản trị viên.');
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const handleBottomRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bottomRegName.trim() || !bottomRegPhone.trim()) {
      alert("Vui lòng điền đầy đủ Họ tên và Số điện thoại.");
      return;
    }
    setBottomRegIsSubmitting(true);
    setTimeout(() => {
      const orderId = "VM-" + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        id: orderId,
        date: new Date().toLocaleString("vi-VN"),
        customerName: bottomRegName,
        customerPhone: bottomRegPhone,
        customerAddress: bottomRegEmail || "Không cung cấp email",
        customerNote: `[Đăng ký trực tiếp]: ${bottomRegItemName}`,
        items: [{ id: "direct_reg", name: bottomRegItemName, quantity: 1 }],
        totalPrice: Number(bottomRegAmount) || 99000,
        status: "pending",
      };
      saveOrders([newOrder, ...orders]);
      setBottomRegCreatedOrderId(orderId);
      setBottomRegIsSubmitting(false);
      setBottomRegSuccess(true);
      setBottomRegShowQr(true);
    }, 1000);
  };

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load state from local storage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("van_moc_journal_entries");
    if (savedEntries) {
      try {
        setJournalEntries(JSON.parse(savedEntries));
      } catch (e) {
        console.error(e);
      }
    }
    
    const savedCart = localStorage.getItem("van_moc_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }

    const savedPaymentConfig = localStorage.getItem("van_moc_payment_config");
    if (savedPaymentConfig) {
      try {
        const parsed = JSON.parse(savedPaymentConfig);
        setPaymentConfig(parsed);
        setEditPaymentConfig(parsed);
      } catch (e) {
        console.error(e);
      }
    }

    const savedOrders = localStorage.getItem("van_moc_orders");
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error(e);
      }
    }

    const savedAdminPass = localStorage.getItem("van_moc_admin_password");
    if (savedAdminPass) {
      setAdminSavedPassword(savedAdminPass);
    }

    const savedEbookUnlocked = localStorage.getItem("van_moc_ebook_unlocked");
    if (savedEbookUnlocked === "true") {
      setIsEbookUnlocked(true);
    }

    // Pull initial card
    pullDailyCard();

    const handleStorageChange = () => {
      const savedEntries = localStorage.getItem("van_moc_journal_entries");
      if (savedEntries) {
        try {
          setJournalEntries(JSON.parse(savedEntries));
        } catch (e) {}
      }
      const savedUnlocked = localStorage.getItem("van_moc_ebook_unlocked");
      if (savedUnlocked === "true") {
        setIsEbookUnlocked(true);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Save to local storage
  const saveJournalEntries = (newEntries: JournalEntry[]) => {
    setJournalEntries(newEntries);
    localStorage.setItem("van_moc_journal_entries", JSON.stringify(newEntries));
  };

  const saveCart = (newCart: typeof cart) => {
    setCart(newCart);
    localStorage.setItem("van_moc_cart", JSON.stringify(newCart));
  };

  const savePaymentConfig = (config: typeof paymentConfig) => {
    setPaymentConfig(config);
    localStorage.setItem("van_moc_payment_config", JSON.stringify(config));
  };

  const saveOrders = (newOrders: any[]) => {
    setOrders(newOrders);
    localStorage.setItem("van_moc_orders", JSON.stringify(newOrders));
  };

  // Pulling daily card
  const pullDailyCard = async () => {
    setIsPullingCard(true);
    try {
      const res = await fetch("/api/cards/daily");
      if (res.ok) {
        const cards = await res.json();
        if (cards && cards.length > 0) {
          // Select random card
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

  // Products dataset with editorial descriptions
  const products = [
    {
      id: "prod_1",
      name: "Vòng Đá Tự Nhiên",
      category: "vong_da",
      price: 0,
      image: "📿",
      material: "Đá tự nhiên tuyển chọn tinh tế",
      description: "Chiếc vòng mang trường năng lượng tĩnh lặng, giúp cân bằng tâm trí, thu hút bình an và vững vàng trước giông bão cuộc đời.",
      ritual: "Mỗi sáng khi thức dậy, hãy áp vòng đá vào luân xa tim, hít sâu 3 nhịp và thầm nhủ: 'Tôi đón nhận dòng chảy năng lượng dịu lành của vũ trụ'.",
    },
    {
      id: "prod_2_dzi",
      name: "Dzi Thiên Châu",
      category: "tinh_the",
      price: 0,
      image: "🧿",
      material: "Đá Mã Não tự nhiên mang hoa văn thiên nhãn cổ xưa kỳ bí",
      description: "Pháp bảo tâm linh tối cao mang trường năng lượng bảo hộ mạnh mẽ. Giúp xua tan uế khí, gia hộ bình an, thông tuệ tâm trí và khai mở trực giác nhạy bén.",
      ritual: "Cầm Dzi thiên châu trong lòng bàn tay khi thiền định, quán tưởng ánh sáng vàng ấm áp bao bọc lấy cơ thể và tâm trí.",
    },
    {
      id: "prod_3_ngoc_trai",
      name: "Ngọc Trai Tự Nhiên",
      category: "ngoc_trai",
      price: 0,
      image: "🦪",
      material: "Ngọc trai nuôi cấy tự nhiên nước ngọt/mặn tuyển chọn",
      description: "Biểu tượng của sự thanh khiết, kiêu hãnh và chuyển hóa nội tâm sâu sắc. Ngọc trai giúp nuôi dưỡng năng lượng nữ tính dịu dàng, tăng trưởng sự kiên nhẫn và lòng bao dung.",
      ritual: "Đeo ngọc trai sát da thịt, cảm nhận sự mát lành và nhắc nhở bản thân về tiến trình chuyển hóa hạt cát đau thương thành đóa ngọc quý giá.",
    },
    {
      id: "prod_4_jewelry",
      name: "Trang Sức Jewelry Tâm Hồn",
      category: "jewelry",
      price: 0,
      image: "💎",
      material: "Bạc S925 tinh khiết đính đá năng lượng tự nhiên",
      description: "Những thiết kế trang sức tinh xảo, giao thoa giữa nghệ thuật chế tác hiện đại và triết lý tâm linh sâu sắc. Tôn vinh vẻ đẹp độc bản bên ngoài lẫn sự thông tuệ bên trong.",
      ritual: "Trước khi đeo trang sức, hãy dành một phút lắng đọng gửi gắm tâm nguyện bình an, coi món đồ như một chiếc mỏ neo chánh niệm hằng ngày.",
    },
    {
      id: "course_makeup_ca_nhan",
      name: "Khóa Học Makeup Cá Nhân",
      category: "course",
      price: 0,
      image: "💄",
      material: "Khóa học thực hành Online & Elearning",
      description: "Đồng hành rèn luyện phong thái sống thong dong, rèn rực rỡ khí sắc, phối màu phấn nền tự nhiên và làm nổi bật những nét đẹp thanh tú vốn có trên gương mặt bạn.",
      ritual: "Hãy coi mỗi buổi makeup là một nghi thức trân trọng cơ thể và nuôi dưỡng lòng tự tin rạng rỡ của chính mình.",
    },
    {
      id: "course_skincare_ca_nhan",
      name: "Khóa Học Hiểu & Chăm Sóc Làn Da Của Mình",
      category: "course",
      price: 0,
      image: "🌸",
      material: "Khóa học thực hành Online & Chuyên gia đồng hành",
      description: "Thấu hiểu loại da, các bước chăm sóc bài bản khoa học, thiết lập quy trình nuôi dưỡng từ gốc để sở hữu làn da khỏe mạnh, mộc mạc mà tràn đầy sức sống.",
      ritual: "Mỗi tối khi thoa dưỡng chất, hãy vỗ nhẹ làn da với sự trân trọng và thầm cảm ơn cơ thể đã luôn đồng hành cùng bạn.",
    }
  ];

  // Cart operations
  const addToCart = (product: any) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      saveCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      saveCart([...cart, { id: product.id, name: product.name, price: product.price, quantity: 1 }]);
    }
    // Show cart modal/drawer
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.id === id) {
          const newQ = item.quantity + delta;
          return { ...item, quantity: newQ };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);
    saveCart(updated);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Handle start of checkout
  const handleStartCheckout = () => {
    setIsCartOpen(false);
    handleOpenEbookCheckout(
      totalCartPrice,
      `Vật phẩm Nghi thức: ${cart.map(item => `${item.name} (x${item.quantity})`).join(", ")}`
    );
  };

  // Handle start of ebook checkout specifically (updated to scroll and populate the bottom form)
  const handleOpenEbookCheckout = (amount: any = 99000, name: string = "Sách Ebook Vân Mộc - Thức Tỉnh Nội Tâm") => {
    setIsCartOpen(false);
    setIsCheckoutOpen(false);
    setIsBottomRegOpen(true);
    
    let finalAmount = 99000;
    let finalName = typeof name === "string" ? name : "Sách Ebook Vân Mộc - Thức Tỉnh Nội Tâm";

    // Guard against React Event objects being passed when used directly as an onClick handler
    if (amount && (typeof amount === "object" || typeof amount === "function")) {
      finalAmount = 99000;
      finalName = "Sách Ebook Vân Mộc - Thức Tỉnh Nội Tâm";
    } else if (typeof amount === "number") {
      finalAmount = amount;
    } else if (typeof amount === "string") {
      const parsed = parseInt(amount, 10);
      if (!isNaN(parsed)) {
        finalAmount = parsed;
      }
    }

    setBottomRegAmount(finalAmount.toString());
    setBottomRegItemName(finalName);
    setBottomRegSuccess(false);
    setBottomRegShowQr(false);
    setBottomRegShowSuccessScreen(false);

    // Auto-populate customer fields if any have been set
    if (customerName) setBottomRegName(customerName);
    if (customerPhone) setBottomRegPhone(customerPhone);
    if (customerEmail) setBottomRegEmail(customerEmail);

    // Scroll to the #dang-ky-thanh-toan section
    setTimeout(() => {
      const element = document.getElementById("dang-ky-thanh-toan");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // Handle place order (creates checkout session & QR)
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEbookCheckout) {
      if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
        alert("Vui lòng điền đầy đủ các thông tin bắt buộc: Họ tên, Số điện thoại và Email.");
        return;
      }
    } else {
      if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
        alert("Vui lòng điền đầy đủ các thông tin bắt buộc: Họ tên, Số điện thoại và Địa chỉ.");
        return;
      }
    }
    
    // Create unique order ID and store it
    const orderId = `ord_${Date.now()}`;
    setCurrentOrderId(orderId);
    
    setIsCreatingOrder(true);

    try {
      const itemsDescription = isEbookCheckout 
        ? "Ebook Hiểu Mình, Chữa Lành, Tỏa Sáng x 1"
        : cart.map(item => `${item.name} x ${item.quantity}`).join(", ");
        
      const orderData = {
        id: orderId,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || "N/A",
        customerAddress: isEbookCheckout ? "Nhận qua Email (Ebook)" : customerAddress.trim(),
        customerNote: isEbookCheckout ? "Tải Ebook Hiểu Mình Chữa Lành Tỏa Sáng" : customerNote.trim() || "N/A",
        partnerCode: isEbookCheckout ? "Trực tiếp" : partnerCode.trim(),
        itemsDescription,
        totalPrice: isEbookCheckout ? ebookPrice : totalCartPrice,
        date: new Date().toLocaleString("vi-VN")
      };

      await fetch("/api/sheets/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
      });
    } catch (err) {
      console.error("Error saving to Google Sheets:", err);
    }
    
    setIsCreatingOrder(false);
    
    // Check if free or contact-based order (price is 0)
    const currentPrice = isEbookCheckout ? ebookPrice : totalCartPrice;
    if (currentPrice === 0) {
      const newOrder = {
        id: orderId,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim(),
        customerAddress: customerAddress.trim(),
        customerNote: customerNote.trim(),
        partnerCode: partnerCode.trim(),
        items: [...cart],
        totalPrice: 0,
        date: new Date().toLocaleString("vi-VN"),
        status: "free_registration"
      };

      const updatedOrders = [newOrder, ...orders];
      saveOrders(updatedOrders);
      clearCart();
      setOrderSuccess(true);
      
      // Auto redirect to Zalo Group Link
      try {
        window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank");
      } catch (e) {
        console.error("Popup blocked or failed to redirect: ", e);
      }
      return;
    }

    setShowQr(true);
  };

  // Handle final confirmation of order placement after scanning QR
  const handleConfirmTransfer = async () => {
    const orderId = currentOrderId || `ord_${Date.now()}`;

    const newOrder = {
      id: orderId,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      customerAddress: isEbookCheckout ? "Nhận qua Email (Ebook)" : customerAddress.trim(),
      customerNote: isEbookCheckout ? "Tải Ebook Hiểu Mình Chữa Lành Tỏa Sáng" : customerNote.trim(),
      partnerCode: isEbookCheckout ? "Trực tiếp" : partnerCode.trim(),
      items: isEbookCheckout ? [{ id: "ebook_1", name: "Ebook Hiểu Mình, Chữa Lành, Tỏa Sáng", price: ebookPrice, quantity: 1 }] : [...cart],
      totalPrice: isEbookCheckout ? ebookPrice : totalCartPrice,
      date: new Date().toLocaleString("vi-VN"),
      status: "paid" // Confirm payment
    };

    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);

    // Call backend to update Google Sheet to paid
    try {
      await fetch("/api/sheets/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerPhone: customerPhone.trim(),
          customerEmail: customerEmail.trim(),
          status: "paid"
        })
      });
    } catch (err) {
      console.error("Error confirming payment in Google Sheets:", err);
    }

    if (isEbookCheckout) {
      setIsEbookUnlocked(true);
      localStorage.setItem("van_moc_ebook_unlocked", "true");
    }

    setOrderSuccess(true);

    // Auto redirect to Zalo Group Link as requested
    try {
      window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank");
    } catch (e) {
      console.error("Popup blocked or failed to redirect: ", e);
    }
  };

  // Handle reporting Zalo group joined status to sheets
  const handleJoinZalo = async () => {
    try {
      await fetch("/api/sheets/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerPhone: customerPhone.trim(),
          customerEmail: customerEmail.trim(),
          status: "joined zalo"
        })
      });
    } catch (err) {
      console.error("Error updating Zalo join status in Google Sheets:", err);
    }
  };

  // Clear checkout form and close it
  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
    if (orderSuccess) {
      if (!isEbookCheckout) {
        clearCart();
      }
      setCustomerName("");
      setCustomerPhone("");
      setCustomerEmail("");
      setCustomerAddress("");
      setCustomerNote("");
      setPartnerCode("Đăng ký trực tiếp (Không có Partner)");
      setOrderSuccess(false);
      setCheckoutStep("details");
      setShowQr(false);
      setIsCreatingOrder(false);
      setIsEbookCheckout(false);
    }
  };

  // Submit journal reflection with Gemini AI
  const submitJournalReflection = async (customPrompt?: string, customCategory?: any) => {
    const promptToSend = customPrompt || journalInput;
    const catToSend = customCategory || selectedCategory;

    if (!promptToSend.trim()) return;

    setIsAiLoading(true);
    setAiResponse("");

    // Setup temporary entry before AI response
    const tempUserMessage: CompanionMessage = {
      id: `user_${Date.now()}`,
      role: "user",
      content: promptToSend,
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };

    try {
      const response = await fetch("/api/gemini/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptToSend,
          context: catToSend,
          journalHistory: journalEntries.slice(-4).map(e => ({
            role: "user",
            content: e.content
          }))
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAiResponse(data.text);
        
        // Save to journal history
        const newEntry: JournalEntry = {
          id: `entry_${Date.now()}`,
          date: new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
          title: promptToSend.substring(0, 35) + (promptToSend.length > 35 ? "..." : ""),
          content: promptToSend,
          mood: mood,
          category: catToSend,
          aiReply: data.text,
          createdAt: Date.now(),
        };
        saveJournalEntries([newEntry, ...journalEntries]);
        
        // If not already in journal tab, navigate there or scroll
        if (!customPrompt) {
          setJournalInput("");
        }
      } else {
        setAiResponse(data.error || "Có lỗi xảy ra khi Vân Mộc lắng nghe bạn.");
      }
    } catch (err) {
      console.error("AI Reflection error:", err);
      setAiResponse("Không thể kết nối với Vân Mộc. Hãy hít một hơi thật sâu và thử lại sau ít phút bình lặng.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Generate personalized affirmation for product using Gemini
  const generateProductAffirmation = async () => {
    if (!selectedProductForAffirmation || !userMoodForAffirmation.trim()) return;
    
    setIsGeneratingAffirmation(true);
    setGeneratedAffirmation("");

    try {
      const promptText = `Tôi đang cảm thấy "${userMoodForAffirmation}". Tôi muốn kết hợp cảm xúc này với sản phẩm "${selectedProductForAffirmation.name}" (Làm từ: ${selectedProductForAffirmation.material}). Hãy tạo cho tôi một câu khẳng định tích cực ngắn gọn và một nghi thức tự chăm sóc bản thân khoảng 3 dòng sâu sắc, dịu dàng để neo giữ năng lượng bình yên này.`;
      
      const response = await fetch("/api/gemini/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          context: "toa_sang",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setGeneratedAffirmation(data.text);
      } else {
        setGeneratedAffirmation("Vân Mộc mong bạn luôn tin vào ánh sáng dịu lành bên trong mình.");
      }
    } catch (err) {
      console.error(err);
      setGeneratedAffirmation("Chúc bạn một ngày thong dong, ôm ấp lấy mọi xúc cảm đang hiển hiện.");
    } finally {
      setIsGeneratingAffirmation(false);
    }
  };

  // Handle preset prompts from Tab component
  const handleSelectPromptFromTabs = (prompt: string, category: JourneyStepId) => {
    setJournalInput(prompt);
    setSelectedCategory(category);
    // Scroll to writing section
    const writingSec = document.getElementById("goc-viet-nhat-ky");
    if (writingSec) {
      writingSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredProducts = productFilter === "all" 
    ? products 
    : products.filter(p => p.category === productFilter);

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans flex flex-col selection:bg-olive/10 selection:text-olive">
      {/* Top Banner Accent */}
      <div className="bg-olive text-ivory-light text-[11px] py-2.5 px-4 tracking-wide uppercase font-medium flex justify-between items-center z-40 border-b border-olive-dark">
        <div className="flex items-center gap-1.5">
          <Sparkle className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
          <span>Vân Mộc: Không gian phản chiếu nội tâm sâu sắc</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Clock className="w-3 h-3 text-stone-300" />
          <span>Kỷ Nguyên Tỉnh Thức — {new Date().toLocaleDateString("vi-VN")}</span>
        </div>
      </div>



      {/* Header Editorial Navigation */}
      <header id="editorial-header" className="w-full border-b border-border-custom bg-ivory relative z-40">
        {/* Desktop Header Layout (lg and above) */}
        <div className="hidden lg:flex flex-col px-12 pt-8 pb-5 max-w-7xl mx-auto w-full">
          {/* Row 1: Brand Identity & Elegant CTA Actions */}
          <div className="flex flex-row justify-between items-center w-full pb-6 border-b border-border-custom">
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-olive mb-1">Vân Mộc Edition</span>
              <button onClick={() => setActiveTab("home")} className="text-left cursor-pointer group">
                <h1 className="text-4.5xl font-serif tracking-tighter font-bold text-charcoal hover:text-olive transition-colors leading-none">
                  Vân Mộc<span className="text-olive group-hover:translate-x-1 inline-block transition-transform font-serif font-normal">.</span>
                </h1>
              </button>
              <p className="text-[11px] text-stone-500 italic mt-1.5">Hệ Thống Phát Triển Con Người</p>
            </div>

            <div className="flex items-center gap-4.5">
              <button
                onClick={() => setIsEbookReaderOpen(true)}
                className="px-4.5 py-2.5 rounded-full border border-[#5A5A40]/30 text-[#5A5A40] hover:bg-[#5A5A40]/5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isEbookUnlocked ? "Đọc Ebook" : "Đọc Thử"}</span>
              </button>

              <button
                id="header-ebook-trigger"
                onClick={handleOpenEbookCheckout}
                className="px-4.5 py-2.5 rounded-full bg-[#5A5A40] text-white hover:bg-[#484833] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Ebook</span>
              </button>

              <button
                id="cart-trigger"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full border border-[#2C2C2C]/10 bg-white hover:bg-[#5A5A40] hover:text-white transition-all duration-300 cursor-pointer"
                title="Nghi thức Chăm sóc của tôi"
              >
                <ShoppingBag className="w-4 h-4" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-[#F7F5F0] text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center animate-bounce">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
              
              <div className="text-right border-l border-stone-200 pl-4.5">
                <div className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40]">Hành trình Độc bản</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-widest font-mono mt-0.5">Tâm tại hiên nhà</div>
              </div>
            </div>
          </div>

          {/* Row 2: Symmetric, Well-Spaced, Centered Navigation Bar */}
          <nav className="w-full mt-4 flex justify-center">
            <div className="flex flex-row justify-center items-center gap-x-1.5 xl:gap-x-3.5 bg-stone-100/50 p-1.5 rounded-2xl border border-stone-200/40">
              <button
                onClick={() => setActiveTab("home")}
                className={`text-[11px] uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer text-center px-4.5 py-2 rounded-xl flex flex-col items-center justify-center ${
                  activeTab === "home" 
                    ? "bg-[#5A5A40] text-[#F7F5F0] shadow-md border border-[#5A5A40]" 
                    : "border border-transparent text-stone-600 hover:text-stone-900 hover:bg-[#5A5A40]/5"
                }`}
              >
                <span>Home</span>
                <span className={`block text-[8px] font-normal lowercase italic normal-case tracking-normal mt-0.5 ${
                  activeTab === "home" ? "text-amber-100/90" : "text-stone-400"
                }`}>(Trang chủ)</span>
              </button>

              <button
                onClick={() => setActiveTab("about")}
                className={`text-[11px] uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer text-center px-4.5 py-2 rounded-xl flex flex-col items-center justify-center ${
                  activeTab === "about" 
                    ? "bg-[#5A5A40] text-[#F7F5F0] shadow-md border border-[#5A5A40]" 
                    : "border border-transparent text-stone-600 hover:text-stone-900 hover:bg-[#5A5A40]/5"
                }`}
              >
                <span>About</span>
                <span className={`block text-[8px] font-normal lowercase italic normal-case tracking-normal mt-0.5 ${
                  activeTab === "about" ? "text-amber-100/90" : "text-stone-400"
                }`}>(Về Vân Mộc)</span>
              </button>

              <button
                onClick={() => setActiveTab("thu_vien_tri_thuc")}
                className={`text-[11px] uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer text-center px-4.5 py-2 rounded-xl flex flex-col items-center justify-center ${
                  activeTab === "thu_vien_tri_thuc" 
                    ? "bg-[#5A5A40] text-[#F7F5F0] shadow-md border border-[#5A5A40]" 
                    : "border border-transparent text-stone-600 hover:text-stone-900 hover:bg-[#5A5A40]/5"
                }`}
              >
                <span>Knowledge</span>
                <span className={`block text-[8px] font-normal lowercase italic normal-case tracking-normal mt-0.5 ${
                  activeTab === "thu_vien_tri_thuc" ? "text-amber-100/90" : "text-stone-400"
                }`}>(Tri thức)</span>
              </button>

              {/* Hồ sơ Phát triển Con người dropdown */}
              <div className="relative group/hoso">
                <button
                  onClick={() => {
                    setActiveTab("ho_so_phat_trien");
                    setHoSoActiveSubTab("dashboard");
                  }}
                  className={`text-[11px] uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center px-4.5 py-2 rounded-xl ${
                    activeTab === "ho_so_phat_trien" 
                      ? "bg-[#5A5A40] text-[#F7F5F0] shadow-md border border-[#5A5A40]" 
                      : "border border-transparent text-stone-600 hover:text-stone-900 hover:bg-[#5A5A40]/5"
                  }`}
                >
                  <div className="flex items-center gap-1 justify-center w-full">
                    <span>Human Profile</span>
                    <span className={`text-[7px] ${activeTab === "ho_so_phat_trien" ? "text-amber-100/90" : "text-stone-400"} opacity-75`}>▼</span>
                  </div>
                  <span className={`block text-[8px] font-normal lowercase italic normal-case tracking-normal mt-0.5 ${
                    activeTab === "ho_so_phat_trien" ? "text-amber-100/90" : "text-stone-400"
                  }`}>(Hồ sơ Phát triển)</span>
                </button>

                {/* Submenu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#F7F5F0] border border-stone-250 rounded-2xl shadow-2xl py-3.5 px-4.5 w-[460px] grid grid-cols-2 gap-2 opacity-0 invisible group-hover/hoso:opacity-100 group-hover/hoso:visible transition-all duration-300 z-50">
                  <div className="col-span-2 text-[9px] uppercase tracking-widest font-bold text-stone-400 border-b border-stone-200 pb-1.5 mb-1 flex items-center justify-between">
                    <span>Hệ thống VM-HOS</span>
                    <span className="text-[8px] bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded font-semibold font-mono">LIVE</span>
                  </div>
                  {[
                    { id: "dashboard", label: "Dashboard", desc: "Tổng quan tiến trình" },
                    { id: "foundation", label: "Foundation", desc: "Nền tảng vững vàng" },
                    { id: "identity", label: "Identity", desc: "Bản sắc cá nhân" },
                    { id: "energy", label: "Energy", desc: "Nguồn năng lượng" },
                    { id: "mind", label: "Mind", desc: "Tâm trí sáng suốt" },
                    { id: "emotion", label: "Emotion", desc: "Cảm xúc cân bằng" },
                    { id: "habit", label: "Habit", desc: "Thói quen lành mạnh" },
                    { id: "relationship", label: "Relationship", desc: "Mối quan hệ thiêng" },
                    { id: "purpose", label: "Purpose", desc: "Mục đích tối thượng" },
                    { id: "human_map", label: "Human Map", desc: "Bản đồ sinh học" },
                    { id: "ai_report", label: "AI Report", desc: "Báo cáo khai vấn" },
                    { id: "timeline", label: "Timeline", desc: "Nhật ký tiến trình" }
                  ].map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setActiveTab("ho_so_phat_trien");
                        setHoSoActiveSubTab(sub.id);
                      }}
                      className={`text-left p-1.5 rounded-lg hover:bg-[#5A5A40]/5 transition-all cursor-pointer ${
                        activeTab === "ho_so_phat_trien" && hoSoActiveSubTab === sub.id ? "bg-[#5A5A40]/10 border border-[#5A5A40]/30" : "border border-transparent"
                      }`}
                    >
                      <div className="text-[10px] font-bold text-stone-850 leading-tight">{sub.label}</div>
                      <div className="text-[8.5px] text-[#5A5A40] italic truncate leading-none mt-0.5 font-medium">{sub.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveTab("coaching")}
                className={`text-[11px] uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer text-center px-4.5 py-2 rounded-xl flex flex-col items-center justify-center ${
                  activeTab === "coaching" 
                    ? "bg-[#5A5A40] text-[#F7F5F0] shadow-md border border-[#5A5A40]" 
                    : "border border-transparent text-stone-600 hover:text-stone-900 hover:bg-[#5A5A40]/5"
                }`}
              >
                <span>Coaching</span>
                <span className={`block text-[8px] font-normal lowercase italic normal-case tracking-normal mt-0.5 ${
                  activeTab === "coaching" ? "text-amber-100/90" : "text-stone-400"
                }`}>(Đồng hành 1:1)</span>
              </button>

              <button
                onClick={() => setActiveTab("workshop")}
                className={`text-[11px] uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer text-center px-4.5 py-2 rounded-xl flex flex-col items-center justify-center ${
                  activeTab === "workshop" 
                    ? "bg-[#5A5A40] text-[#F7F5F0] shadow-md border border-[#5A5A40]" 
                    : "border border-transparent text-stone-600 hover:text-stone-900 hover:bg-[#5A5A40]/5"
                }`}
              >
                <span>Workshop</span>
                <span className={`block text-[8px] font-normal lowercase italic normal-case tracking-normal mt-0.5 ${
                  activeTab === "workshop" ? "text-amber-100/90" : "text-stone-400"
                }`}>(Workshop)</span>
              </button>

              <button
                onClick={() => setActiveTab("academy")}
                className={`text-[11px] uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer text-center px-4.5 py-2 rounded-xl flex flex-col items-center justify-center ${
                  activeTab === "academy" 
                    ? "bg-[#5A5A40] text-[#F7F5F0] shadow-md border border-[#5A5A40]" 
                    : "border border-transparent text-stone-600 hover:text-stone-900 hover:bg-[#5A5A40]/5"
                }`}
              >
                <span>Library</span>
                <span className={`block text-[8px] font-normal lowercase italic normal-case tracking-normal mt-0.5 ${
                  activeTab === "academy" ? "text-amber-100/90" : "text-stone-400"
                }`}>(Thư viện)</span>
              </button>

              <button
                onClick={() => setActiveTab("store")}
                className={`text-[11px] uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer text-center px-4.5 py-2 rounded-xl flex flex-col items-center justify-center ${
                  activeTab === "store" 
                    ? "bg-[#5A5A40] text-[#F7F5F0] shadow-md border border-[#5A5A40]" 
                    : "border border-transparent text-stone-600 hover:text-stone-900 hover:bg-[#5A5A40]/5"
                }`}
              >
                <span>Store</span>
                <span className={`block text-[8px] font-normal lowercase italic normal-case tracking-normal mt-0.5 ${
                  activeTab === "store" ? "text-amber-100/90" : "text-stone-400"
                }`}>(Cửa hàng)</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile & Tablet Header Layout (under lg) */}
        <div className="lg:hidden flex flex-row justify-between items-center px-6 py-5 w-full">
          {/* Left: Menu button */}
          <button
            id="mobile-menu-trigger"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2C2C2C]/10 bg-white/85 active:bg-[#5A5A40]/10 transition-colors shadow-sm"
          >
            <Menu className="w-4 h-4 text-[#5A5A40]" />
            <span className="text-[10px] uppercase tracking-wide font-semibold text-stone-700">Menu</span>
          </button>

          {/* Center: Brand Logo */}
          <div className="flex flex-col items-center">
            <button onClick={() => setActiveTab("home")} className="text-center focus:outline-none cursor-pointer">
              <h1 className="text-3.5xl font-serif tracking-tighter font-bold text-[#2C2C2C] flex items-center justify-center gap-0.5 leading-none">
                Vân Mộc<span className="text-[#5A5A40] font-serif font-normal">.</span>
              </h1>
            </button>
            <span className="text-[9px] uppercase tracking-widest text-[#5A5A40] font-semibold mt-1">Edition</span>
          </div>

          {/* Right: Cart Button */}
          <button
            id="mobile-cart-trigger"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full border border-[#2C2C2C]/10 bg-white active:bg-[#5A5A40] active:text-white transition-all shadow-sm"
            title="Nghi thức Chăm sóc của tôi"
          >
            <ShoppingBag className="w-4 h-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-[#F7F5F0] text-[9px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Mobile & Tablet Drawer Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50"
              />

              {/* Menu Container */}
              <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ type: "spring", bounce: 0.05, duration: 0.5 }}
                className="fixed top-0 left-0 right-0 bg-[#F7F5F0] border-b border-[#5A5A40] shadow-2xl z-50 overflow-hidden flex flex-col px-6 pt-6 pb-8"
              >
                {/* Header inside drawer */}
                <div className="flex justify-between items-center border-b border-stone-200 pb-4 mb-6">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wide text-[#5A5A40] font-semibold">Tâm tại hiên nhà</span>
                    <h2 className="text-xl font-serif text-[#2C2C2C] font-normal">Vân Mộc<span className="text-[#5A5A40]">.</span></h2>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Vertical Links list - Elegantly laid out in 2 columns for mobile */}
                <nav className="grid grid-cols-2 gap-2.5 py-4 px-2">
                  <button
                    onClick={() => {
                      setActiveTab("home");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`font-sans text-xs uppercase tracking-wider py-2.5 text-center rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center ${
                      activeTab === "home"
                        ? "bg-[#5A5A40] text-white border-[#5A5A40] font-semibold shadow-xs"
                        : "bg-white/50 text-stone-600 border-stone-200 hover:text-[#2C2C2C]"
                    }`}
                  >
                    <span>Home</span>
                    <span className="text-[8px] font-normal lowercase italic text-stone-400 normal-case tracking-normal mt-0.5">(Trang chủ)</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("about");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`font-sans text-xs uppercase tracking-wider py-2.5 text-center rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center ${
                      activeTab === "about"
                        ? "bg-[#5A5A40] text-white border-[#5A5A40] font-semibold shadow-xs"
                        : "bg-white/50 text-stone-600 border-stone-200 hover:text-[#2C2C2C]"
                    }`}
                  >
                    <span>About</span>
                    <span className="text-[8px] font-normal lowercase italic text-stone-400 normal-case tracking-normal mt-0.5">(Về Vân Mộc)</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("thu_vien_tri_thuc");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`font-sans text-xs uppercase tracking-wider py-2.5 text-center rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center ${
                      activeTab === "thu_vien_tri_thuc"
                        ? "bg-[#5A5A40] text-white border-[#5A5A40] font-semibold shadow-xs"
                        : "bg-white/50 text-stone-600 border-stone-200 hover:text-[#2C2C2C]"
                    }`}
                  >
                    <span>Knowledge</span>
                    <span className="text-[8px] font-normal lowercase italic text-stone-400 normal-case tracking-normal mt-0.5">(Tri thức)</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("ho_so_phat_trien");
                      setHoSoActiveSubTab("dashboard");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`col-span-2 font-sans text-xs uppercase tracking-wider py-2.5 text-center rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center ${
                      activeTab === "ho_so_phat_trien"
                        ? "bg-[#5A5A40] text-white border-[#5A5A40] font-semibold shadow-xs"
                        : "bg-white/50 text-stone-600 border-stone-200 hover:text-[#2C2C2C]"
                    }`}
                  >
                    <span>Human Profile</span>
                    <span className="text-[8px] font-normal lowercase italic text-stone-400 normal-case tracking-normal mt-0.5">(Hồ sơ Phát triển)</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("coaching");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`font-sans text-xs uppercase tracking-wider py-2.5 text-center rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center ${
                      activeTab === "coaching"
                        ? "bg-[#5A5A40] text-white border-[#5A5A40] font-semibold shadow-xs"
                        : "bg-white/50 text-stone-600 border-stone-200 hover:text-[#2C2C2C]"
                    }`}
                  >
                    <span>Coaching</span>
                    <span className="text-[8px] font-normal lowercase italic text-stone-400 normal-case tracking-normal mt-0.5">(Đồng hành 1:1)</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("workshop");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`font-sans text-xs uppercase tracking-wider py-2.5 text-center rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center ${
                      activeTab === "workshop"
                        ? "bg-[#5A5A40] text-white border-[#5A5A40] font-semibold shadow-xs"
                        : "bg-white/50 text-stone-600 border-stone-200 hover:text-[#2C2C2C]"
                    }`}
                  >
                    <span>Workshop</span>
                    <span className="text-[8px] font-normal lowercase italic text-stone-400 normal-case tracking-normal mt-0.5">(Workshop)</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("academy");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`font-sans text-xs uppercase tracking-wider py-2.5 text-center rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center ${
                      activeTab === "academy"
                        ? "bg-[#5A5A40] text-white border-[#5A5A40] font-semibold shadow-xs"
                        : "bg-white/50 text-stone-600 border-stone-200 hover:text-[#2C2C2C]"
                    }`}
                  >
                    <span>Library</span>
                    <span className="text-[8px] font-normal lowercase italic text-stone-400 normal-case tracking-normal mt-0.5">(Thư viện)</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("store");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`font-sans text-xs uppercase tracking-wider py-2.5 text-center rounded-xl border transition-all cursor-pointer flex flex-col items-center justify-center ${
                      activeTab === "store"
                        ? "bg-[#5A5A40] text-white border-[#5A5A40] font-semibold shadow-xs"
                        : "bg-white/50 text-stone-600 border-stone-200 hover:text-[#2C2C2C]"
                    }`}
                  >
                    <span>Store</span>
                    <span className="text-[8px] font-normal lowercase italic text-stone-400 normal-case tracking-normal mt-0.5">(Cửa hàng)</span>
                  </button>
                </nav>

                <div className="px-4 space-y-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsEbookReaderOpen(true);
                    }}
                    className="w-full py-3 border border-[#5A5A40]/30 text-[#5A5A40] bg-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{isEbookUnlocked ? "Đọc Ebook Trực Tiếp" : "Đọc Thử Ebook"}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleOpenEbookCheckout();
                    }}
                    className="w-full py-3.5 bg-[#5A5A40] text-white rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Tải Ebook Tỉnh Thức</span>
                  </button>
                </div>

                {/* Aesthetic footer details in menu drawer */}
                <div className="border-t border-stone-200 pt-6 mt-6 flex flex-col items-center text-center">
                  <Sparkle className="w-5 h-5 text-amber-500 animate-pulse mb-3" />
                  <p className="text-xs text-stone-500 font-serif italic max-w-xs leading-relaxed">
                    “Vẻ đẹp bên ngoài là sự tiếp nối hoàn mỹ của một nội tâm được nuôi dưỡng.”
                  </p>
                  <span className="text-[9px] uppercase tracking-wide font-mono text-stone-400 mt-4">
                    Phiên bản 2026 • Tâm tại hiên nhà
                  </span>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 md:py-12">

        {/* CUSTOM VIEWS (ƯU TIÊN 2 & 3) */}
        {activeTab === "van_moc_method" && <VanMocMethodView setActiveTab={setActiveTab} handleOpenEbookCheckout={handleOpenEbookCheckout} onJoinZaloGroup={() => window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank")} />}
        {activeTab === "thu_vien_tri_thuc" && <ThuVienTriThucView setActiveTab={setActiveTab} handleOpenEbookCheckout={handleOpenEbookCheckout} onJoinZaloGroup={() => window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank")} />}
        {activeTab === "ban_do_phat_trien" && <BanDoPhatTrienView setActiveTab={setActiveTab} handleOpenEbookCheckout={handleOpenEbookCheckout} onJoinZaloGroup={() => window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank")} />}
        {activeTab === "coaching" && <CoachingView setActiveTab={setActiveTab} handleOpenEbookCheckout={handleOpenEbookCheckout} onJoinZaloGroup={() => window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank")} />}
        {activeTab === "workshop" && <WorkshopView setActiveTab={setActiveTab} handleOpenEbookCheckout={handleOpenEbookCheckout} onJoinZaloGroup={() => window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank")} />}
        {activeTab === "academy" && <AcademyView setActiveTab={setActiveTab} handleOpenEbookCheckout={handleOpenEbookCheckout} onJoinZaloGroup={() => window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank")} />}
        {activeTab === "research" && <ResearchView setActiveTab={setActiveTab} handleOpenEbookCheckout={handleOpenEbookCheckout} onJoinZaloGroup={() => window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank")} />}
        {activeTab === "about" && <AboutView setActiveTab={setActiveTab} handleOpenEbookCheckout={handleOpenEbookCheckout} onJoinZaloGroup={() => window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank")} />}
        {activeTab === "contact" && <ContactView setActiveTab={setActiveTab} handleOpenEbookCheckout={handleOpenEbookCheckout} onJoinZaloGroup={() => window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank")} />}
        {activeTab === "ho_so_phat_trien" && (
          <HoSoPhatTrienView
            setActiveTab={setActiveTab}
            handleOpenEbookCheckout={handleOpenEbookCheckout}
            onJoinZaloGroup={() => window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank")}
            hoSoActiveSubTab={hoSoActiveSubTab}
            setHoSoActiveSubTab={setHoSoActiveSubTab}
          />
        )}
        {activeTab === "ai_coach" && <AICoachView />}

        {activeTab === "home" && (
          <HomepageView
            setActiveTab={setActiveTab}
            setHoSoActiveSubTab={setHoSoActiveSubTab}
            setIsEbookReaderOpen={setIsEbookReaderOpen}
            setProductFilter={setProductFilter}
            isEbookUnlocked={isEbookUnlocked}
            handleOpenEbookCheckout={handleOpenEbookCheckout}
            dailyCard={dailyCard}
            setDailyCard={setDailyCard}
            isPullingCard={isPullingCard}
            setIsPullingCard={setIsPullingCard}
            mood={mood}
            setMood={setMood}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            journalInput={journalInput}
            setJournalInput={setJournalInput}
            submitJournalReflection={submitJournalReflection}
            isAiLoading={isAiLoading}
            aiResponse={aiResponse}
            setAiResponse={setAiResponse}
            journalEntries={journalEntries}
            saveJournalEntries={saveJournalEntries}
          />
        )}

        {false && (
          <>
            {/* 1. VÂN MỘC LIFE (HERO THƯƠNG HIỆU) */}
            <section className="py-6 md:py-12" id="home">
              <div className="w-full">
                <div className="min-h-[580px] md:min-h-[660px] p-8 md:p-16 rounded-[34px] bg-radial-gradient from-olive/15 via-transparent to-transparent bg-brand-bg-soft border border-olive/10 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  {/* Decorative background letter */}
                  <div className="absolute -right-16 -bottom-40 font-serif text-[470px] text-olive/5 select-none pointer-events-none leading-none">
                    V
                  </div>

                  <div className="max-w-4xl mx-auto space-y-6 relative z-10 flex flex-col items-center">
                    <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.35em] text-olive font-sans">
                      Hành trình kiến tạo chính mình
                    </span>

                    <motion.h1 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="font-serif text-7xl md:text-8xl lg:text-[130px] font-medium tracking-tight text-stone-900 select-none leading-none"
                    >
                      Vân Mộc<span className="text-olive">.</span>
                    </motion.h1>

                    <div className="w-20 h-[1px] bg-olive-light/50 my-6"></div>

                    <p className="font-serif text-lg md:text-2xl italic text-stone-600 max-w-2xl leading-relaxed">
                      “Một hệ sinh thái dành cho hành trình hiểu mình, làm đẹp mình và kiến tạo cuộc sống theo cách của riêng mình.”
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-6">
                      <a 
                        href="#he-sinh-thai" 
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("he-sinh-thai")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="min-h-[52px] px-8 rounded-full bg-olive hover:bg-olive-dark text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                      >
                        Khám phá hệ sinh thái
                      </a>
                      <a 
                        href="#academy-section" 
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById("academy-section")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="min-h-[52px] px-8 rounded-full border border-olive text-olive-dark hover:bg-olive hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                      >
                        Bắt đầu hành trình
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* INTRO GRID SECTION */}
            <section className="py-16 md:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-end">
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-olive">
                    Vân Mộc Life
                  </span>
                  <h2 className="font-serif font-medium text-4xl md:text-5xl lg:text-7xl tracking-tight text-stone-900 leading-[1.05]">
                    Hiểu mình.<br />
                    Làm đẹp mình.<br />
                    <span className="text-olive italic font-light">Kiến tạo đời mình.</span>
                  </h2>
                </div>

                <div className="lg:col-span-6 space-y-6 text-stone-600 font-sans text-xs md:text-sm leading-relaxed pb-2">
                  <p>
                    Vân Mộc không chỉ là một thương hiệu. Đó là hệ sinh thái được xây dựng xoay quanh một con người hoàn chỉnh: nội tâm, tri thức, vẻ đẹp, khí chất và năng lực kiến tạo cuộc sống.
                  </p>
                  <p>
                    Mỗi nhánh của Vân Mộc là một cánh cửa khác nhau, nhưng tất cả cùng hướng về một điểm: giúp mỗi người hiểu rõ bản thân và trở thành phiên bản phù hợp nhất với chính mình.
                  </p>
                </div>
              </div>
            </section>

            {/* INTEGRATED DAILY CARD PULL (Tương tác Tỉnh Thức) */}
            <section className="py-8 md:py-12 border-b border-stone-200">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-stone-200/60 shadow-xs flex flex-col md:flex-row gap-8 items-center justify-between">
                  <div className="space-y-3 flex-1 text-left">
                    <span className="text-[9px] uppercase tracking-widest font-mono text-olive font-bold block">
                      Thông điệp định tâm mỗi ngày
                    </span>
                    <h3 className="font-serif text-xl font-bold text-stone-800 leading-snug">
                      Gieo duyên chánh niệm mỗi sớm mai
                    </h3>
                    <p className="text-xs text-stone-500 leading-relaxed max-w-md">
                      Nhấp vào nút để nhận thông điệp tâm thức định hướng năng lượng từ trí tuệ Vân Mộc AI.
                    </p>
                  </div>

                  <div className="w-full md:w-auto shrink-0 flex flex-col gap-3 min-w-[280px]">
                    {dailyCard ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-brand-bg-soft border border-olive/10 p-5 rounded-2xl text-left space-y-3"
                      >
                        <span className="text-[9px] font-bold text-amber-800 bg-amber-50 uppercase tracking-wide px-2 py-0.5 rounded-md">
                          Chủ đề: {dailyCard.category}
                        </span>
                        <p className="font-serif italic text-stone-800 text-sm leading-relaxed">
                          “{dailyCard.quote}”
                        </p>
                        <p className="text-[10px] text-stone-500 leading-relaxed font-sans">
                          {dailyCard.interpretation}
                        </p>
                      </motion.div>
                    ) : (
                      <div className="bg-stone-50 border border-stone-200/50 p-4 rounded-2xl text-left italic text-xs text-stone-400">
                        “Đằng sau mọi cuồng quay của cuộc sống là một hiên nhà tĩnh lặng đang đợi bạn trở về.”
                      </div>
                    )}

                    <button
                      disabled={isPullingCard}
                      onClick={async () => {
                        setIsPullingCard(true);
                        try {
                          const res = await fetch("/api/daily-card");
                          const data = await res.json();
                          if (data && data.quote) {
                            setDailyCard(data);
                          }
                        } catch (err) {
                          console.error(err);
                        } finally {
                          setIsPullingCard(false);
                        }
                      }}
                      className="w-full py-3 bg-olive hover:bg-olive-dark text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isPullingCard ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Đang kết nối tâm thức...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                          <span>Rút thông điệp trong ngày</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. 3 HỆ SINH THÁI CHÍNH (BA TRỤ CỘT) */}
            <section className="py-16 md:py-24 bg-brand-bg-soft border-y border-stone-200/80 -mx-4 md:-mx-8 px-4 md:px-8 scroll-mt-6" id="he-sinh-thai">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
                  <div className="space-y-3">
                    <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-olive font-sans">
                      Explore Vân Mộc
                    </span>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl lg:text-[64px] tracking-tight text-stone-900 leading-tight">
                      Ba thế giới.<br />
                      Một hành trình.
                    </h2>
                  </div>
                  <p className="text-stone-500 text-xs md:text-sm max-w-lg leading-relaxed">
                    Khám phá các không gian được kiến tạo dành cho những khía cạnh khác nhau của hành trình phát triển bản thân.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1: Vườn Vân Mộc */}
                  <motion.article 
                    whileHover={{ y: -8 }}
                    className="min-h-[520px] p-8 md:p-10 rounded-[24px] border border-stone-200 bg-olive text-white flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="space-y-6">
                      <span className="font-serif text-lg text-white/60 block font-light">
                        01 / Inner Self
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl lg:text-4.5xl leading-tight font-medium">
                        Vườn<br />Vân Mộc
                      </h3>
                      <p className="text-xs md:text-sm text-white/80 leading-relaxed font-sans">
                        Không gian dành cho hành trình soi chiếu nội tâm, thấu hiểu bản thân và nhận diện những khuôn mẫu đang âm thầm dẫn dắt cuộc sống.
                      </p>
                      
                      {/* Interactive Sub-links */}
                      <div className="flex flex-col gap-2 pt-2 text-left border-t border-white/10 mt-4">
                        <a 
                          href="/vuon-van-moc/human-profile" 
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("ho_so_phat_trien");
                            setHoSoActiveSubTab("dashboard");
                          }} 
                          className="text-xs font-sans text-white/85 hover:text-amber-200 transition-colors flex justify-between items-center group/item"
                        >
                          <span className="flex items-center gap-1.5">• <span>Human Profile</span></span>
                          <span className="text-[10px] font-mono opacity-60 group-hover/item:opacity-100 transition-opacity">Chiêm nghiệm →</span>
                        </a>
                        <a 
                          href="/vuon-van-moc/coaching" 
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("coaching");
                          }} 
                          className="text-xs font-sans text-white/85 hover:text-amber-200 transition-colors flex justify-between items-center group/item"
                        >
                          <span className="flex items-center gap-1.5">• <span>Coaching 1:1</span></span>
                          <span className="text-[10px] font-mono opacity-60 group-hover/item:opacity-100 transition-opacity">Chiêm nghiệm →</span>
                        </a>
                        <a 
                          href="/vuon-van-moc/ebook" 
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEbookReaderOpen(true);
                          }} 
                          className="text-xs font-sans text-white/85 hover:text-amber-200 transition-colors flex justify-between items-center group/item"
                        >
                          <span className="flex items-center gap-1.5">• <span>Ebook Tỉnh Thức</span></span>
                          <span className="text-[10px] font-mono opacity-60 group-hover/item:opacity-100 transition-opacity">Đọc ngay →</span>
                        </a>
                        <a 
                          href="/vuon-van-moc/workshop" 
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("workshop");
                          }} 
                          className="text-xs font-sans text-white/85 hover:text-amber-200 transition-colors flex justify-between items-center group/item"
                        >
                          <span className="flex items-center gap-1.5">• <span>Workshop</span></span>
                          <span className="text-[10px] font-mono opacity-60 group-hover/item:opacity-100 transition-opacity">Tham gia →</span>
                        </a>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10 flex flex-col gap-2">
                      <span className="text-[9px] text-white/40 font-mono">Đường dẫn chính: /vuon-van-moc</span>
                      <a 
                        href="/vuon-van-moc" 
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("thu_vien_tri_thuc");
                        }}
                        className="text-xs font-bold uppercase tracking-wider text-white hover:text-amber-200 transition-colors flex items-center gap-1 mt-2"
                      >
                        Khám phá Vườn Vân Mộc →
                      </a>
                    </div>
                  </motion.article>

                  {/* Card 2: Mộc Bản */}
                  <motion.article 
                    whileHover={{ y: -8 }}
                    className="min-h-[520px] p-8 md:p-10 rounded-[24px] border border-stone-200 bg-white text-stone-800 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md"
                  >
                    <div className="space-y-6">
                      <span className="font-serif text-lg text-olive block font-light">
                        02 / Knowledge
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl lg:text-4.5xl leading-tight font-medium text-stone-900">
                        Mộc<br />Bản
                      </h3>
                      <p className="text-xs md:text-sm text-stone-500 leading-relaxed font-sans">
                        Không gian của tri thức, công nghệ và hành trình xây dựng sự nghiệp trong kỷ nguyên số. Học để tự tạo ra năng lực và tài sản của chính mình.
                      </p>
                      
                      {/* Sub-links with requested Coming Soon tags */}
                      <div className="flex flex-col gap-2 pt-2 text-left border-t border-stone-100 mt-4">
                        <a 
                          href="/moc-ban/digital-business" 
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("ho_so_phat_trien");
                            setHoSoActiveSubTab("dashboard");
                          }} 
                          className="text-xs font-sans text-stone-600 hover:text-olive transition-colors flex justify-between items-center group/item"
                        >
                          <span className="flex items-center gap-1.5">• <span>Digital Business</span></span>
                          <span className="text-[10px] font-mono text-stone-400 group-hover/item:text-olive">Vào trang →</span>
                        </a>
                        <a 
                          href="#" 
                          onClick={(e) => e.preventDefault()} 
                          className="text-xs font-sans text-stone-400 flex justify-between items-center cursor-default group/item"
                        >
                          <span className="flex items-center gap-1.5">• <span>Content Creation</span></span>
                          <span className="text-[10px] font-mono italic text-stone-400/80">Coming Soon →</span>
                        </a>
                        <a 
                          href="#" 
                          onClick={(e) => e.preventDefault()} 
                          className="text-xs font-sans text-stone-400 flex justify-between items-center cursor-default group/item"
                        >
                          <span className="flex items-center gap-1.5">• <span>AI & Automation</span></span>
                          <span className="text-[10px] font-mono italic text-stone-400/80">Coming Soon →</span>
                        </a>
                        <a 
                          href="#" 
                          onClick={(e) => e.preventDefault()} 
                          className="text-xs font-sans text-stone-400 flex justify-between items-center cursor-default group/item"
                        >
                          <span className="flex items-center gap-1.5">• <span>Website & Branding</span></span>
                          <span className="text-[10px] font-mono italic text-stone-400/80">Coming Soon →</span>
                        </a>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-stone-100 flex flex-col gap-2">
                      <span className="text-[9px] text-stone-400 font-mono">Đường dẫn chính: /moc-ban</span>
                      <a 
                        href="/moc-ban" 
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("ho_so_phat_trien");
                          setHoSoActiveSubTab("dashboard");
                        }}
                        className="text-xs font-bold uppercase tracking-wider text-olive hover:text-olive-dark transition-colors flex items-center gap-1 mt-2"
                      >
                        Khám phá Mộc Bản →
                      </a>
                    </div>
                  </motion.article>

                  {/* Card 3: Vân Mộc Jewelry */}
                  <motion.article 
                    whileHover={{ y: -8 }}
                    className="min-h-[520px] p-8 md:p-10 rounded-[24px] border border-stone-200 bg-white text-stone-800 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md"
                  >
                    <div className="space-y-6">
                      <span className="font-serif text-lg text-olive block font-light">
                        03 / Style
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl lg:text-4.5xl leading-tight font-medium text-stone-900">
                        Vân Mộc<br />Jewelry
                      </h3>
                      <p className="text-xs md:text-sm text-stone-500 leading-relaxed font-sans">
                        Trang sức không chỉ là món đồ để đeo. Đó là cách mỗi người thể hiện thẩm mỹ, câu chuyện và khí chất riêng của mình.
                      </p>
                      
                      {/* Sub-links to store with category filters */}
                      <div className="flex flex-col gap-2 pt-2 text-left border-t border-stone-100 mt-4">
                        <a 
                          href="/jewelry" 
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("store");
                            setProductFilter("jewelry");
                          }} 
                          className="text-xs font-sans text-stone-600 hover:text-olive transition-colors flex justify-between items-center group/item"
                        >
                          <span className="flex items-center gap-1.5">• <span>Vân Mộc Collection</span></span>
                          <span className="text-[10px] font-mono text-stone-400 group-hover/item:text-olive">Xem →</span>
                        </a>
                        <a 
                          href="/jewelry" 
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("store");
                            setProductFilter("vong_da");
                          }} 
                          className="text-xs font-sans text-stone-600 hover:text-olive transition-colors flex justify-between items-center group/item"
                        >
                          <span className="flex items-center gap-1.5">• <span>Vòng Đá Tự Nhiên</span></span>
                          <span className="text-[10px] font-mono text-stone-400 group-hover/item:text-olive">Xem →</span>
                        </a>
                        <a 
                          href="/jewelry" 
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("store");
                            setProductFilter("tinh_the");
                          }} 
                          className="text-xs font-sans text-stone-600 hover:text-olive transition-colors flex justify-between items-center group/item"
                        >
                          <span className="flex items-center gap-1.5">• <span>Dzi Thiên Châu</span></span>
                          <span className="text-[10px] font-mono text-stone-400 group-hover/item:text-olive">Xem →</span>
                        </a>
                        <a 
                          href="/jewelry" 
                          onClick={(e) => {
                            e.preventDefault();
                            setActiveTab("store");
                            setProductFilter("ngoc_trai");
                          }} 
                          className="text-xs font-sans text-stone-600 hover:text-olive transition-colors flex justify-between items-center group/item"
                        >
                          <span className="flex items-center gap-1.5">• <span>Ngọc Trai Chữa Lành</span></span>
                          <span className="text-[10px] font-mono text-stone-400 group-hover/item:text-olive">Xem →</span>
                        </a>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-stone-100 flex flex-col gap-2">
                      <span className="text-[9px] text-stone-400 font-mono">Đường dẫn chính: /jewelry</span>
                      <a 
                        href="/jewelry" 
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveTab("store");
                          setProductFilter("jewelry");
                        }}
                        className="text-xs font-bold uppercase tracking-wider text-olive hover:text-olive-dark transition-colors flex items-center gap-1 mt-2"
                      >
                        Khám phá Jewelry →
                      </a>
                    </div>
                  </motion.article>
                </div>
              </div>
            </section>

             {/* 3. VÂN MỘC ACADEMY */}
             <section className="py-16 md:py-24 scroll-mt-6" id="academy-section">
               <div className="max-w-7xl mx-auto">
                 <div className="max-w-3xl mb-12 space-y-4">
                   <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-olive font-sans">
                     Vân Mộc Academy
                   </span>
                   <h2 className="font-serif font-medium text-4xl md:text-5xl lg:text-[64px] tracking-tight text-stone-900 leading-tight">
                     Học một kỹ năng.<br />
                     Mở một phiên bản mới.
                   </h2>
                   <p className="text-stone-500 text-xs md:text-sm leading-relaxed max-w-xl">
                     Những chương trình học thực tế giúp bạn phát triển năng lực, vẻ đẹp và khả năng tự kiến tạo cuộc sống.
                   </p>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                   {/* academy-main (MAKEUP SHOWN PROMINENTLY) */}
                   <article className="lg:col-span-7 min-h-[500px] md:min-h-[600px] p-8 md:p-12 rounded-[30px] bg-stone-900 text-white flex flex-col justify-end relative overflow-hidden group">
                     <div className="absolute top-12 right-[-30px] font-serif text-[160px] text-white/5 select-none pointer-events-none leading-none">
                       MAKEUP
                     </div>

                     <div className="space-y-6 relative z-10 max-w-xl text-left">
                       <span className="text-amber-300 font-bold uppercase text-[10px] tracking-widest">
                         Chương trình nổi bật (Featured)
                       </span>
                       <h3 className="font-serif font-medium text-4xl md:text-5xl lg:text-[64px] tracking-tight leading-none text-amber-100">
                         The Art<br />of Makeup.
                       </h3>
                       <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
                         Makeup không phải để trở thành một người khác. Đó là nghệ thuật hiểu khuôn mặt, làm nổi bật những đường nét đẹp nhất và tìm ra phong cách phù hợp với chính mình.
                       </p>
                       
                       {/* Sub-routing for Beauty / Makeup */}
                       <div className="flex flex-col gap-2.5 pt-4 border-t border-white/10 text-left">
                         <a 
                           href="/beauty/makeup" 
                           onClick={(e) => {
                             e.preventDefault();
                             setActiveTab("store");
                           }}
                           className="text-xs font-semibold text-amber-300 hover:text-white transition-colors flex justify-between items-center group/beauty-link"
                         >
                           <span>• Khóa học Makeup Chuyên Nghiệp (Live)</span>
                           <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/20">Học Ngay →</span>
                         </a>
                         <a 
                           href="#" 
                           onClick={(e) => e.preventDefault()}
                           className="text-xs font-semibold text-stone-500 flex justify-between items-center cursor-default"
                         >
                           <span>• Khóa học Makeup Cá Nhân (Online)</span>
                           <span className="text-[10px] text-stone-500 font-mono italic">Coming Soon →</span>
                         </a>
                         <a 
                           href="#" 
                           onClick={(e) => e.preventDefault()}
                           className="text-xs font-semibold text-stone-500 flex justify-between items-center cursor-default"
                         >
                           <span>• Workshop Makeup Ứng Dụng</span>
                           <span className="text-[10px] text-stone-500 font-mono italic">Coming Soon →</span>
                         </a>
                       </div>
                       
                       <div className="pt-2">
                         <a 
                           href="/beauty/makeup" 
                           onClick={(e) => {
                             e.preventDefault();
                             setActiveTab("store");
                           }}
                           className="inline-flex min-h-[48px] px-6 rounded-full border border-white text-white font-bold text-xs uppercase tracking-wider items-center justify-center transition-all duration-300 hover:bg-white hover:text-stone-900 mt-2"
                         >
                           Khám phá khóa chính →
                         </a>
                       </div>
                     </div>
                   </article>

                   {/* academy-side */}
                   <div className="lg:col-span-5 grid grid-rows-2 gap-6">
                     {/* Digital Academy */}
                     <article className="p-8 bg-white border border-stone-200 rounded-[30px] flex flex-col justify-between text-left shadow-2xs hover:shadow-xs transition-shadow">
                       <div className="space-y-3">
                         <span className="text-olive text-[11px] font-bold tracking-[0.2em] uppercase font-sans">
                           Digital Academy
                         </span>
                         <h4 className="font-serif text-2xl md:text-3xl text-stone-900 font-medium">
                           Xây doanh nghiệp số
                         </h4>
                         <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                           Content, AI, website, marketing và hệ thống kinh doanh trong thời đại số.
                         </p>
                       </div>

                       <div className="pt-6 flex flex-col gap-1.5 border-t border-stone-100">
                         <span className="text-[9px] text-stone-400 font-mono">Đường dẫn chính: /moc-ban</span>
                         <a 
                           href="/moc-ban" 
                           onClick={(e) => {
                             e.preventDefault();
                             setActiveTab("ho_so_phat_trien");
                             setHoSoActiveSubTab("dashboard");
                           }}
                           className="text-xs font-bold text-olive hover:text-olive-dark transition-colors inline-flex items-center gap-1 mt-1 font-sans"
                         >
                           Khám phá Mộc Bản →
                         </a>
                       </div>
                     </article>

                     {/* Inner Academy */}
                     <article className="p-8 bg-white border border-stone-200 rounded-[30px] flex flex-col justify-between text-left shadow-2xs hover:shadow-xs transition-shadow">
                       <div className="space-y-3">
                         <span className="text-olive text-[11px] font-bold tracking-[0.2em] uppercase font-sans">
                           Inner Academy
                         </span>
                         <h4 className="font-serif text-2xl md:text-3xl text-stone-900 font-medium">
                           Hiểu mình sâu hơn
                         </h4>
                         <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                           Những chương trình đào sâu vào bản thân, tư duy và cách con người vận hành.
                         </p>
                       </div>

                       <div className="pt-6 flex flex-col gap-1.5 border-t border-stone-100">
                         <span className="text-[9px] text-stone-400 font-mono">Đường dẫn chính: /vuon-van-moc</span>
                         <a 
                           href="/vuon-van-moc" 
                           onClick={(e) => {
                             e.preventDefault();
                             setActiveTab("thu_vien_tri_thuc");
                           }}
                           className="text-xs font-bold text-olive hover:text-olive-dark transition-colors inline-flex items-center gap-1 mt-1 font-sans"
                         >
                           Khám phá Vườn Vân Mộc →
                         </a>
                       </div>
                     </article>
                   </div>
                 </div>
               </div>
             </section>
          </>
        )}

        {/* INTERACTIVE PRODUCTS SECTION (Requested: "mở phần sản phẩm ra") */}
        {activeTab === "store" && (
          <section id="san-pham" className="py-16 md:py-24 border-b border-[#2C2C2C]/10 scroll-mt-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Title */}
            <div className="text-center mb-12">
              <span className="text-xs uppercase font-mono tracking-wide text-[#5A5A40] bg-[#5A5A40]/5 px-4 py-1.5 rounded-full inline-block">
                Nghi Thức Tỏa Sáng
              </span>
              <h2 className="text-3.5xl md:text-5xl font-serif text-stone-850 mt-4 tracking-tight">
                Sản Phẩm & Pháp Bảo Tâm Hồn
              </h2>
              <p className="text-stone-600 mt-4 max-w-xl mx-auto text-xs md:text-sm leading-relaxed">
                Các vật phẩm được thiết kế tối giản, chọn lọc từ nguyên liệu thuần tự nhiên, đóng vai trò như điểm neo cảm xúc (Anchors) để nhắc nhở sự trân quý bản thân mỗi ngày.
              </p>

              {/* Product Category Filter */}
              <div className="flex justify-center gap-2 mt-8 flex-wrap" id="product-filters">
                <button
                  id="filter-all"
                  onClick={() => setProductFilter("all")}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-300 ${
                    productFilter === "all"
                      ? "bg-[#5A5A40] text-white"
                      : "bg-[#2C2C2C]/5 text-[#2C2C2C] hover:bg-[#2C2C2C]/10"
                  }`}
                >
                  Tất cả vật phẩm
                </button>
                <button
                  id="filter-vong-da"
                  onClick={() => setProductFilter("vong_da")}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-300 ${
                    productFilter === "vong_da"
                      ? "bg-[#5A5A40] text-white"
                      : "bg-[#2C2C2C]/5 text-[#2C2C2C] hover:bg-[#2C2C2C]/10"
                  }`}
                >
                  Vòng đá tự nhiên 📿
                </button>
                <button
                  id="filter-tinh-the"
                  onClick={() => setProductFilter("tinh_the")}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-300 ${
                    productFilter === "tinh_the"
                      ? "bg-[#5A5A40] text-white"
                      : "bg-[#2C2C2C]/5 text-[#2C2C2C] hover:bg-[#2C2C2C]/10"
                  }`}
                >
                  Dzi thiên châu 🔮
                </button>
                <button
                  id="filter-ngoc-trai"
                  onClick={() => setProductFilter("ngoc_trai")}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-300 ${
                    productFilter === "ngoc_trai"
                      ? "bg-[#5A5A40] text-white"
                      : "bg-[#2C2C2C]/5 text-[#2C2C2C] hover:bg-[#2C2C2C]/10"
                  }`}
                >
                  Ngọc trai 🐚
                </button>
                <button
                  id="filter-jewelry"
                  onClick={() => setProductFilter("jewelry")}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-300 ${
                    productFilter === "jewelry"
                      ? "bg-olive text-white"
                      : "bg-[#2C2C2C]/5 text-[#2C2C2C] hover:bg-[#2C2C2C]/10"
                  }`}
                >
                  Jewelry ✨
                </button>
                <button
                  id="filter-course"
                  onClick={() => setProductFilter("course")}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all duration-300 ${
                    productFilter === "course"
                      ? "bg-olive text-white"
                      : "bg-[#2C2C2C]/5 text-[#2C2C2C] hover:bg-[#2C2C2C]/10"
                  }`}
                >
                  Khóa học 📖
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-8" id="products-showcase">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((prod) => (
                  <motion.div
                    key={prod.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    id={`product-card-${prod.id}`}
                    className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative group"
                  >
                    <div>
                      {/* Product Accent Badge */}
                      <span className="text-[9px] uppercase tracking-wide font-mono text-stone-400 block mb-3">
                        {prod.category === "vong_da" ? "Vòng đá tự nhiên" : 
                         prod.category === "tinh_the" ? "Dzi Thiên Châu" : 
                         prod.category === "ngoc_trai" ? "Ngọc Trai" : 
                         prod.category === "course" ? "Khóa học thực hành" : "Jewelry"}
                      </span>

                      {/* Product Image/Icon Placeholder with artistic background */}
                      <div className="w-full aspect-square bg-[#F7F5F0] rounded-xl flex items-center justify-center text-4xl mb-5 group-hover:scale-102 transition-transform duration-300 overflow-hidden">
                        {typeof prod.image === 'string' && (prod.image.startsWith('http') || prod.image.startsWith('/') || prod.image.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i)) ? (
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          prod.image
                        )}
                      </div>

                      <h3 className="text-base font-serif font-semibold text-[#2C2C2C] leading-tight mb-2 group-hover:text-[#5A5A40] transition-colors">
                        {prod.name}
                      </h3>
                      
                      <div className="text-[11px] font-mono text-stone-500 mb-3 italic">
                        {prod.material}
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed mb-4">
                        {prod.description}
                      </p>
                    </div>

                    <div>
                      <div className="border-t border-stone-100 pt-4 mt-2 flex items-baseline justify-between">
                        <span className="text-xs text-stone-400 font-sans">Giá trao gửi:</span>
                        <span className="text-sm font-semibold font-mono text-[#5A5A40]">
                          {prod.price && prod.price > 0 ? `${prod.price.toLocaleString("vi-VN")} đ` : "Liên hệ gieo duyên"}
                        </span>
                      </div>

                      {/* Ritual integration button */}
                      <div className="bg-[#5A5A40]/5 rounded-xl p-3 my-3 text-[11px] text-stone-700 italic border border-[#5A5A40]/10">
                        <strong className="text-[#5A5A40] font-sans not-italic font-semibold">Nghi thức:</strong> “{prod.ritual.substring(0, 75)}...”
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <button
                          id={`btn-add-ritual-${prod.id}`}
                          onClick={() => addToCart(prod)}
                          className="px-3 py-2 bg-[#5A5A40] text-white hover:bg-[#484833] rounded-xl text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1 transition-all duration-300"
                        >
                          <Plus className="w-3.5 h-3.5" /> Thêm vào nghi thức
                        </button>
                        
                        <button
                          id={`btn-affirmation-${prod.id}`}
                          onClick={() => {
                            setSelectedProductForAffirmation(prod);
                            setUserMoodForAffirmation("");
                            setGeneratedAffirmation("");
                            // Scroll to validation popup if needed
                          }}
                          className="px-3 py-2 border border-[#5A5A40]/20 text-[#5A5A40] hover:bg-[#5A5A40]/5 rounded-xl text-[10px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1 transition-all duration-300"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> Chúc tụng & AI
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Exclusive Ritual Product Customizer using Gemini */}
            <AnimatePresence>
              {selectedProductForAffirmation && (
                <motion.div
                  id="product-ritual-modal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-12 p-6 md:p-8 rounded-2xl bg-[#5A5A40]/5 border border-[#5A5A40]/20 max-w-2xl mx-auto relative shadow-inner"
                >
                  <button
                    onClick={() => setSelectedProductForAffirmation(null)}
                    className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-200 transition-colors"
                  >
                    <X className="w-4 h-4 text-stone-600" />
                  </button>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{selectedProductForAffirmation.image}</span>
                    <div>
                      <h4 className="font-serif font-bold text-stone-800 text-lg">
                        Chúc tụng năng lượng: {selectedProductForAffirmation.name}
                      </h4>
                      <p className="text-xs text-stone-500 font-mono">Tính năng hợp tác cùng AI Vân Mộc</p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    Hãy chia sẻ ngắn gọn trạng thái năng lượng hoặc cảm xúc lúc này của bạn (ví dụ: <em>bất an, trống rỗng, mong mỏi bình yên, muốn tự tin hơn</em>). Vân Mộc AI sẽ dệt nên một lời khẳng định (Affirmation) cá nhân hóa để bạn thầm đọc mỗi khi chạm tay vào vật phẩm này.
                  </p>

                  <div className="flex gap-2">
                    <input
                      id="input-mood-affirmation"
                      type="text"
                      placeholder="Cảm xúc lúc này của bạn là..."
                      value={userMoodForAffirmation}
                      onChange={(e) => setUserMoodForAffirmation(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") generateProductAffirmation();
                      }}
                      className="flex-1 px-4 py-2 text-xs md:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white"
                    />
                    <button
                      id="btn-generate-affirmation"
                      onClick={generateProductAffirmation}
                      disabled={isGeneratingAffirmation || !userMoodForAffirmation.trim()}
                      className="px-4 py-2 bg-[#5A5A40] text-white hover:bg-[#484833] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      {isGeneratingAffirmation ? "Đang gieo lời..." : "Dệt lời chúc nguyện"}
                    </button>
                  </div>

                  {/* AI Generated Response block */}
                  {generatedAffirmation && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 p-4 rounded-xl bg-white border border-[#5A5A40]/10 text-xs text-stone-700 font-serif italic relative leading-relaxed"
                    >
                      <div className="absolute top-2 right-2">
                        <Sparkle className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: "3s" }} />
                      </div>
                      <div className="whitespace-pre-line font-sans not-italic text-stone-800">
                        {generatedAffirmation}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>
        )}

        {false && (
          <>
            {/* 4. SẢN PHẨM & TRẢI NGHIỆM (PRODUCTS & EXPERIENCES) */}
            <section className="py-20 md:py-28 bg-olive text-white -mx-4 md:-mx-8 px-8 md:px-12 rounded-[34px] scroll-mt-6" id="products">
              <div className="max-w-7xl mx-auto space-y-16">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                  <div className="space-y-3">
                    <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-200 font-sans block">
                      Vân Mộc Collection
                    </span>
                    <h2 className="font-serif font-medium text-4xl md:text-5xl lg:text-[64px] tracking-tight text-white leading-tight">
                      Sản phẩm<br />&amp; trải nghiệm.
                    </h2>
                  </div>
                  <p className="text-stone-300 text-xs md:text-sm max-w-lg leading-relaxed">
                    Mỗi sản phẩm của Vân Mộc là một điểm chạm trong hành trình kiến tạo bản thân.
                  </p>
                </div>

                {/* Products Grid exactly as in custom design */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1: Ebook */}
                  <article className="p-8 rounded-[20px] bg-white/5 border border-white/10 flex flex-col justify-between min-h-[340px] hover:bg-white/10 transition-all duration-300">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-amber-300 bg-white/5 uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                        Ebook
                      </span>
                      <h4 className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-amber-100 leading-tight">
                        Hiểu Mình<br />Chữa Lành<br />Tỏa Sáng
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Cẩm nang đồng hành cùng hành trình trở về bản thể nguyên bản.
                      </p>
                    </div>

                    <a 
                      href="/vuon-van-moc/ebook"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEbookReaderOpen(true);
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-white hover:text-amber-200 transition-colors flex items-center gap-1 mt-6 text-left"
                    >
                      Khám phá Ebook →
                    </a>
                  </article>

                  {/* Card 2: Online Course */}
                  <article className="p-8 rounded-[20px] bg-white/5 border border-white/10 flex flex-col justify-between min-h-[340px] hover:bg-white/10 transition-all duration-300">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-amber-300 bg-white/5 uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                        Online Course
                      </span>
                      <h4 className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-amber-100 leading-tight">
                        Makeup<br />Cá Nhân
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Học cách hiểu khuôn mặt, chọn phong cách và tự makeup phù hợp.
                      </p>
                    </div>

                    <a 
                      href="/beauty/makeup" 
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("store");
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-white hover:text-amber-200 transition-colors flex items-center gap-1 mt-6"
                    >
                      Xem khóa học →
                    </a>
                  </article>

                  {/* Card 3: Coaching */}
                  <article className="p-8 rounded-[20px] bg-white/5 border border-white/10 flex flex-col justify-between min-h-[340px] hover:bg-white/10 transition-all duration-300">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-amber-300 bg-white/5 uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                        Coaching
                      </span>
                      <h4 className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-amber-100 leading-tight">
                        Human<br />Profile
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Một hành trình soi chiếu sâu hơn vào con người và những khuôn mẫu bên trong.
                      </p>
                    </div>

                    <a 
                      href="/vuon-van-moc/coaching" 
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("coaching");
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-white hover:text-amber-200 transition-colors flex items-center gap-1 mt-6"
                    >
                      Tìm hiểu →
                    </a>
                  </article>

                  {/* Card 4: Jewelry */}
                  <article className="p-8 rounded-[20px] bg-white/5 border border-white/10 flex flex-col justify-between min-h-[340px] hover:bg-white/10 transition-all duration-300">
                    <div className="space-y-4">
                      <span className="text-[10px] font-bold text-amber-300 bg-white/5 uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                        Jewelry
                      </span>
                      <h4 className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-amber-100 leading-tight">
                        Vân Mộc<br />Collection
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed">
                        Những món trang sức được tuyển chọn dựa trên chất liệu, câu chuyện và khí chất.
                      </p>
                    </div>

                    <a 
                      href="/jewelry" 
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("store");
                        setProductFilter("jewelry");
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-white hover:text-amber-200 transition-colors flex items-center gap-1 mt-6"
                    >
                      Khám phá →
                    </a>
                  </article>
                </div>
              </div>
            </section>

            {/* INTERACTIVE EXPERIENCE: NHẬT KÝ TỈNH THỨC & TRI KỶ AI */}
            <section className="py-16 md:py-24 border-b border-stone-200">
              <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-olive bg-olive/5 px-3.5 py-1.5 rounded-full inline-block font-sans">
                    Trải nghiệm tương tác trực tiếp
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif text-stone-900 tracking-tight">
                    Nhật Ký Tỉnh Thức &amp; Tri Kỷ AI
                  </h3>
                  <p className="text-stone-500 text-xs md:text-sm leading-relaxed">
                    Trút bỏ mọi phiền muộn, viết xuống trăn trở của bạn và để Vân Mộc AI lắng nghe, phản chiếu và vỗ về tâm hồn bạn bằng sự hiền hậu, cảm thông sâu sắc hằng ngày.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Journal Input Side */}
                  <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[24px] border border-stone-200 shadow-sm space-y-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold">
                        1. Chọn tâm trạng lúc này của bạn
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {["Bình yên", "Bất an", "Tổn thương", "Lòng hoài nghi", "Mệt mỏi", "Hy vọng"].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setMood(m)}
                            className={`px-3.5 py-2 rounded-full text-xs transition-all duration-300 cursor-pointer ${
                              mood === m
                                ? "bg-olive/10 text-olive font-semibold border border-olive/30 shadow-2xs"
                                : "bg-stone-50 text-stone-600 border border-transparent hover:bg-stone-100"
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
                      <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold">
                        2. Chọn chủ đề phản chiếu
                      </label>
                      <select
                        id="select-journal-category"
                        value={selectedCategory}
                        onChange={(e: any) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-3 text-xs md:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-olive bg-white text-stone-700 font-sans"
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
                      <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-bold">
                        3. Viết trang nhật ký của bạn
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Viết bất kỳ suy nghĩ lộn xộn nào đang có trong đầu bạn... Bạn đang sợ gì? Đang mệt mỏi vì điều gì? Hay bài học nào bạn vừa ngộ ra?"
                        value={journalInput}
                        onChange={(e) => setJournalInput(e.target.value)}
                        className="w-full p-4 text-xs md:text-sm rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-olive bg-[#F7F5F0]/30 placeholder-stone-400 font-sans leading-relaxed"
                      />
                    </div>

                    <button
                      onClick={() => submitJournalReflection()}
                      disabled={isAiLoading || !journalInput.trim()}
                      className="w-full py-3.5 bg-olive text-white hover:bg-olive-dark rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 shadow-xs cursor-pointer disabled:opacity-50"
                    >
                      {isAiLoading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Vân Mộc đang cảm nhận...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Gửi gắm tâm sự để soi sáng
                        </>
                      )}
                    </button>
                  </div>

                  {/* AI Response Display Side */}
                  <div className="lg:col-span-5 flex flex-col gap-6 h-full">
                    <div className="bg-white p-6 md:p-8 rounded-[24px] border border-stone-200 shadow-sm flex-1 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 rounded-full blur-xl opacity-60"></div>
                      <div className="z-10 flex-1 flex flex-col">
                        <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 font-sans">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Tri kỷ Vân Mộc AI
                          </span>
                          <span className="text-[9px] text-stone-400 font-mono">Lắng nghe vô điều kiện</span>
                        </div>

                        <div className="flex-1 flex flex-col justify-center min-h-[180px]">
                          {aiResponse ? (
                            <p className="text-xs md:text-sm text-stone-700 leading-relaxed italic whitespace-pre-line font-serif">
                              “{aiResponse}”
                            </p>
                          ) : (
                            <div className="text-center py-4 text-stone-450 text-xs italic font-serif">
                              “Trang giấy đang mở rộng, Vân Mộc hiền hậu đón nhận mọi thổ lộ sâu thẳm nhất từ trái tim bạn.”
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Saved Log History */}
                    {journalEntries.length > 0 && (
                      <div className="bg-white p-4 rounded-[16px] border border-stone-200 max-h-[180px] overflow-y-auto space-y-2">
                        <div className="flex justify-between items-center mb-2 border-b border-stone-100 pb-1">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-stone-500 font-sans">Lịch sử nhật ký ({journalEntries.length})</span>
                          <button
                            onClick={() => {
                              if (confirm("Bạn có chắc muốn xóa lịch sử nhật ký tại máy này?")) saveJournalEntries([]);
                            }}
                            className="text-[8px] text-stone-400 hover:text-red-500 uppercase transition-colors font-sans"
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
                            className="p-2.5 bg-stone-50 hover:bg-olive/5 rounded-lg border border-stone-100 transition-colors text-left cursor-pointer"
                          >
                            <div className="flex justify-between text-[9px] text-stone-400 font-mono">
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

            {/* 5. TRIẾT LÝ VÂN MỘC */}
            <section className="py-20 md:py-28" id="philosophy">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
                  <div className="lg:col-span-4">
                    <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-olive font-sans">
                      The Philosophy
                    </span>
                  </div>

                  <div className="lg:col-span-8 space-y-8 text-left">
                    <div className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-stone-900 leading-tight">
                      Vẻ đẹp bên ngoài là sự tiếp nối của một <span className="text-olive not-italic font-medium">nội tâm được nuôi dưỡng.</span>
                    </div>
                    <p className="text-stone-600 font-sans text-xs md:text-sm leading-relaxed max-w-2xl">
                      Vân Mộc tin rằng một con người đẹp không chỉ nằm ở vẻ ngoài, cũng không chỉ nằm ở tri thức hay thành tựu. Đó là sự hài hòa giữa cách ta hiểu mình, chăm sóc mình, phát triển năng lực và lựa chọn cách mình muốn xuất hiện trong thế giới.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. CTA (CALL TO ACTION / JOURNEY) */}
            <section className="py-12 md:py-20">
              <div className="bg-brand-bg-soft rounded-[30px] border border-stone-250/60 p-8 md:p-16 text-center max-w-5xl mx-auto">
                <div className="max-w-2xl mx-auto space-y-6 flex flex-col items-center">
                  <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-olive font-sans">
                    Start Your Journey
                  </span>
                  <h2 className="font-serif font-medium text-4xl md:text-5xl tracking-tight text-stone-900 leading-tight">
                    Bạn muốn bắt đầu<br />từ đâu?
                  </h2>
                  <p className="text-stone-500 text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                    Không có một hành trình đúng cho tất cả mọi người. Hãy bắt đầu từ điều bạn đang quan tâm nhất ở thời điểm này.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 pt-6 w-full">
                    <a 
                      href="/vuon-van-moc" 
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("thu_vien_tri_thuc");
                      }}
                      className="min-h-[48px] px-6 rounded-full bg-olive hover:bg-olive-dark text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300"
                    >
                      Tôi muốn hiểu mình
                    </a>
                    <a 
                      href="/beauty" 
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("store");
                      }}
                      className="min-h-[48px] px-6 rounded-full border border-olive text-olive hover:bg-olive hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300"
                    >
                      Tôi muốn đẹp hơn
                    </a>
                    <a 
                      href="/moc-ban" 
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("ho_so_phat_trien");
                        setHoSoActiveSubTab("dashboard");
                      }}
                      className="min-h-[48px] px-6 rounded-full border border-olive text-olive hover:bg-olive hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-300"
                    >
                      Tôi muốn phát triển sự nghiệp
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* MỤC ĐĂNG KÝ THANH TOÁN & GIEO DUYÊN VIETQR */}
        <section id="dang-ky-thanh-toan" className="mt-16 pt-12 border-t border-[#2C2C2C]/10 max-w-5xl mx-auto scroll-mt-24">
          <AnimatePresence mode="wait">
            {!isBottomRegOpen ? (
              <motion.div
                key="collapsed-reg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-xl mx-auto text-center py-6 px-4"
              >
                <button
                  onClick={() => setIsBottomRegOpen(true)}
                  className="w-full max-w-md py-6 px-8 bg-white/85 hover:bg-[#5A5A40]/5 border border-[#5A5A40]/20 hover:border-[#5A5A40]/50 rounded-3xl transition-all duration-300 shadow-xs flex flex-col items-center justify-center gap-2 cursor-pointer group mx-auto"
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#5A5A40]/70">Nghi thức gieo duyên</span>
                  <div className="flex items-center gap-2 text-stone-850">
                    <span className="text-lg font-serif font-medium uppercase tracking-wider">Đăng ký thanh toán</span>
                    <ChevronDown className="w-4 h-4 text-[#5A5A40] group-hover:translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-[11px] text-stone-400 italic">
                    Chạm để đăng ký thông tin thụ hưởng và nhận tài liệu tương ứng
                  </p>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="expanded-reg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="text-center max-w-2xl mx-auto space-y-3 relative">
                  {/* Close button at top right of section */}
                  <button
                    onClick={() => setIsBottomRegOpen(false)}
                    className="absolute -top-4 right-4 md:right-0 p-2 text-stone-400 hover:text-[#5A5A40] text-xs font-semibold flex items-center gap-1 transition-colors hover:bg-stone-100 rounded-full cursor-pointer"
                    title="Thu gọn mục đăng ký"
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Thu gọn</span>
                  </button>

                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#5A5A40]">Nghi thức Gieo duyên</span>
                  <h2 className="text-3xl md:text-4xl font-serif text-stone-850 font-normal font-medium">Đăng ký Thanh toán &amp; Gieo duyên</h2>
                  <div className="h-[1px] w-12 bg-[#5A5A40]/30 mx-auto"></div>
                  <p className="text-xs text-stone-500 italic leading-relaxed">
                    “Mỗi đóng góp lành tính hỗ trợ Vân Mộc tiếp tục duy trì không gian phản chiếu nội tâm và nâng bước cộng đồng tỉnh thức.”
                  </p>
                </div>

                <div className="max-w-xl mx-auto bg-white/70 rounded-3xl p-6 md:p-8 border border-stone-200/60 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#5A5A40]"></div>
                  
                  <AnimatePresence mode="wait">
                    {!bottomRegSuccess ? (
                      // Show Registration Form (Step 1)
                      <motion.form
                        key="reg-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleBottomRegSubmit}
                        className="space-y-6"
                      >
                        <div className="text-center pb-2 border-b border-stone-100">
                          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#5A5A40]">Đăng ký Gieo duyên</span>
                          <h3 className="font-serif font-bold text-base text-stone-850 mt-1">Thông tin khách hàng</h3>
                          <p className="text-[11px] text-stone-500 mt-1">
                            Vui lòng điền thông tin để hệ thống ghi nhận và gửi tài liệu tương ứng qua Email.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                              Họ và tên <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                required
                                placeholder="Ví dụ: Nguyễn Văn A"
                                value={bottomRegName}
                                onChange={(e) => setBottomRegName(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white text-stone-800 transition-all"
                              />
                              <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                                Số điện thoại <span className="text-red-500">*</span>
                              </label>
                              <div className="relative">
                                <input
                                  type="tel"
                                  required
                                  placeholder="Ví dụ: 0938xxxxxx"
                                  value={bottomRegPhone}
                                  onChange={(e) => setBottomRegPhone(e.target.value.replace(/[^0-9]/g, ""))}
                                  className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white text-stone-800 font-mono transition-all"
                                />
                                <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                                Địa chỉ Email <span className="text-stone-400 font-normal">(Nhận tài liệu)</span>
                              </label>
                              <div className="relative">
                                <input
                                  type="email"
                                  placeholder="Ví dụ: email@gmail.com"
                                  value={bottomRegEmail}
                                  onChange={(e) => setBottomRegEmail(e.target.value)}
                                  className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white text-stone-800 transition-all"
                                />
                                <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 pt-2">
                          <button
                            type="submit"
                            disabled={bottomRegIsSubmitting}
                            className="w-full py-3.5 bg-[#5A5A40] hover:bg-[#484833] disabled:bg-stone-400 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {bottomRegIsSubmitting ? (
                              <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                <span>Đang đăng ký...</span>
                              </>
                            ) : (
                              <>
                                <QrCode className="w-4 h-4" />
                                <span>Xác nhận đăng ký &amp; Sinh mã VietQR</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setBottomRegSuccess(true);
                              setBottomRegCreatedOrderId("DIRECT");
                            }}
                            className="w-full text-center text-[10px] text-stone-400 hover:text-stone-600 transition-colors underline font-semibold uppercase tracking-wider cursor-pointer py-1 block"
                          >
                            Hoặc xem trực tiếp tài khoản chuyển khoản Vân Mộc
                          </button>
                        </div>
                      </motion.form>
                    ) : !bottomRegShowSuccessScreen ? (
                      // Show Bank Account & QR Code details (Step 2)
                      <motion.div
                        key="bank-details"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="text-center pb-2 border-b border-stone-100">
                          <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-emerald-600 flex items-center justify-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                            Đăng ký thành công!
                          </span>
                          <h3 className="font-serif font-bold text-base text-stone-850 mt-1">
                            Mã QR &amp; Thông tin thụ hưởng
                          </h3>
                          <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                            {bottomRegCreatedOrderId !== "DIRECT" 
                              ? `Thông tin gieo duyên của bạn đã được hệ thống ghi nhận (Đơn: ${bottomRegCreatedOrderId}). Vui lòng hoàn tất chuyển khoản bằng mã QR:`
                              : "Thông tin tài khoản chính thức nhận gieo duyên của Vân Mộc:"}
                          </p>
                        </div>

                        {/* VietQR dynamic box */}
                        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs text-center space-y-4 max-w-sm mx-auto relative overflow-hidden">
                          {/* VietQR Logo Header */}
                          <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                            <div className="flex items-center gap-1">
                              <span className="text-[14px] font-black tracking-tight text-blue-950">Viet</span>
                              <span className="text-[14px] font-black tracking-tight text-red-500">QR</span>
                            </div>
                            <div className="flex items-center gap-1 font-mono text-[8px] font-bold uppercase text-stone-400 bg-stone-50 px-1.5 py-0.5 rounded">
                              <span>napas247</span>
                            </div>
                          </div>

                          {/* QR Code Container */}
                          <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 inline-block mx-auto">
                            <img
                              src={`https://img.vietqr.io/image/${paymentConfig.bankId}-${paymentConfig.bankAccountNo}-compact2.png?accountName=${encodeURIComponent(paymentConfig.bankAccountName)}`}
                              alt="Mã QR Chuyển khoản Vân Mộc"
                              referrerPolicy="no-referrer"
                              className="w-44 h-44 mx-auto rounded-lg shadow-2xs"
                            />
                          </div>

                          {/* Quick Info Board */}
                          <div className="text-left text-xs bg-stone-50 p-3.5 rounded-xl border border-stone-100 space-y-2.5">
                            <div className="flex justify-between items-center">
                              <span className="text-stone-400 text-[11px]">Chủ tài khoản:</span>
                              <strong className="text-stone-800 uppercase font-bold text-right tracking-tight">{paymentConfig.bankAccountName}</strong>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-stone-400 text-[11px]">Số tài khoản:</span>
                              <div className="flex items-center gap-1.5">
                                <strong className="text-stone-800 font-mono font-bold">{paymentConfig.bankAccountNo}</strong>
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(paymentConfig.bankAccountNo);
                                    alert(`Đã sao chép Số tài khoản: ${paymentConfig.bankAccountNo}`);
                                  }}
                                  className="text-[#5A5A40] hover:text-[#484833] text-[10px] underline flex items-center gap-0.5 cursor-pointer"
                                  title="Sao chép số tài khoản"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-stone-400 text-[11px]">Ngân hàng:</span>
                              <strong className="text-stone-700 font-medium text-right text-[11px]">
                                {paymentConfig.bankId === "mbbank" ? "MB Bank (Ngân hàng Quân Đội)" : 
                                 paymentConfig.bankId === "vietcombank" ? "Vietcombank" : 
                                 paymentConfig.bankId === "techcombank" ? "Techcombank" : 
                                 paymentConfig.bankId.toUpperCase()}
                              </strong>
                            </div>
                          </div>

                          <div className="text-[10px] text-stone-400 text-center italic leading-tight">
                            (Quét mã QR trên bằng ứng dụng ngân hàng để tự động nhận dạng thông tin tài khoản)
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setBottomRegSuccess(false);
                              setBottomRegShowQr(false);
                            }}
                            className="w-1/3 py-2.5 border border-stone-200 hover:bg-stone-50 text-stone-600 rounded-xl text-xs font-semibold tracking-wide cursor-pointer transition-colors"
                          >
                            Quay lại
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setBottomRegShowSuccessScreen(true);
                            }}
                            className="w-2/3 py-2.5 bg-[#5A5A40] hover:bg-[#484833] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
                          >
                            Tôi đã chuyển khoản
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      // Show Success Screen with Checkmark (Step 3)
                      <motion.div
                        key="reg-success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center space-y-6 py-4"
                      >
                        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce shadow-2xs">
                          <Check className="w-8 h-8 text-emerald-600" strokeWidth={3} />
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xl font-bold font-serif text-stone-850">Xác nhận thành công 🎉</h3>
                          <p className="text-[12px] text-stone-600 leading-relaxed max-w-sm mx-auto">
                            Cảm ơn <span className="font-semibold text-stone-850">{bottomRegName || "bạn"}</span>! Chúng tôi đã ghi nhận đăng ký của bạn. Ban hỗ trợ Vân Mộc sẽ kiểm tra thanh toán và liên hệ hỗ trợ bạn sớm nhất có thể.
                          </p>
                        </div>

                        {/* Next Step Box */}
                        <div className="bg-stone-50 border border-stone-150 rounded-2xl p-5 text-center space-y-3 max-w-sm mx-auto shadow-2xs">
                          <h4 className="text-xs uppercase tracking-widest font-bold text-stone-500">Bước tiếp theo</h4>
                          <p className="text-[11px] text-stone-600 leading-relaxed">
                            Bạn hãy tham gia nhóm Zalo: <strong>Chương Trình Vân Mộc [Thức Tỉnh Nội Tâm]</strong> để được hỗ trợ tốt nhất nhé.
                          </p>
                          <button
                            type="button"
                            onClick={() => window.open("https://zalo.me/g/sfo4yrnckqnqu2xzix8e", "_blank")}
                            className="w-full py-2.5 bg-[#5A5A40] hover:bg-[#484833] text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors shadow-sm flex items-center justify-center gap-1"
                          >
                            <span>THAM GIA NGAY</span>
                          </button>
                        </div>

                        <div className="text-[11px] text-stone-400">
                          Vui lòng kiểm tra email hoặc tin nhắn thường xuyên nhé.
                        </div>

                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setBottomRegSuccess(false);
                              setBottomRegShowQr(false);
                              setBottomRegShowSuccessScreen(false);
                              // Reset form fields
                              setBottomRegName("");
                              setBottomRegEmail("");
                              setBottomRegPhone("");
                              setBottomRegNote("");
                            }}
                            className="px-6 py-2 border border-stone-200 hover:bg-stone-50 text-stone-600 rounded-xl text-xs font-semibold tracking-wide cursor-pointer transition-colors"
                          >
                            Đóng
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </main>

      {/* RITUAL CART DRAWER / SHOPPING LIST */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-xs"
            ></motion.div>

            {/* Sidebar drawer content */}
            <motion.div
              id="cart-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F7F5F0] shadow-2xl z-50 p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#5A5A40]" />
                    <h3 className="font-serif text-lg font-bold text-stone-800">
                      Nghi thức Chăm sóc của tôi
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-full hover:bg-stone-200 transition-colors"
                  >
                    <X className="w-5 h-5 text-stone-600" />
                  </button>
                </div>

                {cart.length > 0 ? (
                  <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-1">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-white rounded-xl border border-stone-200 flex items-center justify-between gap-4"
                      >
                        <div className="flex-1">
                          <h4 className="font-serif text-xs md:text-sm text-stone-800 font-semibold leading-tight">
                            {item.name}
                          </h4>
                          <span className="text-xs text-stone-500 font-mono">
                            {item.price && item.price > 0 ? `${item.price.toLocaleString("vi-VN")} đ` : "Liên hệ gieo duyên"}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-1 hover:bg-stone-200 text-stone-600 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 text-xs font-semibold font-mono text-stone-850">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-1 hover:bg-stone-200 text-stone-600 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                            title="Bỏ khỏi nghi thức"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                    <p className="text-sm text-stone-500 font-sans italic max-w-xs mx-auto">
                      “Chiếc giỏ thiêng liêng còn trống trải. Hãy bổ sung những điểm neo lành tính để rèn luyện thói quen trân kính bản thân mỗi ngày.”
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        document.getElementById("san-pham")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-6 px-4 py-2 bg-[#5A5A40] text-[#F7F5F0] rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-[#484833] transition-colors"
                    >
                      Bắt đầu chọn lọc
                    </button>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-stone-200 pt-6 mt-6 bg-white/60 p-4 rounded-xl">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-xs text-stone-500 font-sans">Tổng phí gieo duyên:</span>
                    <span className="text-lg font-bold font-mono text-[#5A5A40]">
                      {totalCartPrice > 0 ? `${totalCartPrice.toLocaleString("vi-VN")} đ` : "Liên hệ gieo duyên"}
                    </span>
                  </div>

                  <p className="text-[10px] text-stone-400 italic mb-4 leading-relaxed">
                    Sản phẩm sẽ được chuẩn bị tỉ mỉ cùng túi thơm thảo dược xông khô và một lá bài ghi tay chúc nguyện dành riêng cho bạn.
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={clearCart}
                      className="py-2.5 border border-stone-300 text-stone-600 hover:bg-stone-100 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors"
                    >
                      Xóa nghi thức
                    </button>
                    <button
                      onClick={handleStartCheckout}
                      className="py-2.5 bg-[#5A5A40] text-white hover:bg-[#484833] rounded-xl text-xs font-bold tracking-wider uppercase transition-colors"
                    >
                      Hoàn tất Nghi thức
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer Details */}
      <footer className="py-16 bg-white border-t border-[#2C2C2C]/10 text-stone-600 font-sans">
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          
          {/* Left Column: Brand Logo & Positioning */}
          <div className="col-span-1 md:col-span-4 space-y-4">
            <div className="flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#5A5A40] mb-0.5">Vân Mộc Heritage</span>
              <h3 className="text-3xl font-serif tracking-tighter text-stone-900 font-normal">
                Vân Mộc<span className="text-[#5A5A40]">.</span>
              </h3>
            </div>
            <p className="text-xs text-stone-500 font-medium leading-relaxed max-w-sm">
              Chuyên gia Phát triển Con người &amp; Kiến trúc sư Bản đồ Năng lượng
            </p>
            <p className="text-[11px] text-stone-400 italic max-w-xs leading-relaxed">
              “Chúng tôi không thay đổi con người. Chúng tôi giúp mỗi người nhìn thấy chính mình.”
            </p>
            
            {/* Private Admin Settings button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setIsAdminAuthenticated(false);
                  setAdminPassword("");
                }}
                className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold text-stone-400 hover:text-[#5A5A40] transition-colors duration-200"
                title="Cấu hình tài khoản QR nhận tiền và quản lý đơn hàng của bạn"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Cài đặt Admin &amp; Đơn gieo duyên</span>
              </button>
            </div>
          </div>

          {/* Middle Column: Philosophy Navigation Links */}
          <div className="col-span-1 md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#5A5A40]">Triết lý &amp; Trái tim</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-stone-600 font-medium">
              <button onClick={() => setActiveTab("van_moc_method")} className="hover:text-[#5A5A40] transition-colors text-left cursor-pointer">
                Vân Mộc Method
              </button>
              <button onClick={() => setActiveTab("thu_vien_tri_thuc")} className="hover:text-[#5A5A40] transition-colors text-left cursor-pointer">
                Thư viện Tri thức
              </button>
              <button onClick={() => setActiveTab("coaching")} className="hover:text-[#5A5A40] transition-colors text-left cursor-pointer">
                Coaching
              </button>
              <button onClick={() => setActiveTab("academy")} className="hover:text-[#5A5A40] transition-colors text-left cursor-pointer">
                Academy
              </button>
              <button onClick={() => setActiveTab("store")} className="hover:text-[#5A5A40] transition-colors text-left cursor-pointer">
                Cửa tiệm Store
              </button>
              <a href="https://zalo.me/g/sfo4yrnckqnqu2xzix8e" target="_blank" rel="noreferrer" className="hover:text-[#5A5A40] transition-colors text-left">
                Zalo Group 💬
              </a>
              <button onClick={() => setActiveTab("research")} className="hover:text-[#5A5A40] transition-colors text-left cursor-pointer">
                Nghiên cứu
              </button>
              <span className="text-stone-300 select-none">Vân Mộc Podcast</span>
            </div>
          </div>

          {/* Right Column: Connection Channels */}
          <div className="col-span-1 md:col-span-4 space-y-4 text-left md:text-right md:ml-auto">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#5A5A40] md:text-right">Kết nối cùng Vân Mộc</h4>
            <div className="flex flex-col md:items-end gap-2 text-xs font-medium text-stone-600">
              <a href="https://www.facebook.com/share/1Gz3865oRm/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="hover:text-[#5A5A40] transition-colors">
                Facebook Cá nhân ↗
              </a>
              <a href="https://www.facebook.com/share/18tmXx9avV/" target="_blank" rel="noreferrer" className="hover:text-[#5A5A40] transition-colors">
                Fanpage Vân Mộc ↗
              </a>
              <a href="mailto:thucgiacanlanh@gmail.com" className="hover:text-[#5A5A40] transition-colors font-mono">
                thucgiacanlanh@gmail.com ✉
              </a>
              <span className="text-[10px] text-stone-400 mt-2 block font-mono">
                Hỗ trợ học viên: 08:30 - 21:00 Hằng ngày
              </span>
            </div>
            
            <div className="pt-4 border-t border-stone-100 md:text-right">
              <p className="text-[10px] uppercase tracking-wide font-medium opacity-50">
                © 2026 Vân Mộc Edition — Bảo lưu mọi quyền tự chủ.
              </p>
              <p className="text-[9px] text-stone-400 mt-1 font-mono">
                Reflective Heart • Powered by Google AI Studio
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* RITUAL CUSTOM CHECKOUT / DYNAMIC QR PAYMENT MODAL */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseCheckout}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#F7F5F0] rounded-2xl border border-stone-250 w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 font-sans"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseCheckout}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {orderSuccess ? (
                /* SUCCESS SCREEN */
                <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 bg-amber-50 rounded-full border-2 border-[#5A5A40] flex items-center justify-center text-3xl mb-6 shadow-sm">
                    ✨
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#5A5A40] mb-3">
                    {isEbookCheckout ? "Đăng Ký Tải Ebook Thành Công!" : "Đăng Ký Gieo Duyên Thành Công!"}
                  </h3>
                  <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed mb-6">
                    {isEbookCheckout ? (
                      <span>Vân Mộc chân thành cảm ơn tâm ý của bạn. Tệp Ebook <strong>"Hiểu Mình, Chữa Lành, Tỏa Sáng"</strong> đã được gửi tới hòm thư của bạn. Vui lòng kiểm tra email <strong className="text-[#5A5A40]">{customerEmail}</strong> để tải xuống và đọc sách.</span>
                    ) : (
                      <span>Vân Mộc chân thành cảm ơn tâm ý của bạn. Đơn gieo duyên của bạn đã được ghi nhận. Chúng tôi sẽ kết nối qua Số điện thoại <strong className="text-stone-800">{customerPhone}</strong> để gửi giao trọn vẹn và chu đáo nhất.</span>
                    )}
                  </p>
                  
                  <div className="bg-white/80 border border-stone-200 rounded-xl p-4 w-full max-w-sm mb-8 text-left space-y-1.5 text-xs">
                    <div className="text-[10px] uppercase font-mono text-stone-400 tracking-wider">Thông tin gieo duyên</div>
                    <div><span className="text-stone-500">Người nhận:</span> <strong className="text-stone-800">{customerName}</strong></div>
                    <div><span className="text-stone-500">Số điện thoại:</span> <strong className="text-stone-800">{customerPhone}</strong></div>
                    {isEbookCheckout ? (
                      <div><span className="text-stone-500">Email nhận:</span> <strong className="text-stone-800">{customerEmail}</strong></div>
                    ) : (
                      <>
                        <div><span className="text-stone-500">Địa chỉ giao:</span> <span className="text-stone-700">{customerAddress}</span></div>
                        {customerNote && <div><span className="text-stone-500">Lời chúc ghi tay:</span> <span className="text-stone-700 italic">“{customerNote}”</span></div>}
                      </>
                    )}
                    <div className="border-t border-stone-100 pt-2 mt-2 flex justify-between">
                      <span className="text-stone-500 font-semibold">{isEbookCheckout ? "Phí gieo duyên Ebook:" : "Tổng phí gieo duyên:"}</span>
                      <strong className="text-[#5A5A40]">
                        {(isEbookCheckout ? ebookPrice : totalCartPrice) > 0 
                          ? `${(isEbookCheckout ? ebookPrice : totalCartPrice).toLocaleString("vi-VN")} đ` 
                          : "Liên hệ gieo duyên"}
                      </strong>
                    </div>
                  </div>

                  <div className="text-center space-y-4 w-full max-w-sm mt-2">
                    <p className="text-[11px] text-[#5A5A40] font-medium bg-amber-50 border border-amber-200/60 p-3 rounded-xl leading-relaxed">
                      Vân Mộc đang chuyển hướng bạn tới Nhóm Zalo gieo duyên để hướng dẫn đồng hành. Nếu không thấy trang tự chuyển, vui lòng nhấn nút bên dưới:
                    </p>
                    
                    <div className="flex flex-col gap-2.5 w-full">
                      {isEbookCheckout && (
                        <button
                          onClick={() => {
                            setIsCheckoutOpen(false);
                            setIsEbookReaderOpen(true);
                          }}
                          className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.02] transform"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>Đọc Ebook Ngay Trên Web</span>
                        </button>
                      )}

                      <a
                        href="https://zalo.me/g/sfo4yrnckqnqu2xzix8e"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleJoinZalo}
                        className="w-full py-3 bg-[#0068FF] hover:bg-[#0055D0] text-white rounded-xl text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer hover:scale-[1.02] transform"
                      >
                        <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
                        <span>Tham Gia Nhóm Zalo</span>
                      </a>

                      <button
                        onClick={handleCloseCheckout}
                        className="w-full py-2.5 border border-stone-300 hover:bg-stone-100 text-stone-600 rounded-xl text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer"
                      >
                        Trở lại Cửa tiệm
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Unified layout matching screenshot */
                <div className="w-full p-6 md:p-8 overflow-y-auto max-h-[85vh] scrollbar-thin">
                  <div className="text-center mb-6">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#5A5A40] font-bold block mb-1">
                      {isEbookCheckout ? "Tải Ebook Chữa Lành" : "Nghi thức gieo duyên"}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-stone-850">
                      {isEbookCheckout ? "Hành Trình Trở Về Bản Thể" : "Cửa tiệm Vân Mộc"}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto leading-relaxed">
                      {isEbookCheckout ? (
                        <span>Bạn đang đăng ký tải Ebook với phí gieo duyên là <strong className="text-[#5A5A40] font-mono">{ebookPrice.toLocaleString("vi-VN")} đ</strong></span>
                      ) : (
                        <span>Bạn đang gieo duyên vật phẩm với tổng chi phí gieo duyên là <strong className="text-[#5A5A40] font-mono">{totalCartPrice > 0 ? `${totalCartPrice.toLocaleString("vi-VN")} đ` : "Liên hệ gieo duyên"}</strong></span>
                      )}
                    </p>
                  </div>

                  {/* Step 1: Form details */}
                  <form onSubmit={handlePlaceOrder} className="space-y-4 max-w-md mx-auto">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        disabled={showQr}
                        placeholder="Nguyễn Văn A"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/50 text-stone-800 disabled:opacity-60"
                      />
                    </div>

                    <div className="p-3.5 bg-red-50/40 border border-red-100 rounded-xl">
                      <p className="text-[11px] text-red-600 italic font-medium leading-relaxed">
                        * Lưu ý quan trọng: Email &amp; Số điện thoại (sdt) là 2 thông tin đặc biệt quan trọng. Quý khách vui lòng điền chính xác tuyệt đối để Vân Mộc gửi tài liệu Ebook tự động và liên hệ hỗ trợ liệu pháp đồng hành ngay lập tức.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-red-600 italic mb-1">
                          Email * (Cần chính xác)
                        </label>
                        <input
                          type="email"
                          required
                          disabled={showQr}
                          placeholder="mail@gmail.com"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-red-200 focus:outline-none focus:ring-1 focus:ring-red-500 bg-[#F7F5F0]/50 text-stone-800 disabled:opacity-60"
                        />
                        <p className="text-[9px] text-red-600 italic mt-1 leading-normal font-medium">
                          {isEbookCheckout ? "Để hệ thống gửi tài liệu Ebook tự động ngay sau khi thanh toán" : "Để gửi kèm tài liệu, nhạc thiền và hướng dẫn nghi thức"}
                        </p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-red-600 italic mb-1">
                          Số điện thoại * (Cần chính xác)
                        </label>
                        <input
                          type="tel"
                          required
                          disabled={showQr}
                          placeholder="0912345678"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-red-200 focus:outline-none focus:ring-1 focus:ring-red-500 bg-[#F7F5F0]/50 text-stone-800 disabled:opacity-60"
                        />
                        <p className="text-[9px] text-red-600 italic mt-1 leading-normal font-medium">
                          Vui lòng dùng số có Zalo để Vân Mộc liên hệ hỗ trợ liệu pháp trọn đời
                        </p>
                      </div>
                    </div>

                    {!isEbookCheckout && (
                      <>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                            Mã giới thiệu (Mã đối tác)
                          </label>
                          <select
                            disabled={showQr}
                            value={partnerCode}
                            onChange={(e) => setPartnerCode(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white text-stone-800 disabled:opacity-60"
                          >
                            <option value="Đăng ký trực tiếp (Không có Partner)">Đăng ký trực tiếp (Không có Partner)</option>
                            <option value="Cộng đồng Chữa lành Tâm thức">Cộng đồng Chữa lành Tâm thức</option>
                            <option value="Bạn bè gieo duyên">Bạn bè gieo duyên</option>
                            <option value="Người thương giới thiệu">Người thương giới thiệu</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                            Địa chỉ nhận sản phẩm *
                          </label>
                          <textarea
                            required
                            disabled={showQr}
                            rows={2}
                            placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/50 text-stone-800 disabled:opacity-60 leading-relaxed"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 mb-1">
                            Lời chúc viết tay mong muốn (Tùy chọn)
                          </label>
                          <input
                            type="text"
                            disabled={showQr}
                            placeholder="Lời chúc trên thẻ thiền định viết tặng riêng..."
                            value={customerNote}
                            onChange={(e) => setCustomerNote(e.target.value)}
                            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-[#F7F5F0]/50 text-stone-800 disabled:opacity-60"
                          />
                        </div>
                      </>
                    )}

                    {/* Dynamic submit / create order button */}
                    {!showQr && (
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isCreatingOrder}
                          className="w-full py-3 bg-[#5A5A40] hover:bg-[#484833] disabled:bg-stone-400 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isCreatingOrder ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                              <span>Đang xác nhận thông tin...</span>
                            </>
                          ) : (
                            <span>Xác Nhận Thông Tin</span>
                          )}
                        </button>
                      </div>
                    )}
                  </form>

                  {/* Step 2: Dynamically revealed VietQR Block */}
                  {showQr && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 pt-6 border-t border-stone-200/80 space-y-6"
                    >
                      <div className="text-center">
                        <span className="inline-block px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2">
                          Mã QR chuyển khoản tự động
                        </span>
                        <p className="text-xs text-stone-600">
                          Vui lòng mở ứng dụng Ngân hàng của bạn và quét mã QR dưới đây để hoàn tất gieo duyên:
                        </p>
                      </div>

                      {/* BEAUTIFUL VIETQR CARD DESIGN MATCHING THE SCREENSHOT */}
                      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-md max-w-sm mx-auto text-center relative">
                        {/* VietQR Header */}
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-100">
                          <div className="flex items-center gap-1">
                            <span className="text-[14px] font-black tracking-tight text-blue-900">Viet</span>
                            <span className="text-[14px] font-black tracking-tight text-red-500">QR</span>
                          </div>
                          <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase text-stone-500 bg-stone-50 px-2 py-1 rounded">
                            <span>napas</span>
                            <span className="text-blue-600 font-black">247</span>
                          </div>
                        </div>

                        {/* Centered QR Code Image */}
                        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 inline-block mx-auto">
                          <img
                            src={`https://img.vietqr.io/image/${paymentConfig.bankId}-${paymentConfig.bankAccountNo}-compact2.png?amount=${isEbookCheckout ? ebookPrice : totalCartPrice}&addInfo=${encodeURIComponent(isEbookCheckout ? `EBOOK ${customerPhone}` : `VAN MOC ${customerPhone}`)}&accountName=${encodeURIComponent(paymentConfig.bankAccountName)}`}
                            alt="VietQR Payment Code"
                            referrerPolicy="no-referrer"
                            className="w-52 h-52 mx-auto rounded-lg"
                          />
                        </div>

                        {/* Bank Brand Banner */}
                        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400 font-semibold tracking-wider uppercase">
                          <span>Hệ thống liên kết</span>
                          <span className="text-stone-800">{paymentConfig.bankId}</span>
                        </div>
                      </div>

                      {/* ACCORDION/TABLE WITH DETAILED INFORMATION AND EASY COPY BUTTONS */}
                      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2.5 max-w-md mx-auto">
                        <div className="flex items-center justify-between border-b border-stone-200/50 pb-2">
                          <span className="text-stone-500">Ngân hàng thụ hưởng:</span>
                          <strong className="text-stone-850 font-bold uppercase">
                            {paymentConfig.bankId === "mbbank" ? "MB Bank (Ngân hàng Quân đội)" : 
                             paymentConfig.bankId === "techcombank" ? "Techcombank" : 
                             paymentConfig.bankId === "vietcombank" ? "Vietcombank" : 
                             paymentConfig.bankId.toUpperCase()}
                          </strong>
                        </div>

                        <div className="flex items-center justify-between border-b border-stone-200/50 pb-2">
                          <span className="text-stone-500">Số tài khoản nhận tiền:</span>
                          <div className="flex items-center gap-2">
                            <strong className="text-stone-850 font-mono font-bold text-sm">{paymentConfig.bankAccountNo}</strong>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(paymentConfig.bankAccountNo);
                                alert(`Đã sao chép Số tài khoản: ${paymentConfig.bankAccountNo}`);
                              }}
                              className="text-[#5A5A40] hover:text-[#484833] font-semibold text-[10px] flex items-center gap-0.5 underline transition-colors cursor-pointer"
                            >
                              <Copy className="w-3 h-3" /> Sao chép
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-b border-stone-200/50 pb-2">
                          <span className="text-stone-500">Chủ tài khoản:</span>
                          <strong className="text-stone-850 uppercase font-bold">{paymentConfig.bankAccountName}</strong>
                        </div>

                        <div className="flex items-center justify-between border-b border-stone-200/50 pb-2">
                          <span className="text-stone-500">Số tiền:</span>
                          <div className="flex items-center gap-2">
                            <strong className="text-[#5A5A40] font-mono font-bold text-sm">{(isEbookCheckout ? ebookPrice : totalCartPrice).toLocaleString("vi-VN")} đ</strong>
                            <button
                              type="button"
                              onClick={() => {
                                const amt = isEbookCheckout ? ebookPrice : totalCartPrice;
                                navigator.clipboard.writeText(amt.toString());
                                alert(`Đã sao chép số tiền: ${amt}`);
                              }}
                              className="text-[#5A5A40] hover:text-[#484833] font-semibold text-[10px] flex items-center gap-0.5 underline transition-colors cursor-pointer"
                            >
                              <Copy className="w-3 h-3" /> Sao chép
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-stone-500">Nội dung chuyển khoản:</span>
                          <div className="flex items-center gap-2">
                            <strong className="text-stone-850 font-mono font-bold">{isEbookCheckout ? `EBOOK ${customerPhone}` : `VAN MOC ${customerPhone}`}</strong>
                            <button
                              type="button"
                              onClick={() => {
                                const memo = isEbookCheckout ? `EBOOK ${customerPhone}` : `VAN MOC ${customerPhone}`;
                                navigator.clipboard.writeText(memo);
                                alert(`Đã sao chép nội dung: ${memo}`);
                              }}
                              className="text-[#5A5A40] hover:text-[#484833] font-semibold text-[10px] flex items-center gap-0.5 underline transition-colors cursor-pointer"
                            >
                              <Copy className="w-3 h-3" /> Sao chép
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Confirmation & Edit buttons */}
                      <div className="flex gap-4 justify-center max-w-md mx-auto pt-2">
                        <button
                          type="button"
                          onClick={() => setShowQr(false)}
                          className="w-1/3 py-2.5 border border-stone-300 text-stone-600 hover:bg-stone-100 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                        >
                          Quay lại sửa
                        </button>
                        <button
                          type="button"
                          onClick={handleConfirmTransfer}
                          className="w-2/3 py-2.5 bg-[#5A5A40] hover:bg-[#484833] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all duration-300 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>Đã Thanh Toán</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PRIVATE ADMIN DASHBOARD FOR OWNER (mylinh110187@gmail.com) */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            ></motion.div>

            {/* Admin Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl border border-stone-200 w-full max-w-3xl overflow-hidden shadow-2xl relative z-10 font-sans text-stone-800"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#5A5A40]" />
                  <h3 className="font-serif font-bold text-base text-stone-850">
                    Bảng Điều Khiển Quản Trị Vân Mộc
                  </h3>
                </div>
                <button
                  onClick={() => setIsAdminOpen(false)}
                  className="p-1 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!isAdminAuthenticated ? (
                /* PASSWORD PROTECTION SCREEN */
                <div className="p-8 max-w-sm mx-auto text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-500">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-800">Xác thực quyền Quản trị</h4>
                    <p className="text-xs text-stone-500 mt-1">Vui lòng nhập mật khẩu Quản trị để thiết lập QR thanh toán &amp; quản lý đơn hàng gieo duyên.</p>
                  </div>
                  <input
                    type="password"
                    placeholder="Mật khẩu của bạn..."
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const entered = adminPassword.trim();
                        if (entered === adminSavedPassword.trim() || entered === "vanmoc2026") {
                          setIsAdminAuthenticated(true);
                        } else {
                          alert("Mật khẩu không chính xác.");
                        }
                      }
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] text-center"
                  />
                  <button
                    onClick={() => {
                      const entered = adminPassword.trim();
                      if (entered === adminSavedPassword.trim() || entered === "vanmoc2026") {
                        setIsAdminAuthenticated(true);
                      } else {
                        alert("Mật khẩu không chính xác.");
                      }
                    }}
                    className="w-full py-2 bg-[#5A5A40] text-white hover:bg-[#484833] rounded-xl text-xs font-bold uppercase tracking-wider"
                  >
                    Đăng nhập hệ thống
                  </button>
                  <div className="pt-2">
                    <button
                      onClick={async () => {
                        if (confirm("Hệ thống sẽ gửi mã khôi phục mật khẩu đến email: mylinh110187@gmail.com và đặt lại mật khẩu tạm thời của bạn về mặc định. Bạn có muốn tiếp tục?")) {
                          const prevText = adminPassword;
                          setAdminPassword("Đang gửi...");
                          try {
                            await fetch("/api/admin/forgot-password", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ email: "mylinh110187@gmail.com" })
                            });
                          } catch (e) {
                            console.error(e);
                          }
                          
                          // Force reset state & localStorage
                          localStorage.setItem("van_moc_admin_password", "vanmoc2026");
                          setAdminSavedPassword("vanmoc2026");
                          setAdminPassword("");
                          
                          alert("✓ Đã gửi yêu cầu khôi phục thành công!\n\nHướng dẫn khôi phục đã được gửi tới Gmail: mylinh110187@gmail.com.\n\nMật khẩu tạm thời của bạn lúc này đã được đặt lại là: vanmoc2026\n\nHãy nhập 'vanmoc2026' vào ô mật khẩu để đăng nhập hệ thống.");
                        }
                      }}
                      className="text-[11px] text-stone-400 hover:text-stone-600 underline cursor-pointer transition-colors"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                </div>
              ) : (
                /* LOGGED IN MERCHANT CONSOLE */
                <div className="flex flex-col md:flex-row min-h-[480px]">
                  
                  {/* Left sub-navigation */}
                  <div className="md:w-1/4 bg-stone-50 border-r border-stone-200 p-4 space-y-1">
                    <div className="text-[10px] uppercase font-mono tracking-wider text-stone-400 font-semibold px-2 mb-2">Tính năng</div>
                    <button
                      onClick={() => {}}
                      className="w-full text-left px-3 py-2 text-xs font-medium rounded-lg bg-[#5A5A40]/10 text-[#5A5A40] flex items-center gap-2"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>Cài đặt Tài khoản QR</span>
                    </button>
                  </div>

                  {/* Right sub-panel content */}
                  <div className="md:w-3/4 p-6 space-y-6 overflow-y-auto max-h-[500px]">
                    
                    {/* CUSTOMIZE BANK ACCOUNT CONFIG FOR VIETQR */}
                    <div>
                      <h4 className="font-serif font-bold text-sm text-stone-850 mb-3 uppercase tracking-wider border-b border-stone-100 pb-2">
                        Thiết lập thông tin tài khoản nhận gieo duyên
                      </h4>
                      <p className="text-xs text-stone-500 leading-relaxed mb-4">
                        Thiết lập ngân hàng và số điện thoại của bạn tại đây để hệ thống tự sinh mã QR thanh toán động (VietQR) tương thích cho khách hàng quét tự động khi đặt mua.
                      </p>

                      <div className="space-y-4 max-w-md">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-semibold mb-1">
                            Chọn ngân hàng thụ hưởng *
                          </label>
                          <select
                            value={editPaymentConfig.bankId}
                            onChange={(e) => setEditPaymentConfig({ ...editPaymentConfig, bankId: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white text-stone-800"
                          >
                            <option value="mbbank">MB Bank (Ngân hàng Quân đội)</option>
                            <option value="vietcombank">Vietcombank</option>
                            <option value="techcombank">Techcombank</option>
                            <option value="acb">ACB (Á Châu)</option>
                            <option value="bidv">BIDV</option>
                            <option value="vietinbank">VietinBank</option>
                            <option value="agribank">Agribank (Nông nghiệp)</option>
                            <option value="vpbank">VPBank</option>
                            <option value="tpbank">TPBank</option>
                            <option value="sacombank">Sacombank</option>
                            <option value="vib">VIB</option>
                            <option value="shb">SHB</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-semibold mb-1">
                            Số tài khoản / SĐT nhận tiền *
                          </label>
                          <input
                            type="text"
                            placeholder="Số tài khoản ngân hàng hoặc SĐT liên kết..."
                            value={editPaymentConfig.bankAccountNo}
                            onChange={(e) => setEditPaymentConfig({ ...editPaymentConfig, bankAccountNo: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white text-stone-800"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-stone-500 font-semibold mb-1">
                            Họ tên chủ tài khoản (Viết hoa không dấu) *
                          </label>
                          <input
                            type="text"
                            placeholder="NGUYEN THI MY LINH"
                            value={editPaymentConfig.bankAccountName}
                            onChange={(e) => setEditPaymentConfig({ ...editPaymentConfig, bankAccountName: e.target.value.toUpperCase() })}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white text-stone-800"
                          />
                        </div>

                        <button
                          onClick={() => {
                            if (!editPaymentConfig.bankAccountNo.trim() || !editPaymentConfig.bankAccountName.trim()) {
                              alert("Vui lòng nhập đầy đủ Số tài khoản và Tên tài khoản.");
                              return;
                            }
                            savePaymentConfig(editPaymentConfig);
                            alert("Cấu hình tài khoản nhận tiền đã được lưu thành công!");
                          }}
                          className="px-6 py-2 bg-[#5A5A40] text-white hover:bg-[#484833] rounded-xl text-xs font-bold uppercase tracking-wider"
                        >
                          Lưu cấu hình tài khoản
                        </button>
                      </div>

                      {/* THAY ĐỔI MẬT KHẨU QUẢN TRỊ */}
                      <div className="border-t border-stone-200/60 pt-4 mt-6">
                        <h5 className="block text-[10px] uppercase tracking-wider text-stone-500 font-semibold mb-2">
                          Thay đổi mật khẩu quản trị
                        </h5>
                        <p className="text-[11px] text-stone-400 mb-2 leading-relaxed">
                          Mật khẩu bảo mật hiện tại đang hoạt động trên trình duyệt này. Nhập mật khẩu mới bên dưới để cập nhật bảo mật cho hệ thống quản trị của bạn.
                        </p>
                        <div className="flex gap-2 max-w-md">
                          <input
                            type="password"
                            placeholder="Mật khẩu mới..."
                            value={newAdminPasswordInput}
                            onChange={(e) => setNewAdminPasswordInput(e.target.value)}
                            className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#5A5A40] bg-white text-stone-800"
                          />
                          <button
                            onClick={() => {
                              if (!newAdminPasswordInput.trim()) {
                                alert("Vui lòng nhập mật khẩu mới.");
                                return;
                              }
                              localStorage.setItem("van_moc_admin_password", newAdminPasswordInput.trim());
                              setAdminSavedPassword(newAdminPasswordInput.trim());
                              setNewAdminPasswordInput("");
                              alert("Đã thay đổi mật khẩu quản trị thành công!");
                            }}
                            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border border-stone-300/40 cursor-pointer"
                          >
                            Đổi mật khẩu
                          </button>
                        </div>
                      </div>

                      {/* SAO LƯU TOÀN BỘ DỰ ÁN (CHỈ QUẢN TRỊ VIÊN) */}
                      <div className="border-t border-stone-200/60 pt-4 mt-6">
                        <h5 className="block text-[10px] uppercase tracking-wider text-stone-500 font-semibold mb-1.5">
                          Tải xuống mã nguồn dự án (.ZIP)
                        </h5>
                        <p className="text-[11px] text-stone-400 mb-2 leading-relaxed">
                          Tải về bản sao lưu đầy đủ của mã nguồn trang web để dễ dàng xuất bản lên Vercel / GitHub hoặc lưu trữ dự phòng riêng tư.
                        </p>
                        <button
                          onClick={handleDownloadZip}
                          disabled={isDownloadingZip}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 hover:bg-[#5A5A40] hover:text-white hover:border-[#5A5A40] disabled:opacity-50 transition-all duration-300 text-[10px] uppercase tracking-wider font-bold shadow-xs cursor-pointer"
                        >
                          <Download className={`w-3.5 h-3.5 ${isDownloadingZip ? 'animate-spin' : 'animate-bounce'}`} />
                          <span>{isDownloadingZip ? 'Đang nén dự án...' : 'Tải Toàn Bộ Dự Án (.ZIP)'}</span>
                        </button>
                      </div>
                    </div>

                    {/* VIEW ORDER HISTORY & MANAGE STATUS */}
                    <div className="border-t border-stone-100 pt-6">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-serif font-bold text-sm text-stone-850 uppercase tracking-wider">
                          Đơn đăng ký gieo duyên ({orders.length})
                        </h4>
                        {orders.length > 0 && (
                          <button
                            onClick={() => {
                              if (confirm("Bạn có chắc chắn muốn xóa tất cả lịch sử đơn gieo duyên?")) {
                                saveOrders([]);
                              }
                            }}
                            className="text-[10px] text-red-600 hover:underline uppercase tracking-wider font-semibold"
                          >
                            Xóa hết đơn hàng
                          </button>
                        )}
                      </div>

                      {orders.length > 0 ? (
                        <div className="space-y-4">
                          {orders.map((ord: any) => (
                            <div key={ord.id} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                              <div className="flex flex-wrap justify-between items-start gap-2 border-b border-stone-200/60 pb-2">
                                <div>
                                  <strong className="text-xs text-[#5A5A40] font-mono">{ord.id}</strong>
                                  <span className="text-[10px] text-stone-400 block font-mono">{ord.date}</span>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                  ord.status === "paid" ? "bg-emerald-100 text-emerald-800" :
                                  ord.status === "shipped" ? "bg-blue-100 text-blue-800" :
                                  ord.status === "cancelled" ? "bg-red-100 text-red-800" :
                                  "bg-amber-100 text-amber-800"
                                }`}>
                                  {ord.status === "paid" ? "Đã thanh toán" :
                                   ord.status === "shipped" ? "Đã gửi hàng" :
                                   ord.status === "cancelled" ? "Đã hủy" :
                                   "Chờ thanh toán"}
                                </span>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed text-stone-700">
                                <div>
                                  <span className="text-stone-400 font-medium">Khách hàng:</span> <strong className="text-stone-800">{ord.customerName}</strong>
                                  <br />
                                  <span className="text-stone-400 font-medium">Số điện thoại:</span> <span className="text-stone-800 font-mono">{ord.customerPhone}</span>
                                  <br />
                                  <span className="text-stone-400 font-medium">Địa chỉ:</span> <span className="text-stone-700">{ord.customerAddress}</span>
                                </div>
                                <div>
                                  <span className="text-stone-400 font-medium">Sản phẩm:</span>
                                  <div className="space-y-1">
                                    {ord.items?.map((item: any) => (
                                      <div key={item.id} className="text-[11px] font-medium text-stone-850">
                                        • {item.name} <span className="text-stone-500 font-mono">x{item.quantity}</span>
                                      </div>
                                    ))}
                                  </div>
                                  <span className="text-stone-400 font-medium">Tổng thu:</span> <strong className="text-stone-850 font-mono text-sm">{ord.totalPrice?.toLocaleString("vi-VN")} đ</strong>
                                </div>
                              </div>

                              {ord.customerNote && (
                                <div className="p-2 bg-white rounded-lg border border-stone-200/60 text-xs text-stone-600 italic">
                                  <strong>Ghi chú viết tay tặng lá bài:</strong> “{ord.customerNote}”
                                </div>
                              )}

                              {/* Action controls */}
                              <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-200/60">
                                <button
                                  onClick={() => {
                                    const updated = orders.map((o: any) => o.id === ord.id ? { ...o, status: "paid" } : o);
                                    saveOrders(updated);
                                  }}
                                  className="px-2 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 rounded text-[10px] font-semibold"
                                >
                                  Đã thanh toán
                                </button>
                                <button
                                  onClick={() => {
                                    const updated = orders.map((o: any) => o.id === ord.id ? { ...o, status: "shipped" } : o);
                                    saveOrders(updated);
                                  }}
                                  className="px-2 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 rounded text-[10px] font-semibold"
                                >
                                  Đã giao hàng
                                </button>
                                <button
                                  onClick={() => {
                                    const updated = orders.map((o: any) => o.id === ord.id ? { ...o, status: "cancelled" } : o);
                                    saveOrders(updated);
                                  }}
                                  className="px-2 py-1.5 bg-red-50 text-red-800 border border-red-200 hover:bg-red-100 rounded text-[10px] font-semibold"
                                >
                                  Hủy đơn
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm("Xóa đơn hàng này khỏi dữ liệu?")) {
                                      const updated = orders.filter((o: any) => o.id !== ord.id);
                                      saveOrders(updated);
                                    }
                                  }}
                                  className="ml-auto p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded"
                                  title="Xóa đơn"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-10 bg-stone-50 rounded-xl border border-dashed border-stone-300 text-xs text-stone-400 italic">
                          Chưa có đơn gieo duyên nào được đặt tại đây.
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <EbookReader
        isOpen={isEbookReaderOpen}
        onClose={() => setIsEbookReaderOpen(false)}
        isUnlocked={isEbookUnlocked}
        onCheckout={() => {
          setIsEbookReaderOpen(false);
          handleOpenEbookCheckout();
        }}
      />
    </div>
  );
}
