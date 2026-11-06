---
type: "query"
date: "2026-11-06T16:54:09.109698+00:00"
question: "page InteractiveMap SelectedChest ChestBottomSheet dependencies"
contributor: "graphify"
outcome: "useful"
source_nodes: ["HomePage()", "InteractiveMap()", "SelectedChest", "ChestBottomSheet()"]
---

# Q: page InteractiveMap SelectedChest ChestBottomSheet dependencies

## Answer

Expanded via graph vocab: [page, interactive, map, selected, chest, bottom, sheet, dependencies]. HomePage directly owns InteractiveMap; InteractiveMap owns SelectedChest and ChestBottomSheet. GE-03 therefore integrates in the page and adds only a small focus request prop to the map.

## Outcome

- Signal: useful

## Source Nodes

- HomePage()
- InteractiveMap()
- SelectedChest
- ChestBottomSheet()