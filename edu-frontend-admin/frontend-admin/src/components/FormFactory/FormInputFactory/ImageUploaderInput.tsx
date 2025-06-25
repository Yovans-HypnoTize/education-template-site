import React, { useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FormikProps } from "formik";
import { FormFieldConfig } from "../../../types/types";
import { Tooltip } from "@mui/material";

const ImageUploaderInput: React.FC<{
  formikProps: FormikProps<any>;
  fieldProps: FormFieldConfig;
}> = ({ formikProps, fieldProps }) => {
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
      formikProps.setFieldValue(fieldProps.name, e.target.files[0]);
    }
  };

  return (
    <Box>
      <Typography
        variant="body2"
        fontWeight={500}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography>{fieldProps.label}</Typography>
        <Typography
          component="span"
          variant="body2"
          sx={{ color: "#5580FF", fontSize: "0.8rem", textAlign: "end" }}
        >
          img_size: 360×247
        </Typography>
      </Typography>

      <Box
        display="flex"
        alignItems="center"
        border="1px solid #ccc"
        borderRadius={1}
        mt={1}
        p={0}
        overflow="hidden"
      >
        <Button
          component="label"
          sx={{
            backgroundColor: "#f0f0f0",
            borderRadius: 0,
            px: 1,
            height: 40,
            width: 110,
            textTransform: "none",
            color: "#000",
          }}
        >
          Choose File
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
            ref={inputRef}
          />
        </Button>

        <Tooltip title={fileName} placement="top" arrow>
          <Box
            onClick={() => inputRef.current?.click()}
            sx={{
              p: 0,
              cursor: "pointer",
              height: "100%",
              display: "flex",
              alignItems: "center",
              pl: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {!fileName
              ? "No file chosen"
              : fileName.length > 23
              ? `${fileName.slice(0, 23)}...`
              : fileName}
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default ImageUploaderInput;
