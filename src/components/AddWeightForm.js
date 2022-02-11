import React from "react";
import { Formik, Form } from "formik";
import InputField from "./InputField";
import { Button, Flex } from "@chakra-ui/react";
import * as Yup from "yup";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const AddWeightSchema = Yup.object().shape({
  weight: Yup.number()
    .typeError("must be a number")
    // .transform((_value, originalValue) =>
    //   Number(originalValue.replace(/,/, "."))
    // ) // breaks float
    // only the first comma is replaced so that numbers like 123,123,23 are not valid
    .min(0, "0 is minimum")
    .max(500, "500 is maximum")
    .required("Required"),
  date: Yup.date().max(new Date(), "date must be in the past"),
});

export const saveWeight = async (userId, values) => {
  const weightRef = await addDoc(collection(db, "user", userId, "weights"), {
    weight: parseFloat(values.weight).toFixed(2),
    timestamp: serverTimestamp(),
    date: values.date ? new Date(values.date) : new Date(),
  });
  //console.log("new doc added:");
  //console.log(weightRef);

  //await setDoc(doc(db, "user", userId), note);
};

function AddWeightForm({ withDate }) {
  const [user] = useAuthState(auth);

  //console.log(new Date().toISOString().split("T")[0]);

  return (
    <Flex justifyContent="center">
      <Formik
        initialValues={{ weight: "", date: "" }}
        validationSchema={AddWeightSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          saveWeight(user.uid, values);
          resetForm();
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
                  max={new Date().toISOString().split("T")[0]}
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

export default AddWeightForm;
