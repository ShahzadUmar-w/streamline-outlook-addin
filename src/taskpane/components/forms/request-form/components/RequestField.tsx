import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { RequestFieldDefinition } from "../types/RequestForm.types";

interface RequestFieldProps {
  field: RequestFieldDefinition;
  value: any;
  onInputChange: (name: string, value: any) => void;
  onCheckboxChange: (fieldName: string, option: string) => void;
}

const RequestField = ({ field, value, onInputChange, onCheckboxChange }: RequestFieldProps) => {
  const fieldValue =
    field.type === "checkbox"
      ? ((value as string[]) || [])
      : value ?? "";

  if (field.type === "note") {
    return <Alert severity="warning">{field.info}</Alert>;
  }

  if (field.type === "select") {
    return (
      <FormControl fullWidth size="small" required={field.required}>
        <InputLabel>{field.label}</InputLabel>
        <Select
          value={fieldValue}
          label={field.label}
          onChange={(event) => onInputChange(field.name, event.target.value)}
        >
          {field.options?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  if (field.type === "checkbox") {
    return (
      <Box>
        <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: "block" }}>
          {field.label} {field.required && "*"}
        </Typography>
        <FormGroup>
          {field.options?.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Checkbox
                  size="small"
                  checked={(fieldValue as string[]).includes(option)}
                  onChange={() => onCheckboxChange(field.name, option)}
                />
              }
              label={<Typography variant="body2">{option}</Typography>}
            />
          ))}
        </FormGroup>
      </Box>
    );
  }

  return (
    <TextField
      label={field.label}
      fullWidth
      size="small"
      required={field.required}
      multiline={field.type === "textarea"}
      rows={field.type === "textarea" ? 3 : 1}
      value={fieldValue}
      onChange={(event) => onInputChange(field.name, event.target.value)}
      placeholder={field.placeholder}
    />
  );
};

export default RequestField;
