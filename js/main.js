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
    { id: 1, category: 'store', categoryName: 'تطوير المتاجر', badge: 'إلكترونيات', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر TAONITY للإلكترونيات', subtitle: 'متجر إلكتروني لإكسسوارات الكمبيوتر', image: 'assets/portfolio/stores/1.webp' },
    { id: 2, category: 'graphic', categoryName: 'جرافيك وإنتاج مرئي', badge: 'تصاميم رياضية', badgeStyle: 'background: rgba(220, 38, 38, 0.92);', title: 'حملات بصرية لموسم رياضي', subtitle: 'تصاميم إعلانية لكرة القدم', image: 'assets/portfolio/stores/2.webp' },
    { id: 3, category: 'store', categoryName: 'تطوير المتاجر', badge: 'عطور وبخور', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر عائلة الطيب للعطور', subtitle: 'واجهة متجر للعطور والبخور', image: 'assets/portfolio/stores/3.webp' },
    { id: 4, category: 'store', categoryName: 'تطوير المتاجر', badge: 'قهوة خليجية', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر قهوة خليجية', subtitle: 'عرض منتجات القهوة ومستلزماتها', image: 'assets/portfolio/stores/4.webp' },
    { id: 5, category: 'store', categoryName: 'تطوير المتاجر', badge: 'أزياء محتشمة', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر ملابس المحجبات', subtitle: 'تصميم واجهة متجر للأزياء المحتشمة', image: 'assets/portfolio/stores/5.webp' },
    { id: 6, category: 'store', categoryName: 'تطوير المتاجر', badge: 'عناية وجمال', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر Beauty Pioneers', subtitle: 'منتجات العناية الشخصية والتجميل', image: 'assets/portfolio/stores/6.webp' },
    { id: 7, category: 'store', categoryName: 'تطوير المتاجر', badge: 'مخبوزات', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر مخبوزات طازجة', subtitle: 'واجهة متجر للمخبوزات والمعجنات', image: 'assets/portfolio/stores/7.webp' },
    { id: 8, category: 'store', categoryName: 'تطوير المتاجر', badge: 'عود وبخور', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر نخبة الأصالة للعود', subtitle: 'عرض منتجات العود والمباخر', image: 'assets/portfolio/stores/8.webp' },
    { id: 9, category: 'store', categoryName: 'تطوير المتاجر', badge: 'عسل طبيعي', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'متجر طعم العسل', subtitle: 'واجهة متجر للعسل ومنتجاته', image: 'assets/portfolio/stores/9.webp' },
    { id: 10, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'موقع طبي', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'موقع مجمع VivaVision الطبي', subtitle: 'تصميم وتطوير موقع لمجمع طبي', image: 'assets/portfolio/stores/10.webp' },
    { id: 11, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'عيادة أطفال', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'موقع عيادة د. رحام إمام', subtitle: 'موقع WordPress لعيادة أطفال', image: 'assets/portfolio/stores/11.webp' },
    { id: 12, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'استدامة', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'موقع مركز استدامة للحلول', subtitle: 'موقع WordPress لمركز استدامة', image: 'assets/portfolio/stores/12.webp' },
    { id: 13, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'جمعية خيرية', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'موقع جمعية البر الخيرية', subtitle: 'تعريف بالخدمات والمشاريع الخيرية', image: 'assets/portfolio/stores/13.webp' },
    { id: 14, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'مؤسسة خيرية', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'موقع مؤسسة العون', subtitle: 'موقع WordPress لمبادرات المؤسسة', image: 'assets/portfolio/stores/14.webp' },
    { id: 15, category: 'dev', categoryName: 'برمجة وتطوير', badge: 'حماية السيارات', badgeStyle: 'background: rgba(8, 145, 178, 0.92);', title: 'موقع CP Protection', subtitle: 'موقع لخدمات حماية السيارات', image: 'assets/portfolio/stores/15.webp' },

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
      getVisibleCards,
      allowImagePointerEvents = false,
      deferPointerCapture = false,
      loop = false
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
    let touchTracking = false;
    let touchDirectionDecided = false;
    let isHorizontalTouch = false;
    let touchStartX = 0;
    let touchStartY = 0;

    function getCards() {
      if (typeof getVisibleCards === 'function') {
        return getVisibleCards();
      }
      return Array.from(track.children).filter(card => !card.classList.contains('hidden-by-filter'));
    }

    function calculateCardsPerView() {
      const cards = getCards();
      if (cards.length === 0) return 1;

      const gap = parseFloat(window.getComputedStyle(track).gap) || 20;
      const card = cards[0];
      const cardStyle = window.getComputedStyle(card);
      const cardWidth = card.getBoundingClientRect().width
        + (parseFloat(cardStyle.marginLeft) || 0)
        + (parseFloat(cardStyle.marginRight) || 0);
      return Math.max(1, Math.floor((wrapper.offsetWidth + gap + 1) / (cardWidth + gap)));
    }

    function clampSlideIndex(index) {
      if (loop && totalSlides > 0) {
        return ((index % totalSlides) + totalSlides) % totalSlides;
      }
      const maxIndex = Math.max(0, totalSlides - 1);
      return Math.max(0, Math.min(index, maxIndex));
    }

    function getStepOffset(cards) {
      if (cards.length > 1) {
        return Math.abs(cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left);
      }

      const card = cards[0];
      if (!card) return 0;
      const style = window.getComputedStyle(card);
      const gap = parseFloat(window.getComputedStyle(track).gap) || 20;
      return card.offsetWidth + gap + (parseFloat(style.marginLeft) || 0) + (parseFloat(style.marginRight) || 0);
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

    function updatePosition(animate = true, transition = 'transform 0.35s ease-out') {
      const cards = getCards();
      if (cards.length === 0) return;

      track.style.transition = animate ? transition : 'none';

      const gap = parseFloat(window.getComputedStyle(track).gap) || 20;
      const wrapperWidth = wrapper.offsetWidth;
      const firstCard = cards[0];
      const cardWidth = firstCard ? firstCard.offsetWidth : (wrapperWidth - (cardsPerView - 1) * gap) / cardsPerView;

      const stepOffset = getStepOffset(cards) || cardWidth + gap;
      let offset = currentSlide * stepOffset;
      const maxScroll = Math.max(0, (totalSlides - 1) * stepOffset);
      offset = Math.max(0, Math.min(maxScroll, offset));

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

    function next(transition) {
      currentSlide = clampSlideIndex(currentSlide + 1);
      updatePosition(true, transition);
    }

    function prev(transition) {
      currentSlide = clampSlideIndex(currentSlide - 1);
      updatePosition(true, transition);
    }

    function reset() {
      currentSlide = 0;
      updateLayout(true);
    }

    function goTo(index, animate = true) {
      currentSlide = clampSlideIndex(index);
      updatePosition(animate);
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
      if (e.pointerType === 'touch') return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.target instanceof Element && e.target.closest('.testimonial-proof-frame')) return;
      isDragging = true;
      dragMoved = false;
      dragDirectionDecided = false;
      isHorizontalDrag = false;
      startX = e.clientX;
      startY = e.clientY;
      if (!deferPointerCapture) track.setPointerCapture(e.pointerId);
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
          if (!deferPointerCapture) track.releasePointerCapture(e.pointerId);
          track.style.transition = 'transform 0.35s ease-out';
          track.style.transform = `translate3d(${prevTranslate}px, 0, 0)`;
          return;
        }
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 8) {
          dragDirectionDecided = true;
          isHorizontalDrag = true;
          if (deferPointerCapture) track.setPointerCapture(e.pointerId);
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
      if (diff < -30) {
        next();
      } else if (diff > 30) {
        prev();
      } else {
        updatePosition(true);
      }
      isHorizontalDrag = false;
      dragMoved = false;
      dragDirectionDecided = false;
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

    function onTouchStart(e) {
      if (e.touches.length !== 1) return;
      touchTracking = true;
      touchDirectionDecided = false;
      isHorizontalTouch = false;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      prevTranslate = currentTranslate;
    }

    function onTouchMove(e) {
      if (!touchTracking || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;
      if (!touchDirectionDecided) {
        if (Math.abs(deltaY) > 8 && Math.abs(deltaY) > Math.abs(deltaX)) {
          touchDirectionDecided = true;
          touchTracking = false;
          return;
        }
        if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
          touchDirectionDecided = true;
          isHorizontalTouch = true;
          track.classList.add('dragging');
          track.style.transition = 'none';
        }
      }

      if (!isHorizontalTouch) return;

      const cards = getCards();
      const stepOffset = getStepOffset(cards);
      const maxScroll = Math.max(0, (totalSlides - 1) * stepOffset);
      const limitedTranslate = Math.max(
        prevTranslate - stepOffset,
        Math.min(prevTranslate + stepOffset, prevTranslate + deltaX)
      );
      const newTranslate = Math.max(0, Math.min(maxScroll, limitedTranslate));
      track.style.transform = `translate3d(${newTranslate}px, 0, 0)`;
    }

    function onTouchEnd(e) {
      if (!touchTracking && !isHorizontalTouch) return;
      touchTracking = false;
      track.classList.remove('dragging');

      const deltaX = e.changedTouches[0].clientX - touchStartX;
      if (isHorizontalTouch) {
        justDragged = Math.abs(deltaX) > 8;
        if (justDragged) setTimeout(() => { justDragged = false; }, 120);

        const touchTransition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';
        if (deltaX > 30) {
          next(touchTransition);
        } else if (deltaX < -30) {
          prev(touchTransition);
        } else {
          updatePosition(true, touchTransition);
        }
      }

      isHorizontalTouch = false;
      touchDirectionDecided = false;
    }

    function onTouchCancel() {
      if (!touchTracking && !isHorizontalTouch) return;
      touchTracking = false;
      isHorizontalTouch = false;
      touchDirectionDecided = false;
      justDragged = false;
      track.classList.remove('dragging');
      updatePosition(true, 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)');
    }

    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove);
    track.addEventListener('pointerup', onPointerUp);
    track.addEventListener('pointercancel', onPointerCancel);
    wrapper.addEventListener('touchstart', onTouchStart, { passive: true });
    wrapper.addEventListener('touchmove', onTouchMove, { passive: true });
    wrapper.addEventListener('touchend', onTouchEnd, { passive: true });
    wrapper.addEventListener('touchcancel', onTouchCancel, { passive: true });

    track.querySelectorAll('img').forEach(img => {
      img.style.pointerEvents = allowImagePointerEvents ? 'auto' : 'none';
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
      goTo,
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
  const portfolioLightbox = document.getElementById('portfolio-lightbox');
  const portfolioLightboxTrack = portfolioLightbox
    ? portfolioLightbox.querySelector('.portfolio-lightbox-track')
    : null;
  const portfolioLightboxWrapper = portfolioLightbox
    ? portfolioLightbox.querySelector('.portfolio-lightbox-slider-wrapper')
    : null;
  const portfolioLightboxNextBtn = portfolioLightbox
    ? portfolioLightbox.querySelector('.portfolio-lightbox-next')
    : null;
  const portfolioLightboxPrevBtn = portfolioLightbox
    ? portfolioLightbox.querySelector('.portfolio-lightbox-prev')
    : null;
  const portfolioLightboxCloseBtn = portfolioLightbox
    ? portfolioLightbox.querySelector('.portfolio-lightbox-close')
    : null;

  let portfolioSlider = null;
  let portfolioLightboxSlider = null;
  let portfolioLightboxTrigger = null;

  if (portfolioLightboxTrack) {
    portfolioLightboxSlider = initSlider({
      wrapper: portfolioLightboxWrapper,
      track: portfolioLightboxTrack,
      getVisibleCards: () => Array.from(portfolioLightboxTrack.children),
      allowImagePointerEvents: true,
      deferPointerCapture: true,
      loop: true
    });

    if (portfolioLightboxPrevBtn) {
      portfolioLightboxPrevBtn.addEventListener('click', () => portfolioLightboxSlider.next());
    }
    if (portfolioLightboxNextBtn) {
      portfolioLightboxNextBtn.addEventListener('click', () => portfolioLightboxSlider.prev());
    }
  }

  function openPortfolioLightbox(index, trigger) {
    if (!portfolioLightbox || !portfolioLightboxSlider) return;

    const visibleCards = portfolioTrack
      ? Array.from(portfolioTrack.querySelectorAll('.work-card:not(.hidden-by-filter)'))
      : [];
    const galleryItems = visibleCards.map(card => {
      const image = card.querySelector('img');
      return image ? {
        index: Number(card.getAttribute('data-gallery-index')),
        src: image.getAttribute('src'),
        alt: image.getAttribute('alt') || ''
      } : null;
    }).filter(item => item && item.src);
    const selectedIndex = galleryItems.findIndex(item => item.index === index);
    if (selectedIndex < 0 || galleryItems.length === 0) return;

    portfolioLightboxTrack.innerHTML = '';
    galleryItems.forEach(item => {
      const slide = document.createElement('div');
      slide.className = 'portfolio-lightbox-slide';

      const image = document.createElement('img');
      image.setAttribute('src', item.src);
      image.alt = item.alt;
      image.loading = 'lazy';

      slide.appendChild(image);
      portfolioLightboxTrack.appendChild(slide);
    });

    portfolioLightboxTrigger = trigger;
    portfolioLightbox.classList.add('active');
    portfolioLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    portfolioLightboxSlider.updateLayout(false);
    portfolioLightboxSlider.goTo(selectedIndex, false);
    portfolioLightboxCloseBtn.focus();

    const activeImage = portfolioLightboxTrack.children[selectedIndex].querySelector('img');
    if (activeImage) activeImage.loading = 'eager';
  }

  function closePortfolioLightbox() {
    if (!portfolioLightbox || !portfolioLightbox.classList.contains('active')) return;

    portfolioLightbox.classList.remove('active');
    portfolioLightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (portfolioLightboxTrigger) portfolioLightboxTrigger.focus();
    portfolioLightboxTrigger = null;
  }

  function renderPortfolioCards(items) {
    if (!portfolioTrack) return;
    portfolioTrack.innerHTML = '';

    items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'work-card glass-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `عرض ${item.title}`);
      card.setAttribute('data-category', item.category);
      card.setAttribute('data-full', item.image);
      card.setAttribute('data-caption', `${item.title} - ${item.categoryName}`);
      card.setAttribute('data-gallery-index', portfolioItems.indexOf(item));

      card.innerHTML = `
        <div class="work-card-img">
          <img src="${item.image}" alt="${item.title}" loading="lazy" draggable="false" style="pointer-events:none;user-select:none;" />
          <div class="work-card-overlay"></div>
          <div class="work-card-badge" style="${item.badgeStyle || ''}">${item.badge}</div>
          <div class="work-card-info">
            <span class="work-card-category">${item.subtitle}</span>
            <h3 class="work-card-title">${item.title}</h3>
          </div>
        </div>
      `;

      const openFromCard = (e) => {
        if (portfolioSlider && portfolioSlider.isJustDragged()) {
          e.preventDefault();
          return;
        }
        openPortfolioLightbox(portfolioItems.indexOf(item), card);
      };

      card.addEventListener('click', openFromCard);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openFromCard(e);
        }
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
    deferPointerCapture: true,
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
    if (portfolioLightbox && portfolioLightbox.classList.contains('active') && portfolioLightboxSlider) {
      portfolioLightboxSlider.updateLayout(false);
    }
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

  if (portfolioLightbox) {
    portfolioLightbox.addEventListener('click', (e) => {
      if (e.target.closest('.portfolio-lightbox-slide img, .portfolio-lightbox-next, .portfolio-lightbox-prev, .portfolio-lightbox-close')) return;
      closePortfolioLightbox();
    });
  }

  if (portfolioLightboxCloseBtn) {
    portfolioLightboxCloseBtn.addEventListener('click', closePortfolioLightbox);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closePortfolioLightbox();
      closeMobileNav();
      return;
    }

    if (portfolioLightbox && portfolioLightbox.classList.contains('active') && portfolioLightboxSlider) {
      if (e.key === 'ArrowLeft') portfolioLightboxSlider.next();
      if (e.key === 'ArrowRight') portfolioLightboxSlider.prev();
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
