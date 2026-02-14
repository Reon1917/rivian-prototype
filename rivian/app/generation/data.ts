import { BlueprintQuestion, FormatBlueprint } from "./types";

export const formatOptions: FormatBlueprint[] = [
  {
    id: "format-prototype",
    name: "Genetics Midterm Template",
    description:
      "Full cover sheet with structured sections ready for automated generation.",
    savedAt: "2 days ago",
    status: "Active",
    layout: {
      headerLines: [
        "XYZ University",
        "School of Magic",
        "Department of Magical Food",
        "Final Written Examination (1/2025)",
        "Undergraduate Program",
      ],
      metadata: [
        { label: "Course title", value: "ABC1234" },
        { label: "Lecturer", value: "Harry Potter" },
        { label: "Date", value: "10 June 2025" },
        { label: "Time", value: "09:00 AM - 12:00 PM" },
      ],
      instructionIntro:
        "This 6-page examination paper (including this page) consists of 2 parts:",
      instructions: [
        {
          text: "Answer the questions in the computerized answer sheet using '2B' pencil only.",
          emphasis: "normal",
        },
        {
          text: "Write your ID, name, and section number on the computerized answer sheet.",
          emphasis: "underline",
        },
        {
          text:
            "Do not forget to blacken your ID, subject code, and your section number on the answer sheet.",
          emphasis: "bold",
        },
        {
          text:
            "Avoid academic cheating by not taking any part of the exam paper out of the examination room.",
          emphasis: "normal",
        },
      ],
      candidateFields: [
        "Name: _________________________________",
        "ID: _____________________",
        "Section: ______________",
      ],
      footerNotes: ["Total 18 marks equivalent to 100%"],
    },
    sections: [
      {
        name: "Section A: Multiple Choice",
        questionType: "Multiple Choice",
        questions: 30,
        difficulty: "Foundational",
        category: "Foundations",
      },
      {
        name: "Section B: Short Answers",
        questionType: "Short Answer",
        questions: 15,
        difficulty: "Core",
        category: "Processes",
      },
      {
        name: "Section C: Essay",
        questionType: "Long Form",
        questions: 3,
        difficulty: "Applied",
        category: "Synthesis",
      },
    ],
    generationSettings: [
      { label: "Questions to generate", value: "15" },
      { label: "Difficulty mix", value: "40% Easy · 40% Medium · 20% Hard" },
      { label: "Bloom levels", value: "Remember · Apply · Analyze" },
      { label: "Language", value: "English (US)" },
    ],
  },
  {
    id: "format-drafting",
    name: "Econometrics Final v1",
    description:
      "Draft pulled from last semester. Needs instruction rewrite before export.",
    savedAt: "5 days ago",
    status: "Draft",
    layout: {
      headerLines: [
        "Evergreen University",
        "Faculty of Economics",
        "Econometrics Final Examination",
        "Semester 1 / 2025",
        "Undergraduate Program",
      ],
      metadata: [
        { label: "Course title", value: "ECON3421" },
        { label: "Lecturer", value: "Prof. Linh Tran" },
        { label: "Date", value: "24 May 2025" },
        { label: "Location", value: "Hall B" },
      ],
      instructionIntro:
        "This assessment includes both structured response and analytical essays:",
      instructions: [
        {
          text: "Show full working for each quantitative answer.",
          emphasis: "bold",
        },
        {
          text: "Round numerical responses to two decimal places unless specified.",
          emphasis: "normal",
        },
        {
          text: "Submit all rough work with your script before leaving the room.",
          emphasis: "underline",
        },
      ],
      candidateFields: [
        "Candidate name: _________________________________",
        "Student ID: _____________________",
        "Program: ______________",
      ],
      footerNotes: ["Calculator policy: Non-programmable only."],
    },
    sections: [
      {
        name: "Part I: Multiple Choice",
        questionType: "Multiple Choice",
        questions: 25,
        difficulty: "Core",
        category: "Micro foundations",
      },
      {
        name: "Part II: Short Problems",
        questionType: "Short Answer",
        questions: 10,
        difficulty: "Core",
        category: "Regression diagnostics",
      },
      {
        name: "Part III: Essays",
        questionType: "Long Form",
        questions: 2,
        difficulty: "Applied",
        category: "Policy analysis",
      },
      {
        name: "Appendix: Data Interpretation",
        questionType: "Short Answer",
        questions: 5,
        difficulty: "Foundational",
        category: "Descriptive statistics",
      },
    ],
    generationSettings: [
      { label: "Questions to generate", value: "18" },
      {
        label: "Difficulty mix",
        value: "30% Easy · 50% Medium · 20% Hard",
      },
      {
        label: "Focus topics",
        value: "Instrumental variables · Time series",
      },
      { label: "Language", value: "English (UK)" },
    ],
  },
  {
    id: "format-template",
    name: "Blank University Cover Sheet",
    description: "Starter format with placeholder headings and empty sections.",
    savedAt: "1 week ago",
    status: "Template",
    layout: {
      headerLines: [
        "[Institution Name]",
        "[Faculty or Department]",
        "[Assessment Title]",
        "[Term / Academic Year]",
      ],
      metadata: [
        { label: "Course title", value: "[Course code]" },
        { label: "Lecturer", value: "[Instructor name]" },
        { label: "Date", value: "[DD Month YYYY]" },
        { label: "Duration", value: "[Exam duration]" },
      ],
      instructionIntro:
        "Use this template to define your institution-specific instructions:",
      instructions: [
        {
          text: "Replace placeholder text with institution-approved instructions.",
          emphasis: "normal",
        },
        {
          text: "List the materials candidates may bring into the exam room.",
          emphasis: "normal",
        },
      ],
      candidateFields: [
        "Name: _________________________________",
        "ID: _____________________",
      ],
      footerNotes: [],
    },
    sections: [
      {
        name: "Section placeholder",
        questionType: "Multiple Choice",
        questions: 10,
        difficulty: "Foundational",
        category: "[Topic]",
      },
      {
        name: "Section placeholder",
        questionType: "Short Answer",
        questions: 5,
        difficulty: "Core",
        category: "[Topic]",
      },
    ],
    generationSettings: [
      { label: "Questions to generate", value: "Custom" },
      { label: "Difficulty mix", value: "Define per section" },
      { label: "Bloom levels", value: "Define per section" },
      { label: "Language", value: "Configure in builder" },
    ],
  },
];

export const questionPresets: Record<string, BlueprintQuestion[]> = {
  "format-prototype": [
    {
      id: "q-proto-1",
      section: "Section A: Multiple Choice",
      prompt: "Which process best explains independent assortment during meiosis?",
      type: "Multiple Choice",
      difficulty: "Foundational",
      options: [
        { label: "Crossing over between non-sister chromatids in prophase I", correct: false },
        { label: "Random alignment of homologous chromosome pairs in metaphase I", correct: true },
        { label: "Separation of sister chromatids in anaphase II", correct: false },
        { label: "Cytokinesis at the end of meiosis II", correct: false },
      ],
      answer: "Random alignment of homologous chromosome pairs in metaphase I",
    },
    {
      id: "q-proto-2",
      section: "Section A: Multiple Choice",
      prompt: "Identify the stage where homologous chromosomes separate.",
      type: "Multiple Choice",
      difficulty: "Core",
      options: [
        { label: "Prophase I", correct: false },
        { label: "Metaphase I", correct: false },
        { label: "Anaphase I", correct: true },
        { label: "Anaphase II", correct: false },
      ],
      answer: "Anaphase I",
    },
    {
      id: "q-proto-3",
      section: "Section B: Short Answers",
      prompt: "Explain how crossing over increases genetic variation.",
      type: "Short Answer",
      difficulty: "Core",
      keywords: [
        "Exchange of chromatid segments",
        "New allele combinations",
        "Prophase I",
      ],
    },
    {
      id: "q-proto-4",
      section: "Section B: Short Answers",
      prompt: "Describe one consequence of nondisjunction.",
      type: "Short Answer",
      difficulty: "Applied",
      keywords: [
        "Aneuploidy",
        "Trisomy or monosomy",
        "Improper chromosome separation",
      ],
    },
    {
      id: "q-proto-5",
      section: "Section C: Essay",
      prompt: "Compare and contrast meiosis I and meiosis II in terms of chromosome behavior.",
      type: "Long Form",
      difficulty: "Applied",
      keywords: [
        "Homologous vs sister chromatids",
        "Reductional vs equational division",
        "Genetic variation mechanisms",
      ],
    },
    {
      id: "q-proto-6",
      section: "Section A: Multiple Choice",
      prompt: "identify one benefit of genetic recombination  during meiosis",
      type: "Multiple Choice",
      difficulty: "Foundational",
      options: [
        { label: "It reduces the chromosome number to haploid", correct: false },
        { label: "It produces identical daughter cells", correct: false },
        { label: "It increases allele variety among gametes", correct: true },
        { label: "It prevents all mutations", correct: false },
      ],
      answer: "It increases allele variety among gametes",
    },
    {
      id: "q-proto-7",
      section: "Section B: Short Answers",
      prompt: "Explain how crossing-over increases genetic variation in gametes.",
      type: "Short Answer",
      difficulty: "Core",
      keywords: [
        "Exchange of chromatid segments",
        "New allele combinations",
        "Prophase I",
      ],
    },
    {
      id: "q-proto-8",
      section: "Section B: Short Answers",
      prompt: "Explain how crossing over increases genetic variation",
      type: "Short Answer",
      difficulty: "Core",
      keywords: [
        "Exchange of chromatid segments",
        "New allele combinations",
        "Prophase I",
      ],
    },
  ],
  "format-drafting": [
    {
      id: "q-draft-1",
      section: "Part I: Multiple Choice",
      prompt: "Which estimator is unbiased for the population mean given iid samples?",
      type: "Multiple Choice",
      difficulty: "Foundational",
    },
    {
      id: "q-draft-2",
      section: "Part II: Short Problems",
      prompt: "Compute the R-squared value for the provided regression output.",
      type: "Short Answer",
      difficulty: "Core",
    },
    {
      id: "q-draft-3",
      section: "Part III: Essays",
      prompt: "Evaluate the policy implications of simultaneous equations bias.",
      type: "Long Form",
      difficulty: "Applied",
    },
    {
      id: "q-draft-4",
      section: "Appendix: Data Interpretation",
      prompt: "Given the dataset, identify evidence of heteroskedasticity.",
      type: "Short Answer",
      difficulty: "Core",
    },
  ],
  "format-template": [
    {
      id: "q-template-1",
      section: "Section placeholder",
      prompt: "Replace this placeholder with a question from your bank.",
      type: "Multiple Choice",
      difficulty: "Foundational",
    },
    {
      id: "q-template-2",
      section: "Section placeholder",
      prompt: "Add another placeholder question here.",
      type: "Short Answer",
      difficulty: "Core",
    },
  ],
};
