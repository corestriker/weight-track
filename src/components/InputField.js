import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

function InputField({ label, textarea, size, ...props }) {
  let InputOrTextarea = Input;

  if (textarea) {
    InputOrTextarea = Textarea;
  }

  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <Flex justifyContent="center" justifyItems="center" alignItems="center">
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <InputOrTextarea {...field} {...props} id={field.name} />
      </Flex>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}

export default InputField;
