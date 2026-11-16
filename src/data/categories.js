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
      { id: 'value', label: 'Excellent Value for Money', emoji: '💰' },
      { id: 'wifi', label: 'Fast & Free Wi-Fi', emoji: '📶' },
      { id: 'parking', label: 'Easy Free Parking', emoji: '🚗' },
      { id: 'view', label: 'Great City / Balcony Views', emoji: '🌆' },
      { id: 'cleanliness', label: 'Spotless & Well-Maintained', emoji: '🧼' },
      { id: 'checkin', label: 'Smooth Check-in & Check-out', emoji: '🗝️' },
    ],
    placeholders: {
      dishOrDetail: 'e.g., Deluxe room, balcony view, breakfast service',
      staffName: 'e.g., Front desk staff name',
    },
    phrases: {
      openers: [
        "Had a wonderful and comfortable stay at this hotel!",
        "An excellent stay — great value, clean rooms, and very helpful staff.",
        "Very impressed with the hospitality and cleanliness here!",
        "A true home away from home. Couldn't have asked for a better stay.",
        "Perfectly comfortable and convenient stay. Highly recommend!",
        "One of the best budget hotel experiences I've had in Ahmedabad!",
      ],
      tagSentences: {
        room: [
          "The room was clean, well-maintained, and very comfortable with good AC and a cozy bed.",
          "Nicely furnished room with everything needed for a great stay — TV, kettle, and a tidy bathroom.",
          "The room was quiet, well-appointed, and gave us a very peaceful and restful night.",
        ],
        service: [
          "The front desk staff were incredibly polite, helpful, and responsive to all our needs.",
          "Excellent hospitality — the team was warm, professional, and went the extra mile.",
          "24-hour front desk support made everything seamless and stress-free.",
        ],
        location: [
          "Superb location near Science City Road — close to CIMS Hospital and major landmarks.",
          "Very conveniently located in the Sola area, with great connectivity to the entire city.",
          "Prime spot in Ahmedabad — easy to reach and close to all major areas.",
        ],
        value: [
          "Outstanding value for money — quality and comfort at a very affordable price point.",
          "Excellent bang for the buck — the facilities and hospitality match much pricier hotels.",
          "Very reasonable pricing for such a clean, comfortable, and well-managed property.",
        ],
        wifi: [
          "The free Wi-Fi was fast, stable, and worked perfectly throughout our stay.",
          "Reliable high-speed internet throughout the property — great for work or leisure.",
        ],
        parking: [
          "Free on-site parking was a huge convenience — no hassle finding or paying for parking.",
          "Ample and secure free parking right at the property made arrival very easy.",
        ],
        view: [
          "The room had a lovely balcony with a pleasant city view — a great bonus!",
          "Beautiful city views from the room made for a wonderful morning experience.",
          "The terrace/balcony view was a delightful touch that really elevated the stay.",
        ],
        cleanliness: [
          "The entire property was spotlessly clean — rooms, corridors, and bathrooms all immaculate.",
          "Housekeeping was thorough and prompt — fresh towels and a tidy room every day.",
          "Excellent hygiene standards throughout — clearly well-maintained by a diligent team.",
        ],
        checkin: [
          "Check-in was quick, smooth, and very welcoming — no long waiting or paperwork hassle.",
          "Effortless check-in process and an equally smooth check-out — very professional.",
        ],
      },
      closers: [
        "Will definitely stay here again on my next visit to Ahmedabad. Highly recommended!",
        "A well-deserved 5 stars — great comfort, service, and value. Thank you, Hotel Gold View!",
        "If you want a clean, comfortable, and affordable stay in Ahmedabad, this is the place!",
        "Couldn't be happier with our stay. The team makes all the difference. 10/10!",
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
  {
    id: 'south_indian',
    name: 'South Indian / Idli / QSR',
    icon: 'Utensils',
    defaultTags: [
      { id: 'idli', label: 'Heavenly Soft Jumbo Idli', emoji: '🫓' },
      { id: 'sambar', label: 'Flavorful Sambar & Chutneys', emoji: '🥣' },
      { id: 'podi', label: 'Irresistible Podi & Ghee Idli', emoji: '🧈' },
      { id: 'service', label: 'Super Fast Service', emoji: '⚡' },
      { id: 'value', label: 'Great Value for Money', emoji: '💰' },
      { id: 'cleanliness', label: 'Spotlessly Clean & Hygienic', emoji: '🧼' },
      { id: 'ambiance', label: 'Modern & Comfortable Ambiance', emoji: '✨' },
      { id: 'authentic', label: 'Authentic South Indian Taste', emoji: '🌿' },
      { id: 'portions', label: 'Generous & Filling Portions', emoji: '🍽️' },
    ],
    placeholders: {
      dishOrDetail: 'e.g., Ghee Podi Idli, Plain Thatte Idli, Sambar',
      staffName: 'e.g., Counter staff name',
    },
    phrases: {
      openers: [
        "What an incredible experience at VEMBO – Home of Jumbo Idli!",
        "Finally found the most authentic Karnataka-style Thatte Idli in Ahmedabad!",
        "Absolutely blown away by the softness and flavors here!",
        "Such a unique and delightful South Indian dining experience!",
        "VEMBO is a must-visit for every idli lover in the city!",
        "Had an amazing time — the Jumbo Idlis lived up to every bit of the hype!",
      ],
      tagSentences: {
        idli: [
          "The Jumbo Thatte Idli is incredibly soft, light, and fluffy — unlike anything I've had before.",
          "These idlis literally melt in your mouth! The texture is perfectly spongy and airy.",
          "The signature Jumbo Idli is a true masterpiece — huge, pillowy-soft, and absolutely delicious.",
        ],
        sambar: [
          "The sambar was piping hot, aromatic, and perfectly balanced between tangy and savory.",
          "Fresh coconut chutney and flavorful sambar paired absolutely perfectly with the idlis.",
          "Multiple varieties of chutney were on point — fresh, authentic, and very flavourful.",
        ],
        podi: [
          "The Ghee Podi Idli is a game-changer — generously coated in spiced gunpowder and melted ghee.",
          "The Podi Thatte Idli with ghee is rich, spicy, and utterly satisfying. A must-try!",
          "Loved the Ghee Podi variant — the molagapodi spice level and ghee quantity were spot on.",
        ],
        service: [
          "Service was impressively quick and efficient — food was served in no time.",
          "Quick counter service with zero waiting — perfect for a fast and satisfying meal.",
          "Super prompt service that made the whole experience seamless and enjoyable.",
        ],
        value: [
          "Absolutely great value — a single Jumbo Idli is filling enough for a complete meal at a very reasonable price.",
          "Pricing is very affordable considering the generous portion sizes and top-notch quality.",
          "Value for money is excellent — you get a lot for every rupee spent here.",
        ],
        cleanliness: [
          "The outlet is squeaky clean, well-maintained, and maintains excellent hygiene standards.",
          "Spotlessly clean kitchen, counters, and dining area — hygienic QSR standards at their best.",
          "Very hygienic setup that you notice immediately — a great sign for a food outlet.",
        ],
        ambiance: [
          "The modern, neat, and minimalist decor creates a very comfortable and pleasant dining atmosphere.",
          "Clean, contemporary, and well-lit space — a great spot for breakfast or an evening snack.",
          "Comfortable seating with a refreshingly clean and modern vibe.",
        ],
        authentic: [
          "Genuinely tastes like authentic Karnataka-style Thatte Idli — the real deal right here in Ahmedabad!",
          "The flavors are incredibly authentic and transport you straight to South India.",
          "VEMBO brings the true taste of Karnataka's iconic Bidadi-style Thatte Idli to our city.",
        ],
        portions: [
          "The Jumbo Idli portions are incredibly generous — one is enough to fully satisfy your hunger.",
          "Great portion sizes that give outstanding value and leave you pleasantly full.",
          "The sheer size of the Jumbo Idli is impressive — truly lives up to its name!",
        ],
      },
      closers: [
        "Will definitely be a regular here! Highly recommended for all South Indian food lovers.",
        "Already planning my next visit. VEMBO is now my go-to breakfast spot in Ahmedabad!",
        "A well-deserved 5 stars — the best idli experience in the city, hands down!",
        "If you haven't tried VEMBO yet, you're missing out. Go try the Jumbo Idli ASAP!",
        "Wonderful experience! Keep up the amazing food and service!",
      ],
    },
  },
];

