"""Read the public academy portfolio; preserve all 2D/3D records locally."""
import json
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urlencode
from datetime import datetime, timezone

endpoint = 'https://firestore.googleapis.com/v1/projects/portfolioguwol/databases/(default)/documents/sbs_portfolio'
items = []
token = None
while True:
    query = {'pageSize': 300}
    if token:
        query['pageToken'] = token
    with urlopen(endpoint + '?' + urlencode(query), timeout=30) as response:
        data = json.load(response)
    for doc in data.get('documents', []):
        fields = doc.get('fields', {})
        def value(key, default=''):
            field = fields.get(key, {})
            return next(iter(field.values()), default)
        if value('category') not in ('영상/모션2D', '영상/모션3D'):
            continue
        item = {key: value(key) for key in ('id', 'title', 'url', 'category', 'type')}
        item['id'] = item['id'] or doc['name'].split('/')[-1]
        item['best'] = bool(value('best', False))
        for key in ('author', 'creator', 'studentName', 'description'):
            if value(key):
                item[key] = value(key)
        items.append(item)
    token = data.get('nextPageToken')
    if not token:
        break
if not items or len({item['id'] for item in items}) != len(items):
    raise RuntimeError('Empty gallery or duplicate IDs; existing file was not changed')
payload = {'source': 'https://guwolmotion-hub.github.io/sbs-school-proposal/portfolio.html',
           'syncedAt': datetime.now(timezone.utc).isoformat(), 'items': items}
Path(__file__).with_name('motion-gallery-data.js').write_text(
    '// Public academy gallery snapshot; titles and source URLs are preserved.\nwindow.MOTION_GALLERY = '
    + json.dumps(payload, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
print(json.dumps({'total': len(items), '2D': sum(i['category'] == '영상/모션2D' for i in items),
                  '3D': sum(i['category'] == '영상/모션3D' for i in items)}, ensure_ascii=False))
