pub fn solve_part1(points: &[[u64; 2]]) -> u64 {
    points
        .iter()
        .enumerate()
        .flat_map(|(idx, [x, y])| {
            points
                .iter()
                .skip(idx + 1)
                .map(|[x2, y2]| (x.abs_diff(*x2) + 1) * (y.abs_diff(*y2) + 1))
        })
        .max()
        .unwrap()
}

pub fn solve_part2(points: &[[u64; 2]]) -> u64 {
    points[0][0]
}

#[cfg(test)]
mod tests {
    use super::*;

    const EXAMPLE: &'static [[u64; 2]] = &[
        [7, 1],
        [11, 1],
        [11, 7],
        [9, 7],
        [9, 5],
        [2, 5],
        [2, 3],
        [7, 3],
    ];

    #[test]
    fn solve_part1_example() {
        assert_eq!(solve_part1(EXAMPLE), 50);
    }

    #[test]
    fn solve_part2_example() {
        assert_eq!(solve_part2(EXAMPLE), 25272);
    }
}
