import argparse
import json

import umap
from sentence_transformers import SentenceTransformer


def arg_parser():
    class CSVtoList(argparse.Action):
        def __call__(self, parser, namespace, values, option_string=None):
            setattr(
                namespace,
                self.dest,
                [val.strip().replace('"', "") for val in values.split(",")],
            )

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--skills",
        help="List of skills to generate embeddings for in CSV format",
        required=True,
        action=CSVtoList,
    )
    parser.add_argument("--output", help="Path to output file", required=True)
    args = parser.parse_args()
    return args


def main():
    args = arg_parser()
    queries = args.skills

    print("Initialize Model")
    model = SentenceTransformer("BAAI/bge-base-en-v1.5")
    instruction = "Represent this sentence for searching relevant skillsets: "

    print("Generating embeddings")
    q_embeddings = model.encode(
        [" ".join([instruction, q]) for q in queries],
        normalize_embeddings=True,
    )

    print("Running Dimension Reduction")
    reducer = umap.UMAP(n_neighbors=5, n_components=3)
    coordinates = reducer.fit_transform(q_embeddings)

    output = {q: coord.tolist() for q, coord in zip(queries, coordinates)}

    print(f"Store coordinates to {args.output}")
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(output, f)


if __name__ == "__main__":
    main()
