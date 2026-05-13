import { useState, useEffect } from 'react';
import { BookOpen, Calculator, FileText, CheckCircle, TrendingUp, AlertTriangle, ChevronRight, ChevronLeft, Award, Search, Home, Menu, X, Lock, Library, BookMarked, Waves, BarChart3, Globe, Shield, Brain, Flame, Ruler, Hash, RefreshCw, ArrowUp, ArrowDown, NotebookPen, Plus, Trash2 } from 'lucide-react';

export default function TradingApp() {
  const [view, setView] = useState('home');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [glossarySearch, setGlossarySearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [trades, setTrades] = useState([]);
  const [addingTrade, setAddingTrade] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('trading101_progress');
      if (raw) setProgress(JSON.parse(raw));
      const tradesRaw = localStorage.getItem('trading101_trades');
      if (tradesRaw) setTrades(JSON.parse(tradesRaw));
    } catch (e) {}
  }, []);

  const saveProgress = (newProgress) => {
    setProgress(newProgress);
    try {
      localStorage.setItem('trading101_progress', JSON.stringify(newProgress));
    } catch (e) { console.error('Save failed', e); }
  };

  const saveTrades = (newTrades) => {
    setTrades(newTrades);
    try {
      localStorage.setItem('trading101_trades', JSON.stringify(newTrades));
    } catch (e) { console.error('Save failed', e); }
  };

  const addTrade = (trade) => {
    const newTrade = { ...trade, id: Date.now().toString() };
    saveTrades([newTrade, ...trades]);
  };

  const deleteTrade = (id) => {
    saveTrades(trades.filter(t => t.id !== id));
  };

  // ============ LESSONS (Анхан шат + Elliott + Candlestick) ============
  const lessons = [
    {
      id: 'intro',
      title: 'Арилжаа гэж юу вэ?',
      icon: TrendingUp,
      level: 'Анхан шат',
      steps: [
        { title: 'Арилжааны үндэс', content: 'Арилжаа (Trading) гэдэг нь санхүүгийн хөрөнгө — хувьцаа, валют, түүхий эд, крипто валют зэргийг — үнийн өөрчлөлтөөс ашиг олох зорилгоор худалдан авах, зарах үйл ажиллагаа юм.\n\nУрт хугацааны хөрөнгө оруулалтаас (investing) ялгаатай нь арилжаачид богино хугацаанд (минут, цаг, өдөр) ашиг олохыг зорьдог.' },
        { title: 'Арилжааны төрлүүд', content: 'Хувьцаа (Stocks) — Компанийн өмчийн хэсэг\n\nФорекс (Forex) — Валютын хос (USD/EUR гэх мэт)\n\n₿ Крипто валют — Bitcoin, Ethereum болон бусад\n\nТүүхий эд (Commodities) — Алт, нефть, хий\n\nИндекс — Зах зээлийн ерөнхий үзүүлэлт (S&P 500 гэх мэт)' },
        { title: 'Арилжааны стилиуд', content: 'Скальпинг — Минут тутамд олон арилжаа\n\nDay Trading — Нэг өдрийн дотор\n\nSwing Trading — Хэдэн өдөр, долоо хоног\n\nPosition Trading — Сар, жил\n\nАнхлан суралцагчдад Swing эсвэл Position trading-ийг санал болгодог.' }
      ],
      quiz: [
        { q: 'Арилжаа ба хөрөнгө оруулалтын гол ялгаа юу вэ?', options: ['Хугацаа', 'Мөнгөний хэмжээ', 'Брокер', 'Ялгаа байхгүй'], correct: 0 },
        { q: 'Анхлан суралцагчдад аль арилжааны стиль илүү тохиромжтой вэ?', options: ['Скальпинг', 'Day Trading', 'Swing Trading', 'Бүгд адил'], correct: 2 }
      ]
    },
    {
      id: 'market',
      title: 'Зах зээл хэрхэн ажилладаг',
      icon: Globe,
      level: 'Анхан шат',
      steps: [
        { title: 'Эрэлт ба нийлүүлэлт', content: 'Зах зээл дээрх үнэ нь эрэлт ба нийлүүлэлтийн харьцаагаар тогтдог.\n\nХудалдан авагч их → Үнэ өснө\nХудалдагч их → Үнэ буурна\n\nЭнэ бол санхүүгийн зах зээлийн хамгийн үндсэн зарчим.' },
        { title: 'Бирж ба брокер', content: 'Бирж (Exchange) — Худалдаа хийдэг газар (NYSE, NASDAQ, Binance гэх мэт)\n\nБрокер (Broker) — Танд биржид хандах зуучлагч\n\nТа шууд биржтэй харьцдаггүй — брокерээр дамжуулан захиалга өгдөг.' },
        { title: 'Захиалгын төрлүүд', content: 'Market Order — Одоогийн үнээр шууд гүйцэтгэх\n\nLimit Order — Тодорхой үнээр л худалдан авах/зарах\n\nStop Loss — Алдагдлыг хязгаарлах захиалга\n\nTake Profit — Ашиг тогтоох захиалга' }
      ],
      quiz: [
        { q: 'Худалдан авагч олон болоход үнэ юу болох вэ?', options: ['Буурна', 'Өснө', 'Өөрчлөгдөхгүй', 'Зогсоно'], correct: 1 },
        { q: 'Алдагдлыг хязгаарлахад ямар захиалга хэрэглэх вэ?', options: ['Market Order', 'Limit Order', 'Stop Loss', 'Take Profit'], correct: 2 }
      ]
    },
    {
      id: 'terms',
      title: 'Үндсэн нэр томъёо',
      icon: BookOpen,
      level: 'Анхан шат',
      steps: [
        { title: 'Bid, Ask, Spread', content: 'Bid — Худалдан авагчдын санал болгож буй үнэ\n\nAsk — Худалдагчдын шаардаж буй үнэ\n\nSpread — Bid ба Ask-ийн зөрүү\n\nSpread бага байх тусам арилжаачдад ашигтай.' },
        { title: 'Pip, Lot, Leverage', content: 'Pip — Үнийн хамгийн бага өөрчлөлт (форекст 0.0001)\n\nLot — Арилжааны хэмжээ (Standard lot = 100,000 нэгж)\n\nLeverage — Хөшүүрэг (1:100 гэвэл 1$-аар 100$-ын арилжаа)\n\nАНХААР: Leverage нь алдагдлыг ч ӨСГӨНӨ! Анхлан суралцагч 1:10-аас илүүг хэрэглэх ёсгүй.' },
        { title: 'Long, Short, Margin', content: 'Long (Buy) — Үнэ өснө гэж бодон худалдан авах\n\nShort (Sell) — Үнэ буурна гэж бодон зарах\n\nMargin — Барьцаа мөнгө\n\nMargin Call — Алдагдал их болж margin хүрэлцэхгүй болбол брокер позицыг хаах.' }
      ],
      quiz: [
        { q: 'Spread гэж юу вэ?', options: ['Ашиг', 'Bid ба Ask-ийн зөрүү', 'Хураамж', 'Leverage'], correct: 1 },
        { q: 'Үнэ буурна гэж бодон ямар арилжаа хийх вэ?', options: ['Long', 'Short', 'Buy', 'Hold'], correct: 1 }
      ]
    },
    {
      id: 'analysis',
      title: 'Техник vs Фундаменталь анализ',
      icon: Search,
      level: 'Анхан шат',
      steps: [
        { title: 'Техник анализ', content: 'Үнийн графикийг судалж, ирээдүйн хөдөлгөөнийг таамаглах арга.\n\nҮндсэн хэрэгслүүд:\n• Trend lines\n• Support & Resistance\n• Indicators (RSI, MACD, MA)\n• Candlestick patterns\n\n"Үнэ бүх зүйлийг тусгадаг" зарчим дээр тулгуурладаг.' },
        { title: 'Фундаменталь анализ', content: 'Компани, эдийн засаг, зах зээлийн жинхэнэ үнэ цэнийг судлах арга.\n\n• Санхүүгийн тайлан\n• Орлого, ашгийн өсөлт\n• GDP, инфляци\n• Төв банкны бодлого\n• Геополитик' },
        { title: 'Аль нь дээр вэ?', content: 'Хоёулаа чухал!\n\nБогино хугацаанд → Техник анализ\nУрт хугацаанд → Фундаменталь анализ\n\nТом арилжаачид хоёуланг нь хослуулан ашигладаг.' }
      ],
      quiz: [
        { q: 'Техник анализ юунд тулгуурладаг вэ?', options: ['Мэдээ', 'Үнийн график', 'Санхүүгийн тайлан', 'Засгийн газар'], correct: 1 },
        { q: 'Урт хугацааны хөрөнгө оруулагчид аль аргыг илүү хэрэглэдэг вэ?', options: ['Техник', 'Фундаменталь', 'Аль нь ч биш', 'Хоёуланг адил'], correct: 1 }
      ]
    },
    {
      id: 'risk',
      title: 'Эрсдэлийн менежмент',
      icon: Shield,
      level: 'Анхан шат',
      steps: [
        { title: 'Хамгийн чухал хичээл', content: 'Энэ бол арилжаачны амжилтын ХАМГИЙН ЧУХАЛ хүчин зүйл.\n\n90% арилжаачид мөнгөө алддаг шалтгаан нь стратеги муу биш, харин эрсдэлийн менежмент муу байдагт оршино.' },
        { title: '1-2% дүрэм', content: 'Алтан дүрэм: Нэг арилжаанд бүхэл данснаасаа 1-2%-иас илүү эрсдэлд оруулж болохгүй.\n\nЖишээ: 1000$ → нэг арилжаанд 10-20$.\n\nЯагаад? 10 удаа алдсан ч данс зөвхөн 10% буурна.' },
        { title: 'Risk/Reward харьцаа', content: 'R:R хамгийн багадаа 1:2 байх ёстой:\n• Эрсдэл: 10$\n• Ашиг: 20$+\n\nЭнэ нь 50%-иас бага амжилттай байсан ч ашигтай байх боломж олгоно!' },
        { title: 'Stop Loss заавал!', content: 'Stop Loss-гүй арилжаа = Тоглоомын газар.\n\nҮргэлж арилжаа нээхээсээ ӨМНӨ:\n1. Stop Loss-оо тогтоо\n2. Take Profit-оо тогтоо\n3. Position size-аа тооцоол\n4. R:R харьцаагаа шалга' }
      ],
      quiz: [
        { q: 'Нэг арилжаанд хэдэн хувийг эрсдэлд оруулах нь зөв вэ?', options: ['10%', '5%', '1-2%', '20%'], correct: 2 },
        { q: 'Хамгийн бага R:R харьцаа хэд байх ёстой вэ?', options: ['1:1', '1:2', '2:1', '1:0.5'], correct: 1 },
        { q: 'Арилжаа нээхээсээ өмнө юу хийх ёстой вэ?', options: ['Найдвар', 'Stop Loss тогтоох', 'Их мөнгө хийх', 'Хүлээх'], correct: 1 }
      ]
    },
    {
      id: 'psychology',
      title: 'Сэтгэл зүйн бэлтгэл',
      icon: Brain,
      level: 'Анхан шат',
      steps: [
        { title: 'Сэтгэл хөдлөл — гол дайсан', content: 'Айдас (Fear)\nШунал (Greed)\nУур (Revenge trading)\nИх зориг (Overconfidence)\n\nЭдгээр сэтгэл хөдлөлийг таних ба хянах нь амжилтын түлхүүр.' },
        { title: 'Арилжааны төлөвлөгөө', content: 'Сайн төлөвлөгөө = Сайн арилжаа\n\n• Хэзээ орох вэ?\n• Хэзээ гарах вэ?\n• Хэр их эрсдэлд орох вэ?\n• Ямар хэрэгсэл арилжаалах вэ?' },
        { title: 'Журнал хөтлөх', content: 'Арилжааны журнал заавал хөтлөх:\n• Огноо, цаг\n• Юу арилжаалсан\n• Яагаад орсон\n• Үр дүн\n• Сэтгэл хөдлөл\n• Сургамж' }
      ],
      quiz: [
        { q: 'Алдагдлыг нөхөхийн тулд илүү эрсдэл авах нь юу гэж нэрлэгддэг вэ?', options: ['Fear trading', 'Revenge trading', 'Smart trading', 'Pro trading'], correct: 1 },
        { q: 'Арилжааны журнал юунд хэрэгтэй вэ?', options: ['Зөвхөн ашиг тэмдэглэх', 'Алдаагаа олж засах', 'Татвар', 'Хэрэггүй'], correct: 1 }
      ]
    },
    // ============ FOREX хичээлүүд (MOT Wealth Academy) ============
    {
      id: 'forex-intro',
      title: 'Форекс гэж юу вэ?',
      icon: '🌍',
      level: 'Анхан шат',
      steps: [
        { title: 'Тодорхойлолт', content: 'Форекс (Forex) = Foreign Exchange — гадаад валютын солилцоо.\n\n💱 Дэлхийн хэмжээний валютын солилцооны зогсолтгүй зах зээл — нэг улсын валютыг өөр улсын валютаар солилцоно.\n\n📊 Орчин үеийн брокеруудаар дамжуулан валютаас гадна:\n• Үнэт металл (алт, мөнгө)\n• Газрын тос, байгалийн хий\n• Индекс (S&P 500, Nasdaq 100)\n• Хувьцаа\n— зэрэг олон үнэт цаасыг арилжаалж болно.' },
        { title: 'Энгийн жишээ — аялал', content: '✈️ Та Монголоос АНУ руу аялах гэж бодъё:\n\n1️⃣ 1000$ авах: USD/MNT 2650 ханшаар → 2,650,000₮ зарлав\n\n2️⃣ Эргээд солих: USD/MNT 3000 ханшаар → 3,000,000₮ авав\n\n💰 350,000₮ цэвэр ашиг! Та өөрөө мэдэлгүй Форекс арилжаа хийж дээ.\n\n💡 Энэ зарчмыг л 1000 удаа давтаад ашиг хийж сурвал — тэрбумтан болох замтай.' },
        { title: '24/5 — зогсолтгүй зах зээл', content: '🌐 Форекс зах зээл 24 цаг, 5 өдөр зогсолтгүй ажилладаг.\n\n📍 Дэлхийн 4 том сесси:\n• 🇦🇺 Sydney — Австралийн сесси\n• 🇯🇵 Tokyo — Азийн сесси\n• 🇬🇧 London — Европын сесси (хамгийн идэвхтэй)\n• 🇺🇸 New York — Америкийн сесси\n\nНэг сесси хаагдмагц дараагийнх нь нээгддэг — таслалтгүй.\n\n💡 London + New York давхцал (15:00–19:00 UTC) = хамгийн их volume, хамгийн сайн боломж.' },
        { title: 'Зах зээлийн хэмжээ', content: '💎 Форекс — дэлхийн ХАМГИЙН ТОМ санхүүгийн зах зээл.\n\n📊 Өдрийн арилжааны эргэлт:\n• Форекс: $5+ их наяд\n• NYSE (Нью Иорк бирж): $22.4 тэрбум\n\n→ Форекс нь NYSE-ээс ~225 дахин том!\n\n💡 Маш өндөр liquidity (хөрвөх чадвар) — та ямар ч хэмжээний position-ыг шууд нээж/хааж чадна, slippage багатай.' }
      ],
      quiz: [
        { q: 'Forex үгийн товчлол юу вэ?', options: ['Foreign Exchange', 'Forward Excellence', 'Future Express', 'Foreign Express'], correct: 0 },
        { q: 'Форекс зах зээл ямар хугацаагаар ажилладаг вэ?', options: ['8 цаг өдөрт', '24/7', '24/5', '12/5'], correct: 2 },
        { q: 'Аль сесси хамгийн идэвхтэй вэ?', options: ['Tokyo', 'Sydney', 'London', 'Цаг бүрт адил'], correct: 2 }
      ]
    },
    {
      id: 'forex-instruments',
      title: 'Форекст юу арилжаалдаг вэ?',
      icon: '💱',
      level: 'Анхан шат',
      steps: [
        { title: 'Гол арилжааны зүйлс', content: 'Форекс зах зээлд гол нь "МӨНГӨ" — өөрөөр хэлбэл валют арилжаалагддаг.\n\n📋 Боломжит хэрэгслүүд:\n• 💵 Валют (Currency pairs)\n• 🥇 Үнэт металл (алт, мөнгө)\n• 🛢️ Газрын тос, хий\n• 📊 Индекс (S&P 500, Nasdaq, DJ30)\n• ₿ Крипто (зарим брокер)\n\n💡 Бид нэг валютыг нөгөөгөөр солих замаар жижиг ханшийн зөрүүнээс ашиг олно.' },
        { title: 'Major Currencies — томоохон валютууд', content: '🌎 Дэлхийн хамгийн их арилжаалагддаг валютууд:\n\n• 🇺🇸 USD — US Dollar (Buck)\n• 🇪🇺 EUR — Euro (Fiber)\n• 🇯🇵 JPY — Japanese Yen (Yen)\n• 🇬🇧 GBP — British Pound (Cable)\n• 🇨🇭 CHF — Swiss Franc (Swissy)\n• 🇨🇦 CAD — Canadian Dollar (Loonie)\n• 🇦🇺 AUD — Australian Dollar (Aussie)\n• 🇳🇿 NZD — New Zealand Dollar (Kiwi)\n\n💡 Тэмдэглэгээ — эхний 2 үсэг улсын товчлол, гурав дахь үсэг валютын эхний үсэг.' },
        { title: 'Яагаад USD хамгийн том вэ?', content: '👑 USD = Форексын хаан — нийт арилжааны 84.9%-д оролцдог.\n\nШалтгаанууд:\n• 🇺🇸 АНУ-ын эдийн засаг #1\n• 💰 Дэлхийн нөөц валют (reserve currency)\n• 🛢️ Газрын тос, бараа таваарыг ам.доллароор үнэлдэг\n• 🏦 Дэлхийн хамгийн том хөрөнгийн зах зээл\n• 🛡️ Хамгийн тогтвортой улс төрийн байдал\n\n💡 EUR хоёрдугаарт — нийт арилжааны ~40%-д оролцдог.' },
        { title: 'Индекс ба бараа таваар', content: '📊 Хамгийн их арилжаалагддаг индексүүд:\n• SP 500 / US 500 — АНУ-ын топ 500 компани\n• DJ 30 / US 30 — АНУ-ын хамгийн том 30 компани\n• NDX 100 / US Tech — Nasdaq 100\n\n🛢️ Бараа таваарын тэмдэглэгээ:\n• XAUUSD / GOLD — Алт (Oz)\n• XAGUSD / SILVER — Мөнгө (Oz)\n• XTIUSD / USOIL — Газрын тос (Barrel)\n• XNGUSD / NGAS — Байгалийн хий (Cubic Feet)\n\n💡 XAU = X (өөр) + AU (Aurum, алтны хими тэмдэг).' }
      ],
      quiz: [
        { q: 'Нийт Форекс арилжааны хэдэн хувийг USD эзэлдэг вэ?', options: ['40%', '60%', '84.9%', '100%'], correct: 2 },
        { q: 'XAUUSD юуны тэмдэглэгээ вэ?', options: ['Мөнгө', 'Алт', 'Хий', 'Тос'], correct: 1 },
        { q: 'AUD валютын хоч (nickname) юу вэ?', options: ['Cable', 'Loonie', 'Aussie', 'Kiwi'], correct: 2 }
      ]
    },
    {
      id: 'forex-structure',
      title: 'Зах зээлийн бүтэц ба шатлал',
      icon: '🏛️',
      level: 'Анхан шат',
      steps: [
        { title: 'Centralized vs Decentralized', content: '🏢 ХУВЬЦААНЫ ЗАХ ЗЭЭЛ — Centralized:\n• Нэг ТӨВ бирж (NYSE, NASDAQ)\n• Зөвхөн нэг газар үнэ тогтоодог\n• Buyer/Seller-ыг нэг "Master of the Universe" зохицуулдаг\n\n🌐 ФОРЕКС ЗАХ ЗЭЭЛ — Decentralized:\n• Олон ТӨВ — банкууд, биржүүд, брокерууд\n• Үнэ нь тэдгээрийн харилцан тохиролцоогоор тогтдог\n• Дэлхийн өнцөг булан бүрт ажилладаг\n\n💡 Тархай бутархай учраас 24/5 зогсолтгүй ажиллах боломжтой.' },
        { title: 'Шатлал — 1: Том банкууд', content: '🏦 Хамгийн дээд шат: Major Banks\n• JPMorgan, Citi, Deutsche Bank, UBS, Goldman Sachs г.м.\n• Хооронд нь EBS (Electronic Brokering Services), Reuters Dealing 3000-аар арилжаалдаг\n• Эдгээр банкуудын арилжаа = нийт зах зээлийн үнийн ГОЛДРИЛ → ханш тогтоох гол хүчин зүйл\n\n🏛️ Дараагийн шат: Medium-sized & Small Banks\n• Олон улсын дунд жижиг банкууд\n• Major banks-ийн ханшаар арилжаалдаг' },
        { title: 'Шатлал — 2: Сан, корпораци, retail', content: '💼 Дараагийн шат:\n• Том сангууд (Hedge Funds, Mutual Funds)\n• Үндэстэн дамжсан корпорациуд (Apple, Toyota г.м. — гадаад валютаар төлбөр хийх шаардлагатай)\n• ECN брокерууд\n\n👤 Хамгийн доод шат: Retail Traders — БИД\n• Том банкуудын "хоолны үлдэгдлийг" хуваалцана\n• Гэвч интернэтийн ачаар одоо том брокеруудын дүйцэхүйц платформ, технологийг ашиглах боломжтой' },
        { title: 'Төв банк ба бодлого', content: '🏛️ Улс орнуудын төв банкууд = ханшид ШУУД нөлөөлдөг.\n\nЖишээ:\n• АНУ-ын Fed бодлогын хүүгээ өсгөвөл → USD ханш өснө\n• Европын төв банк (ECB) Грект тусламж өгсөн → EUR унасан\n\n💡 Хэн ямар нөлөөлөлтэйг мэдэх ёстой:\n• Fed (АНУ), ECB (Европ), BoE (Англи)\n• BoJ (Япон), RBA (Австрали), RBNZ (Шинэ Зеланд)\n\nЭдгээр банкуудын шийдвэр гарах өдрийг тэмдэглэн арилжаа хийх ёсгүй.' }
      ],
      quiz: [
        { q: 'Форекс зах зээл ямар бүтэцтэй вэ?', options: ['Centralized (Төвлөрсөн)', 'Decentralized (Тархай)', 'Хосолсон', 'Бүтэцгүй'], correct: 1 },
        { q: 'EBS юунд хэрэглэдэг вэ?', options: ['Retail trader-ын платформ', 'Том банкуудын хооронд арилжаалах', 'Криптоны бирж', 'Индекс тооцоолох'], correct: 1 },
        { q: 'Дэлхийн зах зээлийн хамгийн дээд шатлалд хэн вэ?', options: ['Retail trader', 'Hedge funds', 'Major banks', 'Брокерууд'], correct: 2 }
      ]
    },
    {
      id: 'forex-pairs',
      title: 'Валютын хослолууд',
      icon: '💵',
      level: 'Анхан шат',
      steps: [
        { title: 'Яагаад хосоороо вэ?', content: 'Валют нь үргэлж өөр валюттай ХАРЬЦСАН байна — өөрөөрөө өөрийнхөө үнийг гаргаж чадахгүй.\n\n💱 Жишээ: 1 EUR = 1.15 USD (EUR/USD = 1.15)\n\nЭнэ нь:\n• 1 евро авахад 1.15 ам.доллар хэрэгтэй\n• Эсвэл 1 евро зарвал 1.15 ам.доллар авна гэсэн үг\n\n💡 Хэзээ нэгэн цагт алт, мөнгөн стандарт байсан. Гэвч 100 шахам жилийн өмнө системээс холдсон тул валютууд хосоороо ханш тогтоодог болсон.' },
        { title: 'Base ба Quote Currency', content: '📐 EUR/USD = 1.15\n\n🥇 BASE CURRENCY (эхний валют): EUR\n• Үнэлэгдэж буй валют\n• Нэг нэгж = 1.00\n\n🥈 QUOTE CURRENCY (хоёр дахь валют): USD\n• Базын үнийг хэлж буй валют\n• 1 EUR-ийн үнэ = 1.15 USD\n\n💡 EUR/USD-ыг "BUY" хийнэ = евро авч, ам.доллар зарж байна гэсэн үг.\n💡 "SELL" хийнэ = евро зарж, ам.доллар авч байна гэсэн үг.' },
        { title: 'Major Currency Pairs', content: '⭐ Major Pairs — бүгдэд нь USD орсон, хамгийн их арилжаалагддаг хослолууд:\n\n• EUR/USD — Euro Dollar\n• USD/JPY — Dollar Yen\n• GBP/USD — Pound Dollar (Cable)\n• USD/CHF — Dollar Swissy\n• USD/CAD — Dollar Loonie\n• AUD/USD — Aussie Dollar\n• NZD/USD — Kiwi Dollar\n\n💡 Шинэ арилжаачинд EUR/USD хамгийн тохиромжтой:\n• Хамгийн өндөр liquidity\n• Хамгийн нарийн spread\n• Хамгийн тогтвортой' },
        { title: 'Cross & Exotic Pairs', content: '🔀 CROSS PAIRS — USD ороогүй major валютуудын хослол:\n• EUR/JPY, GBP/JPY, EUR/GBP, AUD/JPY...\n• Дунд зэрэг spread\n• Илүү volatile\n\n🌶️ EXOTIC PAIRS — major + жижиг улсын валют:\n• USD/TRY (Турк), USD/ZAR (Өмнөд Африк), USD/MXN (Мексик)\n• Маш өргөн spread\n• Эрсдэлтэй, шинэ арилжаачдад тохиромжгүй\n\n💡 Анхлан суралцагч → зөвхөн major pairs, ялангуяа EUR/USD дээр сурахаар эхэл.' }
      ],
      quiz: [
        { q: 'EUR/USD = 1.15 гэхэд аль нь Base Currency вэ?', options: ['EUR', 'USD', 'Хоёулаа', 'Аль нь ч биш'], correct: 0 },
        { q: 'Анхлан суралцагчид аль pair тохиромжтой вэ?', options: ['EUR/USD', 'USD/TRY', 'GBP/JPY', 'USD/ZAR'], correct: 0 },
        { q: 'Major pair юугаараа онцлог вэ?', options: ['Зөвхөн европ валют', 'Бүгдэд нь USD орсон', 'Хамгийн өргөн spread', 'Зөвхөн Азийн валют'], correct: 1 }
      ]
    },
    {
      id: 'forex-quote',
      title: 'Ханшийн мэдээлэл унших',
      icon: '📊',
      level: 'Анхан шат',
      steps: [
        { title: 'Quote-ийн бүрдэл', content: '📐 EUR/USD: 1.0717 / 1.0719\n• Bid: 1.0717\n• Ask: 1.0719\n• Spread: 2 pips\n\n💰 BID PRICE — Зарах үнэ\n  → "Та 1 евроо 1.0717 USD-аар зарж болно"\n\n💵 ASK PRICE — Авах үнэ\n  → "Та 1 евроо 1.0719 USD-аар авч болно"\n\n📏 SPREAD = Ask − Bid = брокерын хураамж' },
        { title: 'Spread юу вэ?', content: '💸 Spread — Ask ба Bid үнийн ЗӨРҮҮ.\n\n• Энэ нь брокерын ашиг = таны үйлчилгээний хөлс\n• Хамгийн нарийн spread → хамгийн ашигтай\n\n📊 Жишээ:\n• EUR/USD: 0.5–1.5 pips (нарийн)\n• EUR/TRY: 50+ pips (өргөн)\n\n💡 Та арилжаа нээмэгц шууд spread-ийн хэмжээгээр алдагдалд орно. Тэгэхээр өсөлт/уналт spread-ийг нөхөж байж л ашиг олно.\n\n⚠️ Шинэ арилжаачин үргэлж spread-ийг нийт зардлын хэсэг болгож тооцох ёстой.' },
        { title: 'Long = Buy', content: '⬆️ LONG = BUY\n\nLONG арилжаанд орно гэдэг = үнэ ӨСНӨ гэж итгэн АВЧ байна гэсэн үг.\n\n💱 EUR/USD дээр LONG хийнэ → Базаа (EUR) худалдан авч, Quote-ыг (USD) зарна.\n\n🐂 Үнэ өснө гэж итгэгчдийг "Bullish" гэдэг — бухын эвэр доошоос дээш цохидог адил.\n\nЖишээ:\n• EUR/USD = 1.1500 → BUY (LONG)\n• Үнэ 1.1600 болсон → 100 pip ашиг 💰\n• Үнэ 1.1400 болсон → 100 pip алдагдал 🩸' },
        { title: 'Short = Sell', content: '⬇️ SHORT = SELL\n\nSHORT арилжаанд орно гэдэг = үнэ БУУРНА гэж итгэн ЗАРЖ байна гэсэн үг.\n\n📉 Үнэтэй байхад зараад → үнэ унасны дараа эргүүлж АВНА → ялгаваргүй ашиг.\n\n💱 EUR/USD дээр SHORT хийнэ → Базаа (EUR) зарж, Quote-ыг (USD) авна.\n\n🐻 Үнэ буурна гэж итгэгчдийг "Bearish" гэдэг — баавгай дээрээс доош сарвуугаараа цохидог адил.\n\n💡 Тэгэхээр Форекст ҮРГЭЛЖ ашиг хийх боломж — өсөлт ч, уналт ч ялгаа байхгүй.' }
      ],
      quiz: [
        { q: 'Spread = ?', options: ['Bid + Ask', 'Ask − Bid', 'Bid − Ask', 'Ask × Bid'], correct: 1 },
        { q: 'Bullish байх гэж юу вэ?', options: ['Үнэ буурна гэж бодох', 'Үнэ өснө гэж бодох', 'Үнэ хөдлөхгүй гэх', 'Зах зээл хаасан'], correct: 1 },
        { q: 'SHORT арилжаанд орно гэдэг юу гэсэн үг вэ?', options: ['Зарж байна', 'Авч байна', 'Хүлээж байна', 'Хаасан'], correct: 0 }
      ]
    },
    {
      id: 'pip-lot',
      title: 'PIP ба Lot',
      icon: '📏',
      level: 'Анхан шат',
      steps: [
        { title: 'PIP гэж юу вэ?', content: '📍 PIP = Price Interest Point — ханшийн ХАМГИЙН СҮҮЛИЙН оронтой цифрийн зөрүү.\n\nЖишээ EUR/USD дээр:\n• 1.1645 → 1.1646 болбол = 1 PIP өсөлт\n• 1.1645 → 1.1644 болбол = 1 PIP уналт\n• 1.1645 → 1.1655 болбол = 10 PIP өсөлт\n\n💡 JPY-ын pair-уудад PIP нь 2 дахь оронтой:\n• USD/JPY = 112.75 → 112.76 = 1 PIP\n• 112.75 → 113.75 = 100 PIP' },
        { title: 'PIP-ийг бодох дадлага', content: '📐 PIP бол ханшийн ХАМГИЙН ЖИЖИГ хөдөлгөөн.\n\n📊 Бусад жишээ:\n• SP500: 2455.1 → 2455.9 = 8 PIP\n• SP500: 2455.1 → 2456.5 = 14 PIP\n\n💡 ПРО арилжаачид "PIP олсон", "PIP алдсан" гэж яриад л байдаг — энэ үгийн утгыг сайн ойлгох ёстой.\n\n📋 Дадлага: Демо данс дээр өөрөө PIP тоолж сурах хэрэгтэй — урцлэлгүй, төөрөгдөлгүй.' },
        { title: 'Lot — арилжааны хэмжээ', content: '📦 LOT = арилжааны хэмжээ. Дөрвөн төрөлтэй:\n\n• Standard Lot — 100,000 нэгж\n• Mini Lot — 10,000 нэгж\n• Micro Lot — 1,000 нэгж\n• Nano Lot — 100 нэгж\n\n💡 1 standard lot EUR/USD худалдаж авах = 100,000 евро авч байна гэсэн үг.\n\n💡 Lot-ыг "Standard, Mini, Micro, Nano" гэж нэрлэх нь — мянгат тоо хэлэхэд илүү амар, ярихад ч төөрөгдөлгүй.\n\n⚠️ Анхааруулга: брокер бүрд үнэт цаасны 1 lot-ын хэмжээ өөр өөр байж болно — заавал шалгах.' },
        { title: 'Жишээ — SP500 ашиг', content: '📊 SP500 худалдан авах жишээ:\n\n1️⃣ SP500/USD = 2750.3 ханштай байгаа.\n   1 standard lot SP500 = 100 нэгж\n   → 100 × $2750.3 = $275,030\n\n2️⃣ Маргааш SP500 = 2753.3 (30 pip ↑)\n   → 100 × $2753.3 = $275,330\n\n💰 Цэвэр ашиг = $275,330 − $275,030 = $300\n\n💡 SP500 ердөө 0.10%-ийн хөдөлгөөнөөр $300 ашиг — энэ бол Lot-ын хүч! Гэвч хэрэв эсрэг чигт явбал — adili хэмжээний АЛДАГДАЛ.\n\n⚠️ Танд $275,030 байхгүй ч Leverage ашиглан энэ арилжаанд орох боломжтой...' }
      ],
      quiz: [
        { q: 'EUR/USD 1.2050 → 1.2055 болсон бол хэдэн PIP өссөн вэ?', options: ['1', '5', '50', '500'], correct: 1 },
        { q: '1 standard lot хэдэн нэгжтэй вэ?', options: ['1,000', '10,000', '100,000', '1,000,000'], correct: 2 },
        { q: 'JPY pair-уудад PIP хэддүгээр оронд байдаг вэ?', options: ['1-р', '2-р', '4-р', '5-р'], correct: 1 }
      ]
    },
    {
      id: 'leverage',
      title: 'Leverage ба Margin',
      icon: '⚡',
      level: 'Анхан шат',
      steps: [
        { title: 'Leverage гэж юу вэ?', content: '⚖️ Leverage (Хөшүүрэг) = брокерын ОЛГОЖ БУЙ ЗЭЭЛ — өөрийн жижиг хөрөнгөөр их хэмжээний арилжаанд орох боломж.\n\n📊 1:100 leverage = $1 тутамд $100-ын арилжаанд орох боломж.\n\nЖишээ:\n• Танд $1000 байгаа\n• 1:100 leverage → $100,000 хүртэл арилжаалж болно\n• Үүний $99,000 нь брокерын зээл\n\n💡 Жижиг ашгийг ИХ БОЛГОДОГ — энэ нь Forex-ийг онцлог болгодог хүчин зүйл.' },
        { title: 'Хүчтэй ашиг — хүчтэй алдагдал', content: '📈 Жишээ — өсөлт:\n• $100,000 EUR/USD арилжаа\n• 0.25% хөдөлсөн → $250 ашиг\n• Өөрийн $1000-аас 25%-ийн ашиг!\n\n📉 Эсрэг тохиолдол:\n• 1% эсрэг хөдөлвөл → $1000 алдагдал\n• БҮХ ХӨРӨНГӨӨ алдана = 100% алдагдал\n\n⚠️ Leverage = ХОЁР ТАЛТАЙ ИЛД!\n\n💡 Шинэ арилжаачинд 1:10-аас илүү leverage хэрэглэх ёсгүй — өндөр leverage = өндөр эрсдэл.' },
        { title: 'Margin ба Margin Call', content: '💼 MARGIN = leverage хэрэглэхэд барьцаалуулдаг өөрийн хөрөнгө.\n\nЖишээ:\n• 1:100 leverage\n• 1 standard lot EUR/USD = $100,000\n• Margin = $1,000 (1% барьцаа)\n\n📞 MARGIN CALL = таны margin хүрэлцэхгүй болоход брокер position-ыг АВТОМАТААР хааж алдагдлыг зогсоох үйлдэл.\n\n⚠️ 1:100-д орсон арилжаа таны эсрэг 1% хөдөлмөгц margin call болно.\n\n💡 Сайн арилжаачин margin-аас ХАЛЬСАН хөрөнгөтэй байж стресс багатай арилжаалдаг.' },
        { title: 'Бусад зардал', content: '💸 Spread-ээс гадна бусад зардлууд:\n\n📅 Swap (Roll-over fee):\n• Position өдөр шилжих үед төлдөг\n• Pair-аас хамаарч + эсвэл − байж болно\n• Зөвхөн интрадэй хийдэг бол үл хамаарна\n\n💸 Commission:\n• Зарим брокер тусдаа commission авдаг\n• ECN брокер: бага spread + commission\n• Market Maker: өргөн spread, commission хураамжгүй\n\n💡 Дансаа сонгохдоо нийт зардлыг (spread + commission + swap) тооцох ёстой.' }
      ],
      quiz: [
        { q: '1:100 leverage = ?', options: ['$1 тутамд $10', '$1 тутамд $100', '$10 тутамд $1', '$100 тутамд $1'], correct: 1 },
        { q: 'Margin Call хэзээ үүсэх вэ?', options: ['Ашигтай үед', 'Margin хүрэлцэхгүй болоход', 'Сар бүрд', 'Pip 100 болоход'], correct: 1 },
        { q: 'Анхлан суралцагчид аль leverage тохиромжтой вэ?', options: ['1:1000', '1:500', '1:100', '1:10 ба түүнээс бага'], correct: 3 }
      ]
    },
    {
      id: 'order-types',
      title: 'Захиалгын төрлүүд',
      icon: '📋',
      level: 'Анхан шат',
      steps: [
        { title: 'Market Order', content: '⚡ MARKET ORDER → ОДОО байгаа хамгийн боломжит үнээр шууд биелдэг захиалга.\n\nЖишээ: EUR/USD Bid 1.1540, Ask 1.1542 байхад\n• BUY Market Order → 1.1542-аар нано-секундэд авна\n\n✅ ДАВУУ: Хурдан биелэлт\n❌ СУЛ: Slippage эрсдэл — таны харсан үнээс өөр үнээр биелж болно\n\n💡 Slippage — өндөр volatility эсвэл шинэ мэдээ гарсан үед түгээмэл. Тийм үед Market Order ашиглахгүй байх нь зөв.' },
        { title: 'Limit Orders', content: '🎯 LIMIT ORDER = тодорхой үнэд хүрвэл л биелдэг захиалга.\n\n📉 BUY LIMIT — одоогийн үнээс ДООР, "арай хямдаар авъя" гэх үед:\n   Жишээ: SP500 одоо 2500.5 → BUY LIMIT @ 2490.5 (унавал хямдаар авна)\n\n📈 SELL LIMIT — одоогийн үнээс ДЭЭР, "өндөр үнээр зарья" гэх үед:\n   Жишээ: SP500 одоо 2500 → SELL LIMIT @ 2510.5 (өсөх юм бол өндөр үнээр зарна)\n\n💡 Limit Order та компьютер дээрээ суугаагүй ч хүссэн үнэд хүрэхэд автоматаар биелнэ.' },
        { title: 'Stop Entry Orders', content: '🚀 STOP ORDER = тодорхой үнээс ХЭТЭРВЭЛ биелдэг (breakout арилжаалах үед):\n\n📈 BUY STOP — одоогийн үнээс ДЭЭР, "энэ үнийг давсаар үргэлжлэн өсвөл авъя" гэх үед:\n   Жишээ: SP500 одоо 2560 → BUY STOP @ 2561 (resistance давсан тохиолдолд авна)\n\n📉 SELL STOP — одоогийн үнээс ДООР, "энэ үнийг доош сэтэлвэл үргэлжлэн унана" гэх үед:\n   Жишээ: SP500 одоо 2490 → SELL STOP @ 2489.5 (support сэтэлсэн тохиолдолд зарна)\n\n💡 Limit vs Stop ялгаа:\n• Limit = "хямдаар АВЪЯ / үнэтэй ЗАРЬЯ" → retracement стратеги\n• Stop = "цаашид өсвөл АВЪЯ / цаашид унавал ЗАРЬЯ" → breakout стратеги' },
        { title: 'Stop Loss — амь насны захиалга', content: '🛡️ STOP LOSS — алдагдлыг хязгаарлах захиалга. ЗААВАЛ хэрэглэх!\n\n🔴 SELL STOP LOSS — Long position-ыг хамгаална:\n  • Long хийсэн → үнэ доошлон ороход автоматаар зарж гарна\n  • Жишээ: SP500 @ 2561.50 Long → Sell Stop Loss @ 2490.50 → 71 pip-ээр алдагдлыг хязгаарлав\n\n🟢 BUY STOP LOSS — Short position-ыг хамгаална:\n  • Short хийсэн → үнэ дээшлэн өсөхөд автоматаар авч хаана\n  • Жишээ: SP500 @ 2490 Short → Buy Stop Loss @ 2561.50\n\n⚠️ STOP LOSS-ГҮЙ АРИЛЖАА = ТОГЛООМЫН ГАЗАР!\n\n💡 Заавал арилжаа нээх ӨМНӨ Stop Loss-оо тогтоох ёстой. Зах зээлд "хүлээх", "найдах" гэх үг байх ёсгүй.' }
      ],
      quiz: [
        { q: 'Market Order юугаараа онцлог вэ?', options: ['Хүссэн үнээ зааж өгнө', 'Шууд биелдэг', 'Хэзээ ч биелдэггүй', 'Үнэгүй'], correct: 1 },
        { q: 'Үнэ "хямдрахад нь авъя" гэвэл аль захиалга вэ?', options: ['Buy Stop', 'Buy Limit', 'Sell Stop', 'Sell Limit'], correct: 1 },
        { q: 'Long position-ын Stop Loss аль нь вэ?', options: ['Buy Stop Loss', 'Sell Stop Loss', 'Buy Limit', 'Market'], correct: 1 },
        { q: 'Slippage гэж юу вэ?', options: ['Брокерын алдаа', 'Тогтсон үнээс өөр үнээр биелэх', 'Ашиг', 'Хураамж'], correct: 1 }
      ]
    },
    // ============ ПРАКТИК хичээлүүд (Брокер, MT5, TradingView) ============
    {
      id: 'broker-setup',
      title: 'Брокер сонгох ба бүртгүүлэх',
      icon: '🏢',
      level: 'Анхан шат',
      steps: [
        { title: 'Брокер гэж юу вэ?', content: '🤝 Брокер бол ТАН ба зах зээлийн хооронд зуучлагч компани юм.\n\nТа шууд хувьцааны бирж, банктай харьцахгүй — БРОКЕРЭЭР дамжуулан захиалга өгнө.\n\n📋 Брокерын үүрэг:\n• Танд арилжааны платформ өгнө (MetaTrader, cTrader г.м.)\n• Демо данс ҮНЭГҮЙ нээж өгнө\n• Бодит дансны хадгаламжийг хүлээж авна\n• Leverage (хөшүүрэг) олгоно\n• Захиалгыг биржид дамжуулна\n• Spread эсвэл commission хэлбэрээр ашиг олно\n\n💡 Брокергүйгээр та зах зээлд ОРОЛЦОХ БОЛОМЖГҮЙ — тэгэхээр зөв брокер сонгох нь маш чухал.' },
        { title: 'Сайн брокерын 6 шинж', content: '✅ Сайн брокер ийм байх ёстой:\n\n1️⃣ ЗОХИЦУУЛАЛТТАЙ\nFCA (UK), CySEC (Cyprus), ASIC (Australia), FSCA (S.Africa) — эдгээр байгууллагуудаас тусгай зөвшөөрөл авсан\n\n2️⃣ НАРИЙН SPREAD\nEUR/USD дээр 0.5–1.5 pip бол сайн\n\n3️⃣ ХУРДАН EXECUTION\nЗахиалга 100ms-аас бага хугацаанд биелдэг\n\n4️⃣ ДЕМО ДАНС ҮНЭГҮЙ\nХязгааргүй $10,000 виртуал данс\n\n5️⃣ МОНГОЛООС МӨНГӨ ШИЛЖҮҮЛЭХ боломжтой\nVisa/MasterCard, банкны шилжүүлэг, Skrill, USDT\n\n6️⃣ САЙН ХАРИЛЦАГЧИЙН ҮЙЛЧИЛГЭЭ\n24/7 чат, утас\n\n⚠️ ЗАЙЛСХИЙ: "100% guaranteed profit", "robo trader", "double your money" гэх брокерууд — БҮГД ХУДАЛ.' },
        { title: 'Монголд тохирох 5 брокер', content: '🇲🇳 Монголын арилжаачдын ашигладаг найдвартай брокерууд:\n\n1️⃣ EXNESS — exness.com\n• Хамгийн өргөн тархсан\n• Монгол хэлний дэмжлэгтэй\n• Хурдан мөнгө шилжүүлэлт (1-2 цаг)\n• Минимум депозит: $10\n\n2️⃣ XM — xm.com\n• Том брэнд, найдвартай\n• $30 ҮНЭГҮЙ бонус анхны бүртгүүлсэнд\n• Минимум: $5\n\n3️⃣ FBS — fbs.com\n• Монголд маркетинг идэвхтэй\n• Cent данс (хямд орох) байгаа\n• Минимум: $1\n\n4️⃣ IC MARKETS — icmarkets.com\n• Хамгийн нарийн spread (0.0 pip!)\n• ECN брокер, профессионал\n• Минимум: $200\n\n5️⃣ DERIV — deriv.com\n• Synthetic indices (зөвхөн энэ брокер)\n• 24/7 арилжаа (бүх өдөр!)\n\n💡 Энэ хичээлд EXNESS-ээр жишээ нь явна — хамгийн хялбар.' },
        { title: 'Exness-д бүртгүүлэх — 1', content: '📋 АЛХАМ 1: Сайт руу ор\n→ Browser нээ (Chrome зөвлөмжтэй)\n→ Хайлтанд "exness" гэж бичиж эхний линкэнд дар\n→ Эсвэл шууд: https://www.exness.com\n\n📋 АЛХАМ 2: Бүртгүүлэх товч олох\n→ Баруун дээд буланд "Sign Up" эсвэл "Бүртгүүлэх" ШАР товч\n→ Дарна\n\n📋 АЛХАМ 3: Бүртгэлийн форм бөглөх\n→ Country/region: "Mongolia" сонгох\n→ Email: танай гар утсаа холбосон Gmail оруулах\n→ Password: жнь "Forex2026!" — заавал:\n  • 8 ба түүнээс дээш үсэг\n  • Том ба жижиг үсэг\n  • Тоо\n  • Тусгай тэмдэг (!, @, # г.м.)\n→ "I agree to the terms..." гэсэн checkbox-ыг ✓ хий\n→ "Continue" эсвэл "Үргэлжлүүлэх" товч дар\n\n💡 Имэйлээ ЗААВАЛ зөв оруулах — баталгаажуулах код тийшээ очно. Хуурамч имэйл оруулбал данс нээгдэхгүй.' },
        { title: 'Exness-д бүртгүүлэх — 2', content: '📋 АЛХАМ 4: Имэйл баталгаажуулах\n→ Gmail-ээ нээ (mail.google.com)\n→ Exness-ээс ирсэн имэйлийг хайн нээ ("Welcome to Exness" гэх мэт)\n→ Имэйл доторх НОГООН "Confirm Email" товчийг дар\n→ Эсвэл код байвал хуулж сайт дээр буцаагаад оруул\n\n📋 АЛХАМ 5: Personal Area нээгдэх\n→ Та автоматаар "Personal Area" дотор орно\n→ Зүүн талын меню харагдана\n\n📋 АЛХАМ 6: Демо данс үүсгэх\n→ "Open new account" эсвэл "+ New account" товч дар\n→ "Demo account" сонго (⚠️ "Real account" БИШ!)\n→ Платформ: "MetaTrader 5" сонго\n→ Дансны төрөл: "Standard" сонго\n→ Leverage: "1:100" сонго (анхлан суралцагчид)\n→ Эхлэлийн мөнгө: $10,000 (default)\n→ "Create account" дар\n\n📋 АЛХАМ 7: Login мэдээллийг ЗААВАЛ ХАДГАЛ! 🚨\nЭкран дээр гарч ирнэ:\n• 🔢 Login (account number): жнь 12345678\n• 🔑 Password: автоматаар үүсгэгдсэн (жнь Abc12345)\n• 🌐 Server: жнь "Exness-MT5Trial7"\n\nЭдгээр 3-ыг ЦААСАНД БИЧИЖ хадгал! MT5-ыг нэвтрэхэд хэрэгтэй.' }
      ],
      quiz: [
        { q: 'Брокер юунд хэрэгтэй вэ?', options: ['Зөвхөн мөнгө хадгалах', 'Биржтэй холбох зуучлагч', 'Татвар авах', 'Мэдээ нийтлэх'], correct: 1 },
        { q: 'Сайн брокерт ЗААВАЛ байх шинж юу вэ?', options: ['Олон зар сурталчилгаа', 'Зохицуулалттай байх', '100% ашгийн баталгаа', 'Зөвхөн англи хэлтэй'], correct: 1 },
        { q: 'Анх ямар данс нээх ёстой вэ?', options: ['Real account', 'Demo account', 'VIP account', 'Crypto account'], correct: 1 },
        { q: 'Бүртгүүлсний дараа ямар 3 зүйлийг ЗААВАЛ хадгалах вэ?', options: ['Имэйл, нэр, утас', 'Login, Password, Server', 'Карт, нууц үг, IP', 'Юу ч хадгалахгүй'], correct: 1 }
      ]
    },
    {
      id: 'mt5-install',
      title: 'MetaTrader 5 суулгах',
      icon: '💻',
      level: 'Анхан шат',
      steps: [
        { title: 'MT4 vs MT5 — аль нь?', content: '📊 MetaTrader = дэлхийн хамгийн өргөн хэрэглэгддэг арилжааны платформ (95%+ брокер дэмждэг).\n\n🆚 Хоёр хувилбар:\n\n📱 MetaTrader 4 (MT4) — 2005\n• Зөвхөн валют ба CFD\n• Илүү дасгал дадал, олон indicator\n• Энгийн, хөнгөн\n\n📱 MetaTrader 5 (MT5) — 2010\n• Валют + хувьцаа + индекс + крипто\n• Илүү олон timeframe (M2, M3, M10 г.м.)\n• Илүү хурдан, шинэ\n• Илүү олон захиалгын төрөл\n\n💡 ШИНЭЭР эхэлж байгаа бол MT5 СОНГО — ирээдүй нь, илүү боломжтой.\n\n🖥️ Дэмждэг систем:\n• Windows ✅ (хамгийн сайн)\n• macOS ✅\n• Android ✅ (Google Play)\n• iOS ✅ (App Store)\n• Web-version ✅' },
        { title: 'MT5-г татах', content: '📥 АЛХАМ 1: Exness Personal Area руу буцаж ор\n→ exness.com → Login\n→ Зүүн меню дотор "Trading Platforms" эсвэл "Платформууд" дар\n\n📥 АЛХАМ 2: Үйлдлийн системээ сонго\n→ Windows бол → НОГООН "Download for Windows" товч\n→ Mac бол → "Download for macOS"\n→ Android утас → Google Play link\n→ iPhone → App Store link\n\n📥 АЛХАМ 3: Татах\n→ "exness5setup.exe" гэх мэт файл татагдана\n→ ~50MB, ~1-3 минут\n→ Browser-ын доод тулгуурт татаж байгаа progress харагдана\n\n💡 АЛЬТЕРНАТИВ — официал MT5\n→ https://www.metatrader5.com\n→ "Download" товч\n→ Заавал брокерынхоо сайтаас татвал илүү сайн (тохиргоо нь хийгдсэн байдаг).' },
        { title: 'MT5 суулгах', content: '⚙️ АЛХАМ 1: Татсан файлаа ажиллуулах\n→ Browser-ын Downloads хавтас руу ор (Ctrl+J)\n→ "exness5setup.exe" эсвэл "mt5setup.exe" файл дээр ДАВХАР дар\n\n⚙️ АЛХАМ 2: Windows-ын зөвшөөрөл өгөх\n→ "Windows Defender" эсвэл "User Account Control" цонх гарвал:\n→ "Yes" эсвэл "Run anyway" дар\n→ Энэ нь аюулгүй — Microsoft-аас баталгаажсан суулгац.\n\n⚙️ АЛХАМ 3: Installation Wizard\n→ "Next" эсвэл "Continue" дар\n→ License agreement: "I agree" сонгох\n→ Suulgah газар: default-аар үлдээ\n→ "Install" дар\n→ Хүлээх — ~2 минут (progress bar дүүрэх ёстой)\n→ "Finish" дар\n\n⚙️ АЛХАМ 4: MT5 нээгдэх\n→ Автоматаар нээгдэнэ\n→ Эсвэл desktop дээр "MetaTrader 5" icon давхар дар\n→ Эсвэл Start menu > "MetaTrader 5"\n\n💡 Эхний удаа нээхэд бага зэрэг удаан байж болно (тохиргоо хийгдэж байна).' },
        { title: 'Демо дансанд нэвтрэх', content: '🔐 АЛХАМ 1: Нэвтрэх цонх нээх\n→ MT5 нээхэд эхлээд "Open an Account" цонх гарна\n→ Эсвэл цэснээс: "File" → "Login to Trade Account"\n\n🔐 АЛХАМ 2: Брокер хайх\n→ "Find your broker" хайлтын мөрөнд "Exness" гэж бич\n→ Жагсаалт гарна — Exness-ийн нэрс олон байх:\n  • "Exness-MT5Real" — БОДИТ данс\n  • "Exness-MT5Trial7" — ДЕМО данс ✅\n→ "Exness-MT5Trial7" (эсвэл Trial4, Trial8 — аль нь ч хамаагүй) сонго\n→ "Next" дар\n\n🔐 АЛХАМ 3: Login мэдээлэл оруулах\n→ "Existing trade account" сонго\n→ Login: брокерын өгсөн дугаар (жнь 12345678)\n→ Password: брокерын өгсөн нууц үг (Abc12345 шиг)\n→ "Save account information" ✓ (нууц үгээ хадгална)\n→ "Finish" дар\n\n✅ Амжилттай нэвтэрсэн шинж:\n• MT5-ын доод буланд: "Connected" (НОГООН)\n• Баруун дээд буланд: "$10,000.00" гэсэн balance\n• Зүүн талд EUR/USD, USD/JPY гэх мэт валют гарч ирнэ\n\n❌ "No connection" гарвал:\n→ Login, Password, Server бүгдийг дахин шалга — типографийн алдаа их\n→ Интернэт холболтоо шалга\n→ Сервер нэр зөв сонгосон эсэхийг шалга' }
      ],
      quiz: [
        { q: 'MT5 юу вэ?', options: ['Брокер', 'Арилжааны платформ', 'Валют', 'Indicator'], correct: 1 },
        { q: 'Демо дансанд нэвтрэхэд ямар сервер сонгох вэ?', options: ['Real сервер', 'Demo/Trial сервер', 'Аль нь ч хамаагүй', 'VIP сервер'], correct: 1 },
        { q: 'Амжилттай нэвтэрсэнийг хэрхэн мэдэх вэ?', options: ['Доод буланд "Connected" гарна', 'Дуу гарна', 'Олон цонх нээгдэнэ', 'Имэйл ирнэ'], correct: 0 },
        { q: 'Шинэ арилжаачинд аль платформ зөвлөгдөг вэ?', options: ['MT4', 'MT5', 'cTrader', 'NinjaTrader'], correct: 1 }
      ]
    },
    {
      id: 'first-trade',
      title: 'Анхны арилжаа хийх',
      icon: '🎯',
      level: 'Анхан шат',
      steps: [
        { title: 'MT5-ын интерфейс', content: '🖥️ MT5-г нээхэд таны харах гол 4 хэсэг:\n\n📊 ТӨВ хэсэг — Chart Window (График)\n→ Үнийн график (candlestick) харагдана\n→ Дээд буланд: "EURUSD,M1" гэх мэт нэр\n\n📋 ЗҮҮН ТАЛ — Market Watch\n→ Бүх валют, металл, индексүүд жагсаалттай\n→ Bid (зарах үнэ) | Ask (авах үнэ) — 2 баганатай\n→ Хайхгүй валют байвал: баруун товч → "Symbols" → нэмэх\n\n🗂️ ЗҮҮН ДООД — Navigator\n→ "Accounts" — таны данснууд\n→ "Indicators" — техник индикаторууд\n→ "Expert Advisors" — авто-арилжаа (advanced)\n\n📈 ДООД ХЭСЭГ — Toolbox (Ctrl+T-ээр нээх/хаах)\n→ "Trade" tab — одоо нээлттэй position\n→ "History" — өмнөх арилжааны түүх\n→ "News" — зах зээлийн мэдээ\n\n💡 Эхлээд зөвхөн EUR/USD-ийг л арилжаалаарай — "анхны хайр" болж сурдаг.' },
        { title: 'График нээх', content: '📈 АЛХАМ 1: Market Watch-аас валют сонго\n→ Зүүн талын Market Watch жагсаалтаас "EURUSD" олж дар\n→ Баруун товч → "Chart Window" сонго\n→ Эсвэл "EURUSD"-г графикийн талбар луу drag-and-drop хий\n\n⏱️ АЛХАМ 2: Timeframe сонгох\n→ Дээд тулгуурт байгаа товчнууд:\n• M1 — 1 минут (зөвхөн scalping-д)\n• M5 — 5 минут\n• M15 — 15 минут\n• M30 — 30 минут\n• H1 — 1 цаг\n• H4 — 4 цаг ⭐ зөвлөмжтэй\n• D1 — 1 өдөр ⭐ зөвлөмжтэй\n• W1 — 1 долоо хоног\n\n💡 Шинэ арилжаачинд H4 ба D1 хамгийн тохиромжтой — шуугиан бага, дохио тод.\n\n🕯️ АЛХАМ 3: Candlestick chart болгох\n→ Дээд тулгуурын icon-уудаас лаан icon дар (3 дахь нь)\n→ Эсвэл hotkey: Alt+2\n→ Bar chart, Candlestick chart, Line chart — 3 төрөл\n→ ✅ Candlestick сонгох' },
        { title: 'BUY захиалга өгөх', content: '🛒 АЛХАМ 1: Шинэ захиалга цонх нээх\nГурван арга:\n• F9 товч (хамгийн хурдан)\n• Дээд цэс → "New Order"\n• Графикийн доторх баруун товч → "Trading" → "New Order"\n\n🛒 АЛХАМ 2: Захиалгын форм бөглөх\n→ Symbol: EURUSD (default-аар сонгогдсон байх)\n→ Volume: 0.01 (микро лот — ЗААВАЛ ЖИЖИГЭЭР эхлэх!)\n  ⚠️ 1.0 (Standard) бичих юм бол $100,000 хэмжээтэй болно\n→ Stop Loss: 0 (одоохондоо хоосон үлдээ — дараа тогтооно)\n→ Take Profit: 0 (хоосон)\n→ Type: "Market Execution" — одоо шууд авах\n→ Comment: "Анхны арилжаа" (заавал биш)\n\n🛒 АЛХАМ 3: BUY эсвэл SELL\nХоёр товч гарна:\n• 🔴 "Sell by Market" — үнэ буурна гэж бодвол\n• 🔵 "Buy by Market" — үнэ өснө гэж бодвол\n\n→ "Buy by Market" дар (анхны арилжаа учраас)\n\n✅ "Order placed successfully" гарна\n→ "OK" эсвэл "Close" дар\n\n📊 Доод "Trade" tab-д шинэ position:\n• Symbol: EURUSD\n• Type: buy\n• Volume: 0.01\n• Price: 1.0850 (жишээ)\n• Profit: 0.00 (одоохондоо)' },
        { title: 'Stop Loss + Take Profit тогтоох', content: '🛡️ Position нээснийхээ ДАРАА заавал SL/TP тогтоох ёстой.\n\n📐 ТООЦООЛОЛ — жишээ:\n• EUR/USD-ийг 1.0850-аар BUY хийсэн\n• Stop Loss: 1.0800 (50 pip доош) — алдагдал хязгаар\n• Take Profit: 1.0950 (100 pip дээш) — ашгийн зорилго\n• Risk:Reward = 1:2 ✅ САЙН\n\n🛠️ АЛХАМ 1: Position-ыг өөрчлөх\n→ Toolbox-ын "Trade" tab дотор position дээр БАРУУН товч\n→ "Modify or Delete Order" сонго\n\n🛠️ АЛХАМ 2: SL/TP оруулах\n→ "Stop Loss" талбарт: 1.0800 бич\n→ "Take Profit" талбарт: 1.0950 бич\n→ "Modify" эсвэл "Place" товч дар\n\n✅ Position-ын мөрөнд S/L 1.0800, T/P 1.0950 гарна\n\n💡 Эсвэл графикийн ДЭЭР гар аргаар:\n→ Position-ын шугам график дээр гарна\n→ Шугамыг дээш/доош чирэхэд SL/TP-г хөдөлгөж тогтоох боломжтой\n\n⚠️ Stop Loss-ГҮЙ БҮХ АРИЛЖАА = МАРГААШ ДАНСГҮЙ БОЛОХ ЗАМ!' },
        { title: 'Position хаах ба үр дүн', content: '🔒 АЛХАМ 1: Position хаах\n3 арга бий:\n\n1️⃣ АВТОМАТААР (хамгийн сайн)\n→ SL эсвэл TP үнэд хүрэхэд автоматаар хаагдана\n→ Та хүлээж л байна\n\n2️⃣ ГАР АРГААР × товч\n→ Trade tab дотор position-ын төгсгөлд × товч байна\n→ Тэр × дээр дар → "Close" товч\n\n3️⃣ Цэснээс\n→ Position дээр баруун товч → "Close Position"\n\n🔒 АЛХАМ 2: Үр дүнг харах\n→ "History" tab руу ор\n→ Хаагдсан арилжаа жагсаалттай\n→ Profit багана = $ ашиг/алдагдал\n→ + ногоон = ашиг, − улаан = алдагдал\n\n📋 АЛХАМ 3: Арилжааны журналд тэмдэглэх (ЗААВАЛ!)\nExcel/Google Sheets/дэвтэрт:\n• 📅 Огноо: 2026-05-13\n• 💱 Symbol: EUR/USD\n• ↕️ Чиглэл: BUY эсвэл SELL\n• 💵 Орох үнэ: 1.0850\n• 🎯 Гарах үнэ: 1.0905\n• 📏 Pip: +55\n• 💰 P&L: +$5.50\n• 🧠 Сэтгэл хөдлөл: тайван байсан / гэв сэрэв / айв\n• 📖 Сургамж: Үсрэгдэхгүй цаашаа хүлээсэн нь зөв\n\n💡 Демо дээр 100+ арилжаа хийсний дараа л бодит дансанд орох — энэ бол баатруудын зөвлөмж.' }
      ],
      quiz: [
        { q: 'Market Watch-д юу харагддаг вэ?', options: ['Indicator', 'Валют + ханш жагсаалт', 'Гүйлгээний түүх', 'Мэдээ'], correct: 1 },
        { q: 'Шинэ захиалга нээх hotkey юу вэ?', options: ['F1', 'F9', 'Ctrl+N', 'Esc'], correct: 1 },
        { q: 'Анх арилжаалахдаа ямар volume сонгох вэ?', options: ['1.0 (Standard)', '0.1 (Mini)', '0.01 (Micro)', '10.0'], correct: 2 },
        { q: 'Position-ыг яаж хаах вэ?', options: ['Зөвхөн SL/TP-ээр', 'Гар аргаар × товч', 'Хоёр аргаар хоёулаа', 'Хаах боломжгүй'], correct: 2 }
      ]
    },
    {
      id: 'tradingview-setup',
      title: 'TradingView ашиглах',
      icon: '📈',
      level: 'Анхан шат',
      steps: [
        { title: 'TradingView гэж юу вэ?', content: '📊 TradingView (tradingview.com) — дэлхийн хамгийн алдартай ҮНИЙН ШИНЖИЛГЭЭНИЙ платформ.\n\n🎯 Юунд хэрэглэх вэ?\n• График шинжилгээ хийх\n• Trendline, Fibonacci зурах\n• Indicator (RSI, MACD, MA) тавих\n• Бусад арилжаачдын setup-ыг харах\n• Alert (анхааруулга) тогтоох\n• Backtest хийх (стратегиа сорих)\n\n💡 ЗААЛТА: MT5-аар АРИЛЖАА хийнэ, TradingView-ээр ШИНЖИЛГЭЭ хийнэ.\n\n💰 Үнэ:\n• Basic — ҮНЭГҮЙ (хязгаарлалттай ч хангалттай)\n• Pro: $14.95/сар\n• Pro+: $29.95/сар\n• Premium: $59.95/сар\n\n💡 Эхэлж байгаа бол ҮНЭГҮЙ хувилбар хангалттай. Дараа хэрэгтэй болохдоо upgrade хийж болно.' },
        { title: 'TradingView бүртгүүлэх', content: '📋 АЛХАМ 1: Сайт руу ор\n→ https://www.tradingview.com\n→ Google-аас "tradingview" хайн эхний линкэнд орох ч болно\n\n📋 АЛХАМ 2: Sign Up товч\n→ Баруун дээд буланд "Get started" эсвэл "Sign Up" товч (хөх)\n→ Дарна\n\n📋 АЛХАМ 3: Бүртгэлийн арга сонгох\nХамгийн хурдан 4 сонголт:\n• 🔵 Google account-аар → нэг товч\n• 🔵 Facebook\n• 🍎 Apple ID\n• ✉️ Email + Password (шинээр)\n\n→ "Google" сонгох хамгийн хялбар\n→ Gmail-ээ сонгоод "Allow" дар\n\n📋 АЛХАМ 4: Username сонгох\n→ Хэрэглэгчийн нэр оруулах (жнь: trader_bat, mongolforex88)\n→ "Continue" дар\n\n📋 АЛХАМ 5: Багц сонгох\n→ Олон багц харагдана: Free, Pro, Pro+, Premium\n→ Зүүн доод буланд "Continue with Free" эсвэл "Skip" — олж дар\n→ ҮНЭГҮЙ-г сонго\n\n✅ Бүртгэл дууссан — нүүр хуудас нээгдэнэ.' },
        { title: 'Анхны график нээх', content: '📈 АЛХАМ 1: Chart руу очих\n→ Дээд цэс → "Products" → "Supercharts"\n→ Эсвэл шууд: https://www.tradingview.com/chart\n\n🔍 АЛХАМ 2: Символ хайх\n→ Графикын зүүн дээд буланд хайлтын мөр (лупа icon)\n→ "EURUSD" гэж бич\n→ Жагсаалтаас "FX:EURUSD" сонго (FOREX гэсэн tag-тай)\n\n⏱️ АЛХАМ 3: Timeframe сонгох\n→ Дээд тулгуурын товч:\n• 1m, 5m, 15m, 30m\n• 1h, 4h ⭐\n• 1D ⭐ (өдрөөр)\n• 1W (долоо хоног)\n→ H4 эсвэл D1 сонго — шуугиан багатай\n\n🕯️ АЛХАМ 4: Candlestick chart\n→ Дээд буланд chart төрлийн icon\n→ "Candles" эсвэл "Hollow Candles" сонгох (default ийм байх ёстой)\n\n💡 Бэлэн! Та EUR/USD-ийн графикийг харж байна.\n\n🎨 АЛХАМ 5: Темий өөрчлөх (заавал биш)\n→ Баруун дээд → "Settings" icon (gear)\n→ "Appearance" tab\n→ Theme: "Dark" эсвэл "Light"' },
        { title: 'Зурах хэрэгслүүд', content: '✏️ Зүүн талын тулгуурт зургийн хэрэгслүүд:\n\n📏 АЛХАМ 1: Trendline зурах\n→ Зүүн toolbar-аас "Trend Line" icon (// зураас) дар\n→ Графикийн НЭГ цэг дээр дар\n→ Дараагийн цэг рүү чирээд тавь\n→ Trend дагуу шугам зурагдана\n\n📐 АЛХАМ 2: Horizontal line (S/R)\n→ "Horizontal Line" icon (- хэвтээ шугам)\n→ Чухал үнийн түвшинд дар\n→ Бүтэн графикт хэвтээ шугам гарна\n→ Энэ нь support эсвэл resistance байж болно\n\n🔢 АЛХАМ 3: Fibonacci retracement\n→ Toolbar дээр "Fib Retracement" дар (FIB icon)\n→ Swing low → swing high хүртэл чирнэ\n→ Автоматаар 0%, 23.6%, 38.2%, 50%, 61.8%, 100% шугам зурагдана\n→ Эдгээр түвшин — үнэ буцах магадлалтай газар\n\n📦 АЛХАМ 4: Rectangle (зон тэмдэглэх)\n→ "Rectangle" icon (□)\n→ 2 цэг дарж дөрвөлжин зурна\n→ Supply/Demand зон тэмдэглэхэд хэрэглэдэг\n\n💡 БУЦААЛТ:\n• Ctrl+Z — сүүлийн үйлдэл буцаах\n• Right-click → Object Tree → Delete All — бүгдийг арилгах' },
        { title: 'Indicator нэмэх', content: '📊 АЛХАМ 1: Indicator цонх нээх\n→ Дээд буланд "Indicators" товч (fx icon)\n→ Эсвэл "/" товчлуур дар\n→ Хайлтын цонх нээгдэнэ\n\n🎯 АЛХАМ 2: 3 ГОЛ indicator\n\n🔵 Moving Average (MA)\n→ "Moving Average" хайн дар\n→ "Add" дар\n→ Тохиргоо: Length=20, Source=Close\n→ EMA20 → богино хугацааны тренд\n→ EMA50 → дунд хугацаа\n→ EMA200 → урт хугацаа (хамгийн чухал)\n\n🔴 RSI (Relative Strength Index)\n→ "RSI" хайн дар → "Add"\n→ Тохиргоо: Length=14 (default)\n→ Доод цонхонд гарна\n→ 30-аас доош = oversold (хэт зарагдсан → BUY дохио)\n→ 70-аас дээш = overbought (хэт авагдсан → SELL дохио)\n\n🟢 MACD\n→ "MACD" хайн дар → "Add"\n→ Доод цонхонд histogram + signal line гарна\n→ Кросс хийхэд тренд эргэлтийг харуулна\n\n💡 Нэг зэрэг 2-3 indicator л хэрэглэ — олон болбол төөрөгдөнө.\n\n📌 АЛХАМ 3: Indicator тохируулах\n→ Indicator-ын нэрэн дээр давхар дар\n→ Settings цонх нээгдэнэ\n→ Length, Color, Style өөрчилж болно\n→ "OK" дар' },
        { title: 'Alert тогтоох', content: '🔔 Alert = тодорхой үнэд хүрэхэд анхааруулга өгдөг.\n\n📋 АЛХАМ 1: Alert үүсгэх\n3 арга:\n• График дээрх чухал түвшинд → баруун товч → "Add Alert"\n• Дээд цэс → "Alerts" → "Create Alert"\n• Hotkey: Alt+A\n\n📋 АЛХАМ 2: Alert тохиргоо\n→ Condition:\n  • Symbol: EURUSD\n  • Crossing: 1.1000 (жнь)\n→ Options:\n  • "Only Once" — нэг удаа л\n  • "Every Time" — давтан\n→ Expiration:\n  • Open-ended — хязгааргүй\n  • 1 өдөр, 7 хоног, 1 сар\n→ Alert Actions:\n  • Show pop-up — дэлгэц дээр\n  • Send email — Gmail-руу\n  • Play sound — дуу\n  • Send SMS (Pro+)\n  • Webhook (Premium)\n→ Message: "EUR/USD 1.1000 хүрлээ!" (өөрөө бичих)\n→ "Create" дар\n\n💡 ҮНЭГҮЙ багцанд: нэг зэрэг 3 alert хүртэл.\n\n📱 АЛХАМ 3: Гар утсанд татах\n→ App Store / Google Play-аас "TradingView" татах\n→ Ижил Gmail-ээр нэвтрэх → данс автоматаар sync\n→ Alert гар утсанд push notification болж ирнэ\n→ Унтаж байсан ч сэрнэ 😄' }
      ],
      quiz: [
        { q: 'TradingView юунд хэрэглэдэг вэ?', options: ['Зөвхөн арилжаа хийх', 'Үнийн шинжилгээ хийх', 'Мөнгө хадгалах', 'Имэйл илгээх'], correct: 1 },
        { q: 'TradingView дээр Trendline хэрхэн зурах вэ?', options: ['F1 дарж', 'Зүүн toolbar-аас Trend Line icon сонгож', 'Хэлэлгүй', 'Командын мөрөөр'], correct: 1 },
        { q: 'RSI 30-аас доош үед юу гэсэн үг вэ?', options: ['Overbought (зарах)', 'Oversold (худалдан авах)', 'Тэнцүү', 'Утгагүй'], correct: 1 },
        { q: 'Alert тогтоох hotkey юу вэ?', options: ['Alt+A', 'Ctrl+S', 'F1', 'Enter'], correct: 0 }
      ]
    },
    // ============ CANDLESTICK хичээлүүд ============
    {
      id: 'candle-basics',
      title: 'Лаан график (Candlestick)',
      icon: Flame,
      level: 'Дунд шат',
      steps: [
        { title: 'Лааны түүх', content: 'Японы цагаан будааны арилжаачин Мунэхиса Хомма 1700-аад оны эхээр лаан графикийг үүсгэсэн.\n\nТэрээр зах зээлд эрэлт нийлүүлэлтээс гадна арилжаачдын СЭТГЭЛ ХӨДЛӨЛ үнэд нөлөөлдөг гэдгийг анх ойлгосон.\n\n1980-аад онд Steve Nison лаан графикийг Барууны ертөнцөд танилцуулсан.' },
        { title: 'Лааны бүтэц', content: 'Нэг лаа 4 үнийг харуулдаг:\n• Open — нээлтийн үнэ\n• Close — хаалтын үнэ\n• High — дээд үнэ\n• Low — доод үнэ\n\nБух (Bullish) лаа: Close > Open (үнэ өссөн)\nБаавгай (Bearish) лаа: Close < Open (үнэ буурсан)\n\nБиеийн дунд хэсэг = real body\nУрт сүүл = shadow / wick' },
        { title: 'Биеийн хэмжээ', content: 'Урт бие = Хүчтэй худалдан авалт/зарах дарамт\n\nБогино бие = Бага идэвх, тодорхой бус байдал\n\nУрт дээд сүүл, богино доод сүүл = Худалдан авагчид өсгөсөн боловч худалдагчид буцааж унагасан\n\nУрт доод сүүл, богино дээд сүүл = Худалдагчид унагасан боловч худалдан авагчид өсгөсөн' }
      ],
      quiz: [
        { q: 'Бух (bullish) лаанд юу үнэн бэ?', options: ['Open > Close', 'Close > Open', 'High = Low', 'Сүүлгүй'], correct: 1 },
        { q: 'Лааны "real body" гэж юу вэ?', options: ['Сүүл', 'Open ба Close хоорондын хэсэг', 'Дээд цэг', 'Доод цэг'], correct: 1 }
      ]
    },
    {
      id: 'candle-patterns',
      title: 'Үндсэн лааны паттернууд',
      icon: BarChart3,
      level: 'Дунд шат',
      steps: [
        { title: 'Pin Bar (Hammer / Shooting Star)', content: 'Pin Bar — Урт сүүл, богино биетэй лаа\n\nHammer (Алх) — Урт доод сүүл, уналтын ёроолд үүсэх → Өсөлтийн дохио\n\nShooting Star (Од харваж буй) — Урт дээд сүүл, өсөлтийн оройд үүсэх → Уналтын дохио\n\nСүүл нь биеийнхээ 2 дахин урт байх ёстой!' },
        { title: 'Engulfing Bar', content: 'Engulfing — 2 лаа, хоёр дахь нь эхнийхээ бүрэн "залгидаг"\n\nBullish Engulfing — Уналтын дараа том ногоон лаа улааныг залгина → Өсөлт эхэлнэ\n\nBearish Engulfing — Өсөлтийн дараа том улаан лаа ногоонг залгина → Уналт эхэлнэ\n\nХүчтэй reversal дохио — гол түвшинд (support/resistance) үүсэх ёстой.' },
        { title: 'Doji', content: 'Doji — Open ≈ Close (бараг тэнцүү)\n\nЗах зээл шийдвэр гаргаж чадахгүй байна гэсэн үг — bull/bear тэнцэж байна.\n\nDragonfly Doji — Урт доод сүүл, дээд сүүлгүй → Өсөлтийн дохио\n\nGravestone Doji — Урт дээд сүүл, доод сүүлгүй → Уналтын дохио\n\nТренд эргэх дохио өгдөг гэхдээ бусад баталгаатай хослуулах хэрэгтэй.' },
        { title: 'Inside Bar (Harami)', content: 'Harami (жирэмсэн) / Inside Bar — Бяцхан лаа том лааны дотор бүрэн оршино\n\nЭнэ нь зах зээл "амарч" байна гэсэн үг — consolidation.\n\nХэрэглээ:\n• Тренд хүчтэй үед → Continuation (үргэлжлэх)\n• Орой/ёроолд → Reversal (эргэх)\n\nInside Bar False Breakout — Хамгийн хүчтэй setup-уудын нэг!' },
        { title: 'Morning / Evening Star', content: '3 лаатай паттерн\n\nMorning Star (Уналтын ёроолд):\n1. Том улаан лаа\n2. Бяцхан лаа (хоёр чигт)\n3. Том ногоон лаа\n→ Өсөлтийн хүчтэй reversal\n\nEvening Star (Өсөлтийн оройд):\n1. Том ногоон лаа\n2. Бяцхан лаа\n3. Том улаан лаа\n→ Уналтын хүчтэй reversal' }
      ],
      quiz: [
        { q: 'Hammer паттерн ямар дохио өгдөг вэ?', options: ['Уналт үргэлжилнэ', 'Өсөлт эхэлнэ', 'Хажуугийн хөдөлгөөн', 'Юу ч үгүй'], correct: 1 },
        { q: 'Bearish Engulfing хаана үүсэх нь хамгийн хүчтэй вэ?', options: ['Уналтын дунд', 'Өсөлтийн оройд', 'Тэгш зах зээлд', 'Хаана ч хамаагүй'], correct: 1 },
        { q: 'Inside Bar юуг илэрхийлдэг вэ?', options: ['Хүчтэй тренд', 'Consolidation/амрах үе', 'Уналт', 'Өсөлт'], correct: 1 }
      ]
    },
    // ============ ELLIOTT WAVE хичээлүүд ============
    {
      id: 'elliott-intro',
      title: 'Элиотын давалгааны үндэс',
      icon: Waves,
      level: 'Ахисан шат',
      steps: [
        { title: 'Онолын үүсэл', content: 'Ральф Нельсон Элиот 1930-аад онд 75 жилийн зах зээлийн өгөгдлийг судалж, зах зээл санамсаргүй биш — давтамжтай хөдөлддөг гэдгийг нээсэн.\n\nҮнийн хөдөлгөөн нь олон нийтийн сэтгэл зүйгээс үүсэх "давалгаа" (wave)-аар явагддаг.\n\nГол санаа: Хэрэв энэ давталтыг таньж чадвал — ирээдүйг таамаглаж болно!' },
        { title: 'Үндсэн 8 давалгаа', content: 'Зах зээлийн нэг бүтэн мөчлөг = 8 давалгаа\n\nИмпульс (1-5): Трендийн дагуу\n• 1, 3, 5 — трендийн дагуу\n• 2, 4 — засварын\n\nЗасвар (A-B-C): Трендийн эсрэг\n• A, C — эсрэг чиглэлд\n• B — дагуу чиглэлд\n\nWave 3 = ХАМГИЙН ХҮЧТЭЙ, ашгийн хамгийн их боломж!' },
        { title: 'Фракталь шинж', content: 'Фракталь — Том зүйл нь ижил төстэй жижиг хэсгүүдээс тогтдог.\n\nЭлиотын давалгаа фракталь:\n• Сарын чарт дээрх 1 давалгаа → Долоо хоногт 5 давалгаа\n• Долоо хоногийн 5 давалгаа → Өдөрт 21 давалгаа\n• Өдрийн → Цагт 89 давалгаа\n• Бүгд → 144 жижиг давалгаа\n\nҮүнээс л ямар ч цаг хугацаанд (timeframe) Elliott Wave хэрэглэж болно!' }
      ],
      quiz: [
        { q: 'Зах зээлийн нэг бүтэн мөчлөг хэдэн давалгаатай вэ?', options: ['5', '8', '13', '21'], correct: 1 },
        { q: 'Хамгийн хүчтэй, ашгийн боломж хамгийн их давалгаа аль нь вэ?', options: ['Wave 1', 'Wave 2', 'Wave 3', 'Wave 5'], correct: 2 }
      ]
    },
    {
      id: 'elliott-rules',
      title: 'Элиотын 3 үндсэн дүрэм',
      icon: Ruler,
      level: 'Ахисан шат',
      steps: [
        { title: '1-р дүрэм: Wave 2', content: 'Wave 2 нь Wave 1-ийн ЭХЛЭЛИЙН цэгээс ХЭЗЭЭ Ч доош ороогүй.\n\nЖишээ: Wave 1 = $100-аас $120 хүртэл өссөн бол\nWave 2 нь $100-аас доошлох ёсгүй.\n\nХэрэв доош орвол → Энэ Wave 1 биш, өөр давалгаа байна гэсэн үг.\n\nStop Loss-аа Wave 1-ийн эхлэлд тавьдаг учир.' },
        { title: '2-р дүрэм: Wave 3', content: 'Wave 3 нь Wave 1, 5-аас ХАМГИЙН БОГИНО байж БОЛОХГҮЙ.\n\nWave 3 нь ихэвчлэн хамгийн урт байдаг.\n\nХамгийн багадаа Wave 1-тэй тэнцүү, эсвэл түүнээс урт байх ёстой.\n\nТренд хүчтэй үед Wave 3 нь Wave 1-ээс 1.618 эсвэл 2.618 дахин урт байдаг.' },
        { title: '3-р дүрэм: Wave 4', content: 'Wave 4 нь Wave 1-ийн МУЖ руу орохгүй.\n\nӨөрөөр хэлбэл, Wave 4 нь Wave 1-ийн оройноос доошилж болохгүй.\n\nЖишээ: Wave 1 нь $120-д төгссөн бол Wave 4 нь $120-аас доошлох ёсгүй.\n\nЗөвхөн Diagonal pattern дээр л Wave 4 нь Wave 1-ийн муж руу ордог.' },
        { title: 'Дүрэм зөрчигдвөл', content: 'Энэ 3 дүрмийн АЛЬ НЭГ нь зөрчигдвөл — таны давалгааны тоолол БУРУУ.\n\nТэгвэл та өөр хувилбараар тоолох хэрэгтэй.\n\nСайн арилжаачин үргэлж 2-3 хувилбартай байж, нэгийгээ зөрчигдвөл нөгөөг ашигладаг.\n\nДүрэм бол Stop Loss-ын үндэс — зөрчигдвөл арилжаагаа хаагаад гарна.' }
      ],
      quiz: [
        { q: 'Wave 2 хаашаа ороход тоолол буруу болох вэ?', options: ['Wave 1-ийн дунд', 'Wave 1-ийн эхлэлээс доош', 'Wave 1-ийн дээр', 'Хаашаа ч'], correct: 1 },
        { q: 'Wave 3 ямар байж БОЛОХГҮЙ вэ?', options: ['Хамгийн урт', 'Хамгийн богино', 'Дунд', 'Эгц'], correct: 1 },
        { q: 'Wave 4 хаашаа орох ёсгүй вэ?', options: ['Wave 3-ийн муж', 'Wave 1-ийн муж', 'Wave 2-ийн муж', 'Хаашаа ч'], correct: 1 }
      ]
    },
    {
      id: 'fibonacci',
      title: 'Фибоначчи тоо',
      icon: Hash,
      level: 'Ахисан шат',
      steps: [
        { title: 'Фибоначчи дараалал', content: '12-р зууны Италийн математикч Леонардо Фибоначчи нээсэн:\n\n0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...\n\nГурав дахь тоо = өмнөх 2 тооны нийлбэр.\n\nЭнэ дараалал байгальд тааралддаг — цэцгийн дэлбээ, нялцгай биетийн хясаа, галактикийн эргүүлэг г.м.\n\nХүний сэтгэл зүй ч мөн адил энэ дарааллыг дагадаг!' },
        { title: 'Алтан харьцаа', content: 'Фибоначчи тоонуудыг харьцуулахад:\n\n• 21/34 = 0.618\n• 34/55 = 0.618\n• 55/89 = 0.618\n→ 0.618 = АЛТАН ХАРЬЦАА (Golden Ratio)\n\n• 21/55 = 0.382\n• Урвуу нь = 1.618, 2.618, 4.236\n\nЭдгээр тоон дээр зах зээл хариу үйлдэл үзүүлдэг!' },
        { title: 'Retracement түвшинүүд', content: 'Үнэ буцах нийтлэг түвшинүүд:\n\n• 23.6%\n• 38.2% — Wave 4-ийн нийтлэг\n• 50% — Дундаж\n• 61.8% — АЛТАН харьцаа, Wave 2-ийн нийтлэг\n• 78.6% — Гүн засвар\n\nWave 2 нь ихэвчлэн Wave 1-ийн 50-61.8% руу буцдаг.\nWave 4 нь Wave 3-ийн 38.2-50% руу буцдаг.' },
        { title: 'Extension түвшинүүд', content: 'Wave 3, 5-ийн ирэх боломжит таргетууд:\n\n• 100% — Wave 1-тэй тэнцүү\n• 127.2%\n• 138.2%\n• 161.8% — Wave 3-ийн нийтлэг таргет\n• 261.8% — Wave 3 хүчтэй сунгагдсан\n• 423.6% — Маш ховор\n\nWave 3 ихэвчлэн Wave 1-ийн 161.8% хүртэл явдаг!' }
      ],
      quiz: [
        { q: 'Алтан харьцаа гэж юу вэ?', options: ['0.382', '0.5', '0.618', '1.0'], correct: 2 },
        { q: 'Wave 3-ийн нийтлэг таргет хэд вэ?', options: ['100%', '127.2%', '161.8%', '261.8%'], correct: 2 },
        { q: 'Wave 2 ихэвчлэн Wave 1-ийн хэдэн хувь руу буцах вэ?', options: ['23.6%', '38.2%', '50-61.8%', '100%'], correct: 2 }
      ]
    },
    {
      id: 'elliott-correction',
      title: 'Засварын давалгаа (ABC)',
      icon: RefreshCw,
      level: 'Ахисан шат',
      steps: [
        { title: '3 төрлийн засвар', content: 'Засварын давалгаа гэдэг нь импульс 5 давалгааны дараа ирэх А-В-С 3 давалгаа.\n\n3 үндсэн төрөл:\n\n1⃣ Zigzag — Хурц, эгц засвар\n2⃣ Flat — Хажуу тийш засвар\n3⃣ Triangle — Гурвалжин (ABCDE 5 давалгаа)\n\nWave B нь "Bull trap" — олон арилжаачдыг хууртагддаг!\nWave C нь "Killer wave" — Long position-уудыг устгадаг.' },
        { title: 'Zigzag', content: 'Zigzag — Хурц хэлбэрийн засвар\n\nБүтэц: 5-3-5\n• Wave A — 5 жижиг давалгаа\n• Wave B — 3 давалгаа (буцах)\n• Wave C — 5 жижиг давалгаа\n\nWave B нь A-ийн 50-79% руу буцдаг.\nWave C нь A-тай ТЭНЦҮҮ эсвэл 1.618 дахин урт байдаг.\n\nИхэвчлэн Wave 2 дээр тохиолддог.' },
        { title: 'Flat', content: 'Flat — Хажуу тийш засвар\n\nБүтэц: 3-3-5\n• Wave A — 3 давалгаа\n• Wave B — 3 давалгаа\n• Wave C — 5 давалгаа\n\n3 хувилбар:\n• Regular Flat — B нь A-ийн 100%\n• Irregular/Expanded — B нь A-аас давна\n• Running Flat — Тренд маш хүчтэй\n\nИхэвчлэн Wave 4 дээр тохиолддог.' },
        { title: 'Triangle', content: 'Triangle — 5 давалгаатай засвар\n\nБүтэц: A-B-C-D-E (бүгд 3-3-3-3-3)\n\n4 төрөл:\n• Symmetrical (агшиж)\n• Ascending (өсөж)\n• Descending (буурч)\n• Reverse symmetrical (өргөсөж)\n\nЗөвхөн Wave 4 эсвэл Wave B дээр тохиолддог.\n\nTriangle-ийн дараа үргэлж сүүлчийн "thrust" (түлхэлт) ирдэг!' }
      ],
      quiz: [
        { q: 'Zigzag-ийн бүтэц юу вэ?', options: ['3-3-5', '5-3-5', '3-3-3-3-3', '5-5-5'], correct: 1 },
        { q: 'Triangle хэдэн давалгаатай вэ?', options: ['3', '5', '8', '13'], correct: 1 },
        { q: 'Wave B-г юу гэж нэрлэдэг вэ?', options: ['Killer wave', 'Bull trap', 'Diagonal', 'Impulse'], correct: 1 }
      ]
    }
  ];

  // ============ НОМЫН САН ============
  const books = [
    {
      id: 'candlestick-bible',
      title: 'The Candlestick Trading Bible',
      author: 'Munehisa Homma уламжлал дээр үндэслэсэн',
      icon: Flame,
      color: 'from-white/10 to-zinc-800/30',
      borderColor: 'border-white/20',
      description: 'Лаан график паттернууд болон price action арилжааны бүрэн гарын авлага',
      chapters: [
        {
          title: '1-р бүлэг: Танилцуулга',
          content: 'The Candlestick Trading Bible нь түүхэн дэх хамгийн хүчирхэг арилжааны системүүдийн нэг юм. Үүнийг Японы цагаан будааны арилжаачин Мунэхиса Хомма зохион бүтээсэн.\n\nХомма бол түүхэн дэх хамгийн амжилттай арилжаачин гэж тооцогддог. Тэр өөрийн үед "Зах зээлийн бурхан" хэмээх алдартай байсан бөгөөд түүний нээлт өнөөгийн валютаар $10 тэрбум гаруй мөнгийг түүнд авчирсан.\n\nЛаан графикийг сурах нь шинэ хэл сурахтай адил юм. Хэрэв та лаан графикийг хэрхэн уншихаа мэдэхгүй бол зах зээлийг хэзээ ч арилжаалж чадахгүй.\n\nЯпоны лаан график нь санхүүгийн зах зээлийн ХЭЛ юм. Хэрэв та чарт уншиж сурвал — зах зээл танд юу хэлж байгааг ойлгож, зөв шийдвэрийг зөв цагт гаргах болно.'
        },
        {
          title: '2-р бүлэг: Лааны түүх',
          content: 'Лаан график нь Барууны ертөнцийн ижил төстэй зүйлсээс хамаагүй эртээ үүссэн. Япончууд 17-р зуунаас чарт ашиглаж байсан бол АНУ-д хамгийн анхны мэдэгдэж буй чартууд 19-р зууны сүүлчээр гарч ирсэн.\n\nЦагаан будааны арилжаа Японд 1654 онд тогтоогдсон бөгөөд алт, мөнгө, рапсын тос удалгүй дагалдсан.\n\nМунэхиса Хомма (Сокью Хонма гэж нэрлэгддэг) 1700-аад оны эхээр төрсөн Японы цагаан будааны арилжаачин юм. Тэрээр эрэлт нийлүүлэлтийн үндсэн динамикийг ойлгосноос гадна сэтгэл хөдлөл нь үнийг тогтооход чухал үүрэг гүйцэтгэдэг гэдгийг ялгаж танисан.\n\nТэрээр зах зээлийн оролцогчдын сэтгэл хөдлөлийг хянахыг хүссэн бөгөөд энэ ажил нь лаан анализын үндэс болсон.\n\n1980-аад оны сүүлээр хэд хэдэн Барууны шинжээчид лаан графикийг сонирхож эхэлсэн. 1989 оны 12-р сард Steve Nison "Futures" сэтгүүлд лаан графикийн эргэх паттернуудыг нийтэлсэн нь анхны томоохон танилцуулга болсон.'
        },
        {
          title: '3-р бүлэг: Лаа гэж юу вэ?',
          image: 'candle-anatomy',
          content: 'Японы лаан график нь сонгосон цаг хугацааны нээлтийн (Open), дээд (High), доод (Low), хаалтын (Close) үнийг ашиглан үүсдэг.\n\nӨСӨЛТИЙН ЛАА: Хаалт нь нээлтээс ДЭЭР бол лаа bullish (өсөлтийн) гэж нэрлэгддэг. Энэ нь зах зээл өсч байгааг харуулна. Ихэвчлэн ЦАГААН эсвэл НОГООН өнгөөр харуулдаг.\n\nУНАЛТЫН ЛАА: Хаалт нь нээлтээс ДООР бол лаа bearish (уналтын) гэж нэрлэгддэг. Зах зээл уналттай байна гэсэн үг. Ихэвчлэн ХАР эсвэл УЛААН өнгөөр.\n\nЛААНЫ БҮРДЭЛ ХЭСГҮҮД:\n• Real body — нээлт ба хаалтын хооронд\n• Upper shadow (дээд сүүл) — дээд хэсэг\n• Lower shadow (доод сүүл) — доод хэсэг\n\nБИЕИЙН ХЭМЖЭЭ:\n• Урт бие → Хүчтэй худалдан авалт/зарах дарамт\n• Богино/жижиг бие → Бага идэвх\n\nСҮҮЛНИЙ УТГА:\n• Урт сүүл → Тухайн чигт тэлэлт хийсэн боловч буцсан\n• Богино сүүл → Үндсэн худалдаа Open-Close орчимд төвлөрсөн'
        },
        {
          title: '4-р бүлэг: Engulfing Bar',
          image: 'engulfing',
          content: 'Engulfing bar нь нэрнийхээ дагуу өмнөх лааг бүрэн "залгидаг" үед үүсдэг. Engulfing bar нь нэгээс олон өмнөх лааг залгиж болох ч engulfing bar гэж тооцогдохын тулд ядаж нэг лаа бүрэн ороогдсон байх ёстой.\n\nBEARISH ENGULFING (Уналтын):\n• 2 биеэс бүрдэнэ\n• Эхний бие 2 дахиасаа жижиг\n• 2 дахь нь эхнийхээ бүрэн залгидаг\n• Өсөлтийн оройд үүсэхэд хүчтэй REVERSAL дохио өгдөг\n\nЭнэ паттерн нь зарагчид зах зээлийг хяналтандаа авч байна гэж хэлдэг. Өсөлтийн төгсгөлд үүсэхэд — худалдан авагчдыг зарагчид "залгисан" гэдгийг харуулна.\n\nBULLISH ENGULFING (Өсөлтийн):\n• Эхний жижиг улаан лаа\n• 2 дахь том ногоон лаа эхнийхээ залгидаг\n• Уналтын ёроолд үүсэхэд маш хүчтэй reversal дохио — capitulation bottom-ийг илэрхийлдэг\n\nЧУХАЛ: Зөвхөн engulfing pattern дээр үндэслэн арилжаа битгий хий. Бусад баталгаажуулах хүчин зүйлс хэрэгтэй — support/resistance, тренд, MA г.м.'
        },
        {
          title: '5-р бүлэг: Doji паттерн',
          image: 'doji',
          content: 'Doji бол хамгийн чухал Японы лаан график паттернуудын нэг юм. Энэ лаа үүсэхэд — зах зээл ижил үнээр нээж, хаасан гэсэн үг.\n\nӨөрөөр хэлбэл — худалдан авагч, худалдагч хоёрын ХООРОНДЫН ТЭГШ БАЙДАЛ, ШИЙДВЭРГҮЙ БАЙДАЛ. Хэн ч зах зээлийг хянахгүй байна.\n\nDoji-н онцлог:\n• Open ≈ Close (бараг тэнцүү)\n• Сүүл нь дээш доош байж болно\n• Trend-ийн дунд бараг утгагүй\n• Trend-ийн ОРОЙ эсвэл ЁРООЛД маш чухал!\n\nDRAGONFLY DOJI (Соно Doji):\n• Урт ДООД сүүл\n• Дээд сүүлгүй буюу маш богино\n• Open = High = Close\n• Уналтын ёроолд → Өсөлтийн дохио\n• Худалдан авагчид зарагчдыг ялсан\n\nGRAVESTONE DOJI (Булшны чулуу):\n• Урт ДЭЭД сүүл\n• Доод сүүлгүй\n• Open = Low = Close\n• Өсөлтийн оройд → Уналтын дохио\n• Зарагчид өсөлтийг "булшилсан"\n\nХЭРЭГЛЭЭ: Doji нь хүчтэй хөдөлгөөний дараа амрах үед үүсдэг. Trend-ийн орой/ёроолд үүсвэл — өмнөх trend хүчээ алдаж байгаагийн дохио.'
        },
        {
          title: '6-р бүлэг: Pin Bar (Hammer / Shooting Star)',
          image: 'pin-bar',
          content: 'Pin bar нь price action арилжаачдын хамгийн их хайдаг паттернуудын нэг. Энэ нь маш урт сүүлтэй чарт лаа бөгөөд унагалт буюу TУРГАЛТ-ыг харуулдаг.\n\nЛаа нь маш ЖИЖИГ real body, УРТ сүүлтэй байдаг. Сүүл нь real body-ноос ядаж 2 ДАХИН УРТ байх ёстой.\n\nHAMMER (Алх) — Bullish Pin Bar:\n• Урт ДООД сүүл\n• Жижиг бие дээд хэсэгт\n• УНАЛТЫН ЁРООЛД үүсэх\n• Өсөлтийн дохио\n\nСэтгэл зүй: Зарагчид үнийг доош түлхсэн, гэвч худалдан авагчид хүчтэй татаж, лаа дээгүүр хаагдсан.\n\nSHOOTING STAR (Од харваж буй) — Bearish Pin Bar:\n• Урт ДЭЭД сүүл\n• Жижиг бие доод хэсэгт\n• ӨСӨЛТИЙН ОРОЙД үүсэх\n• Уналтын дохио\n\nСэтгэл зүй: Худалдан авагчид өсгөхийг хичээсэн, гэвч зарагчид буцааж унагасан.\n\nЧАНАРЫН ШАЛГУУР:\n1. Bigger timeframes (4H, Daily) — жижиг timeframe буруу дохио өгдөг\n2. Trend-тэй ижил чигт — bull trend-д hammer, bear trend-д shooting star\n3. Гол түвшинд (support/resistance, MA, Fib) үүсэх\n4. Урт сүүл — biегийн 2-3 дахин урт\n\nАРИЛЖААНЫ ТАКТИК:\n• Aggressive entry — Pin bar хаагдсаны дараа шууд\n• Conservative entry — Pin bar-ын 50% retracement-д\n• Stop Loss — Урт сүүлний ард\n• Target — Дараагийн support/resistance'
        },
        {
          title: '7-р бүлэг: Inside Bar (Harami)',
          image: 'inside-bar',
          content: 'Harami (Япон хэлээр "жирэмсэн") паттерн нь reversal болон continuation паттерн юм. 2 лаанаас бүрдэнэ:\n\n• Эхний том лаа = "Эх лаа" (mother candle)\n• 2 дахь жижиг лаа = "Хүүхэд" (baby candle)\n\nХарами хүчинтэй болохын тулд — 2 дахь лаа нь эхнийхээ ДОТОР БҮРЭН байх ёстой.\n\nХОЁР ХУВИЛБАР:\n\n1⃣ REVERSAL (Эргэх):\n• Өсөлтийн оройд → Bearish reversal\n• Уналтын ёроолд → Bullish reversal\n\n2⃣ CONTINUATION (Үргэлжлэх):\n• Хүчтэй trend-ийн дунд үүсэхэд\n• Trend-тэй ижил чигт breakout хийх → Trend үргэлжилнэ\n\nСЭТГЭЛ ЗҮЙ:\nХарами зах зээл "consolidation" буюу шийдвэргүй үед орсныг харуулдаг. Худалдан авагч, зарагч хоёр аль аль нь хяналтгүй болсон. Эцэст нь — нэг тал нь ялаад breakout хийнэ.\n\nINSIDE BAR FALSE BREAKOUT:\nХамгийн ХҮЧТЭЙ setup-уудын нэг!\n\nЭнэ нь үнэ inside bar-аас нэг чигт breakout хийгээд, дараа нь эргэж эх лааны мужид хаагддаг үед үүсдэг.\n\nЯагаад чухал вэ? — Том банкууд, институтуудад "stop hunt" хийдэг — анхан суралцагчдын stop loss-ыг "цохиод", дараа нь эсрэг чигт явдаг.\n\nХЭРЭГЛЭЭ:\n• Гол түвшинд (S/R, supply/demand) үүсэх ёстой\n• Trend-тэй ижил чигт — continuation\n• Trend-ийн орой/ёроолд — reversal\n• 50%, 61.8% Fibonacci-той хослуулах'
        },
        {
          title: '8-р бүлэг: Зах зээлийн бүтэц',
          image: 'trend-types',
          content: 'Худалдаачинд хамгийн чухал ур чадваруудын нэг бол зах зээлийн бүтцийг унших чадвар юм. Энэ ур чадвар нь танд тохирох price action стратегийг тохирох зах зээлийн нөхцөлд хэрэглэх боломжийг олгоно.\n\n3 ТӨРЛИЙН ЗАХ ЗЭЭЛ:\n\n1⃣ TRENDING MARKET (Трендтэй зах зээл) — 30%:\n• Higher Highs + Higher Lows = Uptrend\n• Lower Highs + Lower Lows = Downtrend\n• Том timeframe (4H, Daily, Weekly) дээр харна\n\nХэрхэн арилжаалах:\n• Bull trend → Зөвхөн худалдан авах боломж хайх\n• Bear trend → Зөвхөн зарах боломж хайх\n• Pullback дуусаад impulsive move эхлэх цэгт орох\n\n2⃣ RANGING MARKET (Хажуу тийш) — 60%:\n• Хэвтээ support/resistance хооронд хөдлөнө\n• "Sideways" буюу "consolidation"\n\nХэрхэн арилжаалах:\n• Support руу хүрэхэд → Авах\n• Resistance руу хүрэхэд → Зарах\n• Эсвэл breakout-г хүлээх\n• Pullback after breakout — хамгийн аюулгүй\n\n3⃣ CHOPPY MARKET (Эмх замбараагүй) — 10%:\n• Чиглэлгүй, шуугиантай\n• Боундаригүй\n• Stop loss байнга цохигддог\n\nХэрхэн арилжаалах: ХЭРЭГЛЭХГҮЙ! Зайлсхий, бусад зах зээл рүү шилж.\n\nSUPPORT & RESISTANCE:\n• Зах зээл "санах" түвшинүүд\n• Өмнөх swing high/low\n• Trend-тэй үед — өмнөх swing point support/resistance болдог\n• Breakout болсны дараа resistance → support болж хувирдаг (vice versa)'
        },
        {
          title: '9-р бүлэг: Multiple Timeframe Analysis',
          image: 'support-resistance',
          content: 'Price action арилжаачинд multiple timeframe analysis маш чухал. "Top down analysis" гэж нэрлэдэг — том timeframe-ээс жижиг рүү шилждэг.\n\nЯАГААД ЧУХАЛ ВЭ?\nЖижиг timeframe дээр гоё харагдах setup нь том timeframe дээр resistance-д ойртож болно. Том timeframe-ыг шалгахгүй бол — том ялагдалтай боломжтой.\n\nЦАГИЙН БЭЛТГЭЛ:\n\n1⃣ Position Trader (Урт хугацаа):\n• Үндсэн чарт: Daily, Weekly\n• Шинжилгээ: Weekly → Daily\n• Position barih: Долоо хоног - сар\n\n2⃣ Swing Trader (Дунд хугацаа):\n• Үндсэн чарт: 4H, Daily\n• Шинжилгээ: Daily → 4H → 1H\n• Position barih: 2-7 өдөр\n\n3⃣ Day Trader (Богино хугацаа):\n• Үндсэн чарт: 1H, 15M\n• Шинжилгээ: 4H → 1H → 15M\n• Position barih: Нэг өдөр доторх\n\nШИНЖИЛГЭЭНИЙ АЛХАМ:\n\nАлхам 1: ТОМ ЧАРТ (Weekly/Daily)\n• Trend-ийн ерөнхий чиглэл\n• Хамгийн чухал S/R түвшин\n• Зах зээлийн бүтэц\n\nАлхам 2: ДУНД ЧАРТ (4H/1H)\n• Pullback эсвэл impulsive move-д орсон уу\n• Орох боломжит зон\n• Setup-ийн зөв байрлал\n\nАлхам 3: ЖИЖИГ ЧАРТ (15M)\n• Зөв entry точкоо хайх\n• Candlestick confirmation\n• Stop loss-ын байрлал\n\nАЛТАН ДҮРЭМ: Trade WITH the bigger timeframe trend, NEVER against it (хэрэв шинэхэн бол).'
        }
      ]
    },
    {
      id: 'elliott-wave',
      title: 'Элиотын Давалгааны Онол',
      author: 'Ralph Nelson Elliott',
      icon: Waves,
      color: 'from-white/10 to-zinc-800/30',
      borderColor: 'border-white/20',
      description: 'Зах зээлийн давтамжит давалгаан хэлбэрийг таних бүрэн гарын авлага',
      chapters: [
        {
          title: '1-р бүлэг: Элиотын онолын үүсэл',
          content: 'Суут ухаантан, нягтлан бодогч Ральф Нельсон Элиот 1930-аад оны үед 75 жилийн үл хөдлөх хөрөнгийн зах зээлийн өгөгдлийг цуглуулан анализ хийж байхдаа — зах зээл бүхэлдээ эмх замбараагүй хаос биш гэдгийг нээсэн.\n\nГОЛ НЭЭЛТ:\nХөрөнгийн зах зээл тодорхой давтамжтай хөдөлдөг бөгөөд энэхүү давтамж нь:\n• Гадны нөлөөлөл\n• Олон нийтийн сэтгэл хөдлөл\n• Хөрөнгө оруулагчдын психологи\n— эдгээрээс хамаарна.\n\nҮнийн савлах хөдөлгөөн нь олон нийтийн сэтгэл хөдлөлийн үр дүн бөгөөд үүнийг "ДАВАЛГАА" (Wave) гэж нэрлэжээ.\n\nОНОЛЫН МӨН ЧАНАР:\nХэрэв давалгаалах хэв маягийг зөв тодорхойлж чадвал — үнийг ТААМАГЛАЖ болно.\n\nМассын өөдрөг, гутранги сэтгэл зүйгээс хамаарсан үнийн хэлбэлзэл нь зах зээл дээр:\n• Эхлэл\n• Өсөлт\n• Тогтворжилт\n• Уналт\n• Төгсгөл\n— гэсэн циклийг үүсгэдэг.\n\nФРАКТАЛЬ ШИНЖ:\nЭлиотын давалгааны нэг чухал шинж нь ФРАКТАЛЬ — олон жижиг төстэй давалгаануудад хуваагддаг. Сар, долоо хоног, өдөр, цаг, минутын чартанд адилхан илэрдэг учир — ямар ч цаг хугацаанд хэрэглэх боломжтой.'
        },
        {
          title: '2-р бүлэг: Үндсэн 8 давалгаа',
          image: 'elliott-waves',
          content: 'Зах зээлийн нэг бүтэн мөчлөг нь үндсэн 8 ДАВАЛГААНААС бүрддэг.\n\nИМПУЛЬСИЙН ХЭСЭГ (1-5 давалгаа):\nТрендийн ДАГУУ хөдөлдөг.\n\nӨсөлтийн трендэд:\n• 1, 3, 5 — ДЭЭШ чиглэлтэй (impulse)\n• 2, 4 — ДООШ чиглэлтэй (corrective)\n\nУналтын трендэд эсрэгээрээ.\n\nЗАСВАРЫН ХЭСЭГ (A-B-C):\nТрендийн ЭСРЭГ хөдөлдөг.\n• A, C — Доош (өсөлтийн трендэд)\n• B — Дээш\n\nДАВАЛГАА БҮРИЙН ШИНЖ:\n\nWAVE 1: Шинэ trend-ийн эхлэл\n• Эмоци бага\n• Олон трейдер хүлээж ажиглаж байгаа\n• Хязгаарлагдмал volume\n\nWAVE 2: Эхний ЗАСВАР\n• Wave 1-ийн 50-61.8% буцдаг\n• Хурц, огцом хөдөлгөөн (Zigzag)\n• Wave 1-ийн ЭХЛЭЛЭЭС ДООШ ОРОХГҮЙ!\n\nWAVE 3:  ХАМГИЙН ХҮЧТЭЙ \n• Хамгийн урт давалгаа\n• Хамгийн хүчтэй хөдөлгөөн\n• Volume их\n• Ашиг олох ХАМГИЙН ИХ боломж\n• Wave 1-ийн 1.618 эсвэл 2.618 дахин урт\n\nWAVE 4: Дунд ЗАСВАР\n• Wave 3-ийн 38.2-50% буцдаг\n• Урт хугацаа үргэлжилнэ\n• Wave 1-ийн муж руу ОРОХГҮЙ!\n\nWAVE 5: Эцсийн өсөлт\n• Wave 3-аас бага налуу, удаавтар\n• "Truncation" — Wave 3-аас дээш гарахгүй байж болно\n• Сонор сэрэмжтэй байх — trend дуусч байна!\n\nЗАСВАРЫН ABC:\n\nA — Эхний эсрэг хөдөлгөөн (5 давалгаа)\nB — "Bull trap" (3 давалгаа) — олон арилжаачдыг хууртагддаг\nC — "Killer wave" — хамгийн хүчтэй уналт (5 давалгаа)'
        },
        {
          title: '3-р бүлэг: 3 үндсэн дүрэм',
          image: 'elliott-rules',
          content: 'Элиотын давалгааны онолын ЗААВАЛ МӨРДӨГДӨХ үндсэн 3 дүрэм байна. Эдгээр дүрмийн АЛЬ НЭГ нь зөрчигдвөл — таны давалгааны тоолол БУРУУ.\n\n1-Р ДҮРЭМ: WAVE 2\n"Wave 2 нь Wave 1-ийн ЭХЛЭЛИЙН цэгээс ХЭЗЭЭ Ч доош ородгүй."\n\nЖишээ:\n• Wave 1: $100 → $120\n• Wave 2 нь $100-аас доош ОРОХ ЁСГҮЙ\n\nЭнэ дүрэм нь Stop Loss-ын тулгуур юм. Wave 2 эхлэлийн цэгийг доошлуулбал — энэ Wave 1 биш.\n\n2-Р ДҮРЭМ: WAVE 3\n"Wave 3 нь бусад давалгаануудаас ХАМГИЙН БОГИНО байж болохгүй."\n\nӨөрөөр хэлбэл:\n• Wave 3 ≥ Wave 1\n• Wave 3 ≥ Wave 5\n• Ихэвчлэн Wave 3 нь хамгийн УРТ\n\nWave 3-ийн нийтлэг үргэлжлэл:\n• Wave 1-ийн 1.618 дахин (хамгийн нийтлэг)\n• Wave 1-ийн 2.618 дахин (хүчтэй trend)\n• Wave 1-ийн 4.236 дахин (маш ховор)\n\n3-Р ДҮРЭМ: WAVE 4\n"Wave 4 нь Wave 1-ийн муж руу орохгүй."\n\nӨөрөөр хэлбэл, Wave 4 нь Wave 1-ийн ОРОЙНООС доошлох ёсгүй.\n\nЖишээ:\n• Wave 1 төгсгөл: $120\n• Wave 4 нь $120-аас доош орох ЁСГҮЙ\n\nҮл хамаарах: ЗӨВХӨН Diagonal pattern-д Wave 4 нь Wave 1-ийн муж руу орж болно.\n\nДҮРЭМ ЗӨРЧИГДВӨЛ:\nХэрэв эдгээр 3 дүрмийн АЛЬ НЭГ нь зөрчигдвөл:\n1. Тоолол буруу\n2. Өөр хувилбар хайх\n3. Stop Loss-оо цохиулах хэрэгтэй болно\n\nСайн арилжаачин ҮРГЭЛЖ 2-3 хувилбартай байж — нэг нь зөрчигдвөл нөгөөгөөр сольдог.'
        },
        {
          title: '4-р бүлэг: Фибоначчи харьцаа',
          image: 'fibonacci',
          content: '12-р зууны Италийн математикч Леонардо Фибоначчи байгаль дээрх зүй тогтлыг илэрхийлдэг тоонуудын дарааллыг нээсэн.\n\nФИБОНАЧЧИ ДАРААЛАЛ:\n0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144...\n\nГурав дахь тоо = өмнөх 2 тооны нийлбэр.\n\nАЛТАН ХАРЬЦАА:\nФибоначчи тоонуудыг харьцуулахад:\n• 21/34 = 0.618\n• 34/55 = 0.618\n• 55/89 = 0.618\n→ 0.618 = АЛТАН ХАРЬЦАА\n\nӨөр чухал харьцаанууд:\n• 0.382 (jump 2 numbers)\n• 0.236 (jump 3 numbers)\n• 1.618 (Phi - Алтан тоо)\n• 2.618, 4.236 (extensions)\n\nRETRACEMENT (Засвар) ТҮВШИНҮҮД:\n\nWave 2 (Wave 1-ийн засвар):\n• 38.2%\n• 50%\n• 61.8% — НИЙТЛЭГ\n• 76.4% — Forex маржинд\n\nWave 4 (Wave 3-ийн засвар):\n• 23.6% — Trend хүчтэй\n• 38.2% — НИЙТЛЭГ\n• 50%\n\nWave B (Wave A-ийн засвар):\n• Zigzag B: 50-79%\n• Flat B: 90%+\n• Triangle B: 38.2-50%\n\nEXTENSION (Сунгалт) ТҮВШИНҮҮД:\n\nWave 3 (Wave 1-ийн өргөтгөл):\n• 100% — Хамгийн доод\n• 138.2%\n• 161.8% — НИЙТЛЭГ \n• 261.8% — Хүчтэй trend\n• 423.6% — Маш ховор\n\nWave 5 (Wave 1-тэй харьцангуй):\n• 0.618 × Wave 1\n• 1.000 × Wave 1\n• 1.618 × Wave 1\n\nWave C (Wave A-тай харьцангуй):\n• 0.618 × A\n• 1.000 × A — НИЙТЛЭГ\n• 1.618 × A\n\nСТРАТЕГИ:\nWave 1 төгссөний дараа → Fibonacci татна → Wave 2 ирэх боломжит түвшин олно → Тэр түвшинд entry.\n\nЭнэ нь зах зээлийн "хэл" — олон арилжаачид эдгээр түвшин дээр шийдвэр гаргадаг.'
        },
        {
          title: '5-р бүлэг: Импульсийн давалгааны хэв шинж',
          image: 'wave-3',
          content: 'Импульсийн давалгаа гэдэг нь trend-ийн дагуух 1-3-5 давалгаа юм. 3 төрөлтэй:\n\n1⃣ IMPULSE (Эрчимт):\n• Элиотын үндсэн шинжийг бүрдүүлсэн НИЙТЛЭГ хэлбэр\n• 5 давалгаатай (1-2-3-4-5)\n• Wave 1: 5 жижиг давалгаа\n• Wave 2: 3 давалгаа (засвар)\n• Wave 3: 5 жижиг давалгаа (urt)\n• Wave 4: 3 давалгаа (засвар)\n• Wave 5: 5 жижиг давалгаа\n\n2⃣ LEADING DIAGONAL:\n• Шинэ trend-ийн ЭХЛЭЛД (Wave 1) гарна\n• 5-3-5-3-5 бүтэцтэй\n• Trend line дотор хөдөлдөг\n• Wave 4 нь Wave 1-ийн муж руу ОРНО (онцгой!)\n• Forex дээр elbeg тохиолддог\n• Хүчтэй pullback дагалдана\n\n3⃣ ENDING DIAGONAL:\n• Trend-ийн ТӨГСГӨЛД (Wave 5) гарна\n• 3-3-3-3-3 бүтэцтэй (бүх давалгаа 3-таяа)\n• "Wedge" хэлбэртэй\n• Bull trend → Rising wedge\n• Bear trend → Falling wedge\n• Trend reversal-ыг сануулдаг!\n\nEXTENSIONS (ӨРГӨТГӨЛ):\n\n3 импульсийн давалгааны АЛЬ НЭГ нь "сунгагдсан" байж болно:\n\n• Wave 3 extension (хамгийн нийтлэг 60%):\n - Wave 3 нь нийт уртын 60-70%\n - Wave 3 = Wave 1 × 1.618 ба түүнээс дээш\n\n• Wave 5 extension (20%):\n - Wave 3 богино, Wave 5 урт\n - Тренд эцэст ойртож байгааг харуулна\n\n• Wave 1 extension (20%):\n - Wave 1 хамгийн урт\n - Дараагийн impulse-ууд богино\n\nАЛТАН ДҮРЭМ: Зөвхөн НЭГ давалгаа сунгагддаг. Хэрэв 2-ыг харж байгаа бол — тоолол буруу.\n\nСТРАТЕГИЙН СУУРЬ:\n• Wave 1 → Хүлээх (тренд анхааруулга)\n• Wave 2 → Орох (Fib 50-61.8%)\n• Wave 3 → Долоо хоногоор барих \n• Wave 4 → Дахин орох боломж\n• Wave 5 → Ашиг авах, гарах'
        },
        {
          title: '6-р бүлэг: Засварын давалгааны хэв шинж',
          image: 'corrective-waves',
          content: 'Засварын давалгаа гэдэг нь trend-ийн ЭСРЭГ хөдлөх 3 эсвэл 5 давалгаа юм. Хэлбэрээрээ ҮЛ ТӨЛӨВЛӨГДӨХ — олон төрөл, олон хувилбар.\n\nИМПУЛЬС ХӨНГӨН — ЗАСВАР ХҮНД!\n90% арилжаачид засварын давалгаан дээр мөнгөө алддаг.\n\n3 ҮНДСЭН ТӨРӨЛ:\n\n1⃣ ZIGZAG (5-3-5):\n• Хурц, эгц засвар\n• Бүтэц: Wave A (5 жижиг) - Wave B (3) - Wave C (5)\n• Wave B = A-ийн 50-79%\n• Wave C = A-тай тэнцүү эсвэл 1.618 дахин\n• Хамгийн ИХ Wave 2 дээр\n\nХэрэглээ:\n• Wave A дуустал хүлээ\n• Wave B-д Fib 50-79% орох боломж\n• Wave C-д ашиг ав\n\n2⃣ FLAT (3-3-5):\n• Хажуу тийш засвар\n• Бүтэц: A (3) - B (3) - C (5)\n\n3 хувилбар:\n\n• REGULAR FLAT:\n - B = A-ийн 100% (бараг бүрэн буцдаг)\n - C ≈ A урттай\n - Хамгийн нийтлэг\n\n• IRREGULAR (EXPANDED) FLAT:\n - B нь A-ИЙН ЭХЛЭЛЭЭС ДЭЭШ ГАРНА (1.236-1.382)\n - C нь A-аас урт (1.618-2.618)\n - Хүчтэй trend-ийн бэхжилт\n\n• RUNNING FLAT:\n - Trend МАШ хүчтэй\n - C нь A-ийн төгсгөлд хүрэхгүй\n - Бараг шууд trend үргэлжилнэ\n\nХамгийн их Wave 4 дээр\n\n3⃣ TRIANGLE (3-3-3-3-3):\n• 5 ДАВАЛГААТАЙ засвар\n• Бүтэц: A-B-C-D-E (бүгд 3-3-3-3-3)\n• Хажуу тийш, агшиж буй буюу өргөсөж буй\n\n4 хувилбар:\n• SYMMETRICAL (агшиж) — Орой буурч, ёроол өгсөнө\n• ASCENDING (өсөж) — Орой тэгш, ёроол өгсөнө\n• DESCENDING (буурч) — Орой буурч, ёроол тэгш\n• REVERSE SYMMETRICAL (өргөсөж) — Эсрэгээрээ\n\nЗөвхөн Wave 4, Wave B, эсвэл сүүлчийн X-д\nTriangle-ийн ДАРАА үргэлж "Thrust" (хүчтэй breakout) ирдэг!\n\nЦОГЦ ЗАСВАР:\n\nХэрэв засвар үргэлжилсээр байвал — ЦОГЦ паттерн үүснэ:\n\n• DOUBLE THREE: W-X-Y (2 төрлийн засвар X-ээр холбогдсон)\n - Жишээ: Zigzag-Flat, Flat-Triangle\n\n• TRIPLE THREE: W-X-Y-X-Z (3 засвар)\n - Маш ховор\n\nЧУХАЛ: Triangle нь үргэлж цогц паттерны ТӨГСГӨЛД байдаг.'
        },
        {
          title: '7-р бүлэг: Trend-ийн төгсгөлийг тодорхойлох 6 арга',
          content: 'Элиотын Wave 5 буюу trend-ийн төгсгөлд бэлэн байх ёстой. 6 төрлийн арга байна:\n\n1. CHANNEL (СУВАГ) ТЕХНИК:\n\nАлхам:\n1. Wave 1-ийн орой ба Wave 3-ийн оройг шулуунаар хол\n2. Wave 2-ийн ёроолоос параллель шугам татна\n3. Wave 4 төгсмөгц Wave 2-4 шулуун зурна\n4. Wave 1-3 шулуунтай параллель Wave 5 руу шугам\n5. 50% дунд параллель шугам зурна\n\nWave 5 нь сүүлчийн шулуун дээр төгсдөг!\nИхэвчлэн trend-ийн шугамын 61.8%-д төгсдөг.\n\n2. FIBONACCI EXTENSION:\n\nWave 5-ийн боломжит target:\n• Wave 1-тэй тэнцүү\n• Wave 1-ийн 0.618 дахин\n• Wave 1-ийн 1.618 дахин\n• (Wave 1 + Wave 3) × 0.618\n\n3. AWESOME OSCILLATOR DIVERGENCE:\n\n5/34 MACD ашиглана.\n• Wave 3 — oscillator-ын ХАМГИЙН ӨНДӨР\n• Wave 5 — үнэ шинэ оргил, гэвч oscillator дотроо\n• "Bearish divergence" — trend дуусч байна!\n\nТЭГШТГЭХ: Wave 3 vs Wave 5 oscillator зөрүү = trend reversal\n\n4. УРВУУ ЧАРТ ПАТТЕРН:\n\n• Rising/Falling Wedge (Diagonal)\n• Head & Shoulders (Wave 3-4-5-A-B-C)\n• Double/Triple Top/Bottom\n• 1-2-3 reversal pattern\n\n5. ФИБОНАЧЧИ EMA ШҮҮЛТҮҮР:\n\n8, 13, 21, 34 EMA хэрэглэнэ.\n• Лаа 8 EMA-г сэтэлбэл — trend түр амарна\n• Лаа 21, 34 EMA-аас дээш хаагдвал — reversal ойртож байна\n• Үнэ EMA-аас холдвол — trend дуусч байна\n\n6. ЯПОНЫ УРВУУ ЛААНУУД:\n\n• Pin bar (hammer / shooting star)\n• Engulfing\n• Doji (dragonfly / gravestone)\n• Morning / Evening star\n• Tweezer top / bottom\n\nЭДГЭЭР 6 АРГЫГ ХОСЛУУЛАХ:\nХэрэв 3-6 нь нэгэн зэрэг trend reversal заавал — баттай арилжаа.'
        },
        {
          title: '8-р бүлэг: Арилжааны Газрын зураг (Trading Map)',
          content: 'Элиотын онолыг ПРАКТИКТ хэрэглэх нь — арилжааны газрын зураг бөгөөд:\n• Хаана орох\n• Хаана Stop Loss тавих\n• Хаана position нэмэх\n• Хаашаа ашиг авах\n— гэх мэтийг тодорхойлно.\n\nАРИЛЖААНЫ ЦАГ ТОДОРХОЙЛОХ:\n\n• Position trader: Daily/Weekly\n• Swing trader: 1H/Daily\n• Day trader: 15M/1H\n\nОРОЛТУУД (Жишээ — Long position):\n\nENTRY 1: Wave 2 ёроол\n• Wave 1-ийн 50-61.8% Fib\n• 3 lot худалдан авна\n• Stop Loss: 0 цэг (Wave 1-ийн эхлэл)\n• Хэрэв доош орвол: 5 lot SELL → cэвэр 2 lot short болно\n\nENTRY 2: Wave 3 эхлэл\n• Subwave 1, 2 явсны дараа\n• Subwave 1-ээс дээш гарах үед\n• Нэмж 4 lot → нийт 6 lot\n• Stop Loss-ыг Wave 3 subwave 1-ийн ёроолд\n\nENTRY 3: Wave 4 ёроол\n• Wave 3-ийн 38.2-50% Fib\n• Wave 3 хүчнээс хамаарч 2 lot нэмнэ\n• Хэрэв Wave 3 < Wave 1 × 1.618: 2 lot нэмэх\n• Хэрэв > 1.618: position нэмэхгүй\n\nENTRY 4: Wave 5\n• Subwave 4 дээр сүүлчийн position\n• Stop Loss-ыг subwave 1 эхлэлд\n\nАШИГ АВАХ:\n\nPROFIT 1: Wave 1 төгсгөл (subwave i төвшин)\n• 2 lot ашиг ав\n\nPROFIT 2: Wave 3 target (1.618)\n• 7 lot ашиг ав\n• 3 lot үлдээх (extension боломжтой)\n\nPROFIT 3: Wave 5 target\n• 3-6 баталгаажуулалттай trend-ийн төгсгөлийг шалгана\n• Бүх позицоо хаана\n\nЭРСДЭЛИЙН МЕНЕЖМЕНТ:\n\n• Position бүрд эрсдэл = 1-2% данснаас\n• Stop Loss дүрмээр явна\n• Хувилбартай — нэг тоолол буруу болбол өөр рүү шилжих\n• 3-6 баталгаажуулалт хайх\n\nАРИЛЖААНЫ ЖУРНАЛ:\n• Огноо, цаг\n• Wave count (хувилбарууд)\n• Entry, Stop, Target\n• Үр дүн\n• Сэтгэл хөдлөл\n• Сургамж\n\nЭЦСИЙН ЗӨВЛӨГӨӨ: Элиотын онол нь СУРАЛЦАХАД хэцүү боловч — нэг удаа эзэмшсэний дараа таны хамгийн хүчтэй зэвсэг болно.'
        }
      ]
    }
  ];

  // ============ SVG ЗУРГУУД ============
  const svgImages = {
    'candle-anatomy': `<svg viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <text x="190" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Лааны бүтэц</text>
      <!-- Bullish (green) candle -->
      <g>
        <text x="90" y="55" text-anchor="middle" fill="#10b981" font-size="12" font-weight="600"> Bullish (Өсөлт)</text>
        <!-- Wick top -->
        <line x1="90" y1="65" x2="90" y2="100" stroke="#10b981" stroke-width="2"/>
        <!-- Body -->
        <rect x="70" y="100" width="40" height="100" fill="#10b981" stroke="#10b981" stroke-width="2"/>
        <!-- Wick bottom -->
        <line x1="90" y1="200" x2="90" y2="240" stroke="#10b981" stroke-width="2"/>
        <!-- Labels -->
        <text x="160" y="78" fill="#94a3b8" font-size="11">High</text>
        <line x1="115" y1="65" x2="155" y2="75" stroke="#64748b" stroke-width="0.5" stroke-dasharray="2,2"/>
        <text x="160" y="108" fill="#94a3b8" font-size="11">Close</text>
        <line x1="115" y1="100" x2="155" y2="105" stroke="#64748b" stroke-width="0.5" stroke-dasharray="2,2"/>
        <text x="160" y="208" fill="#94a3b8" font-size="11">Open</text>
        <line x1="115" y1="200" x2="155" y2="205" stroke="#64748b" stroke-width="0.5" stroke-dasharray="2,2"/>
        <text x="160" y="245" fill="#94a3b8" font-size="11">Low</text>
        <line x1="115" y1="240" x2="155" y2="242" stroke="#64748b" stroke-width="0.5" stroke-dasharray="2,2"/>
      </g>
      <!-- Bearish (red) candle -->
      <g>
        <text x="290" y="55" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="600"> Bearish (Уналт)</text>
        <line x1="290" y1="65" x2="290" y2="90" stroke="#ef4444" stroke-width="2"/>
        <rect x="270" y="90" width="40" height="110" fill="#ef4444" stroke="#ef4444" stroke-width="2"/>
        <line x1="290" y1="200" x2="290" y2="240" stroke="#ef4444" stroke-width="2"/>
        <text x="320" y="78" fill="#94a3b8" font-size="11">High</text>
        <text x="320" y="98" fill="#94a3b8" font-size="11">Open</text>
        <text x="320" y="208" fill="#94a3b8" font-size="11">Close</text>
        <text x="320" y="245" fill="#94a3b8" font-size="11">Low</text>
      </g>
    </svg>`,
    
    'pin-bar': `<svg viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <text x="190" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Pin Bar (Hammer / Shooting Star)</text>
      <!-- Hammer (Bullish) -->
      <g>
        <text x="90" y="55" text-anchor="middle" fill="#10b981" font-size="12" font-weight="600"> Hammer</text>
        <text x="90" y="70" text-anchor="middle" fill="#94a3b8" font-size="10">Уналтын ёроолд</text>
        <!-- Small body at top -->
        <line x1="90" y1="85" x2="90" y2="100" stroke="#10b981" stroke-width="2"/>
        <rect x="78" y="100" width="24" height="20" fill="#10b981"/>
        <!-- Long lower wick -->
        <line x1="90" y1="120" x2="90" y2="220" stroke="#10b981" stroke-width="2"/>
        <text x="135" y="170" fill="#94a3b8" font-size="11">Урт доод</text>
        <text x="135" y="185" fill="#94a3b8" font-size="11">сүүл</text>
        <!-- Trend arrow up -->
        <path d="M 50 240 L 90 230 L 130 240" stroke="#10b981" stroke-width="2" fill="none" marker-end="url(#ag)"/>
        <text x="90" y="260" text-anchor="middle" fill="#10b981" font-size="11" font-weight="600">↑ Өсөлт</text>
      </g>
      <!-- Shooting Star (Bearish) -->
      <g>
        <text x="290" y="55" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="600"> Shooting Star</text>
        <text x="290" y="70" text-anchor="middle" fill="#94a3b8" font-size="10">Өсөлтийн оройд</text>
        <!-- Long upper wick -->
        <line x1="290" y1="85" x2="290" y2="180" stroke="#ef4444" stroke-width="2"/>
        <text x="240" y="130" text-anchor="end" fill="#94a3b8" font-size="11">Урт дээд</text>
        <text x="240" y="145" text-anchor="end" fill="#94a3b8" font-size="11">сүүл</text>
        <!-- Small body at bottom -->
        <rect x="278" y="180" width="24" height="20" fill="#ef4444"/>
        <line x1="290" y1="200" x2="290" y2="215" stroke="#ef4444" stroke-width="2"/>
        <!-- Trend arrow down -->
        <path d="M 250 215 L 290 230 L 330 220" stroke="#ef4444" stroke-width="2" fill="none"/>
        <text x="290" y="260" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="600">↓ Уналт</text>
      </g>
      <defs>
        <marker id="ag" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M2 1L8 5L2 9" fill="none" stroke="#10b981" stroke-width="1.5"/>
        </marker>
      </defs>
    </svg>`,
    
    'engulfing': `<svg viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <text x="190" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Engulfing Bar Pattern</text>
      <!-- Bullish Engulfing -->
      <g>
        <text x="90" y="55" text-anchor="middle" fill="#10b981" font-size="12" font-weight="600"> Bullish Engulfing</text>
        <!-- Small red candle -->
        <line x1="65" y1="80" x2="65" y2="100" stroke="#ef4444" stroke-width="2"/>
        <rect x="55" y="100" width="20" height="40" fill="#ef4444"/>
        <line x1="65" y1="140" x2="65" y2="160" stroke="#ef4444" stroke-width="2"/>
        <!-- Big green candle ENGULFING -->
        <line x1="105" y1="80" x2="105" y2="95" stroke="#10b981" stroke-width="2"/>
        <rect x="85" y="95" width="40" height="80" fill="#10b981"/>
        <line x1="105" y1="175" x2="105" y2="190" stroke="#10b981" stroke-width="2"/>
        <text x="90" y="220" text-anchor="middle" fill="#94a3b8" font-size="10">Бяцхан → Том ногоон</text>
        <text x="90" y="235" text-anchor="middle" fill="#94a3b8" font-size="10">"залгидаг"</text>
        <text x="90" y="260" text-anchor="middle" fill="#10b981" font-size="11" font-weight="600">↑ Reversal Up</text>
      </g>
      <!-- Bearish Engulfing -->
      <g>
        <text x="290" y="55" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="600"> Bearish Engulfing</text>
        <!-- Small green candle -->
        <line x1="265" y1="100" x2="265" y2="115" stroke="#10b981" stroke-width="2"/>
        <rect x="255" y="115" width="20" height="35" fill="#10b981"/>
        <line x1="265" y1="150" x2="265" y2="170" stroke="#10b981" stroke-width="2"/>
        <!-- Big red candle ENGULFING -->
        <line x1="305" y1="80" x2="305" y2="100" stroke="#ef4444" stroke-width="2"/>
        <rect x="285" y="100" width="40" height="85" fill="#ef4444"/>
        <line x1="305" y1="185" x2="305" y2="200" stroke="#ef4444" stroke-width="2"/>
        <text x="290" y="220" text-anchor="middle" fill="#94a3b8" font-size="10">Бяцхан → Том улаан</text>
        <text x="290" y="235" text-anchor="middle" fill="#94a3b8" font-size="10">"залгидаг"</text>
        <text x="290" y="260" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="600">↓ Reversal Down</text>
      </g>
    </svg>`,
    
    'doji': `<svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <text x="190" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Doji Хувилбарууд</text>
      <!-- Standard Doji -->
      <g>
        <text x="65" y="55" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="600">Standard</text>
        <line x1="65" y1="70" x2="65" y2="180" stroke="#fbbf24" stroke-width="1.5"/>
        <line x1="50" y1="125" x2="80" y2="125" stroke="#fbbf24" stroke-width="3"/>
        <text x="65" y="210" text-anchor="middle" fill="#94a3b8" font-size="10">Шийдвэргүй</text>
        <text x="65" y="225" text-anchor="middle" fill="#94a3b8" font-size="10">байдал</text>
      </g>
      <!-- Dragonfly -->
      <g>
        <text x="155" y="55" text-anchor="middle" fill="#10b981" font-size="11" font-weight="600"> Dragonfly</text>
        <line x1="155" y1="80" x2="155" y2="80" stroke="#10b981" stroke-width="1.5"/>
        <line x1="140" y1="80" x2="170" y2="80" stroke="#10b981" stroke-width="3"/>
        <line x1="155" y1="80" x2="155" y2="180" stroke="#10b981" stroke-width="1.5"/>
        <text x="155" y="210" text-anchor="middle" fill="#10b981" font-size="10">↑ Bullish</text>
        <text x="155" y="225" text-anchor="middle" fill="#94a3b8" font-size="10">reversal</text>
      </g>
      <!-- Gravestone -->
      <g>
        <text x="245" y="55" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="600"> Gravestone</text>
        <line x1="245" y1="80" x2="245" y2="180" stroke="#ef4444" stroke-width="1.5"/>
        <line x1="230" y1="180" x2="260" y2="180" stroke="#ef4444" stroke-width="3"/>
        <text x="245" y="210" text-anchor="middle" fill="#ef4444" font-size="10">↓ Bearish</text>
        <text x="245" y="225" text-anchor="middle" fill="#94a3b8" font-size="10">reversal</text>
      </g>
      <!-- Long-legged -->
      <g>
        <text x="335" y="55" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="600">Long-legged</text>
        <line x1="335" y1="70" x2="335" y2="190" stroke="#a78bfa" stroke-width="1.5"/>
        <line x1="320" y1="130" x2="350" y2="130" stroke="#a78bfa" stroke-width="3"/>
        <text x="335" y="210" text-anchor="middle" fill="#94a3b8" font-size="10">Хүчтэй</text>
        <text x="335" y="225" text-anchor="middle" fill="#94a3b8" font-size="10">тэмцэл</text>
      </g>
    </svg>`,
    
    'inside-bar': `<svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <text x="190" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Inside Bar (Harami)</text>
      <!-- Mother Candle -->
      <g>
        <text x="120" y="55" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="600">Эх лаа (Mother)</text>
        <line x1="120" y1="70" x2="120" y2="85" stroke="#10b981" stroke-width="2"/>
        <rect x="100" y="85" width="40" height="120" fill="#10b981"/>
        <line x1="120" y1="205" x2="120" y2="220" stroke="#10b981" stroke-width="2"/>
        <text x="120" y="245" text-anchor="middle" fill="#94a3b8" font-size="10">Том лаа</text>
      </g>
      <!-- Inside Bar (baby) -->
      <g>
        <text x="240" y="55" text-anchor="middle" fill="#fbbf24" font-size="12" font-weight="600">Хүүхэд лаа (Baby)</text>
        <!-- Mother shadow -->
        <line x1="240" y1="70" x2="240" y2="85" stroke="#10b981" stroke-width="2" opacity="0.3"/>
        <rect x="220" y="85" width="40" height="120" fill="#10b981" opacity="0.2"/>
        <line x1="240" y1="205" x2="240" y2="220" stroke="#10b981" stroke-width="2" opacity="0.3"/>
        <!-- Baby candle inside -->
        <line x1="270" y1="115" x2="270" y2="125" stroke="#fbbf24" stroke-width="2"/>
        <rect x="260" y="125" width="20" height="40" fill="#fbbf24"/>
        <line x1="270" y1="165" x2="270" y2="175" stroke="#fbbf24" stroke-width="2"/>
        <text x="240" y="245" text-anchor="middle" fill="#94a3b8" font-size="10">Бяцхан, дотор</text>
      </g>
      <!-- Description box -->
      <rect x="40" y="0" width="300" height="0" fill="none"/>
    </svg>`,
    
    'morning-evening-star': `<svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <text x="190" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Morning / Evening Star</text>
      <!-- Morning Star -->
      <g>
        <text x="90" y="55" text-anchor="middle" fill="#10b981" font-size="12" font-weight="600"> Morning Star</text>
        <text x="90" y="70" text-anchor="middle" fill="#94a3b8" font-size="10">Уналтын ёроолд</text>
        <!-- Big red -->
        <line x1="50" y1="85" x2="50" y2="95" stroke="#ef4444" stroke-width="2"/>
        <rect x="42" y="95" width="16" height="80" fill="#ef4444"/>
        <line x1="50" y1="175" x2="50" y2="185" stroke="#ef4444" stroke-width="2"/>
        <!-- Small middle (doji-ish) -->
        <line x1="90" y1="155" x2="90" y2="195" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="84" y="170" width="12" height="12" fill="#94a3b8"/>
        <!-- Big green -->
        <line x1="130" y1="100" x2="130" y2="110" stroke="#10b981" stroke-width="2"/>
        <rect x="122" y="110" width="16" height="75" fill="#10b981"/>
        <line x1="130" y1="185" x2="130" y2="200" stroke="#10b981" stroke-width="2"/>
        <text x="90" y="230" text-anchor="middle" fill="#10b981" font-size="11" font-weight="600">↑ Bullish</text>
        <text x="90" y="245" text-anchor="middle" fill="#94a3b8" font-size="10">reversal</text>
      </g>
      <!-- Evening Star -->
      <g>
        <text x="290" y="55" text-anchor="middle" fill="#ef4444" font-size="12" font-weight="600"> Evening Star</text>
        <text x="290" y="70" text-anchor="middle" fill="#94a3b8" font-size="10">Өсөлтийн оройд</text>
        <!-- Big green -->
        <line x1="250" y1="100" x2="250" y2="110" stroke="#10b981" stroke-width="2"/>
        <rect x="242" y="110" width="16" height="75" fill="#10b981"/>
        <line x1="250" y1="185" x2="250" y2="195" stroke="#10b981" stroke-width="2"/>
        <!-- Small middle -->
        <line x1="290" y1="85" x2="290" y2="120" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="284" y="98" width="12" height="12" fill="#94a3b8"/>
        <!-- Big red -->
        <line x1="330" y1="105" x2="330" y2="115" stroke="#ef4444" stroke-width="2"/>
        <rect x="322" y="115" width="16" height="80" fill="#ef4444"/>
        <line x1="330" y1="195" x2="330" y2="205" stroke="#ef4444" stroke-width="2"/>
        <text x="290" y="230" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="600">↓ Bearish</text>
        <text x="290" y="245" text-anchor="middle" fill="#94a3b8" font-size="10">reversal</text>
      </g>
    </svg>`,
    
    'support-resistance': `<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <text x="190" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Support & Resistance</text>
      <!-- Resistance line -->
      <line x1="40" y1="60" x2="340" y2="60" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="350" y="64" fill="#ef4444" font-size="10">R</text>
      <!-- Support line -->
      <line x1="40" y1="170" x2="340" y2="170" stroke="#10b981" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="350" y="174" fill="#10b981" font-size="10">S</text>
      <!-- Price line zigzagging -->
      <polyline points="50,150 80,75 110,140 140,65 170,155 200,70 230,160 260,85 290,165 320,75" 
        fill="none" stroke="#60a5fa" stroke-width="2"/>
      <!-- Bounces -->
      <circle cx="80" cy="75" r="4" fill="#ef4444"/>
      <circle cx="140" cy="65" r="4" fill="#ef4444"/>
      <circle cx="200" cy="70" r="4" fill="#ef4444"/>
      <circle cx="260" cy="85" r="4" fill="#ef4444"/>
      <circle cx="110" cy="140" r="4" fill="#10b981"/>
      <circle cx="170" cy="155" r="4" fill="#10b981"/>
      <circle cx="230" cy="160" r="4" fill="#10b981"/>
      <circle cx="290" cy="165" r="4" fill="#10b981"/>
      <text x="190" y="210" text-anchor="middle" fill="#94a3b8" font-size="11">Үнэ түвшинүүд хооронд хэлбэлзэнэ</text>
      <text x="190" y="228" text-anchor="middle" fill="#94a3b8" font-size="10">Resistance дээр зарна, Support дээр авна</text>
    </svg>`,
    
    'trend-types': `<svg viewBox="0 0 380 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <text x="190" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Зах зээлийн 3 төрөл</text>
      <!-- Uptrend -->
      <g>
        <text x="80" y="60" text-anchor="middle" fill="#10b981" font-size="11" font-weight="600">Uptrend</text>
        <polyline points="30,140 50,120 65,130 85,90 100,100 120,70 135,80" 
          fill="none" stroke="#10b981" stroke-width="2"/>
        <text x="80" y="170" text-anchor="middle" fill="#94a3b8" font-size="9">HH + HL</text>
        <text x="80" y="185" text-anchor="middle" fill="#94a3b8" font-size="9">↗ дээш</text>
      </g>
      <!-- Downtrend -->
      <g>
        <text x="190" y="60" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="600">Downtrend</text>
        <polyline points="140,80 160,100 175,90 195,120 210,110 230,140 245,130" 
          fill="none" stroke="#ef4444" stroke-width="2"/>
        <text x="190" y="170" text-anchor="middle" fill="#94a3b8" font-size="9">LH + LL</text>
        <text x="190" y="185" text-anchor="middle" fill="#94a3b8" font-size="9">↘ доош</text>
      </g>
      <!-- Range -->
      <g>
        <text x="305" y="60" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="600">Range</text>
        <line x1="255" y1="90" x2="355" y2="90" stroke="#fbbf24" stroke-width="0.8" stroke-dasharray="2,2"/>
        <line x1="255" y1="135" x2="355" y2="135" stroke="#fbbf24" stroke-width="0.8" stroke-dasharray="2,2"/>
        <polyline points="260,130 275,95 290,130 310,95 325,130 345,95" 
          fill="none" stroke="#fbbf24" stroke-width="2"/>
        <text x="305" y="170" text-anchor="middle" fill="#94a3b8" font-size="9">Sideways</text>
        <text x="305" y="185" text-anchor="middle" fill="#94a3b8" font-size="9">↔ хажуу</text>
      </g>
      <!-- Description -->
      <text x="190" y="225" text-anchor="middle" fill="#94a3b8" font-size="10">Зах зээл 70%-ийн хугацаанд range хийж,</text>
      <text x="190" y="240" text-anchor="middle" fill="#94a3b8" font-size="10">30%-ийн хугацаанд тренд хийдэг</text>
    </svg>`,
    
    'elliott-waves': `<svg viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <text x="190" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Эллиотын 8 давалгаа</text>
      <!-- Wave path -->
      <polyline points="30,210 70,170 50,200 130,80 100,140 200,40 170,90 250,140 280,90 330,180" 
        fill="none" stroke="#60a5fa" stroke-width="2"/>
      <!-- Numbered points -->
      <g font-size="11" font-weight="700">
        <circle cx="30" cy="210" r="10" fill="#1e293b" stroke="#60a5fa" stroke-width="1.5"/>
        <text x="30" y="214" text-anchor="middle" fill="#60a5fa">0</text>
        
        <circle cx="70" cy="170" r="10" fill="#10b981"/>
        <text x="70" y="174" text-anchor="middle" fill="white">1</text>
        
        <circle cx="50" cy="200" r="10" fill="#ef4444"/>
        <text x="50" y="204" text-anchor="middle" fill="white">2</text>
        
        <circle cx="130" cy="80" r="11" fill="#10b981" stroke="#fbbf24" stroke-width="2"/>
        <text x="130" y="84" text-anchor="middle" fill="white">3</text>
        
        <circle cx="100" cy="140" r="10" fill="#ef4444"/>
        <text x="100" y="144" text-anchor="middle" fill="white">4</text>
        
        <circle cx="200" cy="40" r="10" fill="#10b981"/>
        <text x="200" y="44" text-anchor="middle" fill="white">5</text>
        
        <circle cx="170" cy="90" r="10" fill="#a78bfa"/>
        <text x="170" y="94" text-anchor="middle" fill="white">A</text>
        
        <circle cx="250" cy="140" r="10" fill="#a78bfa"/>
        <text x="250" y="144" text-anchor="middle" fill="white">B</text>
        
        <circle cx="280" cy="90" r="10" fill="#a78bfa"/>
        <text x="280" y="94" text-anchor="middle" fill="white">A</text>
        
        <circle cx="330" cy="180" r="10" fill="#a78bfa"/>
        <text x="330" y="184" text-anchor="middle" fill="white">C</text>
      </g>
      <!-- Labels -->
      <text x="105" y="240" text-anchor="middle" fill="#10b981" font-size="11" font-weight="600">Импульс (1-5)</text>
      <text x="105" y="255" text-anchor="middle" fill="#94a3b8" font-size="10">Trend дагуу</text>
      <text x="270" y="240" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="600">Засвар (A-B-C)</text>
      <text x="270" y="255" text-anchor="middle" fill="#94a3b8" font-size="10">Trend эсрэг</text>
      <!-- Wave 3 highlight -->
      <text x="155" y="68" fill="#fbbf24" font-size="9" font-weight="600"> Хамгийн хүчтэй</text>
    </svg>`,
    
    'elliott-rules': `<svg viewBox="0 0 380 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <text x="190" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Эллиотын 3 үндсэн дүрэм</text>
      <!-- Rule 1 -->
      <g>
        <rect x="20" y="45" width="340" height="80" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="0.5"/>
        <text x="35" y="65" fill="#10b981" font-size="11" font-weight="700">Дүрэм 1: Wave 2</text>
        <text x="35" y="82" fill="#cbd5e1" font-size="10">Wave 1-ийн ЭХЛЭЛЭЭС доош ороход</text>
        <text x="35" y="96" fill="#cbd5e1" font-size="10">тоолол БУРУУ.</text>
        <!-- Mini chart -->
        <line x1="280" y1="105" x2="280" y2="115" stroke="#475569" stroke-width="1" stroke-dasharray="2,2"/>
        <polyline points="240,115 280,75 260,105" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
        <circle cx="240" cy="115" r="5" fill="#60a5fa"/>
        <text x="240" y="118" text-anchor="middle" fill="white" font-size="7" font-weight="700">0</text>
        <circle cx="280" cy="75" r="5" fill="#10b981"/>
        <text x="280" y="78" text-anchor="middle" fill="white" font-size="7" font-weight="700">1</text>
        <circle cx="260" cy="105" r="5" fill="#ef4444"/>
        <text x="260" y="108" text-anchor="middle" fill="white" font-size="7" font-weight="700">2</text>
      </g>
      <!-- Rule 2 -->
      <g>
        <rect x="20" y="135" width="340" height="80" rx="8" fill="#1e293b" stroke="#fbbf24" stroke-width="0.5"/>
        <text x="35" y="155" fill="#fbbf24" font-size="11" font-weight="700">Дүрэм 2: Wave 3</text>
        <text x="35" y="172" fill="#cbd5e1" font-size="10">ХАМГИЙН БОГИНО байж болохгүй.</text>
        <text x="35" y="186" fill="#cbd5e1" font-size="10">Ихэвчлэн хамгийн урт.</text>
        <!-- Mini chart -->
        <polyline points="240,205 260,185 250,200 290,150 275,180 305,165" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
        <circle cx="290" cy="150" r="6" fill="#fbbf24" stroke="white" stroke-width="1"/>
        <text x="290" y="153" text-anchor="middle" fill="white" font-size="7" font-weight="700">3</text>
      </g>
      <!-- Rule 3 -->
      <g>
        <rect x="20" y="225" width="340" height="80" rx="8" fill="#1e293b" stroke="#ef4444" stroke-width="0.5"/>
        <text x="35" y="245" fill="#ef4444" font-size="11" font-weight="700">Дүрэм 3: Wave 4</text>
        <text x="35" y="262" fill="#cbd5e1" font-size="10">Wave 1-ийн МУЖ руу орохгүй.</text>
        <text x="35" y="276" fill="#cbd5e1" font-size="10">(Diagonal-аас бусдад)</text>
        <!-- Mini chart -->
        <line x1="240" y1="270" x2="310" y2="270" stroke="#10b981" stroke-width="0.8" stroke-dasharray="2,2"/>
        <text x="316" y="272" fill="#10b981" font-size="8">W1 top</text>
        <polyline points="240,290 250,275 245,285 280,255 270,270" fill="none" stroke="#60a5fa" stroke-width="1.5"/>
        <circle cx="270" cy="270" r="5" fill="#ef4444"/>
        <text x="270" y="273" text-anchor="middle" fill="white" font-size="7" font-weight="700">4</text>
      </g>
    </svg>`,
    
    'fibonacci': `<svg viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <text x="190" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Fibonacci Retracement</text>
      <!-- Price movement -->
      <line x1="50" y1="220" x2="200" y2="60" stroke="#10b981" stroke-width="2"/>
      <circle cx="50" cy="220" r="5" fill="#10b981"/>
      <text x="40" y="237" fill="#94a3b8" font-size="10">0%</text>
      <circle cx="200" cy="60" r="5" fill="#10b981"/>
      <text x="200" y="55" fill="#94a3b8" font-size="10">100%</text>
      <!-- Fib levels -->
      <g font-size="9">
        <line x1="50" y1="60" x2="340" y2="60" stroke="#94a3b8" stroke-width="0.5" stroke-dasharray="2,2"/>
        <text x="345" y="63" fill="#94a3b8">1.000</text>
        
        <line x1="50" y1="98" x2="340" y2="98" stroke="#fbbf24" stroke-width="0.5" stroke-dasharray="2,2"/>
        <text x="345" y="101" fill="#fbbf24">0.764</text>
        
        <line x1="50" y1="121" x2="340" y2="121" stroke="#10b981" stroke-width="1" stroke-dasharray="3,2"/>
        <text x="345" y="124" fill="#10b981" font-weight="600">0.618 </text>
        
        <line x1="50" y1="140" x2="340" y2="140" stroke="#60a5fa" stroke-width="0.5" stroke-dasharray="2,2"/>
        <text x="345" y="143" fill="#60a5fa">0.500</text>
        
        <line x1="50" y1="159" x2="340" y2="159" stroke="#a78bfa" stroke-width="0.5" stroke-dasharray="2,2"/>
        <text x="345" y="162" fill="#a78bfa">0.382</text>
        
        <line x1="50" y1="182" x2="340" y2="182" stroke="#94a3b8" stroke-width="0.5" stroke-dasharray="2,2"/>
        <text x="345" y="185" fill="#94a3b8">0.236</text>
        
        <line x1="50" y1="220" x2="340" y2="220" stroke="#94a3b8" stroke-width="0.5" stroke-dasharray="2,2"/>
        <text x="345" y="223" fill="#94a3b8">0.000</text>
      </g>
      <!-- Retracement -->
      <polyline points="200,60 250,121 280,90 310,140" fill="none" stroke="#fbbf24" stroke-width="2"/>
      <circle cx="250" cy="121" r="4" fill="#fbbf24"/>
      <text x="190" y="265" text-anchor="middle" fill="#94a3b8" font-size="10">Алтан харьцаа: 0.618 — хамгийн чухал retracement</text>
    </svg>`,
    
    'corrective-waves': `<svg viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <text x="190" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">Засварын 3 төрөл</text>
      <!-- Zigzag -->
      <g>
        <text x="65" y="55" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="600">Zigzag</text>
        <text x="65" y="70" text-anchor="middle" fill="#94a3b8" font-size="9">5-3-5</text>
        <polyline points="30,90 50,150 65,115 85,180" fill="none" stroke="#ef4444" stroke-width="2"/>
        <circle cx="30" cy="90" r="6" fill="#ef4444"/>
        <text x="30" y="93" text-anchor="middle" fill="white" font-size="8" font-weight="700">A</text>
        <circle cx="50" cy="150" r="6" fill="#ef4444"/>
        <text x="50" y="153" text-anchor="middle" fill="white" font-size="8" font-weight="700">·</text>
        <circle cx="65" cy="115" r="6" fill="#ef4444"/>
        <text x="65" y="118" text-anchor="middle" fill="white" font-size="8" font-weight="700">B</text>
        <circle cx="85" cy="180" r="6" fill="#ef4444"/>
        <text x="85" y="183" text-anchor="middle" fill="white" font-size="8" font-weight="700">C</text>
        <text x="60" y="220" text-anchor="middle" fill="#94a3b8" font-size="9">Хурц,</text>
        <text x="60" y="234" text-anchor="middle" fill="#94a3b8" font-size="9">эгц</text>
        <text x="60" y="255" text-anchor="middle" fill="#fbbf24" font-size="9">Wave 2-д</text>
      </g>
      <!-- Flat -->
      <g>
        <text x="190" y="55" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="600">Flat</text>
        <text x="190" y="70" text-anchor="middle" fill="#94a3b8" font-size="9">3-3-5</text>
        <polyline points="155,90 175,150 195,90 215,150" fill="none" stroke="#fbbf24" stroke-width="2"/>
        <circle cx="155" cy="90" r="6" fill="#fbbf24"/>
        <text x="155" y="93" text-anchor="middle" fill="white" font-size="8" font-weight="700">A</text>
        <circle cx="175" cy="150" r="6" fill="#fbbf24"/>
        <text x="175" y="153" text-anchor="middle" fill="white" font-size="8" font-weight="700">·</text>
        <circle cx="195" cy="90" r="6" fill="#fbbf24"/>
        <text x="195" y="93" text-anchor="middle" fill="white" font-size="8" font-weight="700">B</text>
        <circle cx="215" cy="150" r="6" fill="#fbbf24"/>
        <text x="215" y="153" text-anchor="middle" fill="white" font-size="8" font-weight="700">C</text>
        <text x="190" y="220" text-anchor="middle" fill="#94a3b8" font-size="9">Хажуу</text>
        <text x="190" y="234" text-anchor="middle" fill="#94a3b8" font-size="9">тийш</text>
        <text x="190" y="255" text-anchor="middle" fill="#fbbf24" font-size="9">Wave 4-д</text>
      </g>
      <!-- Triangle -->
      <g>
        <text x="320" y="55" text-anchor="middle" fill="#a78bfa" font-size="11" font-weight="600">Triangle</text>
        <text x="320" y="70" text-anchor="middle" fill="#94a3b8" font-size="9">3-3-3-3-3</text>
        <polyline points="285,90 305,160 320,105 335,150 350,120" fill="none" stroke="#a78bfa" stroke-width="2"/>
        <line x1="285" y1="90" x2="350" y2="120" stroke="#a78bfa" stroke-width="0.5" stroke-dasharray="2,2"/>
        <line x1="305" y1="160" x2="350" y2="120" stroke="#a78bfa" stroke-width="0.5" stroke-dasharray="2,2"/>
        <text x="282" y="95" fill="#a78bfa" font-size="7" font-weight="700">A</text>
        <text x="307" y="170" fill="#a78bfa" font-size="7" font-weight="700">B</text>
        <text x="319" y="98" fill="#a78bfa" font-size="7" font-weight="700">C</text>
        <text x="338" y="160" fill="#a78bfa" font-size="7" font-weight="700">D</text>
        <text x="353" y="118" fill="#a78bfa" font-size="7" font-weight="700">E</text>
        <text x="320" y="220" text-anchor="middle" fill="#94a3b8" font-size="9">Агшиж буй</text>
        <text x="320" y="234" text-anchor="middle" fill="#94a3b8" font-size="9">5 давалгаа</text>
        <text x="320" y="255" text-anchor="middle" fill="#fbbf24" font-size="9">Wave 4 / B</text>
      </g>
    </svg>`,
    
    'wave-3': `<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto">
      <text x="190" y="25" text-anchor="middle" fill="#fbbf24" font-size="13" font-weight="700"> Wave 3 — Хамгийн ашигтай</text>
      <!-- Wave path emphasizing wave 3 -->
      <polyline points="30,200 60,170 50,190 180,50 150,120 230,30 210,70 280,110 310,75 350,150" 
        fill="none" stroke="#475569" stroke-width="1.5"/>
      <!-- Highlight wave 3 -->
      <line x1="50" y1="190" x2="180" y2="50" stroke="#fbbf24" stroke-width="3"/>
      <!-- Numbers -->
      <g font-size="10" font-weight="700">
        <circle cx="30" cy="200" r="8" fill="#1e293b" stroke="#60a5fa"/>
        <text x="30" y="203" text-anchor="middle" fill="#60a5fa">0</text>
        <circle cx="60" cy="170" r="8" fill="#10b981"/>
        <text x="60" y="173" text-anchor="middle" fill="white">1</text>
        <circle cx="50" cy="190" r="8" fill="#ef4444"/>
        <text x="50" y="193" text-anchor="middle" fill="white">2</text>
        <circle cx="180" cy="50" r="11" fill="#fbbf24" stroke="white" stroke-width="2"/>
        <text x="180" y="54" text-anchor="middle" fill="white">3</text>
        <circle cx="150" cy="120" r="8" fill="#ef4444"/>
        <text x="150" y="123" text-anchor="middle" fill="white">4</text>
        <circle cx="230" cy="30" r="8" fill="#10b981"/>
        <text x="230" y="33" text-anchor="middle" fill="white">5</text>
      </g>
      <!-- Wave 3 properties -->
      <text x="100" y="125" fill="#fbbf24" font-size="11" font-weight="600">Wave 3</text>
      <text x="100" y="140" fill="#94a3b8" font-size="9">Хамгийн урт</text>
      <text x="100" y="153" fill="#94a3b8" font-size="9">Хамгийн хурдан</text>
      <text x="100" y="166" fill="#94a3b8" font-size="9">Volume хамгийн их</text>
      <!-- Target -->
      <line x1="180" y1="50" x2="180" y2="225" stroke="#fbbf24" stroke-width="0.5" stroke-dasharray="2,2"/>
      <text x="190" y="223" fill="#fbbf24" font-size="9">Target: Wave 1 × 1.618</text>
    </svg>`
  };


  const glossary = [
    { term: 'Bid', def: 'Худалдан авагчдын санал болгож буй хамгийн өндөр үнэ' },
    { term: 'Ask', def: 'Худалдагчдын шаардаж буй хамгийн бага үнэ' },
    { term: 'Spread', def: 'Bid ба Ask-ийн хоорондох зөрүү' },
    { term: 'Pip', def: 'Үнийн хамгийн бага өөрчлөлтийн нэгж (форекст 0.0001)' },
    { term: 'Lot', def: 'Арилжааны хэмжээний нэгж. Standard lot = 100,000 нэгж' },
    { term: 'Leverage', def: 'Хөшүүрэг — өөрийн хөрөнгөөс илүү хэмжээгээр арилжаа хийх боломж' },
    { term: 'Margin', def: 'Leverage арилжаа нээхэд шаардлагатай барьцаа мөнгө' },
    { term: 'Long', def: 'Үнэ өснө гэж найдан худалдан авах position' },
    { term: 'Short', def: 'Үнэ буурна гэж найдан зарах position' },
    { term: 'Stop Loss', def: 'Тодорхой үнэд хүрвэл арилжааг автоматаар хааж алдагдлыг хязгаарлах захиалга' },
    { term: 'Take Profit', def: 'Тодорхой үнэд хүрвэл ашгийг тогтоон арилжааг хаах захиалга' },
    { term: 'Volatility', def: 'Үнийн хэлбэлзлийн хэмжээ. Их volatility = их эрсдэл/боломж' },
    { term: 'Liquidity', def: 'Хөрөнгийг хурдан худалдан авах/зарах боломж' },
    { term: 'Bull Market', def: 'Үнэ өсөж буй зах зээл (бух)' },
    { term: 'Bear Market', def: 'Үнэ буурч буй зах зээл (баавгай)' },
    { term: 'Support', def: 'Үнэ буурахад зогсох төлөвтэй түвшин' },
    { term: 'Resistance', def: 'Үнэ өсөхөд зогсох төлөвтэй түвшин' },
    // Candlestick
    { term: 'Candlestick', def: 'Лааны хэлбэртэй үнийн графикийн загвар. Open, High, Low, Close үнийг харуулна' },
    { term: 'Pin Bar', def: 'Урт сүүл, жижиг биетэй лаа. Reversal дохио өгдөг' },
    { term: 'Hammer', def: 'Bullish pin bar. Урт доод сүүл, уналтын ёроолд үүснэ' },
    { term: 'Shooting Star', def: 'Bearish pin bar. Урт дээд сүүл, өсөлтийн оройд үүснэ' },
    { term: 'Engulfing Bar', def: '2 лаа — 2 дахь нь эхнийхээ бүрэн залгидаг. Хүчтэй reversal дохио' },
    { term: 'Doji', def: 'Open ≈ Close. Шийдвэргүй байдал, тэгш байдлын дохио' },
    { term: 'Dragonfly Doji', def: 'Урт доод сүүлтэй Doji. Bullish дохио' },
    { term: 'Gravestone Doji', def: 'Урт дээд сүүлтэй Doji. Bearish дохио' },
    { term: 'Inside Bar', def: 'Harami гэгдэх. Жижиг лаа том лааны дотор. Consolidation' },
    { term: 'Morning Star', def: '3 лаатай bullish reversal паттерн' },
    { term: 'Evening Star', def: '3 лаатай bearish reversal паттерн' },
    // Elliott
    { term: 'Elliott Wave', def: 'Зах зээлийн давтамжит давалгаан хэв шинж. 5 импульс + 3 засвар = 8 давалгаа' },
    { term: 'Impulse Wave', def: 'Тренд дагуух 1-3-5 давалгаа' },
    { term: 'Corrective Wave', def: 'Тренд эсрэг A-B-C 3 давалгаа' },
    { term: 'Wave 3', def: 'Элиотын хамгийн хүчтэй, урт давалгаа. Ашгийн хамгийн их боломж' },
    { term: 'Zigzag', def: 'Хурц 5-3-5 бүтэцтэй засварын давалгаа' },
    { term: 'Flat', def: '3-3-5 хажуу тийш засварын давалгаа' },
    { term: 'Triangle', def: 'A-B-C-D-E 5 давалгаатай хажуу тийш засвар. Зөвхөн Wave 4, B-д' },
    { term: 'Diagonal', def: 'Trend line дотор хөдлөх 5-3-5-3-5 эсвэл 3-3-3-3-3 импульс' },
    { term: 'Fibonacci', def: 'Леонардо Фибоначчигийн нээсэн математик дараалал. 0,1,1,2,3,5,8,13,21,34...' },
    { term: 'Golden Ratio', def: 'Алтан харьцаа = 0.618 (эсвэл 1.618). Элиот ашигладаг гол харьцаа' },
    { term: 'Retracement', def: 'Үнэ буцах түвшин. Нийтлэг: 38.2%, 50%, 61.8%' },
    { term: 'Extension', def: 'Импульс давалгааны target түвшин. 100%, 161.8%, 261.8%' },
    { term: 'Bull Trap', def: 'Wave B-ийн нэр томъёо. Худалдан авагчдыг хууртаж зарж авдаг' },
    { term: 'Killer Wave', def: 'Wave C-ийн нэр томъёо. Long position-уудыг устгадаг' },
    // Анализ
    { term: 'RSI', def: 'Relative Strength Index — Хөрөнгө хэт их худалдан авагдсан/зарагдсан эсэхийг харуулах индикатор' },
    { term: 'MACD', def: 'Moving Average Convergence Divergence — Трендийг харуулах индикатор' },
    { term: 'Moving Average', def: 'Хөдөлгөөнт дундаж — үнийн дундаж шугам. SMA, EMA гэсэн төрөлтэй' },
    { term: 'Drawdown', def: 'Дансны хамгийн дээд цэгээс хамгийн доод цэг хүртэлх уналт' },
    { term: 'FOMO', def: 'Fear Of Missing Out — Боломжийг алдах айдас' },
    { term: 'Confluence', def: 'Олон техник дохио нэг цэгт нийлэх. Хүчтэй setup-ыг илэрхийлнэ' },
    { term: 'False Breakout', def: 'Худал давалт. Үнэ түвшинг сэтэлсэн мэт болоод буцдаг. Stop hunt-ын дохио' },
    // Forex терминууд (MOT Wealth Academy)
    { term: 'Forex', def: 'Foreign Exchange — гадаад валютын солилцооны дэлхийн нийтийг хамарсан зах зээл. 24/5 ажилладаг' },
    { term: 'Base Currency', def: 'Валютын хослолын ЭХНИЙ валют — үнэлэгдэж буй валют (EUR/USD дээр EUR)' },
    { term: 'Quote Currency', def: 'Валютын хослолын ХОЁРДУГААР валют — Base-ийн үнийг хэлж буй валют (EUR/USD дээр USD)' },
    { term: 'Major Currencies', def: 'Хамгийн их арилжаалагддаг валютууд: USD, EUR, JPY, GBP, CHF, CAD, AUD, NZD' },
    { term: 'Major Pairs', def: 'USD-той хослуулсан хамгийн их арилжаалагддаг pair-ууд: EUR/USD, USD/JPY, GBP/USD г.м.' },
    { term: 'Cross Pairs', def: 'USD ороогүй major валютуудын хослол. Жишээ: EUR/JPY, GBP/JPY' },
    { term: 'Exotic Pairs', def: 'Major + жижиг улсын валют. Маш өргөн spread-тэй, эрсдэлтэй. Жишээ: USD/TRY, USD/ZAR' },
    { term: 'Margin Call', def: 'Margin хүрэлцэхгүй болоход брокер position-ыг автоматаар хааж алдагдлыг зогсоодог үйлдэл' },
    { term: 'Slippage', def: 'Захиалга өгсөн үнээс өөр үнээр биелэх үзэгдэл. Volatility өндөр үед түгээмэл' },
    { term: 'Market Order', def: 'Зах зээл дээр одоо байгаа хамгийн боломжит үнээр шууд биелдэг захиалга' },
    { term: 'Limit Order', def: 'Тодорхой үнэд хүрвэл л биелдэг захиалга. Buy Limit — хямдаар авах, Sell Limit — үнэтэй зарах' },
    { term: 'Stop Order', def: 'Тодорхой үнийг ХЭТЭРВЭЛ биелдэг захиалга. Buy Stop — өсвөл авах, Sell Stop — унавал зарах (breakout арилжаалах)' },
    { term: 'Swap', def: 'Roll-over fee — position өдөр шилжих үед төлдөг/авдаг хүү. Pair-аас хамаарч + эсвэл − байж болно' },
    { term: 'ECN', def: 'Electronic Communication Network — брокерын төрөл. Бага spread + commission хэлбэрээр ажилладаг' },
    { term: 'EBS', def: 'Electronic Brokering Services — том банкуудын хооронд ашигладаг institutional арилжааны систем' },
    { term: 'Centralized Market', def: 'Нэг ТӨВ биржээр дамждаг зах зээл (NYSE, NASDAQ). Хувьцааны зах зээл иймэрхүү байдаг' },
    { term: 'Decentralized Market', def: 'Олон ТӨВ-өөр (банк, брокер) дамждаг тархай зах зээл. Форекс иймэрхүү байдаг' },
    { term: 'Bullish', def: 'Үнэ ӨСНӨ гэж итгэх байр суурь. Бухын эвэр доошоос дээш цохидог адил' },
    { term: 'Bearish', def: 'Үнэ БУУРНА гэж итгэх байр суурь. Баавгай дээрээс доош цохидог адил' }
  ].sort((a, b) => a.term.localeCompare(b.term));

  const filteredGlossary = glossary.filter(g => 
    g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    g.def.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  const isLessonCompleted = (id) => progress[id]?.completed;
  const isLessonUnlocked = (idx) => idx === 0 || isLessonCompleted(lessons[idx - 1].id);
  const completedCount = lessons.filter(l => isLessonCompleted(l.id)).length;
  const overallProgress = (completedCount / lessons.length) * 100;

  const startLesson = (lesson) => {
    setCurrentLesson(lesson);
    setCurrentStep(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setView('lesson');
  };

  const openBook = (book) => {
    setCurrentBook(book);
    setCurrentChapter(0);
    setView('reader');
  };

  const nextStep = () => {
    if (currentStep < currentLesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setView('quiz');
    }
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
    const correct = currentLesson.quiz.filter((q, i) => quizAnswers[i] === q.correct).length;
    const passed = correct / currentLesson.quiz.length >= 0.7;
    if (passed) {
      saveProgress({
        ...progress,
        [currentLesson.id]: { completed: true, score: correct, total: currentLesson.quiz.length }
      });
    }
  };

  const NavButton = ({ icon: Icon, label, target }) => (
    <button
      onClick={() => { setView(target); setMenuOpen(false); }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-left ${
        view === target ? 'bg-white text-zinc-900 shadow-lg shadow-white/10' : 'text-slate-300 hover:bg-slate-800'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  // ============ CALCULATORS ============
  const PositionCalc = () => {
    const [account, setAccount] = useState(1000);
    const [riskPct, setRiskPct] = useState(1);
    const [entry, setEntry] = useState(100);
    const [stopLoss, setStopLoss] = useState(95);

    const riskAmount = account * (riskPct / 100);
    const priceDiff = Math.abs(entry - stopLoss);
    const positionSize = priceDiff > 0 ? riskAmount / priceDiff : 0;
    const positionValue = positionSize * entry;

    return (
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Calculator className="text-zinc-200" size={24} />
          Position Size тооцоологч
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-slate-400">Дансны хэмжээ ($)</label>
            <input type="number" value={account} onChange={e => setAccount(+e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-white outline-none"/>
          </div>
          <div>
            <label className="text-sm text-slate-400">Эрсдэл (%)</label>
            <input type="number" step="0.1" value={riskPct} onChange={e => setRiskPct(+e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-white outline-none"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-slate-400">Орох үнэ</label>
              <input type="number" value={entry} onChange={e => setEntry(+e.target.value)}
                className="w-full mt-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-white outline-none"/>
            </div>
            <div>
              <label className="text-sm text-slate-400">Stop Loss</label>
              <input type="number" value={stopLoss} onChange={e => setStopLoss(+e.target.value)}
                className="w-full mt-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:border-white outline-none"/>
            </div>
          </div>
        </div>
        <div className="mt-5 p-4 bg-white/5 border border-white/20 rounded-xl">
          <div className="text-sm text-slate-400">Эрсдэлийн дүн</div>
          <div className="text-2xl font-bold text-zinc-200">${riskAmount.toFixed(2)}</div>
          <div className="text-sm text-slate-400 mt-2">Position size (нэгж)</div>
          <div className="text-2xl font-bold text-white">{positionSize.toFixed(2)}</div>
          <div className="text-sm text-slate-400 mt-2">Position-ы үнэ</div>
          <div className="text-2xl font-bold text-white">${positionValue.toFixed(2)}</div>
        </div>
      </div>
    );
  };

  const RiskRewardCalc = () => {
    const [entry, setEntry] = useState(100);
    const [sl, setSl] = useState(95);
    const [tp, setTp] = useState(110);

    const risk = Math.abs(entry - sl);
    const reward = Math.abs(tp - entry);
    const ratio = risk > 0 ? (reward / risk).toFixed(2) : 0;
    const isGood = ratio >= 2;

    return (
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="text-zinc-200" size={24} />
          Risk/Reward тооцоологч
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-slate-400">Орох үнэ</label>
            <input type="number" value={entry} onChange={e => setEntry(+e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white"/>
          </div>
          <div>
            <label className="text-sm text-slate-400">Stop Loss</label>
            <input type="number" value={sl} onChange={e => setSl(+e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white"/>
          </div>
          <div>
            <label className="text-sm text-slate-400">Take Profit</label>
            <input type="number" value={tp} onChange={e => setTp(+e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white"/>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="p-3 bg-white/5 border border-white/20 rounded-xl">
            <div className="text-xs text-slate-400">Эрсдэл</div>
            <div className="text-xl font-bold text-zinc-300">${risk.toFixed(2)}</div>
          </div>
          <div className="p-3 bg-white/5 border border-white/20 rounded-xl">
            <div className="text-xs text-slate-400">Боломжит ашиг</div>
            <div className="text-xl font-bold text-zinc-200">${reward.toFixed(2)}</div>
          </div>
        </div>
        <div className={`mt-3 p-4 rounded-xl border ${isGood ? 'bg-white/5 border-white/20' : 'bg-white/5 border-white/20'}`}>
          <div className="text-sm text-slate-400">R:R харьцаа</div>
          <div className={`text-3xl font-bold ${isGood ? 'text-zinc-200' : 'text-zinc-300'}`}>1 : {ratio}</div>
          <div className="text-xs text-slate-400 mt-1">
            {isGood ? ' Сайн харьцаа (1:2 ба түүнээс дээш)' : '1:2-оос доош — анхааралтай'}
          </div>
        </div>
      </div>
    );
  };

  const PnLCalc = () => {
    const [entry, setEntry] = useState(100);
    const [exit, setExit] = useState(105);
    const [size, setSize] = useState(10);
    const [type, setType] = useState('long');

    const pnl = type === 'long' ? (exit - entry) * size : (entry - exit) * size;
    const pnlPct = entry > 0 ? ((pnl / (entry * size)) * 100).toFixed(2) : 0;
    const isProfit = pnl >= 0;

    return (
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Calculator className="text-zinc-200" size={24} />
          Profit/Loss тооцоологч
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setType('long')}
              className={`py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${type === 'long' ? 'bg-white text-zinc-900' : 'bg-slate-900 text-slate-400 hover:text-zinc-200'}`}>
              <ArrowUp size={16} strokeWidth={2} /> Long
            </button>
            <button onClick={() => setType('short')}
              className={`py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${type === 'short' ? 'bg-zinc-700 text-white' : 'bg-slate-900 text-slate-400 hover:text-zinc-200'}`}>
              <ArrowDown size={16} strokeWidth={2} /> Short
            </button>
          </div>
          <div>
            <label className="text-sm text-slate-400">Орох үнэ</label>
            <input type="number" value={entry} onChange={e => setEntry(+e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white"/>
          </div>
          <div>
            <label className="text-sm text-slate-400">Гарах үнэ</label>
            <input type="number" value={exit} onChange={e => setExit(+e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white"/>
          </div>
          <div>
            <label className="text-sm text-slate-400">Position size (нэгж)</label>
            <input type="number" value={size} onChange={e => setSize(+e.target.value)}
              className="w-full mt-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white"/>
          </div>
        </div>
        <div className={`mt-5 p-4 rounded-xl border ${isProfit ? 'bg-white/5 border-white/20' : 'bg-white/5 border-white/20'}`}>
          <div className="text-sm text-slate-400">{isProfit ? 'Ашиг' : 'Алдагдал'}</div>
          <div className={`text-3xl font-bold ${isProfit ? 'text-zinc-200' : 'text-zinc-300'}`}>
            {isProfit ? '+' : ''}{pnl.toFixed(2)} $
          </div>
          <div className={`text-sm font-medium ${isProfit ? 'text-zinc-200' : 'text-zinc-300'}`}>
            {isProfit ? '+' : ''}{pnlPct}%
          </div>
        </div>
      </div>
    );
  };

  const TradeForm = ({ onCancel, onSave }) => {
    const [symbol, setSymbol] = useState('');
    const [direction, setDirection] = useState('long');
    const [entry, setEntry] = useState('');
    const [exit, setExit] = useState('');
    const [size, setSize] = useState('');
    const [stop, setStop] = useState('');
    const [target, setTarget] = useState('');
    const [emotion, setEmotion] = useState('');
    const [notes, setNotes] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

    const canSave = symbol && entry && size;

    const submit = () => {
      const e = parseFloat(entry) || 0;
      const x = parseFloat(exit) || 0;
      const s = parseFloat(size) || 0;
      const sl = parseFloat(stop) || 0;
      const tp = parseFloat(target) || 0;
      const closed = !!exit;
      let pnl = 0;
      if (closed) {
        pnl = direction === 'long' ? (x - e) * s : (e - x) * s;
      }
      const risk = sl ? Math.abs(e - sl) * s : 0;
      const reward = tp ? Math.abs(tp - e) * s : 0;
      const rr = risk > 0 ? (reward / risk) : 0;
      onSave({
        symbol: symbol.toUpperCase(),
        direction, entry: e, exit: closed ? x : null,
        size: s, stop: sl || null, target: tp || null,
        emotion, notes, date, pnl, rr, closed
      });
    };

    return (
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Шинэ арилжаа</h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-white"><X size={20} /></button>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-400">Хөрөнгө (Symbol)</label>
            <input value={symbol} onChange={e => setSymbol(e.target.value)} placeholder="EURUSD, BTC, AAPL..."
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white/40" />
          </div>
          <div>
            <label className="text-xs text-slate-400">Огноо</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white/40" />
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Чиглэл</label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setDirection('long')}
              className={`py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${direction === 'long' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-slate-900 border border-slate-700 text-slate-400'}`}>
              <ArrowUp size={16} /> Long
            </button>
            <button onClick={() => setDirection('short')}
              className={`py-2 rounded-lg font-medium flex items-center justify-center gap-2 ${direction === 'short' ? 'bg-red-500/20 border border-red-500/40 text-red-300' : 'bg-slate-900 border border-slate-700 text-slate-400'}`}>
              <ArrowDown size={16} /> Short
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-400">Орох үнэ *</label>
            <input type="number" step="any" value={entry} onChange={e => setEntry(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white/40" />
          </div>
          <div>
            <label className="text-xs text-slate-400">Гарах үнэ</label>
            <input type="number" step="any" value={exit} onChange={e => setExit(e.target.value)} placeholder="хоосон = нээлттэй"
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white/40" />
          </div>
          <div>
            <label className="text-xs text-slate-400">Хэмжээ *</label>
            <input type="number" step="any" value={size} onChange={e => setSize(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white/40" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-400">Stop Loss</label>
            <input type="number" step="any" value={stop} onChange={e => setStop(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white/40" />
          </div>
          <div>
            <label className="text-xs text-slate-400">Take Profit</label>
            <input type="number" step="any" value={target} onChange={e => setTarget(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white/40" />
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-400">Сэтгэл хөдлөл</label>
          <div className="mt-1 flex flex-wrap gap-2">
            {['Тайван', 'Итгэлтэй', 'Айдас', 'Шунал', 'Уур', 'Дарамт'].map(em => (
              <button key={em} onClick={() => setEmotion(emotion === em ? '' : em)}
                className={`px-3 py-1.5 rounded-lg text-sm border ${emotion === em ? 'bg-white text-zinc-900 border-white' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-white/30'}`}>
                {em}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-slate-400">Тэмдэглэл / Сургамж</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Setup, шалтгаан, сургамж..."
            className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white outline-none focus:border-white/40 resize-none" />
        </div>
        <div className="flex gap-2 pt-2">
          <button onClick={submit} disabled={!canSave}
            className="flex-1 py-3 bg-white hover:bg-zinc-200 text-zinc-900 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed rounded-xl font-bold">
            Хадгалах
          </button>
          <button onClick={onCancel}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium">
            Цуцлах
          </button>
        </div>
      </div>
    );
  };

  // Group lessons by level
  const lessonsByLevel = lessons.reduce((acc, l) => {
    if (!acc[l.level]) acc[l.level] = [];
    acc[l.level].push(l);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-zinc-900 text-white">

      <div className="flex min-h-screen relative">
        {/* Mobile menu overlay */}
        {menuOpen && (
          <div onClick={() => setMenuOpen(false)} 
            className="lg:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"/>
        )}
        
        <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-slate-900/95 backdrop-blur border-r border-slate-800 p-5 z-40 transition-transform overflow-y-auto flex-shrink-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-zinc-300 flex items-center justify-center shadow-lg shadow-white/5">
                <TrendingUp size={20} className="text-zinc-900" strokeWidth={2.2} />
              </div>
              <div>
                <div className="font-bold text-lg">Trading 101</div>
                <div className="text-xs text-slate-400">Бүх шатанд</div>
              </div>
            </div>
            <button onClick={() => setMenuOpen(false)} className="lg:hidden text-slate-400">
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1">
            <NavButton icon={Home} label="Нүүр" target="home" />
            <NavButton icon={BookOpen} label="Хичээлүүд" target="lessons" />
            <NavButton icon={Library} label="Номын сан" target="library" />
            <NavButton icon={Calculator} label="Тооцоологчид" target="calc" />
            <NavButton icon={NotebookPen} label="Журнал" target="journal" />
            <NavButton icon={FileText} label="Нэр томъёо" target="glossary" />
            <NavButton icon={Award} label="Прогресс" target="progress" />
          </nav>

          <div className="mt-8 p-4 bg-slate-800/50 rounded-xl">
            <div className="text-xs text-slate-400 mb-1">Ерөнхий прогресс</div>
            <div className="text-2xl font-bold mb-2">{completedCount}/{lessons.length}</div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-zinc-200 to-zinc-400 transition-all" style={{ width: `${overallProgress}%` }} />
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 min-h-screen">
          <div className="lg:hidden p-4 flex items-center justify-between border-b border-slate-800 sticky top-0 bg-slate-950/95 backdrop-blur z-30">
            <button onClick={() => setMenuOpen(true)} className="text-white">
              <Menu size={24} />
            </button>
            <div className="font-bold">Trading 101</div>
            <div className="w-6" />
          </div>

          <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-10 max-w-4xl mx-auto w-full">
            {/* HOME */}
            {view === 'home' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-white/10 to-zinc-800/30 border border-white/20 rounded-3xl p-6 sm:p-8">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3 tracking-tight">Тавтай морил</h1>
                  <p className="text-base sm:text-lg text-slate-300 mb-6">Анхан шатнаас Элиотын давалгаа хүртэл — арилжааны бүрэн академи.</p>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => setView('lessons')}
                      className="px-5 sm:px-6 py-3 bg-white hover:bg-zinc-200 text-zinc-900 rounded-xl font-bold transition-all shadow-lg shadow-white/20 text-sm sm:text-base">
                      Сурч эхлэх →
                    </button>
                    <button onClick={() => setView('library')}
                      className="px-5 sm:px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all text-sm sm:text-base flex items-center gap-2">
                      <Library size={16} /> Номын сан
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <button onClick={() => setView('lessons')} className="bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/70 hover:border-white/20 rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-0.5">
                    <BookOpen className="text-zinc-200 mb-3" size={24} />
                    <div className="font-bold mb-1">{lessons.length} хичээл</div>
                    <div className="text-xs text-slate-400">3 шатанд</div>
                  </button>
                  <button onClick={() => setView('library')} className="bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/70 hover:border-white/20 rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-0.5">
                    <Library className="text-zinc-300 mb-3" size={24} />
                    <div className="font-bold mb-1">{books.length} ном</div>
                    <div className="text-xs text-slate-400">Бүрэн орчуулга</div>
                  </button>
                  <button onClick={() => setView('calc')} className="bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/70 hover:border-white/20 rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-0.5">
                    <Calculator className="text-zinc-300 mb-3" size={24} />
                    <div className="font-bold mb-1">3 тооцоологч</div>
                    <div className="text-xs text-slate-400">Position, R:R, P&L</div>
                  </button>
                  <button onClick={() => setView('glossary')} className="bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/70 hover:border-white/20 rounded-2xl p-5 text-left transition-all duration-300 hover:-translate-y-0.5">
                    <FileText className="text-zinc-300 mb-3" size={24} />
                    <div className="font-bold mb-1">{glossary.length}+ нэр томъёо</div>
                    <div className="text-xs text-slate-400">Хайлттай</div>
                  </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-white/5 to-zinc-800/20 border border-white/10 rounded-2xl p-5">
                    <TrendingUp className="text-zinc-300 mb-3" size={22} strokeWidth={1.5} />
                    <h3 className="font-bold mb-2">Анхан шат</h3>
                    <p className="text-sm text-slate-400">Зах зээл, нэр томьёо, эрсдэлийн менежмент</p>
                  </div>
                  <div className="bg-gradient-to-br from-white/5 to-zinc-800/20 border border-white/10 rounded-2xl p-5">
                    <BarChart3 className="text-zinc-300 mb-3" size={22} strokeWidth={1.5} />
                    <h3 className="font-bold mb-2">Дунд шат</h3>
                    <p className="text-sm text-slate-400">Лаан график паттернууд, price action</p>
                  </div>
                  <div className="bg-gradient-to-br from-white/5 to-zinc-800/20 border border-white/10 rounded-2xl p-5">
                    <Waves className="text-zinc-300 mb-3" size={22} strokeWidth={1.5} />
                    <h3 className="font-bold mb-2">Ахисан шат</h3>
                    <p className="text-sm text-slate-400">Элиотын давалгаа, Фибоначчи</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/20 rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-zinc-300 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h3 className="font-bold text-zinc-100 mb-2">Чухал анхааруулга</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        Арилжаа нь өндөр эрсдэлтэй үйл ажиллагаа юм. Бодит мөнгөөр арилжаа хийхээсээ өмнө demo дансаар сайн дадлага хийж, зөвхөн алдаж болох мөнгөөрөө л арилжаалаарай.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LESSONS LIST */}
            {view === 'lessons' && (
              <div>
                <h1 className="text-3xl font-black mb-2">Хичээлүүд</h1>
                <p className="text-slate-400 mb-6">Дарааллаар нь судлахыг зөвлөж байна</p>
                {Object.entries(lessonsByLevel).map(([level, levelLessons]) => {
                  const levelIcon = level === 'Анхан шат' ? '' : level === 'Дунд шат' ? '' : '';
                  return (
                    <div key={level} className="mb-8">
                      <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <span>{levelIcon}</span> {level}
                      </h2>
                      <div className="grid gap-3">
                        {levelLessons.map((lesson) => {
                          const idx = lessons.indexOf(lesson);
                          const completed = isLessonCompleted(lesson.id);
                          const unlocked = isLessonUnlocked(idx);
                          return (
                            <button key={lesson.id}
                              onClick={() => unlocked && startLesson(lesson)}
                              disabled={!unlocked}
                              className={`bg-slate-800/40 border rounded-2xl p-5 text-left flex items-center gap-4 transition-all duration-300 ${
                                unlocked ? 'hover:bg-slate-800/80 hover:border-white/30 hover:-translate-y-0.5 border-slate-700/70 cursor-pointer' : 'border-slate-800 opacity-40 cursor-not-allowed'
                              }`}>
                              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                <lesson.icon size={22} className="text-zinc-200" strokeWidth={1.5} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs text-slate-500">Хичээл {idx + 1}</span>
                                  {completed && <CheckCircle size={14} className="text-zinc-200" />}
                                  {!unlocked && <Lock size={14} className="text-slate-500" />}
                                </div>
                                <div className="font-bold text-lg">{lesson.title}</div>
                                <div className="text-sm text-slate-400">{lesson.steps.length} хэсэг • {lesson.quiz.length} тест</div>
                              </div>
                              <ChevronRight className="text-slate-500" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* LESSON CONTENT */}
            {view === 'lesson' && currentLesson && (
              <div>
                <button onClick={() => setView('lessons')} className="flex items-center gap-1 text-slate-400 hover:text-white mb-4 text-sm">
                  <ChevronLeft size={16} /> Буцах
                </button>
                <div className="inline-flex w-14 h-14 rounded-2xl bg-white/5 border border-white/10 items-center justify-center mb-3">
                  <currentLesson.icon size={26} className="text-zinc-100" strokeWidth={1.5} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-black mb-2 break-words">{currentLesson.title}</h1>
                <div className="flex gap-1 mb-6">
                  {currentLesson.steps.map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= currentStep ? 'bg-white' : 'bg-slate-700'}`} />
                  ))}
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 sm:p-6 lg:p-8 mb-6 overflow-hidden">
                  <h2 className="text-lg sm:text-xl font-bold mb-4 text-zinc-200 break-words">{currentLesson.steps[currentStep].title}</h2>
                  <div className="text-slate-300 leading-relaxed whitespace-pre-line text-[15px] sm:text-base break-words">{currentLesson.steps[currentStep].content}</div>
                </div>
                <div className="flex justify-between gap-2 sm:gap-3">
                  <button onClick={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : setView('lessons')}
                    className="flex-1 sm:flex-none px-4 sm:px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium text-sm sm:text-base">
                    ← Өмнөх
                  </button>
                  <button onClick={nextStep}
                    className="flex-1 sm:flex-none px-4 sm:px-5 py-3 bg-white hover:bg-zinc-200 text-zinc-900 rounded-xl font-medium text-sm sm:text-base">
                    {currentStep === currentLesson.steps.length - 1 ? 'Тест өгөх →' : 'Дараах →'}
                  </button>
                </div>
              </div>
            )}

            {/* QUIZ */}
            {view === 'quiz' && currentLesson && (
              <div>
                <button onClick={() => setView('lesson')} className="flex items-center gap-1 text-slate-400 hover:text-white mb-4 text-sm">
                  <ChevronLeft size={16} /> Буцах
                </button>
                <h1 className="text-3xl font-black mb-2">Тест</h1>
                <p className="text-slate-400 mb-6">{currentLesson.title}</p>
                <div className="space-y-4">
                  {currentLesson.quiz.map((q, qi) => (
                    <div key={qi} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
                      <div className="font-bold mb-3">{qi + 1}. {q.q}</div>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => {
                          const selected = quizAnswers[qi] === oi;
                          const isCorrect = oi === q.correct;
                          let cls = 'border-slate-700 hover:bg-slate-800 text-slate-200';
                          if (quizSubmitted) {
                            if (isCorrect) cls = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300';
                            else if (selected) cls = 'border-red-500/60 bg-red-500/10 text-red-300';
                            else cls = 'border-slate-800 text-slate-500';
                          } else if (selected) {
                            cls = 'border-white bg-white/5 text-white';
                          }
                          return (
                            <button key={oi}
                              onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [qi]: oi })}
                              disabled={quizSubmitted}
                              className={`w-full text-left px-4 py-3 border rounded-xl transition-all flex items-center justify-between gap-2 ${cls}`}>
                              <span>{opt}</span>
                              {quizSubmitted && isCorrect && <CheckCircle size={16} className="flex-shrink-0" />}
                              {quizSubmitted && selected && !isCorrect && <X size={16} className="flex-shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {!quizSubmitted ? (
                  <button onClick={submitQuiz}
                    disabled={Object.keys(quizAnswers).length < currentLesson.quiz.length}
                    className="mt-6 w-full py-4 bg-white hover:bg-zinc-200 text-zinc-900 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-xl font-bold">
                    Хариу шалгах
                  </button>
                ) : (
                  <div className="mt-6">
                    {(() => {
                      const correct = currentLesson.quiz.filter((q, i) => quizAnswers[i] === q.correct).length;
                      const passed = correct / currentLesson.quiz.length >= 0.7;
                      return (
                        <div className={`p-6 rounded-2xl border text-center ${passed ? 'bg-emerald-500/10 border-emerald-500/40' : 'bg-red-500/10 border-red-500/40'}`}>
                          <div className="flex justify-center mb-3">
                            {passed
                              ? <CheckCircle size={42} className="text-emerald-400" strokeWidth={1.5} />
                              : <AlertTriangle size={42} className="text-red-400" strokeWidth={1.5} />}
                          </div>
                          <div className="text-2xl font-bold mb-1">{correct}/{currentLesson.quiz.length} зөв</div>
                          <div className={`text-sm mb-4 ${passed ? 'text-emerald-300' : 'text-red-300'}`}>
                            {passed ? 'Гайхалтай! Дараагийн хичээл нээгдлээ.' : 'Дахин уншаад туршаад үзээрэй (70%+ хэрэгтэй).'}
                          </div>
                          <div className="flex gap-2 justify-center">
                            <button onClick={() => setView('lessons')} className="px-5 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl">
                              Хичээлүүд
                            </button>
                            {!passed && (
                              <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}
                                className="px-5 py-2 bg-white hover:bg-zinc-200 rounded-xl text-slate-900 font-bold">
                                Дахин оролдох
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}

            {/* LIBRARY */}
            {view === 'library' && (
              <div>
                <h1 className="text-2xl sm:text-3xl font-black mb-2 flex items-center gap-2">
                  <Library className="text-zinc-300" size={28} />
                  Номын сан
                </h1>
                <p className="text-slate-400 mb-6 text-sm sm:text-base">Арилжааны сонгодог номнууд монгол хэлээр</p>
                <div className="grid gap-4">
                  {books.map(book => (
                    <button key={book.id} onClick={() => openBook(book)}
                      className={`bg-gradient-to-br ${book.color} border ${book.borderColor} rounded-2xl p-5 sm:p-6 text-left hover:-translate-y-0.5 hover:border-white/40 transition-all duration-300`}>
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                          <book.icon size={26} className="text-zinc-100" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-slate-400 mb-1 truncate">{book.author}</div>
                          <h3 className="text-lg sm:text-xl font-bold mb-2 break-words">{book.title}</h3>
                          <p className="text-sm text-slate-300 mb-3 break-words">{book.description}</p>
                          <div className="text-xs text-slate-400 flex items-center flex-wrap gap-2">
                            <span> {book.chapters.length} бүлэг</span>
                            <span>•</span>
                            <span>Уншиж эхлэх →</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BOOK READER */}
            {view === 'reader' && currentBook && (
              <div>
                <button onClick={() => setView('library')} className="flex items-center gap-1 text-slate-400 hover:text-white mb-4 text-sm">
                  <ChevronLeft size={16} /> Номын сан руу буцах
                </button>
                
                <div className={`bg-gradient-to-br ${currentBook.color} border ${currentBook.borderColor} rounded-2xl p-4 sm:p-5 mb-5`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <currentBook.icon size={22} className="text-zinc-100" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-slate-400 truncate">{currentBook.author}</div>
                      <h2 className="text-base sm:text-xl font-bold break-words">{currentBook.title}</h2>
                    </div>
                  </div>
                </div>

                {/* Chapter selector - dropdown for all sizes (compact + accessible) */}
                <div className="mb-5">
                  <label className="block text-xs text-slate-400 mb-2 font-medium">Бүлэг сонгох:</label>
                  <select 
                    value={currentChapter} 
                    onChange={e => setCurrentChapter(+e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-medium outline-none focus:border-white cursor-pointer"
                  >
                    {currentBook.chapters.map((ch, i) => (
                      <option key={i} value={i}>
                        {i + 1}. {ch.title.replace(/^\d+-р бүлэг:?\s*/, '')}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Reading progress */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Уншилтын явц</span>
                    <span>{currentChapter + 1} / {currentBook.chapters.length}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-zinc-200 to-zinc-400 transition-all"
                      style={{ width: `${((currentChapter + 1) / currentBook.chapters.length) * 100}%` }} />
                  </div>
                </div>

                {/* Chapter content */}
                <article className="bg-slate-800/30 border border-slate-700 rounded-2xl p-5 sm:p-7 md:p-8 lg:p-10 overflow-hidden">
                  <div className="text-xs text-zinc-200 mb-2 font-medium">Бүлэг {currentChapter + 1}</div>
                  <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-black mb-5 sm:mb-6 text-white break-words leading-tight">
                    {currentBook.chapters[currentChapter].title}
                  </h2>
                  
                  {/* Chapter image/diagram */}
                  {currentBook.chapters[currentChapter].image && svgImages[currentBook.chapters[currentChapter].image] && (
                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-3 sm:p-4 mb-5 sm:mb-6 max-w-2xl mx-auto"
                      dangerouslySetInnerHTML={{ __html: svgImages[currentBook.chapters[currentChapter].image] }}
                    />
                  )}
                  
                  <div className="text-slate-300 leading-loose whitespace-pre-line text-[15px] sm:text-base md:text-[17px] lg:text-lg break-words">
                    {currentBook.chapters[currentChapter].content}
                  </div>
                </article>

                {/* Navigation */}
                <div className="flex justify-between gap-2 sm:gap-3 mt-6">
                  <button onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                    disabled={currentChapter === 0}
                    className="flex-1 sm:flex-none px-3 sm:px-5 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl font-medium flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base">
                    <ChevronLeft size={18} /> <span className="hidden xs:inline">Өмнөх</span><span className="xs:hidden">Өмнөх</span>
                  </button>
                  <button onClick={() => setCurrentChapter(Math.min(currentBook.chapters.length - 1, currentChapter + 1))}
                    disabled={currentChapter === currentBook.chapters.length - 1}
                    className="flex-1 sm:flex-none px-3 sm:px-5 py-3 bg-white hover:bg-zinc-200 text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl font-medium flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base">
                    <span>Дараах</span> <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* CALCULATORS */}
            {view === 'calc' && (
              <div>
                <h1 className="text-3xl font-black mb-2">Тооцоологчид </h1>
                <p className="text-slate-400 mb-6">Арилжааны үндсэн тооцооллууд</p>
                <div className="grid lg:grid-cols-2 gap-5">
                  <PositionCalc />
                  <RiskRewardCalc />
                  <PnLCalc />
                </div>
              </div>
            )}

            {/* GLOSSARY */}
            {view === 'glossary' && (
              <div>
                <h1 className="text-3xl font-black mb-2">Нэр томъёоны толь </h1>
                <p className="text-slate-400 mb-4">{glossary.length} нэр томъёо</p>
                <div className="relative mb-5">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input value={glossarySearch} onChange={e => setGlossarySearch(e.target.value)}
                    placeholder="Нэр томъёо хайх..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white outline-none focus:border-white"/>
                </div>
                <div className="grid gap-3">
                  {filteredGlossary.length === 0 ? (
                    <div className="text-slate-500 text-center py-8">Олдсонгүй</div>
                  ) : filteredGlossary.map((g, i) => (
                    <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
                      <div className="font-bold text-zinc-200 mb-1">{g.term}</div>
                      <div className="text-slate-300 text-sm">{g.def}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PROGRESS */}
            {view === 'progress' && (
              <div>
                <h1 className="text-3xl font-black mb-2">Миний прогресс</h1>
                <p className="text-slate-400 mb-6">Сурах аяллын явц</p>
                <div className="bg-gradient-to-br from-white/10 to-zinc-800/30 border border-white/20 rounded-2xl p-6 mb-5">
                  <div className="text-sm text-slate-300 mb-2">Нийт прогресс</div>
                  <div className="text-4xl font-black mb-3">{Math.round(overallProgress)}%</div>
                  <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-zinc-200 to-zinc-400 transition-all" style={{ width: `${overallProgress}%` }} />
                  </div>
                  <div className="mt-3 text-sm text-slate-400">{completedCount} / {lessons.length} хичээл дууссан</div>
                </div>
                <div className="space-y-2">
                  {lessons.map((l, i) => {
                    const p = progress[l.id];
                    return (
                      <div key={l.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                          <l.icon size={18} className="text-zinc-200" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-slate-500">{l.level}</div>
                          <div className="font-medium truncate">{l.title}</div>
                          {p?.completed ? (
                            <div className="text-xs text-emerald-400 flex items-center gap-1"><CheckCircle size={12} /> Дууссан • {p.score}/{p.total}</div>
                          ) : (
                            <div className="text-xs text-slate-500">{isLessonUnlocked(i) ? 'Эхлээгүй' : 'Хаалттай'}</div>
                          )}
                        </div>
                        {p?.completed && <Award className="text-zinc-200 flex-shrink-0" size={20} />}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* JOURNAL */}
            {view === 'journal' && (() => {
              const closedTrades = trades.filter(t => t.closed);
              const winners = closedTrades.filter(t => t.pnl > 0);
              const losers = closedTrades.filter(t => t.pnl < 0);
              const totalPnl = closedTrades.reduce((s, t) => s + (t.pnl || 0), 0);
              const winRate = closedTrades.length > 0 ? Math.round((winners.length / closedTrades.length) * 100) : 0;
              const avgRR = closedTrades.length > 0
                ? (closedTrades.reduce((s, t) => s + (t.rr || 0), 0) / closedTrades.length).toFixed(2)
                : '0.00';
              return (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h1 className="text-3xl font-black">Арилжааны журнал</h1>
                    {!addingTrade && (
                      <button onClick={() => setAddingTrade(true)}
                        className="px-4 py-2 bg-white hover:bg-zinc-200 text-zinc-900 rounded-xl font-bold flex items-center gap-2 text-sm">
                        <Plus size={16} /> Шинэ
                      </button>
                    )}
                  </div>
                  <p className="text-slate-400 mb-6">Арилжаагаа бүртгэж сургамж тэмдэглэ</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4">
                      <div className="text-xs text-slate-400">Нийт</div>
                      <div className="text-2xl font-bold mt-1">{trades.length}</div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4">
                      <div className="text-xs text-slate-400">Win Rate</div>
                      <div className="text-2xl font-bold mt-1">{winRate}%</div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4">
                      <div className="text-xs text-slate-400">Нийт P&L</div>
                      <div className={`text-2xl font-bold mt-1 ${totalPnl > 0 ? 'text-emerald-400' : totalPnl < 0 ? 'text-red-400' : 'text-white'}`}>
                        {totalPnl > 0 ? '+' : ''}{totalPnl.toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4">
                      <div className="text-xs text-slate-400">Дундаж R:R</div>
                      <div className="text-2xl font-bold mt-1">1 : {avgRR}</div>
                    </div>
                  </div>

                  {addingTrade && (
                    <div className="mb-5">
                      <TradeForm
                        onCancel={() => setAddingTrade(false)}
                        onSave={(trade) => { addTrade(trade); setAddingTrade(false); }}
                      />
                    </div>
                  )}

                  {trades.length === 0 && !addingTrade ? (
                    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-10 text-center">
                      <NotebookPen size={40} className="text-slate-500 mx-auto mb-3" strokeWidth={1.5} />
                      <div className="text-slate-400 mb-1">Журнал хоосон байна</div>
                      <div className="text-sm text-slate-500 mb-4">Эхний арилжаагаа бүртгэж эхэл</div>
                      <button onClick={() => setAddingTrade(true)}
                        className="px-5 py-2 bg-white hover:bg-zinc-200 text-zinc-900 rounded-xl font-bold inline-flex items-center gap-2">
                        <Plus size={16} /> Шинэ арилжаа
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {trades.map(t => (
                        <div key={t.id} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${t.direction === 'long' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/15 text-red-300 border border-red-500/30'}`}>
                                {t.direction === 'long' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold truncate">{t.symbol}</div>
                                <div className="text-xs text-slate-500">{t.date} · {t.direction === 'long' ? 'Long' : 'Short'}{!t.closed && ' · Нээлттэй'}</div>
                              </div>
                            </div>
                            <button onClick={() => deleteTrade(t.id)} className="text-slate-500 hover:text-red-400 p-1">
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-3">
                            <div>
                              <div className="text-xs text-slate-500">Entry</div>
                              <div className="font-medium">{t.entry}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500">Exit</div>
                              <div className="font-medium">{t.exit ?? '—'}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500">SL / TP</div>
                              <div className="font-medium text-xs">{t.stop ?? '—'} / {t.target ?? '—'}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500">Хэмжээ</div>
                              <div className="font-medium">{t.size}</div>
                            </div>
                          </div>

                          {t.closed && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              <div className={`px-3 py-1.5 rounded-lg text-sm font-bold ${t.pnl > 0 ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : t.pnl < 0 ? 'bg-red-500/15 text-red-300 border border-red-500/30' : 'bg-slate-700/50 text-slate-300'}`}>
                                {t.pnl > 0 ? '+' : ''}{t.pnl.toFixed(2)} P&L
                              </div>
                              {t.rr > 0 && (
                                <div className="px-3 py-1.5 rounded-lg text-sm bg-slate-900/50 border border-slate-700 text-slate-300">
                                  R:R 1 : {t.rr.toFixed(2)}
                                </div>
                              )}
                              {t.emotion && (
                                <div className="px-3 py-1.5 rounded-lg text-sm bg-slate-900/50 border border-slate-700 text-slate-300">
                                  {t.emotion}
                                </div>
                              )}
                            </div>
                          )}

                          {t.notes && (
                            <div className="text-sm text-slate-400 mt-2 border-t border-slate-700/50 pt-2">
                              {t.notes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </main>
      </div>
    </div>
  );
}
