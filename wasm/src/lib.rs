use std::io::{BufWriter, Cursor};

use image::{io::Reader, ImageOutputFormat};
use wasm_bindgen::prelude::*;

pub fn to(blob: Vec<u8>, format: ImageOutputFormat) -> Vec<u8> {
    let data = Cursor::new(blob);
    let reader = Reader::new(data).with_guessed_format().unwrap();
    let image = reader.decode().expect("Failed to decode image");
    let mut output = BufWriter::new(Cursor::new(Vec::new()));

    image::write_buffer_with_format(
        &mut output,
        image.as_bytes(),
        image.width(),
        image.height(),
        image.color(),
        format,
    )
    .expect("could not save image");
    output.into_inner().unwrap().get_ref()[..].to_vec()
}

#[wasm_bindgen]
pub fn to_jpeg(blob: Vec<u8>, quality: u8) -> Vec<u8> {
    to(blob, ImageOutputFormat::Jpeg(quality))
}

#[wasm_bindgen]
pub fn to_png(blob: Vec<u8>) -> Vec<u8> {
    to(blob, ImageOutputFormat::Png)
}

#[wasm_bindgen]
pub fn to_gif(blob: Vec<u8>) -> Vec<u8> {
    to(blob, ImageOutputFormat::Gif)
}

#[wasm_bindgen]
pub fn to_bmp(blob: Vec<u8>) -> Vec<u8> {
    to(blob, ImageOutputFormat::Bmp)
}
