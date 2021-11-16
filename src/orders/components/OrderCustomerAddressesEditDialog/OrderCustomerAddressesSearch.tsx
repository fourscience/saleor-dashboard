import {
  Button,
  DialogActions,
  DialogContent,
  InputAdornment,
  TextField
} from "@material-ui/core";
import CardSpacer from "@saleor/components/CardSpacer";
import CustomerAddressChoiceCard from "@saleor/customers/components/CustomerAddressChoiceCard";
import { CustomerAddresses_user_addresses } from "@saleor/customers/types/CustomerAddresses";
import { SearchIcon } from "@saleor/macaw-ui";
import { ConfirmButton } from "@saleor/macaw-ui";
import { flatten } from "@saleor/misc";
import { AddressTypeEnum } from "@saleor/types/globalTypes";
import React from "react";
import { useIntl } from "react-intl";

import { addressSearchMessages as messages } from "./messages";
import { useStyles } from "./styles";

export interface OrderCustomerAddressesSearchProps {
  type: AddressTypeEnum;
  customerAddresses: CustomerAddresses_user_addresses[];
  exitSearch();
}

const OrderCustomerAddressesSearch: React.FC<OrderCustomerAddressesSearchProps> = props => {
  const { type, customerAddresses, exitSearch } = props;

  const intl = useIntl();
  const classes = useStyles(props);

  const [query, setQuery] = React.useState("");

  const handleSelect = () => {
    exitSearch();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const parseAddress = (address: Partial<CustomerAddresses_user_addresses>) => {
    const { id, ...addressWithoutId } = address;
    return Object.values(flatten(addressWithoutId)).join(" ");
  };

  const filteredCustomerAddresses = customerAddresses.filter(address => {
    const parsedAddress = parseAddress(address);

    return parsedAddress.search(new RegExp(query, "i")) >= 0;
  });

  return (
    <>
      <DialogContent>
        {intl.formatMessage(messages.searchInfo)}
        <CardSpacer />
        <TextField
          // name="query"
          value={query}
          variant="outlined"
          onChange={handleChange}
          placeholder={"Search addresses"}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          inputProps={{ className: classes.searchInput }}
          // InputLabelProps={{ disabled: true }}
        />
        <CardSpacer />
        <div className={classes.scrollableWrapper}>
          {filteredCustomerAddresses?.map(address => (
            <React.Fragment key={address.id}>
              <CustomerAddressChoiceCard address={address} />
              <CardSpacer />
            </React.Fragment>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => exitSearch()} color="primary">
          Cancel
        </Button>
        <ConfirmButton
          variant="contained"
          transitionState="default"
          labels={{ confirm: "Select", error: "error" }}
          onClick={handleSelect}
        />
      </DialogActions>
    </>
  );
};

OrderCustomerAddressesSearch.displayName = "OrderCustomerAddressesSearch";
export default OrderCustomerAddressesSearch;
