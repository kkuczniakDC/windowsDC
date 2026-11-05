export type ConsultationFormFields = {
  name: string;
  practice: string;
  email: string;
  location: string;
  projectStage: string;
  message: string;
  consent: boolean;
};

export const emptyConsultationFormFields: ConsultationFormFields = {
  name: "",
  practice: "",
  email: "",
  location: "",
  projectStage: "",
  message: "",
  consent: false,
};

export type ConsultationFormState = {
  status: "idle" | "success" | "error";
  formInstanceKey: number;
  fields?: ConsultationFormFields;
  message?: string;
  fieldErrors?: Partial<
    Record<
      | "name"
      | "practice"
      | "email"
      | "location"
      | "projectStage"
      | "message"
      | "consent",
      string
    >
  >;
};

export const initialConsultationFormState: ConsultationFormState = {
  status: "idle",
  formInstanceKey: 0,
};
