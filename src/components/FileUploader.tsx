import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import clsx from "clsx";
import { FC, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    height: 300,
    display: "flex",
    border: `4px dashed`,
    userSelect: "none",
    [theme.breakpoints.down("sm")]: {
      width: "90vw",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  noFiles: {
    borderColor: theme.palette.grey["A700"],
    color: theme.palette.grey["A700"],
    "&:hover": {
      borderColor: theme.palette.common.white,
      color: theme.palette.common.white,
    },
  },
  fileUploadOK: {
    borderColor: theme.palette.success.main,
    "&:hover": {
      borderColor: theme.palette.success.main,
    },
  },
  fileUploadError: {
    borderColor: theme.palette.error.main,
    "&:hover": {
      borderColor: theme.palette.error.main,
    },
  },
}));

type FileUploaderProps = {
  onFilesAccepted: any;
  maxFiles?: number;
};

const FileUploader: FC<FileUploaderProps> = ({ onFilesAccepted, maxFiles }) => {
  const { classes } = useStyles();
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/bmp": [],
    },
    maxFiles,
    useFsAccessApi: true,
  });

  useEffect(() => {
    onFilesAccepted(acceptedFiles);
  }, [acceptedFiles, onFilesAccepted]);

  return (
    <Box
      {...getRootProps({
        className: "dropzone",
      })}
      className={clsx(classes.root, {
        [classes.noFiles]:
          !isDragActive &&
          acceptedFiles.length === 0 &&
          fileRejections.length === 0,
        [classes.fileUploadOK]: acceptedFiles.length !== 0,
        [classes.fileUploadError]: fileRejections.length !== 0,
      })}
      justifyContent="center"
      alignItems="center"
      p={3}
      flexDirection="column"
    >
      <input {...getInputProps()} />
      <Typography variant="h5">
        {acceptedFiles.length === 0 &&
          fileRejections.length === 0 &&
          "Select an image."}
        {!isDragActive &&
          acceptedFiles.length !== 0 &&
          `${acceptedFiles.length} file(s) selected.`}
        {isDragActive && "Drop image(s) here."}
      </Typography>

      {!isDragActive && (isDragReject || fileRejections.length !== 0) && (
        <Typography variant="h5" color="error.main">
          Invalid file format!
        </Typography>
      )}
    </Box>
  );
};

export default FileUploader;
