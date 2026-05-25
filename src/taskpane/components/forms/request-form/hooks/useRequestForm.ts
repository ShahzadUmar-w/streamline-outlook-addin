import { useMemo, useState } from "react";
import { requestForms } from "../data/RequestDefinitions";
import { buildRequestEmailHtml } from "../utils/emailBuilder";
import { RequestFieldDefinition, RequestType } from "../types/RequestForm.types";

export const useRequestForm = () => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<RequestType | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const currentForm = selectedType ? requestForms[selectedType] : null;

  const activeFields = useMemo<RequestFieldDefinition[]>(() => {
    if (!currentForm) return [];
    return currentForm.fields.filter(
      (field) => !field.conditional || field.conditional(formData)
    );
  }, [currentForm, formData]);

  const handleSelectType = (type: RequestType) => {
    setSelectedType(type);
    setFormData({});
    setStep(2);
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (fieldName: string, option: string) => {
    const currentValues = (formData[fieldName] as string[]) || [];
    const newValues = currentValues.includes(option)
      ? currentValues.filter((value) => value !== option)
      : [...currentValues, option];

    setFormData((prev) => ({ ...prev, [fieldName]: newValues }));
  };

  const isFormValid = useMemo(() => {
    return activeFields.every((field) => {
      if (!field.required) return true;
      const value = formData[field.name];
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== null && value !== "";
    });
  }, [activeFields, formData]);

const generateEmail = async () => {
  if (!selectedType) return;

  const htmlContent = buildRequestEmailHtml(
    selectedType,
    activeFields,
    formData
  );

  try {
    // Optional: subject bhi set kar sakty ho
    Office.context.mailbox.item.subject.setAsync(
      `${selectedType} Request`
    );

    // Whole body me HTML insert karega
    Office.context.mailbox.item.body.setAsync(
      htmlContent,
      {
        coercionType: Office.CoercionType.Html,
      },
      (asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
          console.error("Body insert failed:", asyncResult.error.message);
        } else {
          setStep(3);
        }
      }
    );
  } catch (error) {
    console.error("Error generating email:", error);
  }
};

  return {
    step,
    currentForm,
    selectedType,
    formData,
    activeFields,
    isFormValid,
    setStep,
    handleSelectType,
    handleInputChange,
    handleCheckboxChange,
    generateEmail,
  };
};
