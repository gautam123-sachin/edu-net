export const courseCategory = [
    { label: 'Choose your category', value: '' }, 
    { label: 'Web Development', value: 'web_development' },
    { label: 'Mobile App Development', value: 'mobile_app_development' },
    { label: 'Data Science', value: 'data_science' },
    { label: 'UI/UX Design', value: 'ui_ux_design' },
    { label: 'Digital Marketing', value: 'digital_marketing' }
];

export const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...'; // Add ellipsis if truncated
    } else {
        return text;
    }
};

export function generateReferralCode() {
    // Generate a random alphanumeric string
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let referralCode = '';
    for (let i = 0; i < 8; i++) {
      referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return referralCode;
  }

  export const staticInstructors = [
    {
      id: '1',
      imageSrc: 'team-1.jpg',
      name: 'John Doe',
      designation: 'Web Development Expert',
      socialMediaLinks: [
        'https://www.facebook.com/johndoe',
        'https://www.twitter.com/johndoe',
        'https://www.instagram.com/johndoe'
      ]
    },
    {
      id: '2',
      imageSrc: 'team-2.jpg',
      name: 'Jane Smith',
      designation: 'Graphic Design Specialist',
      socialMediaLinks: [
        'https://www.facebook.com/janesmith',
        'https://www.twitter.com/janesmith',
        'https://www.instagram.com/janesmith'
      ]
    },
    {
      id: '3',
      imageSrc: 'team-3.jpg',
      name: 'Adam Johnson',
      designation: 'Digital Marketing Guru',
      socialMediaLinks: [
        'https://www.facebook.com/adamjohnson',
        'https://www.twitter.com/adamjohnson',
        'https://www.instagram.com/adamjohnson'
      ]
    },
    {
      id: '4',
      imageSrc: 'team-4.jpg',
      name: 'Emily Wilson',
      designation: 'Video Editor Expert',
      socialMediaLinks: [
        'https://www.facebook.com/emilywilson',
        'https://www.twitter.com/emilywilson',
        'https://www.instagram.com/emilywilson'
      ]
    }
  ];
  
  export const courses = [
    {
      id: 1,
      imageSrc: 'course-1.jpg',
      price: 149.00,
      rating: 5,
      title: 'Web Design & Development Course for Beginners',
      instructor: 'John Doe',
      duration: '1.49 Hrs',
      studentCount: 30
    },
    {
      id: 2,
      imageSrc: 'course-2.jpg',
      price: 149.00,
      rating: 5,
      title: 'Web Design & Development Course for Beginners',
      instructor: 'John Doe',
      duration: '1.49 Hrs',
      studentCount: 30
    },
    {
      id: 3,
      imageSrc: 'course-3.jpg',
      price: 149.00,
      rating: 5,
      title: 'Web Design & Development Course for Beginners',
      instructor: 'John Doe',
      duration: '1.49 Hrs',
      studentCount: 30
    }
  ];
  
 export const categories = [
    {
      "id": "1",
      "title": "Web Design",
      "imageSrc": "cat-1.jpg",
      "courseCount": 49
    },
    {
      "id": "2",
      "title": "Graphic Design",
      "imageSrc": "cat-2.jpg",
      "courseCount": 32
    },
    {
      "id": "3",
      "title": "Video Editing",
      "imageSrc": "cat-3.jpg",
      "courseCount": 27
    },
    {
      "id": "4",
      "title": "Online Marketing",
      "imageSrc": "cat-4.jpg",
      "courseCount": 56
    }
  ];

  export const testimonials = [
    {
        "id": "1",
        "name": "Rahul Sharma",
        "profession": "Web Developer",
        "testimonial": "One place together with Learning with Earning is an amazing platform. It helped me learn new skills and earn money at the same time. Highly recommended!",
        "imageSrc": "team-1.jpg"
    },
    {
        "id": "2",
        "name": "Priya Patel",
        "profession": "Graphic Designer",
        "testimonial": "I absolutely love One place together with Learning with Earning! The courses are well-structured, the instructors are knowledgeable, and the platform is easy to navigate.",
        "imageSrc": "team-2.jpg"
    },
    {
        "id": "3",
        "name": "Amit Kumar",
        "profession": "Software Engineer",
        "testimonial": "As a software engineer, I'm always looking to expand my skillset. One place together with Learning with Earning provided me with the perfect opportunity to do so. Great platform!",
        "imageSrc": "team-3.jpg"
    },
    {
        "id": "4",
        "name": "Ananya Gupta",
        "profession": "Marketing Coordinator",
        "testimonial": "Learning with Earning has been a game-changer for me. Not only did I acquire new skills, but I also earned rewards for my achievements. Couldn't be happier!",
        "imageSrc": "team-4.jpg"
    }
];
