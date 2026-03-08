"""
Fetch publications for Jonas Heller from Semantic Scholar API.
Outputs to data/publications.json for the website to consume.
"""

import json
import sys
import time
import urllib.request
import urllib.error

AUTHOR_QUERY = "Jonas Heller"
AFFILIATION_KEYWORD = "Maastricht"
OUTPUT_FILE = "data/publications.json"

API_BASE = "https://api.semanticscholar.org/graph/v1"


def api_get(url, retries=3):
    """GET request with retry logic for rate limiting."""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url)
            req.add_header("User-Agent", "JonasHellerWebsite/1.0")
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < retries - 1:
                wait = 2 ** (attempt + 1)
                print(f"Rate limited, waiting {wait}s...")
                time.sleep(wait)
            else:
                raise
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2)
            else:
                raise


def find_author():
    """Find Jonas Heller (Maastricht) on Semantic Scholar."""
    url = f"{API_BASE}/author/search?query={AUTHOR_QUERY.replace(' ', '+')}&fields=name,affiliations,paperCount,citationCount,hIndex&limit=10"
    data = api_get(url)

    if not data or "data" not in data:
        return None

    # Find the one affiliated with Maastricht
    for author in data["data"]:
        affiliations = " ".join(author.get("affiliations", []))
        if AFFILIATION_KEYWORD.lower() in affiliations.lower():
            return author

    # Fallback: pick the one with most papers
    if data["data"]:
        return max(data["data"], key=lambda a: a.get("paperCount", 0))

    return None


def fetch_papers(author_id):
    """Fetch all papers for the given author."""
    url = (
        f"{API_BASE}/author/{author_id}/papers"
        f"?fields=title,year,venue,citationCount,url,externalIds,publicationDate"
        f"&limit=100"
    )
    data = api_get(url)
    if not data or "data" not in data:
        return []
    return data["data"]


def main():
    print("Searching for author...")
    author = find_author()

    if not author:
        print("Author not found, keeping existing data.")
        sys.exit(0)

    author_id = author["authorId"]
    print(f"Found: {author['name']} (ID: {author_id})")
    print(f"  Papers: {author.get('paperCount', '?')}")
    print(f"  Citations: {author.get('citationCount', '?')}")
    print(f"  h-index: {author.get('hIndex', '?')}")

    print("Fetching papers...")
    papers = fetch_papers(author_id)

    # Sort by year descending, then by citation count
    papers.sort(key=lambda p: (-(p.get("year") or 0), -(p.get("citationCount") or 0)))

    # Build output
    output = {
        "lastUpdated": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "author": {
            "name": author["name"],
            "semanticScholarId": author_id,
            "paperCount": author.get("paperCount", 0),
            "citationCount": author.get("citationCount", 0),
            "hIndex": author.get("hIndex", 0),
        },
        "publications": [],
    }

    for paper in papers:
        if not paper.get("title"):
            continue
        pub = {
            "title": paper["title"],
            "year": paper.get("year"),
            "venue": paper.get("venue", ""),
            "citationCount": paper.get("citationCount", 0),
            "url": paper.get("url", ""),
        }
        output["publications"].append(pub)

    with open(OUTPUT_FILE, "w") as f:
        json.dump(output, f, indent=2)

    print(f"Wrote {len(output['publications'])} publications to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
