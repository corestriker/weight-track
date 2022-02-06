import { Button, Flex } from "@chakra-ui/react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Form, Formik } from "formik";
import React from "react";
import { db } from "../../firebase";
import { coloringOptions } from "../util/coloringOptions";
import InputField from "./InputField";
import SelectField from "./SelectField";
import * as Yup from "yup";

const UserOptionsSchema = Yup.object().shape({
  height: Yup.number()
    .typeError("must be a number")
    .transform((_value, originalValue) =>
      Number(originalValue.replace(/,/, "."))
    )
    .integer("no decimal number allowed")
    // only the first comma is replaced so that numbers like 123,123,23 are not valid
    .min(0, "0 is minimum")
    .max(500, "500 is maximum")
    .required("Required"),
});

function UserSettingsForm({ currentUser }) {
  const saveSettings = async (userId, values) => {
    const colOption =
      values.coloringOption === "" ? "none" : values.coloringOption;

    const userRef = await setDoc(doc(db, "user", userId), {
      timestamp: serverTimestamp(),
      height: values.height,
      colorOption: colOption,
    });
    //console.log("new doc added:");
    //console.log(weightRef);
  };

  return (
    <Flex justifyContent="center">
      <Formik
        initialValues={{ height: "", coloringOption: "" }}
        validationSchema={UserOptionsSchema}
        onSubmit={async (values) => {
          //console.log(values);
          saveSettings(currentUser.uid, values);
          //await new Promise((resolve) => setTimeout(resolve, 1000));
          return null;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection="column">
              <InputField
                name="height"
                placeholder="176"
                label="Height in cm"
                maxW="56"
                ml="auto"
                required
              />
              <SelectField
                name="coloringOption"
                placeholder=""
                label="Coloring the last weight"
                mt={4}
                maxW="56"
                ml="auto"
                selectOptions={coloringOptions}
              />

              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Save settings
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}

export default UserSettingsForm;
