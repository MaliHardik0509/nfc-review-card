// Comprehensive business categories, tags, and rich natural language phrase banks
// Designed to generate authentic, non-repetitive, 5-star Google reviews.

export const BUSINESS_CATEGORIES = [
  {
    id: 'restaurant',
    name: 'Restaurant / Cafe / Bar',
    icon: 'Utensils',
    defaultTags: [
      { id: 'food', label: 'Delicious Food', emoji: '🍕' },
      { id: 'service', label: 'Fast & Attentive Service', emoji: '⚡' },
      { id: 'cleanliness', label: 'Super Clean & Hygienic', emoji: '🧼' },
      { id: 'staff', label: 'Friendly & Welcoming Staff', emoji: '🧑‍🍳' },
      { id: 'ambiance', label: 'Cozy & Vibrant Ambiance', emoji: '✨' },
      { id: 'drinks', label: 'Awesome Drinks & Coffee', emoji: '☕' },
      { id: 'value', label: 'Great Value for Money', emoji: '💰' },
      { id: 'portions', label: 'Generous Portions', emoji: '🍽️' },
      { id: 'dessert', label: 'Mouthwatering Desserts', emoji: '🍰' },
    ],
    placeholders: {
      dishOrDetail: 'e.g., Truffle pasta, signature burger, cold brew',
      staffName: 'e.g., Alex, Maria',
    },
    phrases: {
      openers: [
        "Hands down one of the best dining experiences I've had in a long time!",
        "Had an absolutely fantastic meal here today!",
        "Such an incredible spot! We visited recently and were blown away.",
        "Everything about this place exceeded our expectations.",
        "What a wonderful gem! Easily a 5-star experience from start to finish.",
        "From the moment we walked in, we knew we were in for a treat.",
        "If you're looking for top-notch quality and great vibes, look no further!",
      ],
      tagSentences: {
        food: [
          "The food was incredibly fresh, bursting with authentic flavors, and presented beautifully.",
          "Every single dish was cooked to perfection and tasted amazing.",
          "The culinary quality is genuinely next-level — every bite was sensational.",
          "The food here is unmatched in taste, freshness, and quality.",
        ],
        service: [
          "Service was lightning fast, polite, and thoroughly professional.",
          "Our orders arrived quickly and the staff was constantly on point without hovering.",
          "Speedy, attentive, and seamless service throughout our meal.",
        ],
        cleanliness: [
          "The dining area, tables, and facilities were sparkling clean and impeccably maintained.",
          "Spotless environment with top-tier hygiene standards that you notice right away.",
          "Everything was pristine, clean, and very comfortable.",
        ],
        staff: [
          "The staff was so warm, courteous, and made us feel right at home.",
          "Incredible hospitality! Everyone on the team had a smile on their face and went above and beyond.",
          "Wonderful customer service — friendly, patient, and very helpful with recommendations.",
        ],
        ambiance: [
          "The atmosphere was cozy, beautifully decorated, and had the perfect vibe for unwinding.",
          "Great aesthetic, fantastic music, and a really welcoming ambiance.",
          "The interior design and mood make this place ideal for dates, friends, or family outings.",
        ],
        drinks: [
          "The beverages and specialty drinks were crafted with precision and tasted delicious.",
          "Loved their drink selections! Refreshing, high-quality, and creative.",
        ],
        value: [
          "Pricing is very reasonable considering the generous portion sizes and top-tier quality.",
          "Great value for money — high-end taste without breaking the bank.",
        ],
        portions: [
          "The portions were hearty, generous, and left everyone completely satisfied.",
          "Great portion sizes that really deliver on value.",
        ],
        dessert: [
          "Do not skip the desserts! Sweet, rich, and the perfect finish to our visit.",
          "The dessert was heavenly and rounded off the meal wonderfully.",
        ],
      },
      closers: [
        "Will definitely be returning soon and recommending it to all my friends and family!",
        "Already looking forward to our next visit. 10/10 highly recommended!",
        "Can't wait to come back! Keep up the outstanding work!",
        "A well-deserved 5 stars. Do yourself a favor and check it out!",
        "Easily one of my new favorites in the area. Highly recommend!",
      ],
    },
  },
  {
    id: 'salon',
    name: 'Salon / Spa / Barber',
    icon: 'Scissors',
    defaultTags: [
      { id: 'expert', label: 'Skilled & Professional Stylists', emoji: '✂️' },
      { id: 'cleanliness', label: 'Spotless & Hygienic Tools', emoji: '🧼' },
      { id: 'atmosphere', label: 'Relaxing & Calming Vibe', emoji: '🌿' },
      { id: 'listening', label: 'Listened to Exactly What I Wanted', emoji: '👂' },
      { id: 'service', label: 'Pampering & Attentive Service', emoji: '💆' },
      { id: 'on_time', label: 'Punctual / No Long Waits', emoji: '⏰' },
      { id: 'value', label: 'Fair & Transparent Pricing', emoji: '💎' },
      { id: 'products', label: 'Premium Quality Products', emoji: '🧴' },
    ],
    placeholders: {
      dishOrDetail: 'e.g., Fade haircut, balayage, deep tissue massage',
      staffName: 'e.g., Jessica, David',
    },
    phrases: {
      openers: [
        "Hands down the best salon experience I've had in years!",
        "Left feeling completely refreshed and confident!",
        "Such a wonderful pampering experience from beginning to end.",
        "Finally found my go-to salon! Couldn't be happier with the outcome.",
        "Top-tier service and incredible attention to detail.",
      ],
      tagSentences: {
        expert: [
          "The stylists here are true artists with tremendous skill and precision.",
          "Masterful technique and expertise — my hair/look turned out even better than I envisioned.",
          "You can tell the staff is highly trained and knows exactly what suits you best.",
        ],
        cleanliness: [
          "All equipment, chairs, and stations were thoroughly sanitized and spotless.",
          "Cleanliness standards here are exemplary, which gave me immense peace of mind.",
        ],
        atmosphere: [
          "The salon has such a soothing, peaceful, and luxurious atmosphere.",
          "Loved the tranquil vibe — relaxing music and an inviting aesthetic.",
        ],
        listening: [
          "They took the time to consult with me and executed my exact vision flawlessly.",
          "No rushing! They listened carefully to what I wanted and gave honest advice.",
        ],
        service: [
          "Super attentive hospitality, offering refreshments and checking in on my comfort.",
          "The customer service is warm, welcoming, and very respectful.",
        ],
        on_time: [
          "They started right on schedule — zero waiting time around my appointment.",
          "Appreciated how well they respect clients' schedules and time.",
        ],
        value: [
          "The pricing is totally fair and transparent for this level of luxury treatment.",
          "Exceptional value for such premium results.",
        ],
        products: [
          "They only use high-end, premium brand products that left everything feeling amazing.",
          "High quality hair and skincare products with delightful natural fragrances.",
        ],
      },
      closers: [
        "I'll definitely be a loyal client from now on. Highly recommended!",
        "Will be booking my next appointment soon! 10/10 experience.",
        "If you want to look and feel your best, this is the place to go!",
      ],
    },
  },
  {
    id: 'clinic',
    name: 'Healthcare / Dental / Clinic',
    icon: 'Stethoscope',
    defaultTags: [
      { id: 'doctor', label: 'Knowledgeable & Caring Doctor', emoji: '🩺' },
      { id: 'gentle', label: 'Painless & Gentle Care', emoji: '🕊️' },
      { id: 'cleanliness', label: 'Sterile & Modern Facility', emoji: '🏥' },
      { id: 'staff', label: 'Courteous & Helpful Staff', emoji: '🤝' },
      { id: 'clear_info', label: 'Clear Explanations & Advice', emoji: '📋' },
      { id: 'short_wait', label: 'Minimal Wait Time', emoji: '⏱️' },
      { id: 'equipment', label: 'Advanced & Modern Equipment', emoji: '🔬' },
    ],
    placeholders: {
      dishOrDetail: 'e.g., Dental cleaning, consultation, checkup',
      staffName: 'e.g., Dr. Smith, Nurse Emily',
    },
    phrases: {
      openers: [
        "Outstanding medical care and a truly comforting environment.",
        "Had a very smooth, professional, and reassuring visit today.",
        "One of the best clinic and healthcare experiences I've ever had.",
        "Extremely impressed with the professionalism and care shown by the entire team.",
      ],
      tagSentences: {
        doctor: [
          "The doctor is exceptionally thorough, compassionate, and takes time to answer every question.",
          "Felt completely heard and in safe, experienced medical hands.",
        ],
        gentle: [
          "The treatment was surprisingly gentle and virtually painless.",
          "They made me feel completely relaxed and comfortable throughout the procedure.",
        ],
        cleanliness: [
          "The clinic is spotlessly clean, fully sanitized, and adheres to strict hygiene standards.",
          "Immaculate environment with a very modern, hygienic setup.",
        ],
        staff: [
          "The receptionists and nursing staff are courteous, cheerful, and very efficient.",
          "Wonderful bedside manner and administrative support throughout the visit.",
        ],
        clear_info: [
          "Everything was explained clearly without medical jargon, outlining all my options.",
          "Very transparent advice regarding treatment steps and preventive care.",
        ],
        short_wait: [
          "Practically zero waiting time — was seen right at my scheduled appointment time.",
          "Seamless scheduling and punctual consultation.",
        ],
        equipment: [
          "State-of-the-art diagnostic and treatment technology.",
          "Very modern and high-tech facility.",
        ],
      },
      closers: [
        "Genuinely grateful for the fantastic care. Highly recommend to anyone seeking trusted care!",
        "I wouldn't trust anyone else with my health. 5-star clinic!",
        "Highly recommended for their compassion and top-notch professionalism.",
      ],
    },
  },
  {
    id: 'retail',
    name: 'Retail Store / Boutique / Supermarket',
    icon: 'ShoppingBag',
    defaultTags: [
      { id: 'selection', label: 'Wide Variety & Great Selection', emoji: '🛍️' },
      { id: 'quality', label: 'High Quality Products', emoji: '🌟' },
      { id: 'staff', label: 'Helpful & Knowledgeable Staff', emoji: '🙋' },
      { id: 'prices', label: 'Competitive & Fair Prices', emoji: '🏷️' },
      { id: 'checkout', label: 'Quick & Smooth Checkout', emoji: '⚡' },
      { id: 'organized', label: 'Neat & Well-Organized Store', emoji: '✨' },
    ],
    placeholders: {
      dishOrDetail: 'e.g., Winter jacket, organic groceries, gift items',
      staffName: 'e.g., Cashier Sam',
    },
    phrases: {
      openers: [
        "A fantastic shopping experience with an impressive selection!",
        "Love this store! Always find exactly what I need and more.",
        "Great place to shop — easily a 5-star store in my book.",
        "Super pleased with my purchase and the overall customer service.",
      ],
      tagSentences: {
        selection: [
          "Incredible variety with something for every taste and budget.",
          "A curated selection of items that you won't easily find elsewhere.",
        ],
        quality: [
          "The build and material quality of their products is exceptional.",
          "Everything in stock is authentic, durable, and top grade.",
        ],
        staff: [
          "The store associates were very friendly and eager to help without being pushy.",
          "Knowledgeable staff who guided me to the best choices quickly.",
        ],
        prices: [
          "Very reasonable pricing with great deals and true value.",
          "Transparent pricing and worth every single dollar.",
        ],
        checkout: [
          "Checkout was fast, organized, and hassle-free.",
          "No long queues, super prompt billing process.",
        ],
        organized: [
          "The store layout is clean, spacious, and very easy to navigate.",
          "Neat shelves, well-lit, and an enjoyable place to browse.",
        ],
      },
      closers: [
        "Will definitely be coming back for future shopping! Highly recommend.",
        "5 stars all the way. A must-visit retail destination!",
        "Always a pleasure shopping here. Keep up the great work!",
      ],
    },
  },
  {
    id: 'hotel',
    name: 'Hotel / Resort / Stay',
    icon: 'Hotel',
    defaultTags: [
      { id: 'room', label: 'Clean & Comfortable Rooms', emoji: '🛏️' },
      { id: 'service', label: 'Warm & Helpful Front Desk', emoji: '🛎️' },
      { id: 'location', label: 'Convenient & Prime Location', emoji: '📍' },
      { id: 'breakfast', label: 'Delicious Breakfast & Food', emoji: '🍳' },
      { id: 'amenities', label: 'Great Amenities & Pool/Gym', emoji: '🏊' },
      { id: 'view', label: 'Breathtaking Views & Quiet', emoji: '🌄' },
      { id: 'cleanliness', label: 'Spotless Housekeeping', emoji: '🧼' },
    ],
    placeholders: {
      dishOrDetail: 'e.g., King suite, breakfast buffet, pool area',
      staffName: 'e.g., Concierge Liam',
    },
    phrases: {
      openers: [
        "An unforgettable stay! We had an incredible time from check-in to check-out.",
        "One of the best hospitality experiences we've enjoyed.",
        "Everything about our stay was relaxing, luxurious, and stress-free.",
        "A true home away from home. Couldn't have asked for a better stay.",
      ],
      tagSentences: {
        room: [
          "The room was spacious, beautifully appointed, with a plush, super-comfortable bed.",
          "Silent, temperature-controlled, and gave us the most peaceful night's rest.",
        ],
        service: [
          "The front desk and concierge were immensely polite, welcoming, and quick to assist.",
          "Hospitality at its finest! Every request was handled with a warm smile.",
        ],
        location: [
          "Prime location with easy access to attractions, transit, and great dining nearby.",
          "Safe and convenient neighborhood that made exploring effortless.",
        ],
        breakfast: [
          "The breakfast spread was lavish, hot, fresh, and full of delicious options.",
          "Great coffee and delicious morning dining to kickstart the day.",
        ],
        amenities: [
          "Top-notch facilities including a well-kept pool and fitness center.",
          "All the amenities were in pristine working condition.",
        ],
        cleanliness: [
          "Daily housekeeping was flawless — towels fresh, surfaces sparkling.",
          "Uncompromising hygiene and cleanliness throughout the property.",
        ],
      },
      closers: [
        "Will without hesitation stay here again on our next trip. Highly recommended!",
        "A flawless 5-star stay. Thank you to the wonderful team!",
        "If you want comfort, luxury, and warmth, this is the place to book!",
      ],
    },
  },
  {
    id: 'service',
    name: 'General / Professional / Auto / Fitness',
    icon: 'Wrench',
    defaultTags: [
      { id: 'professional', label: 'Highly Professional & Knowledgeable', emoji: '⭐' },
      { id: 'punctual', label: 'On Time & Reliable', emoji: '⏱️' },
      { id: 'communication', label: 'Clear & Responsive Communication', emoji: '💬' },
      { id: 'quality', label: 'Exceptional Quality of Work', emoji: '🛠️' },
      { id: 'pricing', label: 'Honest & Transparent Pricing', emoji: '💰' },
      { id: 'clean', label: 'Left Everything Clean & Tidy', emoji: '🧼' },
    ],
    placeholders: {
      dishOrDetail: 'e.g., AC repair, brake service, personal training session',
      staffName: 'e.g., Technician Mike',
    },
    phrases: {
      openers: [
        "Phenomenal service from beginning to end!",
        "Hands down one of the most reliable and professional businesses I've worked with.",
        "Exceeded all my expectations! Could not be happier with the results.",
        "A truly seamless and stress-free service experience.",
      ],
      tagSentences: {
        professional: [
          "Extremely knowledgeable, skilled, and took care of everything with precision.",
          "True professionals who know their craft inside and out.",
        ],
        punctual: [
          "Showed up right on time and finished the job faster than anticipated.",
          "Very dependable and committed to their timeline.",
        ],
        communication: [
          "Communication was clear, prompt, and informative throughout the entire process.",
          "They kept me updated every step of the way without any guessing games.",
        ],
        quality: [
          "The attention to detail and standard of work is second to none.",
          "Top-tier workmanship that speaks for itself.",
        ],
        pricing: [
          "Completely honest estimate with no surprise hidden fees or upselling.",
          "Very fair pricing for the high standard of service delivered.",
        ],
        clean: [
          "Respectful of the space and left everything clean, neat, and organized.",
          "Spotless cleanup after finishing the work.",
        ],
      },
      closers: [
        "Will definitely be calling them again for any future needs. Highly recommended!",
        "5 stars without a doubt. Do not hesitate to hire them!",
        "A trustworthy and stellar service provider. 10/10!",
      ],
    },
  },
  {
    id: 'jewellery',
    name: 'Jewellery Showroom / Luxury Goods',
    icon: 'Gem',
    defaultTags: [
      { id: 'purity', label: '100% Pure & Hallmarked', emoji: '💎' },
      { id: 'designs', label: 'Exquisite & Unique Designs', emoji: '✨' },
      { id: 'staff', label: 'Patient & Courteous Staff', emoji: '🧑‍💼' },
      { id: 'pricing', label: 'Fair Making Charges & Transparent Rates', emoji: '🏷️' },
      { id: 'craftsmanship', label: 'Flawless Finishing & Detailing', emoji: '💍' },
      { id: 'trust', label: 'Trusted Family Jeweller', emoji: '🤝' },
      { id: 'variety', label: 'Great Bridal & Daily Collection', emoji: '👑' },
    ],
    placeholders: {
      dishOrDetail: 'e.g., Gold necklace, diamond ring, bridal bangle',
      staffName: 'e.g., Sales executive name',
    },
    phrases: {
      openers: [
        "Hands down the most trusted and elegant jewellery showroom in town!",
        "Had a truly wonderful experience purchasing jewellery here today!",
        "What a magnificent collection! We were thoroughly impressed from start to finish.",
        "Exceptional quality, stunning craftsmanship, and trustworthy service.",
        "Easily a 5-star jewellery showroom. Would recommend to anyone looking for fine jewellery!",
      ],
      tagSentences: {
        purity: [
          "All pieces are 100% hallmarked and certified, giving complete peace of mind on purity.",
          "Uncompromised purity and authenticity — you can buy with total confidence.",
        ],
        designs: [
          "Their designs are breathtakingly beautiful, modern yet timeless, and stand out from the crowd.",
          "A gorgeous selection of designs with tremendous attention to detail.",
        ],
        staff: [
          "The staff was exceedingly polite, patient, and happily showed us dozens of designs without rushing.",
          "Wonderful customer service — very knowledgeable, courteous, and attentive to our preferences.",
        ],
        pricing: [
          "Very fair making charges and completely transparent pricing without hidden fees.",
          "Honest billing and competitive rates for such premium craftsmanship.",
        ],
        craftsmanship: [
          "The finishing, polish, and detailing of the ornaments are truly world-class.",
          "Impeccable craftsmanship that you can immediately appreciate up close.",
        ],
        trust: [
          "A highly reputed, dependable jeweller that our family will always return to.",
          "Trust and integrity are evident in every interaction.",
        ],
        variety: [
          "Incredible variety spanning traditional bridal wear, antique jewellery, and lightweight daily wear.",
          "Great range of choices suitable for every occasion and budget.",
        ],
      },
      closers: [
        "Will definitely be our family's first choice for all future jewellery purchases! 10/10!",
        "A well-deserved 5 stars. Highly recommended for genuine quality and service!",
        "Couldn't be happier with our purchase. Thank you so much!",
      ],
    },
  },
];

