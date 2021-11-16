import { makeStyles } from "@saleor/macaw-ui";

export const useStyles = makeStyles(
  theme => ({
    card: {
      cursor: "pointer",
      padding: "1px"
    },
    cardSelected: {
      borderColor: theme.palette.primary.main,
      borderWidth: "2px",
      padding: "0"
    },
    cardContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }),
  { name: "CustomerAddressChoiceCard" }
);
