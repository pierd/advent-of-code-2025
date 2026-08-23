use wasm_bindgen::prelude::*;
use web_sys::console;

mod day02;

#[wasm_bindgen]
pub fn solve_day2_part1(raw_ranges: JsValue) -> JsValue {
    let Ok(ranges) = serde_wasm_bindgen::from_value::<Vec<[u64; 2]>>(raw_ranges) else {
        console::error_1(&"failed to parse input".into());
        panic!();
    };
    let invalid_codes: Vec<Vec<u64>> = ranges
        .iter()
        .map(|range| day02::solve_part1_range(range))
        .collect();
    serde_wasm_bindgen::to_value(&invalid_codes).unwrap()
}

#[wasm_bindgen]
pub fn solve_day2_part2(raw_ranges: JsValue) -> JsValue {
    let Ok(ranges) = serde_wasm_bindgen::from_value::<Vec<[u64; 2]>>(raw_ranges) else {
        console::error_1(&"failed to parse input".into());
        panic!();
    };
    let invalid_codes: Vec<Vec<u64>> = ranges
        .iter()
        .map(|range| day02::solve_part2_range(range))
        .collect();
    serde_wasm_bindgen::to_value(&invalid_codes).unwrap()
}
