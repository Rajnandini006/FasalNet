import React, { useState, useRef, useEffect } from 'react';
import { AdvisoryMessage } from '../types';
import { Sparkles, Send, Volume2, VolumeX, Mic, User, Bot, RotateCcw } from 'lucide-react';

interface KisanSathiChatProps {
  language: 'en' | 'hi';
}

export const KisanSathiChat: React.FC<KisanSathiChatProps> = ({ language }) => {
  const isHi = language === 'hi';
  const [messages, setMessages] = useState<AdvisoryMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: 'Namaste Kisan Bhai! I am FasalNet AI Kisan Sathi. Ask me anything about crop cultivation, mandi prices, fertilizer calculations, disease control, or government schemes (PM-Kisan).',
      hindiText: 'नमस्ते किसान भाई! मैं फसलनेट AI किसान साथी हूँ। आप मुझसे फसल प्रबंधन, मंडी भाव, खाद की संतुलित मात्रा, कीट-रोग या सरकारी योजनाओं (पीएम किसान) के बारे में कोई भी सवाल पूछ सकते हैं।',
      timestamp: 'Just now',
      suggestedActions: [
        'गेहूं में पहली सिंचाई (CRI Stage) कब करें?',
        'सरसों में माहू (Aphids) कीट नियंत्रण के उपाय',
        'पीएम किसान 19वीं किस्त की पात्रता',
        'सोयाबीन के लिए संतुलित NPK अनुपात',
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = isHi ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const generateAnswer = (query: string): { en: string; hi: string } => {
    const q = query.toLowerCase();
    if (q.includes('सिंचाई') || q.includes('irrigation') || q.includes('wheat') || q.includes('गेहूं')) {
      return {
        en: 'For Wheat, the first and most critical irrigation must be done at the Crown Root Initiation (CRI) stage, exactly 20 to 25 days after sowing. Delayed irrigation at this point causes stunted root anchoring and up to 30% yield loss. Apply 1/3 dose of Nitrogen (approx 35 kg Urea per acre) immediately following this watering.',
        hi: 'गेहूं में पहली और सबसे महत्वपूर्ण सिंचाई बुवाई के 20 से 25 दिन बाद "ताज मूल अवस्था" (CRI Stage) पर अनिवार्य रूप से करनी चाहिए। इस समय सिंचाई में देरी से जड़ें कमजोर रह जाती हैं और पैदावार में 25-30% की गिरावट आ सकती है। सिंचाई के ठीक बाद प्रति एकड़ 30-35 किलोग्राम यूरिया का पहला टॉप-ड्रेसिंग छिड़काव करें।',
      };
    }
    if (q.includes('सरसों') || q.includes('mustard') || q.includes('माहू') || q.includes('aphid')) {
      return {
        en: 'For Mustard Aphid (Mahoo) control: When you notice 10-15 aphids per 10cm terminal twig, spray Dimethoate 30% EC @ 1.5 ml/L OR Imidacloprid 17.8% SL @ 0.5 ml per litre of water. Spray during afternoon hours to protect beneficial honeybee pollinators.',
        hi: 'सरसों में चेपा/माहू (Aphid) कीट नियंत्रण हेतु: जब मुख्य तने की ऊपरी 10 सेमी शाखा पर 15-20 माहू दिखें, तो डाइमेथोएट 30% EC (रोगोर) @ 1.5 मिली/लीटर या इमिडाक्लोप्रिड 17.8% SL @ 0.5 मिली/लीटर पानी में घोलकर छिड़कें। छिड़काव दोपहर बाद करें ताकि मधुमक्खियों को नुकसान न पहुंचे।',
      };
    }
    if (q.includes('kisan') || q.includes('pm') || q.includes('किस्त') || q.includes('installment')) {
      return {
        en: 'Under the PM-KISAN scheme, eligible landholding farmer families receive ₹6,000 per year in three equal 4-monthly installments of ₹2,000 directly into Aadhaar-seeded bank accounts. To ensure uninterrupted receipt: 1) Complete e-KYC via PM-Kisan portal or face authentication app, 2) Ensure Land Seeding status is "Yes", 3) Verify Aadhaar is linked to NPCI bank account.',
        hi: 'पीएम-किसान योजना के तहत पात्र किसान परिवारों को प्रतिवर्ष ₹6,000 की आर्थिक सहायता ₹2,000 की तीन समान किस्तों में सीधे आधार-सीडेड बैंक खाते में दी जाती है। किस्त प्राप्त करने हेतु: 1) पोर्टल पर e-KYC पूर्ण रखें, 2) भू-अभिलेख सत्यापन (Land Seeding) "Yes" होना चाहिए, 3) बैंक खाते में NPCI आधार डीबीटी सक्रिय हो।',
      };
    }
    if (q.includes('npk') || q.includes('खाद') || q.includes('fertilizer') || q.includes('urea')) {
      return {
        en: 'For balanced crop nutrition, avoid excessive Urea use. General thumb-rule NPK ratio is 4:2:1 for cereals (Wheat/Rice) and 1:2:1 or 2:4:1 for pulses and oilseeds. Always incorporate single super phosphate (SSP) for oilseeds as it provides 11% essential Sulphur for higher oil percentage.',
        hi: 'संतुलित पोषण के लिए यूरिया का अंधाधुंध उपयोग न करें। अनाज वाली फसलों के लिए आदर्श NPK अनुपात 4:2:1 तथा दलहन/तिलहन के लिए 1:2:1 अथवा 2:4:1 होना चाहिए। तिलहनी फसलों (सरसों/सोयाबीन) में एसएसपी (सिंगल सुपर फॉस्फेट) का उपयोग अवश्य करें क्योंकि इसमें 11% सल्फर होता है जो दानों में तेल की मात्रा 3-4% बढ़ा देता है।',
      };
    }
    return {
      en: 'FasalNet Agronomy Intelligence recommends: Keep your field soil tested every 2 years. Maintain optimum plant spacing, certified hybrid seeds, and monitor soil moisture before applying granular fertilizers for maximum cost efficiency.',
      hi: 'फसलनेट कृषि विशेषज्ञ की सलाह: हर 2 वर्ष में खेत की मृदा जांच (Soil Test) अवश्य कराएं। बीजोपचार करके ही बुवाई करें और संतुलित उर्वरकों का उपयोग करें ताकि आपकी लागत कम हो और शुद्ध मुनाफा अधिक मिले।',
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: AdvisoryMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    setTimeout(() => {
      const answer = generateAnswer(query);
      const botMsg: AdvisoryMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: answer.en,
        hindiText: answer.hi,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
    }, 700);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs flex flex-col h-[640px]">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center">
            <Bot className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base font-display">
              {isHi ? 'AI किसान साथी (कृषि परामर्श)' : 'AI Kisan Sathi (Voice & Multilingual Advisory)'}
            </h3>
            <div className="flex items-center gap-2 text-xs text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isHi ? 'सक्रिय 24x7 कृषि विशेषज्ञ' : 'Active 24x7 Agronomy Model'}</span>
            </div>
          </div>
        </div>

        {/* Reset Chat */}
        <button
          onClick={() => {
            window.speechSynthesis?.cancel();
            setIsSpeaking(false);
            setMessages([
              {
                id: 'm-reset',
                sender: 'assistant',
                text: 'Namaste! How may I assist your farm today?',
                hindiText: 'नमस्ते किसान भाई! आज आपकी फसल के लिए क्या जानकारी चाहिए?',
                timestamp: 'Just now',
                suggestedActions: [
                  'गेहूं में पहली सिंचाई (CRI Stage) कब करें?',
                  'सरसों में माहू कीट नियंत्रण',
                  'पीएम किसान 19वीं किस्त',
                ],
              },
            ]);
          }}
          className="p-2 text-emerald-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          title="Reset conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const displayText = isHi && msg.hindiText ? msg.hindiText : msg.text;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs ${
                  isUser
                    ? 'bg-slate-900 text-white'
                    : 'bg-emerald-700 text-white shadow-xs'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[82%] sm:max-w-[75%] space-y-2`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isUser
                      ? 'bg-slate-900 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none'
                  }`}
                >
                  <p>{displayText}</p>

                  {!isUser && (
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      <button
                        onClick={() => speakText(displayText)}
                        className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{isHi ? 'सुनें (Listen)' : 'Listen'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Suggested Action Chips */}
                {msg.suggestedActions && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedActions.map((action, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(action)}
                        className="px-2.5 py-1 text-xs text-slate-700 bg-white hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200 rounded-lg shadow-2xs transition-colors text-left"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
            <span>FasalNet AI is analyzing agronomic data...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isHi
                ? 'अपनी फसल या समस्या के बारे में पूछें...'
                : 'Ask about irrigation, pest control, mandi rates, or fertilizer...'
            }
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
