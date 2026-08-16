/* Default/seed data for all content sections.
   Used as fallback when Firebase is not configured or data hasn't loaded. */

export const defaultQuotes = [
  {
    id: 'q1',
    text: 'তমসো মা জ্যোতির্গময় — From darkness, lead me to light.',
    author: 'Brihadaranyaka Upanishad',
  },
  {
    id: 'q2',
    text: 'Education is the most powerful weapon which you can use to change the world.',
    author: 'Nelson Mandela',
  },
  {
    id: 'q3',
    text: 'The roots of education are bitter, but the fruit is sweet.',
    author: 'Aristotle',
  },
  {
    id: 'q4',
    text: 'An investment in knowledge pays the best interest.',
    author: 'Benjamin Franklin',
  },
  {
    id: 'q5',
    text: 'Once a Collegian, always a Collegian — bound by the ties of tradition and brotherhood.',
    author: 'HCS Alumni Association',
  },
];

export const defaultLeadership = [
  {
    id: 'l1',
    name: 'Shri Arun Kumar Chatterjee',
    designation: 'Chairman',
    photo: '',
    bio: 'An esteemed alumnus of HCS (Batch of 1982), Shri Chatterjee has been instrumental in reviving the alumni network and strengthening the bond between generations of Collegians.',
    email: '',
    phone: '',
    order: 1,
  },
  {
    id: 'l2',
    name: 'Shri Debashis Mukherjee',
    designation: 'Vice Chairman',
    photo: '',
    bio: 'A dedicated educationist and former student (Batch of 1985), Shri Mukherjee brings a wealth of experience in community building and educational outreach.',
    email: '',
    phone: '',
    order: 2,
  },
  {
    id: 'l3',
    name: 'Shri Partha Sarathi Das',
    designation: 'General Secretary',
    photo: '',
    bio: 'Batch of 1990. As General Secretary, Shri Das oversees day-to-day operations, event coordination, and member communications for the Alumni Association.',
    email: '',
    phone: '',
    order: 3,
  },
  {
    id: 'l4',
    name: 'Shri Kaushik Banerjee',
    designation: 'Treasurer',
    photo: '',
    bio: 'A seasoned finance professional and proud Collegian (Batch of 1988), Shri Banerjee manages the association\'s finances with transparency and diligence.',
    email: '',
    phone: '',
    order: 4,
  },
  {
    id: 'l5',
    name: 'Shri Rajarshi Roy',
    designation: 'Publisher & Media Secretary',
    photo: '',
    bio: 'Batch of 1992. Shri Roy manages all publications, digital media, and communications, ensuring the association\'s voice reaches every corner.',
    email: '',
    phone: '',
    order: 5,
  },
  {
    id: 'l6',
    name: 'Shri Suman Ghosh',
    designation: 'Joint Secretary',
    photo: '',
    bio: 'A committed member since 2020, Shri Ghosh assists in organizing events, liaising with the school administration, and maintaining alumni records.',
    email: '',
    phone: '',
    order: 6,
  },
];

export const defaultAlumni = [
  {
    id: 'a1',
    name: 'Dr. Anirban Chakraborty',
    photo: '',
    yearOfPassing: '1995',
    batch: 'Science',
    profession: 'Cardiologist, SSKM Hospital',
    location: 'Kolkata, West Bengal',
    status: 'Active',
    bio: 'A gold medalist from Calcutta University, Dr. Chakraborty has been practicing cardiology for over 20 years and actively mentors young medical aspirants from HCS.',
    approved: true,
  },
  {
    id: 'a2',
    name: 'Shri Sourav Mitra',
    photo: '',
    yearOfPassing: '1998',
    batch: 'Commerce',
    profession: 'Chartered Accountant',
    location: 'Hooghly, West Bengal',
    status: 'Active',
    bio: 'Managing partner of a CA firm in Chinsurah. Active volunteer for the association\'s scholarship programs.',
    approved: true,
  },
  {
    id: 'a3',
    name: 'Prof. Sumit Bandyopadhyay',
    photo: '',
    yearOfPassing: '1988',
    batch: 'Science',
    profession: 'Professor of Physics, Jadavpur University',
    location: 'Kolkata, West Bengal',
    status: 'Active',
    bio: 'Renowned researcher in condensed matter physics with over 100 publications. Regularly conducts guest lectures at HCS.',
    approved: true,
  },
  {
    id: 'a4',
    name: 'Shri Amit Kumar Sen',
    photo: '',
    yearOfPassing: '2002',
    batch: 'Arts',
    profession: 'Civil Services Officer (IAS)',
    location: 'New Delhi',
    status: 'Active',
    bio: 'Currently serving as Joint Secretary, Ministry of Education. An inspiration for students aspiring to civil services.',
    approved: true,
  },
  {
    id: 'a5',
    name: 'Shri Dipak Halder',
    photo: '',
    yearOfPassing: '2005',
    batch: 'Science',
    profession: 'Software Engineer, Google',
    location: 'Bangalore, Karnataka',
    status: 'Active',
    bio: 'Senior Software Engineer with expertise in AI/ML. Contributes to the association\'s digital initiatives.',
    approved: true,
  },
  {
    id: 'a6',
    name: 'Dr. Rituparna Ghosh',
    photo: '',
    yearOfPassing: '2000',
    batch: 'Science',
    profession: 'Surgeon, Apollo Hospital',
    location: 'Kolkata, West Bengal',
    status: 'Active',
    bio: 'Renowned general surgeon with specialization in laparoscopic surgery. Active participant in health camps organized by the association.',
    approved: true,
  },
  {
    id: 'a7',
    name: 'Shri Bibhas Ranjan Dey',
    photo: '',
    yearOfPassing: '1990',
    batch: 'Commerce',
    profession: 'Businessman & Philanthropist',
    location: 'Chinsurah, West Bengal',
    status: 'Active',
    bio: 'Founder of a local textile business. Major donor to the school infrastructure development fund.',
    approved: true,
  },
  {
    id: 'a8',
    name: 'Shri Tanmoy Bhattacharya',
    photo: '',
    yearOfPassing: '2010',
    batch: 'Science',
    profession: 'Research Scientist, ISRO',
    location: 'Ahmedabad, Gujarat',
    status: 'Active',
    bio: 'Working on satellite communication systems at ISRO. Youngest member of the association\'s governing body.',
    approved: true,
  },
];

export const defaultTeachers = [
  {
    id: 't1',
    name: 'Shri Ashok Kumar Sarkar',
    photo: '',
    subject: 'Mathematics',
    yearsServed: '1975 – 2010',
    notes: 'Known as the legendary math teacher of HCS. Hundreds of his students have excelled in competitive examinations. His dedication to teaching was unparalleled.',
    tribute: 'A teacher who made mathematics a joy for generations of students.',
  },
  {
    id: 't2',
    name: 'Smt. Shila Devi',
    photo: '',
    subject: 'Bengali Literature',
    yearsServed: '1980 – 2015',
    notes: 'An expert in Rabindranath Tagore\'s literature. Her classes were known for bringing literature to life through dramatic readings and cultural performances.',
    tribute: 'Her passion for Bengali literature inspired countless students to appreciate their literary heritage.',
  },
  {
    id: 't3',
    name: 'Shri Bidyut Ranjan Pal',
    photo: '',
    subject: 'Physics',
    yearsServed: '1985 – 2020',
    notes: 'Established the school\'s physics laboratory with modern equipment. Many of his students went on to pursue careers in scientific research.',
    tribute: 'A visionary educator who believed in learning by doing.',
  },
  {
    id: 't4',
    name: 'Shri Tapan Kumar Ghosh',
    photo: '',
    subject: 'History & Civics',
    yearsServed: '1978 – 2012',
    notes: 'Master storyteller who made history come alive. Organized numerous educational excursions and heritage walks for students.',
    tribute: 'He taught us that history is not just about dates — it\'s about understanding humanity.',
  },
];

export const defaultAnnouncements = [
  {
    id: 'n1',
    title: 'Annual Alumni Reunion 2026',
    content: 'We are delighted to announce the Annual Alumni Reunion scheduled for December 15, 2026. The event will be held at the school campus with cultural programs, felicitation ceremony, and a grand dinner. All alumni members are cordially invited. Registration details will follow soon.',
    date: '2026-08-01',
    category: 'event',
    pinned: true,
    image: '',
  },
  {
    id: 'n2',
    title: 'Scholarship Fund Drive 2026-27',
    content: 'The Alumni Association is launching a scholarship fund for meritorious students from economically weaker sections. We aim to support at least 20 students this academic year. Donations can be made through the association\'s bank account. Contact the Treasurer for details.',
    date: '2026-07-20',
    category: 'notice',
    pinned: true,
    image: '',
  },
  {
    id: 'n3',
    title: 'New Members Orientation Session',
    content: 'A virtual orientation session for newly enrolled alumni members will be held on August 25, 2026, at 7:00 PM via Google Meet. New members will be introduced to the association\'s activities, governance structure, and upcoming initiatives.',
    date: '2026-07-15',
    category: 'meeting',
    pinned: false,
    image: '',
  },
  {
    id: 'n4',
    title: 'Blood Donation Camp – Save Lives',
    content: 'In collaboration with the Hooghly District Blood Bank, the Alumni Association is organizing a blood donation camp on September 5, 2026, at the school auditorium from 10:00 AM to 4:00 PM. All healthy alumni and local residents are encouraged to participate.',
    date: '2026-08-05',
    category: 'event',
    pinned: false,
    image: '',
  },
];

export const defaultTasks = [
  {
    id: 'tk1',
    title: 'Website Launch & Public Release',
    description: 'Complete all sections of the alumni association website and deploy to production hosting.',
    status: 'in-progress',
    assignedTo: 'Digital Media Team',
    deadline: '2026-09-01',
    progress: 75,
  },
  {
    id: 'tk2',
    title: 'Annual Reunion Event Planning',
    description: 'Coordinate venue booking, guest invitations, cultural program lineup, catering, and logistics for the December reunion.',
    status: 'in-progress',
    assignedTo: 'Events Committee',
    deadline: '2026-11-30',
    progress: 30,
  },
  {
    id: 'tk3',
    title: 'Scholarship Fund Collection',
    description: 'Reach the target of ₹5,00,000 for the 2026-27 scholarship fund through member donations and corporate sponsors.',
    status: 'in-progress',
    assignedTo: 'Treasurer & Finance Team',
    deadline: '2026-10-15',
    progress: 45,
  },
  {
    id: 'tk4',
    title: 'Alumni Database Digitization',
    description: 'Digitize all historical alumni records from paper registers into the digital database system.',
    status: 'pending',
    assignedTo: 'Records Committee',
    deadline: '2026-12-31',
    progress: 10,
  },
  {
    id: 'tk5',
    title: 'School Infrastructure Support Proposal',
    description: 'Prepare and submit a proposal to the school administration for alumni-funded infrastructure improvements, including library upgrades and lab equipment.',
    status: 'completed',
    assignedTo: 'Governing Body',
    deadline: '2026-07-30',
    progress: 100,
  },
];

export const defaultContactInfo = {
  email: 'contact@hcsalumni.org',
  phone: '+91 98765 43210',
  alternatePhone: '+91 87654 32109',
  address: 'Hooghly Collegiate School Campus, Station Road, Chinsurah, Hooghly, West Bengal - 712101',
  message: 'We welcome all former students, teachers, and well-wishers of Hooghly Collegiate School to get in touch. Whether you want to reconnect, contribute, or simply share your memories — we\'d love to hear from you.',
};

export const defaultSocialLinks = {
  facebook: 'https://facebook.com/hcsalumni',
  twitter: 'https://twitter.com/hcsalumni',
  instagram: 'https://instagram.com/hcsalumni',
  youtube: 'https://youtube.com/@hcsalumni',
  linkedin: 'https://linkedin.com/company/hcsalumni',
  whatsapp: 'https://wa.me/919876543210',
};

export const defaultSchoolHistory = {
  intro: 'Hooghly Collegiate School, located in the historic town of Chinsurah in Hooghly district, West Bengal, stands as one of the oldest and most prestigious educational institutions in the region. With a legacy spanning decades, the school has been a cradle of learning, shaping the minds and characters of countless students who have gone on to contribute significantly to society.',
  
  sections: [
    {
      id: 'sh1',
      title: 'A Legacy of Excellence',
      content: 'Founded with the noble vision of providing quality education to the youth of Hooghly, the school has upheld the highest standards of academic and moral education. The school\'s motto, "তমসো মা জ্যোতির্গময়" (From darkness, lead me to light), reflects its enduring commitment to illuminating young minds through knowledge and wisdom.\n\nOver the decades, the school has produced scholars, scientists, administrators, artists, and leaders who have made their mark across India and the world.',
    },
    {
      id: 'sh2',
      title: 'Tradition & Values',
      content: 'Hooghly Collegiate School has always been more than just an academic institution. It has been a place where values of discipline, integrity, respect, and service have been instilled in every student. The annual sports day, cultural festivals, and community service activities have been integral parts of the school\'s tradition.\n\nThe school assembly, with its prayers and moral teachings, continues to be a cherished daily ritual that binds generations of students in shared values.',
    },
    {
      id: 'sh3',
      title: 'Contribution to Education & Society',
      content: 'The school has consistently produced outstanding results in board examinations, with numerous students securing top ranks at the state and national levels. The dedicated faculty has always gone beyond the curriculum to nurture talent and encourage holistic development.\n\nMany alumni have become eminent educators themselves, carrying forward the school\'s tradition of excellence in teaching and mentorship.',
    },
    {
      id: 'sh4',
      title: 'Notable Achievements',
      content: 'Among the school\'s proudest achievements are its alumni who have served in the Indian Administrative Service, Indian Police Service, Indian Armed Forces, and various other prestigious services. The school has also produced renowned doctors, engineers, scientists, lawyers, artists, and entrepreneurs.\n\nThe school\'s cricket and football teams have won numerous inter-school championships, and its debate and quiz teams have consistently excelled in state-level competitions.',
    },
    {
      id: 'sh5',
      title: 'The Alumni Legacy',
      content: 'The Hooghly Collegiate School Alumni Association, registered in 2026, represents the collective gratitude and commitment of former students to give back to the institution that shaped them. Through scholarships, infrastructure support, mentorship programs, and cultural events, the alumni continue to strengthen the bond between past and present generations of Collegians.\n\nEvery alumnus carries with them the indelible spirit of HCS — a spirit of learning, camaraderie, and service that transcends time.',
    },
  ],
};

export const defaultMembershipInfo = {
  intro: 'The Hooghly Collegiate School Alumni Association welcomes all former students of Hooghly Collegiate School to become part of our growing community. As a member, you join a network of distinguished alumni committed to supporting the school and each other.',
  
  benefits: [
    {
      icon: 'network',
      title: 'Alumni Network',
      description: 'Connect with fellow alumni across professions, cities, and generations through our exclusive network.',
    },
    {
      icon: 'events',
      title: 'Exclusive Events',
      description: 'Access to annual reunions, cultural programs, workshops, and networking events organized by the association.',
    },
    {
      icon: 'mentorship',
      title: 'Mentorship',
      description: 'Opportunity to mentor current students and young alumni, or receive guidance from experienced seniors.',
    },
    {
      icon: 'scholarship',
      title: 'Scholarship Programs',
      description: 'Contribute to and benefit from scholarship funds supporting meritorious students from the school.',
    },
    {
      icon: 'directory',
      title: 'Members Directory',
      description: 'Access the alumni directory to find and reconnect with former classmates and teachers.',
    },
    {
      icon: 'recognition',
      title: 'Recognition',
      description: 'Be recognized for your achievements and contributions through the association\'s publications and events.',
    },
  ],
  
  eligibility: [
    'Must be a former student of Hooghly Collegiate School, Chinsurah.',
    'Must have completed at least one academic year at the school.',
    'Must agree to abide by the association\'s constitution and code of conduct.',
    'Membership is subject to verification and approval by the governing body.',
  ],
};

export const defaultSiteConfig = {
  heroTitle: 'Hooghly Collegiate School Alumni Association',
  heroSubtitle: 'তমসো মা জ্যোতির্গময় — From darkness, lead me to light',
  joinButtonText: 'Join Us',
  leadershipButtonText: 'Association Leadership',
  slogan: 'United by Legacy, Bound by Brotherhood',
  footerText: '© {year} Hooghly Collegiate School Alumni Association. All rights reserved.',
};
