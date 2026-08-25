use std::collections::HashMap;

fn dist(p: &[u64; 3], p2: &[u64; 3]) -> u64 {
    std::iter::zip(p.into_iter(), p2.into_iter())
        .map(|(a, b)| a.abs_diff(*b).pow(2))
        .sum()
}

#[derive(Debug, Default, Clone)]
struct Edges {
    edges: HashMap<usize, usize>,
}
impl Edges {
    // true - if the connection has been made
    fn connect(&mut self, idx: usize, idx2: usize) -> bool {
        let circuit = self.get_circuit_id(idx);
        let circuit2 = self.get_circuit_id(idx2);
        if circuit == circuit2 {
            false
        } else {
            let target_circuit = circuit.min(circuit2);
            self.edges.insert(idx, target_circuit);
            self.edges.insert(idx2, target_circuit);
            self.edges.insert(circuit, target_circuit);
            self.edges.insert(circuit2, target_circuit);
            true
        }
    }

    fn get_circuit_id(&self, mut idx: usize) -> usize {
        let mut next = self.edges.get(&idx).copied();
        while let Some(next_idx) = next {
            if idx == next_idx {
                break;
            }
            idx = next_idx;
            next = self.edges.get(&idx).copied();
        }
        idx
    }
}

pub fn solve_part1(points: &[[u64; 3]], connections: usize) -> u64 {
    let mut edges = Edges::default();

    // prepare distances
    let mut distances: Vec<_> = points
        .iter()
        .enumerate()
        .flat_map(|(idx, point)| {
            points
                .iter()
                .skip(idx + 1)
                .enumerate()
                .map(move |(offset, point2)| (dist(point, point2), idx, idx + 1 + offset))
        })
        .collect();
    distances.sort_unstable();
    distances.reverse();

    for _ in 0..connections {
        let Some((_, idx, idx2)) = distances.pop() else {
            panic!("run out of distances");
        };
        edges.connect(idx, idx2);
    }
    let mut circuit_sizes = HashMap::<usize, u64>::new();
    for idx in 0..points.len() {
        *circuit_sizes.entry(edges.get_circuit_id(idx)).or_default() += 1;
    }
    let mut circuit_sizes = circuit_sizes.values().copied().collect::<Vec<_>>();
    circuit_sizes.sort_unstable();
    circuit_sizes.pop().unwrap() * circuit_sizes.pop().unwrap() * circuit_sizes.pop().unwrap()
}

pub fn solve_part2(points: &[[u64; 3]]) -> u64 {
    let mut edges = Edges::default();

    // prepare distances
    let mut distances: Vec<_> = points
        .iter()
        .enumerate()
        .flat_map(|(idx, point)| {
            points
                .iter()
                .skip(idx + 1)
                .enumerate()
                .map(move |(offset, point2)| (dist(point, point2), idx, idx + 1 + offset))
        })
        .collect();
    distances.sort_unstable();
    distances.reverse();

    let connections = points.len() - 1;
    let mut last_connection = None;
    for _ in 0..connections {
        loop {
            let Some((_, idx, idx2)) = distances.pop() else {
                panic!("run out of distances");
            };
            if edges.connect(idx, idx2) {
                last_connection = Some((idx, idx2));
                break;
            }
        }
    }
    let (idx, idx2) = last_connection.unwrap();
    points[idx][0] * points[idx2][0]
}

#[cfg(test)]
mod tests {
    use super::*;

    const EXAMPLE: &'static [[u64; 3]] = &[
        [162, 817, 812],
        [57, 618, 57],
        [906, 360, 560],
        [592, 479, 940],
        [352, 342, 300],
        [466, 668, 158],
        [542, 29, 236],
        [431, 825, 988],
        [739, 650, 466],
        [52, 470, 668],
        [216, 146, 977],
        [819, 987, 18],
        [117, 168, 530],
        [805, 96, 715],
        [346, 949, 466],
        [970, 615, 88],
        [941, 993, 340],
        [862, 61, 35],
        [984, 92, 344],
        [425, 690, 689],
    ];

    #[test]
    fn solve_part1_example() {
        assert_eq!(solve_part1(EXAMPLE, 10), 40);
    }

    #[test]
    fn solve_part2_example() {
        assert_eq!(solve_part2(EXAMPLE), 25272);
    }
}
