export const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    bgcolor: "#ffffff",
  },
  header: {
    p: 2,
    bgcolor: "#000000",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  main: {
    flexGrow: 1,
    overflowY: "auto",
    p: 2,
    pb: 10,
  },
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    p: 2,
    bgcolor: "white",
    borderTop: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "space-around",
    zIndex: 1000,
  },
  typeCard: {
    mb: 2,
    transition: "0.3s",
    "&:hover": { boxShadow: 4 },
  },
};