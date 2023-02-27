import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import ErrorMessage from "./ui/components/ErrorMessage/ErrorMessage";
import Form from "./ui/components/Form/Form";

function App() {
  /**
   * Form fields states
   *  Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { postCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handlePostCodeChange for example
   */
  const [postCode, setPostCode] = React.useState("");
  const [houseNumber, setHouseNumber] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [selectedAddress, setSelectedAddress] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  /**
   * Results states
   */
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  /**
   * Text fields onChange handlers
   */
  const handlePostCodeChange = (e) => setPostCode(e.target.value);

  const handleHouseNumberChange = (e) => setHouseNumber(e.target.value);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);

  const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleSelectedAddressChange = (e) => setSelectedAddress(e.target.value);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    fetch(`/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          setError("");
          setLoading(false);
          setAddresses((result) => [...result, ...data.details]);
          setAddresses((addAddress) =>
            addAddress.map((value) =>
              Object.assign(value, { id: value.houseNumber })
            )
          );
          transformAddress(...data.details);
        } else {
          setLoading(false);
          setError(data);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log("fail to fetch the address");
        throw e;
      });
    /**
     *  Fetch addresses based on houseNumber and postCode using the local BE api
     * - Example URL of API: /api/getAddresses?postcode=1345&streetnumber=350
     * - Handle errors if they occur
     * - Handle successful response by updating the `addresses` in the state using `setAddresses`
     * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
     * - Bonus: Add a loading state in the UI while fetching addresses
     */
  };

  const handleClearAllFields = (e) => {
    e.preventDefault();
    setAddresses([]);
    setSelectedAddress("");
    setPostCode("");
    setHouseNumber("");
    setFirstName("");
    setLastName("");
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();

    if (!selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === selectedAddress
    );

    addAddress({ ...foundAddress, firstName, lastName });
  };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>
        {/*  Create generic <Form /> component to display form rows, legend and a submit button  */}
        <Form
          legendName={"🏠 Find an address"}
          onSubmit={handleAddressSubmit}
          primaryPlaceholder={"Post Code"}
          primaryName={"postCode"}
          primaryValue={postCode}
          primaryOnChange={handlePostCodeChange}
          secondaryPlaceholder={"House number"}
          secondaryName={"houseNumber"}
          secondaryValue={houseNumber}
          secondaryOnChange={handleHouseNumberChange}
          buttonName={"Find"}
        />
        {loading ? (
          <div>{`Loading the data...`}</div>
        ) : (
          addresses.length > 0 &&
          addresses
            .filter(
              (ele, ind) =>
                ind ===
                addresses.findIndex(
                  (elem) =>
                    elem.houseNumber === ele.houseNumber && elem.id === ele.id
                )
            )
            .map((address) => {
              return (
                <Radio
                  name="selectedAddress"
                  id={address.id}
                  key={address.id}
                  onChange={handleSelectedAddressChange}
                >
                  <Address address={address} />
                </Radio>
              );
            })
        )}
        {/*  Create generic <Form /> component to display form rows, legend and a submit button  */}
        {selectedAddress && (
          <Form
            legendName={"✏️ Add personal info to address"}
            onSubmit={handlePersonSubmit}
            primaryPlaceholder={"First name"}
            primaryName={"firstName"}
            primaryValue={firstName}
            primaryOnChange={handleFirstNameChange}
            secondaryPlaceholder={"Last name"}
            secondaryName={"lastName"}
            secondaryValue={lastName}
            secondaryOnChange={handleLastNameChange}
            buttonName={"Add to addressbook"}
          />
        )}
        {error && <ErrorMessage error={error} />}

        {/*  Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
        <Button
          type="button"
          onClick={(e) => handleClearAllFields(e)}
          variant="secondary"
        >
          Clear all fields
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
