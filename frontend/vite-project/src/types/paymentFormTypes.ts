export interface PaymentFormTypes {
    cardholderName: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
    cvc: string;
    saveCard: boolean;
}

export type StringKeys = Exclude<keyof PaymentFormTypes, "saveCard">;

export type ValidationRule = [
    StringKeys,
    (value: string) => boolean,
    string
];

export interface PaymentState { 
    formData: PaymentFormTypes;
    setFormData: (data: PaymentFormTypes) => void;
    updateFormField: <K extends keyof PaymentFormTypes>(
        key: K,
        value: PaymentFormTypes[K]
    ) => void;
  }