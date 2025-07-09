---
questions:
  - id: 1
    name: "website_type" # never ever change it.
    question: "I'm planning to create <COMPONENT> website with your theme."
    options:
      - label: "Business"
        value: "business"
      - label: "Personal"
        value: "personal"
      - label: "Portfolio"
        value: "portfolio"
      - label: "Blog"
        value: "blog"
      - label: "Documentation"
        value: "documentation"
      - label: "Landing page"
        value: "landing-page"
      - label: "Resume/Cv"
        value: "resume"
      - label: "Not sure/other"
        value: "other"

  - id: 2
    name: "profession" # never ever change it.
    question: "I am a"
    options:
      - label: "Founder/CEO"
        value: "founder"
      - label: "Project Manager"
        value: "project-manager"
      - label: "C-Level/Vp/Director"
        value: "director"
      - label: "Developer"
        value: "developer"
      - label: "Marketer"
        value: "marketer"
      - label: "Designer"
        value: "designer"
      - label: "It Staff"
        value: "it-staff"
      - label: "Student"
        value: "student"
      - label: "Engineer"
        value: "engineer"
      - label: "Other"
        value: "other"

  - id: 3
    name: "company_size" # never ever change it.
    question: "My company size is"
    exclude: ["portfolio", "resume/cv", "blog", "personal"]
    options:
      - label: "Only Me"
        value: "only-me"
      - label: "1-5"
        value: "1-5"
      - label: "5-10"
        value: "5-10"
      - label: "10-20"
        value: "10-20"
      - label: "20-30"
        value: "20-30"
      - label: "30+"
        value: "30+"

  - id: 4
    name: "website_for" # never ever change it.
    question: "I want to create website for"
    options:
      - label: "Myself"
        value: "myself"
      - label: "My Company"
        value: "company"
      - label: "My Clients"
        value: "clients"

  - id: 5
    name: "service_need"
    question: "I’ll build the site by"
    options:
      - label: Myself
        value: myself
      - label: My team
        value: team
      - label: Freelancer/agency
        value: freelancer
      - label: Not sure yet
        value: not-sure

  - id: 6
    name: "purchase_reason"
    question: "I purchase from here because of"
    options:
      - label: Design Quality
        value: design
      - label: Code Quality
        value: code
      - label: Huge resources
        value: huge-resources
      - label: Affordable pricing
        value: affordable-pricing

  - id: 7
    name: "channel"
    question: "I found Themefisher via"
    options:
      - label: "Search Engine" 
        value: "search"
      - label: "Statichunt"
        value: "statichunt"
      - label: "Github"
        value: "github"
      - label: "Astro Website"
        value: "astro-website"
      - label: "Gohugo Website"
        value: "hugo-website"  
      - label: "Social Media"
        value: "social-media"
      - label: "Colleagues/Friends"
        value: "friends"
      - label: "Blog Post Or Review On A Website"
        value: "blog"
      - label: "Email"
        value: "email"
      - label: "Other"
        value: "other"

  - id: 8
    name: "website" # never ever change it.
    question: "My domain name"
    field: "input"
    type: "text"
---
