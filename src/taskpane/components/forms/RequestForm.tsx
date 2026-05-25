import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  IconButton,
  Paper,
  Alert,
  LinearProgress,
  Stack,
  Container
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
  Description as DescriptionIcon,
  CheckCircleOutlined as SuccessIcon,
  InfoOutlined as InfoIcon,
  Gavel as GavelIcon
} from "@mui/icons-material";

import { insertText } from "../../taskpane";
import { requestForms, RequestType, requestTypes } from "./RequestDefinitions";

// Professional Styles
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    bgcolor: "#f8f9fa",
  },
  header: {
    p: 2,
    bgcolor: "#001F3F", // XiFin dark blue
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  main: {
    flexGrow: 1,
    overflowY: "auto",
    p: 2,
    pb: 10, // Footer space
  },
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    p: 2,
    bgcolor: "white",
    borderTop: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "space-between",
    zIndex: 1000,
  },
  typeCard: {
    mb: 2,
    transition: "0.3s",
    "&:hover": { boxShadow: 4 },
  }
};

const RequestForm = () => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<RequestType | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

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
      ? currentValues.filter((v) => v !== option)
      : [...currentValues, option];
    setFormData((prev) => ({ ...prev, [fieldName]: newValues }));
  };

  const currentForm = selectedType ? requestForms[selectedType] : null;

  // Filter active fields based on logic in Definitions
  const activeFields = useMemo(() => {
    if (!currentForm) return [];
    return currentForm.fields.filter(
      (field) => !field.conditional || field.conditional(formData)
    );
  }, [currentForm, formData]);

  // Validation
  const isFormValid = useMemo(() => {
    return activeFields.every((field) => {
      if (!field.required) return true;
      const val = formData[field.name];
      if (Array.isArray(val)) return val.length > 0;
      return val !== undefined && val !== "";
    });
  }, [activeFields, formData]);

 const generateEmail = async () => {
  // Styles for the HTML Email
  const tableStyle = 'width: 100%; border-collapse: collapse; font-family: "Segoe UI", Helvetica, Arial, sans-serif;';
  const headerStyle = 'background-color: #001F3F; color: #ffffff; padding: 15px; text-align: left; border-radius: 8px 8px 0 0;';
  const labelStyle = 'padding: 10px; border-bottom: 1px solid #f0f0f0; color: #666666; font-size: 12px; width: 30%; text-transform: uppercase; font-weight: bold;';
  const valueStyle = 'padding: 10px; border-bottom: 1px solid #f0f0f0; color: #333333; font-size: 14px;';
  const sectionGap = 'height: 20px;';

  // Build Table Rows
  const rows = activeFields
    .filter(field => field.type !== "note") // Exclude direction notes from final email
    .map(field => {
      const val = formData[field.name];
      const displayValue = Array.isArray(val) ? val.join(", ") : (val || "---");
      
      return `
        <tr>
          <td style="${labelStyle}">${field.label}</td>
          <td style="${valueStyle}">${displayValue}</td>
        </tr>
      `;
    })
    .join("");

  // Final HTML Wrapper
  const htmlContent = `
    <div style="max-width: 600px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <div style="${headerStyle}">
        <h2 style="margin: 0; font-size: 18px;">Legal Request: ${selectedType}</h2>
        <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.8;">Submitted on: ${new Date().toLocaleString()}</p>
      </div>
      <table style="${tableStyle}">
        <tbody>
          ${rows}
        </tbody>
      </table>
      <div style="padding: 15px; background-color: #f9f9f9; border-radius: 0 0 8px 8px;">
        <p style="margin: 0; font-size: 11px; color: #999;">
          Please review the attached documents if mentioned in the fields above.
        </p>
      </div>
    </div>
    <br/>
    <p style="color: #666; font-style: italic;">[Please attach any relevant files to this email before sending]</p>
  `;

  // Use Office.js to insert as HTML
  try {
    await Office.context.mailbox.item.setSelectedDataAsync(
      htmlContent,
      { coercionType: Office.CoercionType.Html },
      (asyncResult) => {
        if (asyncResult.status === Office.AsyncResultStatus.Failed) {
          console.error(asyncResult.error.message);
        } else {
          setStep(3);
        }
      }
    );
  } catch (error) {
    console.error("Error inserting HTML:", error);
  }
};

  return (
    <Box sx={styles.container}>
      {/* HEADER */}
      <Box sx={styles.header}>
        {step > 1 && (
          <IconButton onClick={() => setStep(1)} size="small" sx={{ color: "white" }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="subtitle1" >
          {step === 1 ? "Streamline" : selectedType}
        </Typography>
      </Box>

      {/* PROGRESS BAR */}
      <LinearProgress 
        variant="determinate" 
        value={step === 1 ? 33 : step === 2 ? 66 : 100} 
        sx={{ height: 4 }}
      />

      <Box sx={styles.main}>
        {/* STEP 1: SELECT TYPE */}
        {step === 1 && (
          <Stack spacing={2}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Select the type of request to continue:
            </Typography>
            {requestTypes.map((type) => (
              <Card key={type} variant="outlined" sx={styles.typeCard}>
                <CardActionArea onClick={() => handleSelectType(type)}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <DescriptionIcon color="primary" />
                    <Typography variant="body1" >{type}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        )}

        {/* STEP 2: FORM */}
        {step === 2 && currentForm && (
          <Stack spacing={3}>
            <Alert severity="info" icon={<InfoIcon fontSize="inherit" />}>
              {currentForm.description}
            </Alert>

            {activeFields.map((field) => {
              const val = formData[field.name] || "";

              if (field.type === "note") {
                return (
                  <Alert severity="warning" key={field.name} variant="outlined">
                    {field.info}
                  </Alert>
                );
              }

              if (field.type === "select") {
                return (
                  <FormControl fullWidth key={field.name} size="small" required={field.required}>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      value={val}
                      label={field.label}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                    >
                      {field.options?.map((opt:any) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              }

              if (field.type === "checkbox") {
                return (
                  <Box key={field.name}>
                    <Typography variant="caption" color="textSecondary" >
                      {field.label} {field.required && "*"}
                    </Typography>
                    <FormGroup>
                      {field.options?.map((opt:any) => (
                        <FormControlLabel
                          key={opt}
                          control={
                            <Checkbox 
                              size="small"
                              checked={((formData[field.name] as string[]) || []).includes(opt)}
                              onChange={() => handleCheckboxChange(field.name, opt)}
                            />
                          }
                          label={<Typography variant="body2">{opt}</Typography>}
                        />
                      ))}
                    </FormGroup>
                  </Box>
                );
              }

              return (
                <TextField
                  key={field.name}
                  label={field.label}
                  fullWidth
                  size="small"
                  required={field.required}
                  multiline={field.type === "textarea"}
                  rows={field.type === "textarea" ? 3 : 1}
                  value={val}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                />
              );
            })}
          </Stack>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 3 && (
          <Container sx={{ textAlign: 'center', mt: 4 }}>
            <SuccessIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>Request Prepared!</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
              The form data has been inserted into your email. Please review and click Send in Outlook.
            </Typography>
            <Button 
              variant="contained" 
              fullWidth 
              onClick={() => setStep(1)}
              sx={{ bgcolor: "#001F3F" }}
            >
              Start New Request
            </Button>
          </Container>
        )}
      </Box>

      {/* STICKY FOOTER */}
      {step === 2 && (
        <Paper sx={styles.footer} elevation={3}>
          <Button variant="outlined" onClick={() => setStep(1)} size="small">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
            disabled={!isFormValid}
            onClick={generateEmail}
            size="small"
            sx={{ bgcolor: "#001F3F" }}
          >
            Generate Email
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default RequestForm;