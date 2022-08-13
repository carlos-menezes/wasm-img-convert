import {
  Box,
  Grid,
  SelectChangeEvent,
  Slider,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { makeStyles } from "tss-react/mui";
import init, { to_bmp, to_gif, to_jpeg, to_png } from "wasm";
import "./App.css";
import FileUploader from "./components/FileUploader";
import FormatSelection from "./components/FormatSelection";
import FORMATS from "./constants/formats";

const useStyles = makeStyles()((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
    backgroundColor: theme.palette.common.black,
  },
}));

function App() {
  const hiddenLink = useRef<HTMLAnchorElement>(null);
  const { classes } = useStyles();
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<typeof FORMATS[number]>(FORMATS[0]);
  const [quality, setQuality] = useState<number>(50);

  useEffect(() => {
    const initWasmLib = async () => {
      await init();
    };

    initWasmLib();
  });

  const onFormatChange = (e: SelectChangeEvent<string>) => {
    setFormat(e.target.value as typeof FORMATS[number]);
  };

  const onQualityChange = (event: Event, newValue: number | number[]) => {
    setQuality(newValue as number);
  };

  const onClickConvert = async () => {
    const file = files[0];
    const buffer = new Uint8Array(await file.arrayBuffer());
    let result: Uint8Array;
    switch (format) {
      case "bmp": {
        result = to_bmp(buffer);
        break;
      }
      case "gif": {
        result = to_gif(buffer);
        break;
      }
      case "jpg": {
        result = to_jpeg(buffer, quality);
        break;
      }
      case "png": {
        result = to_png(buffer);
        break;
      }
    }

    const downloadBlob = new Blob([result], {
      type: `image/${format}`,
    });

    const url = window.URL.createObjectURL(downloadBlob);
    if (hiddenLink.current) {
      hiddenLink.current.href = url;
      hiddenLink.current.download = `${file.name}.${format}`;
      hiddenLink.current.click();
    }
  };

  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <a
        href="/"
        ref={hiddenLink}
        style={{ position: "absolute", top: 0, right: 0, display: "none" }}
      >
        Download
      </a>
      <Grid
        container
        m={4}
        justifyContent="center"
        flexDirection="column"
        xs={12}
        md={4}
        rowGap={4}
      >
        <Grid item>
          <Typography variant="h3">wasm-img-convert</Typography>
          <Typography variant="body1">
            In-browser image conversion powered by Rust and WebAssembly.
          </Typography>
        </Grid>
        <Grid item>
          <FileUploader onFilesAccepted={setFiles} maxFiles={1} />
        </Grid>
        <Grid item container justifyContent="flex-end" display="flex">
          <FormatSelection
            disabled={files.length === 0 ? true : false}
            onChange={(e) => onFormatChange(e)}
            onClick={onClickConvert}
          />
        </Grid>
        {format === "jpg" && (
          <Grid item container justifyContent="flex-start" display="flex">
            <Typography id="input-slider" gutterBottom>
              Quality
            </Typography>
            <Slider
              step={10}
              min={0}
              max={100}
              color="secondary"
              defaultValue={50}
              value={quality}
              onChange={onQualityChange}
              valueLabelDisplay="on"
              aria-labelledby="input-slider"
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default App;
