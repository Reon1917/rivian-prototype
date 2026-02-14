export type InstructionEmphasis = "normal" | "bold" | "underline";

export type InstructionItem = {
  text: string;
  emphasis: InstructionEmphasis;
};

export type MetadataRow = {
  label: string;
  value: string;
};

export type FirstPageLayout = {
  headerLines: string[];
  metadata: MetadataRow[];
  instructionIntro: string;
  instructions: InstructionItem[];
  candidateFields: string[];
  footerNotes: string[];
};

export type SectionBlueprint = {
  name: string;
  questionType: string;
  questions: number;
  difficulty: string;
  category: string;
};

export type GenerationSetting = {
  label: string;
  value: string;
};

export type FormatBlueprint = {
  id: string;
  name: string;
  description: string;
  savedAt: string;
  status: "Active" | "Draft" | "Template";
  layout: FirstPageLayout;
  sections: SectionBlueprint[];
  generationSettings: GenerationSetting[];
};

export type BlueprintQuestion = {
  id: string;
  section: string;
  prompt: string;
  type: string;
  difficulty: string;
  locked?: boolean;
  options?: Array<{
    label: string;
    correct: boolean;
  }>;
  answer?: string;
  keywords?: string[];
};
