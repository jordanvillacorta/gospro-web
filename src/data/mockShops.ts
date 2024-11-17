import { Shop } from '../types/shop';

export const mockShops: Shop[] = [
  {
    id: '1',
    name: 'Artisan Coffee House',
    address: '123 Coffee Street',
    city: 'Kansas City',
    state: 'MO',
    rating: 4.8,
    description: 'A cozy coffee shop specializing in single-origin beans and pour-over brewing methods.',
    hours: {
      Monday: '7:00 AM - 6:00 PM',
      Tuesday: '7:00 AM - 6:00 PM',
      Wednesday: '7:00 AM - 6:00 PM',
      Thursday: '7:00 AM - 6:00 PM',
      Friday: '7:00 AM - 7:00 PM',
      Saturday: '8:00 AM - 7:00 PM',
      Sunday: '8:00 AM - 5:00 PM'
    },
    photos: ['https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=2940'],
    specialties: ['Pour-over Coffee', 'Single-origin Espresso', 'House-made Syrups'],
    priceRange: '$$',
    contact: {
      phone: '(555) 123-4567',
      email: 'hello@artisancoffee.com',
      website: 'https://artisancoffee.com'
    },
    amenities: ['Free Wi-Fi', 'Outdoor Seating', 'Power Outlets']
  },
  {
    id: '2',
    name: 'The Coffee Lab',
    address: '456 Science Ave',
    city: 'Kansas City',
    state: 'MO',
    rating: 4.9,
    description: 'Experimental coffee shop pushing the boundaries of brewing techniques and flavor combinations.',
    hours: {
      Monday: '6:30 AM - 7:00 PM',
      Tuesday: '6:30 AM - 7:00 PM',
      Wednesday: '6:30 AM - 7:00 PM',
      Thursday: '6:30 AM - 7:00 PM',
      Friday: '6:30 AM - 8:00 PM',
      Saturday: '7:00 AM - 8:00 PM',
      Sunday: '7:00 AM - 6:00 PM'
    },
    photos: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2940'],
    specialties: ['Nitrogen-infused Coffee', 'Coffee Flights', 'Molecular Foam Art'],
    priceRange: '$$$',
    contact: {
      phone: '(555) 987-6543',
      email: 'brew@coffeelab.com',
      website: 'https://coffeelab.com'
    },
    amenities: ['Free Wi-Fi', 'Study Space', 'Brewing Classes']
  },
  {
    id: '3',
    name: 'Rustic Bean',
    address: '789 Woodland Road',
    city: 'Kansas City',
    state: 'MO',
    rating: 4.6,
    description: 'A charming cabin-style coffee shop offering comfort and warmth with every cup.',
    hours: {
      Monday: '8:00 AM - 5:00 PM',
      Tuesday: '8:00 AM - 5:00 PM',
      Wednesday: '8:00 AM - 5:00 PM',
      Thursday: '8:00 AM - 5:00 PM',
      Friday: '8:00 AM - 6:00 PM',
      Saturday: '9:00 AM - 6:00 PM',
      Sunday: '9:00 AM - 4:00 PM'
    },
    photos: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=2940'],
    specialties: ['Mountain Roast', 'Campfire Mocha', 'Artisan Pastries'],
    priceRange: '$$',
    contact: {
      phone: '(555) 246-8135',
      email: 'hello@rusticbean.com',
      website: 'https://rusticbean.com'
    },
    amenities: ['Fireplace', 'Board Games', 'Pet Friendly']
  },
  {
    id: '4',
    name: 'Digital Drip',
    address: '101 Tech Boulevard',
    city: 'Kansas City',
    state: 'MO',
    rating: 4.7,
    description: 'Modern coffee shop catering to digital nomads and tech enthusiasts.',
    hours: {
      Monday: '24/7',
      Tuesday: '24/7',
      Wednesday: '24/7',
      Thursday: '24/7',
      Friday: '24/7',
      Saturday: '24/7',
      Sunday: '24/7'
    },
    photos: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2940'],
    specialties: ['AI-predicted Coffee Preferences', 'Bitcoin Payments', 'Smart Cup Refills'],
    priceRange: '$$$',
    contact: {
      phone: '(555) 404-1010',
      email: 'support@digitaldrip.io',
      website: 'https://digitaldrip.io'
    },
    amenities: ['High-speed Wi-Fi', 'Charging Stations', 'Meeting Pods']
  },
  {
    id: '5',
    name: 'Coastal Coffee Co.',
    address: '303 Harbor View',
    city: 'Kansas City',
    state: 'MO',
    rating: 4.5,
    description: 'Waterfront coffee shop offering spectacular views with your morning brew.',
    hours: {
      Monday: '6:00 AM - 6:00 PM',
      Tuesday: '6:00 AM - 6:00 PM',
      Wednesday: '6:00 AM - 6:00 PM',
      Thursday: '6:00 AM - 6:00 PM',
      Friday: '6:00 AM - 8:00 PM',
      Saturday: '6:00 AM - 8:00 PM',
      Sunday: '6:00 AM - 6:00 PM'
    },
    photos: ['https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=2940'],
    specialties: ['Sea Salt Caramel Latte', 'Fresh Seafood Snacks', 'Sunset Blend'],
    priceRange: '$$',
    contact: {
      phone: '(555) 789-4561',
      email: 'kccoastal@coastalcoffee.com',
      website: 'https://coastalcoffee.com'
    },
    amenities: ['Waterfront View', 'Outdoor Seating', 'Boat Parking']
  }
];