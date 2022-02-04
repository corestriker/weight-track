import React from "react";
import { Formik, Form } from "formik";
import InputField from "./InputField";
import { Box, Button, Flex } from "@chakra-ui/react";
import * as Yup from "yup";
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const AddWeightSchema = Yup.object().shape({
  weight: Yup.number()
    .typeError("must be a number")
    .transform((_value, originalValue) =>
      Number(originalValue.replace(/,/, "."))
    )
    // only the first comma is replaced so that numbers like 123,123,23 are not valid
    .min(30, "30 is minimum")
    .max(300, "You can't weight that much")
    .required("Required"),
  date: Yup.date(),
});

export const saveWeight = async (userId, values) => {
  const weightRef = await addDoc(collection(db, "user", userId, "weights"), {
    weight: values.weight,
    timestamp: serverTimestamp(),
    date: values.date ? new Date(values.date) : new Date(),
  });
  console.log("new doc added:");
  console.log(weightRef);

  //await setDoc(doc(db, "user", userId), note);
};

function AddWeight({ withDate }) {
  const [user] = useAuthState(auth);

  //console.log(withDate);

  return (
    <Flex justifyContent="center">
      <Formik
        initialValues={{ weight: "", date: "" }}
        validationSchema={AddWeightSchema}
        onSubmit={async (values) => {
          console.log(values);
          saveWeight(user.uid, values);
          //await new Promise((resolve) => setTimeout(resolve, 1000));
          return null;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDirection="column">
              <InputField
                name="weight"
                placeholder=""
                label="Weight in kg"
                maxW="56"
                required
              />
              {withDate && (
                <InputField
                  name="date"
                  type="date"
                  placeholder=""
                  label="Date"
                  maxW="56"
                  ml="auto"
                  mt={4}
                />
              )}
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                colorScheme="teal"
              >
                Add weight
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}

export default AddWeight;
