# AllCalls Blog versions

| Snapshot | Checkout |
| --- | --- |
| `v1-static-copy` | `~/Software/allblogs` the original static copy |
| `v2-v1` | `~/Software/allblogs-v2` on `v2`, the first editorial redesign |
| `v2-v2` / `v2.0` | `~/Software/allblogs-v2-next` on `v2-next`, the cover and navigation revision |
| `v3.0` | `~/Software/allblogs-v3` on `v3`, the Blog branding and image revision |
| `v4.0`, `v4.1` | `~/Software/allblogs-v4` on `v4`, the directional navigation and documentary cover revision |

Each tag points to a complete commit. Each checkout contains the full static site. Open its `index.html` or serve the folder root with a static server. To start the next version as a separate editable copy, run this from either checkout.

```sh
git worktree add -b v4-next ~/Software/allblogs-v4-next v4.1
```

The v2 canonical URLs, social URLs, structured data and sitemap target `https://leonallcalls.github.io/allcallsblog/`. Use the chosen production base consistently across these values if the site moves. The source Google tag is `GT-5DDM24S` and the source linker domain is `blog.allcalls.io`. The new stories carry July–November edition dates. Their structured publication date reflects when the new articles were prepared on November 25.

## Editorial illustrations

The built-in ImageGen tool generated these illustrative scenes. The people and locations provide editorial context for the stories. The captions identify featured images as illustrations.

- `assets/editorial/cleveland-kitchen.jpg` — Create one wide landscape photorealistic editorial photograph for the main feature of the AllCalls insurance agent magazine, 3:2 composition. A Black woman about 66 with short silver natural hair and her adult daughter in her late 30s quietly reviewing an unbranded insurance envelope and papers at a warm walnut kitchen table in an ordinary Cleveland home on a cool late-November morning. Both faces visible, thoughtful, relaxed, one pointing to a line on paper, a mug and window. Warm soft window light, muted moss green, rust, cream tones, contemporary American documentary magazine photography, medium-wide shot, humans on right half with balanced environmental setting, focus on faces and hands. No typography, no watermarks, no readable paperwork, no visual collage, no staged smiles. Illustrative scene, authentic and specific.
- `assets/editorial/minneapolis-evening.jpg` — One 3:2 horizontal editorial documentary photograph for an insurance enrollment journal. A working-age Vietnamese-American woman in a midnight blue sweater sitting at a modest Minneapolis apartment kitchen table on an early winter evening comparing a letter and a laptop, viewed at a human intimate angle, face clearly visible, a second empty chair and soft street light through window. Warm lamp, muted indigo, rust and cream tones. Realistic quiet concern and concentration, no staged pose, no legible text, logos or watermark.
- `assets/editorial/columbus-agency.jpg` — One horizontal 3:2 editorial documentary photograph for AllCalls. Two colleagues of different ages at a modest independent insurance agency in Columbus, Ohio, talking through a paper call-coverage schedule at a shared desk, one pointing to a blank grid, headset off to the side, rainy autumn morning storefront window and soft desk light. Unposed, thoughtful professionals, realistic unbranded office, muted oxide and cream colors, editorial natural photography. No lettering, watermarks or legible personal information.
- `assets/editorial/tucson-agent.jpg` — One landscape 3:2 documentary editorial photograph for AllCalls insurance agent journal. Tucson, Arizona independent insurance agent, a Latino man in his late 30s with a trimmed beard and dark green shirt, seated in an ordinary modest storefront office thoughtfully listening on a corded or headset telephone, nearby window catches blurred stucco buildings and late afternoon desert light. Hands natural, believable unbranded working environment. Warm soft light, quiet concentration, inviting cedar and sage palette. Realistic magazine photography. No text, no brands, no watermarks, no staged smiles.

The cover and navigation revision has its own [cover sources and ImageGen prompts](COVER-SOURCES.md).

The directional View Transitions use same-origin HTTP(S) navigation. For a local motion preview, serve the v4 folder with `python3 -m http.server 8769 --bind 127.0.0.1` and open `http://127.0.0.1:8769/` in a browser with cross-document View Transitions.
