/* Portfolio behavior */

document.addEventListener('DOMContentLoaded', () => {

  /* Navigation */
  const sectionIds = ['hero', 'portfolio', 'about', 'services', 'stats', 'testimonials', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const desktopNavLinks = document.querySelectorAll('.nav-links a');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  let isManualScroll = false;
  let scrollTimeout = null;

  function setActiveNavLink(currentId) {
    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  const scrollspyObserver = new IntersectionObserver((entries) => {
    if (isManualScroll) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveNavLink(entry.target.id);
      }
    });
  }, {
    rootMargin: '-20% 0px -55% 0px',
    threshold: 0.1
  });

  sections.forEach(section => scrollspyObserver.observe(section));

  window.addEventListener('scroll', () => {
    if (isManualScroll) return;

    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
      setActiveNavLink('contact');
    }
  }, { passive: true });

  /* Smooth scrolling */
  const allNavAnchors = document.querySelectorAll('.nav-links a, .mobile-nav-link, .btn-works, a[href^="#"]');

  allNavAnchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;

      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        setActiveNavLink(targetId);
        isManualScroll = true;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isManualScroll = false;
        }, 850);

        const headerOffset = 85;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        closeMobileNav();
      }
    });
  });

  /* Mobile menu */
  const menuBtn = document.querySelector('.nav-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMobileNav() {
    if (mobileNav) {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  /* Portfolio data */
  const portfolioItems = [
    // Store projects
    { id: 1, category: 'store', categoryName: 'تطوير المتاجر', badge: 'سلة وزد', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر إلكتروني متكامل', subtitle: 'تجهيز سلة وزد وشوبيفاي', image: 'assets/portfolio/stores/1.webp' },
    { id: 2, category: 'store', categoryName: 'تطوير المتاجر', badge: 'بوابات دفع', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'منصة تجارة وبوابة دفع', subtitle: 'واجهة مستخدم وتجربة شراء سلسة', image: 'assets/portfolio/stores/2.webp' },
    { id: 3, category: 'store', categoryName: 'تطوير المتاجر', badge: 'سلة برو', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر سلة رقمي', subtitle: 'تجهيز منتجات وفلاتر متقدمة', image: 'assets/portfolio/stores/3.webp' },
    { id: 4, category: 'store', categoryName: 'تطوير المتاجر', badge: 'متجر عطور', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'براند عطور ومستحضرات', subtitle: 'تصميم بانرات وهوية للمنتجات', image: 'assets/portfolio/stores/4.webp' },
    { id: 5, category: 'store', categoryName: 'تطوير المتاجر', badge: 'أزياء وموضة', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر أزياء وإكسسوارات', subtitle: 'تصنيفات متقدمة وجدول مقاسات', image: 'assets/portfolio/stores/5.webp' },
    { id: 6, category: 'store', categoryName: 'تطوير المتاجر', badge: 'إلكترونيات', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر أجهزة وتقنية', subtitle: 'ربط المخزون والموردين آلياً', image: 'assets/portfolio/stores/6.webp' },
    { id: 7, category: 'store', categoryName: 'تطوير المتاجر', badge: 'أغذية وتمور', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر تمور ومأكولات', subtitle: 'تكامل الشحن المبرد والتوصيل السريع', image: 'assets/portfolio/stores/7.webp' },
    { id: 8, category: 'store', categoryName: 'تطوير المتاجر', badge: 'هدايا وتوزيعات', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر هدايا وتوزيعات', subtitle: 'تخصيص خيارات وكتابة الإهداء', image: 'assets/portfolio/stores/8.webp' },
    { id: 9, category: 'store', categoryName: 'تطوير المتاجر', badge: 'مستلزمات رياضية', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر معدات رياضية', subtitle: 'تصميم حركي وتجربة تسوق سريعة', image: 'assets/portfolio/stores/9.webp' },
    { id: 10, category: 'store', categoryName: 'تطوير المتاجر', badge: 'أدوات منزلية', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر أثاث ومستلزمات منزل', subtitle: 'عرض صور المنتجات بدقة فائقة', image: 'assets/portfolio/stores/10.webp' },
    { id: 11, category: 'store', categoryName: 'تطوير المتاجر', badge: 'مجوهرات فاخرة', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر مجوهرات وبراند راقي', subtitle: 'واجهات أنيقة تعكس الفخامة', image: 'assets/portfolio/stores/11.webp' },
    { id: 12, category: 'store', categoryName: 'تطوير المتاجر', badge: 'كتب وقرطاسية', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر كتب وقرطاسية', subtitle: 'تنظيم آلاف المنتجات والكتب', image: 'assets/portfolio/stores/12.webp' },
    { id: 13, category: 'store', categoryName: 'تطوير المتاجر', badge: 'تجارة B2B', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'منصة بيع بالجملة وشركات', subtitle: 'فواتير ضريبية وأسعار كميات', image: 'assets/portfolio/stores/13.webp' },
    { id: 14, category: 'store', categoryName: 'تطوير المتاجر', badge: 'محاصيل بن', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر قهوة ومحاصيل مختصة', subtitle: 'بانرات احترافية وتصنيف النكهات', image: 'assets/portfolio/stores/14.webp' },
    { id: 15, category: 'store', categoryName: 'تطوير المتاجر', badge: 'تحسين التحويل CRO', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'تطوير وتحديث متجر شامل', subtitle: 'مضاعفة المبيعات وتسهيل الدفع', image: 'assets/portfolio/stores/15.webp' },

    // Graphic projects
    { id: 16, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'إنتاج مرئي', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'تصاميم بصرية احترافية', subtitle: 'محتوى تفاعلي وإعلاني جاذب', image: 'assets/portfolio/graphics/1.webp' },
    { id: 17, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'هوية بصرية', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'هويات بصرية ومطبوعات', subtitle: 'براندينج وهوية متكاملة للشركات', image: 'assets/portfolio/graphics/2.webp' },
    { id: 18, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'سوشيال ميديا', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'بوسترات منصات التواصل', subtitle: 'تصاميم إنستقرام وإكس وتيك توك', image: 'assets/portfolio/graphics/3.webp' },
    { id: 19, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'براندينج', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'هوية متجر إلكتروني فاخر', subtitle: 'تنسيق ألوان وشعارات متناسقة', image: 'assets/portfolio/graphics/4.webp' },
    { id: 20, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'بانرات عروض', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'بانرات ترويجية وتخفيضات', subtitle: 'تصاميم مواسم البيع الكبرى', image: 'assets/portfolio/graphics/5.webp' },
    { id: 21, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'تغليف وتعبئة', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'تصاميم أغلفة وبوكسات', subtitle: 'طباعة وتغليف إبداعي للمنتجات', image: 'assets/portfolio/graphics/6.webp' },
    { id: 22, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'إعلانات ممولة', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'منشورات تسويقية إبداعية', subtitle: 'زيادة نسبة النقر والتحويل CTR', image: 'assets/portfolio/graphics/7.webp' },
    { id: 23, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'دليل العلامة', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'دليل الهوية الكامل Guidelines', subtitle: 'تحديد الخطوط واستخدامات الشعار', image: 'assets/portfolio/graphics/8.webp' },
    { id: 24, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'مطبوعات مكتبية', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'كروت ومطبوعات رسمية', subtitle: 'أوراق مراسلات وملفات فاخرة', image: 'assets/portfolio/graphics/9.webp' },
    { id: 25, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'حملات وطنية', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'تصاميم يوم التأسيس والوطني', subtitle: 'محتوى وطني مؤثر وفخم', image: 'assets/portfolio/graphics/10.webp' },
    { id: 26, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'ستوري وتيك توك', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'سلسلة تصاميم ستوري عمودية', subtitle: 'تفاعل استثنائي ونسب مشاهدة عالية', image: 'assets/portfolio/graphics/11.webp' },
    { id: 27, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'بروفايل شركات', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'ملف تعريفي Company Profile', subtitle: 'إخراج احترافي لتقديم الأعمال', image: 'assets/portfolio/graphics/12.webp' },
    { id: 28, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'إنفوجرافيك', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'إنفوجرافيك وشروحات تقنية', subtitle: 'تبسيط البيانات المعقدة بصرياً', image: 'assets/portfolio/graphics/13.webp' },

    // Development projects
    { id: 29, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'حلول برمجية', badgeStyle: 'background: rgba(16, 185, 129, 0.92);', title: 'أنظمة رقمية متقدمة', subtitle: 'بنية برمجية قوية وأداء فائق', image: 'assets/portfolio/dev/1.jpg' },
    { id: 30, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'أتمتة بيانات', badgeStyle: 'background: rgba(16, 185, 129, 0.92);', title: 'أتمتة وإدارة بيانات ضخمة', subtitle: 'معالجة وتنظيف ومزامنة تلقائية', image: 'assets/portfolio/dev/2.png' },
    { id: 31, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'لوحات تحكم', badgeStyle: 'background: rgba(16, 185, 129, 0.92);', title: 'برمجة لوحات تحكم مخصصة', subtitle: 'Dashboard متابعة مبيعات وتقارير', image: 'assets/portfolio/dev/3.png' },
    { id: 32, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'ربط APIs', badgeStyle: 'background: rgba(16, 185, 129, 0.92);', title: 'تكامل بوابات الدفع والشحن', subtitle: 'ربط API مستقر وسريع 100%', image: 'assets/portfolio/dev/4.png' },
    { id: 33, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'نظام حجوزات', badgeStyle: 'background: rgba(16, 185, 129, 0.92);', title: 'منصة حجز وإدارة مواعيد', subtitle: 'إشعارات رسائل وتقويم ذكي', image: 'assets/portfolio/dev/5.webp' },
    { id: 34, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'سكريبتات معالجة', badgeStyle: 'background: rgba(16, 185, 129, 0.92);', title: 'أتمتة إدخال المنتجات', subtitle: 'رفع آلاف المنتجات خلال دقائق', image: 'assets/portfolio/dev/6.webp' },
    { id: 35, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'إدارة مخزون', badgeStyle: 'background: rgba(16, 185, 129, 0.92);', title: 'تطبيق ويب لتتبع المخزون', subtitle: 'تنبيهات فورية عند نفاد الكميات', image: 'assets/portfolio/dev/7.webp' },
    { id: 36, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'بوابة عملاء', badgeStyle: 'background: rgba(16, 185, 129, 0.92);', title: 'بوابة إلكترونية لمتابعة الطلبات', subtitle: 'تسجيل دخول آمن وتجربة مريحة', image: 'assets/portfolio/dev/8.png' },
    { id: 37, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'نظام CRM', badgeStyle: 'background: rgba(16, 185, 129, 0.92);', title: 'إدارة علاقات العملاء CRM', subtitle: 'تنظيم الصفقات والمحادثات', image: 'assets/portfolio/dev/9.png' },
    { id: 38, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'أدوات تقنية', badgeStyle: 'background: rgba(16, 185, 129, 0.92);', title: 'كود مخصص وأدوات تفاعلية', subtitle: 'حلول تقنية خفيفة وسريعة', image: 'assets/portfolio/dev/10.png' },

    // Marketing projects
    { id: 39, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'إعلانات ممولة', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'إدارة حملات ممولة وسناب', subtitle: 'استهداف دقيق وأعلى عائد إعلاني', image: 'assets/portfolio/marketing/1.png' },
    { id: 40, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'خطة نمو', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'خطة تسويقية متكاملة', subtitle: 'مضاعفة المبيعات وتوسيع الشريحة', image: 'assets/portfolio/marketing/2.png' },
    { id: 41, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'إطلاق منتج', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'حملة إطلاق موسمية كبرى', subtitle: 'توليد اهتمام مسبق ومبيعات فورية', image: 'assets/portfolio/marketing/3.jpg' },
    { id: 42, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'Google & Meta', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'إعلانات جوجل وشبكات ميتا', subtitle: 'وصول مباشر للعملاء الجادين بالشراء', image: 'assets/portfolio/marketing/4.png' },
    { id: 43, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'استراتيجية محتوى', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'صناعة خطة محتوى تفاعلي', subtitle: 'بناء مجتمع وفيّ للعلامة التجارية', image: 'assets/portfolio/marketing/5.jpg' },
    { id: 44, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'تهيئة SEO', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'تحسين محركات البحث SEO', subtitle: 'تصدر النتائج الأولى بدون إعلانات', image: 'assets/portfolio/marketing/6.jpg' },
    { id: 45, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'استشارات تسويق', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'تحليل المنافسين ومسارات البيع', subtitle: 'معالجة نقاط تسرب العملاء Funnel', image: 'assets/portfolio/marketing/7.jpg' },
    { id: 46, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'إعادة استهداف', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'حملات Retargeting ذكية', subtitle: 'استعادة السلات المتروكة بكفاءة', image: 'assets/portfolio/marketing/8.png' },
    { id: 47, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'عائد ROAS', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'إدارة ميزانيات تسويق ضخمة', subtitle: 'تحقيق ROAS يتجاوز 6X', image: 'assets/portfolio/marketing/9.jpg' },
    { id: 48, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'زيادة التحويل', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'تحسين صفحات الهبوط Landing Pages', subtitle: 'رفع نسبة الشراء من الزيارات', image: 'assets/portfolio/marketing/10.png' },
    { id: 49, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'واتساب وإيميل', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'أتمتة رسائل الواتساب والبريد', subtitle: 'تنبيهات فورية وإعادة تذكير بالطلب', image: 'assets/portfolio/marketing/11.png' },
    { id: 50, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'عروض كبرى', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'إدارة حملات الجمعة البيضاء', subtitle: 'ضغط طلبات قياسي واستقرار تام', image: 'assets/portfolio/marketing/12.jpg' },
    { id: 51, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'فيديو UGC', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'إعلانات فيديو تيك توك وسناب', subtitle: 'محتوى حقيقي وسريع الإقناع', image: 'assets/portfolio/marketing/13.jpg' },
    { id: 52, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'انطلاقة براند', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'خطة إطلاق متجر ناشئ', subtitle: 'تحقيق أول 1,000 عميل خلال 60 يوم', image: 'assets/portfolio/marketing/14.jpg' },
    { id: 53, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'لوحة مؤشرات', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'تقارير وتحليلات أداء تسويقي', subtitle: 'Dashboard شفاف بالأرقام والإحصائيات', image: 'assets/portfolio/marketing/15.jpg' },
    { id: 54, category: 'marketing', categoryName: 'تسويق وحملات', badge: 'وعي بالعلامة', badgeStyle: 'background: rgba(217, 119, 6, 0.92);', title: 'حملة بناء الوعي والانتشار', subtitle: 'ترسيخ اسم البراند في السوق', image: 'assets/portfolio/marketing/16.jpg' }
  ];

  /* Slider behavior */
  function initSlider(config) {
    const {
      wrapper,
      track,
      prevBtn,
      nextBtn,
      dotsContainer,
      dotClass = 'slider-dot',
      getVisibleCards
    } = config;

    if (!wrapper || !track) return null;

    let currentSlide = 0;
    let totalSlides = 1;
    let cardsPerView = 3;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let isHorizontalDrag = false;
    let dragDirectionDecided = false;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let dragMoved = false;
    let justDragged = false;

    function getCards() {
      if (typeof getVisibleCards === 'function') {
        return getVisibleCards();
      }
      return Array.from(track.children).filter(card => !card.classList.contains('hidden-by-filter'));
    }

    function calculateCardsPerView() {
      const w = window.innerWidth;
      if (w < 640) return 1;
      if (w < 1024) return 2;
      return 3;
    }

    function clampSlideIndex(index) {
      const maxIndex = Math.max(0, totalSlides - 1);
      return Math.max(0, Math.min(index, maxIndex));
    }

    function updateLayout(animate = true) {
      cardsPerView = calculateCardsPerView();
      const cards = getCards();
      totalSlides = Math.max(1, cards.length - cardsPerView + 1);
      currentSlide = clampSlideIndex(currentSlide);

      renderDots();
      updatePosition(animate);
    }

    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = `${dotClass} ${i === currentSlide ? 'active' : ''}`;
        dot.setAttribute('data-index', i);
        dot.addEventListener('click', () => {
          currentSlide = clampSlideIndex(i);
          updatePosition(true);
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updatePosition(animate = true) {
      const cards = getCards();
      if (cards.length === 0) return;

      track.style.transition = animate ? 'transform 0.35s ease-out' : 'none';

      const gap = parseFloat(window.getComputedStyle(track).gap) || 20;
      const wrapperWidth = wrapper.offsetWidth;
      const firstCard = cards[0];
      const cardWidth = firstCard ? firstCard.offsetWidth : (wrapperWidth - (cardsPerView - 1) * gap) / cardsPerView;

      const stepOffset = cardWidth + gap;
      let offset = currentSlide * stepOffset;

      const totalContentWidth = cards.length * cardWidth + (cards.length - 1) * gap;
      const maxScroll = Math.max(0, totalContentWidth - wrapperWidth);

      if (offset > maxScroll) {
        offset = maxScroll;
      }
      if (offset < 0) {
        offset = 0;
      }

      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      currentTranslate = offset;
      prevTranslate = offset;

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll(`.${dotClass}`);
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentSlide);
        });
      }
    }

    function next() {
      currentSlide = clampSlideIndex(currentSlide + 1);
      updatePosition(true);
    }

    function prev() {
      currentSlide = clampSlideIndex(currentSlide - 1);
      updatePosition(true);
    }

    function reset() {
      currentSlide = 0;
      updateLayout(true);
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        next();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prev();
      });
    }

    function onPointerDown(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target instanceof Element && e.target.closest('.work-card-zoom-btn, .testimonial-proof-frame')) return;
      isDragging = true;
      dragMoved = false;
      dragDirectionDecided = false;
      isHorizontalDrag = false;
      startX = e.clientX;
      startY = e.clientY;
      track.setPointerCapture(e.pointerId);
      track.style.transition = 'none';
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const diffX = e.clientX - startX;
      const diffY = e.clientY - startY;

      if (!dragDirectionDecided) {
        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 8) {
          isDragging = false;
          dragDirectionDecided = true;
          track.releasePointerCapture(e.pointerId);
          track.style.transition = 'transform 0.35s ease-out';
          track.style.transform = `translate3d(${prevTranslate}px, 0, 0)`;
          return;
        }
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 8) {
          dragDirectionDecided = true;
          isHorizontalDrag = true;
          track.classList.add('dragging');
        }
      }

      if (!isHorizontalDrag) return;

      dragMoved = true;
      justDragged = true;

      const cards = getCards();
      const gap = parseFloat(window.getComputedStyle(track).gap) || 20;
      const wrapperWidth = wrapper.offsetWidth;
      const cardWidth = cards[0] ? cards[0].offsetWidth : 300;
      const totalContentWidth = cards.length * cardWidth + (cards.length - 1) * gap;
      const maxScroll = Math.max(0, totalContentWidth - wrapperWidth);
      const maxDragDistance = cardWidth + gap;

      let newTranslate = prevTranslate + diffX;
      newTranslate = Math.max(
        prevTranslate - maxDragDistance,
        Math.min(prevTranslate + maxDragDistance, newTranslate)
      );
      newTranslate = Math.max(0, Math.min(maxScroll, newTranslate));

      track.style.transform = `translate3d(${newTranslate}px, 0, 0)`;
    }

    function onPointerUp(e) {
      if (!isDragging && !dragMoved) return;
      isDragging = false;
      track.classList.remove('dragging');

      if (dragMoved) {
        setTimeout(() => { justDragged = false; }, 120);
      } else {
        justDragged = false;
      }

      if (!isHorizontalDrag) return;

      const diff = e.clientX - startX;
      if (diff < -40) {
        next();
      } else if (diff > 40) {
        prev();
      } else {
        updatePosition(true);
      }
    }

    function onPointerCancel() {
      if (!isDragging && !dragMoved) return;
      isDragging = false;
      isHorizontalDrag = false;
      dragMoved = false;
      justDragged = false;
      track.classList.remove('dragging');
      updatePosition(true);
    }

    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove);
    track.addEventListener('pointerup', onPointerUp);
    track.addEventListener('pointercancel', onPointerCancel);

    track.querySelectorAll('img').forEach(img => {
      img.style.pointerEvents = 'none';
      img.style.userSelect = 'none';
      img.setAttribute('draggable', 'false');
    });

    wrapper.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 15) {
        e.preventDefault();
        if (e.deltaX > 0) {
          prev();
        } else {
          next();
        }
      }
    }, { passive: false });

    updateLayout(false);

    return {
      updateLayout,
      updatePosition,
      next,
      prev,
      reset,
      isJustDragged: () => justDragged
    };
  }

  /* Portfolio cards */
  const portfolioTrack = document.getElementById('portfolio-slider-track');
  const portfolioWrapper = document.querySelector('#portfolio .slider-wrapper');
  const portfolioPrevBtn = document.querySelector('#portfolio .slider-btn-prev');
  const portfolioNextBtn = document.querySelector('#portfolio .slider-btn-next');
  const portfolioDots = document.getElementById('portfolio-slider-dots');
  const filterTabs = document.querySelectorAll('.filter-tab');

  let portfolioSlider = null;

  function renderPortfolioCards(items) {
    if (!portfolioTrack) return;
    portfolioTrack.innerHTML = '';

    items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'work-card glass-card';
      card.setAttribute('data-category', item.category);
      card.setAttribute('data-full', item.image);
      card.setAttribute('data-caption', `${item.title} - ${item.categoryName}`);

      card.innerHTML = `
        <div class="work-card-img">
          <button class="work-card-zoom-btn" type="button" aria-label="تكبير العمل" data-full="${item.image}" data-caption="${item.title} - ${item.categoryName}">
            <i class="fa-solid fa-magnifying-glass-plus"></i>
            <span>تكبير</span>
          </button>
          <img src="${item.image}" alt="${item.title}" loading="lazy" draggable="false" style="pointer-events:none;user-select:none;" />
          <div class="work-card-overlay"></div>
          <div class="work-card-badge" style="${item.badgeStyle || ''}">${item.badge}</div>
          <div class="work-card-info">
            <span class="work-card-category">${item.subtitle}</span>
            <h3 class="work-card-title">${item.title}</h3>
          </div>
        </div>
      `;

      const zoomButton = card.querySelector('.work-card-zoom-btn');
      if (zoomButton) {
        zoomButton.addEventListener('click', (e) => {
          e.stopPropagation();
          if (portfolioSlider && portfolioSlider.isJustDragged()) {
            e.preventDefault();
            return;
          }
          openLightbox(item.image, `${item.title} - ${item.categoryName}`);
        });
      }

      card.addEventListener('click', (e) => {
        if (e.target.closest('.work-card-zoom-btn')) return;
        if (portfolioSlider && portfolioSlider.isJustDragged()) {
          e.preventDefault();
          return;
        }
        openLightbox(item.image, `${item.title} - ${item.categoryName}`);
      });

      portfolioTrack.appendChild(card);
    });
  }

  renderPortfolioCards(portfolioItems);

  // Portfolio slider
  portfolioSlider = initSlider({
    wrapper: portfolioWrapper,
    track: portfolioTrack,
    prevBtn: portfolioPrevBtn,
    nextBtn: portfolioNextBtn,
    dotsContainer: portfolioDots,
    dotClass: 'slider-dot',
    getVisibleCards: () => {
      if (!portfolioTrack) return [];
      return Array.from(portfolioTrack.children).filter(card => !card.classList.contains('hidden-by-filter'));
    }
  });

  if (portfolioTrack) {
    Array.from(portfolioTrack.children).forEach(card => {
      if (card.getAttribute('data-category') !== 'store') {
        card.classList.add('hidden-by-filter');
      }
    });
    if (portfolioSlider) portfolioSlider.reset();
  }

  // Portfolio filters
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter') || 'all';
      const allCards = portfolioTrack ? Array.from(portfolioTrack.children) : [];

      allCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden-by-filter');
        } else {
          card.classList.add('hidden-by-filter');
        }
      });

      if (portfolioSlider) {
        portfolioSlider.reset();
      }
    });
  });

  /* Service accordions */
  const serviceCards = document.querySelectorAll('.service-card');

  function openServiceDrawer(card) {
    const drawer = card.querySelector('.service-accordion-drawer');
    const arrow = card.querySelector('.service-toggle-arrow');
    if (!drawer) return;

    card.classList.add('active');
    card.setAttribute('aria-expanded', 'true');
    if (arrow) arrow.textContent = '∧';

    drawer.style.maxHeight = drawer.scrollHeight + 'px';
    drawer.style.opacity = '1';

    const onTransitionEnd = (e) => {
      if (e.propertyName === 'max-height' && card.classList.contains('active')) {
        drawer.style.maxHeight = 'none';
        drawer.removeEventListener('transitionend', onTransitionEnd);
      }
    };
    drawer.addEventListener('transitionend', onTransitionEnd);
  }

  function closeServiceDrawer(card) {
    const drawer = card.querySelector('.service-accordion-drawer');
    const arrow = card.querySelector('.service-toggle-arrow');
    if (!drawer) return;

    if (drawer.style.maxHeight === 'none' || !drawer.style.maxHeight) {
      drawer.style.maxHeight = drawer.scrollHeight + 'px';
      void drawer.offsetHeight;
    }

    card.classList.remove('active');
    card.setAttribute('aria-expanded', 'false');
    if (arrow) arrow.textContent = '∨';

    drawer.style.maxHeight = '0px';
    drawer.style.opacity = '0';
  }

  function toggleServiceCard(card) {
    const isCurrentlyActive = card.classList.contains('active');

    serviceCards.forEach(otherCard => {
      if (otherCard !== card && otherCard.classList.contains('active')) {
        closeServiceDrawer(otherCard);
      }
    });

    if (isCurrentlyActive) {
      closeServiceDrawer(card);
    } else {
      openServiceDrawer(card);
    }
  }

  serviceCards.forEach(card => {
    card.classList.remove('active');
    card.setAttribute('aria-expanded', 'false');
    const drawer = card.querySelector('.service-accordion-drawer');
    const arrow = card.querySelector('.service-toggle-arrow');
    if (drawer) {
      drawer.style.maxHeight = '0px';
      drawer.style.opacity = '0';
    }
    if (arrow) arrow.textContent = '∨';

    card.addEventListener('click', (e) => {
      if (e.target.closest('.service-pill')) return;
      toggleServiceCard(card);
    });

    card.addEventListener('keydown', (e) => {
      if (e.target.closest('.service-pill')) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleServiceCard(card);
      }
    });
  });

  const servicePills = document.querySelectorAll('.service-pill');
  servicePills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      pill.classList.toggle('selected');
    });

    pill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        pill.classList.toggle('selected');
      }
    });
  });

  /* Testimonials slider */
  const testimonialsTrack = document.querySelector('#testimonials .testimonials-slider-track');
  const testimonialsWrapper = document.querySelector('#testimonials .testimonials-carousel-wrapper');
  const testimonialsPrevBtn = document.querySelector('#testimonials .testimonials-btn-prev');
  const testimonialsNextBtn = document.querySelector('#testimonials .testimonials-btn-next');
  const testimonialsDots = document.querySelector('#testimonials .testimonials-dots');

  const testimonialsSlider = initSlider({
    wrapper: testimonialsWrapper,
    track: testimonialsTrack,
    prevBtn: testimonialsPrevBtn,
    nextBtn: testimonialsNextBtn,
    dotsContainer: testimonialsDots,
    dotClass: 'testimonials-dot',
    getVisibleCards: () => {
      if (!testimonialsTrack) return [];
      return Array.from(testimonialsTrack.children);
    }
  });

  /* Slider resize */
  window.addEventListener('resize', () => {
    if (portfolioSlider) portfolioSlider.updateLayout(false);
    if (testimonialsSlider) testimonialsSlider.updateLayout(false);
  });

  /* Stats counters */
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsTriggered = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsTriggered) {
        statsTriggered = true;
        animateCounters();
      }
    });
  }, { threshold: 0.25 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  function animateCounters() {
    statNumbers.forEach(el => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 2200;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(eased * target);

        el.textContent = `${current}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = `${target}${suffix}`;
        }
      }

      requestAnimationFrame(update);
    });
  }

  /* Lightbox */
  const lightboxModal = document.getElementById('testimonial-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCloseBtn = document.querySelector('.lightbox-close');

  function openLightbox(imgSrc, captionText, fallbackSrc = '') {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = imgSrc;
    lightboxImg.onerror = () => {
      if (fallbackSrc) lightboxImg.src = fallbackSrc;
    };
    if (lightboxCaption) {
      lightboxCaption.textContent = captionText || '';
    }
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  const proofFrames = document.querySelectorAll('.testimonial-proof-frame');
  proofFrames.forEach(frame => {
    frame.addEventListener('click', (e) => {
      if (testimonialsSlider && testimonialsSlider.isJustDragged()) {
        e.preventDefault();
        return;
      }

      const fullImgUrl = frame.getAttribute('data-full');
      const captionText = frame.getAttribute('data-caption') || '';
      const fallbackImg = frame.querySelector('img') ? frame.querySelector('img').src : '';

      openLightbox(fullImgUrl, captionText, fallbackImg);
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeMobileNav();
    }
  });

  /* Scroll reveals */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* Back to top */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 450) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Footer year */
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
