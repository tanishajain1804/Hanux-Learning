export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  avatarUrl?: string;
}

export const testimonialData: TestimonialItem[] = [
  {
    id: "t1",
    name: "Aarav Sharma",
    role: "VP of Engineering",
    company: "Brolight Productions",
    feedback: "Hanux Tech built our asset pipeline inside three months. Their engineering standards are second to none in the digital space."
  },
  {
    id: "t2",
    name: "Priya Patel",
    role: "Product Owner",
    company: "Himalayan Discoveries",
    feedback: "The website designed by Hanux Tech boosted our conversions by 35%. Highly recommended for custom CRM and web development."
  }
];
