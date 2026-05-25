import React from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
  Description as DescriptionIcon,
  CheckCircleOutlined as SuccessIcon,
  InfoOutlined as InfoIcon,
} from "@mui/icons-material";
import { requestTypes } from "../data/RequestDefinitions";
import RequestField from "./RequestField";
import { useRequestForm } from "../hooks/useRequestForm";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styles } from "../style/style";

// Map each request type to the appropriate asset image
const typeIconMap = {
  "General Legal Request": require("../../../../../../assets/legal.png"),
  "Vendor Contract Request": require("../../../../../../assets/vendor.png"),
  "Sales Contract Request": require("../../../../../../assets/sales.png"),
  "NDA": require("../../../../../../assets/nda.png"),
  "Privacy / AI Matters": require("../../../../../../assets/privacy.png"),
  "Business Development Request": require("../../../../../../assets/business.png"),
};

const RequestForm = () => {
  const {
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
  } = useRequestForm();

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        {step > 1 && (
          <IconButton onClick={() => setStep(1)} size="small" sx={{ color: "white" }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <img src={require('../../../../../../assets/icon-64.png')} width={42} alt="" />
        <Typography variant="subtitle1">
          {step === 1 ? "Choose Category" : selectedType}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={step === 1 ? 33 : step === 2 ? 66 : 100}
        color="inherit"
        sx={{ height: 4 }}
      />

      <Box sx={styles.main}>
       {/* {step === 1 && (
  <Stack spacing={2}>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      Select the type of request to continue:
    </Typography>
    {requestTypes.map((type) => (
      <Card
        key={type}
        variant="outlined"
        sx={{
          mb: 2,
          transition: "0.3s",
          "&:hover": { boxShadow: 4 },
          "&:hover .arrow-icon": { opacity: 1, transform: "translateX(0)" },
        }}
      >
        <CardActionArea onClick={() => handleSelectType(type)}>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <DescriptionIcon color="primary" />
              <Typography variant="body1" sx={{fontSize:'14px'}}>{type}</Typography>
            </Box>
            <ArrowForwardIcon
              className="arrow-icon"
              sx={{
                opacity: 0,
                transform: "translateX(-8px)",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                fontSize: 20,
                color: "primary.main",
              }}
            />
          </CardContent>
        </CardActionArea>
      </Card>
    ))}
  </Stack>
)} */}
{step === 1 && (
  <Stack spacing={2}>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      Select the type of request to continue:
    </Typography>
    {requestTypes.map((type) => (
      <Card
        key={type}
        variant="outlined"
        sx={{
          mb: 2,
          transition: "0.3s",
          "&:hover": { boxShadow: 4 },
          "&:hover .arrow-icon": { opacity: 1, transform: "translateX(0)" },
        }}
      >
        <CardActionArea onClick={() => handleSelectType(type)}>
          <CardContent
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* Use custom image instead of DescriptionIcon */}
              <img
                src={typeIconMap[type]}
                alt=""
                width={24}
                height={24}
                style={{ objectFit: "contain" }}
              />
              <Typography variant="body1" sx={{ fontSize: "14px" }}>
                {type}
              </Typography>
            </Box>
            <ArrowForwardIcon
              className="arrow-icon"
              sx={{
                opacity: 0,
                transform: "translateX(-8px)",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                fontSize: 20,
                color: "primary.main",
              }}
            />
          </CardContent>
        </CardActionArea>
      </Card>
    ))}
  </Stack>
)}

        {step === 2 && currentForm && (
          <Stack spacing={3}>
            <Alert severity="info" icon={<InfoIcon fontSize="inherit" />}>
              {currentForm.description}
            </Alert>

            {activeFields.map((field) => (
              <RequestField
                key={field.name}
                field={field}
                value={formData[field.name]}
                onInputChange={handleInputChange}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </Stack>
        )}

        {step === 3 && (
          <Container sx={{ textAlign: "center", mt: 4 }}>
            <img src="../../../../../../assets/success.png"  height={100} style={{marginBottom:'10px'}}/>
            <Typography variant="h6" gutterBottom>
              Request Prepared!
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
              The form data has been inserted into your email. Please review and click Send in Outlook.
            </Typography>
            <Button variant="contained" fullWidth onClick={() => setStep(1)} sx={{ bgcolor: "#001F3F" }}>
              Start New Request
            </Button>
          </Container>
        )}
      </Box>

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
            Generate
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default RequestForm;
