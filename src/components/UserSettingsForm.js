import { Button, Flex, FormLabel, Select } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import { Form, Formik, useField } from "formik";
import React from "react";
import { db } from "../../firebase";
import InputField from "./InputField";
import SelectField from "./SelectField";

const colloringOptions = [
  { option: "none", text: "none" },
  { option: "weightLoss", text: "weight loss" },
  { option: "weightGain", text: "weight gain" },
];

function UserSettingsForm({ currentUser }) {
  const saveSettings = async (values) => {
    const weightRef = await setDoc(doc(db, "user", currentUser.uid), {
      timestamp: serverTimestamp(),
      height: values.height,
    });
    //console.log("new doc added:");
    //console.log(weightRef);
  };

  return (
    <Flex justifyContent="center">
      <Formik
        initialValues={{ height: "", colloringOption: "" }}
        //validationSchema={AddWeightSchema}
        onSubmit={async (values) => {
          console.log(values);
          saveSettings(user.uid, values);
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
                name="colloringOption"
                placeholder=""
                label="Colloring the last weight"
                mt={4}
                maxW="56"
                ml="auto"
                selectOptions={colloringOptions}
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
