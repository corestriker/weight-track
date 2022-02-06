import { Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

function SelectField({ selectOptions, label, size, ...props }) {
  const [field, { error }] = useField(props);

  //console.log(selectOptions);
  return (
    <FormControl isInvalid={!!error}>
      <Flex justifyContent="center" justifyItems="center" alignItems="center">
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <Select {...field} {...props} id={field.name}>
          {selectOptions &&
            selectOptions.map((option) => (
              <option key={option.id} value={option.option}>
                {option.text}
              </option>
            ))}
        </Select>
      </Flex>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
}

export default SelectField;
