use std::cmp::Ordering;

#[derive(Debug, PartialEq, Eq, Clone, Copy)]
struct Code {
    high: u64,
    low: u64,
    rank: u64,
}

impl Code {
    fn new(high: u64, low: u64, rank: u64) -> Self {
        assert!(high >= 10_u64.pow(rank as u32 - 1));
        assert!(high < 10_u64.pow(rank as u32));
        assert!(low < 10_u64.pow(rank as u32));
        assert!(rank >= 1 && rank <= 10);
        Self { high, low, rank }
    }

    fn new_minimal_with_rank(rank: u64) -> Self {
        Self::new(10_u64.pow(rank as u32 - 1), 0, rank)
    }

    fn parse_or_next(code: u64) -> Self {
        for rank in 1.. {
            match 10_u64.checked_pow(rank * 2 - 1) {
                Some(limit) => {
                    if code < limit {
                        return Self::new_minimal_with_rank(rank as u64);
                    }
                }
                None => {
                    return Self::new_minimal_with_rank(rank as u64);
                }
            }

            match 10_u64.checked_pow(rank * 2) {
                Some(limit) => {
                    if code < limit {
                        return Self::new(
                            code / 10_u64.pow(rank),
                            code % 10_u64.pow(rank),
                            rank as u64,
                        );
                    }
                }
                None => {
                    return Self::new(
                        code / 10_u64.pow(rank),
                        code % 10_u64.pow(rank),
                        rank as u64,
                    );
                }
            }
        }
        unreachable!()
    }

    fn to_code(self) -> u64 {
        self.high * 10_u64.pow(self.rank as u32) + self.low
    }

    fn is_invalid(self) -> bool {
        self.high == self.low
    }

    fn next(self) -> Self {
        if self.low < self.high {
            Self::new(self.high, self.high, self.rank)
        } else {
            let high = self.high + 1;
            let rank = if high == 10_u64.pow(self.rank as u32) {
                self.rank + 1
            } else {
                self.rank
            };
            let next = Self::new(high, high, rank);
            next
        }
    }
}

pub fn solve_part1_range(range: &[u64; 2]) -> Vec<u64> {
    let mut result = Vec::new();
    let mut code = Code::parse_or_next(range[0]);
    while code.to_code() <= range[1] {
        if code.is_invalid() {
            result.push(code.to_code());
        }
        code = code.next();
    }
    result
}

#[derive(Debug, Clone)]
struct Decimal(Vec<u8>);

impl Decimal {
    fn is_invalid(&self) -> bool {
        for chunks_count in 2..=self.0.len() {
            if self.0.len() % chunks_count == 0 {
                let chunk_size = self.0.len() / chunks_count;
                let mut chunks = self.0.chunks_exact(chunk_size);
                let first = chunks.next().unwrap();
                if chunks.all(|chunk| first == chunk) {
                    return true;
                }
            }
        }
        false
    }

    fn incr(&mut self) {
        let mut carry = 1;
        for digit in self.0.iter_mut() {
            *digit += carry;
            carry = *digit / 10;
            *digit %= 10;
            if carry == 0 {
                break;
            }
        }
        if carry > 0 {
            self.0.push(carry);
        }
    }
}

impl From<u64> for Decimal {
    fn from(mut value: u64) -> Self {
        let mut digits = Vec::new();
        while value > 0 {
            digits.push((value % 10) as _);
            value /= 10;
        }
        Self(digits)
    }
}

impl Into<u64> for &Decimal {
    fn into(self) -> u64 {
        let mut result = 0;
        for digit in self.0.iter().rev() {
            result *= 10;
            result += *digit as u64;
        }
        result
    }
}

impl Ord for &Decimal {
    fn cmp(&self, other: &Self) -> Ordering {
        let len_cmp = self.0.len().cmp(&other.0.len());
        if len_cmp != Ordering::Equal {
            return len_cmp;
        }
        for (s, o) in std::iter::zip(self.0.iter().rev(), other.0.iter().rev()) {
            let c = s.cmp(o);
            if c != Ordering::Equal {
                return c;
            }
        }
        Ordering::Equal
    }
}

impl PartialOrd for &Decimal {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for &Decimal {
    fn eq(&self, other: &Self) -> bool {
        self.0 == other.0
    }
}

impl Eq for &Decimal {}

pub fn solve_part2_range(range: &[u64; 2]) -> Vec<u64> {
    let mut result = Vec::new();
    let mut code = Decimal::from(range[0]);
    let limit = Decimal::from(range[1]);
    while &code <= &limit {
        if code.is_invalid() {
            result.push((&code).into());
        }
        code.incr();
    }
    result
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn code_parsing() {
        assert_eq!(Code::parse_or_next(1), Code::new_minimal_with_rank(1));
        assert_eq!(Code::parse_or_next(10), Code::new_minimal_with_rank(1));
        assert_eq!(Code::parse_or_next(100), Code::new_minimal_with_rank(2));
        assert_eq!(Code::parse_or_next(1000), Code::new_minimal_with_rank(2));
        assert_eq!(Code::parse_or_next(11885_11880), Code::new(11885, 11880, 5));
        assert_eq!(Code::parse_or_next(8248_24821), Code::new(10000, 0, 5));
        assert_eq!(Code::parse_or_next(21212_12118), Code::new(21212, 12118, 5))
    }

    #[test]
    fn part1_solves_sample() {
        assert_eq!(solve_part1_range(&[11, 22]), vec![11, 22]);
        assert_eq!(solve_part1_range(&[95, 115]), vec![99]);
        assert_eq!(solve_part1_range(&[998, 1012]), vec![1010]);
        assert_eq!(
            solve_part1_range(&[1188511880, 1188511890]),
            vec![1188511885]
        );
        assert_eq!(solve_part1_range(&[222220, 222224]), vec![222222]);
        assert_eq!(solve_part1_range(&[1698522, 1698528]), vec![]);
        assert_eq!(solve_part1_range(&[446443, 446449]), vec![446446]);
        assert_eq!(solve_part1_range(&[38593856, 38593862]), vec![38593859]);
        assert_eq!(solve_part1_range(&[565653, 565659]), vec![]);
        assert_eq!(solve_part1_range(&[824824821, 824824827]), vec![]);
        assert_eq!(solve_part1_range(&[2121212118, 2121212124]), vec![]);
    }

    #[test]
    fn part2_solves_sample() {
        assert_eq!(solve_part2_range(&[11, 22]), vec![11, 22]);
        assert_eq!(solve_part2_range(&[95, 115]), vec![99, 111]);
        assert_eq!(solve_part2_range(&[998, 1012]), vec![999, 1010]);
        assert_eq!(
            solve_part2_range(&[1188511880, 1188511890]),
            vec![1188511885]
        );
        assert_eq!(solve_part2_range(&[222220, 222224]), vec![222222]);
        assert_eq!(solve_part2_range(&[1698522, 1698528]), vec![]);
        assert_eq!(solve_part2_range(&[446443, 446449]), vec![446446]);
        assert_eq!(solve_part2_range(&[38593856, 38593862]), vec![38593859]);
        assert_eq!(solve_part2_range(&[565653, 565659]), vec![565656]);
        assert_eq!(solve_part2_range(&[824824821, 824824827]), vec![824824824]);
        assert_eq!(
            solve_part2_range(&[2121212118, 2121212124]),
            vec![2121212121]
        );
    }
}
