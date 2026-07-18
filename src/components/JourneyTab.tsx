import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Heart, Sparkles, BookOpen, ChevronRight } from "lucide-react";
import { JourneyStepId, JourneyStep } from "../types";

interface JourneyTabProps {
  onSelectPrompt: (prompt: string, category: string) => void;
}

export default function JourneyTab({ onSelectPrompt }: JourneyTabProps) {
  const [activeStep, setActiveStep] = useState<JourneyStepId>("hieu_minh");

  const steps: JourneyStep[] = [
    {
      id: "hieu_minh",
      title: "1. Hiểu mình",
      subtitle: "Gốc rễ của mọi sự trưởng thành",
      content: `Mình tin rằng một người chỉ thật sự bắt đầu trưởng thành khi dám nhìn lại chính mình một cách trung thực, không đổ lỗi hoàn toàn cho hoàn cảnh, không né tránh những vết thương cũ, không chỉ hỏi “tại sao người khác đối xử với mình như vậy”, mà bắt đầu hỏi sâu hơn: trong chuyện này, mình đang sợ điều gì, mình đang bám víu vào điều gì, mình đang lặp lại khuôn mẫu nào, bài học nào cuộc sống đang muốn mình nhìn thấy, và nếu bình tĩnh hơn, mình có thể chọn cách phản ứng khác không. 

Hiểu mình không phải là tự phân tích đến kiệt sức, cũng không phải là moi lại quá khứ để trách mình hay trách người, mà là học cách quan sát bản thân bằng sự tỉnh thức. Khi hiểu mình, bạn sẽ nhận ra có những nỗi buồn không đến từ hiện tại, mà đến từ một phần bên trong chưa từng được lắng nghe; có những cơn giận không hẳn vì người khác sai, mà vì mình đã chịu đựng quá lâu, im lặng quá lâu, hoặc không dám đặt ranh giới; có những lựa chọn tưởng như “vì người khác”, nhưng thật ra lại xuất phát từ nỗi sợ bị bỏ rơi, sợ không được yêu thương, sợ bị đánh giá. 

Khi hiểu mình, bạn không còn sống chỉ bằng phản ứng tự động, bạn bắt đầu có khoảng lặng giữa sự việc và cách mình đáp lại — và chính khoảng lặng đó là nơi sự trưởng thành bắt đầu.`,
      color: "from-amber-100 to-orange-50 border-orange-200/60",
      textColor: "text-amber-900",
      bgClass: "bg-amber-50/50",
      borderClass: "border-amber-200/50",
      accentClass: "bg-amber-600 text-white",
      promptList: [
        "Trong các phản ứng tự động của tôi gần đây, nỗi sợ ngầm nào đang chi phối tôi?",
        "Khuôn mẫu ứng xử nào từ thời thơ ấu đang lặp lại trong các mối quan hệ hiện tại?",
        "Nếu đối diện trung thực nhất, tôi đang cố bám víu lấy kỳ vọng gì?",
      ],
    },
    {
      id: "chua_lanh",
      title: "2. Chữa lành",
      subtitle: "Can đảm quay về nâng niu tổn thương",
      content: `Nhiều người nghĩ chữa lành là một điều gì đó rất mềm yếu, rất xa xỉ, hoặc chỉ dành cho người đang tổn thương nặng, nhưng thật ra ai trong chúng ta cũng có những phần cần được chữa lành: một lời nói từng làm mình đau, một mối quan hệ khiến mình mất niềm tin, một giai đoạn phải gồng lên quá lâu, một tuổi thơ thiếu sự công nhận, một lần thất bại khiến mình không còn dám bắt đầu lại. 

Chữa lành không có nghĩa là quên hết mọi chuyện, mà là khi mình nhớ lại mà không còn bị kéo ngã như trước, là khi mình có thể nhìn vào vết thương cũ và nói: “À, mình đã từng rất đau, nhưng mình không muốn để nỗi đau đó điều khiển cả cuộc đời mình nữa.” 

Chữa lành cũng không phải là né tránh khó khăn bằng những lời tích cực hời hợt, mà là dám đối diện — dám thừa nhận mình mệt, dám thừa nhận mình từng sai, dám nhận ra có những mối quan hệ mình cần buông, có những kỳ vọng mình cần đặt xuống, có những phiên bản cũ của mình cần được cảm ơn rồi nhẹ nhàng đi tiếp. Khi một người bắt đầu chữa lành, họ không nhất thiết trở nên vui vẻ hơn ngay lập tức, nhưng họ sẽ thật hơn, ít gồng hơn, ít phản ứng cực đoan hơn, biết thương mình hơn, và từ đó cũng biết thương người khác một cách sáng suốt hơn.`,
      color: "from-emerald-100 to-teal-50 border-emerald-200/60",
      textColor: "text-emerald-950",
      bgClass: "bg-emerald-50/40",
      borderClass: "border-emerald-200/50",
      accentClass: "bg-emerald-700 text-white",
      promptList: [
        "Tôi đã gồng mình chịu đựng quá lâu vì điều gì? Điều gì tôi cần đặt xuống lúc này?",
        "Hãy viết cho bản thân quá khứ một lời cảm ơn và một lời thả tự do.",
        "Tôi có thể thương yêu bản thân mình ngay cả khi tôi chưa hoàn hảo bằng cách nào?",
      ],
    },
    {
      id: "toa_sang",
      title: "3. Tỏa sáng",
      subtitle: "Vẻ đẹp thuần khiết tự bản tâm",
      content: `Tỏa sáng không phải là trở nên nổi bật nhất trong đám đông, không phải là luôn rạng rỡ, luôn thành công, luôn được ngưỡng mộ. Tỏa sáng, với Vân Mộc, là khi bạn bắt đầu sống đúng với bản sắc của mình: bạn không còn cố gắng gồng lên để giống ai đó, không còn dùng sự hoàn hảo để che đi nỗi sợ, không còn cần quá nhiều sự công nhận bên ngoài để thấy mình có giá trị. 

Bạn biết mình là ai, biết điều gì quan trọng với mình, biết mình cần nuôi dưỡng điều gì, biết mình muốn trao đi giá trị gì cho cuộc đời. Khi bên trong sáng rõ, diện mạo bên ngoài cũng thay đổi — ánh mắt khác đi, cách nói chuyện khác đi, cách chọn trang phục, trang sức, màu son, cách bước vào một căn phòng cũng khác đi, không phải vì bạn đang diễn một vai mới, mà vì bạn đang trở về với khí chất thật của mình. 

Đó là lý do Vân Mộc nhìn làm đẹp, trang sức và phong cách sống như một phần của hành trình phát triển bản thân: son phấn không phải để che đậy, trang sức không phải để phô trương, cái đẹp không phải để chứng minh mình hơn ai, mà là một nghi thức dịu dàng để nhắc mình nhớ rằng mình xứng đáng được chăm sóc, xứng đáng được tỏa sáng, xứng đáng sống một đời có chiều sâu và có vẻ đẹp riêng.`,
      color: "from-amber-50 to-amber-100/50 border-amber-300/40",
      textColor: "text-amber-950",
      bgClass: "bg-yellow-50/30",
      borderClass: "border-yellow-200/40",
      accentClass: "bg-amber-700 text-white",
      promptList: [
        "Khí chất và bản sắc nguyên bản nhất của tôi là gì nếu tôi ngừng cố gắng giống người khác?",
        "Làm sao tôi có thể trân trọng ngoại hình và phong cách sống như một nghi thức chăm sóc thiêng liêng?",
        "Giá trị tốt đẹp nào tôi sẵn sàng lan tỏa cho mọi người xung quanh?",
      ],
    },
  ];

  const currentStep = steps.find((s) => s.id === activeStep)!;

  return (
    <section id="hanh-trinh" className="py-12 md:py-20 border-b border-stone-200 bg-stone-50/50">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-mono tracking-wide text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
            Trọng tâm cốt lõi
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mt-3 font-medium tracking-tight">
            Ba Bước Trở Về Chính Mình
          </h2>
          <p className="text-stone-600 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Hành trình phát triển bản thân tại Vân Mộc được nuôi dưỡng qua ba tầng sâu sắc. Bạn đang ở bước nào trong sự chuyển dịch của cuộc đời?
          </p>
        </div>

        {/* Tab Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10" id="tabs-navigation">
          {steps.map((step) => {
            const isActive = step.id === activeStep;
            return (
              <button
                key={step.id}
                id={`tab-btn-${step.id}`}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center justify-between sm:justify-center gap-3 px-6 py-4 rounded-xl text-left sm:text-center transition-all border duration-300 ${
                  isActive
                    ? "bg-white border-stone-300/80 shadow-md text-stone-900 scale-102"
                    : "bg-stone-100 hover:bg-stone-200/50 border-transparent text-stone-600 hover:text-stone-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  {step.id === "hieu_minh" && <Eye className={`w-5 h-5 ${isActive ? "text-amber-600" : "text-stone-400"}`} />}
                  {step.id === "chua_lanh" && <Heart className={`w-5 h-5 ${isActive ? "text-emerald-600" : "text-stone-400"}`} />}
                  {step.id === "toa_sang" && <Sparkles className={`w-5 h-5 ${isActive ? "text-amber-600" : "text-stone-400"}`} />}
                  <div>
                    <div className="font-serif font-medium text-sm md:text-base leading-tight">{step.title}</div>
                    <div className="text-xs text-stone-500 font-sans hidden sm:block">{step.id === "hieu_minh" ? "Gốc rễ bên trong" : step.id === "chua_lanh" ? "Dũng khí đối diện" : "Khí chất nguyên bản"}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 sm:hidden" />
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            id={`tab-content-${activeStep}`}
            className={`p-6 md:p-10 rounded-2xl border bg-white shadow-sm transition-colors duration-500 border-stone-200/80`}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className={`p-2.5 rounded-lg ${
                activeStep === "hieu_minh" ? "bg-amber-50 text-amber-700" : activeStep === "chua_lanh" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
              }`}>
                {activeStep === "hieu_minh" && <Eye className="w-6 h-6" />}
                {activeStep === "chua_lanh" && <Heart className="w-6 h-6" />}
                {activeStep === "toa_sang" && <Sparkles className="w-6 h-6" />}
              </span>
              <div>
                <h3 className="text-2xl font-serif font-medium text-stone-800 leading-tight">
                  {currentStep.title}
                </h3>
                <p className="text-xs font-mono text-stone-500 uppercase tracking-wide mt-0.5">
                  {currentStep.subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-stone-700 leading-relaxed text-sm md:text-base whitespace-pre-line font-sans border-b border-stone-100 pb-8 mb-8">
              {currentStep.content}
            </div>

            {/* Guided Prompt Reflection cards inside steps */}
            <div>
              <h4 className="flex items-center gap-2 text-stone-800 font-medium font-serif mb-4 text-base">
                <BookOpen className="w-4 h-4 text-stone-500" />
                Câu hỏi phản chiếu ngẫu hứng
              </h4>
              <p className="text-stone-500 text-xs mb-3 font-sans">
                Chọn một câu hỏi chạm đến bạn nhất để chia sẻ cùng người đồng hành AI Vân Mộc:
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {currentStep.promptList.map((prompt, idx) => (
                  <button
                    key={idx}
                    id={`prompt-btn-${activeStep}-${idx}`}
                    onClick={() => onSelectPrompt(prompt, activeStep)}
                    className="p-4 rounded-xl border border-stone-150 bg-stone-50 hover:bg-white hover:border-stone-300 text-left text-xs md:text-sm text-stone-700 font-sans hover:shadow-sm hover:scale-101 transition-all duration-300 flex flex-col justify-between"
                  >
                    <span className="italic leading-relaxed">“{prompt}”</span>
                    <span className="mt-4 text-[10px] font-mono text-stone-400 flex items-center gap-1 self-end group">
                      Suy ngẫm cùng AI <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
