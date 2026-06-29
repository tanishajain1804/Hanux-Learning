export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "q1",
    question: "What custom development services do you provide?",
    answer: "We design and build custom web applications, native and cross-platform mobile apps (iOS & Android), custom CRM systems, ERP systems, and cloud integration architectures."
  },
  {
    id: "q2",
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, we provide flexible support agreements covering server upgrades, security patches, bug fixes, feature expansion, and 24/7 technical monitoring."
  },
  {
    id: "q3",
    question: "How long does a typical software project take?",
    answer: "A standard landing page or website design takes 2-4 weeks, whereas complex SaaS or customized CRM/ERP solutions may range from 2 to 6 months depending on requirements."
  }
];
