use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn greet(name: &str) -> String {
    format!("Hello, {name}! This string was built in Rust and returned through WASM.")
}

/// Generic placeholder Advent of Code solver: sums every integer token in the puzzle input.
#[wasm_bindgen]
pub fn solve(input: &str) -> i64 {
    input
        .split_whitespace()
        .filter_map(|token| token.parse::<i64>().ok())
        .sum()
}

/// Day 1 placeholder solver.
#[wasm_bindgen]
pub fn solve_day1(input: &str) -> i64 {
    input.lines().count() as i64
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn solve_sums_integers() {
        assert_eq!(solve("1 2 3"), 6);
        assert_eq!(solve("a 10\n-4"), 6);
    }

    #[test]
    fn solve_day1_counts_lines() {
        assert_eq!(solve_day1("a\nb\nc"), 3);
        assert_eq!(solve_day1("single"), 1);
    }
}
